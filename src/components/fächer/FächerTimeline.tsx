import { useState, useEffect } from "react";
import type { Tstunde } from "~/server/api/routers/db";
import { Button, Timeline, Text } from "@mantine/core";

export function FächerTimeLine({
  data,
  currentWeek,
}: {
  data: Tstunde[];
  currentWeek: boolean;
}) {
  const [day, setDay] = useState(new Map<number, Tstunde | null>());
  const [weekDay, setWeekDay] = useState(getWeekDay());
  const [currentLesson, setCurrentLesson] = useState(-1);

  function getWeekDay() {
    const weekDays = ["so", "mo", "di", "mi", "do", "fr", "sa"];
    const today = new Date();

    let dayNo = today.getDay();
    if (dayNo == 0 || dayNo == 6) dayNo = 1; // show monday on weekend

    return weekDays.at(dayNo) || "mo";
  }

  function setDayList(selectedDay: string) {
    const stundenMap = new Map<number, Tstunde | null>();
    data.forEach((stunde) => {
      if (stunde.tag === selectedDay) {
        while (stundenMap.size < stunde.stunde)
          stundenMap.set(stundenMap.size + 1, null);
        stundenMap.set(stunde.stunde, stunde);
      }
    });
    setDay(stundenMap);
  }

  useEffect(() => {
    setDayList(weekDay);
		console.log("list updated");
		
    if (weekDay === getWeekDay() && currentWeek) {
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
    } else setCurrentLesson(-1);
		
  }, [weekDay, currentWeek]);

  return (
    <>
      <div className="mb-12 flex gap-2">
        <Button
          variant={weekDay === "mo" ? "filled" : "default"}
          onClick={() => setWeekDay("mo")}
        >
          Montag
        </Button>
        <Button
          variant={weekDay === "di" ? "filled" : "default"}
          onClick={() => setWeekDay("di")}
        >
          Dienstag
        </Button>
        <Button
          variant={weekDay === "mi" ? "filled" : "default"}
          onClick={() => setWeekDay("mi")}
        >
          Mittwoch
        </Button>
        <Button
          variant={weekDay === "do" ? "filled" : "default"}
          onClick={() => setWeekDay("do")}
        >
          Donnerstag
        </Button>
        <Button
          variant={weekDay === "fr" ? "filled" : "default"}
          onClick={() => setWeekDay("fr")}
        >
          Freitag
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
