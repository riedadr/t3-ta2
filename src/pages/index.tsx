import { Text, Timeline } from "@mantine/core";
import { IconCheck, IconListNumbers, IconUsers } from "@tabler/icons-react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const writtenExams = [
    {
        name: "Wirtschaftsführung",
        type: "LN",
        date: new Date("2023-05-30T09:00"),
        file: "/documents/Arbeitsplatznummern_QP2023_1_30.05.23.pdf",
    },
    {
        name: "DV & Büroautomation",
        type: "K",
        date: new Date("2023-05-31T09:00"),
        file: "/documents/Arbeitsplatznummern_QP2023_1_31.05.23.pdf",
    },
    {
        name: "Datenschutz",
        type: "K",
        date: new Date("2023-06-01T09:00"),
        file: "/documents/Arbeitsplatznummern_QP2023_1_01.06.23.pdf",
    },
    {
        name: "IT-Recht",
        type: "K",
        date: new Date("2023-06-02T09:00"),
        file: "/documents/Arbeitsplatznummern_QP2023_1_02.06.23.pdf",
    },
];

const oralExams = [
    {
        name: "Mündliche Prüfung",
        type: "1",
        date: new Date("2023-06-06T15:30"),
        file: "/documents/Prüfungstermine_mündlicher_Teil_QP2023_1.pdf",
    },
    {
        name: "Mündliche Prüfung",
        type: "2",
        date: new Date("2023-06-12T15:30"),
        file: "/documents/Prüfungstermine_mündlicher_Teil_QP2023_1.pdf",
    },
    {
        name: "Mündliche Prüfung",
        type: "3",
        date: new Date("2023-06-13T17:00"),
        file: "/documents/Prüfungstermine_mündlicher_Teil_QP2023_1.pdf",
    },
];

const Home: NextPage = () => {
    const [currentTime] = useState(new Date());

    const getNumberOfDoneExams = () => {
        const exams = [...writtenExams, ...oralExams]
        const doneExams = exams.filter((exam) => currentTime >= exam.date);
        return doneExams.length;
    };

    return (
        <>
            <Head>
                <title>Stundenplan - Prüfungen</title>
                <meta name="description" content="Stundenplan VI20/23 TA2" />
            </Head>
            <div className="relative h-full">
                <section>
                    <h1 className="mb-2">Prüfungen</h1>
                    <Timeline
                        bulletSize={24}
                        active={getNumberOfDoneExams() - 1}
                        lineWidth={2}
                    >
                        {writtenExams.map((exam) => (
                            <Timeline.Item
                                key={exam.date.toDateString()}
                                bullet={
                                    currentTime >= exam.date && <IconCheck />
                                }
                                lineVariant={exam.name === "IT-Recht" ? "dotted" : "solid"}
                            >
                                <div className="flex max-w-md flex-wrap justify-between text-gray-100">
                                    <Text color="blue" fw={500}>
                                        {exam.name} <small>({exam.type})</small>
                                    </Text>
                                    <Link
                                        href={exam.file}
                                        target="_blank"
                                        title="Platznummern"
                                    >
                                        <IconListNumbers />
                                    </Link>
                                </div>
                                <Text color="dimmed" size="sm">
                                    {Intl.DateTimeFormat("de-DE", {
                                        
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                        
                                    }).format(exam.date)}
                                </Text>
                            </Timeline.Item>
                        ))}

                        {oralExams.map((exam) => (
                            <Timeline.Item
                                key={exam.date.toDateString()}
                                bullet={
                                    currentTime >= exam.date && <IconCheck />
                                }
                            >
                                <div className="flex max-w-md flex-wrap justify-between text-gray-100">
                                    <Text color="blue" fw={500}>
                                        {exam.name} <small>({exam.type})</small>
                                    </Text>
                                    <Link
                                        href={exam.file}
                                        target="_blank"
                                        title="Platznummern"
                                    >
                                        <IconUsers />
                                    </Link>
                                </div>
                                <Text color="dimmed" size="sm">
                                    {Intl.DateTimeFormat("de-DE", {
                                        
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        
                                    }).format(exam.date)} | V301 / V302
                                </Text>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </section>
                <p className="absolute bottom-2 right-0 text-gray-100/25">
                    <em>Angaben ohne Gewähr</em>
                </p>
            </div>
        </>
    );
};

export default Home;
