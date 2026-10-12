# V1.1 Giai đoạn 5 – Âm thanh và tối ưu chiến đấu mobile

## Triển khai
- Nút bật/tắt âm thanh tại chiến trường, mặc định tắt. Lưu tùy chọn tại loan12_audio_v11.
- Âm thanh tổng hợp bằng Web Audio API cho ghép, thay đổi HP địch, kích hoạt kỹ năng và kết quả trận. Không tải file audio, không tự phát trước tương tác người dùng.
- Âm thanh là lớp trình bày, không tác động Battle Engine, phần thưởng hoặc localStorage chiến dịch.
- CSS mới: co giãn bàn cờ 7×7, header, thanh HP, nút điều khiển trên màn hình nhỏ; tôn trọng reduced-motion.
- Giữ nguyên điều khiển vuốt mobile-ux.js hiện có.

## Checklist nghiệm thu
1. Mở trận mới: không phát âm thanh khi mặc định tắt.
2. Bật âm thanh bằng nút: ghép hợp lệ, dùng kỹ năng, thắng/thua có tín hiệu âm thanh.
3. Tắt âm thanh: không phát tín hiệu nữa; tải lại vẫn giữ tùy chọn.
4. Kiểm tra Safari iPhone và Chrome Android: chạm chọn, vuốt, bảng 7×7 không tràn ngang.
5. Kiểm tra trận thường, trận sứ quân và trận từ bản đồ: thưởng/tiến trình không đổi.
6. Bật Reduce Motion trong hệ điều hành: hiệu ứng chuyển động giảm.

Chưa kiểm thử thực tế trên thiết bị; cần thử Vercel Preview trước Merge.
