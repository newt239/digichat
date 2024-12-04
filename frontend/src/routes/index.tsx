import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <div>
        Hello World!
        <Link href="/app/">Go to app</Link>
      </div>
    );
  },
});
