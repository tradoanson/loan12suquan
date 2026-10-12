# V1.0 Giai đoạn 5 – Tiến trình nhiệm vụ

- Bổ sung tổng quan 13 lãnh thổ, nhiệm vụ đã nhận và nhiệm vụ sẵn sàng lĩnh thưởng.
- Hiển thị mục tiêu tiếp theo và tài nguyên trong kho Hoa Lư.
- Dùng lại khóa lưu chiến dịch, thành trì, nhiệm vụ hiện tại, không reset tiến trình.
- Phần này chỉ đọc trạng thái; cơ chế nhận thưởng hiện tại vẫn do quests.js xử lý.
- Giữ cân bằng kinh tế hiện hành: chưa tự động tăng thưởng hoặc thay đổi giá công trình.

## Kiểm thử
1. Nhận thưởng q1: chỉ cộng tài nguyên một lần; bảng tổng quan cập nhật.
2. Hoàn thành Bố Hải Khẩu: nhiệm vụ q2 mở.
3. Đủ 7/13 lãnh thổ: q5 mở; đủ 13/13: q6 mở.
4. Refresh trình duyệt: không mất dữ liệu, không nhận thưởng lặp.
5. Mobile: thẻ tiến trình không tràn màn hình.

## Cần tiếp tục
- Kiểm toán logic lưu thưởng nhiều khóa để xử lý mất điện/đóng tab giữa chừng.
- Cân bằng giá nâng cấp và thưởng qua số liệu thử nghiệm thực tế.
