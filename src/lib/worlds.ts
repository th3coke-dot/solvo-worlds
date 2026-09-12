export type ProductId = "plan" | "find" | "bid";
export type Phase = "world" | "reveal";
export type LightId = "day" | "sunset" | "aurora";

export type Shot = {
  portrait: string;
  wide: string;
  objectPosition?: string;
  videoPortrait?: string;
  videoWide?: string;
};

export type Beat = {
  kicker: string;
  line: string;
  shot: Shot;
};

export type ProductWorld = {
  id: ProductId;
  wordmark: string;
  short: string;
  headline: string;
  sub: string;
  cta: string;
  worldTitle: string;
  manifesto: string;
  beats: [Beat, Beat, Beat];
};

export const WORLD_BEAT_MS = 8000;
export const WORLD_BEATS = 3;
export const WORLD_XFADE_MS = 1400;
export const WORLD_MS = WORLD_BEAT_MS * WORLD_BEATS;

export const LIGHT_MS = 24_000;
export const LIGHT_COUNT = 3;
export const LIGHT_XFADE_MS = 4000;
export const REVEAL_MS = LIGHT_MS * LIGHT_COUNT;

export const LIGHTS: { id: LightId; label: string; shot: Shot }[] = [
  {
    id: "day",
    label: "Dawn",
    shot: {
      portrait: "/cinema/day-portrait.jpg",
      wide: "/cinema/day-wide.jpg",
      videoPortrait: "/cinema/day-portrait.mp4",
      videoWide: "/cinema/day-wide.mp4",
    },
  },
  {
    id: "sunset",
    label: "Golden hour",
    shot: {
      portrait: "/cinema/sunset-portrait.jpg",
      wide: "/cinema/sunset-wide.jpg",
      videoPortrait: "/cinema/sunset-portrait.mp4",
      videoWide: "/cinema/sunset-wide.mp4",
    },
  },
  {
    id: "aurora",
    label: "Aurora",
    shot: {
      portrait: "/cinema/aurora-portrait.jpg",
      wide: "/cinema/aurora-wide.jpg",
      videoPortrait: "/cinema/aurora-portrait.mp4",
      videoWide: "/cinema/aurora-wide.mp4",
    },
  },
];

