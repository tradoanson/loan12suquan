# Loạn 12 Sứ Quân V0.9 — Mobile UX (nhánh thử nghiệm)

## Phạm vi
- Thêm vuốt bốn hướng để hoán đổi ô trên bàn cờ Match-3, vẫn giữ thao tác chạm hai ô trên PC/mobile.
- Trên màn hình hẹp, đưa bàn cờ lên trước các bảng quản lý đội hình, giúp người chơi vào trận nhanh.
- Tối ưu kích thước ô, các nút, vùng an toàn trên iPhone và đường viền focus cho bàn phím.
- Không thay đổi cấu trúc localStorage hay công thức sát thương V0.8.

## Kiểm thử trước khi merge
1. iPhone Safari/Android Chrome: vuốt ô sang trái, phải, lên, xuống, kiểm tra ghép hợp lệ và nước không hợp lệ.
2. Chạm lần lượt hai ô vẫn phải hoạt động; không được mất lượt kép sau khi vuốt.
3. PC: chuột click hai ô, gợi ý, kỹ năng và lưu đội hình không thay đổi.
4. Vào Hoa Lư, bản đồ, nhiệm vụ, cốt truyện; kiểm tra không tràn ngang ở 375px và 390px.
5. Đóng/mở trình duyệt: tài nguyên, lãnh thổ và nhiệm vụ còn nguyên.

**Chưa kiểm thử thiết bị thực tế.** Đây là bản V0.9 thử nghiệm qua Pull Request; không tự động đưa lên production cho đến khi merge.
