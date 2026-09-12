import { useState } from "react";
import { X } from "lucide-react";
import { PRODUCTS, PRODUCT_ORDER, type ProductId } from "@/lib/worlds";

const STORAGE_KEY = "solvo-request";

type RequestPanelProps = {
  product: ProductId;
  onClose: () => void;
};

export function RequestPanel({ product, onClose }: RequestPanelProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [chosen, setChosen] = useState<ProductId>(product);
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name: name.trim(),
      company: company.trim(),
      product: chosen,
      at: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setSent(true);
  }

  return (
    <>
      <button
        type="button"
        className="sheet-scrim"
        aria-label="Close"
        onClick={onClose}
      />
      <aside className="sheet" role="dialog" aria-labelledby="request-title">
        <div className="flex items-center justify-between gap-3 pt-1">
          <p
            id="request-title"
            className="text-[11px] font-semibold tracking-[0.22em] text-cream-muted"
          >
            {PRODUCTS[chosen].wordmark}
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

        {sent ? (
          <div className="mt-10">
            <p className="font-serif text-3xl italic leading-tight text-cream">
              Request in.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-muted">
              We will open a walkthrough of {PRODUCTS[chosen].wordmark.toLowerCase()}{" "}
              with the same discipline as the page you just watched being made.
            </p>
            <button type="button" className="gold-cta mt-8" onClick={onClose}>
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
              Back to the page
            </button>
          </div>
        ) : (
          <form className="mt-8 flex flex-col gap-4" onSubmit={submit}>
            <p className="font-serif text-3xl italic leading-tight text-cream">
              {PRODUCTS[chosen].cta}
            </p>
            <p className="text-sm leading-relaxed text-cream-muted">
              {PRODUCTS[chosen].sub}
            </p>

            <label className="mt-2 block text-xs tracking-[0.14em] text-cream-muted">
              NAME
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 block h-12 w-full rounded-md bg-ink px-3 text-base text-cream outline-none ring-1 ring-cream/15 focus:ring-2 focus:ring-gold"
                autoComplete="name"
              />
            </label>
            <label className="block text-xs tracking-[0.14em] text-cream-muted">
              COMPANY
              <input
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-2 block h-12 w-full rounded-md bg-ink px-3 text-base text-cream outline-none ring-1 ring-cream/15 focus:ring-2 focus:ring-gold"
                autoComplete="organization"
              />
            </label>
            <fieldset>
              <legend className="text-xs tracking-[0.14em] text-cream-muted">
                PRODUCT
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {PRODUCT_ORDER.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setChosen(id)}
                    className="rounded-pill px-4 py-2 text-sm"
                    style={{
                      background:
                        chosen === id
                          ? "var(--color-gold)"
                          : "rgb(244 240 232 / 0.08)",
                      color:
                        chosen === id
                          ? "var(--color-gold-fg)"
                          : "var(--color-cream)",
                    }}
                  >
                    {PRODUCTS[id].short}
                  </button>
                ))}
              </div>
            </fieldset>

            <button type="submit" className="gold-cta mt-4 w-full justify-center">
              <span className="gold-cta-mark">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Request a walkthrough
            </button>
          </form>
        )}
      </aside>
    </>
  );
}
