import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parseSlip } from './parse.js';

const playbookPath = fileURLToPath(new URL('../../../tutor/playbook.md', import.meta.url));

describe('parseSlip', () => {
  // Giữ playbook và schema luôn khớp nhau: mẫu phiếu trong playbook phải parse được.
  it('parses every JSON example in tutor/playbook.md', () => {
    const playbook = readFileSync(playbookPath, 'utf8');
    const blocks = [...playbook.matchAll(/```json\n([\s\S]*?)```/g)].map((m) => m[1]);

    expect(blocks.length).toBeGreaterThan(0);
    for (const block of blocks) {
      const result = parseSlip(block);
      expect(result.ok, JSON.stringify(result)).toBe(true);
    }
  });

  it('extracts the slip from a full AI reply with a ```json fence', () => {
    const reply = 'Phiếu của bạn:\n```json\n{"kind":"weekly","version":1,"period_start":"2026-10-19","period_end":"2026-10-25","ai":"grok","summary":"ok"}\n```\nChúc học tốt!';
    const result = parseSlip(reply);

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.slip.kind).toBe('weekly');
  });

  it('fills defaults for fields the AI left out', () => {
    const result = parseSlip('{"kind":"session","version":1,"date":"2026-10-19","ai":"gemini","handoff":{"done":"x"}}');

    expect(result.ok).toBe(true);
    if (result.ok && result.slip.kind === 'session') {
      expect(result.slip.errors).toEqual([]);
      expect(result.slip.quiz).toBeNull();
    }
  });

  it('reports invalid JSON and schema issues with a path', () => {
    expect(parseSlip('{ "kind": "session",')).toMatchObject({ ok: false });

    const result = parseSlip(
      '{"kind":"session","version":1,"date":"2026-10-19","ai":"grok","handoff":{"done":"x"},"results":[{"source":"web","part":5,"correct":31,"total":30}]}',
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.issues[0].path).toBe('results.0.correct');
  });
});
