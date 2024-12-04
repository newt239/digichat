import { MessageInput } from "#/components/ui/block/MessageInput";
import { MessageList } from "#/components/ui/block/MessageList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <div>
        Hello World!
        <MessageInput />
        <MessageList />
      </div>
    );
  },
});
