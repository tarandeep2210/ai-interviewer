import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition', { length: 255 }).notNull(),
    jobDescription: varchar('jobDescription', { length: 1000 }).notNull(),
    jobExperience: varchar('jobExperience', { length: 255 }).notNull(),
    createdBy: varchar('createdBy', { length: 255 }).notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    mockId: varchar('mockId', { length: 255 }).notNull(),
});

export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockId: varchar('mockId', { length: 255 }).notNull(),
    question: varchar('question').notNull(),
    userAns: text('userAns').notNull(),
    correctAns: text('correctAns').notNull(),
    rating: varchar('rating').notNull(),
    feedback: text('feedback').notNull(),
    userEmail: varchar('userEmail', { length: 255 }).notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow()
});