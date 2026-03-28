import { createSignal, createEffect, onMount, For } from "solid-js";
import type { Poem } from "../poems";

interface Props {
  poem: Poem;
}

const GLITCH_CHARS = "░▒▓█▄▀▌▐╔╗╚╝═║┌┐└┘├┤┬┴┼◆◇○●◎☆★∞≈≡∑∏∫∂∇λΩΨΦπ01";

function randomGlitch(length: number): string {
  return Array.from({ length }, () =>
    GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
  ).join("");
}

export default function QuantumPoem(props: Props) {
  const [revealed, setRevealed] = createSignal(false);
  const [displayLines, setDisplayLines] = createSignal<string[]>([]);
  const [collapsed, setCollapsed] = createSignal(false);

  let ref: HTMLDivElement | undefined;

  onMount(() => {
    // Initialize with glitch text
    setDisplayLines(props.poem.content.map((line) => randomGlitch(line.length)));

    // Intersection Observer for scroll-triggered collapse
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !collapsed()) {
          setCollapsed(true);
          collapseToPoem();
        }
      },
      { threshold: 0.4 }
    );
    if (ref) observer.observe(ref);
    return () => observer.disconnect();
  });

  function collapseToPoem() {
    const lines = props.poem.content;
    let step = 0;
    const totalSteps = 20;

    const interval = setInterval(() => {
      step++;
      const progress = step / totalSteps;

      setDisplayLines(
        lines.map((line) => {
          const revealCount = Math.floor(line.length * progress);
          return (
            line.slice(0, revealCount) +
            randomGlitch(line.length - revealCount)
          );
        })
      );

      if (step >= totalSteps) {
        clearInterval(interval);
        setDisplayLines(lines);
        setRevealed(true);
      }
    }, 60);
  }

  return (
    <div
      ref={ref}
      class="quantum-border rounded-lg p-6 bg-abyss-light transition-all duration-500 cursor-pointer group"
      onClick={() => {
        if (!collapsed()) {
          setCollapsed(true);
          collapseToPoem();
        }
      }}
    >
      {/* Header */}
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="font-display text-xl text-quantum-gold group-hover:text-quantum-gold transition-colors">
            {props.poem.titleZh}
          </h3>
          <p class="text-xs text-gray-500 mt-0.5 font-mono">{props.poem.title}</p>
        </div>
        <span class="text-xs text-neon-cyan-dim font-mono px-2 py-1 border border-neon-cyan-dim/30 rounded">
          #{props.poem.id}
        </span>
      </div>

      {/* Poem Lines */}
      <div class="space-y-2 font-display text-base leading-relaxed min-h-[6rem]">
        <For each={displayLines()}>
          {(line, i) => (
            <p
              class={`transition-all duration-200 ${
                revealed()
                  ? "text-gray-100"
                  : "text-neon-cyan font-mono text-sm tracking-widest"
              }`}
            >
              {line}
            </p>
          )}
        </For>
      </div>

      {/* Footer */}
      <div class="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-600">
        <span class="font-mono">{props.poem.coordinates}</span>
        <div class="flex gap-2">
          <For each={props.poem.keywords.slice(0, 3)}>
            {(kw) => (
              <span class="px-1.5 py-0.5 bg-quantum-gold/10 text-quantum-gold-dim rounded">
                {kw}
              </span>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
