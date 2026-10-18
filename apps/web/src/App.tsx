import { parseSlip } from '@tutorbook/shared'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

type Health = { status: string; db: string }

async function fetchHealth(): Promise<Health> {
  const res = await fetch('/api/health')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

function HealthBadge() {
  const { data, isError, isPending } = useQuery({ queryKey: ['health'], queryFn: fetchHealth })

  const label = isPending ? 'Đang kiểm tra…' : isError ? 'API/DB không phản hồi' : `API ok · DB ${data.db}`
  const color = isPending ? 'bg-gray-200 text-gray-700' : isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'

  return <span className={`rounded-full px-3 py-1 text-sm ${color}`}>{label}</span>
}

// Khung thử: dán phiếu để kiểm tra bằng schema dùng chung. Màn hình nhập phiếu thật sẽ làm theo spec MVP.
function SlipChecker() {
  const [text, setText] = useState('')
  const result = useMemo(() => (text.trim() ? parseSlip(text) : null), [text])

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Kiểm tra phiếu bàn giao</h2>
      <textarea
        className="h-64 w-full rounded-lg border border-gray-300 p-3 font-mono text-sm"
        placeholder="Dán phiếu JSON (hoặc cả câu trả lời của AI) vào đây…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {result?.ok && (
        <p className="rounded-lg bg-green-50 p-3 text-green-800">
          Phiếu hợp lệ: <b>{result.slip.kind}</b>
          {result.slip.kind === 'session' &&
            ` · ${result.slip.date} · ${result.slip.results.length} kết quả · ${result.slip.errors.length} câu sai · ${result.slip.vocab.length} từ mới`}
        </p>
      )}
      {result && !result.ok && (
        <ul className="space-y-1 rounded-lg bg-red-50 p-3 text-sm text-red-800">
          {result.issues.map((issue, i) => (
            <li key={i}>
              <code>{issue.path || '(gốc)'}</code>: {issue.message}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function App() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Tutorbook</h1>
        <HealthBadge />
      </header>
      <SlipChecker />
    </main>
  )
}
