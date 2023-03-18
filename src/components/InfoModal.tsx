import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Avatar, Button, Grid, Modal, Text } from "@mantine/core";
import { IconBrandTabler, IconInfoCircle } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export const InfoModal = () => {
    const [opened, { open, close }] = useDisclosure(true);

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                size="xl"
                title="Informationen zur Anwendung"
            >
                <Text color="red">
                    Dies ist keine offizielle Anwendung der HföD.
                </Text>
                <section className="mt-4">
                    <Text fz="lg">Progressive Web App</Text>
                    <Text>
                        Bei dieser Anwendung handelt es sich um eine PWA. Diese
                        kann auf einem GErät installiert und wie eine native App
                        bedient werden.
                    </Text>
                </section>
                <section className="mt-4">
                    <Text fz="lg">Technologien und Frameworks</Text>
                    <Text>
                        Diese Anwendung wurde aus dem{" "}
                        <Link href="https://create.t3.gg/" target="_blank">
                            T3-Stack
                        </Link>{" "}
                        heraus aufgebaut.
                        <T3links />
                        <Text mt={8}>Hosting:</Text>
                        <Grid>
                            <Grid.Col span={4}>
                                <Button
                                    component="a"
                                    href="https://github.com/riedadr/t3-ta2"
                                    target="_blank"
                                    fullWidth
                                    variant="light"
                                    leftIcon={
                                        <Image
                                            src="/images/github.svg"
                                            height={28}
                                            width={28}
                                            alt=""
                                        />
                                    }
                                >
                                    GitHub
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Button
                                    component="a"
                                    href="https://caprover.com/"
                                    target="_blank"
                                    fullWidth
                                    variant="light"
                                    leftIcon={
                                        <Image
                                            src="/images/caprover.png"
                                            height={28}
                                            width={28}
                                            alt=""
                                        />
                                    }
                                >
                                    Caprover
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Button
                                    component="a"
                                    href="https://www.oracle.com/cloud/"
                                    target="_blank"
                                    fullWidth
                                    variant="light"
                                    leftIcon={
                                        <Image
                                            src="/images/oracle.svg"
                                            height={28}
                                            width={28}
                                            alt=""
                                        />
                                    }
                                >
                                    Oracle
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </Text>
                </section>
            </Modal>
            <Button
                leftIcon={<IconInfoCircle />}
                title="Informationen anzeigen"
                fullWidth
                variant="outline"
                onClick={open}
            >
                Info
            </Button>
        </>
    );
};

const T3links = () => {
    return (
        <Grid mt={8}>
            <Grid.Col className="flex justify-center" span={12}>
                <Button
                    component="a"
                    href="https://create.t3.gg/"
                    target="_blank"
                    fullWidth
                    variant="gradient"
                    gradient={{
                        from: "#CC66FF",
                        to: "#6900ff",
                        deg: 45,
                    }}
                    leftIcon={<Avatar src="/images/t3.svg" size={28} />}
                >
                    T3-Stack
                </Button>
            </Grid.Col>
            <Grid.Col className="flex flex-col gap-2" span={4}>
                <Button
                    component="a"
                    href="https://www.typescriptlang.org/"
                    target="_blank"
                    fullWidth
                    className="bg-[#3178c6]"
                    leftIcon={
                        <Image
                            src="/images/ts.svg"
                            height={28}
                            width={28}
                            alt=""
                        />
                    }
                >
                    TypeScript
                </Button>
                <Button
                    component="a"
                    href="https://react.dev/"
                    target="_blank"
                    fullWidth
                    variant="light"
                    leftIcon={
                        <Image
                            src="/images/react.svg"
                            height={28}
                            width={28}
                            alt=""
                        />
                    }
                >
                    React
                </Button>
                <Button
                    component="a"
                    href="https://nextjs.org/"
                    target="_blank"
                    fullWidth
                    variant="light"
                    leftIcon={
                        <Image
                            src="/images/next.svg"
                            height={28}
                            width={28}
                            alt=""
                        />
                    }
                >
                    NEXT.js
                </Button>
            </Grid.Col>
            <Grid.Col className="flex flex-col gap-2" span={4}>
                <Button
                    component="a"
                    href="https://trpc.io/"
                    target="_blank"
                    fullWidth
                    className="bg-[#398CCB]"
                    leftIcon={
                        <Image
                            src="/images/trpc.svg"
                            height={28}
                            width={28}
                            alt=""
                        />
                    }
                >
                    tRPC
                </Button>
                <Button
                    component="a"
                    href="https://planetscale.com/"
                    target="_blank"
                    fullWidth
                    variant="light"
                    leftIcon={
                        <Image
                            src="/images/planetscale.svg"
                            height={28}
                            width={28}
                            alt=""
                        />
                    }
                >
                    Planetscale
                </Button>
                <Button
                    component="a"
                    href="https://www.mysql.com/"
                    target="_blank"
                    fullWidth
                    variant="light"
                    leftIcon={
                        <Image
                            src="/images/mysql.png"
                            height={28}
                            width={28}
                            alt=""
                        />
                    }
                >
                    MySQL
                </Button>
            </Grid.Col>
            <Grid.Col className="flex flex-col gap-2" span={4}>
                <Button
                    component="a"
                    href="https://tailwindcss.com/"
                    target="_blank"
                    fullWidth
                    variant="gradient"
                    gradient={{
                        from: "#0f172a",
                        to: "#193251",
                        deg: 45,
                    }}
                    leftIcon={
                        <Image
                            src="/images/tailwindcss.svg"
                            height={28}
                            width={28}
                            alt=""
                        />
                    }
                >
                    Tailwind
                </Button>
                <Button
                    component="a"
                    href="https://mantine.dev/"
                    target="_blank"
                    fullWidth
                    variant="light"
                    leftIcon={
                        <Image
                            src="/images/mantine.svg"
                            height={28}
                            width={28}
                            alt=""
                        />
                    }
                >
                    Mantine
                </Button>
                <Button
                    component="a"
                    href="https://tabler-icons.io/"
                    target="_blank"
                    fullWidth
                    variant="light"
                    leftIcon={<IconBrandTabler size={28} />}
                >
                    tabler-icons
                </Button>
            </Grid.Col>
        </Grid>
    );
};
