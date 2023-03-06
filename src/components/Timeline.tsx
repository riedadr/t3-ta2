import { useState, useEffect } from "react";
import { type Tstunde } from "~/types/db";
import { Button, Timeline, Text } from "@mantine/core";
import { api } from "~/utils/api";

export function FächerTimeLine({
    group,
    currentWeek,
}: {
    group: number;
    currentWeek: number;
}) {
    const [day, setDay] = useState(new Map<number, Tstunde | null>());
    const [currentDay] = useState(getCurrentDay());
    const [selectedDay, setSelectedDay] = useState(getCurrentDay());
    const [currentLesson, setCurrentLesson] = useState(-1);
    const woche = api.db.kw.useQuery({ gruppe: group, kw: currentWeek });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data = woche.data?.result || [];

    function getCurrentDay() {
        const daysOfWeek = ["so", "mo", "di", "mi", "do", "fr", "sa"];
        const today = new Date();
        const dayNo = today.getDay();

        return daysOfWeek.at(dayNo) || "mo";
    }

    function markProgress() {
        const today = new Date();
        const h = today.getHours();
        const m = today.getMinutes();
        const progress = (h - 8) * 60 + m;

        let curr = -1;
        if (progress > 0) curr = 0; //0800
        if (progress > 45) curr = 1; //0845
        if (progress > 120) curr = 2; //1000
        if (progress > 165) curr = 3; //1045
        if (progress > 240) curr = 4; //1200
        if (progress > 285) curr = 5; //1245
        if (progress > 330) curr = 6; //1330
        if (progress > 390) curr = 7; //1430
        if (progress > 435) curr = 8; //1515
        if (progress > 480) curr = 9; //1600
        setCurrentLesson(curr);
    }

    useEffect(() => {
        function getDayList() {
            const stundenMap = new Map<number, Tstunde | null>();
            data.forEach((stunde) => {
                if (stunde.tag === selectedDay) {
                    while (stundenMap.size < stunde.stunde)
                        stundenMap.set(stundenMap.size + 1, null);
                    stundenMap.set(stunde.stunde, stunde);
                }
            });
            return stundenMap;
        }
        setDay(getDayList());

        if (selectedDay === "sa" || selectedDay === "so") setSelectedDay("mo");
        if (selectedDay === currentDay) markProgress();
        else setCurrentLesson(-1);
    }, [selectedDay, currentDay, data]);

    const getTimes = (stdNo: number) => {
        let times = "";

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
            <div className="mb-12 mt-2 flex gap-2">
                <Button
                    variant={selectedDay === "mo" ? "filled" : "default"}
                    onClick={() => setSelectedDay("mo")}
                >
                    Mo
                </Button>
                <Button
                    variant={selectedDay === "di" ? "filled" : "default"}
                    onClick={() => setSelectedDay("di")}
                >
                    Di
                </Button>
                <Button
                    variant={selectedDay === "mi" ? "filled" : "default"}
                    onClick={() => setSelectedDay("mi")}
                >
                    Mi
                </Button>
                <Button
                    variant={selectedDay === "do" ? "filled" : "default"}
                    onClick={() => setSelectedDay("do")}
                >
                    Do
                </Button>
                <Button
                    variant={selectedDay === "fr" ? "filled" : "default"}
                    onClick={() => setSelectedDay("fr")}
                >
                    Fr
                </Button>
            </div>
            <section>
                <Timeline active={currentLesson}>
                    {[...day].map((stunde, index) => (
                        <Timeline.Item
                            key={stunde[1]?.stdid || index}
                            bullet={index + 1}
                        >
                            {stunde[1] ? (
                                <div>
                                    <Text color="dimmed">
                                        {getTimes(index + 1)} | {stunde[1].kurz}
                                    </Text>
                                    <Text color="blue" fw={500}>
                                        {stunde[1].name}
                                    </Text>
                                    <Text>
                                        {stunde[1].dozent} | {stunde[1].raum}
                                    </Text>
                                </div>
                            ) : (
                                <div>
                                    <Text color="dimmed" fs="italic">
                                        {getTimes(index + 1)} | frei
                                    </Text>
                                </div>
                            )}
                        </Timeline.Item>
                    ))}
                </Timeline>
            </section>
        </>
    );
}
