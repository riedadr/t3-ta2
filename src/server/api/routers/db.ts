import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import mysql from "mysql2/promise";
import { env } from "../../../env.mjs";

console.log("API Test2");

export type Tfach = {
  fid: number;
  name: string;
  ilias: string;
  dozent: string;
  gruppe: string;
};

export type Tgruppe = {
  stdid: number;
  kw: number;
  tag: "mo" | "di" | "mi" | "do" | "fr";
  stunde: number;
  fach: number;
  raum: string;
};

export type Tstunde = Tgruppe & Tfach;

const connection = mysql.createConnection({
  host: env.MYSQL_URL,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASS,
  database: env.MYSQL_DB,
});

export const dbRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `DB ${input.text}`,
      };
    }),
  fächer: publicProcedure
    .input(z.optional(z.object({ gruppe: z.number() })))
    .query(async ({ input }) => {
      const query =
        input && input?.gruppe
          ? `SELECT * FROM fach WHERE gruppe='${input.gruppe}'`
          : `SELECT * FROM fach`;
      try {
        const [rows] = await (await connection).execute(query);
        return { result: rows as Tfach[], error: false };
      } catch (error) {
        console.error("❌", (error as Error).message);
        return { result: [] as Tfach[], error };
      }
    }),
  kw: publicProcedure
    .input(z.object({ kw: z.number(), gruppe: z.number() }))
    .query(async ({ input }) => {
      const query = `SELECT * FROM gruppe${input.gruppe} AS g JOIN fach ON g.fach=fach.fid WHERE kw=${input.kw} ORDER BY tag,stunde`;
      try {
        const [rows] = await (await connection).execute(query);
        return { result: rows as Tstunde[], error: false };
      } catch (error) {
        console.error("❌", (error as Error).message);
        return { result: [] as Tstunde[], error };
      }
    }),
});
