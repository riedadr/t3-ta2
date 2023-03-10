import { useState, useEffect, useMemo } from "react";
import { type TweekDay, type Tstunde } from "~/types/db";
import { Timeline, Text, Tabs, Loader } from "@mantine/core";
import { api } from "~/utils/api";

export function TimelineTabs({
    group,
    currentWeek,
}: {
    group: number;
    currentWeek: number;
}) {
    const getCurrentDay = useMemo(() => {
        const daysOfWeek = ["so", "mo", "di", "mi", "do", "fr", "sa"];
        const today = new Date();
        const dayNo = today.getDay();

        return daysOfWeek.at(dayNo) || "mo";
    }, []);

    const [week, setWeek] = useState(new Map<string, Array<Tstunde | null>>());
    const [currentDay] = useState(getCurrentDay);
    const [selectedDay, setSelectedDay] = useState<string>(
        getCurrentDay === "sa" || getCurrentDay === "so" ? "mo" : getCurrentDay
    );
    const [currentLesson, setCurrentLesson] = useState(-1);
    const woche = api.db.kw.useQuery({ gruppe: group, kw: currentWeek });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data = woche.data?.result || [];

    function markProgress() {
        const today = new Date();
        const h = today.getHours();
        const m = today.getMinutes();
        const progress = (h - 8) * 60 + m;

        let curr = -1;
        if (progress > 0) curr = 0; //0800
        if (progress > 45) curr = 1; //0845
        if (progress > 105) curr = 2; //0945
        if (progress > 165) curr = 3; //1045
        if (progress > 225) curr = 4; //1145
        if (progress > 285) curr = 5; //1245
        if (progress > 330) curr = 6; //1330
        if (progress > 390) curr = 7; //1430
        if (progress > 435) curr = 8; //1515
        if (progress > 480) curr = 9; //1600
        setCurrentLesson(curr);
    }

    function getDayList(list: Tstunde[]) {
        // Gibt ein Array mit den Stunden (bzw. Null bei Freistunden) eines Tages zurück
        const stundenArr = [] as Array<Tstunde | null>;
        list.forEach((stunde) => {
            while (stundenArr.length + 1 < stunde.stunde) stundenArr.push(null);
            stundenArr.push(stunde);
        });
        return stundenArr;
    }

    useEffect(() => {
        const weekMap = new Map<TweekDay, Array<Tstunde | null>>();
        const vlMo = getDayList(data.filter((stunde) => stunde.tag === "mo"));
        const vlDi = getDayList(data.filter((stunde) => stunde.tag === "di"));
        const vlMi = getDayList(data.filter((stunde) => stunde.tag === "mi"));
        const vlDo = getDayList(data.filter((stunde) => stunde.tag === "do"));
        const vlFr = getDayList(data.filter((stunde) => stunde.tag === "fr"));

        weekMap.set("mo", vlMo);
        weekMap.set("di", vlDi);
        weekMap.set("mi", vlMi);
        weekMap.set("do", vlDo);
        weekMap.set("fr", vlFr);

        setWeek(weekMap);
    }, [data]);

    useEffect(() => {
        if (selectedDay === currentDay) markProgress();
        else setCurrentLesson(-1);
    }, [selectedDay, currentDay, data]);


    const getTimes = (stdNo: number) => {
        let times = "";

        // Freitag: 5. Stunde ab 11:45
        if (selectedDay === "fr" && stdNo == (5 || 6 || 7)) stdNo = -1 * stdNo;

        switch (stdNo) {
            case 1:
                times = "08:00 - 08:45";
                break;
            case 2:
                times = "08:45 - 09:30";
                break;
            case 3:
                times = "10:00 - 10:45";
                break;
            case 4:
                times = "10:45 - 11:30";
                break;
            case 5:
                times = "12:00 - 12:45";
                break;
            case 6:
                times = "12:45 - 13:30";
                break;
            case 7:
                times = "13:30 - 14:15";
                break;
            case 8:
                times = "14:30 - 15:15";
                break;
            case 9:
                times = "15:15 - 16:00";
                break;
            case -5:
                times = "11:45 - 12:30";
                break;
            case -6:
                times = "12:30 - 13:15";
                break;
            case -7:
                times = "13:15 - 14:15";
                break;
        }

        return times;
    };

    return (
        <>
            <Tabs
                value={selectedDay}
                onTabChange={(e) => setSelectedDay(e as TweekDay)}
            >
                <Tabs.List>
                    <Tabs.Tab value="mo">Mo</Tabs.Tab>
                    <Tabs.Tab value="di">Di</Tabs.Tab>
                    <Tabs.Tab value="mi">Mi</Tabs.Tab>
                    <Tabs.Tab value="do">Do</Tabs.Tab>
                    <Tabs.Tab value="fr">Fr</Tabs.Tab>
                </Tabs.List>

                {data.length && week.size >= 5 ? (
                    ["mo", "di", "mi", "do", "fr"].map((tag) => (
                        <Tabs.Panel className="mt-8" key={tag} value={tag}>
                            <Timeline active={currentLesson}>
                                {(week.get(tag) as Array<Tstunde | null>).map(
                                    (stunde, index) => (
                                        <Timeline.Item
                                            key={stunde ? stunde.stdid : index}
                                            bullet={index + 1}
                                        >
                                            {stunde ? (
                                                <div>
                                                    <Text color="dimmed">
                                                        {getTimes(index + 1)} |{" "}
                                                        {stunde.kurz}
                                                    </Text>
                                                    <Text color="blue" fw={500}>
                                                        {stunde.name}
                                                    </Text>
                                                    <Text>
                                                        {stunde.dozent} |{" "}
                                                        {stunde.raum}
                                                    </Text>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Text
                                                        color="dimmed"
                                                        fs="italic"
                                                    >
                                                        {getTimes(index + 1)} |
                                                        frei
                                                    </Text>
                                                </div>
                                            )}
                                        </Timeline.Item>
                                    )
                                )}
                            </Timeline>
                        </Tabs.Panel>
                    ))
                ) : (
                    <div className="mt-8 flex w-full justify-center">
                        <Loader />
                    </div>
                )}
            </Tabs>
        </>
    );
}
