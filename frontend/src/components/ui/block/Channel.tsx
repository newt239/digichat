import { messagesAtom } from "#/utils/messages";
import { useAtom } from "jotai";

export const Channel: React.FC = () => {
  const [messages] = useAtom(messagesAtom);

  return (
    <div>
      <h3>Messages:</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};
