# solvo worlds

Cinematic landing for **solvoPlan**, **solvoFind**, and **solvoBid**.

Three making-of worlds. Each one is someone using that product to create this page. When the work finishes, you get the same Lofoten fjord landing — a 72-second cycle of dawn, golden hour, and aurora.

## Worlds

| Product | World | Finished line |
| --- | --- | --- |
| solvoPlan | A planner scopes the page on the table | From scope to a clear plan. |
| solvoFind | A scout searches the ridge for the landing | From a wide field to the right find. |
| solvoBid | A war room bids to deliver the page | From a live tender to a bid you can stand behind. |

## Try it

- Let a world play (~24s), then the fjord loop (72s).
- **Plan / Find / Bid** switches worlds and replays the making-of.
- **Open Control → Skip to the page** jumps to the finished fjord.
- **Pause / Replay** as labelled.
- **Start planning / finding / bidding** opens a walkthrough request (saved locally).

## Stack

TanStack Start, React 19, Tailwind v4. Cinema stills and loop videos live in `public/cinema/`. Copy and timings live in `src/lib/worlds.ts`. The stage is `src/components/solvo-page.tsx`.

## Prompt for GPT

Paste this with the live URL and this repo:

> Review this cinematic landing for solvoPlan, solvoFind, and solvoBid. Concept: each product has a “world” that is the making-of this page (planning it, finding the location, bidding to deliver it). The finished product is the same fjord landing with a 72s day → sunset → aurora cycle. Look at the live site on desktop and mobile, then the source. Critique concept, copy, pacing, product clarity, and whether the making-of actually sells the three tools. Be specific. Suggest cuts, not extra decoration.
