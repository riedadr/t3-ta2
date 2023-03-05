import { type ReactNode, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  NavLink,
  Button,
} from "@mantine/core";
import { IconTable, IconTimeline } from "@tabler/icons-react";
import Link from "next/link";

export default function Shell({ children }: { children: ReactNode }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Link href="/">
            <NavLink label="Timeline" icon={<IconTimeline />} />
          </Link>
          <Link href="/plan/40">
            <NavLink label="Gruppe 40" icon={<IconTable />} />
          </Link>
          <Link href="/plan/41">
            <NavLink label="Gruppe 41" icon={<IconTable />} />
          </Link>
          <Link href="/plan/42">
            <NavLink label="Gruppe 42" icon={<IconTable />} />
          </Link>
          <Button color="red" variant="outline" onClick={() => localStorage.removeItem("gruppe")}>
            Gruppe zurücksetzten (experimentell)
          </Button>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Stundenplan TA2</Text>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
