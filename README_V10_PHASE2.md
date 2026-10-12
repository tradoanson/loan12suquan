# V1.0 – Giai đoạn 2: Hiệu ứng chiến đấu Match-3

## Đã triển khai
- Sát thương nổi khi HP địch hoặc tướng giảm; hồi máu và tăng giáp có phản hồi riêng.
- Hiệu ứng rung/sáng nhẹ khi trúng đòn, phát sáng bàn cờ khi có combo nhiều đợt.
- Hiệu ứng xuất hiện cho bảng chiến thắng/thất bại.
- Tôn trọng tùy chọn hệ điều hành giảm chuyển động (prefers-reduced-motion).
- Không sửa thuật toán ghép ô, tính sát thương, lượt, thưởng, dữ liệu lưu hoặc điều khiển vuốt V0.9.

## Checklist nghiệm thu
1. Mobile: vuốt 4 hướng vẫn hoạt động; không phát sinh thêm lượt.
2. Ghép ô: sát thương hiển thị đúng độ giảm HP; hồi máu và giáp hiện khi có thay đổi.
3. Thắng/thua: hộp kết quả xuất hiện và nút Trận mới hoạt động.
4. Bật Reduce Motion trên thiết bị: không có hiệu ứng bay/rung.
5. Desktop: click 2 ô, kỹ năng tướng, lựa chọn boss và phần thưởng vẫn hoạt động.

Chưa kiểm thử trên thiết bị thật. Chỉ merge sau khi thử trên Vercel Preview.
