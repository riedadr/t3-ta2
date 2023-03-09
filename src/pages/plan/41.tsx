import React from "react";
import { type InferGetStaticPropsType } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { dbRouter } from "~/server/api/routers/db";
import { type TkwNrs } from "~/types/db";
import Stundenplan from "~/components/Stundenplan";
import { Table } from "@mantine/core";
import Head from "next/head";

const group = 41;

export async function getStaticProps() {
    const ssg = createProxySSGHelpers({
        router: dbRouter,
        ctx: {},
    });

    const res = await ssg.gr.fetch({ gruppe: group });

    return {
        props: {
            trpcState: ssg.dehydrate(),
            data: res,
        },
    };
}

export default function gr40(
    props: InferGetStaticPropsType<typeof getStaticProps>
) {
    const { data } = props;
    const wochenplan = data.result[0]?.result || {};
    const wochen = Object.keys(wochenplan as object);

    return (
        <>
            <Head>
                <title>Stundenplan - 20/41</title>
                <meta name="description" content="Stundenplan VI20/23 TA2" />
            </Head>
            <h1>Gruppe {group}</h1>
            <Table striped highlightOnHover>
                {wochen.map((key) => (
                    <Stundenplan
                        key={key}
                        kw={key}
                        wocheData={wochenplan[parseInt(key) as TkwNrs]}
                    />
                ))}
            </Table>
        </>
    );
}
