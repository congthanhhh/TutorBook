# TOEIC Coach – Bản idea v2 (hướng "trợ lý học")

## Thay đổi so với v1
App **không chứa nội dung học** (đề, audio, bài luyện). Nội dung lấy từ sách ETS 2026, Hacker TOEIC 2/3, web luyện thi… bạn tự học, tự tìm tòi.
App chỉ làm **trợ lý học**: quản lý, ghi chép, đánh giá tiến độ, ôn lại từ vựng và lỗi sai.

Tutor (AI) lo: lên kế hoạch, giải thích câu sai, giảng ngữ pháp, ra mini quiz, phân tích số liệu, nhắc học.

## Chức năng

### 1. Hôm nay
- Danh sách việc của hôm nay (Tutor tạo hoặc bạn tự thêm), dạng: "ETS 2026 Test 1 – Part 5 (30 câu)"
- Tick hoàn thành, việc chưa xong tự dời sang hôm sau
- Lời nhắn ngắn của Tutor

### 2. Nhật ký buổi học
- Ngày, nguồn (sách/web nào, đề nào, Part nào), số câu đúng/tổng, thời gian làm
- Tự đánh giá: dễ/vừa/khó, mức tập trung 1–5, ghi chú ngắn
- Kết quả mini quiz cuối buổi (nếu có)

### 3. Sổ lỗi sai
- Mỗi câu sai: nguồn + số câu, Part, dạng câu (tag), đáp án đã chọn, đáp án đúng, nguyên nhân sai, giải thích
- Nguyên nhân: không biết từ / sai ngữ pháp / nghe không ra / hết giờ / hiểu sai câu hỏi / bẫy đáp án
- Lịch làm lại câu sai: sau 1, 3 rồi 7 ngày, đúng 2 lần liên tiếp thì coi là đã nắm
- Lọc theo Part, tag, nguyên nhân

### 4. Từ vựng (SRS)
- Thêm từ gặp trong lúc học: từ, loại từ, nghĩa, câu ví dụ (lấy từ chính câu trong đề), collocation, họ từ, nguồn
- Ôn theo lặp lại ngắt quãng: Quên / Khó / Được / Dễ
- Các kiểu ôn: nhìn từ đoán nghĩa, nhìn nghĩa đoán từ, điền vào câu ví dụ
  (Phần này app tự tạo được từ dữ liệu bạn nhập, không cần nguồn ngoài)

### 5. Đề thi thử
- Nhập điểm đề làm trong sách: số câu đúng từng Part, các câu sai (tùy chọn, có thể đẩy vào sổ lỗi sai)
- Quy đổi ra điểm ước tính L/R
- Lịch sử điểm và so sánh giữa các lần

### 6. Ghi chú
- Ghi chú ngữ pháp, mẹo làm bài, bài giảng Tutor gửi, phân loại theo tag
- Có thể liên kết với câu sai hoặc từ vựng

### 7. Dashboard
- Điểm ước tính hiện tại và khoảng cách còn lại tới 800
- Tỉ lệ đúng theo Part qua các tuần
- Điểm yếu theo tag và theo nguyên nhân sai
- Streak, số buổi trong tuần, số từ đã thuộc, số lỗi đã khắc phục
- Mốc lộ trình: 550–600, rồi 650–700, rồi 750, rồi 800+

### 8. Kế hoạch
- Lộ trình 5 tháng theo giai đoạn, lịch tuần (tối thứ 2–6 học, thứ 7 làm đề, Chủ nhật nghỉ)
- Tổng kết tuần: Tutor viết nhận xét và đề xuất cho tuần sau

### 9. Chống trì hoãn
- Mở app là vào thẳng màn hình "Hôm nay"
- Chế độ "chỉ 10 phút": ôn từ vựng hoặc làm lại câu sai để giữ streak
- Ghi nhận buổi bỏ lỡ (không phạt), kế hoạch tự giảm tải

### 10. Cầu nối với Tutor (API)
- Tutor đọc: nhật ký, sổ lỗi sai, từ vựng, điểm đề, việc chưa xong
- Tutor ghi: việc hằng ngày, giải thích cho câu sai, ghi chú, nhận xét tuần, cập nhật kế hoạch
- Nhập nhanh từ chat: bạn gửi Tutor "Part 5: 22/30, sai 103, 107, 112" thì Tutor tự ghi vào app

## Ưu tiên
- **MVP:** Hôm nay · Nhật ký buổi học · Sổ lỗi sai · Từ vựng SRS · Nhập điểm đề · Dashboard cơ bản · API cho Tutor
- **V2:** Lịch làm lại câu sai · Ghi chú · Tổng kết tuần · Chế độ 10 phút
- **Để sau:** PWA/thông báo đẩy, import/export CSV, đính kèm ảnh chụp câu hỏi

## Trước khi có app
Dữ liệu được lưu tạm trong `C:\Users\CONGTHANH\Desktop\TOEIC\data` dưới dạng CSV, cùng cấu trúc với app sau này, nên lúc làm app chỉ cần import vào là xong.

## Câu hỏi còn mở
- Dùng app trên điện thoại hay máy tính nhiều hơn?
- Câu sai có cần lưu nguyên văn câu hỏi không, hay chỉ cần nguồn + số câu (đỡ phải gõ)?
- Deploy ở đâu để Tutor gọi được API?
