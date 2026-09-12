import type { ProductId } from "@/lib/worlds";

export function DiegeticUi({
  product,
  beat,
}: {
  product: ProductId;
  beat: number;
}) {
  if (product === "plan" && beat === 1) return <PlanBoard />;
  if (product === "find" && beat === 1) return <FindBoard />;
  if (product === "bid" && beat === 1) return <BidBoard />;
  return null;
}

function PlanBoard() {
  return (
    <aside className="diegetic" aria-label="solvoPlan board">
      <p className="text-[10px] font-semibold tracking-[0.22em] text-teal">
        SOLVOPLAN
      </p>
      <p className="mt-1 text-sm font-medium text-cream">Landing · 72s light</p>
      <ol className="mt-3">
        <li className="diegetic-row">
          <span>01 Dawn capture</span>
          <span className="tabular-nums text-cream-muted">0–24s</span>
          <span className="text-teal">live</span>
        </li>
        <li className="diegetic-row">
          <span>02 Golden hour</span>
          <span className="tabular-nums text-cream-muted">24–48s</span>
          <span className="text-cream-muted">next</span>
        </li>
        <li className="diegetic-row">
          <span>03 Aurora night</span>
          <span className="tabular-nums text-cream-muted">48–72s</span>
          <span className="text-cream-muted">hold</span>
        </li>
      </ol>
    </aside>
  );
}

function FindBoard() {
  return (
    <aside className="diegetic" aria-label="solvoFind matches">
      <p className="text-[10px] font-semibold tracking-[0.22em] text-teal">
        SOLVOFIND
      </p>
      <p className="mt-1 text-sm font-medium text-cream">
        Query · cinematic fjord landing
      </p>
      <ol className="mt-3">
        <li className="diegetic-row">
          <span>Reinebringen ridge</span>
          <span className="tabular-nums text-cream-muted">98%</span>
          <span className="text-gold">lock</span>
        </li>
        <li className="diegetic-row">
          <span>Hamnøy harbour</span>
          <span className="tabular-nums text-cream-muted">74%</span>
          <span className="text-cream-muted">hold</span>
        </li>
        <li className="diegetic-row">
          <span>Sakrisøy morning</span>
          <span className="tabular-nums text-cream-muted">61%</span>
          <span className="text-cream-muted">hold</span>
        </li>
      </ol>
    </aside>
  );
}

function BidBoard() {
  return (
    <aside className="diegetic" aria-label="solvoBid comparison">
      <p className="text-[10px] font-semibold tracking-[0.22em] text-teal">
        SOLVOBID
      </p>
      <p className="mt-1 text-sm font-medium text-cream">
        RFP · cinematic landing page
      </p>
      <ol className="mt-3">
        <li className="diegetic-row">
          <span>Northfold Studio</span>
          <span className="tabular-nums text-cream-muted">184k</span>
          <span className="tabular-nums text-cream-muted">0.62</span>
        </li>
        <li className="diegetic-row">
          <span>Fjord & Form</span>
          <span className="tabular-nums text-cream-muted">171k</span>
          <span className="text-gold">award</span>
        </li>
        <li className="diegetic-row">
          <span>Harborline</span>
          <span className="tabular-nums text-cream-muted">209k</span>
          <span className="tabular-nums text-cream-muted">0.44</span>
        </li>
      </ol>
    </aside>
  );
}
