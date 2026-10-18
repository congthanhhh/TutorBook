# Tutorbook – Idea v3 (dự án ôn TOEIC)

> Trợ lý học TOEIC cá nhân, **AI nào kết nối vào cũng tiếp tục dạy được**.
> Mục tiêu người học: từ ~450–500 lên **800+ TOEIC L&R**, thi khoảng tháng 3–4/2027.

## 0. Thay đổi qua các phiên bản
- **v1:** app học TOEIC đầy đủ, có cả nội dung (đề, audio)
- **v2:** bỏ phần nội dung. Nội dung lấy từ ETS 2026, Hacker TOEIC 2/3 và web luyện thi, app chỉ làm **trợ lý học**
- **v3:** thiết kế **AI-agnostic**, tức không phụ thuộc vào một AI cụ thể. App giữ toàn bộ trí nhớ, AI (Grok, ChatGPT, Claude…) chỉ là người dạy theo ca và có thể thay bất cứ lúc nào. Tên cũ Toeiq Ascend được đổi thành **Tutorbook**: "sổ học tập chung" giữa người học và gia sư AI. App không chứa đề hay audio, người học tự làm đề ở nơi khác rồi quay lại báo kết quả, hỏi bài, và AI ghi mọi thứ vào Tutorbook.

## 1. Triết lý thiết kế (AX – AI Experience)
1. **App là nguồn sự thật duy nhất.** Không AI nào giữ trí nhớ riêng, mọi thứ cần để dạy tiếp đều nằm trong app.
2. **AI là người dạy theo ca.** Đầu buổi đọc briefing, cuối buổi ghi bàn giao. Đổi AI giống như đổi giáo viên mà vẫn dùng chung một sổ theo dõi.
3. **Dữ liệu dễ đọc cho cả người và máy.** Có cấu trúc rõ ràng, có ghi chú bằng ngôn ngữ tự nhiên, ghi lại ai viết và viết lúc nào.
4. **Người học vẫn tự học.** App hỗ trợ ghi chép, ôn tập, đánh giá, không thay thế việc tự học.
5. **Đo bằng kết quả, không đo bằng giờ ngồi.**

## 1b. Vòng lặp học với Tutorbook
1. **AI giao việc:** đọc briefing trong Tutorbook, rồi nói cho bạn biết hôm nay làm gì (ví dụ "ETS 2026 Test 2, Part 3–4")
2. **Bạn tự làm bài** ở sách hoặc web TOEIC (ở đó có sẵn điểm và đáp án để dò)
3. **Quay lại báo kết quả cho AI:** điểm, câu sai, chỗ chưa hiểu, hỏi cấu trúc và lưu ý
4. **AI giảng giải, ra mini quiz,** rồi ghi tất cả vào Tutorbook: buổi học, câu sai, giải thích, từ mới, ghi chú, nhận xét, bàn giao
5. **Bạn mở Tutorbook** để xem lại, ôn từ vựng, làm lại câu sai và theo dõi tiến độ

Tutorbook giống như **giáo trình kiêm sổ liên lạc** mà AI dùng để dạy, còn người học thì xem được toàn bộ.

## 1c. Chức năng trung tâm: Lịch trình và việc cần làm
Người học tự nhận là lười và hay trì hoãn, nhất là giai đoạn đầu. Vì vậy **app phải luôn nói rõ hôm nay học gì, làm gì**, người học không phải tự nghĩ.
- **Lịch trình nhiều tầng:** lộ trình 5 tháng, chia thành giai đoạn theo tháng, rồi kế hoạch tuần, rồi việc từng ngày
- **Việc cụ thể, đếm được:** ví dụ "ETS 2026 Test 2 – Part 5, câu 101–130", "ôn 20 từ đến hạn", "làm lại 5 câu sai Part 3". Không ghi chung chung kiểu "học Listening"
- **Mỗi việc có:** khung giờ gợi ý, thời lượng ước tính, nguồn (sách/web, đề, câu), tiêu chí hoàn thành (ví dụ đúng từ 70% trở lên), và nút "báo kết quả"
- **AI lên lịch:** tạo việc cho từng ngày dựa trên kế hoạch tuần, kết quả gần đây, câu sai và từ đến hạn ôn
- **Tự điều chỉnh:** việc chưa xong tự dời sang hôm sau, AI giảm hoặc tăng tải theo kết quả, bỏ buổi không bị phạt
- **Xem theo ngày, tuần, tháng:** biết hôm nay làm gì, tuần này đã xong bao nhiêu, đang ở đâu trong lộ trình
- **Đồng bộ Google Calendar (tùy chọn):** đẩy khung giờ học lên lịch, kèm danh sách việc
- **Giảm dần theo thời gian:** khi đã thành thói quen (ví dụ streak từ 30 ngày trở lên), người học có thể chuyển sang chế độ tự lên lịch, AI chỉ còn gợi ý

