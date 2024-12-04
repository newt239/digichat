import { Channel } from "#/components/ui/block/Channel";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Channel />
    </div>
  );
}
