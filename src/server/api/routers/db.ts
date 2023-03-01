import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import mysql from "mysql2/promise";
import { env } from "../../../env.mjs";

console.log("API Test2");

type Tfach = {
  fid: number;
  name: string;
  ilias: string;
  dozent: string;
  gruppe: string;
};

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
        return { result: rows as Tfach[] };
      } catch (error) {
        console.error("❌", (error as Error).message);
        return { result: [] as Tfach[], error };
      }
    }),
  kw: publicProcedure
    .input(z.object({ kw: z.number(), gruppe: z.number() }))
    .query(async ({ input }) => {
      const query = `SELECT * FROM gruppe${input.gruppe} WHERE kw=${input.kw} GROUP BY tag ORDER BY stunde`;
      try {
        const [rows] = await (await connection).execute(query);
        return { result: rows as Tfach[] };
      } catch (error) {
        console.error("❌", (error as Error).message);
        return { result: [] as Tfach[], error };
      }
    }),
});
