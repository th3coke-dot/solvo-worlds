import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { List } from "lucide-react";
import { CinemaStage } from "@/components/cinema-stage";
import { ControlSheet } from "@/components/control-sheet";
import { DiegeticUi } from "@/components/diegetic-ui";
import { RequestPanel } from "@/components/request-panel";
import { SolvoLogo } from "@/components/solvo-logo";
import {
  frameOpacity,
  LIGHTS,
  PRODUCTS,
  PRODUCT_ORDER,
  REVEAL_MS,
  LIGHT_COUNT,
  LIGHT_MS,
  LIGHT_XFADE_MS,
  WORLD_BEAT_MS,
  WORLD_BEATS,
  WORLD_MS,
  WORLD_XFADE_MS,
  worldBeatIndex,
  type Phase,
  type ProductId,
  type Shot,
} from "@/lib/worlds";

export function SolvoPage() {
  const [product, setProduct] = useState<ProductId>("plan");
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [controlOpen, setControlOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const elapsedRef = useRef(0);
  const playingRef = useRef(true);
  const lastTs = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    let raf = 0;
    let lastPaint = 0;
    const tick = (ts: number) => {
      if (lastTs.current == null) lastTs.current = ts;
      const dt = ts - lastTs.current;
      lastTs.current = ts;
      if (playingRef.current) {
        elapsedRef.current += dt;
        if (ts - lastPaint >= 50) {
          lastPaint = ts;
          setElapsed(elapsedRef.current);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const resetClock = useCallback((to = 0) => {
    elapsedRef.current = to;
    lastTs.current = null;
    setElapsed(to);
    setPlaying(true);
  }, []);

  const xfadeWorld = reduceMotion ? 180 : WORLD_XFADE_MS;
  const xfadeLight = reduceMotion ? 280 : LIGHT_XFADE_MS;
  const dissolve = reduceMotion ? 220 : 1800;
  const world = PRODUCTS[product];
  const phase: Phase = elapsed < WORLD_MS ? "world" : "reveal";
  const worldT = Math.min(elapsed, WORLD_MS);
  const revealT = Math.max(0, elapsed - WORLD_MS);
  const beat = worldBeatIndex(worldT);

  const worldFade =
    elapsed >= WORLD_MS
      ? Math.max(0, 1 - (elapsed - WORLD_MS) / dissolve)
      : 1;
  const revealFade =
    elapsed <= WORLD_MS
      ? 0
      : Math.min(1, (elapsed - WORLD_MS) / dissolve);

  const worldOpacities = useMemo(
    () =>
      world.beats.map((_, i) =>
        frameOpacity(worldT, i, WORLD_BEAT_MS, xfadeWorld, WORLD_BEATS, false),
      ),
    [world, worldT, xfadeWorld],
  );

  const revealOpacities = useMemo(
    () =>
      LIGHTS.map((_, i) =>
        frameOpacity(revealT, i, LIGHT_MS, xfadeLight, LIGHT_COUNT, true),
      ),
    [revealT, xfadeLight],
  );

  const worldShots: Shot[] = world.beats.map((b) => b.shot);
  const revealShots: Shot[] = LIGHTS.map((l) => l.shot);

  function selectProduct(id: ProductId) {
    setProduct(id);
    setControlOpen(false);
    resetClock(0);
  }

  function replay() {
    setControlOpen(false);
    resetClock(0);
  }

  function skipToPage() {
    setControlOpen(false);
    resetClock(WORLD_MS);
  }

  const beatData = world.beats[beat];
  const showDiegetic = phase === "world" && beat === 1 && worldOpacities[1] > 0.55;

  return (
    <main className="cinema-root">
      <div className="absolute inset-0" style={{ opacity: worldFade }}>
        <CinemaStage
          frames={worldShots}
          opacities={worldOpacities}
          playing={playing && worldFade > 0.02}
          useVideo={false}
          kenBurns={!reduceMotion}
        />
      </div>
      {elapsed > WORLD_MS - 2500 ? (
        <div className="absolute inset-0" style={{ opacity: revealFade }}>
          <CinemaStage
            frames={revealShots}
            opacities={revealOpacities}
            playing={playing && revealFade > 0.02}
            useVideo={!reduceMotion}
            kenBurns={!reduceMotion}
          />
        </div>
      ) : null}
      <div className="cinema-vignette pointer-events-none absolute inset-0 z-[1]" />
      <div className="cinema-grain pointer-events-none absolute inset-0 z-[1]" />

      <nav className="world-rail" aria-label="Product worlds">
        {PRODUCT_ORDER.map((id) => (
          <button
            key={id}
            type="button"
            className="world-rail-btn"
            data-active={id === product}
            onClick={() => selectProduct(id)}
          >
            {PRODUCTS[id].short}
          </button>
        ))}
      </nav>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col">
        <header className="pointer-events-auto flex items-start justify-between gap-3 px-4 pt-4 sm:px-6 sm:pt-5">
          <div className="flex items-center gap-1 rounded-pill bg-glass-strong px-1 py-1 shadow-glass backdrop-blur-md md:hidden">
            {PRODUCT_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => selectProduct(id)}
                className="min-h-11 rounded-pill px-3 text-sm font-medium"
                style={{
                  color:
                    id === product
                      ? "var(--color-cream)"
                      : "rgb(244 240 232 / 0.55)",
                  background:
                    id === product ? "rgb(244 240 232 / 0.08)" : "transparent",
                }}
              >
                {PRODUCTS[id].short}
              </button>
            ))}
          </div>
          <div className="glass-pill ml-auto">
            <button
              type="button"
              className="glass-chip"
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? "Pause" : "Resume"}
            </button>
            <button type="button" className="glass-chip" onClick={replay}>
              Replay
            </button>
          </div>
        </header>

        <button
          type="button"
          className="icon-round pointer-events-auto absolute right-4 top-1/2 z-20 -translate-y-1/2 sm:right-6"
          onClick={() => setControlOpen(true)}
          aria-label="Open menu"
        >
          <List className="size-5" strokeWidth={1.7} />
        </button>

        <div className="mt-auto px-5 pb-24 sm:px-8 sm:pb-28">
          {phase === "world" ? (
            <div key={`${product}-${beat}`} className="stagger-in max-w-xl">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-cream-muted">
                {beatData.kicker}
              </p>
              <h1 className="mt-3 max-w-lg font-serif text-[2rem] leading-[1.12] italic text-cream sm:text-5xl">
                {beat === 0 ? world.worldTitle : beatData.line}
              </h1>
              {beat === 0 ? (
                <p className="mt-3 max-w-md text-base leading-relaxed text-cream-muted">
                  {beatData.line}
                </p>
              ) : null}
              {showDiegetic ? (
                <div className="mt-5">
                  <DiegeticUi product={product} beat={beat} />
                </div>
              ) : null}
            </div>
          ) : (
            <div key={`${product}-reveal`} className="stagger-in max-w-xl">
              <SolvoLogo wordmark={world.wordmark} />
              <h1 className="mt-5 max-w-lg text-[2.35rem] font-normal leading-[1.08] tracking-tight text-cream sm:text-5xl">
                {world.headline}
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-cream-muted sm:text-lg">
                {world.sub}
              </p>
            </div>
          )}

          <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              className="gold-cta"
              onClick={() => setRequestOpen(true)}
            >
              <span className="gold-cta-mark">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {world.cta}
            </button>
            <button
              type="button"
              className="ghost-cta"
              onClick={() => setControlOpen(true)}
            >
              Open Control
            </button>
          </div>
        </div>
      </div>

      {controlOpen ? (
        <ControlSheet
          product={product}
          phase={phase}
          revealT={revealT % REVEAL_MS}
          revealMs={REVEAL_MS}
          onClose={() => setControlOpen(false)}
          onSelectProduct={selectProduct}
          onSkipToPage={skipToPage}
          onReplayWorld={replay}
        />
      ) : null}

      {requestOpen ? (
        <RequestPanel product={product} onClose={() => setRequestOpen(false)} />
      ) : null}
    </main>
  );
}
