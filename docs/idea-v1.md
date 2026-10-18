# TOEIC Coach – Bản idea v1 (chưa chọn stack)

**Mục tiêu:** đưa người học từ ~450–500 lên 800+ TOEIC L&R trong khoảng 5 tháng (thi tháng 3–4/2027).
**Người dùng:** 1 người học (bạn) + 1 gia sư AI (Tutor).
**Nguyên tắc:** mở app là biết ngay hôm nay làm gì · đo bằng kết quả chứ không đo bằng giờ ngồi · mọi dữ liệu học tập nằm trong app, Tutor không phải nhớ.

---

## 1. Phân vai

| | App | Tutor (AI) |
|---|---|---|
| Lưu trữ | Toàn bộ dữ liệu: buổi học, câu sai, từ vựng, điểm | Không lưu, mỗi lần làm việc đều đọc lại từ app |
| Nội dung | Hiển thị, cho làm bài, chấm tự động | Soạn câu hỏi, đáp án, giải thích, từ vựng, bài ngữ pháp, audio |
| Kế hoạch | Hiện việc của hôm nay, tick hoàn thành | Lên kế hoạch theo ngày/tuần, điều chỉnh theo dữ liệu |
| Phân tích | Biểu đồ, thống kê thô | Đọc số liệu, tìm điểm yếu, đổi chiến lược |
| Kèm cặp | Nhắc lịch trong app (tùy chọn) | Nhắn nhắc 19:15, hỏi thăm khi bỏ buổi, review cuối tuần |

Tutor kết nối với app qua API (có API key riêng): đọc dữ liệu, đẩy nội dung, ghi nhận xét.

---

## 2. Các module chức năng

### 2.1 Màn hình "Hôm nay" (trang chủ)
- Danh sách nhiệm vụ của hôm nay do Tutor tạo (ví dụ: "20 từ mới", "30 câu Part 5", "2 bài Part 3")
- Mỗi nhiệm vụ bấm vào là làm luôn trong app, xong tự tick
- Thanh tiến độ của buổi học, việc chưa xong tự dời sang hôm sau
- Lời nhắn ngắn của Tutor cho hôm nay (ví dụ: "Hôm nay tập trung vào từ loại, tuần trước sai 40%")

### 2.2 Luyện tập và quiz
- Làm bài theo bộ câu hỏi (question set) do Tutor tạo, phân theo Part 1–7
- Chế độ **luyện tập**: làm câu nào biết kết quả và giải thích ngay câu đó
- Chế độ **thi thử**: bấm giờ, chỉ hiện kết quả khi nộp bài
- **Mini quiz cuối buổi** (5 phút): hỏi lại từ vừa học và câu cùng dạng với câu vừa sai, dùng để biết buổi đó có hiệu quả không
- Mỗi câu ghi lại: đáp án đã chọn, đúng/sai, thời gian làm, có đánh dấu "đoán mò" không
- Part 6–7: hiển thị đoạn văn kèm nhiều câu hỏi (dạng passage)

### 2.3 Listening
- Trình phát audio: tua lại 5 giây, đổi tốc độ 0.8x/1x/1.2x, phát lại từng câu
- Ẩn hoặc hiện transcript, xem transcript sau khi đã trả lời
- Part 1 có ảnh, Part 2 chỉ có audio, Part 3–4 có hội thoại hoặc bài nói kèm câu hỏi
- Luyện chép chính tả (dictation, tùy chọn): nghe rồi gõ lại, app so sánh với transcript

### 2.4 Sổ lỗi sai (Error log)
- Câu sai được tự đưa vào sổ, kèm Part, dạng câu hỏi (tag) và lời giải thích
- Phân loại nguyên nhân: không biết từ, sai ngữ pháp, nghe không ra, hết giờ, hiểu sai câu hỏi
- **Làm lại câu sai theo lịch:** sau 1, 3 rồi 7 ngày, đúng 2 lần liên tiếp thì coi là đã nắm
- Lọc theo Part, tag, nguyên nhân

### 2.5 Từ vựng (SRS)
- Thẻ từ gồm từ, phiên âm, loại từ, nghĩa tiếng Việt, ví dụ theo ngữ cảnh TOEIC, collocation, họ từ (word family), audio phát âm
- Chia theo chủ đề: văn phòng, tuyển dụng, tài chính, du lịch, mua sắm...
- Ôn theo lặp lại ngắt quãng (kiểu Anki/SM-2): Quên / Khó / Được / Dễ
- Nhiều kiểu kiểm tra: nhìn từ đoán nghĩa, nhìn nghĩa đoán từ, điền vào câu, nghe rồi chọn từ
- Từ gặp trong câu sai có thể thêm vào kho từ chỉ với 1 nút bấm

### 2.6 Đề thi thử
- Nhập kết quả đề làm trên giấy hoặc trong sách (ETS 2026, Hacker 2/3): số câu đúng từng Part, các câu sai
- App quy đổi ra điểm ước tính L/R (bảng quy đổi tham khảo)
- Lưu lịch sử đề, so sánh giữa các lần

