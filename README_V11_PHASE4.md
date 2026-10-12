# V1.1 – Giai đoạn 4: Kinh tế, nhiệm vụ, phần thưởng

## Đã làm
- Thêm bảng kinh tế Hoa Lư hiển thị sản lượng theo cấp Nông điền, số quân tuyển theo cấp Doanh trại và thời gian thu hoạch.
- Thêm ba nhiệm vụ phát triển thành trì: Đại điện cấp 2, Xưởng binh khí cấp 2, Nông điền cấp 3.
- Kiểm tra điều kiện nhiệm vụ tại thời điểm nhận thưởng, không chỉ lúc hiển thị.
- Giữ cơ chế receipt questRewardIds trong cùng bản ghi city để hạn chế nhận trùng.
- Không thay đổi giá nâng cấp, sản lượng, chiến đấu, hoặc khóa dữ liệu hiện hữu.

## Checklist Vercel
1. Vào Hoa Lư, bảng kinh tế hiện số liệu chính xác theo cấp công trình.
2. Thu hoạch và nâng cấp Nông điền, xác nhận sản lượng và bộ đếm thay đổi.
3. Nâng Đại điện cấp 2: nhiệm vụ q7 mở nhận; nhận thưởng rồi tải lại không nhận lại được.
4. Nâng Xưởng binh khí cấp 2 và Nông điền cấp 3: q8/q9 mở đúng.
5. Kiểm tra các nhiệm vụ q1–q6 cũ, bản đồ, trận chiến và điện thoại.
6. Nếu đã đạt cấp từ trước, nhiệm vụ mới vẫn đủ điều kiện nhận một lần.

Chưa chạy kiểm thử trên Vercel/thiết bị thực tế; cần kiểm thử trước khi merge.
