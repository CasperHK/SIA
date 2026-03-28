import { createSignal, createMemo, For, Show } from "solid-js";
import { poems } from "../poems";
import type { Poem } from "../poems";
import QuantumPoem from "../components/QuantumPoem";
import AestheticBackground from "../components/AestheticBackground";
import CategoryFilter from "../components/CategoryFilter";

export default function Home() {
  const [activeCategory, setActiveCategory] = createSignal<string | null>(null);
  const [hoveredPoem, setHoveredPoem] = createSignal<Poem | null>(null);

  const filteredPoems = createMemo(() => {
    const cat = activeCategory();
    if (!cat) return poems;
    return poems.filter((p) => p.category === cat);
  });

  return (
    <>
      <AestheticBackground poems={poems} activePoem={hoveredPoem()} />

      <div class="relative min-h-screen">
        {/* Hero Header */}
        <header class="pt-20 pb-12 px-6 text-center">
          <div class="inline-block">
            <p class="text-xs tracking-[0.4em] text-neon-cyan-dim uppercase mb-3 font-mono">
              Singularity Ink Archive · 奇點墨痕
            </p>
            <h1 class="font-display text-4xl md:text-6xl font-bold text-quantum-gold mb-3">
              未來詩歌儲存庫
            </h1>
            <p class="text-gray-400 text-sm md:text-base max-w-lg mx-auto font-mono leading-relaxed">
              量子糾纏傳密碼，矽片脈搏定興亡。<br />
              Edge Computing 封裝科技詩魂，AI 奇點與星際文明的靈感軌跡。
            </p>
          </div>

          {/* Tech stack badge */}
          <div class="flex items-center justify-center gap-3 mt-8 flex-wrap">
            {["SolidStart", "Hono", "Tailwind CSS", "Edge Computing"].map((tech) => (
              <span class="text-xs font-mono px-3 py-1 border border-gray-700 text-gray-500 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Category Filter */}
        <div class="px-6 mb-10">
          <CategoryFilter
            poems={poems}
            activeCategory={activeCategory()}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Poem Grid */}
        <main class="max-w-5xl mx-auto px-6 pb-24">
          <div
            class="text-xs font-mono text-gray-600 mb-6 flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-neon-cyan animate-pulse inline-block" />
            <span>
              {filteredPoems().length} 首詩歌已載入 · 點擊或捲動觸發量子坍縮渲染
            </span>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <For each={filteredPoems()}>
              {(poem) => (
                <div
                  onMouseEnter={() => setHoveredPoem(poem)}
                  onMouseLeave={() => setHoveredPoem(null)}
                >
                  <QuantumPoem poem={poem} />
                </div>
              )}
            </For>
          </div>

          <Show when={filteredPoems().length === 0}>
            <div class="text-center py-20 text-gray-600 font-mono">
              <p class="text-2xl mb-2">∅</p>
              <p>此分類暫無詩歌紀錄</p>
            </div>
          </Show>
        </main>

        {/* Footer */}
        <footer class="border-t border-gray-800 py-8 text-center text-xs text-gray-700 font-mono">
          <p class="mb-1">「莫道書生無遠略，科技刻下萬世昌。」</p>
          <p class="text-gray-800">
            SIA · Powered by SolidStart + Hono · Edge Computing Architecture
          </p>
          <p class="mt-3 text-gray-800">
            API:{" "}
            <a href="/api/poems" class="text-neon-cyan-dim hover:text-neon-cyan transition-colors">
              /api/poems
            </a>{" "}
            ·{" "}
            <a href="/api/singularity" class="text-neon-cyan-dim hover:text-neon-cyan transition-colors">
              /api/singularity
            </a>{" "}
            ·{" "}
            <a href="/api/categories" class="text-neon-cyan-dim hover:text-neon-cyan transition-colors">
              /api/categories
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
