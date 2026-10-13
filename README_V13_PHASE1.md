# V1.3 Giai đoạn 1 — Bàn xếp hình cảm hứng Java J2ME

Tham chiếu: https://mobile.phoneky.com/games/?id=j4j60163

## Thực hiện
- Vẽ lại phong cách ô bằng CSS gốc: nổi khối, viền sáng, nền màu ngọc, khung chiến trường cổ điển; không sao chép tài sản đồ họa của bản Java.
- Hiệu ứng xuất hiện ô mới, phát sáng combo, nhãn COMBO và chú giải dễ đọc.
- Giữ nguyên 6 loại biểu tượng, 7×7, cơ chế ghép, tính sát thương, XP, thưởng, chiến dịch và dữ liệu V1.2.
- Hỗ trợ prefers-reduced-motion, bố cục điện thoại và thao tác vuốt sẵn có.

## QA Preview
1. Vào battle.html trên desktop/iPhone/Android: 49 ô không tràn chiều ngang.
2. Vuốt và chạm: nước hợp lệ/không hợp lệ vẫn đúng như V1.2.
3. Ghép liên hoàn: có nhãn COMBO, ô mới có hiệu ứng rơi; không thay đổi sát thương.
4. Chọn giảm chuyển động trong hệ điều hành: tắt animation.
5. Đổi độ khó, kỹ năng, thắng/thua, nhận thưởng, tải lại: dữ liệu giữ nguyên.
6. Chạy GitHub Actions và kiểm tra console trên Vercel Preview.

## Giới hạn
Hiệu ứng được kích hoạt sau khi engine cập nhật bàn cờ đồng bộ; chưa có hoạt ảnh hoán đổi từng bước/giải từng chuỗi trước lượt phản công. Cần giai đoạn nâng cấp engine riêng nếu muốn hoạt ảnh từng cascade theo thời gian. Đây là giao diện lấy cảm hứng, không phải bản sao pixel-perfect của trò Java.
