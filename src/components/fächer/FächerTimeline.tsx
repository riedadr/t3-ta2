import { useState, useEffect } from "react";
import type { Tstunde } from "~/server/api/routers/db";
import { Button } from '@mantine/core';

export function FächerTimeLine({ data }: { data: Tstunde[] }) {
  const [day, setDay] = useState(new Set<Tstunde>());
  const [weekDay, setWeekDay] = useState(getWeekDay());

  function getWeekDay() {
    const weekDays = ["so", "mo", "di", "mi", "do", "fr", "sa"];
    const today = new Date();
    let dayNo = today.getDay();

    if (dayNo == 0 || dayNo == 6) dayNo = 1; // show monday on weekend
    return weekDays.at(dayNo) || "mo";
  }

  function setDayList(selectedDay: string) {
    const stunden = new Set<Tstunde>();

    data.forEach((stunde) => {
      if (stunde.tag === selectedDay) stunden.add(stunde);
    });

    setDay(stunden);
  }

  useEffect(() => {
    setDayList(weekDay);
  }, [weekDay]);

  return (
    <>
		<div className="flex gap-2">
			<Button variant={weekDay === "mo" ? "filled" : "default"} onClick={() => setWeekDay("mo")}>Montag</Button>
			<Button variant={weekDay === "di" ? "filled" : "default"} onClick={() => setWeekDay("di")}>Dienstag</Button>
			<Button variant={weekDay === "mi" ? "filled" : "default"} onClick={() => setWeekDay("mi")}>Mittwoch</Button>
			<Button variant={weekDay === "do" ? "filled" : "default"} onClick={() => setWeekDay("do")}>Donnerstag</Button>
			<Button variant={weekDay === "fr" ? "filled" : "default"} onClick={() => setWeekDay("fr")}>Freitag</Button>
		</div>
      <section>
        <ul>
          {[...day].map((stunde) => (
            <li key={stunde.stdid}>{stunde.name}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