export const PRODUCTS: Record<ProductId, ProductWorld> = {
  plan: {
    id: "plan",
    wordmark: "SOLVOPLAN",
    short: "Plan",
    headline: "From scope to a clear plan.",
    sub: "Turn project scope into a plan you can review, refine and deliver.",
    cta: "Start planning",
    worldTitle: "Someone is planning this page.",
    manifesto: "Scope the work. Sequence the light. Deliver the page.",
    beats: [
      {
        kicker: "solvoPlan · the making of",
        line: "A planner is scoping a landing page — the ridge, the water, the 72-second day.",
        shot: {
          portrait: "/cinema/plan-studio-portrait.jpg",
          wide: "/cinema/plan-studio-wide.jpg",
          objectPosition: "center 35%",
        },
      },
      {
        kicker: "Dawn. Golden hour. Aurora.",
        line: "The cycle is on the table. Three movements. One page.",
        shot: {
          portrait: "/cinema/plan-table.jpg",
          wide: "/cinema/plan-table.jpg",
          objectPosition: "center 40%",
        },
      },
      {
        kicker: "The plan leaves the room.",
        line: "What they scoped is what you are about to see.",
        shot: {
          portrait: "/cinema/plan-window.jpg",
          wide: "/cinema/plan-window.jpg",
          objectPosition: "center 45%",
        },
      },
    ],
  },
  find: {
    id: "find",
    wordmark: "SOLVOFIND",
    short: "Find",
    headline: "From a wide field to the right find.",
    sub: "Search the ground, surface what matters, and lock the location before the window closes.",
    cta: "Start finding",
    worldTitle: "Someone is out looking for this landing.",
    manifesto: "Walk the ridge. Read the weather. Lock the find.",
    beats: [
      {
        kicker: "solvoFind · the making of",
        line: "A scout is on the ridge, searching for a page that can hold a whole day of light.",
        shot: {
          portrait: "/cinema/find-ridge-portrait.jpg",
          wide: "/cinema/find-ridge-wide.jpg",
          objectPosition: "center 30%",
        },
      },
      {
        kicker: "The field is large. The match is not.",
        line: "Ridges, weather windows, a village in the water.",
        shot: {
          portrait: "/cinema/find-map.jpg",
          wide: "/cinema/find-map.jpg",
          objectPosition: "center 55%",
        },
      },
      {
        kicker: "Found.",
        line: "The search becomes the page.",
        shot: {
          portrait: "/cinema/find-found.jpg",
          wide: "/cinema/find-found.jpg",
          objectPosition: "center 45%",
        },
      },
    ],
  },
  bid: {
    id: "bid",
    wordmark: "SOLVOBID",
    short: "Bid",
    headline: "From a live tender to a bid you can stand behind.",
    sub: "Price the work, prove the plan, and submit a bid that holds when it is opened.",
    cta: "Start bidding",
    worldTitle: "Someone is bidding to deliver this page.",
    manifesto: "Three envelopes. One award. The winning bid is the page.",
    beats: [
      {
        kicker: "solvoBid · the making of",
        line: "A war room at blue hour. Three teams. One cinematic landing to win.",
        shot: {
          portrait: "/cinema/bid-room-portrait.jpg",
          wide: "/cinema/bid-room-wide.jpg",
          objectPosition: "center 40%",
        },
      },
      {
        kicker: "Scope, price, risk.",
        line: "The numbers are quiet. The picture is not.",
        shot: {
          portrait: "/cinema/bid-table.jpg",
          wide: "/cinema/bid-table.jpg",
          objectPosition: "center 50%",
        },
      },
      {
        kicker: "Awarded.",
        line: "The winning bid becomes the view.",
        shot: {
          portrait: "/cinema/bid-award.jpg",
          wide: "/cinema/bid-award.jpg",
          objectPosition: "center 40%",
        },
      },
    ],
  },
};

export const PRODUCT_ORDER: ProductId[] = ["plan", "find", "bid"];

export function frameOpacity(
  t: number,
  index: number,
  slot: number,
  xfade: number,
  count: number,
  loop: boolean,
): number {
  const total = slot * count;
  if (total <= 0) return index === 0 ? 1 : 0;
  let x = t;
  if (loop) {
    x = ((t % total) + total) % total;
  }
  if (!loop && (x < 0 || x > total + xfade)) return 0;

  const start = index * slot;
  const fadeIn = xfade;
  const fadeOutStart = start + slot;
  const fadeOutEnd = fadeOutStart + xfade;

  const opacityAt = (pos: number) => {
    if (pos >= start && pos < fadeOutStart) {
      const into = pos - start;
      if (into < fadeIn) {
        if (index === 0) return 1;
        return Math.min(1, into / fadeIn);
      }
      return 1;
    }
    if (pos >= fadeOutStart && pos < fadeOutEnd) {
      return 1 - (pos - fadeOutStart) / xfade;
    }
    return 0;
  };

  let o = opacityAt(x);
  if (loop && index === 0) {
    o = Math.max(o, opacityAt(x + total));
  }
  if (loop && index === count - 1 && x < xfade) {
    o = Math.max(o, opacityAt(x + total));
  }
  return Math.max(0, Math.min(1, o));
}

export function worldBeatIndex(worldT: number): number {
  if (worldT <= 0) return 0;
  return Math.min(WORLD_BEATS - 1, Math.floor(worldT / WORLD_BEAT_MS));
}

export function lightIndex(revealT: number): number {
  const x = ((revealT % REVEAL_MS) + REVEAL_MS) % REVEAL_MS;
  return Math.min(LIGHT_COUNT - 1, Math.floor(x / LIGHT_MS));
}