## 2. Kiến trúc tổng quan
```
┌──────────────┐     ┌──────────────────────────────┐
│  Người học   │────▶│  Web app Tutorbook           │
│ (trình duyệt)│     │  (UI: Hôm nay, Log, Vocab…)  │
└──────────────┘     └──────────────┬───────────────┘
                                    │
                         ┌──────────▼──────────┐
                         │  Backend + Database │
                         └───┬─────────────┬───┘
                             │             │
                   ┌─────────▼───┐   ┌─────▼──────┐
                   │ MCP server  │   │ REST API   │
                   └─────┬───────┘   └─────┬──────┘
                         │                 │
            Grok · Claude · ChatGPT · Cursor · AI khác
```
- **MCP server** (Model Context Protocol): chuẩn mở để AI kết nối với công cụ bên ngoài, Claude, ChatGPT, Cursor và Grok đều dùng được. Đây là kênh kết nối chính.
- **REST API:** dành cho AI hoặc script chưa hỗ trợ MCP, và cho chính frontend dùng.
- Cả hai dùng chung một lớp logic nên hành vi giống nhau.

## 3. Ba lớp dữ liệu

### 3.1 Dữ liệu học (có cấu trúc, là "sự thật")
- **Session:** buổi học, gồm ngày, nguồn, Part, số câu đúng/tổng, thời gian, tự đánh giá, kết quả mini quiz
- **Task:** việc của từng ngày và trạng thái
- **ErrorEntry:** sổ lỗi sai, gồm nguyên văn câu hỏi (đề bài, đoạn văn/transcript, các đáp án), nguồn, số câu, Part, tag, nguyên nhân, giải thích, lịch làm lại
- **Vocab + VocabReview:** từ vựng và lịch ôn SRS
- **MockTest:** điểm đề thi thử từng Part và điểm quy đổi
- **GrammarPoint:** sổ ngữ pháp và công thức, gồm tiêu đề, công thức, giải thích, ví dụ, nguồn (đề/câu), tag, lịch ôn
- **Note:** ghi chú tự do, mẹo làm bài

### 3.2 Bộ nhớ gia sư (Tutor Memory)
Đây là phần giúp AI mới tiếp tục được công việc. Một table `memory` với cột `type` để chia loại:

| type | Nội dung | Ví dụ |
|---|---|---|
| `profile` | Hồ sơ người học, ít thay đổi | "Developer web, làm 8:30–17:30, hay trì hoãn, muốn được giao việc cụ thể" |
| `goal` | Mục tiêu, mốc thời gian | "800+ L&R, thi tháng 3–4/2027" |
| `plan` | Lộ trình và giai đoạn hiện tại | "Tháng 1: ngữ pháp nền, Part 1–2, Part 5" |
| `decision` | Các quyết định đã chốt và lý do | "17/10: chuyển sang đo bằng kết quả thay vì giờ học" |
| `observation` | Nhận xét về người học | "Hay sai câu từ loại ở Part 5, nghe Part 3 dễ mất tập trung" |
| `preference` | Cách người học muốn được dạy | "Giải thích bằng tiếng Việt, ngắn gọn" |
| `handoff` | Bàn giao cuối mỗi buổi | "Đã xong Part 5 set 3, mai làm lại 4 câu sai và bắt đầu Part 2" |
| `interview` | Câu hỏi AI từng hỏi và câu trả lời gốc | "Q: Cuối tuần học thế nào? A: Học 1 ngày, nghỉ 1 ngày" |

Mỗi dòng có: `id, type, content, tags, source_ai` (grok, claude, chatgpt…), `created_at, updated_at, status` (active, superseded), `supersedes_id`.
- **Không xóa mà thay thế:** khi thông tin thay đổi, tạo dòng mới trỏ về dòng cũ, nhờ vậy vẫn giữ được lịch sử.
- **Người học xem và sửa được** trong app, ở trang "AI đang nhớ gì về tôi".

