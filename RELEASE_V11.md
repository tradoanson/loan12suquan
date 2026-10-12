# Loạn 12 Sứ Quân – V1.1 Release Candidate

## Phạm vi
- GĐ1: giao diện thành Hoa Lư.
- GĐ2: chiến thuật đội hình và hệ số kỹ năng.
- GĐ3: hành vi địch theo lượt, độ khó trận luyện.
- GĐ4: tổng quan kinh tế, nhiệm vụ phát triển thành trì.
- GĐ5: âm thanh tùy chọn, giao diện trận trên mobile.
- GĐ6: kiểm thử hồi quy tự động, sửa mở khóa audio trên thiết bị di động và Reduced Motion theo thiết lập hiện tại.

## Kiểm thử tự động
GitHub Actions chạy `node --test tests/smoke.test.cjs` trên push/PR. Bộ kiểm thử xác nhận file tài nguyên, cú pháp JS, liên kết, khóa lưu, 13 lãnh địa, nhiệm vụ và điểm tích hợp V1.1.

## Nghiệm thu thủ công trước khi chốt V1.1
1. Vercel Preview mở Hoa Lư, bản đồ, nhiệm vụ, chiến đấu không có lỗi Console.
2. Đổi cấp bốn công trình, thu hoạch, tuyển quân; tải lại vẫn lưu chính xác.
3. Thử cả bốn chiến thuật và ba mức độ khó trận luyện.
4. Trận lãnh thổ cố định độ khó Chuẩn; nhận thưởng đúng một lần.
5. Nhiệm vụ q1–q9: nhận thưởng và tải lại không cộng trùng.
6. Trên iPhone Safari và Android Chrome: bàn 7×7 không tràn, chạm/vuốt ổn định.
7. Âm thanh mặc định tắt; bật/tắt và tải lại, không phát khi tắt.
8. Bật Reduced Motion: hiệu ứng chuyển động được hạn chế.
9. Kiểm tra Console và Network khi tải lại nhiều lần, mạng chậm.
10. Xác nhận GitHub Actions xanh trước Merge.

## Tiêu chí phát hành
Chỉ gọi là V1.1 stable khi CI thành công, người dùng kiểm thử Vercel Preview đạt và PR được Merge. Không tự thay đổi tiến trình hoặc xóa localStorage.

## Hạn chế
Smoke tests là kiểm tra tĩnh, không thay thế E2E browser, kiểm thử hiệu năng thực tế hoặc kiểm thử thiết bị thật.
