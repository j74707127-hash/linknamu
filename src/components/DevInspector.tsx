"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 개발 모드 전용 "클릭해서 수정 요청" 도구.
 * - 오른쪽 아래 버튼으로 선택 모드를 켠다.
 * - 마우스를 올리면 data-component 가 붙은 구성요소가 강조된다.
 * - 클릭하면 요청 입력창이 열리고, "복사"를 누르면
 *   구성요소 이름·파일 위치·요청이 담긴 프롬프트가 클립보드에 복사된다.
 *   Claude 채팅창에 붙여넣으면 된다.
 */

type Target = {
  name: string;
  source: string;
  detail: string;
  rect: DOMRect;
};

const UI_ATTR = "data-inspector-ui";

function findComponent(el: Element | null): HTMLElement | null {
  return (el?.closest("[data-component]") as HTMLElement | null) ?? null;
}

function describeClicked(el: Element): string {
  const tag = el.tagName.toLowerCase();
  const text = (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 40);
  const alt = el.getAttribute("alt") ?? el.getAttribute("aria-label");
  const label = text || alt || "";
  return label ? `<${tag}> "${label}"` : `<${tag}>`;
}

function toTarget(componentEl: HTMLElement, clicked: Element): Target {
  return {
    name: componentEl.dataset.component ?? "알 수 없음",
    source: componentEl.dataset.source ?? "",
    detail: describeClicked(clicked),
    rect: componentEl.getBoundingClientRect(),
  };
}

export default function DevInspector() {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState<Target | null>(null);
  const [selected, setSelected] = useState<Target | null>(null);
  const [request, setRequest] = useState("");
  const [copied, setCopied] = useState(false);
  const [fallbackText, setFallbackText] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const close = useCallback(() => {
    setSelected(null);
    setRequest("");
    setCopied(false);
    setFallbackText(null);
  }, []);

  useEffect(() => {
    if (!active) return;

    const isUi = (el: EventTarget | null) =>
      el instanceof Element && el.closest(`[${UI_ATTR}]`) !== null;

    function onMove(e: MouseEvent) {
      if (isUi(e.target)) return;
      const comp = findComponent(e.target as Element);
      setHover(comp ? toTarget(comp, e.target as Element) : null);
    }

    function onClick(e: MouseEvent) {
      if (isUi(e.target)) return;
      // 선택 모드에서는 링크 이동·버튼 동작을 막는다
      e.preventDefault();
      e.stopPropagation();
      const comp = findComponent(e.target as Element);
      if (!comp) return;
      setSelected(toTarget(comp, e.target as Element));
      setCopied(false);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (selected) close();
        else {
          setActive(false);
          setHover(null);
        }
      }
    }

    function onScroll() {
      setHover(null);
    }

    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey, true);
    window.addEventListener("scroll", onScroll, true);
    document.body.style.cursor = "crosshair";
    return () => {
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey, true);
      window.removeEventListener("scroll", onScroll, true);
      document.body.style.cursor = "";
    };
  }, [active, selected, close]);

  useEffect(() => {
    if (selected) textareaRef.current?.focus();
  }, [selected]);

  function buildPrompt(t: Target) {
    return [
      "[화면 구성요소 수정 요청]",
      `구성요소: ${t.name}${t.source ? ` (${t.source})` : ""}`,
      `페이지: ${window.location.pathname}`,
      `클릭한 부분: ${t.detail}`,
      `요청: ${request.trim()}`,
    ].join("\n");
  }

  function copyWithExecCommand(text: string): boolean {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute(UI_ATTR, "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    ta.remove();
    return ok;
  }

  async function handleCopy() {
    if (!selected || !request.trim()) return;
    const text = buildPrompt(selected);
    setFallbackText(null);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      return;
    } catch {
      // 일부 내장 브라우저는 클립보드 API를 막는다
    }
    if (copyWithExecCommand(text)) {
      setCopied(true);
      return;
    }
    // 복사가 모두 막혔으면 직접 복사할 수 있게 내용을 보여 준다
    setFallbackText(text);
  }

  const box = selected ?? hover;

  return (
    <>
      {active && box && (
        <div
          {...{ [UI_ATTR]: "" }}
          className="pointer-events-none fixed z-[9998] rounded-md border-2 border-fuchsia-500 bg-fuchsia-500/10"
          style={{
            top: box.rect.top - 3,
            left: box.rect.left - 3,
            width: box.rect.width + 6,
            height: box.rect.height + 6,
          }}
        >
          <span className="absolute -top-6 left-0 whitespace-nowrap rounded bg-fuchsia-600 px-1.5 py-0.5 font-mono text-[11px] text-white">
            {box.name}
          </span>
        </div>
      )}

      {active && selected && (
        <div
          {...{ [UI_ATTR]: "" }}
          role="dialog"
          aria-label="구성요소 수정 요청"
          className="fixed inset-x-3 bottom-20 z-[9999] mx-auto max-w-md rounded-2xl border border-neutral-200 bg-white p-4 shadow-2xl"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-mono text-sm font-bold text-fuchsia-700">{selected.name}</p>
              <p className="truncate font-mono text-[11px] text-neutral-500">{selected.source}</p>
              <p className="truncate text-xs text-neutral-500">클릭: {selected.detail}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="닫기"
              className="rounded-full px-2 text-lg leading-none text-neutral-400 hover:text-neutral-700"
            >
              ×
            </button>
          </div>
          <textarea
            ref={textareaRef}
            value={request}
            onChange={(e) => {
              setRequest(e.target.value);
              setCopied(false);
              setFallbackText(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleCopy();
            }}
            placeholder="어떻게 바꿀까요? 예: 배경을 연한 초록색으로 바꿔 줘"
            rows={3}
            className="mt-3 w-full resize-none rounded-lg border border-neutral-300 p-2 text-sm text-neutral-900 outline-none focus:border-fuchsia-500"
          />
          <button
            type="button"
            onClick={handleCopy}
            disabled={!request.trim()}
            className="mt-2 w-full rounded-lg bg-fuchsia-600 py-2 text-sm font-semibold text-white transition hover:bg-fuchsia-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            {copied ? "복사됨! Claude 채팅창에 붙여넣으세요 (Ctrl+V)" : "요청 복사 (Ctrl+Enter)"}
          </button>
          {fallbackText && (
            <div className="mt-2">
              <p className="text-xs text-neutral-600">
                이 브라우저는 자동 복사를 막아요. 아래 내용을 Ctrl+C로 복사해 채팅창에 붙여넣으세요.
              </p>
              <textarea
                readOnly
                value={fallbackText}
                rows={5}
                onFocus={(e) => e.currentTarget.select()}
                ref={(el) => el?.select()}
                className="mt-1 w-full resize-none rounded-lg border border-neutral-300 bg-neutral-50 p-2 font-mono text-[11px] text-neutral-800"
              />
            </div>
          )}
        </div>
      )}

      <button
        {...{ [UI_ATTR]: "" }}
        type="button"
        onClick={() => {
          setActive((v) => !v);
          setHover(null);
          close();
        }}
        className={`fixed bottom-5 right-5 z-[9999] rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition ${
          active ? "bg-fuchsia-600 text-white" : "bg-neutral-900 text-white hover:bg-neutral-700"
        }`}
      >
        {active ? "선택 모드 끄기 (Esc)" : "🎯 구성요소 선택"}
      </button>
    </>
  );
}
