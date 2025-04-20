import { env } from "@/data/env/server";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema"; // this should re-export the generated schema

const client = env.AUTH_DRIZZLE_URL;
export const db = drizzle(client, { schema });