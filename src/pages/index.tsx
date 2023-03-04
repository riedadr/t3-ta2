import { useState, useEffect, type SetStateAction, type Dispatch } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { FächerTimeLine } from "~/components/fächer/FächerTimeline";
import { Button } from "@mantine/core";

const Home: NextPage = () => {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)

  function getWeekNo() {
    const today = new Date();
    const year = new Date(today.getFullYear(), 0, 1);
    const days = Math.floor((today.valueOf() - year.valueOf()) / (24 * 60 * 60 * 1000));
    const week = Math.ceil((today.getDay() + 1 + days) / 7);
    return week;
  }

	useEffect(() => {
		const localGroupNo = window.localStorage.getItem("gruppe");
    if (localGroupNo) setSelectedGroup(parseInt(localGroupNo));
	}, [])
	

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        {selectedGroup ? (
          <FächerTimeLine group={selectedGroup} currentWeek={getWeekNo()} />
        ) : (
          <GroupSelection setGroup={setSelectedGroup}/>
        )}
      </>
    </>
  );
};

function GroupSelection({ setGroup }: { setGroup: Dispatch<SetStateAction<number | null>>}) {
  
  const selectGroup = (groupNo: number) => {
    if (window) window.localStorage.setItem("gruppe", groupNo.toString());
    setGroup(groupNo)
  }
  
  return (
    <div>
      <h1>Bitte wähle eine Gruppe:</h1>
      <div>
        <Button onClick={() => selectGroup(40)}>20/40</Button>
        <Button onClick={() => selectGroup(41)}>20/41</Button>
        <Button onClick={() => selectGroup(42)}>20/42</Button>
      </div>
    </div>
  )
}

export default Home;
