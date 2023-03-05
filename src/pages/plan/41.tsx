import React from "react";
import { type InferGetStaticPropsType } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { dbRouter, type TkwNrs } from "~/server/api/routers/db";
import Stundenplan from "~/components/Stundenplan";
import { Table } from "@mantine/core";

const group = 41;

export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: dbRouter,
    ctx: {},
  });

  let res = await ssg.gr.fetch({ gruppe: group });
  if (!res) res = { result: [], error: new Error("Datenbank nicht erreichbar")}

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
