# V1.2 Giai đoạn 2 – Kinh nghiệm tướng lĩnh

## Đã triển khai
- Hồ sơ XP cho Đinh Bộ Lĩnh, Nguyễn Bặc, Đinh Điền ngay tại màn hình chiến đấu.
- Cấp 1–10 theo công thức 1 + floor(sqrt(XP/100)), tối đa 10.
- Thắng trận thường: +25 XP/tướng; thắng trận luyện sứ quân: +50 XP/tướng; thu phục lãnh địa hợp lệ: +100 XP/tướng.
- Giới hạn 10 chiến thắng được thưởng XP mỗi ngày theo thiết bị; không áp dụng với trận chinh phục không hợp lệ.
- Lưu riêng trong loan12_hero_progress_v12, không thay đổi dữ liệu thành trì, chiến dịch, thưởng vật phẩm hay sức mạnh tướng.
- Chặn xử lý kết quả trận lặp lại trong cùng trận.

## Kiểm thử
1. Mở trận: hiển thị cả ba tướng cấp 1, XP 0 với người chơi mới.
2. Thắng trận thường: mỗi tướng +25 XP, tải lại vẫn giữ.
3. Thắng trận luyện sứ quân: +50 XP; thu phục hợp lệ: +100 XP.
4. Thua hoặc dùng lại URL trận chinh phục không hợp lệ: không cộng XP.
5. Đạt giới hạn 10 trận thưởng XP/ngày: XP không tăng thêm.
6. Kiểm tra Vercel Preview trên điện thoại, trận Match-3 và nhận thưởng tài nguyên vẫn bình thường.
7. GitHub Actions smoke test xanh.

Đây là bước đầu của hệ thống tiến triển tướng. Cấp độ chưa cộng chỉ số hoặc mở khóa kỹ năng; các cơ chế đó cần cân bằng và kiểm thử riêng.
