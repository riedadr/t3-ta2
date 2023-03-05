import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import mysql from "mysql2/promise";
import { env } from "../../../env.mjs";
import { type Tfach, type TgrRes, type Tstunde } from "~/types/db.js";

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
