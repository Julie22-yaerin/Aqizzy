import { Scenario } from '@/types';

export const INJECTED_SCENARIOS: Scenario[] = [
  {
    id: 'control-zalo-panic',
    type: 'chat',
    core_focus: 'C',
    title: 'The 9 PM Sunday Zalo Panic',
    grade_level: 'Lớp 7 - 8',
    description: '9h tối Chủ nhật, cô môn KHTN vừa nhắn đổi chủ đề làm mô hình sang ngày mai. Cả nhóm chat nổ tung trong hoảng loạn. Hãy làm chủ tình huống!',
    thumbnail_icon: 'MessageSquareWarning',
    content_json: {
      trigger: '9:00 PM on Sunday. The class Zalo group chat explodes. The Group Leader texts: "Chết rồi, cô môn KHTN (Natural Science) vừa nhắn đổi chủ đề làm mô hình ngày mai. Không làm tế bào nữa mà làm hệ hô hấp."',
      context: 'Nhóm KHTN Lớp 8A3. Sáng mai tiết 1 là kiểm tra lấy điểm hệ số 2. Lúc này tiệm tạp hóa đã đóng cửa, không thể mua thêm đất nặn hay xốp.',
      npcs: [
        {
          id: 'minh_khang',
          name: 'Minh Khang',
          role: 'Bạn cùng nhóm (Hay lo âu)',
          avatar: '👦🏻',
          personality: 'Cực kỳ hoảng loạn, đòi thức trắng đêm nặn mô hình dù không có đồ nghề, sợ bị điểm 0 mẹ mắng.'
        },
        {
          id: 'linh_chi',
          name: 'Linh Chi',
          role: 'Bạn cùng nhóm (Bất cần, dễ nản)',
          avatar: '👧🏻',
          personality: 'Bực tức, trách móc cô giáo vô lý, dọa bỏ cuộc chấp nhận 0 điểm vì cho rằng làm cũng không kịp.'
        }
      ],
      core_metric: 'Focus on what can be controlled right now (Tập trung vào điều trong tầm kiểm soát)',
      good_action_guidance: 'Trấn an cả nhóm, đề xuất phương án thực tế: vẽ sơ đồ giải phẫu hệ hô hấp 2D trên giấy A3/A4 có sẵn tại nhà thay vì nặn mô hình 3D, phân công rõ người vẽ người chuẩn bị thuyết minh 3 phút, sáng mai gặp cô giải thích lý do khách quan.',
      bad_action_guidance: 'Than vãn trách cô, hoảng loạn hùa theo các bạn, hoặc cố chấp thức tới sáng làm mô hình 3D khi không có vật liệu.',
      initial_messages: [
        {
          id: 'm1',
          sender: 'minh_khang',
          sender_name: 'Minh Khang',
          text: 'Trời ơi cứu tao với tụi mày ơi!! 😭😭 Cô KHTN vừa nhắn trên Zalo đổi đề tài mô hình sáng mai sang HỆ HÔ HẤP rồi!! Mô hình tế bào tao với tụi mày dán xốp xong hết rồi mà!',
          timestamp: '21:01',
          is_user: false
        },
        {
          id: 'm2',
          sender: 'linh_chi',
          sender_name: 'Linh Chi',
          text: 'Cái gì??? 9h tối Chủ Nhật cô mới nhắn đổi??? Giờ này tiệm tạp hóa đóng cửa sạch rồi lấy đâu ra đồ mà làm? Thôi tao dẹp, mai lên xin cô cho 0 điểm luôn đi, làm sao mà kịp được!',
          timestamp: '21:02',
          is_user: false
        },
        {
          id: 'm3',
          sender: 'minh_khang',
          sender_name: 'Minh Khang',
          text: 'Không được đâu Chi ơi, điểm hệ số 2 đó!! Mai mà bị 0 điểm mẹ tao cắt tiền tiêu vặt với tịch thu điện thoại luôn á 😭 Hay là thức trắng đêm nay nặn đất sét đi, tao sợ quá!',
          timestamp: '21:03',
          is_user: false
        }
      ]
    }
  },
  {
    id: 'ownership-homeroom-period',
    type: 'chat',
    core_focus: 'O',
    title: 'The Homeroom Period (Giờ Sinh Hoạt Lớp)',
    grade_level: 'Lớp 8 - 9',
    description: 'Tiết sinh hoạt thứ Sáu giông bão. Tổ của bạn làm lớp mất điểm thi đua tuần vì có bạn ăn vụng và xả rác bị Giám thị bắt. Bạn là Tổ trưởng.',
    thumbnail_icon: 'ShieldAlert',
    content_json: {
      trigger: 'It\'s Friday\'s Homeroom period. The Homeroom Teacher (Cô Chủ Nhiệm) is furious. Your group (Tổ) caused the class to lose weekly emulation points because a member was caught eating snacks and throwing trash by the School Supervisor (Giám thị). You are the Group Leader (Tổ trưởng).',
      context: 'Bạn là Tổ trưởng Tổ 3. Bạn Nam trong tổ vừa bị Thầy Giám thị bắt quả tang ăn quà vặt và nhét rác vào hộc bàn trong giờ sinh hoạt 15 phút đầu giờ. Lớp bị trừ 10 điểm thi đua, rơi xuống hạng 12/12 toàn trường.',
      npcs: [
        {
          id: 'co_mai',
          name: 'Cô Mai (GVCN)',
          role: 'Cô Chủ Nhiệm nghiêm khắc',
          avatar: '👩🏻‍🏫',
          personality: 'Nghiêm nghị, công bằng, coi trọng tinh thần chịu trách nhiệm của người đứng đầu, dị ứng với học sinh đổ lỗi đùn đẩy.'
        },
        {
          id: 'nam_le',
          name: 'Nam',
          role: 'Thành viên vi phạm',
          avatar: '👦🏽',
          personality: 'Đang cúi gằm mặt run rẩy vì sợ bị hạ hạnh kiểm và mời bố mẹ lên trường.'
        }
      ],
      core_metric: 'Taking leadership responsibility vs. Deflecting blame (Dũng cảm chịu trách nhiệm người lãnh đạo vs Đùn đẩy đổ lỗi)',
      good_action_guidance: 'Đứng lên nhận lỗi với tư cách Tổ trưởng vì chưa đôn đốc quản lý tổ chặt chẽ, cùng bạn Nam xin nhận phạt chung (trực nhật lớp, quét sân trường tuần sau để chuộc lỗi), cam kết giải pháp cụ thể.',
      bad_action_guidance: 'Đùn đẩy ngay: "Thưa cô bạn Nam xả rác chứ em không có xả, em không liên quan!", hoặc mắng chửi bạn Nam trước lớp để mình vô tội.',
      initial_messages: [
        {
          id: 'm1',
          sender: 'co_mai',
          sender_name: 'Cô Mai (GVCN)',
          text: 'Cả lớp trật tự! Cô không thể chấp nhận được việc lớp 8A chúng ta tuần này tụt xuống hạng bét của trường vì bị trừ 10 điểm thi đua! Thầy Giám thị ghi rõ: Tổ 3 có học sinh ăn quà vặt trong giờ truy bài rồi nhét rác vào hộc bàn! Tổ trưởng Tổ 3 đâu, em đứng lên giải thích cho cô và cả lớp nghe xem em đã quản lý tổ thế nào?!',
          timestamp: '15:30',
          is_user: false
        }
      ]
    }
  },
  {
    id: 'reach-math-test-disaster',
    type: 'swipe',
    core_focus: 'R',
    title: 'The 45-Minute Math Test Disaster (Bài kiểm tra 4 điểm)',
    grade_level: 'Lớp 7 - 9',
    description: 'Nhận bài kiểm tra 1 tiết Toán 4 điểm đỏ chót. Nỗi sợ mẹ mắng và trượt Học sinh Giỏi bủa vây. Hãy vuốt Trái để loại bỏ suy nghĩ tiêu cực, vuốt Phải để giữ suy nghĩ khoanh vùng!',
    thumbnail_icon: 'Layers',
    content_json: {
      trigger: 'You receive your 45-minute Math test: 4 out of 10 points. You are terrified of your mom\'s reaction and losing the "Học Sinh Giỏi" (Excellent Student) title. Negative thoughts flood your brain.',
      context: 'Bài kiểm tra 1 tiết Đại số chương 2. Điểm 4/10 hệ số 2. Thầy giáo phê bằng mực đỏ: "Cần cố gắng nhiều hơn!".',
      core_metric: 'Isolating the failure / Compartmentalization (Khoanh vùng thất bại, không để vết thương lan ra các mảng khác)',
      cards: [
        {
          id: 'r-1',
          thought: 'Mẹ sẽ giết mình mất, về nhà thế nào cũng bị mẹ mắng té tát và tịch thu điện thoại cả tháng!',
          correct_action: 'left',
          explanation: 'Low AQ (Thổi phồng thảm họa): Não bạn đang phóng đại sự trừng phạt, kích hoạt nỗi sợ hãi tê liệt thay vì tìm giải pháp đối thoại mang tính xây dựng.',
          aq_tag: 'Low AQ - Phóng đại quy mô'
        },
        {
          id: 'r-2',
          thought: 'Chỉ là một bài 1 tiết, mình vẫn còn bài thi Học kì hệ số 3 và các bài 15 phút để gỡ điểm trung bình.',
          correct_action: 'right',
          explanation: 'High AQ (Khoanh vùng ảnh hưởng): Bạn đã cô lập điểm 4 này vào đúng vị trí của nó — chỉ là một bài kiểm tra đơn lẻ trong cả một học kỳ dài.',
          aq_tag: 'High AQ - Giới hạn phạm vi thất bại'
        },
        {
          id: 'r-3',
          thought: 'Mình dốt Toán bẩm sinh rồi, điểm 4 này chứng minh mình sẽ không bao giờ đỗ được cấp 3 công lập.',
          correct_action: 'left',
          explanation: 'Low AQ (Lan tỏa sang tương lai & năng lực cốt lõi): Đánh đồng một bài làm sai dạng bài với toàn bộ tương lai học vấn của bản thân.',
          aq_tag: 'Low AQ - Lan tỏa sang tương lai'
        },
        {
          id: 'r-4',
          thought: 'Môn Văn và Anh mình tuần này vẫn đang 9 điểm, mình không hề mất gốc hay kém cỏi toàn diện.',
          correct_action: 'right',
          explanation: 'High AQ (Bảo toàn lòng tự trọng): Nhìn nhận các vùng an toàn khác giúp bạn giữ vững sự tự tin để phục hồi môn Toán.',
          aq_tag: 'High AQ - Bảo tồn năng lực'
        },
        {
          id: 'r-5',
          thought: 'Cả lớp chắc chắn đang nhìn mình cười thầm và coi thường mình vì điểm kém.',
          correct_action: 'left',
          explanation: 'Low AQ (Ảo tưởng bị phán xét): Thực tế các bạn trong lớp đều đang bận rộn với áp lực của chính họ. Đừng để nỗi sợ xã hội chiếm lấy bạn.',
          aq_tag: 'Low AQ - Lan tỏa sang quan hệ xã hội'
        },
        {
          id: 'r-6',
          thought: 'Tối nay phải nói thật với mẹ để xin đi học kèm phần hình học và phương trình mình chưa hiểu.',
          correct_action: 'right',
          explanation: 'High AQ (Hành động giải pháp): Biến thất bại thành một đề xuất cụ thể để nhận được sự hỗ trợ từ gia đình.',
          aq_tag: 'High AQ - Biến vấn đề thành giải pháp'
        },
        {
          id: 'r-7',
          thought: 'Xem lại bài thi thì mình thấy mình chỉ làm sai dạng phương trình chứa ẩn ở mẫu, mình sẽ mượn vở bạn Nam chép lại phương pháp giải.',
          correct_action: 'right',
          explanation: 'High AQ (Tách biệt lỗ hổng kiến thức): Phân tích nguyên nhân kỹ thuật khách quan thay vì tự dằn vặt cảm xúc.',
          aq_tag: 'High AQ - Phân tích kỹ thuật'
        },
        {
          id: 'r-8',
          thought: 'Cả năm học này coi như vứt đi rồi, công sức bao tháng ngày đều thành công cốc.',
          correct_action: 'left',
          explanation: 'Low AQ (Tư duy tất cả hoặc không có gì): Bỏ cuộc chỉ vì một cú vấp ngã là cái bẫy lớn nhất của người có AQ thấp.',
          aq_tag: 'Low AQ - Buông xuôi cực đoan'
        }
      ]
    }
  },
  {
    id: 'endurance-may-exam-crush',
    type: 'resource',
    core_focus: 'E',
    title: 'The May Exam Crush (Cơn lốc mùa thi tháng Năm)',
    grade_level: 'Lớp 8 - 9',
    description: 'Tháng 5. Còn 2 tuần nữa thi Học kì 2. 8 cuốn đề cương dày cộm và 5 ca học thêm/tuần. Hãy quản lý Năng lượng & Căng thẳng sống sót qua 7 ngày!',
    thumbnail_icon: 'BatteryCharging',
    content_json: {
      trigger: 'It\'s May. Final exams are in 2 weeks. You have thick "Đề cương ôn tập" (Study Outlines) for 8 subjects. Your mom forces you to attend 5 extra evening tutoring classes (Học thêm) per week.',
      context: 'Chỉ số ban đầu: Năng lượng 80%, Căng thẳng 25%. Mục tiêu: Vượt qua 7 ngày mà không bị Burnout (Căng thẳng >= 100% hoặc Năng lượng <= 0%).',
      core_metric: 'Pacing oneself to survive the long term (Biết giữ nhịp sức bền đường dài)',
      days: [
        {
          day_number: 1,
          day_name: 'Thứ Hai',
          scenario_event: 'Cô giáo phát thêm 30 câu hỏi đề cương Sử và yêu cầu học thuộc trước thứ Tư. Tối nay có ca học thêm Toán 2 tiếng.',
          choices: [
            {
              id: 'c1_good',
              title: 'Chia nhỏ đề cương: Hôm nay học 10 câu trọng tâm, ngủ lúc 23h',
              description: 'Áp dụng phương pháp Pomodoro, ngủ đủ giấc để ngày mai không bị đơ não.',
              energy_delta: -15,
              stress_delta: +10,
              endurance_score: +15,
              feedback: 'Tuyệt vời! Chia nhỏ mục tiêu giúp duy trì sức bền và sự minh mẫn.'
            },
            {
              id: 'c1_bad',
              title: 'Thức đến 2h sáng cày cho xong cả 30 câu Sử',
              description: 'Uống cà phê đậm đặc, cố nhồi nhét cả 30 câu để ngày mai rảnh tay.',
              energy_delta: -40,
              stress_delta: +30,
              endurance_score: -10,
              feedback: 'Sai lầm! Não bộ quá tải sẽ quên sạch kiến thức và cạn kiệt năng lượng ngày hôm sau.'
            },
            {
              id: 'c1_neutral',
              title: 'Học lướt qua, lướt TikTok đến 1h sáng để giải tỏa áp lực',
              description: 'Cảm thấy quá tải nên trốn tránh bài vở bằng mạng xã hội.',
              energy_delta: -25,
              stress_delta: +25,
              endurance_score: -5,
              feedback: 'Cơ chế trốn tránh chỉ làm tăng cảm giác tội lỗi và lo âu vào ngày hôm sau.'
            }
          ]
        },
        {
          day_number: 2,
          day_name: 'Thứ Ba',
          scenario_event: 'Mẹ vừa thông báo đăng ký thêm 1 lớp luyện đề Văn buổi tối lúc 21h30 vì lo bạn không đỗ trường điểm.',
          choices: [
            {
              id: 'c2_good',
              title: 'Thẳng thắn xin mẹ rút bớt 1 ca học thêm để tự học và ngủ đủ 8 tiếng',
              description: 'Giải thích cho mẹ hiểu tự học và giấc ngủ là chìa khóa để kiến thức thấm sâu.',
              energy_delta: -10,
              stress_delta: -15,
              endurance_score: +20,
              feedback: 'Rất bản lĩnh! Dám đối thoại với phụ huynh để bảo vệ sức khỏe tâm lý là phẩm chất của người có AQ cao.'
            },
            {
              id: 'c2_bad',
              title: 'Âm thầm chịu đựng đi học ca đêm, uống 2 lon nước tăng lực',
              description: 'Không dám lên tiếng, gồng mình học đến nửa đêm trong kiệt sức.',
              energy_delta: -45,
              stress_delta: +35,
              endurance_score: -15,
              feedback: 'Báo động đỏ! Ép cơ thể bằng chất kích thích làm nguy cơ kiệt sức tăng vọt.'
            },
            {
              id: 'c2_neutral',
              title: 'Gắt gỏng cãi mẹ rồi đóng sầm cửa khóc một mình',
              description: 'Xả cơn ức chế nhưng không đưa ra được giải pháp nào.',
              energy_delta: -30,
              stress_delta: +25,
              endurance_score: -10,
              feedback: 'Bùng nổ cảm xúc tiêu tốn năng lượng mà không giải quyết được nguồn cơn căng thẳng.'
            }
          ]
        },
        {
          day_number: 3,
          day_name: 'Thứ Tư',
          scenario_event: 'Bài kiểm tra 15 phút Hóa sáng nay làm hỏng 1 câu công thức. Bạn bè xúm lại so đáp án ồn ào.',
          choices: [
            {
              id: 'c3_good',
              title: 'Ghi chú công thức sai vào sổ tay nhỏ, không ngồi so đáp án làm hoang mang',
              description: 'Chấp nhận sai số nhỏ, tập trung cho các môn tiếp theo.',
              energy_delta: -10,
              stress_delta: +5,
              endurance_score: +15,
              feedback: 'Tâm lý vững vàng! Biết bỏ qua những việc đã xong để dồn sức cho chặng tiếp.'
            },
            {
              id: 'c3_bad',
              title: 'Ngồi cắn móng tay dằn vặt suốt cả buổi trưa, bỏ ăn cơm',
              description: 'Ám ảnh về câu sai khiến bạn mất tập trung suốt cả ngày.',
              energy_delta: -30,
              stress_delta: +30,
              endurance_score: -10,
              feedback: 'Dằn vặt quá khứ làm hao mòn sức bền tinh thần một cách vô ích.'
            }
          ]
        },
        {
          day_number: 4,
          day_name: 'Thứ Năm',
          scenario_event: 'Cơ thể mỏi nhừ sau 4 ngày chạy đua. Đầu óc ong ong, tối nay có bài tập Lý và Anh.',
          choices: [
            {
              id: 'c4_good',
              title: 'Đi bộ thể dục 20 phút, tắm nước ấm và chợp mắt 30 phút trước khi học',
              description: 'Tái tạo năng lượng chủ động (Active recovery) để não phục hồi.',
              energy_delta: +20,
              stress_delta: -20,
              endurance_score: +20,
              feedback: 'Đỉnh cao bền bỉ! Vận động nhẹ và ngủ ngắn giúp tái tạo năng lượng thần kỳ.'
            },
            {
              id: 'c4_bad',
              title: 'Cố thủ ngồi lì trên bàn học 5 tiếng liên tục không đứng dậy',
              description: 'Gồng mình ép bản thân phải học dù chữ không vào đầu.',
              energy_delta: -35,
              stress_delta: +25,
              endurance_score: -10,
              feedback: 'Ngồi lì khi não kiệt sức chỉ tạo ra cảm giác siêng năng giả tạo.'
            }
          ]
        },
        {
          day_number: 5,
          day_name: 'Thứ Sáu',
          scenario_event: 'Bài toán chiến lược: 2 môn phụ (GDCD, Công Nghệ) và 2 môn chính (Toán, Văn). Thời gian có hạn.',
          choices: [
            {
              id: 'c5_good',
              title: 'Chiến lược thông minh: Chấp nhận điểm 8 môn phụ để dồn 80% sức cho môn chính',
              description: 'Buông bỏ chủ nghĩa hoàn hảo cứng nhắc để đạt hiệu quả tổng thể.',
              energy_delta: -15,
              stress_delta: -10,
              endurance_score: +25,
              feedback: 'Chiến lược xuất sắc! Người có AQ cao biết tối ưu hóa nguồn lực có hạn.'
            },
            {
              id: 'c5_bad',
              title: 'Cố học thuộc lòng từng chữ của cả 4 môn để giành điểm 10 tuyệt đối',
              description: 'Chủ nghĩa cầu toàn mù quáng khiến bản thân ngập chìm trong áp lực.',
              energy_delta: -45,
              stress_delta: +40,
              endurance_score: -15,
              feedback: 'Cầu toàn cực đoan là kẻ thù số 1 của sức bền học đường.'
            }
          ]
        },
        {
          day_number: 6,
          day_name: 'Thứ Bảy',
          scenario_event: 'Bạn bè rủ nhau đi uống trà sữa 1 tiếng cuối tuần để xả hơi. Bạn cũng rất thèm nhưng lo lắng.',
          choices: [
            {
              id: 'c6_good',
              title: 'Đi uống trà sữa đúng 1 tiếng với bạn bè rồi về tiếp tục ôn tập',
              description: 'Tận hưởng niềm vui nhỏ lành mạnh để nạp lại tinh thần.',
              energy_delta: +15,
              stress_delta: -20,
              endurance_score: +15,
              feedback: 'Cân bằng tuyệt vời! Kết nối xã hội kích thích dopamine tích cực cho tuần mới.'
            },
            {
              id: 'c6_neutral',
              title: 'Đi chơi la cà suốt từ chiều tới đêm, bỏ bê hết bài tập',
              description: 'Chơi bù quá đà khiến ngày hôm sau ngập ngụa trong hoảng sợ.',
              energy_delta: -25,
              stress_delta: +20,
              endurance_score: -10,
              feedback: 'Mất kiểm soát vui chơi sẽ tạo ra cú sốc áp lực vào ngày thi.'
            }
          ]
        },
        {
          day_number: 7,
          day_name: 'Chủ Nhật',
          scenario_event: 'Ngày cuối cùng trước tuần thi quyết định. Không khí căng thẳng bao trùm.',
          choices: [
            {
              id: 'c7_good',
              title: 'Rà soát nhẹ sơ đồ tư duy, chuẩn bị dụng cụ thi và đi ngủ sớm lúc 22h',
              description: 'Chuẩn bị tâm thế tĩnh lặng và cơ thể khỏe mạnh nhất cho ngày mai.',
              energy_delta: +25,
              stress_delta: -25,
              endurance_score: +30,
              feedback: 'Bạn đã về đích ngoạn mục! Giấc ngủ ngon đêm nay là vũ khí lợi hại nhất cho bài thi sáng mai.'
            },
            {
              id: 'c7_bad',
              title: 'Hoảng sợ cày đề xuyên đêm đến 4h sáng',
              description: 'Cố nhét thêm vài trang tài liệu trong cơn hoảng loạn.',
              energy_delta: -50,
              stress_delta: +50,
              endurance_score: -25,
              feedback: 'Cú ngã chí mạng! Thức trắng đêm trước ngày thi sẽ gây hiện tượng trắng não khi nhận đề.'
            }
          ]
        }
      ]
    }
  }
];

export function getScenarioById(id: string): Scenario | undefined {
  return INJECTED_SCENARIOS.find((s) => s.id === id);
}
