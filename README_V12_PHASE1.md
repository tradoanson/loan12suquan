# V1.2 Giai đoạn 1 – Sử ký thống nhất thiên hạ

## Chức năng
- Trang chronicle.html hiển thị tiến độ 13 lãnh địa, số quân, cấp bốn công trình và nhiệm vụ đã nhận thưởng.
- Hiển thị tối đa 30 sự kiện chiến dịch mới nhất nếu dữ liệu hiện có ghi lại.
- Chỉ đọc localStorage, không tạo/sửa bản ghi lưu game.
- Giao diện responsive và đường dẫn từ Hoa Lư.
- Bổ sung smoke test đảm bảo file, liên kết và không ghi localStorage.

## Kiểm thử Vercel Preview
1. Vào Hoa Lư → Sử ký, xác nhận các số liệu khớp bản đồ và nhiệm vụ.
2. Chinh phục thêm lãnh địa, nhận nhiệm vụ rồi quay lại Sử ký: số liệu cập nhật.
3. Tải lại trang: số liệu giữ nguyên.
4. Mở trình duyệt mới chưa có save: hiển thị trạng thái trống, không lỗi.
5. Trên điện thoại: các thẻ không tràn ngang, liên kết hoạt động.
6. Kiểm tra GitHub Actions trước Merge.

Chưa có xác nhận kiểm thử thiết bị thực tế; PR nháp chờ nghiệm thu.
