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
} from "@mantine/core";
import { IconTable, IconTimeline } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import logo from "~/assets/logo.png";

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
            navbar={
                <Navbar
                    p="md"
                    hiddenBreakpoint="sm"
                    hidden={!opened}
                    width={{ sm: 200, lg: 300 }}
                >
                    <Link href="/">
                        <NavLink
                            onClick={() => setOpened((o) => !o)}
                            label="Timeline"
                            icon={<IconTimeline />}
                        />
                    </Link>
                    <Link href="/plan/40">
                        <NavLink
                            onClick={() => setOpened((o) => !o)}
                            label="Gruppe 40"
                            icon={<IconTable />}
                        />
                    </Link>
                    <Link href="/plan/41">
                        <NavLink
                            onClick={() => setOpened((o) => !o)}
                            label="Gruppe 41"
                            icon={<IconTable />}
                        />
                    </Link>
                    <Link href="/plan/42">
                        <NavLink
                            onClick={() => setOpened((o) => !o)}
                            label="Gruppe 42"
                            icon={<IconTable />}
                        />
                    </Link>
                </Navbar>
            }
            header={
                <Header height={70} p="md">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <MediaQuery
                            largerThan="sm"
                            styles={{ display: "none" }}
                        >
                            <Burger
                                title="open menu"
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="md"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <div className="flex w-full items-center justify-between">
                            <Text size="lg">
                                Stundenplan
                                <Text fz="sm" component="sup" color="orange">
                                    beta
                                </Text>
                            </Text>
                            <Image height={48} src={logo} alt="logo" />
                        </div>
                    </div>
                </Header>
            }
        >
            {children}
        </AppShell>
    );
}
