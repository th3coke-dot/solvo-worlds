import { X } from "lucide-react";
import { SolvoLogo } from "@/components/solvo-logo";
import {
  LIGHTS,
  PRODUCTS,
  PRODUCT_ORDER,
  type ProductId,
} from "@/lib/worlds";

type ControlSheetProps = {
  product: ProductId;
  phase: "world" | "reveal";
  revealT: number;
  revealMs: number;
  onClose: () => void;
  onSelectProduct: (id: ProductId) => void;
  onSkipToPage: () => void;
  onReplayWorld: () => void;
};

export function ControlSheet({
  product,
  phase,
  revealT,
  revealMs,
  onClose,
  onSelectProduct,
  onSkipToPage,
  onReplayWorld,
}: ControlSheetProps) {
  const world = PRODUCTS[product];
  const progress = phase === "reveal" ? Math.min(1, revealT / revealMs) : 0;

  return (
    <>
      <button
        type="button"
        className="sheet-scrim"
        aria-label="Close control"
        onClick={onClose}
      />
      <aside className="sheet" role="dialog" aria-labelledby="control-title">
        <div className="flex items-center justify-between gap-3 pt-1">
          <p
            id="control-title"
            className="text-[11px] font-semibold tracking-[0.22em] text-cream-muted"
          >
            OPEN CONTROL
          </p>
          <button
            type="button"
            className="icon-round"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-6">
          <SolvoLogo wordmark="SOLVO" />
          <p className="mt-4 max-w-sm font-serif text-2xl leading-snug text-cream italic">
            Three products. Three worlds. One page at the end of the work.
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-muted">
            solvoPlan scopes the work. solvoFind finds the ground. solvoBid wins
            the job. The fjord you already know is what they made.
          </p>
        </div>

        <div className="mt-7 grid gap-2">
          {PRODUCT_ORDER.map((id) => {
            const item = PRODUCTS[id];
            const active = id === product;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectProduct(id)}
                className="flex items-start gap-3 rounded-lg p-3 text-left transition-colors duration-150"
                style={{
                  background: active
                    ? "rgb(244 240 232 / 0.08)"
                    : "transparent",
                }}
              >
                <span
                  className="mt-1 size-2 shrink-0 rounded-full"
                  style={{
                    background: active
                      ? "var(--color-gold)"
                      : "rgb(244 240 232 / 0.25)",
                  }}
                />
                <span>
                  <span className="block text-[11px] font-semibold tracking-[0.18em] text-cream">
                    {item.wordmark}
                  </span>
                  <span className="mt-1 block text-sm text-cream-muted">
                    {item.manifesto}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-7">
          <div className="flex items-center justify-between text-[11px] tracking-[0.14em] text-cream-muted">
            <span>72s LIGHT CYCLE</span>
            <span className="tabular-nums">
              {phase === "reveal"
                ? `${String(Math.floor(revealT / 1000)).padStart(2, "0")}s`
                : "in the making"}
            </span>
          </div>
          <div className="cycle-track mt-2">
            <div
              className="cycle-fill"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] tracking-[0.08em] text-cream-muted">
            {LIGHTS.map((light) => (
              <span key={light.id}>{light.label}</span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          <button type="button" className="gold-cta w-full justify-center" onClick={onReplayWorld}>
            <span className="gold-cta-mark">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                <path
                  d="M7 7h-3v-3M21 12a9 9 0 1 1-2.6-6.3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Replay this world
          </button>
          {phase === "world" ? (
            <button type="button" className="ghost-cta w-full" onClick={onSkipToPage}>
              Skip to the page
            </button>
          ) : (
            <p className="px-1 text-center text-sm text-cream-muted">
              You are on the finished {world.wordmark.toLowerCase()} page.
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
