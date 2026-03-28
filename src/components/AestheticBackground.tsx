import { createSignal, createEffect, onMount, onCleanup } from "solid-js";
import type { Poem } from "../poems";

interface Props {
  poems: Poem[];
  activePoem?: Poem | null;
}

const KEYWORD_EFFECTS: Record<string, { hue: number; saturation: number }> = {
  黑洞: { hue: 270, saturation: 80 },
  智能: { hue: 180, saturation: 90 },
  基因: { hue: 300, saturation: 85 },
  量子: { hue: 200, saturation: 95 },
  奇點: { hue: 45, saturation: 100 },
  星際: { hue: 230, saturation: 75 },
  宇宙: { hue: 240, saturation: 70 },
  科技: { hue: 160, saturation: 80 },
};

export default function AestheticBackground(props: Props) {
  const [hue, setHue] = createSignal(230);
  const [saturation, setSaturation] = createSignal(30);
  const [particleCount] = createSignal(40);

  let canvasRef: HTMLCanvasElement | undefined;
  let animationId: number;

  // Compute-Aesthetic Mapping: react to active poem keywords
  createEffect(() => {
    const poem = props.activePoem;
    if (!poem) {
      setHue(230);
      setSaturation(30);
      return;
    }

    for (const kw of poem.keywords) {
      if (KEYWORD_EFFECTS[kw]) {
        setHue(KEYWORD_EFFECTS[kw].hue);
        setSaturation(KEYWORD_EFFECTS[kw].saturation);
        return;
      }
    }
  });

  onMount(() => {
    if (!canvasRef) return;
    const canvas = canvasRef;
    const ctx = canvas.getContext("2d")!;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // Particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      char: string;
    }
    const DATA_CHARS = "01アイウエオカキクケコ∑∫∂∇≈≡";

    const particles: Particle[] = Array.from({ length: particleCount() }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.2,
      size: Math.random() * 10 + 8,
      alpha: Math.random() * 0.4 + 0.1,
      char: DATA_CHARS[Math.floor(Math.random() * DATA_CHARS.length)],
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Gradient background
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      const h = hue();
      const s = saturation();
      grad.addColorStop(0, `hsla(${h}, ${s}%, 8%, 1)`);
      grad.addColorStop(0.6, `hsla(${h}, ${Math.max(s - 20, 0)}%, 4%, 1)`);
      grad.addColorStop(1, `hsla(0, 0%, 4%, 1)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Data stream particles
      for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = `hsla(${h}, 80%, 65%, 1)`;
        ctx.font = `${p.size}px 'Fira Code', monospace`;
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.001;

        if (p.y < -20 || p.alpha <= 0) {
          p.x = Math.random() * width;
          p.y = height + 20;
          p.vy = -Math.random() * 0.6 - 0.2;
          p.alpha = Math.random() * 0.4 + 0.1;
          p.char = DATA_CHARS[Math.floor(Math.random() * DATA_CHARS.length)];
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    onCleanup(() => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    });
  });

  return (
    <canvas
      ref={canvasRef}
      class="fixed inset-0 -z-10 transition-all duration-1000"
      style={{ filter: `hue-rotate(0deg)` }}
    />
  );
}
