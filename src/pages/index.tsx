import { useState, useEffect, useMemo } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { Select } from "@mantine/core";
import { TimelineTabs } from "~/components/TimelineTabs";

const Home: NextPage = () => {
    const [selectedGroup, setSelectedGroup] = useState<number>(40);

    const getWeekNo = useMemo(() => {
        const today = new Date();
        const year = new Date(today.getFullYear(), 0, 1);
        const days = Math.floor(
            (today.valueOf() - year.valueOf()) / (24 * 60 * 60 * 1000)
        ) + 1;
        
        const week = Math.floor(days / 7) + 1;        
        return week;
    }, []);

    const selectGroup = (groupString: string) => {
        const groupNo = parseInt(groupString);
        if (window) window.localStorage.setItem("gruppe", groupNo.toString());
        setSelectedGroup(groupNo);
    };

    useEffect(() => {
        const localGroupNo = window.localStorage.getItem("gruppe");
        if (localGroupNo) setSelectedGroup(parseInt(localGroupNo));
        
        console.log(window.history);
        
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
                    <Select
                        className="w-36"
                        value={selectedGroup.toString()}
                        onChange={selectGroup}
                        data={[
                            { value: "40", label: "Gruppe 20/40" },
                            { value: "41", label: "Gruppe 20/41" },
                            { value: "42", label: "Gruppe 20/42" },
                        ]}
                    />
                </div>
                <TimelineTabs group={selectedGroup} currentWeek={getWeekNo} />
            </>
        </>
    );
};

export default Home;
