import { Scenario, CoreDimension } from '@/types';

export const INJECTED_SCENARIOS: Scenario[] = [
  // ==========================================
  // 1. C - CONTROL (Khả năng kiểm soát nghịch cảnh)
  // ==========================================
  {
    id: 'control-zalo-panic',
    game_number: 1,
    type: 'chat',
    core_focus: 'C',
    title: 'The 9 PM Sunday Zalo Panic',
    grade_level: 'Lớp 7 - 8',
    path: '/scenarios/control-zalo-panic',
    description: '9h tối Chủ nhật, cô môn KHTN vừa nhắn đổi chủ đề làm mô hình sáng mai. Cả nhóm chat nổ tung trong hoảng loạn. Hãy làm chủ tình huống!',
    thumbnail_icon: 'MessageSquareWarning',
    content_json: {
      trigger: '9:00 PM on Sunday. The class Zalo group chat explodes. The Group Leader texts: "Chết rồi, cô môn KHTN vừa nhắn đổi chủ đề làm mô hình ngày mai. Không làm tế bào nữa mà làm hệ hô hấp."',
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
          text: 'Trời ơi cứu mình với các bạn ơi!! 😭😭 Cô KHTN vừa nhắn trên Zalo đổi đề tài mô hình sáng mai sang HỆ HÔ HẤP rồi!! Mô hình tế bào mình với các bạn dán xốp xong hết rồi mà!',
          timestamp: '21:01',
          is_user: false
        },
        {
          id: 'm2',
          sender: 'linh_chi',
          sender_name: 'Linh Chi',
          text: 'Cái gì??? 9h tối Chủ Nhật cô mới nhắn đổi??? Giờ này tiệm tạp hóa đóng cửa sạch rồi lấy đâu ra đồ mà làm? Thôi mình dẹp, mai lên xin cô cho 0 điểm luôn đi, làm sao mà kịp được!',
          timestamp: '21:02',
          is_user: false
        },
        {
          id: 'm3',
          sender: 'minh_khang',
          sender_name: 'Minh Khang',
          text: 'Không được đâu Chi ơi, điểm hệ số 2 đó!! Mai mà bị 0 điểm mẹ mình cắt tiền tiêu vặt với tịch thu điện thoại luôn á 😭 Hay là thức trắng đêm nay nặn đất sét đi, mình sợ quá!',
          timestamp: '21:03',
          is_user: false
        }
      ]
    }
  },
  {
    id: 'control-forgotten-usb',
    game_number: 2,
    type: 'matrix',
    core_focus: 'C',
    title: 'The Forgotten USB (Chiếc USB Bị Bỏ Quên)',
    grade_level: 'Lớp 6 - 7',
    path: '/scenarios/control-forgotten-usb',
    description: '15 phút trước giờ thuyết trình KHTN, bạn nhận ra chiếc USB chứa bài làm của cả tổ để quên ở nhà. Hãy dùng Ma trận Eisenhower phân loại hành động kiểm soát tình thế!',
    thumbnail_icon: 'Grid',
    content_json: {
      trigger: 'Tiết 1 là giờ thuyết trình môn KHTN. Bạn lục cặp và nhận ra đã để quên USB chứa slide ở bàn học ở nhà. Gọi cho mẹ nhưng mẹ đang bận họp không nghe máy.',
      context: 'Bạn là người giữ file duy nhất. Cả tổ 4 người đang nhìn bạn với ánh mắt bàng hoàng.',
      items: [
        {
          id: 'usb-1',
          text: 'Trực tiếp xin phép cô giáo cho tổ mình thuyết trình vào cuối tiết để có thời gian chuẩn bị phương án dự phòng',
          correctQuadrant: 'do_now',
          explanation: 'Làm ngay: Giúp nhóm có thêm 35-40 phút quý giá thay vì chịu trận ở đầu tiết.'
        },
        {
          id: 'usb-2',
          text: 'Nhờ bạn cùng tổ đăng nhập vào Google Drive hoặc Zalo kiểm tra xem có bản nháp nào từng gửi không',
          correctQuadrant: 'delegate',
          explanation: 'Nhờ trợ giúp: Chia việc cho thành viên để tận dụng tối đa nhân lực của nhóm.'
        },
        {
          id: 'usb-3',
          text: 'Cùng nhóm phác thảo nhanh 4 ý chính ra giấy A4 để chuẩn bị thuyết trình chay kèm vẽ bảng',
          correctQuadrant: 'do_now',
          explanation: 'Làm ngay: Luôn có phương án dự phòng không phụ thuộc vào công nghệ.'
        },
        {
          id: 'usb-4',
          text: 'Nhắn tin dặn mẹ sau khi tan họp thì chụp lại các trang ghi chú trên bàn gửi qua Zalo',
          correctQuadrant: 'defer',
          explanation: 'Lên lịch: Đây là việc phụ trợ, không thể chờ mẹ phản hồi ngay lúc này.'
        },
        {
          id: 'usb-5',
          text: 'Đổ lỗi cho mẹ vì sáng nay không nhắc mình cho USB vào balo',
          correctQuadrant: 'drop',
          explanation: 'Loại bỏ ngay: Tư duy đổ lỗi làm mất thời gian và phá vỡ tâm lý của bản thân.'
        },
        {
          id: 'usb-6',
          text: 'Ngồi cắn móng tay dằn vặt và khóc nấc trước mặt cả lớp',
          correctQuadrant: 'drop',
          explanation: 'Loại bỏ ngay: Hoảng sợ tê liệt chỉ gieo rắc sự tuyệt vọng cho đồng đội.'
        }
      ]
    }
  },
  {
    id: 'control-toxic-rumor',
    game_number: 3,
    type: 'chat',
    core_focus: 'C',
    title: 'The Toxic Rumor (Tin Đồn Thất Thiệt)',
    grade_level: 'Lớp 8 - 9',
    path: '/scenarios/control-toxic-rumor',
    description: 'Một bài viết ẩn danh trên Confession trường nói xấu bạn gian lận thi cử. Hãy nhắn tin 1-1 với người tung tin để kiểm soát khủng hoảng bằng sự điềm tĩnh và chứng cứ!',
    thumbnail_icon: 'MessageCircle',
    content_json: {
      trigger: 'Trang Confession của trường xuất hiện bài viết tố cáo bạn đạt 10 điểm Toán là do "chép tài liệu tinh vi". Bạn biết rõ Minh Tuấn là người đứng sau bài viết này.',
      context: 'Bạn cần hạ nhiệt tin đồn mà không dùng lời lẽ chửi bới hay đe dọa bạo lực học đường.',
      npcs: [
        {
          id: 'minh_tuan',
          name: 'Minh Tuấn',
          role: 'Bạn học cùng khối',
          avatar: '📱',
          personality: 'Ganh tị với điểm số của bạn, đang nói chuyện với giọng điệu thách thức.'
        }
      ],
      initial_messages: [
        {
          id: 'tr-1',
          sender: 'minh_tuan',
          sender_name: 'Minh Tuấn',
          text: 'Ủa thấy bài trên Confession chưa bạn? 10 điểm Toán mà làm trong 20 phút thì ai tin được là tự lực cánh sinh? Cả trường đang bàn tán kia kìa! 😏',
          timestamp: '16:45',
          is_user: false
        }
      ]
    }
  },

  // ==========================================
  // 2. O - OWNERSHIP (Sự tự chịu trách nhiệm)
  // ==========================================
  {
    id: 'ownership-homeroom-period',
    game_number: 4,
    type: 'chat',
    core_focus: 'O',
    title: 'The Homeroom Period (Giờ Sinh Hoạt Lớp)',
    grade_level: 'Lớp 8 - 9',
    path: '/scenarios/ownership-homeroom',
    description: 'Tiết sinh hoạt thứ Sáu giông bão. Tổ của bạn làm lớp mất điểm thi đua tuần vì có bạn ăn vụng và xả rác bị Giám thị bắt. Bạn là Tổ trưởng.',
    thumbnail_icon: 'ShieldAlert',
    content_json: {
      trigger: 'Tiết sinh hoạt cuối tuần. Cô chủ nhiệm tức giận vì lớp đứng bét toàn trường do Tổ 3 bị trừ 10 điểm thi đua vì xả rác. Bạn là Tổ trưởng Tổ 3.',
      context: 'Bạn là Tổ trưởng Tổ 3. Bạn Nam trong tổ bị Thầy Giám thị bắt quả tang ăn quà vặt và nhét rác vào hộc bàn.',
      npcs: [
        {
          id: 'co_mai',
          name: 'Cô Mai (GVCN)',
          role: 'Cô Chủ Nhiệm nghiêm khắc',
          avatar: '👩🏻‍🏫',
          personality: 'Nghiêm nghị, công bằng, coi trọng tinh thần chịu trách nhiệm của người đứng đầu.'
        },
        {
          id: 'nam_le',
          name: 'Nam',
          role: 'Thành viên vi phạm',
          avatar: '👦🏽',
          personality: 'Đang cúi gằm mặt run rẩy vì sợ bị hạ hạnh kiểm.'
        }
      ],
      initial_messages: [
        {
          id: 'm1',
          sender: 'co_mai',
          sender_name: 'Cô Mai (GVCN)',
          text: 'Cả lớp trật tự! Cô không thể tin được là tuần này lớp 8A chúng ta đứng bét toàn khối vì bị trừ 10 điểm thi đua! Thầy Giám thị báo lại: Giờ truy bài, Tổ 3 có học sinh ngang nhiên ăn quà vặt rồi nhét rác vào hộc bàn! Tổ trưởng Tổ 3 đâu, em đứng lên trả lời cho cô và cả lớp biết chuyện này là như thế nào?!',
          timestamp: '15:30',
          is_user: false
        },
        {
          id: 'm2',
          sender: 'nam_le',
          sender_name: 'Nam (Thành viên vi phạm)',
          text: '(Cúi gằm mặt xuống bàn, hai tay run bần bật, lí nhí): "Tổ trưởng ơi mình xin lỗi... mình không nghĩ bị thầy Giám thị ghi vào sổ..."',
          timestamp: '15:31',
          is_user: false
        }
      ]
    }
  },
  {
    id: 'ownership-deleted-slides',
    game_number: 5,
    type: 'chat',
    core_focus: 'O',
    title: 'The Deleted Slides (File Thuyết Trình Bị Xoá)',
    grade_level: 'Lớp 7 - 9',
    path: '/scenarios/ownership-deleted-slides',
    description: '22h đêm, bạn vô tình ấn nhầm xoá vĩnh viễn file slide Canva thuyết trình của cả nhóm cho sáng mai. Hãy dũng cảm nhận lỗi thật thà và đề xuất giải pháp cứu nguy!',
    thumbnail_icon: 'FileX',
    content_json: {
      trigger: '22h00 Chủ Nhật. Khi đang dọn dẹp các bản sao trên Canva, bạn lỡ tay xóa nhầm file chính của bài thuyết trình Lịch Sử sáng mai.',
      context: 'Cả nhóm 4 người đã làm việc suốt tuần qua. Bạn là người được giao trách nhiệm giữ file.',
      npcs: [
        {
          id: 'ha_my',
          name: 'Hà My',
          role: 'Bạn cùng nhóm',
          avatar: '👧🏻',
          personality: 'Đang mở link kiểm tra lần cuối thì thấy báo lỗi, hoang mang tột độ.'
        },
        {
          id: 'duc_anh',
          name: 'Đức Anh',
          role: 'Bạn cùng nhóm',
          avatar: '👦🏻',
          personality: 'Dễ nổi nóng, rất lo sợ bài kiểm tra sáng mai.'
        }
      ],
      initial_messages: [
        {
          id: 'ds-1',
          sender: 'ha_my',
          sender_name: 'Hà My',
          text: 'Ủa mọi người ơi sao link Canva bài Sử sáng mai mình ấn vào nó báo "Tệp không tồn tại trong Thùng rác" vậy? 😱 Có ai vào nhầm không?',
          timestamp: '22:05',
          is_user: false
        },
        {
          id: 'ds-2',
          sender: 'duc_anh',
          sender_name: 'Đức Anh',
          text: 'Cái gì??? Mai tiết 2 nộp rồi đó!! Cả tuần nay cày bục mặt giờ bảo mất file là sao? Ai đang giữ quyền chủ sở hữu file vậy?!',
          timestamp: '22:06',
          is_user: false
        }
      ]
    }
  },
  {
    id: 'ownership-broken-beaker',
    game_number: 6,
    type: 'branching',
    core_focus: 'O',
    title: 'The Broken Beaker (Ống Nghiệm Vỡ Phòng Thí Nghiệm)',
    grade_level: 'Lớp 6 - 8',
    path: '/scenarios/ownership-broken-beaker',
    description: 'Trong giờ thực hành Hóa, bạn lỡ tay làm rơi vỡ bình tam giác chuyên dụng đắt tiền. Thầy giáo vừa ra ngoài. Lựa chọn: Thú nhận, Giấu giếm hay Đổ lỗi?',
    thumbnail_icon: 'GitFork',
    content_json: {
      trigger: 'Tiết thực hành Hóa học lớp 8. Khi với tay lấy lọ dung dịch, khuỷu tay bạn va vào bình tam giác định mức khiến nó rơi xuống sàn vỡ tan tành. Thầy giáo vừa bước ra ngoài nghe điện thoại.',
      scenarios_tree: {
        root: {
          prompt: 'Mảnh thủy tinh vỡ văng tung tóe dưới chân bạn. Hai bạn ngồi cùng bàn giật mình nhìn bạn. Bạn sẽ làm gì ngay bây giờ?',
          choices: [
            {
              id: 'opt_confess',
              text: '🛡️ Đứng nghiêm túc chờ thầy vào, chủ động thú nhận mình làm vỡ và xin phép dọn dẹp an toàn',
              next_id: 'node_confess',
              score_delta: { o: 25, c: 15 },
              mindset: 'Climber (High Ownership)'
            },
            {
              id: 'opt_hide',
              text: '🙈 Nhanh tay dùng chổi quét mảnh vỡ giấu vào đáy sọt rác rồi vờ như không có chuyện gì',
              next_id: 'node_hide',
              score_delta: { o: -20, c: -10 },
              mindset: 'Quitter (Low Ownership)'
            },
            {
              id: 'opt_blame',
              text: '🗣️ Nói với bạn bên cạnh: "Tại cậu để bình sát mép bàn quá nên tớ mới quệt phải!"',
              next_id: 'node_blame',
              score_delta: { o: -30, c: -15 },
              mindset: 'Quitter (Deflecting Blame)'
            }
          ]
        },
        node_confess: {
          outcome: 'Thầy giáo quay lại, nhìn đống vỡ rồi nhìn bạn. Thầy khen bạn có tính trung thực và trách nhiệm cao, hướng dẫn bạn dùng găng tay dọn dẹp cẩn thận để không ai bị đứt tay. Lớp học dành cho bạn một tràng pháo tay nể phục.'
        },
        node_hide: {
          outcome: 'Cuối tiết, thầy kiểm kê dụng cụ thấy thiếu bình định mức. Thầy xem lại camera an ninh góc phòng và mời bạn lên phòng giám thị viết bản kiểm điểm vì hành vi thiếu trung thực.'
        },
        node_blame: {
          outcome: 'Bạn bên cạnh òa khóc vì bị oan, cả nhóm cãi vã ầm ĩ. Thầy giáo bước vào phạt cả bàn đứng góc lớp trừ điểm chuyên cần vì tinh thần đồng đội tồi tệ.'
        }
      }
    }
  },

  // ==========================================
  // 3. R - REACH (Phạm vi ảnh hưởng)
  // ==========================================
  {
    id: 'reach-math-test-disaster',
    game_number: 7,
    type: 'swipe',
    core_focus: 'R',
    title: 'The 45-Minute Math Test Disaster (Bài kiểm tra 4 điểm)',
    grade_level: 'Lớp 7 - 9',
    path: '/scenarios/reach-math-test',
    description: 'Nhận bài kiểm tra 1 tiết Toán 4 điểm đỏ chót. Vuốt Trái để LOẠI BỎ suy nghĩ tiêu cực lan tỏa, Vuốt Phải để GIỮ LẠI suy nghĩ cô lập vấn đề!',
    thumbnail_icon: 'Layers',
    content_json: {
      trigger: 'Bạn nhận bài kiểm tra 1 tiết Đại số: 4/10 điểm. Lời phê màu đỏ: "Cần cố gắng nhiều hơn!". Cảm giác hoang mang bủa vây.',
      cards: [
        {
          id: 'r-1',
          thought: 'Mẹ sẽ giết mình mất, về nhà thế nào cũng bị mẹ mắng té tát và tịch thu điện thoại cả tháng!',
          correct_action: 'left',
          explanation: 'Low AQ (Thổi phồng thảm họa): Não bạn đang phóng đại sự trừng phạt thay vì tìm cách đối thoại xây dựng.',
          aq_tag: 'Low AQ - Phóng đại quy mô'
        },
        {
          id: 'r-2',
          thought: 'Chỉ là một bài 1 tiết, mình vẫn còn bài thi Học kì hệ số 3 và các bài 15 phút để gỡ điểm trung bình.',
          correct_action: 'right',
          explanation: 'High AQ (Khoanh vùng ảnh hưởng): Điểm 4 này chỉ là một biến cố nhỏ, không quyết định toàn bộ học kỳ.',
          aq_tag: 'High AQ - Giới hạn phạm vi thất bại'
        },
        {
          id: 'r-3',
          thought: 'Mình dốt Toán bẩm sinh rồi, điểm 4 này chứng minh mình sẽ không bao giờ đỗ được cấp 3 công lập.',
          correct_action: 'left',
          explanation: 'Low AQ (Lan tỏa sang tương lai): Đánh đồng một bài làm sai với toàn bộ năng lực trí tuệ cả đời.',
          aq_tag: 'Low AQ - Lan tỏa sang tương lai'
        },
        {
          id: 'r-4',
          thought: 'Môn Văn và Anh mình tuần này vẫn đang 9 điểm, mình không hề mất gốc hay kém cỏi toàn diện.',
          correct_action: 'right',
          explanation: 'High AQ (Bảo toàn lòng tự trọng): Nhìn nhận các vùng an toàn khác để giữ vững niềm tin vào bản thân.',
          aq_tag: 'High AQ - Bảo tồn năng lực'
        },
        {
          id: 'r-5',
          thought: 'Cả lớp chắc chắn đang nhìn mình cười thầm và coi thường mình vì điểm kém.',
          correct_action: 'left',
          explanation: 'Low AQ (Ảo tưởng bị phán xét): Các bạn đều đang bận rộn với áp lực của chính họ. Đừng suy diễn quá mức.',
          aq_tag: 'Low AQ - Lan tỏa sang quan hệ xã hội'
        },
        {
          id: 'r-6',
          thought: 'Tối nay phải nói thật với mẹ để xin đi học kèm phần hình học và phương trình mình chưa hiểu.',
          correct_action: 'right',
          explanation: 'High AQ (Hành động giải pháp): Biến biến cố thành đề xuất cụ thể để nhận được sự hỗ trợ.',
          aq_tag: 'High AQ - Biến vấn đề thành giải pháp'
        }
      ]
    }
  },
  {
    id: 'reach-rejected-audition',
    game_number: 8,
    type: 'swipe',
    core_focus: 'R',
    title: 'The Rejected Audition (Trượt Tuyển Văn Nghệ 20/11)',
    grade_level: 'Lớp 6 - 8',
    path: '/scenarios/reach-rejected-audition',
    description: 'Tập luyện 2 tuần nhưng bạn bị trượt buổi tuyển chọn tiết mục văn nghệ 20/11 của trường. Vuốt Trái suy nghĩ dán nhãn tiêu cực, Vuốt Phải suy nghĩ thực tế khách quan!',
    thumbnail_icon: 'MicOff',
    content_json: {
      trigger: 'Danh sách tiết mục biểu diễn 20/11 được dán lên bảng tin. Tên của bạn không có trong danh sách trúng tuyển.',
      cards: [
        {
          id: 'aud-1',
          thought: 'Giọng hát của mình tệ hại kinh khủng, từ nay về sau mình sẽ không bao giờ hát trước mặt ai nữa.',
          correct_action: 'left',
          explanation: 'Low AQ: Lan tỏa một lần từ chối thành sự tự ti vĩnh viễn về khả năng ca hát.',
          aq_tag: 'Low AQ - Phóng đại thất bại'
        },
        {
          id: 'aud-2',
          thought: 'Thầy cô chọn tiết mục múa tập thể vì năm nay chủ đề là đồng diễn, không phải do giọng mình dở.',
          correct_action: 'right',
          explanation: 'High AQ: Phân tích nguyên nhân khách quan thay vì tự dằn vặt bản thân.',
          aq_tag: 'High AQ - Khách quan hóa nguyên nhân'
        },
        {
          id: 'aud-3',
          thought: 'Các bạn trong lớp sẽ nghĩ mình là kẻ ảo tưởng, chẳng ra gì mà cũng bày đặt đi thi.',
          correct_action: 'left',
          explanation: 'Low AQ: Tự gán cho người khác ý nghĩ tiêu cực về mình.',
          aq_tag: 'Low AQ - Ảo tưởng bị coi thường'
        },
        {
          id: 'aud-4',
          thought: 'Dù không biểu diễn trên sân khấu, mình vẫn có thể tham gia đội hậu cần hỗ trợ âm thanh ánh sáng cho lớp.',
          correct_action: 'right',
          explanation: 'High AQ: Tìm kiếm vai trò đóng góp khác để tiếp tục đồng hành cùng tập thể.',
          aq_tag: 'High AQ - Mở rộng cơ hội mới'
        }
      ]
    }
  },
  {
    id: 'reach-bestie-feud',
    game_number: 9,
    type: 'trash_sort',
    core_focus: 'R',
    title: 'The Bestie Feud (Chiến Tranh Lạnh Với Bạn Thân)',
    grade_level: 'Lớp 8 - 9',
    path: '/scenarios/reach-bestie-feud',
    description: 'Cãi nhau to với bạn thân vào chiều thứ Năm, trong khi sáng thứ Sáu thi 2 môn Học kì quyết định. Kéo thả suy nghĩ: Thùng Rác (Gác lại sau thi) vs Bàn Học (Ôn tập ngay)!',
    thumbnail_icon: 'Trash2',
    content_json: {
      trigger: 'Chiều thứ Năm, bạn và đứa bạn thân nhất cãi nhau nảy lửa và chặn tin nhắn nhau. Sáng mai là bài thi Học kì 2 môn Toán và Ngữ Văn.',
      items: [
        {
          id: 'bf-1',
          text: 'Ngồi lướt lại tin nhắn cũ xem đứa nào sai trước',
          target_bin: 'trash',
          reason: 'Vứt vào thùng rác: Việc này tiêu tốn 3-4 tiếng ban đêm mà không giải quyết được gì trước kỳ thi.'
        },
        {
          id: 'bf-2',
          text: 'Mở đề cương Toán làm lại 5 dạng bài phương trình bậc hai trọng tâm',
          target_bin: 'desk',
          reason: 'Đặt lên bàn học: Đây là ưu tiên số 1 quyết định điểm số cả năm học.'
        },
        {
          id: 'bf-3',
          text: 'Đoán xem ngày mai bạn ấy có mang chuyện này đi nói xấu với cả lớp không',
          target_bin: 'trash',
          reason: 'Vứt vào thùng rác: Nỗi sợ hão huyền làm bạn mất ngủ và cạn kiệt trí nhớ.'
        },
        {
          id: 'bf-4',
          text: 'Tự hứa với bản thân: 11h trưa mai sau khi thi xong sẽ hẹn bạn ra căng tin nói chuyện thẳng thắn',
          target_bin: 'desk',
          reason: 'Đặt lên bàn học: Khoanh vùng thời gian rõ ràng giúp não bộ an tâm tập trung ôn thi.'
        }
      ]
    }
  },

  // ==========================================
  // 4. E - ENDURANCE (Sức bền bỉ đường dài)
  // ==========================================
  {
    id: 'endurance-may-exam-crush',
    game_number: 10,
    type: 'resource',
    core_focus: 'E',
    title: 'The May Exam Crush (Cơn lốc mùa thi tháng Năm)',
    grade_level: 'Lớp 8 - 9',
    path: '/scenarios/endurance-exam-crush',
    description: 'Tháng 5. Còn 2 tuần nữa thi Học kì 2. 8 cuốn đề cương dày cộm và 5 ca học thêm/tuần. Hãy quản lý Năng lượng & Căng thẳng sống sót qua 7 ngày!',
    thumbnail_icon: 'BatteryCharging',
    content_json: {
      trigger: 'Mùa thi tháng Năm đầy áp lực. Hãy giữ vững năng lượng và không để bản thân bị kiệt sức (burnout) trước ngày thi!',
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
  },
  {
    id: 'endurance-sprained-ankle',
    game_number: 11,
    type: 'resource',
    core_focus: 'E',
    title: 'The Sprained Ankle (Chấn Thương Trước Giải Đấu)',
    grade_level: 'Lớp 6 - 8',
    path: '/scenarios/endurance-sprained-ankle',
    description: 'Trật khớp cổ chân phải bó bột 4 tuần, bỏ lỡ giải vô địch bóng đá khối 8 cả năm chờ đợi. Quản lý Tinh thần (Spirit) & Kiên nhẫn (Patience) suốt 4 tuần dưỡng thương!',
    thumbnail_icon: 'Activity',
    content_json: {
      trigger: 'Chấn thương thể thao bất ngờ ngay trước thềm giải đấu. Bạn phải chấp nhận ngồi ngoài và kiên nhẫn điều trị phục hồi chức năng.',
      days: [
        {
          day_number: 1,
          day_name: 'Tuần 1 - Cú sốc ban đầu',
          scenario_event: 'Bác sĩ thông báo bạn phải bó bột cố định 4 tuần, đồng nghĩa với việc lỡ hẹn hoàn toàn giải đấu bóng đá.',
          choices: [
            {
              id: 'sa_1_good',
              title: 'Chấp nhận thực tế, nhận làm Cố vấn chiến thuật và tiếp nước cho đội bóng lớp',
              description: 'Chuyển hóa năng lượng tiêu cực thành sự hỗ trợ tích cực cho đồng đội.',
              energy_delta: +10,
              stress_delta: -15,
              endurance_score: +25,
              feedback: 'Tuyệt vời! Người có AQ cao luôn tìm được cách đóng góp giá trị ngay cả khi bị giới hạn thể chất.'
            },
            {
              id: 'sa_1_bad',
              title: 'Tự nhốt mình trong phòng, không thèm đến xem đội tập và trách số phận đen đủi',
              description: 'Buông xuôi và cắt đứt liên lạc với bạn bè.',
              energy_delta: -30,
              stress_delta: +30,
              endurance_score: -20,
              feedback: 'Bẫy nạn nhân (Victim mindset) chỉ khiến thời gian hồi phục trôi qua trong u uất.'
            }
          ]
        },
        {
          day_number: 2,
          day_name: 'Tuần 2 - Kiên trì tập vật lý trị liệu',
          scenario_event: 'Các bài tập co duỗi ngón chân gây đau nhức khó chịu. Bạn rất muốn tháo nẹp ra đi lại.',
          choices: [
            {
              id: 'sa_2_good',
              title: 'Tuân thủ đúng chỉ định 15 phút tập mỗi sáng và chườm đá đều đặn',
              description: 'Kiên trì từng bước nhỏ để dây chằng phục hồi hoàn hảo.',
              energy_delta: +15,
              stress_delta: -10,
              endurance_score: +20,
              feedback: 'Kỷ luật tự giác chính là biểu hiện cao nhất của sức bền (Endurance).'
            },
            {
              id: 'sa_2_bad',
              title: 'Bỏ tập vì đau, cố tình đi cà nhắc chạy nhảy khiến chân sưng to hơn',
              description: 'Hấp tấp thiếu kiên nhẫn dẫn đến nguy cơ chấn thương mãn tính.',
              energy_delta: -40,
              stress_delta: +35,
              endurance_score: -15,
              feedback: 'Thiếu kiên nhẫn với cơ thể là sai lầm phổ biến làm kéo dài tổn thương.'
            }
          ]
        },
        {
          day_number: 3,
          day_name: 'Tuần 3 - Trận Bán kết nghẹt thở',
          scenario_event: 'Đội lớp bạn bước vào trận bán kết. Trên khán đài, nhìn đồng đội thi đấu bạn cảm thấy ngứa ngáy chân tay.',
          choices: [
            {
              id: 'sa_3_good',
              title: 'Đeo băng rôn, cùng các bạn cổ vũ hết mình và hò hét tiếp lửa từ băng ghế dự bị',
              description: 'Hòa mình vào niềm vui tập thể.',
              energy_delta: +20,
              stress_delta: -20,
              endurance_score: +20,
              feedback: 'Tinh thần thể thao chân chính! Bạn vẫn là một phần không thể thiếu của đội bóng.'
            },
            {
              id: 'sa_3_bad',
              title: 'Cảm thấy ghen tị vì bạn thay thế vị trí của mình ghi bàn, mặt mày ủ rũ',
              description: 'Để lòng đố kỵ chiếm chỗ của tình bạn.',
              energy_delta: -20,
              stress_delta: +25,
              endurance_score: -10,
              feedback: 'Ghen tị làm hao mòn sức mạnh nội tâm của chính bạn.'
            }
          ]
        },
        {
          day_number: 4,
          day_name: 'Tuần 4 - Tháo bột và tái xuất',
          scenario_event: 'Bác sĩ tháo bột, khớp chân đã lành lặn nhưng cơ bắp còn hơi yếu.',
          choices: [
            {
              id: 'sa_4_good',
              title: 'Tập đi bộ nhẹ nhàng, bơi lội phục hồi và đặt mục tiêu cho giải mùa sau',
              description: 'Tái hòa nhập thông minh và có lộ trình bền vững.',
              energy_delta: +30,
              stress_delta: -25,
              endurance_score: +30,
              feedback: 'Bạn đã chiến thắng thử thách Endurance một cách ngoạn mục!'
            },
            {
              id: 'sa_4_bad',
              title: 'Vừa tháo bột đã xỏ giày đá bóng trận chung kết với 100% sức',
              description: 'Đánh cược sức khỏe liều lĩnh.',
              energy_delta: -50,
              stress_delta: +40,
              endurance_score: -20,
              feedback: 'Liều lĩnh không phải là bền bỉ, đó là thiếu hiểu biết về giới hạn cơ thể.'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'endurance-new-kid-isolation',
    game_number: 12,
    type: 'calendar',
    core_focus: 'E',
    title: 'The New Kid Isolation (Học Sinh Mới Chuyển Trường)',
    grade_level: 'Lớp 6 - 9',
    path: '/scenarios/endurance-new-kid-isolation',
    description: 'Chuyển trường mới, tuần đầu giờ ra chơi không có ai nói chuyện cùng. Chọn các micro-actions kiên trì qua 4 tuần để từng bước hòa nhập lớp học mới!',
    thumbnail_icon: 'UserPlus',
    content_json: {
      trigger: 'Bạn vừa chuyển từ một ngôi trường khác tới lớp 7A. Không gian xa lạ, các nhóm bạn đã chơi thân với nhau từ lớp 6, bạn cảm thấy mình như người vô hình.',
      weeks: [
        {
          week_number: 1,
          theme: 'Tuần 1: Nụ cười & Lời chào mở đầu',
          situation: 'Giờ ra chơi 20 phút, mọi người xúm lại nói chuyện về game và thần tượng, bạn ngồi trơ trọi ở bàn cuối.',
          action_choices: [
            {
              id: 'w1_a',
              text: 'Chủ động quay sang bạn cùng bàn mỉm cười và hỏi mượn thời khóa biểu các môn buổi chiều',
              score: +20,
              feedback: 'Hành động vi mô (Micro-action) xuất sắc! Một câu hỏi nhờ giúp đỡ nhỏ là chiếc cầu nối xã hội tự nhiên nhất.'
            },
            {
              id: 'w1_b',
              text: 'Úp mặt xuống bàn vờ ngủ suốt 20 phút để đỡ cảm giác ngại ngùng',
              score: -10,
              feedback: 'Thu mình lại phát ra tín hiệu "không muốn tiếp xúc", khiến mọi người càng ngại đến gần bạn.'
            }
          ]
        },
        {
          week_number: 2,
          theme: 'Tuần 2: Tìm điểm chung',
          situation: 'Lớp tổ chức đăng ký các câu lạc bộ ngoại khóa: Bóng rổ, Mỹ thuật, Đọc sách.',
          action_choices: [
            {
              id: 'w2_a',
              text: 'Mạnh dạn ghi tên vào CLB mình thích để có cơ hội sinh hoạt nhóm cùng các bạn có chung sở thích',
              score: +25,
              feedback: 'Chính xác! Hoạt động ngoại khóa là môi trường gắn kết tình bạn nhanh gấp 5 lần lớp học văn hóa.'
            },
            {
              id: 'w2_b',
              text: 'Không đăng ký vì sợ mình lạ lẫm, tan học là đi thẳng về nhà',
              score: -10,
              feedback: 'Bỏ lỡ cơ hội vàng để phá vỡ lớp vỏ cô lập.'
            }
          ]
        },
        {
          week_number: 3,
          theme: 'Tuần 3: Chia sẻ & Đóng góp',
          situation: 'Tổ được phân công chuẩn bị tập san ngày 20/11, đang thiếu người vẽ bìa trang trí.',
          action_choices: [
            {
              id: 'w3_a',
              text: 'Chủ động giơ tay: "Tớ có thể vẽ hoa văn trang trí viền cho bài viết của tổ mình nhé!"',
              score: +25,
              feedback: 'Tuyệt vời! Sẵn sàng đóng góp tài lẻ giúp tập thể nhận ra giá trị của bạn.'
            },
            {
              id: 'w3_b',
              text: 'Im lặng không nói gì dù mình vẽ rất đẹp, chờ ai đó phải nài nỉ',
              score: -5,
              feedback: 'Sự thụ động làm chậm quá trình hòa nhập.'
            }
          ]
        },
        {
          week_number: 4,
          theme: 'Tuần 4: Lời rủ chân thành',
          situation: 'Tan học chiều thứ Sáu, cả nhóm rủ nhau ra quán nước mía cổng trường.',
          action_choices: [
            {
              id: 'w4_a',
              text: 'Vui vẻ đi cùng các bạn: "Cho tớ đi chung với nhé, tớ cũng đang khát nước!"',
              score: +30,
              feedback: 'Thành công rực rỡ! Bạn đã vượt qua 4 tuần cô lập bằng lòng kiên trì và thái độ cởi mở ấm áp.'
            },
            {
              id: 'w4_b',
              text: 'Từ chối vì nghĩ mình chưa đủ thân thiết với họ',
              score: -15,
              feedback: 'Tự dựng lên rào cản ngăn chặn sự kết nối.'
            }
          ]
        }
      ]
    }
  }
];

export interface CoreSectionMeta {
  code: CoreDimension;
  name: string;
  nameVi: string;
  badgeColor: string;
  badgeBg: string;
  borderColor: string;
  gradient: string;
  taglineVi: string;
  descriptionVi: string;
}

export const CORE_SECTIONS: Record<CoreDimension, CoreSectionMeta> = {
  C: {
    code: 'C',
    name: 'Control',
    nameVi: 'Khả Năng Kiểm Soát',
    badgeColor: 'text-blue-700',
    badgeBg: 'bg-blue-100',
    borderColor: 'border-blue-200',
    gradient: 'from-blue-600 to-indigo-600',
    taglineVi: 'Tập trung vào điều bạn CÓ THỂ kiểm soát',
    descriptionVi: 'Rèn luyện tâm thế bình tĩnh, không hoảng loạn hay đổ lỗi, chủ động đưa ra giải pháp thực tế khi khủng hoảng xảy ra.'
  },
  O: {
    code: 'O',
    name: 'Ownership',
    nameVi: 'Sự Tự Chịu Trách Nhiệm',
    badgeColor: 'text-purple-700',
    badgeBg: 'bg-purple-100',
    borderColor: 'border-purple-200',
    gradient: 'from-purple-600 to-indigo-700',
    taglineVi: 'Trách nhiệm của người dẫn dắt',
    descriptionVi: 'Dũng cảm nhận lỗi về phần mình, không đùn đẩy cho người khác và lập tức hành động khắc phục hậu quả.'
  },
  R: {
    code: 'R',
    name: 'Reach',
    nameVi: 'Khoanh Vùng Ảnh Hưởng',
    badgeColor: 'text-amber-700',
    badgeBg: 'bg-amber-100',
    borderColor: 'border-amber-200',
    gradient: 'from-amber-600 to-orange-600',
    taglineVi: 'Cô lập thất bại, không để vết dầu loang',
    descriptionVi: 'Một điểm kém hay một lần vấp ngã chỉ là sự kiện cục bộ, tuyệt đối không đại diện cho toàn bộ tương lai hay nhân cách của bạn.'
  },
  E: {
    code: 'E',
    name: 'Endurance',
    nameVi: 'Sức Bền Bỉ Đường Dài',
    badgeColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100',
    borderColor: 'border-emerald-200',
    gradient: 'from-emerald-600 to-teal-700',
    taglineVi: 'Giữ nhịp sức bền, không kiệt sức',
    descriptionVi: 'Phân bổ năng lượng thông minh, biết nói không với áp lực mù quáng và nuôi dưỡng niềm hy vọng vượt qua nghịch cảnh kéo dài.'
  }
};

export function getScenarioById(id: string): Scenario | undefined {
  return INJECTED_SCENARIOS.find((s) => s.id === id);
}

export function getScenariosByCore(dimension: CoreDimension): Scenario[] {
  return INJECTED_SCENARIOS.filter((s) => s.core_focus === dimension);
}
