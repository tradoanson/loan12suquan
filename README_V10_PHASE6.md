# V1.0 – Giai đoạn 6: QA tổng thể và trải nghiệm người chơi

## Kiểm thử tự động
GitHub Actions chạy `node --test tests/smoke.test.cjs` trên PR và nhánh chính:
- Các trang chính và liên kết JS/CSS tồn tại.
- Toàn bộ file JS biên dịch cú pháp được.
- Khóa lưu thành trì/chiến dịch đồng nhất.
- Nhiệm vụ có biên nhận chống cộng thưởng trùng.
- 13 lãnh thổ không trùng ID và tuyến phụ thuộc hợp lệ.
- Mốc nhiệm vụ 7/13 và 13/13 hiện diện.

## Nghiệm thu thủ công cần thực hiện trên Vercel Preview
1. Mở Hoa Lư trên iPhone/Android, không tràn ngang, không mất nút.
2. Nâng Doanh trại cấp 2 rồi tuyển 20 quân, kiểm tra tài nguyên.
3. Thu hoạch, chờ 10 giây, không thu được lần hai khi đang chờ.
4. Ghép và vuốt Match-3; đòn đánh và kỹ năng không gây double-turn.
5. Thắng trận sứ quân, trở lại bản đồ và kiểm tra thu phục.
6. Chiêu hàng Bố Hải Khẩu, xem tuyến mở và nhiệm vụ q2.
7. Nhận q1/q2, reload và xác nhận không thưởng trùng.
8. Thu phục 7 vùng mở q5, đủ 13 vùng mở q6.
9. Đóng và mở trình duyệt, kiểm tra toàn bộ tiến trình.
10. Bật Reduced Motion, kiểm tra giao diện chiến đấu.

## Giới hạn
Smoke test kiểm tra cấu trúc/cú pháp, không thay thế E2E trình duyệt và thiết bị thật.
Chưa xác nhận toàn bộ hành trình chơi thực tế hoặc cân bằng kinh tế dài hạn.
