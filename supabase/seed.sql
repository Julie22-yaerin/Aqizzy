-- =========================================================
-- AQIZZY - SUPABASE SEED DATA
-- 4 Injected Scenarios for Vietnamese Middle School Students
-- (Grades 6-9 / Cấp 2)
-- =========================================================

-- Seed Scenarios Table
INSERT INTO scenarios (id, type, core_focus, title, grade_level, description, thumbnail_icon, content_json)
VALUES 
(
    'control-zalo-panic',
    'chat',
    'C',
    'Cơn hoảng loạn Zalo lúc 9h tối Chủ Nhật',
    'Lớp 7 - 8',
    '9h tối Chủ nhật, cô môn KHTN bất ngờ nhắn đổi đề tài thuyết trình ngày mai. Cả nhóm đang hoảng loạn muốn bỏ cuộc. Bạn sẽ giữ bình tĩnh và kiểm soát tình hình thế nào?',
    'message-square-warning',
    $${
        "trigger": "9:00 PM Chủ Nhật. Nhóm chat Zalo lớp nổ tung thông báo. Nhóm trưởng nhắn: \"Chết rồi cả nhà ơi, cô môn KHTN vừa nhắn đổi chủ đề làm mô hình ngày mai. Không làm tế bào nữa mà làm hệ hô hấp!\"",
        "context": "Nhóm Khoa Học Tự Nhiên - Lớp 8A3. Sáng mai tiết 1 là kiểm tra lấy điểm hệ số 2. Lúc này các tiệm văn phòng phẩm đã đóng cửa hết.",
        "npcs": [
            {
                "id": "minh_khang",
                "name": "Minh Khang",
                "role": "Thành viên nhóm (Hay lo âu)",
                "avatar": "👦🏻",
                "personality": "Hoảng loạn tột độ, dễ suy sụp, sợ bị điểm kém, đòi thức trắng đêm dù không có đồ nghề"
            },
            {
                "id": "linh_chi",
                "name": "Linh Chi",
                "role": "Thành viên nhóm (Bất cần, dễ buông xuôi)",
                "avatar": "👧🏻",
                "personality": "Tiêu cực, đổ lỗi cho giáo viên, đòi bỏ cuộc chấp nhận 0 điểm vì cho rằng quá bất công"
            }
        ],
        "core_metric": "Focus on what can be controlled right now (Tập trung vào điều có thể kiểm soát ngay lúc này)",
        "good_actions": [
            "Trấn an tinh thần các bạn trong nhóm, không hoảng loạn",
            "Đề xuất phương án thực tế: vẽ sơ đồ giải phẫu hệ hô hấp 2D trên giấy A3/A4 có sẵn ở nhà thay vì nặn mô hình 3D",
            "Phân công rõ ràng công việc: 1 bạn vẽ, 1 bạn ghi chú thích và chuẩn bị bài thuyết trình 3 phút",
            "Đại diện nhóm lên gặp cô giáo đầu giờ sáng mai giải thích khách quan và chân thành về thông báo gấp"
        ],
        "bad_actions": [
            "Chửi bới, than vãn hoặc trách móc cô giáo",
            "Hùa theo sự hoảng loạn của Khang hoặc sự buông xuôi của Chi",
            "Đòi thức đến 3-4h sáng để tìm cách làm mô hình 3D hoàn hảo trong khi nhà không có đất nặn hay xốp",
            "Im lặng bỏ mặc hoặc tắt thông báo Zalo đi ngủ"
        ],
        "initial_messages": [
            {
                "sender": "minh_khang",
                "sender_name": "Minh Khang",
                "text": "Trời ơi cứu tao với tụi mày ơi!! 😭😭 Cô Nga vừa nhắn trên Zalo đổi đề tài làm mô hình sáng mai sang HỆ HÔ HẤP rồi!! Mô hình tế bào tao với tụi mày dán xốp xong hết rồi mà!",
                "timestamp": "21:01"
            },
            {
                "sender": "linh_chi",
                "sender_name": "Linh Chi",
                "text": "Cái gì??? 9h tối Chủ Nhật cô mới nhắn đổi??? Giờ này tiệm tạp hóa đóng cửa sạch rồi lấy đâu ra đồ mà làm? Thôi tao dẹp, mai lên xin cô cho 0 điểm luôn đi, làm sao mà kịp được!",
                "timestamp": "21:02"
            },
            {
                "sender": "minh_khang",
                "sender_name": "Minh Khang",
                "text": "Không được đâu Chi ơi, điểm hệ số 2 đó!! Mai mà bị 0 điểm mẹ tao cắt tiền tiêu vặt với tịch thu điện thoại luôn á 😭 Hay là thức trắng đêm nay nặn đất sét đi, tao sợ quá!",
                "timestamp": "21:03"
            }
        ]
    }$$::jsonb
),
(
    'ownership-homeroom-period',
    'chat',
    'O',
    'Giờ Sinh Hoạt Lớp Sóng Gió',
    'Lớp 8 - 9',
    'Tiết sinh hoạt thứ Sáu, lớp bị trừ điểm thi đua tụt xuống chót bảng vì thành viên trong Tổ của bạn bị Giám thị bắt ăn vụng và xả rác. Cô Chủ Nhiệm đang giận dữ yêu cầu Tổ trưởng giải trình.',
    'shield-alert',
    $${
        "trigger": "Tiết sinh hoạt lớp chiều thứ Sáu. Cô Chủ Nhiệm (Cô Mai) bước vào lớp với vẻ mặt nghiêm nghị, cầm sổ thi đua đập mạnh lên bàn giáo viên. Tổ của bạn đã làm cả lớp mất danh hiệu Lớp Xuất Sắc tuần này.",
        "context": "Bạn là Tổ Trưởng Tổ 3. Bạn Nam trong tổ vừa bị Thầy Giám thị ghi vào Sổ Đầu Bài vì tội ăn bánh tráng trộn trong giờ truy bài và vứt bọc ni-lông dưới hộc bàn. Cả lớp bị trừ 10 điểm thi đua, đứng thứ 12/12 toàn trường.",
        "npcs": [
            {
                "id": "co_mai",
                "name": "Cô Mai (GVCN)",
                "role": "Giáo viên Chủ nhiệm nghiêm khắc",
                "avatar": "👩🏻‍🏫",
                "personality": "Rất coi trọng kỷ luật và tinh thần trách nhiệm tập thể, ghét sự đùn đẩy trách nhiệm nhưng công bằng và sẵn sàng bao dung nếu học sinh nhận lỗi dũng cảm"
            },
            {
                "id": "nam_le",
                "name": "Nam",
                "role": "Thành viên vi phạm trong Tổ",
                "avatar": "👦🏽",
                "personality": "Đang cúi gằm mặt xuống bàn, sợ hãi run rẩy, sợ bị mời phụ huynh"
            }
        ],
        "core_metric": "Taking leadership responsibility vs. Deflecting blame (Dũng cảm nhận trách nhiệm lãnh đạo thay vì chối bỏ, đổ lỗi)",
        "good_actions": [
            "Đứng dậy lễ phép, nhận trách nhiệm với tư cách là Tổ trưởng vì chưa nhắc nhở và quản lý tốt thành viên trong tổ",
            "Không đổ hết tội lỗi lên đầu bạn Nam trước mặt cả lớp, bảo vệ tinh thần đồng đội",
            "Đề xuất biện pháp khắc phục cụ thể: Cùng bạn Nam nhận trực nhật, dọn vệ sinh lớp cả tuần sau để gỡ điểm cho lớp",
            "Cam kết với cô và cả lớp quy chế kiểm tra vệ sinh tổ mỗi đầu giờ truy bài"
        ],
        "bad_actions": [
            "Chối bỏ ngay lập tức: \"Thưa cô, bạn Nam xả rác chứ em có xả đâu, em không biết gì hết!\"",
            "Đổ hết trách nhiệm cho Nam hoặc trách mắng Nam thậm tệ trước lớp để chứng minh mình vô can",
            "Thái độ chống đối, cho rằng thầy Giám thị bắt bẻ khó tính",
            "Im lặng không dám đứng lên khi cô gọi tên Tổ trưởng"
        ],
        "initial_messages": [
            {
                "sender": "co_mai",
                "sender_name": "Cô Mai (GVCN)",
                "text": "Cả lớp trật tự! Cô không thể tin được là tuần này lớp 8A chúng ta đứng bét toàn khối vì bị trừ 10 điểm thi đua! Thầy Giám thị báo lại Tổ 3 có học sinh ngang nhiên ăn quà vặt trong giờ truy bài rồi nhét rác vào hộc bàn! Tổ trưởng Tổ 3 đâu, em đứng lên trả lời cho cô và cả lớp biết chuyện này là như thế nào?!",
                "timestamp": "15:30"
            }
        ]
    }$$::jsonb
),
(
    'reach-math-test-disaster',
    'swipe',
    'R',
    'Thảm họa bài kiểm tra 1 tiết Toán (4 điểm)',
    'Lớp 7 - 9',
    'Bạn nhận lại bài kiểm tra 1 tiết Toán với điểm số 4/10 đỏ chót. Những suy nghĩ tiêu cực bủa vây: Sợ mẹ mắng, sợ mất danh hiệu Học Sinh Giỏi. Hãy học cách khoanh vùng thất bại bằng việc phân loại suy nghĩ!',
    'layers',
    $${
        "trigger": "Tiết trả bài kiểm tra 1 tiết Đại số chương 2. Thầy giáo đặt bài thi lên bàn của bạn: 4/10 điểm với nét bút đỏ gạch chéo to tướng. Cổ họng bạn nghẹn ứ, tim đập thình thịch khi nghĩ đến khuôn mặt nghiêm khắc của mẹ ở nhà.",
        "context": "Mục tiêu năm nay của bạn là đạt danh hiệu Học Sinh Giỏi để được bố thưởng xe đạp mới và đủ điều kiện thi vào trường Chuyên cấp 3. Điểm 4 này như một gáo nước lạnh tạt vào mặt.",
        "core_metric": "Compartmentalization (Khoanh vùng ảnh hưởng - Không để một thất bại cục bộ phá hủy toàn bộ lòng tự trọng và các lĩnh vực khác trong cuộc sống)",
        "cards": [
            {
                "id": "card-1",
                "thought": "Mẹ sẽ giết mình mất, về nhà chắc chắn sẽ bị tịch thu điện thoại và cấm cửa suốt tháng!",
                "correct_action": "left",
                "explanation": "Đây là suy nghĩ Thổi phồng thảm họa (Catastrophizing). Mẹ có thể sẽ mắng vì lo lắng, nhưng việc nghĩ mẹ 'giết mình' khiến não bộ rơi vào trạng thái hoảng loạn thay vì tìm giải pháp giao tiếp bình tĩnh.",
                "aq_tag": "Low AQ - Phóng đại quy mô"
            },
            {
                "id": "card-2",
                "thought": "Chỉ là một bài kiểm tra 1 tiết hệ số 2, mình vẫn còn bài thi Học kì hệ số 3 để gỡ lại điểm trung bình.",
                "correct_action": "right",
                "explanation": "Chính xác! Bạn đã khoanh vùng thành công: Điểm 4 này chỉ là 1 bài kiểm tra trong học kỳ, không quyết định toàn bộ kết quả cuối năm.",
                "aq_tag": "High AQ - Khoanh vùng ảnh hưởng (Reach)"
            },
            {
                "id": "card-3",
                "thought": "Điểm 4 Toán chứng minh mình là đứa ngu ngốc, sau này chắc chắn sẽ trượt kỳ thi vào lớp 10 công lập.",
                "correct_action": "left",
                "explanation": "Sai lầm nghiêm trọng! Bạn đang đánh đồng một bài kiểm tra chưa tốt với toàn bộ năng lực và tương lai của bản thân. Điểm số chỉ phản ánh kiến thức tại một thời điểm, không định nghĩa bạn.",
                "aq_tag": "Low AQ - Lan tỏa sang tương lai"
            },
            {
                "id": "card-4",
                "thought": "Môn Văn và Anh văn của mình tuần này vẫn đang giữ điểm 9, mình không hề mất gốc toàn diện.",
                "correct_action": "right",
                "explanation": "Rất tốt! Nhìn nhận các thế mạnh khác giúp bạn duy trì lòng tự tin và nhận ra thất bại này chỉ nằm ở môn Toán chứ không phá hủy các môn học khác.",
                "aq_tag": "High AQ - Giới hạn phạm vi thất bại"
            },
            {
                "id": "card-5",
                "thought": "Chắc chắn cả lớp và mấy đứa bạn thân đang cười thầm và khinh thường mình trong bụng.",
                "correct_action": "left",
                "explanation": "Đọc suy nghĩ người khác (Mind-reading) và hoang tưởng xã hội. Thực tế các bạn khác cũng đang bận lo lắng cho bài thi của chính họ, không ai rảnh để chế giễu bạn cả.",
                "aq_tag": "Low AQ - Lan tỏa sang quan hệ xã hội"
            },
            {
                "id": "card-6",
                "thought": "Tối nay mình sẽ chủ động đưa bài cho mẹ xem trước, nhận lỗi và xin mẹ cho đăng ký học kèm phần hình học.",
                "correct_action": "right",
                "explanation": "Hành động chủ động tuyệt vời! Thay vì trốn tránh, bạn biến sự việc thành kế hoạch khắc phục có tính xây dựng cao.",
                "aq_tag": "High AQ - Biến nghịch cảnh thành hành động"
            },
            {
                "id": "card-7",
                "thought": "Xem lại bài thi thì mình thấy mình chỉ làm sai dạng toán phương trình bậc nhất, mình sẽ mượn vở bạn Nam chép lại dạng này.",
                "correct_action": "right",
                "explanation": "Tư duy phân tích chính xác: Tách riêng phần kiến thức bị hổng thay vì quy chụp là 'mình không biết làm gì hết'.",
                "aq_tag": "High AQ - Cô lập vấn đề cốt lõi"
            },
            {
                "id": "card-8",
                "thought": "Cả năm học này coi như vứt đi rồi, có cố gắng nữa cũng chẳng bao giờ lấy lại được danh hiệu Học sinh Giỏi.",
                "correct_action": "left",
                "explanation": "Tư duy trắng - đen (All-or-nothing). Một vết xước nhỏ trên xe không có nghĩa là chiếc xe bị hỏng hoàn toàn. Đừng tự tước đoạt cơ hội của chính mình!",
                "aq_tag": "Low AQ - Buông xuôi tuyệt vọng"
            }
        ]
    }$$::jsonb
),
(
    'endurance-may-exam-crush',
    'resource',
    'E',
    'Cơn lốc mùa thi tháng Năm (May Exam Crush)',
    'Lớp 8 - 9',
    'Tháng 5 rực lửa. Chỉ còn 2 tuần nữa là thi Học kì 2. Bạn phải đối mặt với 8 cuốn đề cương dày cộm và 5 ca học thêm mỗi tuần. Hãy quản lý Năng lượng & Căng thẳng để sống sót qua 7 ngày cam go!',
    'battery-charging',
    $${
        "trigger": "Giữa tháng 5 oi bức. Quạt trần lớp học quay vù vù. Trên bàn là xấp đề cương ôn tập dày cộp của 8 môn học. Mẹ vừa đăng ký thêm 2 ca học kèm Toán và Anh văn buổi tối. Bạn cảm thấy như muốn nổ tung.",
        "context": "Thời gian mô phỏng: 7 ngày (Thứ Hai đến Chủ Nhật). Chỉ số ban đầu: Năng lượng (Energy) 80%, Căng thẳng (Stress) 25%. Nếu Căng thẳng chạm 100% hoặc Năng lượng về 0%, bạn sẽ bị Kiệt sức (Burnout) và thất bại.",
        "core_metric": "Endurance (Sức bền bỉ - Biết phân bổ sức lực đường dài, không đốt cháy giai đoạn, tự chăm sóc bản thân để duy trì phong độ)",
        "days": [
            {
                "day_number": 1,
                "day_name": "Thứ Hai",
                "scenario_event": "Cô giáo phát thêm 30 câu hỏi đề cương môn Lịch Sử và yêu cầu học thuộc lòng trước thứ Tư. Tối nay có ca học thêm Toán từ 19h30 đến 21h30.",
                "choices": [
                    {
                        "id": "c1_good",
                        "title": "Chia nhỏ 30 câu: Hôm nay học 10 câu trọng tâm, ngủ lúc 23h",
                        "description": "Dùng phương pháp Pomodoro học 10 câu quan trọng nhất, ngủ đủ 7 tiếng để mai còn tỉnh táo.",
                        "energy_delta": -15,
                        "stress_delta": 10,
                        "endurance_score": 15,
                        "feedback": "Lựa chọn xuất sắc! Chia nhỏ mục tiêu giúp bạn giảm tải áp lực tâm lý và duy trì năng lượng bền bỉ."
                    },
                    {
                        "id": "c1_bad",
                        "title": "Thức đến 2h sáng cày sạch 30 câu đề cương Sử",
                        "description": "Uống 1 ly cà phê đậm đặc, cố nhồi nhét cả 30 câu ngay trong đêm để ngày mai rảnh tay.",
                        "energy_delta": -40,
                        "stress_delta": 30,
                        "endurance_score": -10,
                        "feedback": "Sai lầm! Thức đến 2h sáng khiến ngày hôm sau não bạn tê liệt, trí nhớ ngắn hạn sẽ quên sạch kiến thức vừa học."
                    },
                    {
                        "id": "c1_neutral",
                        "title": "Học lướt qua các câu ngắn, dành thời gian lướt mạng xã hội xả stress",
                        "description": "Cảm thấy quá ngột ngạt nên mở điện thoại lướt TikTok đến 1h sáng để quên đi áp lực.",
                        "energy_delta": -25,
                        "stress_delta": 25,
                        "endurance_score": -5,
                        "feedback": "Cơ chế trốn tránh (Avoidance)! Trì hoãn chỉ khiến sự lo âu ngày mai tăng gấp đôi."
                    }
                ]
            },
            {
                "day_number": 2,
                "day_name": "Thứ Ba",
                "scenario_event": "Sau buổi học thêm Văn, mẹ bảo muốn đăng ký thêm lớp Luyện đề lúc 21h30 vì sợ bạn thi không đỗ trường chuẩn.",
                "choices": [
                    {
                        "id": "c2_good",
                        "title": "Ngồi nói chuyện chân thành với mẹ: Xin không học ca khuya để tự ôn ở nhà",
                        "description": "Giải thích cho mẹ hiểu não bộ cần thời gian tự tiêu hóa kiến thức và ngủ đủ giấc mới nhớ lâu.",
                        "energy_delta": -10,
                        "stress_delta": -10,
                        "endurance_score": 20,
                        "feedback": "Đỉnh cao của sự bền bỉ! Biết đặt ranh giới lành mạnh và giao tiếp hiệu quả với phụ huynh thay vì nén nhịn."
                    },
                    {
                        "id": "c2_bad",
                        "title": "Vâng lời mẹ đi học ca đêm, uống thêm lon bò húc tăng lực",
                        "description": "Không dám nói với mẹ, ôm bụng đói đi học tiếp đến 23h30 trong tình trạng mắt nhắm mắt mở.",
                        "energy_delta": -45,
                        "stress_delta": 35,
                        "endurance_score": -15,
                        "feedback": "Cảnh báo nguy hiểm! Ép bản thân quá tải bằng chất kích thích là con đường ngắn nhất dẫn đến kiệt sức."
                    },
                    {
                        "id": "c2_neutral",
                        "title": "Cãi nhau to tiếng với mẹ rồi đóng sầm cửa phòng khóc",
                        "description": "Bùng nổ cảm xúc vì quá ức chế, từ chối ăn tối.",
                        "energy_delta": -30,
                        "stress_delta": 30,
                        "endurance_score": -10,
                        "feedback": "Bùng nổ cảm xúc tiêu hao một lượng năng lượng khổng lồ mà không giải quyết được vấn đề."
                    }
                ]
            },
            {
                "day_number": 3,
                "day_name": "Thứ Tư",
                "scenario_event": "Kiểm tra 15 phút môn Hóa bất ngờ. Bạn làm bài không như ý vì quên một công thức tính số mol. Bạn bè bắt đầu bàn tán đáp án xôn xao.",
                "choices": [
                    {
                        "id": "c3_good",
                        "title": "Ghi chú lại công thức quên vào sổ tay nhỏ, không ngồi so đáp án với bạn",
                        "description": "Chấp nhận sai sót, tập trung vào các môn tiếp theo thay vì dằn vặt bản thân.",
                        "energy_delta": -10,
                        "stress_delta": 5,
                        "endurance_score": 15,
                        "feedback": "Tâm lý thép! So đáp án sau giờ kiểm tra chỉ làm tăng hoang mang mà không thay đổi được điểm số."
                    },
                    {
                        "id": "c3_bad",
                        "title": "Dành cả buổi chiều ngồi cắn móng tay dằn vặt, bỏ ăn trưa",
                        "description": "Nghĩ mãi về câu sai, mất tập trung hoàn toàn trong các tiết học còn lại.",
                        "energy_delta": -30,
                        "stress_delta": 30,
                        "endurance_score": -10,
                        "feedback": "Bền bỉ là biết buông bỏ những thứ đã qua để giữ sức cho chặng đua tiếp theo."
                    }
                ]
            },
            {
                "day_number": 4,
                "day_name": "Thứ Năm",
                "scenario_event": "Cơ thể bắt đầu rệu rã, đau vai gáy và nhức mắt vì nhìn vào trang sách quá lâu. Tối nay có bài tập 2 môn Toán và Lý.",
                "choices": [
                    {
                        "id": "c4_good",
                        "title": "Tập thể dục nhẹ 20 phút, tắm nước ấm và chợp mắt 30 phút trước khi học",
                        "description": "Nạp lại năng lượng vật lý trước khi bước vào bàn học.",
                        "energy_delta": 15,
                        "stress_delta": -15,
                        "endurance_score": 20,
                        "feedback": "Tái tạo năng lượng chủ động (Active Recovery)! Đây là bí quyết của các vận động viên và học sinh xuất sắc."
                    },
                    {
                        "id": "c4_bad",
                        "title": "Gồng mình ngồi lì trên bàn học suốt 5 tiếng không rời",
                        "description": "Cố gắng ngồi bất động từ 18h đến 23h mặc cho đầu óc quay cuồng không tiếp thu được gì.",
                        "energy_delta": -35,
                        "stress_delta": 25,
                        "endurance_score": -10,
                        "feedback": "Hiệu suất giảm dần theo thời gian. Ngồi lì không có nghĩa là bạn đang học hiệu quả."
                    }
                ]
            },
            {
                "day_number": 5,
                "day_name": "Thứ Sáu",
                "scenario_event": "Chiến lược phân bổ điểm số: Có 2 môn phụ (GDCD và Công Nghệ) và 2 môn chính (Toán, Văn). Bạn không thể đạt điểm 10 tuyệt đối cho tất cả.",
                "choices": [
                    {
                        "id": "c5_good",
                        "title": "Chiến lược thực tế: Chấp nhận điểm 8 môn phụ để dồn 80% sức lực cho Toán và Văn",
                        "description": "Biết buông bỏ chủ nghĩa hoàn hảo để bảo toàn năng lượng cho các môn then chốt.",
                        "energy_delta": -15,
                        "stress_delta": -10,
                        "endurance_score": 25,
                        "feedback": "Tư duy chiến lược tuyệt đỉnh! Người có AQ cao không cố gắng trở nên hoàn hảo ở mọi thứ nhỏ nhặt."
                    },
                    {
                        "id": "c5_bad",
                        "title": "Cố gắng học thuộc từng dấu phẩy của cả 4 môn để giành điểm 10 tuyệt đối",
                        "description": "Ám ảnh chủ nghĩa hoàn hảo, bắt bản thân phải xuất sắc mọi mặt.",
                        "energy_delta": -40,
                        "stress_delta": 40,
                        "endurance_score": -15,
                        "feedback": "Chủ nghĩa hoàn hảo không thực tế là kẻ thù số 1 của sức bền."
                    }
                ]
            },
            {
                "day_number": 6,
                "day_name": "Thứ Bảy",
                "scenario_event": "Bạn bè rủ nhau đi trà sữa và chụp hình cuối tuần để giải tỏa sau một tuần căng thẳng. Bạn cũng muốn đi nhưng bài tập còn nhiều.",
                "choices": [
                    {
                        "id": "c6_good",
                        "title": "Tham gia 1 tiếng với nhóm bạn rồi về, coi đó là phần thưởng tự thưởng",
                        "description": "Cân bằng giữa giao lưu bạn bè và mục tiêu ôn thi, không tự cô lập bản thân.",
                        "energy_delta": 10,
                        "stress_delta": -20,
                        "endurance_score": 15,
                        "feedback": "Giao lưu xã hội tích cực kích thích hormone endorphin giúp bạn có thêm tinh thần cho tuần thi sắp tới."
                    },
                    {
                        "id": "c6_neutral",
                        "title": "Đi chơi suốt từ chiều đến tối muộn, bỏ bê hết bài vở",
                        "description": "Chơi thả phanh để bù đắp những ngày căng thẳng.",
                        "energy_delta": -25,
                        "stress_delta": 20,
                        "endurance_score": -10,
                        "feedback": "Chơi quá đà sẽ tạo ra cảm giác tội lỗi và hoảng sợ vào ngày Chủ Nhật."
                    }
                ]
            },
            {
                "day_number": 7,
                "day_name": "Chủ Nhật",
                "scenario_event": "Ngày cuối cùng trước tuần thi quyết định. Cần chuẩn bị tâm thế và dụng cụ thi.",
                "choices": [
                    {
                        "id": "c7_good",
                        "title": "Dọn dẹp bàn học gọn gàng, chuẩn bị bút thước, đi ngủ sớm lúc 22h",
                        "description": "Ôn nhẹ nhàng 1 lượt sơ đồ tư duy, chuẩn bị giấc ngủ ngon để sẵn sàng cho ngày mai.",
                        "energy_delta": 20,
                        "stress_delta": -20,
                        "endurance_score": 30,
                        "feedback": "Bạn đã hoàn thành 7 ngày kiên cường! Tâm trí minh mẫn và cơ thể khỏe mạnh là vũ khí mạnh nhất trong phòng thi."
                    },
                    {
                        "id": "c7_bad",
                        "title": "Lo sợ quá độ, cày xuyên đêm đến 4h sáng vì nghĩ mình chưa thuộc bài",
                        "description": "Nhồi nhét phút chót trong cơn hoảng loạn.",
                        "energy_delta": -50,
                        "stress_delta": 50,
                        "endurance_score": -25,
                        "feedback": "Cú ngã trước vạch đích! Não bộ kiệt quệ sẽ khiến bạn 'trắng não' (blank out) ngay khi nhận đề thi ngày mai."
                    }
                ]
            }
        ]
    }$$::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    content_json = EXCLUDED.content_json;
