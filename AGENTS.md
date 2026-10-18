# Tutorbook – hướng dẫn cho AI agent

File này dành cho mọi AI làm việc trong repo (Claude, Grok, Gemini, Cursor…). Đọc file này trước khi làm bất cứ việc gì.

## Dự án
Tutorbook là web app trợ lý học TOEIC cá nhân, chỉ có 1 người dùng. App không chứa đề hay audio: người học tự làm đề trên website luyện thi, sau đó học với một gia sư AI. App giữ toàn bộ dữ liệu học và trí nhớ của gia sư, nên đổi AI hay mở chat mới vẫn dạy tiếp được.

Mục tiêu của người học: từ ~450–500 lên 800+ TOEIC L&R, thi khoảng tháng 3–4/2027.

## Giai đoạn hiện tại
Đã dựng khung project (monorepo, NestJS, Vite, Postgres, Prisma, schema phiếu v1). **Chưa có schema database và chưa có spec MVP**: schema sẽ thiết kế sau khi phiếu v1 đã được dùng thật vài buổi.

## Đọc gì trước
1. `docs/decisions.md`: các quyết định **đã chốt**, đây là nguồn sự thật
2. `tutor/playbook.md`: prompt cho gia sư AI, trong đó có định dạng phiếu bàn giao
3. `docs/idea-v3.md`: bản idea mới nhất (vẫn là **bản nháp**)

## Quy tắc
- `docs/idea-*.md` và `data/*.csv` chỉ là phác thảo ban đầu. Chỉ những gì nằm trong `docs/decisions.md` mới là quyết định. Đừng coi nội dung nháp là ràng buộc, cứ đề xuất thay đổi nếu thấy hợp lý.
- Khi người dùng chốt một quyết định mới, ghi nó vào `docs/decisions.md` (ngày, quyết định, lý do).
- Trao đổi và viết docs bằng tiếng Việt. Tên biến, hàm, file trong code dùng tiếng Anh.
- Người dùng là sinh viên IT, fresher web và **vibecode**: AI viết code, người dùng review. Người dùng muốn học NestJS qua dự án này, nên khi dùng một khái niệm NestJS (module, provider, DI, guard, pipe…) thì giải thích ngắn gọn vì sao dùng nó.
- **Phiếu bàn giao là hợp đồng dữ liệu.** Schema Zod ở `packages/shared/src/slip.ts` và mẫu trong `tutor/playbook.md` phải luôn khớp nhau, có test kiểm tra việc này. Đổi một bên thì phải đổi cả bên kia.

## Cấu trúc thư mục
- `apps/api`: NestJS 12 (ESM), Prisma 7 + PostgreSQL. Prisma client được sinh vào `src/generated/prisma` (không commit). Cấu trúc bên trong xem mục "Quy ước NestJS"
- `apps/web`: React + Vite + Tailwind + TanStack Query. Vite proxy `/api` sang api ở cổng 3000
- `packages/shared`: schema Zod của phiếu và hàm `parseSlip`, dùng chung cho api và web
- `tutor/playbook.md`: prompt cho gia sư AI
- `logs/`: các phiếu bàn giao dạng JSON, cách đặt tên xem `logs/README.md`
- `docs/`: idea, quyết định, spec, plan
- `data/`: các file CSV nháp từ trước, có thể bỏ

## Lệnh thường dùng (chạy ở gốc repo)
- `npm install`: cài cho toàn bộ workspace, đồng thời sinh Prisma client
- `npm run db:up` / `npm run db:down`: bật hoặc tắt Postgres và Adminer (http://localhost:8080). Cần Docker Desktop đang chạy
- `npm run dev`: chạy shared (watch), api (http://localhost:3000/api) và web (http://localhost:5173)
- `npm test`: chạy test của mọi workspace. `npm run test:e2e -w @tutorbook/api` cần database đang chạy
- `npm run check:logs`: kiểm tra mọi phiếu trong `logs/` theo schema
- `npm run db:migrate -w @tutorbook/api`: tạo và áp dụng migration Prisma

## Quy ước code
- Mọi package đều là ESM. Trong `apps/api` và `packages/shared`, import nội bộ phải có đuôi `.js` (`./slip.js`), vì TypeScript chạy ở chế độ `nodenext`.
- Package `shared` được build ra `dist/`. Sửa `shared` thì `npm run dev` tự build lại; nếu chạy riêng lẻ thì phải `npm run build -w @tutorbook/shared` trước.
- File `.env` nằm ở gốc repo (copy từ `.env.example`), dùng chung cho docker compose, Prisma và api.
- Cài Prisma thì ghim bản 7.x: tag `latest` trên npm đang trỏ vào bản 8 RC.

## Quy ước NestJS (`apps/api/src`)
```
src/
├── main.ts, app.module.ts
├── config/       ← schema Zod cho .env (validateEnv)
├── prisma/       ← PrismaModule (@Global) + PrismaService
├── share/        ← dùng chung trong api: pipes/, filters/, (decorators/, guards/, interceptors/ khi cần)
└── modules/      ← mỗi tính năng một thư mục
    └── <feature>/
        ├── <feature>.module.ts
        ├── <feature>.controller.ts   ← chỉ lo HTTP: nhận request, gọi service, trả kết quả
        ├── <feature>.service.ts      ← toàn bộ nghiệp vụ, dùng PrismaService để đọc/ghi DB
        ├── dto/                      ← schema Zod + type (z.infer) cho body/query
        └── <feature>.service.spec.ts
```
- **`share/` (trong api) khác `packages/shared` (ở gốc repo).** `share/` chứa pipe, filter… chỉ api dùng. `packages/shared` chứa code dùng chung giữa api và web (schema phiếu). Đừng để lẫn.
- Chỉ tạo thư mục con trong `share/` khi có file đầu tiên cần đặt vào, không tạo thư mục rỗng.
- Ba lớp: Controller → Service → PrismaService. Không thêm lớp Repository, vì Prisma client đã đóng vai trò đó.
- Validate input bằng `ZodValidationPipe` (`share/pipes`) với schema trong `dto/`: `@Body(new ZodValidationPipe(schema)) body: Dto`. Không dùng class-validator.
- Mọi lỗi trả về cùng một dạng `ErrorBody` (`share/filters/all-exceptions.filter.ts`, đăng ký qua `APP_FILTER`). Trong service, báo lỗi bằng exception có sẵn của Nest (`NotFoundException`, `BadRequestException`…).
- Đọc cấu hình qua `ConfigService<Env, true>`, không đọc thẳng `process.env`. Thêm biến môi trường mới thì khai báo trong `config/env.schema.ts` và `.env.example`.
- Module mới: `npx nest g module modules/<feature>` (chạy trong `apps/api`), sau đó thêm controller/service theo cấu trúc trên.
