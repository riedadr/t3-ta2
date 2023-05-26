import { useState, useEffect, useMemo } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { Select } from "@mantine/core";
import { TimelineTabs } from "~/components/TimelineTabs";
import { IconAlertTriangle } from "@tabler/icons-react";

const Home: NextPage = () => {
    const [selectedGroup, setSelectedGroup] = useState<number>(0);

    const getWeekNo = useMemo(() => {
        const today = new Date();
        const year = new Date(today.getFullYear(), 0, 1);
        const days =
            Math.floor(
                (today.valueOf() - year.valueOf()) / (24 * 60 * 60 * 1000)
            ) + 1;

        const week = Math.floor(days / 7) + 1;
        return week;
    }, []);

    const selectGroup = (groupString: string) => {
        const groupNo = parseInt(groupString);
        if (window)
            window.localStorage.setItem("kleingruppe", groupNo.toString());
        setSelectedGroup(groupNo);
    };

    useEffect(() => {
        const localGroupNo = window.localStorage.getItem("kleingruppe");
        if (localGroupNo) {
            setSelectedGroup(parseInt(localGroupNo));
        }
    }, []);

    return (
        <>
            <Head>
                <title>Stundenplan - Timeline</title>
                <meta name="description" content="Stundenplan VI20/23 TA2" />
            </Head>
            <>
                <div className="flex items-center justify-between pr-4">
                    <h1>KW {getWeekNo}</h1>
                    <div>
                        <Select
                            className="w-40"
                            value={selectedGroup.toString()}
                            onChange={selectGroup}
                            data={[
                                { value: "401", label: "Gruppe 20/40/1" },
                                { value: "402", label: "Gruppe 20/40/2" },
                                { value: "411", label: "Gruppe 20/41/1" },
                                { value: "412", label: "Gruppe 20/41/2" },
                                { value: "421", label: "Gruppe 20/42/1" },
                                { value: "422", label: "Gruppe 20/42/2" },
                            ]}
                        />
                    </div>
                </div>
                {selectedGroup ? (
                    <TimelineTabs
                        group={selectedGroup}
                        currentWeek={getWeekNo}
                    />
                ) : (
                    <div className="mt-8 flex w-full justify-center gap-2 text-amber-500 items-center">
                        <IconAlertTriangle />
                        <span>Bitte Kleingruppe auswählen</span>
                    </div>
                )}
            </>
        </>
    );
};

export default Home;
