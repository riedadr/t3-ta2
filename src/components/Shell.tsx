/* eslint-disable @next/next/no-html-link-for-pages */
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
    Divider,
} from "@mantine/core";

import { IconTable, IconTimeline, IconToolsKitchen2 } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import logo from "~/assets/images/logo.png";
import { InfoModal } from "./InfoModal";

export default function Shell({ children }: { children: ReactNode }) {
    const theme = useMantineTheme();
    const [navOpened, setNavOpened] = useState(false);

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
                    hidden={!navOpened}
                    width={{ sm: 200, lg: 300 }}
                >
                    <Navbar.Section grow>
                        <Link replace href="/">
                            <NavLink
                                onClick={() => setNavOpened((o) => !o)}
                                label="Timeline"
                                icon={<IconTimeline />}
                            />
                        </Link>
                        <Divider my="xs" label="Stundenpläne" />
                        <Link replace href="/plan/40">
                            <NavLink
                                onClick={() => setNavOpened((o) => !o)}
                                label="Gruppe 40"
                                icon={<IconTable />}
                            />
                        </Link>
                        <Link replace href="/plan/41">
                            <NavLink
                                onClick={() => setNavOpened((o) => !o)}
                                label="Gruppe 41"
                                icon={<IconTable />}
                            />
                        </Link>
                        <Link replace href="/plan/42">
                            <NavLink
                                onClick={() => setNavOpened((o) => !o)}
                                label="Gruppe 42"
                                icon={<IconTable />}
                            />
                        </Link>
                        <Divider my="xs" label="Info" />
                        <Link href="https://www.studentenwerk-oberfranken.de/essen/speiseplaene/hof.html" target="_blank">
                            <NavLink
                                onClick={() => setNavOpened((o) => !o)}
                                label="Speiseplan"
                                icon={<IconToolsKitchen2 />}
                            />
                        </Link>
                    </Navbar.Section>
                    <Navbar.Section>
                        <InfoModal />
                    </Navbar.Section>
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
                                opened={navOpened}
                                onClick={() => setNavOpened((o) => !o)}
                                size="md"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <Link
                            className="flex w-full items-center justify-between"
                            replace
                            href="/"
                        >
                            <Text size="lg">
                                Stundenplan
                                <Text fz="sm" component="sup" color="blue">
                                    TA2
                                </Text>
                            </Text>
                            <Image height={48} src={logo} alt="logo" />
                        </Link>
                    </div>
                </Header>
            }
        >
            {children}
        </AppShell>
    );
}
