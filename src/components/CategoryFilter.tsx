import { For } from "solid-js";
import type { Poem } from "../poems";
import { categories } from "../poems";

interface Props {
  poems: Poem[];
  activeCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
}

export default function CategoryFilter(props: Props) {
  const counts = () => {
    const c: Record<string, number> = {};
    for (const p of props.poems) {
      c[p.category] = (c[p.category] || 0) + 1;
    }
    return c;
  };

  return (
    <div class="flex flex-wrap gap-3 justify-center">
      <button
        class={`px-4 py-2 rounded text-sm font-mono border transition-all duration-200 ${
          props.activeCategory === null
            ? "border-quantum-gold text-quantum-gold bg-quantum-gold/10"
            : "border-gray-700 text-gray-400 hover:border-gray-500"
        }`}
        onClick={() => props.onCategoryChange(null)}
      >
        全部 ALL ({props.poems.length})
      </button>

      <For each={Object.entries(categories)}>
        {([key, cat]) => (
          <button
            class={`px-4 py-2 rounded text-sm font-mono border transition-all duration-200 ${
              props.activeCategory === key
                ? "border-quantum-gold text-quantum-gold bg-quantum-gold/10"
                : "border-gray-700 text-gray-400 hover:border-gray-500"
            }`}
            onClick={() => props.onCategoryChange(key)}
          >
            {cat.label} ({counts()[key] || 0})
          </button>
        )}
      </For>
    </div>
  );
}
