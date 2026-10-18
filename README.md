# Tutorbook

Trợ lý học TOEIC cá nhân: sổ học chung giữa người học và gia sư AI (AI nào cũng được).

## Chạy lần đầu
Cần Node 24+ và Docker Desktop.

```
cp .env.example .env
npm install
npm run db:up
npm run dev
```

Mở http://localhost:5173. Điện thoại cùng Wi-Fi mở `http://<IP máy tính>:5173`.

## Thư mục
- `tutor/playbook.md`: dán vào đầu mỗi chat với gia sư AI
- `logs/`: phiếu bàn giao từng buổi học (JSON). Cách dùng xem `logs/README.md`, kiểm tra bằng `npm run check:logs`
- `apps/api`, `apps/web`, `packages/shared`: mã nguồn (xem `AGENTS.md`)
- `docs/`: idea, quyết định (`docs/decisions.md`), spec, plan