### 3.3 Hướng dẫn vai gia sư (Tutor Playbook)
Một văn bản người học tự sở hữu và chỉnh sửa được, AI nào kết nối vào cũng đọc đầu tiên:
- Vai trò: gia sư TOEIC, kèm cặp người hay trì hoãn
- Phong cách: tiếng Việt, thân thiện, ngắn gọn, giao việc cụ thể
- Quy tắc: đo bằng kết quả, có mini quiz cuối buổi, việc chưa xong thì dời sang hôm sau chứ không dồn bài, cuối buổi luôn phải ghi `handoff`
- Lịch học: tối thứ 2–6 từ 19:30–21:50, thứ 7 làm đề từ 8:30–12:00, Chủ nhật nghỉ

## 4. Giao thức kết nối cho AI

### 4.1 Đầu buổi: lấy briefing
Gọi `get_briefing` (MCP) hoặc `GET /api/briefing` (REST) để nhận một bản tóm tắt soạn sẵn gồm:
- Playbook
- Profile, goal, plan hiện tại
- 3 bản handoff gần nhất
- Thống kê nhanh: điểm ước tính, tỉ lệ đúng theo Part trong 2 tuần, điểm yếu hàng đầu
- Việc hôm nay, việc còn tồn, số từ và câu sai đến hạn ôn
- Các quyết định và nhận xét đang còn hiệu lực

Nhờ vậy AI mới **chỉ cần gọi một lần là hiểu toàn bộ tình hình**.

### 4.2 Trong buổi: đọc và ghi chi tiết
Các công cụ (tool) MCP hoặc endpoint REST tương ứng:
- **Đọc:** `list_sessions`, `list_errors`, `get_stats`, `list_due_reviews`, `search_memory`, `list_vocab`
- **Ghi:** `log_session`, `add_errors`, `add_vocab`, `create_tasks`, `add_note`, `write_memory`, `update_plan`

### 4.3 Cuối buổi: bàn giao
- **Bắt buộc** gọi `write_handoff`, ghi lại những gì đã làm, tình trạng của người học, và việc cho buổi sau
- Nếu có thông tin mới về người học: `write_memory` với loại `observation`, `decision` hoặc `preference`

### 4.4 Bảo mật
- Mỗi AI dùng một **API key riêng** (tạo trong trang cài đặt của app), có thể thu hồi từng key
- Phân quyền theo key: chỉ đọc, hoặc đọc và ghi
- Log mọi lần AI ghi dữ liệu: AI nào, lúc nào, ghi gì

## 5. Chức năng cho người học (giữ từ v2)
1. **Hôm nay:** việc của tối nay, tick hoàn thành, lời nhắn của gia sư
2. **Nhật ký buổi học:** nguồn, Part, đúng/tổng, thời gian, tự đánh giá, mini quiz
3. **Sổ lỗi sai:** nguyên nhân, giải thích, lịch làm lại sau 1, 3 rồi 7 ngày
4. **Từ vựng SRS:** thêm từ gặp trong lúc học, ôn theo lặp lại ngắt quãng, nhiều kiểu kiểm tra
5. **Đề thi thử:** nhập điểm từng Part, quy đổi điểm, lịch sử
6. **Sổ ngữ pháp và công thức:** người học tự lưu công thức hoặc chủ điểm gặp ở đâu đó, có ví dụ và nguồn (tùy chọn), liên kết với câu sai, có ôn SRS
7. **Dashboard:** điểm ước tính, tỉ lệ đúng theo Part, điểm yếu, streak, mốc lộ trình
8. **Kế hoạch:** lộ trình 5 tháng, lịch tuần, tổng kết tuần
9. **Chống trì hoãn:** vào thẳng màn hình Hôm nay, chế độ "chỉ 10 phút", buổi bỏ lỡ không bị phạt
10. **Mới: "AI đang nhớ gì về tôi":** xem, sửa, đánh dấu sai các memory, và sửa playbook
11. **Mới: Quản lý kết nối AI:** tạo hoặc thu hồi API key, xem AI nào đã ghi gì
12. **Mới: Nút "Tạo briefing":** xuất bản tóm tắt đầy đủ để dán vào AI mới hoặc chat mới

