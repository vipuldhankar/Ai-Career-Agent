import { AiCareerAgent } from '@/inngest/functions';
import { integer, pgTable, varchar,json } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),

});

export const HistoryTable = pgTable('historyTable', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    recordId: varchar().notNull(),
    content: json(),
    userEmail: varchar('userEmail').references(() => usersTable.email),
    createdAt: varchar(),
    aiAgentType:varchar(),
    metaData:varchar()
  });