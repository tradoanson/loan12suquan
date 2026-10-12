# V1.2 Giai đoạn 4 – Thành tựu, danh hiệu và phần thưởng

## Nội dung
- Tám thành tựu: khởi nghiệp Hoa Lư, Đại điện cấp 3, Nông điền cấp 3, thu phục 4/7/13 lãnh địa, một tướng cấp 3, cả ba tướng cấp 5.
- Mỗi thành tựu có danh hiệu và thưởng vàng/gỗ/đá.
- Nhận thưởng bằng nút trong Sử ký; kiểm tra điều kiện lại ngay khi nhấn.
- Dấu nhận thưởng achievementRewardIds nằm cùng bản ghi loan12_hoalu_v03 với tài nguyên, hạn chế cộng thưởng trùng.
- Không thay đổi hệ thống nhiệm vụ, trận đánh hoặc XP.

## Checklist
1. Mở Sử ký: xem tám thành tựu và trạng thái mở khóa.
2. Tài khoản mới: thành tựu khởi nghiệp mở khi đã khởi tạo Hoa Lư.
3. Nâng cấp công trình, chinh phục lãnh địa, tăng cấp tướng: thành tựu tương ứng mở.
4. Nhận thưởng: tài nguyên tăng chính xác, tải lại vẫn hiển thị Đã nhận.
5. Bấm lại hoặc mở nhiều tab: không nhận thưởng lần hai trong thao tác tuần tự. Lưu ý localStorage không có giao dịch khóa xuyên tab; tránh đồng thời nhấn nhận trên nhiều tab.
6. Kiểm tra màn hình iPhone/Android, nút và các thẻ không tràn.
7. GitHub Actions smoke test xanh, Vercel Preview hoạt động trước Merge.

Đây là thành tựu một lần, không có phần thưởng lặp lại hằng ngày.
