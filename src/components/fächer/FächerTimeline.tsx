import { useState, useEffect } from "react";
import type { Tstunde } from "~/server/api/routers/db";
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
  const [selectedDay, setSelectedDay] = useState(
    getCurrentDay() === ("sa" || "so") ? "mo" : getCurrentDay()
  );
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
    if (progress > 0) curr = 1; //0800
    if (progress > 45) curr = 2; //0845
    if (progress > 120) curr = 3; //1000
    if (progress > 165) curr = 4; //1045
    if (progress > 240) curr = 5; //1200
    if (progress > 285) curr = 6; //1245
    if (progress > 330) curr = 7; //1330
    if (progress > 390) curr = 8; //1430
    if (progress > 435) curr = 9; //1515
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
    if (selectedDay === currentDay) markProgress();
  }, [selectedDay, currentDay, data]);

  return (
    <>
    <h1>Woche {currentWeek - 8} (KW {currentWeek})</h1>
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
            <Timeline.Item key={index} bullet={index + 1}>
              {stunde[1] ? (
                <div>
                  <Text>{stunde[1].name}</Text>
                  <Text>
                    {stunde[1].dozent} | {stunde[1].raum}
                  </Text>
                </div>
              ) : (
                <Text color="dimmed" fs="italic">
                  frei
                </Text>
              )}
            </Timeline.Item>
          ))}
        </Timeline>
      </section>
    </>
  );
}
