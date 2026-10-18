import { slipSchema, type Slip } from './slip.js';

export type SlipIssue = { path: string; message: string };

export type ParseSlipResult = { ok: true; slip: Slip } | { ok: false; issues: SlipIssue[] };

// Nhận nguyên văn người dùng dán vào: có thể là JSON thuần, hoặc cả câu trả lời của AI có khối ```json.
export function parseSlip(text: string): ParseSlipResult {
  const fenced = /```(?:json)?\s*\n([\s\S]*?)```/.exec(text);
  const raw = (fenced ? fenced[1] : text).trim();

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    return { ok: false, issues: [{ path: '', message: `JSON không hợp lệ: ${(e as Error).message}` }] };
  }

  const result = slipSchema.safeParse(data);
  if (result.success) return { ok: true, slip: result.data };

  return {
    ok: false,
    issues: result.error.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
  };
}
