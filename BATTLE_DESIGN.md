# Battle Engine V0.4 – đặc tả và giới hạn

- Bàn cờ 7×7, 6 loại biểu tượng. Đổi 2 ô kề nhau; đổi không tạo bộ 3 sẽ hoàn tác và không mất lượt.
- Quét hàng/cột, xóa ghép, rơi theo cột, sinh ô mới, xử lý chuỗi combo; trộn khi hết nước đi.
- Kiếm/cung/hỏa công gây sát thương; khiên tạo giáp; tim hồi HP; chiến khí nạp kỹ năng Long Đảm.
- Ghép 4/5 nhận thưởng năng lượng. Quân tuyển và cấp Xưởng binh khí làm tăng sát thương.
- Sau mỗi nước hợp lệ, địch thực hiện hành động theo quy luật (đánh thường, đánh mạnh, hồi máu).
- Hai chế độ: thường 1–2 phút và sứ quân 3–4 phút là **mục tiêu**, chưa cân bằng qua người chơi thật.
- Thắng nhận tài nguyên vào khóa localStorage `loan12_hoalu_v03`, giữ tương thích V0.3.
- Thua không trừ tài nguyên. Boss là trận thử nghiệm, chưa thay đổi bản đồ.
- Không cần Internet, không dùng thư viện ngoài.

## Kiểm thử thủ công
1. Mở START_GAME.bat > Xuất quân > vào trận.
2. Hoán đổi không ghép: không mất lượt; ghép 3: rơi ô và địch phản công.
3. Thử gợi ý; thử kỹ năng khi đủ 100 khí; thử thắng và thua.
4. Thắng: về Hoa Lư kiểm tra vàng/gỗ/đá tăng; F5 kiểm tra lưu.
5. Chuyển chế độ trận sứ quân và kiểm tra trên màn hình nhỏ.