### 2.7 Ghi chú ngữ pháp và mẹo làm bài
- Các bài giảng ngắn của Tutor được lưu thành ghi chú theo chủ điểm (từ loại, thì, mệnh đề quan hệ, giới từ...)
- Gắn với câu sai: ví dụ bấm vào một câu sai sẽ thấy ghi chú ngữ pháp liên quan

### 2.8 Dashboard và tiến độ
- Điểm ước tính hiện tại và khoảng cách còn lại tới 800
- Tỉ lệ đúng theo từng Part qua các tuần (biểu đồ đường)
- Bản đồ điểm yếu theo tag (ví dụ: "Part 5, câu từ loại: 55%")
- Streak, số buổi đã học trong tuần, số từ đã thuộc
- Các mốc theo lộ trình: tháng 1 đạt 550–600, tháng 2–3 đạt 650–700, tháng 4 đạt 750, tháng 5 đạt 800+

### 2.9 Kế hoạch và lộ trình
- Lộ trình 5 tháng chia theo giai đoạn, mỗi giai đoạn có mục tiêu riêng
- Lịch theo tuần: tối thứ 2–6 học, thứ 7 làm đề, Chủ nhật nghỉ
- Tutor điều chỉnh kế hoạch khi bạn chậm hoặc nhanh hơn dự kiến

### 2.10 Chống trì hoãn
- Mở app là vào thẳng màn hình "Hôm nay"
- Nút "chỉ 10 phút thôi": khi lười, làm một set ngắn để giữ streak
- Ghi nhận buổi bỏ lỡ (không phạt), Tutor tự giảm tải hoặc dời bài
- Tổng kết tuần: đã làm gì, tiến bộ ở đâu, tuần sau tập trung gì

---

## 3. Dữ liệu chính (khái niệm, chưa phải schema)
- **Question / QuestionSet:** Part, nội dung, đoạn văn/audio/ảnh, đáp án, giải thích, tag, độ khó, nguồn (Tutor soạn hoặc sách)
- **Attempt:** câu nào, chọn gì, đúng/sai, thời gian, có đoán mò không, ngày làm
- **Session:** ngày, nhiệm vụ, hoàn thành bao nhiêu, kết quả mini quiz, tự đánh giá
- **Task:** việc của từng ngày, trạng thái
- **Vocab + VocabReview:** thẻ từ và lịch ôn SRS
- **ErrorEntry:** câu sai, nguyên nhân, lịch làm lại, trạng thái
- **MockTest:** đề, điểm từng Part, điểm quy đổi
- **Note:** ghi chú ngữ pháp/mẹo, tag
- **TutorComment:** nhận xét của Tutor gắn với buổi học, đề hoặc tuần

## 4. Tutor cần làm được gì qua API (mức chức năng)
- Đọc: kết quả gần đây, thống kê theo Part/tag, sổ lỗi sai, từ đến hạn ôn, nhiệm vụ chưa xong
- Ghi: tạo bộ câu hỏi, tạo nhiệm vụ cho ngày, thêm từ vựng, thêm ghi chú, viết nhận xét, cập nhật lộ trình
- Upload: file audio cho Listening, ảnh cho Part 1

## 5. Vòng lặp hằng ngày khi có app
1. 19:15: Tutor đọc dữ liệu, tạo nhiệm vụ và bộ câu hỏi cho tối nay, rồi nhắn bạn
2. 19:30–21:40: bạn làm bài trong app, app tự chấm và ghi lại
3. 21:40: mini quiz cuối buổi
4. Sau buổi học: Tutor đọc kết quả, giải thích câu sai, cập nhật sổ lỗi sai và chuẩn bị cho ngày mai
5. Thứ 7: làm đề và nhập điểm. Chủ nhật: Tutor gửi tổng kết tuần và điều chỉnh kế hoạch

## 6. Ưu tiên
- **MVP:** Hôm nay · Luyện tập/quiz (Part 5–7 và Listening cơ bản) · Sổ lỗi sai · Từ vựng SRS · Nhập điểm đề thi · Dashboard cơ bản · API cho Tutor
- **V2:** Chế độ thi thử bấm giờ đầy đủ · Dictation · Ghi chú ngữ pháp gắn với câu sai · Tổng kết tuần trong app · Nút "chỉ 10 phút"
- **Để sau:** PWA/thông báo đẩy · Nhiều người dùng · Speaking/Writing

## 7. Câu hỏi còn mở
- Dùng trên điện thoại nhiều hay máy tính nhiều? (ảnh hưởng tới UI và có cần PWA không)
- Có muốn nhập lại kết quả làm trên sách (ETS/Hacker) từng câu, hay chỉ nhập điểm tổng từng Part?
- Audio: dùng file Tutor tạo, hay có cả audio của sách ETS/Hacker cần upload?
- Deploy ở đâu để Tutor gọi được API (cần một URL public)?
