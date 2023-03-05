import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import mysql from "mysql2/promise";
import { env } from "../../../env.mjs";

console.log("API Test2");

export type Tfach = {
  fid: number;
  name: string;
  kurz: string;
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



export type TgrStunde = {
  fach: string;
  kurz: string;
  dozent: string;
  ilias: string;
  raum: string;
}

export type TgrTag = {
  1?: TgrStunde;
  2?: TgrStunde;
  3?: TgrStunde;
  4?: TgrStunde;
  5?: TgrStunde;
  6?: TgrStunde;
  7?: TgrStunde;
  8?: TgrStunde;
  9?: TgrStunde;
}

export type TstdNrs = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type TgrWoche = {
  mo: TgrTag;
  di: TgrTag;
  mi: TgrTag;
  do: TgrTag;
  fr: TgrTag;
}

export type TgrRes = {
  result: 
  {
    10?: TgrWoche;
    11?: TgrWoche;
    12?: TgrWoche;
    13?: TgrWoche;
    14?: TgrWoche;
    15?: TgrWoche;
    16?: TgrWoche;
    17?: TgrWoche;
    18?: TgrWoche;
    19?: TgrWoche;
    20?: TgrWoche;
    21?: TgrWoche;
    22?: TgrWoche;
    23?: TgrWoche;
    24?: TgrWoche;
  };
}

export type TkwNrs = 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;

const connection = mysql.createConnection(env.DATABASE_URL);

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
  gr: publicProcedure
    .input(z.object({ gruppe: z.number() }))
    .query(async ({ input }) => {
      const query = `
      SELECT 
        JSON_OBJECTAGG(kw, tags) as result 
      FROM (
        SELECT 
          kw, 
          JSON_OBJECTAGG(tag, stunden) as tags 
        FROM (
          SELECT 
            kw, 
            tag, 
            JSON_OBJECTAGG(stunde, JSON_OBJECT('fach', fach.name, 'kurz', fach.kurz, "dozent", fach.dozent, "ilias", fach.ilias, "raum", raum)) as stunden 
          FROM 
            gruppe${input.gruppe} JOIN fach ON gruppe${input.gruppe}.fach=fach.fid
          GROUP BY 
            kw, tag
        ) as tag_stunden 
        GROUP BY 
          kw
      ) as kw_tags;
    `;
      try {
        const [rows] = await (await connection).execute(query);
        return { result: rows as TgrRes[], error: false };
      } catch (error) {
        console.error("❌", (error as Error).message);
        return { result: [] as TgrRes[], error };
      }
    }),
});
