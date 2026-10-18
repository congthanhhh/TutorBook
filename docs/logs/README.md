# logs/: phiếu bàn giao (trước khi có app)

Mỗi phiếu là một file JSON. Khi Tutorbook chạy được, app sẽ import toàn bộ thư mục này.

## Đặt tên file
- Phiếu buổi học: `YYYY-MM-DD.json`. Nếu một ngày có 2 buổi: `YYYY-MM-DD-2.json`
- Tổng kết tuần: `week-YYYY-MM-DD.json` (ngày đầu tuần)
- Tổng kết tháng: `month-YYYY-MM.json`

## Mỗi buổi học
1. **Mở chat mới.** Dán `tutor/playbook.md`, rồi dán briefing gồm:
   - file tổng kết tuần gần nhất (và tháng gần nhất, nếu có)
   - 2–3 phiếu buổi học gần nhất
2. Học theo việc AI giao, chỗ nào chưa hiểu thì dán câu hỏi vào để hỏi.
3. Cuối buổi gõ **"xuất phiếu"**. Copy khối JSON và lưu thành `logs/YYYY-MM-DD.json`.
4. Kiểm tra nhanh trước khi lưu: số câu đúng/tổng, đáp án đã chọn và đáp án đúng. Sau đó chạy `npm run check:logs` để kiểm tra phiếu theo schema (hoặc dán vào trang chủ của app khi đang chạy `npm run dev`).

## Cuối tuần và cuối tháng
Gõ **"tổng kết tuần"**, dán các phiếu của tuần đó vào, rồi lưu kết quả thành `week-YYYY-MM-DD.json`. Cuối tháng làm tương tự với "tổng kết tháng".
