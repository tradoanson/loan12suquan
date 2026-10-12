# V1.2 Giai đoạn 5 – Sự kiện chiến dịch và quyết sách

## Sự kiện
1. Hội nghị Hoa Lư (Đại điện cấp 2): đổi vàng lấy vật tư hoặc chiêu mộ nghĩa quân.
2. Biên cương biến động (4 lãnh địa): đổi gỗ lấy đá hoặc đổi đá lấy vàng.
3. Khải hoàn giữa thời loạn (7 lãnh địa): đầu tư dân sinh hoặc quân lực.

Mỗi sự kiện cho hai lựa chọn, chỉ chọn một lần. Điều kiện và tài nguyên được kiểm tra lại khi bấm. Chi phí, phần thưởng và dấu quyết định `strategicEventChoices` được ghi cùng một bản ghi thành trì `loan12_hoalu_v03`. Không ghi đè `questRewardIds` hoặc `achievementRewardIds`.

## Kiểm thử
1. Người chơi mới chưa đạt điều kiện: ba sự kiện khóa.
2. Đại điện cấp 2 mở Hội nghị; chọn một nhánh, kiểm tra tài nguyên/quân chính xác.
3. Tải lại trang: đã quyết định, không thể nhận lại.
4. Có 4/7 lãnh địa: sự kiện tương ứng mở.
5. Không đủ tài nguyên: không ghi quyết định, không trừ tiền.
6. Nhận thành tựu và nhiệm vụ sau sự kiện: dữ liệu không mất.
7. Thử trên iPhone/Android, GitHub Actions xanh và Vercel Preview trước Merge.

**Giới hạn:** localStorage không cung cấp giao dịch đồng thời xuyên tab. Không thực hiện cùng quyết định trên hai tab cùng lúc. Sự kiện chưa tác động ngoại giao/AI hoặc thay đổi lãnh địa.
