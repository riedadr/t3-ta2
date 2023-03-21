import React from "react";
import Head from "next/head";
import { useRef, useEffect } from "react";
import { type InferGetStaticPropsType } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { dbRouter } from "~/server/api/routers/db";
import { type TkwNrs } from "~/types/db";
import Stundenplan from "~/components/Stundenplan";
import { ColorSwatch, Table, Text } from "@mantine/core";
import { useRouter } from "next/router";

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
        },
        revalidate: 1,
    };
}

export function getStaticPaths() {
    return {
        paths: ["/plan/40", "/plan/41", "/plan/42"],
        fallback: false,
    };
}

export default function StundenplanPage(
    props: InferGetStaticPropsType<typeof getStaticProps>
) {
    const router = useRouter();
    const { grId } = router.query;
    const { data } = props;
    const wochenplan = data.result[0]?.result || {};
    const wochen = Object.keys(wochenplan as object);
    const firstMondayOfYear = useRef(getFirstMondayOfYear());

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
                <title>Stundenplan - 20/{grId}</title>
                <meta name="description" content="Stundenplan VI20/23 TA2" />
            </Head>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h1>Gruppe {grId}</h1>
                <div className="flex justify-end gap-2">
                    <div className="flex items-baseline gap-1">
                        <ColorSwatch size={10} color="red" />
                        <Text fz="sm">entfällt</Text>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <ColorSwatch size={10} color="green" />
                        <Text fz="sm">ergänzt</Text>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <ColorSwatch size={10} color="yellow" />
                        <Text fz="sm">geändert</Text>
                    </div>
                </div>
            </div>
            <Table striped highlightOnHover>
                {wochen.map((key) => (
                    <Stundenplan
                        key={key}
                        kw={key}
                        firstMonday={firstMondayOfYear.current}
                        wocheData={wochenplan[parseInt(key) as TkwNrs]}
                    />
                ))}
            </Table>
        </>
    );
}
