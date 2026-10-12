# V1.0 Giai đoạn 5B – An toàn thưởng và cân bằng kinh tế

## Thay đổi
- Ghi phần thưởng nhiệm vụ và biên nhận questRewardIds trong **cùng một bản ghi** loan12_hoalu_v03.
- Đọc cả questRewardIds và loan12_quest_claims_v08 để giữ tương thích với tiến trình cũ.
- Không cộng thưởng lại khi ghi bản sao khóa nhiệm vụ cũ thất bại.
- Bảng tiến trình hiển thị trạng thái nhận thưởng từ cả hai nguồn.
- Không reset dữ liệu người chơi.

## Cân bằng kinh tế hiện hành (giữ nguyên)
- Nông điền: mỗi 10 giây nhận 120/95/70 vàng/gỗ/đá × cấp 1–3.
- Nâng công trình cấp N lên N+1: 200N vàng, 150N gỗ, 100N đá; tối đa cấp 3.
- Doanh trại cấp 1/2/3 tuyển 10/20/30 quân mỗi lượt với 150 vàng + 70 gỗ.
- Chiêu hàng: 300 vàng + 100 gỗ; chọn hòa giải trong cốt truyện: 180 vàng + 60 gỗ.
- Trận thường thắng: 150 vàng, 75 gỗ, 50 đá; trận sứ quân thắng: 600 vàng, 300 gỗ, 220 đá (phụ thuộc điều kiện hợp lệ).
- Nhiệm vụ q1–q6: thưởng một lần theo quests.html.

## Nghiệm thu
1. Nhận q1 lần đầu: vàng +100, gỗ +80, có questRewardIds chứa q1.
2. Reload, quay lại: nút q1 là Đã nhận; không cộng thêm.
3. Tài khoản đã có loan12_quest_claims_v08: không nhận trùng nhiệm vụ cũ.
4. Xóa thử khóa loan12_quest_claims_v08 sau khi nhận: vẫn không nhận lại nhờ biên nhận trong city.
5. Kiểm tra tiến trình 7/13, 13/13 và phần thưởng q5, q6.
6. Kiểm tra thành trì, chiến đấu và ngoại giao không xóa questRewardIds.

## Giới hạn
- localStorage không có giao dịch liên-tab; mở hai tab và nhấn đồng thời vẫn có nguy cơ tranh chấp. Muốn đồng bộ đa thiết bị cần backend.
- Chưa đo cân bằng kinh tế bằng telemetry thực tế; không tự ý thay đổi giá/thưởng.
