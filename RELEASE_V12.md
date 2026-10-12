# Loạn 12 Sứ Quân — V1.2 Release Candidate

## Phạm vi V1.2
1. Sử ký Hoa Lư: lãnh địa, công trình, nhiệm vụ, nhật ký chiến dịch.
2. Tướng lĩnh: XP và cấp độ 1–10, kỹ năng tinh luyện cấp 3 (+8%) và đại thành cấp 5 (+15%).
3. Tám thành tựu và danh hiệu, nhận thưởng tài nguyên một lần.
4. Ba sự kiện chiến dịch, mỗi sự kiện hai lựa chọn, chi phí/phần thưởng một lần.
5. Giai đoạn 6: sửa thứ tự nhật ký mới nhất trước; bổ sung kiểm thử hành vi cho thưởng thành tựu và quyết sách; đưa vào CI.

## Tự động hóa
GitHub Actions chạy:
`node --test tests/*.test.cjs`

Smoke test xác nhận tài sản, JS parse, tiến trình và liên kết. Release behavior test thực thi handler bằng DOM giả lập để kiểm tra:
- Quyết sách chỉ trừ/cộng một lần.
- Không đủ tài nguyên không ghi nhận lựa chọn.
- Thành tựu không trả thưởng trùng khi nhấn lại.
- Quyết sách không làm mất dấu thưởng nhiệm vụ/thành tựu.

## Nghiệm thu Vercel Preview
- Truy cập Hoa Lư → Bản đồ → Cốt truyện → Trận chiến → Nhiệm vụ → Sử ký.
- Trận 7×7: ghép ô, 3 kỹ năng, thắng/thua, nhận thưởng, XP, cấp kỹ năng.
- Chiến dịch: 13 lãnh địa, ngoại giao, thắng trận chinh phục, lưu tiến trình.
- Thành trì: nâng cấp, tuyển quân, thu hoạch, tài nguyên không âm.
- Sử ký: nhật ký mới nhất đứng đầu; đủ 8 thành tựu và 3 sự kiện.
- Nhận thành tựu/quyết sách, tải lại, xác nhận không nhận trùng.
- Kiểm tra màn hình iPhone, Android, máy tính; thao tác chạm và cuộn.
- Thử save cũ trước V1.2: vẫn đọc được; không mất tài nguyên, lãnh địa, XP, nhiệm vụ.
- GitHub Actions xanh; Vercel Preview không lỗi JavaScript trong Console.

## Giới hạn / rủi ro
- LocalStorage không có transaction xuyên nhiều tab: tránh thao tác nhận thưởng đồng thời ở nhiều tab.
- Tiến trình lưu trên trình duyệt/thiết bị, chưa có tài khoản đồng bộ đám mây.
- Đây là **release candidate**, chưa được gọi là V1.2 Stable cho đến khi CI, Preview và UAT thực tế đều đạt và PR được Merge.
- Không thay đổi thiết kế Match-3, AI hoặc mức thưởng để tránh phá vỡ cân bằng đã kiểm thử.
