import React from "react";
import Head from "next/head";
import { type InferGetStaticPropsType } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { dbRouter } from "~/server/api/routers/db";
import { type TkwNrs } from "~/types/db";
import Stundenplan from "~/components/Stundenplan";
import { Table } from "@mantine/core";
import { useRouter } from 'next/router'



export async function getStaticProps({params}: {params: {grId: string}}) {
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
        revalidate: 1
    };
}

export function getStaticPaths() {
	return {
		paths: [
			"/plan/40",
			"/plan/41",
			"/plan/42",
		],
		fallback: false
	}
}

export default function StundenplanPage(
    props: InferGetStaticPropsType<typeof getStaticProps>
) {
	const router = useRouter();
    const { grId } = router.query;
    const { data } = props;
    const wochenplan = data.result[0]?.result || {};
    const wochen = Object.keys(wochenplan as object);

    return (
        <>
            <Head>
                <title>Stundenplan - 20/40</title>
                <meta name="description" content="Stundenplan VI20/23 TA2" />
            </Head>
            <h1>Gruppe {grId}</h1>
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
