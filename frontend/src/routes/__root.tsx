import { MantineProvider } from "@mantine/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";

import "@mantine/core/styles.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <MantineProvider>
        <Outlet />
      </MantineProvider>
    </>
  ),
});
