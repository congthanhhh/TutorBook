# Nhật ký quyết định

Chỉ ghi những gì người dùng đã chốt. Mỗi mục gồm quyết định và lý do. Mọi thứ không có ở đây đều là bản nháp.

## 2026-10-18

- **Mục đích cốt lõi: giữ mạch học liên tục giữa các phiên chat và giữa các AI.** AI là gia sư. App là cuốn giáo trình kiêm sổ học, chứa đủ thông tin về các buổi đã học và đã dạy. App phục vụ hai đối tượng:
  - *AI:* đọc lại tình hình để dạy tiếp.
  - *Người học:* dùng như cuốn sổ để học từ vựng, ghi chủ điểm ngữ pháp, lưu những câu cần ôn và theo dõi tiến độ.

  *Lý do:* AI quên khi context dài, chat mới thì mất hết những gì đã học, và người học có thể đổi AI bất cứ lúc nào (ví dụ hết subscription ChatGPT thì chuyển sang Grok).
- **Chỉ có một người dùng.** Không làm đăng nhập cho nhiều người, không tính chuyện làm sản phẩm.
  *Lý do:* thiết kế cho nhiều người sẽ làm MVP dày lên gấp nhiều lần. Dùng thật 2–3 tháng rồi mới tính tiếp.
- **MVP gồm: briefing, phiếu bàn giao, màn hình Hôm nay và sổ ôn tập** (câu sai, từ vựng, ngữ pháp).
  - Việc hằng ngày lấy từ phần "việc cho buổi sau" trong phiếu, MVP không có module kế hoạch riêng.
  - App có nút copy cho từng phần dữ liệu (một câu sai, các từ đến hạn ôn…) để dán vào chat khi cần.

  *Lý do:* giữ đúng phần mà một thư mục Markdown làm kém: briefing gọn, ôn tập theo lịch, tra cứu. Tránh để việc làm app thành một cách trì hoãn.
- **Dữ liệu vào app qua "phiếu bàn giao".** Cuối buổi học, AI xuất một phiếu có cấu trúc. Người dùng dán phiếu vào app, xem trước, sửa nếu cần rồi lưu. Cách này đối xứng với nút "Tạo briefing": đầu buổi copy briefing ra, cuối buổi dán phiếu vào.
  *Lý do:* dùng được với mọi AI và mọi gói (kể cả bản miễn phí), không cần URL public hay OAuth, và người học duyệt dữ liệu trước khi lưu.
  *Đã kiểm tra (10/2026):* Grok và Gemini đều đã hỗ trợ MCP server tùy chỉnh. Vì vậy MCP là hướng chính cho V2, xem mục "Còn mở".
- **Lộ trình kết nối AI: MVP dán phiếu, V2 làm MCP server, browser extension chỉ làm khi copy-dán thật sự phiền.** Phần lõi (`IngestService` nhận phiếu, `BriefingService` soạn briefing) dùng chung cho mọi cách kết nối, các kênh chỉ là lớp vỏ mỏng gọi vào.
  *Lý do:* MCP cần URL public và OAuth, nên chưa hợp với MVP chạy local.
- **Phiếu v1 dùng ngay từ 2026-10-19** (xem `tutor/playbook.md`, cách lưu xem `logs/README.md`). Phiếu là JSON, có trường `kind` (`session`, `weekly`, `monthly`) và `version`. Đây cũng là định dạng app sẽ import.
- **Trí nhớ phân tầng gồm 3 tầng: buổi (handoff), tuần, tháng hoặc giai đoạn. Không có tầng ngày.** Briefing lấy bản tóm tắt tháng hiện tại, tuần hiện tại và 2–3 handoff gần nhất.
  *Lý do:* briefing luôn ngắn dù đã học bao lâu. Mỗi ngày chỉ học một buổi nên tầng ngày trùng với tầng buổi.
- **MVP chạy local trên máy ở nhà, chưa deploy.**
  *Lý do:* người dùng chủ yếu dùng app ở nhà. Điện thoại vẫn truy cập được qua mạng Wi-Fi nhà.
- **Backend dùng NestJS, database dùng PostgreSQL chạy bằng Docker ở local.**
  *Lý do:* người dùng muốn học NestJS. Postgres có full-text search, có pgvector khi cần RAG, và dễ đưa lên cloud sau này.
- **Frontend: React + Vite + TypeScript (SPA), Tailwind, shadcn/ui, TanStack Query. ORM: Prisma. Validation: Zod**, schema phiếu dùng chung cho backend, frontend và JSON Schema.
  *Lý do:* app một người dùng chạy local nên không cần SSR. Next.js có backend riêng (Route Handlers, Server Actions), dễ chồng chéo với NestJS. Prisma có schema dễ đọc và migration tốt. Dùng Zod thì định dạng phiếu chỉ cần định nghĩa ở một chỗ.
- **Monorepo với npm workspaces**: `apps/api` (NestJS), `apps/web` (React + Vite), `packages/shared` (Zod schema phiếu), nằm chung repo với `docs/`, `logs/`, `tutor/`.
  *Lý do:* schema phiếu dùng chung cho api và web; AI thấy cùng lúc spec, schema và code. Người dùng đã quen npm, chưa từng dùng yarn, nên chọn npm để bớt một công cụ phải học.
- **Đã dựng khung project** với: NestJS 12 (ESM, tạo sẵn Vitest và oxlint), Prisma 7.10 kết nối qua `@prisma/adapter-pg`, Postgres 17 chạy bằng image `pgvector/pgvector:pg17`, Vite 8 + React 19 + Tailwind 4, Zod 4.
  - Test dùng **Vitest** cho cả api lẫn web, thay cho Jest đã định trước đó, vì NestJS 12 tạo sẵn Vitest.
  - shadcn/ui sẽ cài khi bắt đầu làm UI thật.
- **Chưa làm RAG, để sau khi đã có MCP.**
  *Lý do:* ở MVP app không gọi LLM nào nên RAG chưa có chỗ dùng. Toàn cảnh đã có trí nhớ phân tầng lo, còn tra cứu thì lọc theo tag/Part/ngày cộng full-text search là đủ. Khi AI gọi được tool như `search_memory` thì chỉ cần bật pgvector.
- **Học TOEIC ngay, không chờ app.** Từ bây giờ AI xuất phiếu cuối mỗi buổi, người dùng lưu phiếu vào `logs/`, app xong thì import lại.
  *Lý do:* không để việc làm app làm chậm việc học.
- **Người học làm đề trên website luyện thi đã đăng ký.** Website có sẵn đề, bấm giờ như thi thật, có đáp án và giải thích. Tutorbook chỉ là nơi lưu, không chứa đề hay bài test. Chỗ nào chưa hiểu thì người học copy câu hỏi sang hỏi gia sư AI.
  *Hệ quả:*
  - Câu sai được báo bằng số câu kèm đáp án, hoặc copy nguyên văn từ web, không chụp ảnh.
  - Nguyên văn câu hỏi là trường tùy chọn. Nguồn và số câu là bắt buộc.
  - Playbook có quy tắc: AI chỉ viết lời giải thích cho câu mà nó đã thấy nguyên văn.
- **Code bằng vibecode với nhiều AI.** Người dùng là sinh viên IT và fresher web, đọc và review được code. `AGENTS.md` là hướng dẫn chung cho mọi AI, `CLAUDE.md` chỉ import lại nó.

## Còn mở
- Phiếu v1 và playbook: sau vài buổi dùng thật thì rà lại các trường
- Giữ hay bỏ `data/*.csv` (đề xuất bỏ, vì phiếu JSON đã thay vai trò này)