## 6. Một ngày khi đổi AI (kịch bản kiểm thử)
> Tháng 1 dùng Grok, tháng 2 chuyển sang Claude.
1. Người học kết nối Claude với MCP server của Tutorbook
2. Claude gọi `get_briefing` và biết ngay: người học đang ở tháng 2, Part 5 đúng 72%, yếu Part 3, handoff gần nhất ghi "mai làm lại 5 câu sai Part 3 và Hacker Test 4"
3. Claude giao việc tối nay theo đúng playbook, cùng giọng văn và quy tắc như trước
4. Cuối buổi Claude ghi handoff với `source_ai = claude`

**Tiêu chí thành công:** người học không phải giải thích lại bất cứ điều gì.

## 7. Ưu tiên
- **MVP:** **lịch trình và việc cần làm (ưu tiên số 1)** · dữ liệu học (Session, Error, Vocab, MockTest, Task) · màn hình Hôm nay, Log, Lỗi sai, Vocab SRS, Dashboard cơ bản · sổ ngữ pháp và công thức · bảng memory, playbook, briefing (kèm nút tạo thủ công) · REST API có API key
- **V2:** MCP server · trang "AI đang nhớ gì về tôi" · lịch làm lại câu sai · ghi chú · tổng kết tuần · chế độ 10 phút
- **Để sau:** PWA/thông báo đẩy · import/export CSV · đính kèm ảnh câu hỏi · hỗ trợ IELTS hay kỳ thi khác

## 8. Chuyển dữ liệu
Trước khi có app, dữ liệu được lưu tạm ở `C:\Users\CONGTHANH\Desktop\TOEIC\data` (CSV) và `logs\` (nhật ký). Khi app chạy được sẽ có script import: CSV đưa vào các bảng dữ liệu học, còn nhật ký và lịch sử trao đổi với Grok thì đưa vào memory dưới dạng `handoff`, `decision`, `interview`.

## 9. Quyết định đã chốt (17/10/2026)
- **Thiết bị:** ưu tiên giao diện máy tính, nhưng vẫn phải dùng tốt trên điện thoại (responsive)
- **Câu sai:** lưu **nguyên văn** câu hỏi (đề bài, đoạn văn hoặc transcript nếu có, các đáp án), kèm nguồn và số câu
- **Chức năng mới: Sổ ngữ pháp và công thức** (Grammar & Pattern Book)
  - Người học tự lưu công thức hoặc chủ điểm ngữ pháp bắt gặp ở bất kỳ đâu (ví dụ "be + adj + to V", "Not only… but also…")
  - Gồm: tiêu đề, công thức, giải thích, tag; ví dụ và nguồn (đề nào, câu nào) là tùy chọn
  - Liên kết được với câu sai và từ vựng; AI cũng thêm được khi giảng bài
  - Có thể đưa vào lịch ôn SRS như từ vựng
- **Briefing:** kết hợp hai phần
  - *Phần động*, tạo mỗi lần gọi: thống kê, việc hôm nay, việc tồn, câu sai và từ đến hạn ôn, 3 bản handoff gần nhất
  - *Phần tóm tắt*, AI viết sẵn: tình hình người học, chiến lược, điểm yếu chính; cập nhật cuối mỗi tuần và khi đổi giai đoạn
  - **Nút "Tạo briefing" (thủ công):** gộp cả hai phần thành văn bản để copy dán vào AI mới hoặc chat mới, kèm playbook và hướng dẫn kết nối. Dùng được cho cả AI không hỗ trợ MCP.
  - Nhận định: đổi AI hiếm khi xảy ra (gói subscription thường tính theo tháng), nhưng **mở chat mới thì xảy ra thường xuyên**, nên đây là trường hợp chính mà briefing phục vụ.

## 10. Câu hỏi còn mở
- **Deploy:** chưa quyết. Các phương án sẽ so sánh trong spec:
  - Vercel/Netlify cho frontend + API, kèm database managed (Supabase, Neon), có gói miễn phí
  - Railway / Fly.io / Render: chạy cả backend và database
  - Tự host trên máy cá nhân hoặc VPS, mở ra ngoài qua Cloudflare Tunnel
  - Yêu cầu chung: có URL HTTPS public để AI gọi được MCP/REST, và có xác thực bằng API key
