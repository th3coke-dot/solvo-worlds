import { createFileRoute } from "@tanstack/react-router";
import { SolvoPage } from "@/components/solvo-page";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <SolvoPage />;
}
