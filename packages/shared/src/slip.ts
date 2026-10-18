import { z } from 'zod';

// Định dạng phiếu bàn giao v1, khớp với tutor/playbook.md.
// AI hay bỏ sót trường thay vì ghi null, nên trường tùy chọn được mặc định null và mảng mặc định [].

const optional = <T extends z.ZodType>(schema: T) => schema.nullable().default(null);
const list = <T extends z.ZodType>(item: T) => z.array(item).default([]);

const isoDate = z.iso.date();
const part = z.int().min(1).max(7);

export const ERROR_CAUSES = ['vocab', 'grammar', 'listening', 'time', 'misread', 'trap', 'careless'] as const;
export const MEMORY_TYPES = ['observation', 'preference', 'decision', 'goal', 'plan'] as const;

export const resultSchema = z
  .object({
    source: z.string().min(1),
    test: optional(z.string()),
    part,
    range: optional(z.string()),
    correct: z.int().min(0),
    total: z.int().min(1),
    minutes: optional(z.number().min(0)),
    mode: z.enum(['practice', 'mock']).default('practice'),
    difficulty: optional(z.enum(['easy', 'medium', 'hard'])),
    focus: optional(z.int().min(1).max(5)),
    note: optional(z.string()),
  })
  .refine((r) => r.correct <= r.total, { message: 'correct lớn hơn total', path: ['correct'] });

export const mockTestSchema = z.object({
  source: z.string().min(1),
  test: optional(z.string()),
  parts: z.partialRecord(z.enum(['1', '2', '3', '4', '5', '6', '7']), z.int().min(0)).default({}),
  listening_correct: optional(z.int().min(0).max(100)),
  reading_correct: optional(z.int().min(0).max(100)),
  score_listening: optional(z.int().min(5).max(495)),
  score_reading: optional(z.int().min(5).max(495)),
  score_total: optional(z.int().min(10).max(990)),
});

export const errorEntrySchema = z.object({
  source: z.string().min(1),
  test: optional(z.string()),
  part,
  no: z.int().min(1),
  question: optional(z.string()),
  options: optional(z.record(z.string(), z.string())),
  chosen: optional(z.string()),
  correct: z.string().min(1),
  tags: list(z.string()),
  cause: optional(z.enum(ERROR_CAUSES)),
  explanation: optional(z.string()),
  note: optional(z.string()),
});

export const vocabSchema = z.object({
  word: z.string().min(1),
  pos: optional(z.string()),
  ipa: optional(z.string()),
  meaning_vi: z.string().min(1),
  example: optional(z.string()),
  collocations: list(z.string()),
  word_family: list(z.string()),
  topic: optional(z.string()),
  source: optional(z.string()),
});

export const grammarSchema = z.object({
  title: z.string().min(1),
  pattern: optional(z.string()),
  explanation: optional(z.string()),
  example: optional(z.string()),
  source: optional(z.string()),
  tags: list(z.string()),
});

export const memorySchema = z.object({
  type: z.enum(MEMORY_TYPES),
  content: z.string().min(1),
});

export const nextTaskSchema = z.object({
  title: z.string().min(1),
  minutes: optional(z.number().min(0)),
  done_when: optional(z.string()),
});

export const sessionSlipSchema = z.object({
  kind: z.literal('session'),
  version: z.literal(1),
  date: isoDate,
  ai: z.string().min(1),
  results: list(resultSchema),
  mock_test: optional(mockTestSchema),
  errors: list(errorEntrySchema),
  vocab: list(vocabSchema),
  grammar: list(grammarSchema),
  quiz: optional(
    z.object({
      score: z.int().min(0),
      total: z.int().min(1),
      note: optional(z.string()),
    }),
  ),
  memory: list(memorySchema),
  handoff: z.object({
    done: z.string().min(1),
    learner_state: optional(z.string()),
    next: optional(z.string()),
  }),
  next_tasks: list(nextTaskSchema),
});

const periodSlipFields = {
  version: z.literal(1),
  period_start: isoDate,
  period_end: isoDate,
  ai: z.string().min(1),
  summary: z.string().min(1),
  progress: optional(z.string()),
  weaknesses: list(z.string()),
  strategy: optional(z.string()),
  memory: list(memorySchema),
};

export const weeklySlipSchema = z.object({ kind: z.literal('weekly'), ...periodSlipFields });
export const monthlySlipSchema = z.object({ kind: z.literal('monthly'), ...periodSlipFields });

export const slipSchema = z.discriminatedUnion('kind', [sessionSlipSchema, weeklySlipSchema, monthlySlipSchema]);

export type SessionSlip = z.infer<typeof sessionSlipSchema>;
export type WeeklySlip = z.infer<typeof weeklySlipSchema>;
export type MonthlySlip = z.infer<typeof monthlySlipSchema>;
export type Slip = z.infer<typeof slipSchema>;
