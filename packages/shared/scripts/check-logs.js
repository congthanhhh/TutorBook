// Kiểm tra mọi phiếu trong logs/ theo schema. Chạy: npm run check:logs
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { parseSlip } from '../dist/index.js';

const logsDir = fileURLToPath(new URL('../../../logs/', import.meta.url));
const files = readdirSync(logsDir).filter((f) => f.endsWith('.json')).sort();

let failed = 0;
for (const file of files) {
  const result = parseSlip(readFileSync(join(logsDir, file), 'utf8'));
  if (result.ok) {
    console.log(`✓ ${file} (${result.slip.kind})`);
  } else {
    failed++;
    console.log(`✗ ${file}`);
    for (const issue of result.issues) console.log(`    ${issue.path || '(gốc)'}: ${issue.message}`);
  }
}

console.log(`\n${files.length - failed}/${files.length} phiếu hợp lệ`);
process.exitCode = failed ? 1 : 0;
