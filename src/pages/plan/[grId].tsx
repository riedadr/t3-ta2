import React, { useMemo, useRef } from "react";
import Head from "next/head";
import { type InferGetStaticPropsType } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { dbRouter } from "~/server/api/routers/db";
import { type TkwNrs } from "~/types/db";
import Stundenplan from "~/components/Stundenplan";
import { ColorSwatch, Table, Text, useMantineTheme } from "@mantine/core";

export async function getStaticProps({ params }: { params: { grId: string } }) {
    const ssg = createProxySSGHelpers({
        router: dbRouter,
        ctx: {},
    });

    const res = await ssg.gr.fetch({ gruppe: parseInt(params.grId) });

    return {
        props: {
            trpcState: ssg.dehydrate(),
            data: res,
            grId: params.grId,
        },
        revalidate: 1,
    };
}

export function getStaticPaths() {
    return {
        paths: ["/plan/40", "/plan/41", "/plan/42", "/plan/401", "/plan/411", "/plan/421", "/plan/402", "/plan/412", "/plan/422"],
        fallback: false,
    };
}

export default function StundenplanPage(
    props: InferGetStaticPropsType<typeof getStaticProps>
) {
    const { data, grId } = props;
    const firstMondayOfYear = useRef(getFirstMondayOfYear());
    const theme = useMantineTheme();
    const wochenplan = data.result[0]?.result || {};
    const wochen = Object.keys(wochenplan as object);
    const getGrId = () => {
        if (grId.length <= 2) return grId;
        const grIdArr = grId.split("");
        return `${grIdArr[0]!}${grIdArr[1]!}/${grIdArr[2]!}`
    }
    const title = `Stundenplan - 20/${getGrId()}`;

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

    function getFirstMondayOfYear() {
        const d = new Date(new Date().getFullYear(), 0, 1);
        while (d.getDay() !== 1) {
            d.setDate(d.getDate() + 1);
        }
        return d;
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Stundenplan VI20/23 TA2" />
            </Head>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h1>Gruppe 20/{getGrId()}</h1>
                <div className="flex justify-end gap-2">
                    <div className="flex items-baseline gap-1">
                        <ColorSwatch size={10} color={theme.colors.red[8]} />
                        <Text fz="sm">entfällt</Text>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <ColorSwatch size={10} color={theme.colors.green[8]} />
                        <Text fz="sm">ergänzt</Text>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <ColorSwatch size={10} color={theme.colors.yellow[8]} />
                        <Text fz="sm">geändert</Text>
                    </div>
                </div>
            </div>
            <Table striped highlightOnHover>
                {wochen.map((key) => (
                    <Stundenplan
                        key={key}
                        kw={key}
                        currentWeek={getWeekNo}
                        firstMonday={firstMondayOfYear.current}
                        wocheData={wochenplan[parseInt(key) as TkwNrs]}
                    />
                ))}
            </Table>
        </>
    );
}
