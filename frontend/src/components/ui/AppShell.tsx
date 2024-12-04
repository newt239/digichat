import {
  Burger,
  Group,
  AppShell as MantineAppShell,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MessageInput } from "./block/MessageInput";

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineAppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          DigiChat
        </Group>
      </MantineAppShell.Header>
      <MantineAppShell.Navbar p="md">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text>Navbar</Text>
        </Group>
      </MantineAppShell.Navbar>
      <MantineAppShell.Main>{children}</MantineAppShell.Main>
      <MantineAppShell.Aside p="md">Aside</MantineAppShell.Aside>
      <MantineAppShell.Footer h="auto" p="1rem" withBorder={false}>
        <MessageInput />
      </MantineAppShell.Footer>
    </MantineAppShell>
  );
};

export default AppShell;
