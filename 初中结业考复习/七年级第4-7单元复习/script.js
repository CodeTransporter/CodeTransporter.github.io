/* ==========================================================================
   奇妙网络实验室 —— 期末冲刺无敌宝典 核心业务逻辑
   包含：动态注入闯关容器、防蒙题等长选项题库、结业证书生成
   ========================================================================== */

const TOTAL_HP = 5;
let quizState = { hp: TOTAL_HP, score: 0, currentIdx: 0, order: [], history:[] };

// ==========================================
// 1. 35 道魔鬼级期末大满贯题库 (100%覆盖被忽略的细节，选项精确等长)
// ==========================================
const questionBank =[
    // --- 第四单元：网络基础 ---
    { q: "在校园网络系统中，负责连接不同局域网，并实现跨网段数据转发的关键设备是？", options:["连接内外网进行路由选择的路由器设备", "将电信号转换为光信号物理传输的网卡", "为电脑自动分配局域网地址的动态协议", "拦截所有外部黑客发起的攻击的防火墙"], a: 0, exp: "路由器就像十字路口的交警，专门负责指路和转发数据！", p: "P83" },
    { q: "IPv6 地址的出现是为了解决 IPv4 枯竭问题，IPv6 采用多少位二进制数表示？", options:["采用一百二十八位的二进制数海量表示", "采用零三十二位的二进制数最基础表示", "采用零六十四位的十六进制的物理表示", "采用二百五十六位的八进制数加密表示"], a: 0, exp: "IPv4是32位，IPv6是128位，地址多到可以给地球每粒沙子分一个！", p: "P86" },
    { q: "在 TCP/IP 四层架构中，负责将用户的请求（如输入网址）转换为网络识别信息的是？", options:["最贴近用户的处于最顶端的【应用层】", "负责端到端可靠传输保障的【传输层】", "拿着地址查地图规划路径的【网络层】", "负责光电物理信号转换发射【接口层】"], a: 0, exp: "浏览器、微信都是应用层的软件，直接为你服务！", p: "P104" },
    { q: "在网络诊断中，用于追踪数据包从本机到目标服务器沿途经过了哪些节点的命令是？", options:["专门追踪沿途中转路由节点的 tracert", "专门测试网络底层连通状态的 ping ", "专门查看本机所有网络配置 ipconfig", "专门监控本地计算机端口状态 netstat"], a: 0, exp: "tracert = Trace Route（路由追踪），查快递中转站的神器！", p: "P90" },
    { q: "TCP 协议之所以被称为“可靠的传输协议”，主要是因为它具备什么独有的核心机制？", options:["拥有极其严密的数据确认与重传的机制", "拥有极其夸张甚至超越光速的传输速度", "拥有绝对免疫任何电脑病毒的高级护盾", "拥有不需要消耗电脑任何电量的超能力"], a: 0, exp: "TCP就像保价快递，没收到就一直重发，直到确认送达！", p: "P105" },
    
    // --- 第五单元：互联网创新应用 ---
    { q: "在云计算的服务分层架构中，SaaS（软件即服务）指的是什么具体的应用模式？", options:["用户直接通过网页免安装使用的云软件", "提供底层服务器与存储硬件的基础设施", "提供用于编写代码运行程序的开发平台", "专门用于防范网络黑客攻击的安全护盾"], a: 0, exp: "SaaS 就是“去餐厅吃披萨”，什么都不用准备，打开网页直接用（如百度网盘）！", p: "P173" },
    { q: "云计算通过什么核心技术，将一台物理服务器划分为多个相互独立互不干扰的小型服务器？", options:["相互独立且互不干扰的【虚拟化技术】", "海量算力能集中爆发的【量子计算术】", "将大文件分成小块传输的【分块传输】", "识别图像中文字特征的【光学字符术】"], a: 0, exp: "虚拟化技术就是把一套大别墅“打隔断”租给多个人，提高利用率！", p: "P173" },
    { q: "智能会议助手能够自动把会议录音转写成文字，并提炼核心纪要，主要依托了什么技术？", options:["自然语言处理与智能的语音识别的技术", "虚拟现实与增强现实的三维建模的技术", "基于公钥与私钥配合的非对称加密技术", "全球卫星定位与地理信息系统匹配技术"], a: 0, exp: "语音识别（听懂）+ NLP自然语言处理（提炼重点），是会议 AI 的核心！", p: "P122" },
    { q: "“数据驱动的工作决策”是指抛弃主观猜测，转而依靠什么来进行科学的工作安排？", options:["利用大量真实客观的分析数据去做决策", "利用强权的命令和严厉体罚来强制推行", "利用抓阄抽签或者抛掷硬币来决定大局", "完全依靠机器人的自主意识去消灭人类"], a: 0, exp: "用图表、统计等客观数字说话，这就叫数据驱动！", p: "P124" },
    { q: "在电子导航的工作原理中，获取到卫星定位坐标后，下一步必须进行的关键操作是？", options:["利用 GIS 系统进行最精准的地图的匹配", "利用 AI 算法进行极其复杂的路径计算", "利用语音合成进行实时的导航播报语音", "利用红外线扫描前方的车辆以防止追尾"], a: 0, exp: "拿到经纬度后，必须在地图上标出那个蓝点，这就叫地图数据匹配！", p: "P128" },

    // --- 第六单元：安全与防范 ---
    { q: "计算机“木马”程序与传统“病毒”最核心的行为区别在于什么？", options:["木马不会自我复制只会潜伏来盗取数据", "木马只会破坏硬件而绝对不会盗取数据", "木马是免费开放的而病毒则是强制收费", "木马只能存在手机而病毒只会存在电脑"], a: 0, exp: "病毒像丧尸会到处传染，木马像特务只潜伏不开枪，专门偷密码！", p: "P137" },
    { q: "黑客伪装成“国家税务局”发邮件，诱导你点击退税链接填银行卡，这属于什么攻击？", options:["利用人类心理弱点的社会工程学的攻击", "利用系统底层漏洞的缓冲区溢出的攻击", "利用海量肉鸡发起的分布式拒绝的服务", "利用物理电磁设备干扰信号的物理屏蔽"], a: 0, exp: "不靠高深黑客技术，专门骗人，这就叫“社会工程学（钓鱼）”！", p: "P138" },
    { q: "在身份验证的三大核心因子中，指纹、虹膜、人脸等生理特征统称为哪一种因子？", options:["具有人体唯一不可复制的【生物因子】", "属于记忆且只有自己知道【知识因子】", "属于特定设备发送短信的【持有因子】", "属于外部物理环境检测的【重力因子】"], a: 0, exp: "长在你身上的，别人偷不走的，就是生物因子！", p: "P146" },
    { q: "WPS 文档提供的“账号加密”模式，相比于传统的输入密码加密，最大的优势在于？", options:["只要登录了指定账号就能看完全免密码", "它能把文档压缩得非常的小完全不占地", "即使账号被盗了别人也绝对永远打不开", "它可以让文档里面的文字排版极其好看"], a: 0, exp: "账号授权就是“认人不认锁”，只要登录的是指定的 WPS 账号就能看，不怕忘密码！", p: "P154" },
    { q: "在著名的 RSA 加密算法中，其极其强大的安全性主要基于什么极其困难的数学问题？", options:["两个超大素数相乘后极难被分解的原理", "加减乘除四则运算极其复杂繁琐的原理", "几何图形在空间中极难精确绘制的原理", "物理世界的运行速度极难被测量的原理"], a: 0, exp: "给你 3233，让你瞬间算出是哪两个质数相乘，计算机算到冒烟也算不出！", p: "P153" },
    { q: "如果在商场连接了无密码的免费公共 Wi-Fi 并且进行转账，最容易面临什么网络风险？", options:["网络传输流量被监听导致密码遭到窃取", "手机屏幕亮度突然异常变暗导致了黑屏", "手机电池耗电量激增导致瞬间没电关机", "手机的硬件主板被烧毁导致永远开不了"], a: 0, exp: "黑客建的假 Wi-Fi 就像透明玻璃管，你输入的所有密码他都能截获！", p: "P139" },
    { q: "为了防范黑客使用“字典暴力破解”瞬间攻破账号，设置安全密码的最正确做法是？", options:["长度超十二位且包含大小写及特殊的符", "使用自己和家里人的真实生日加上姓名", "在所有的网站和平台上统一使用同一码", "把密码清晰地写在便签纸上贴在显示器"], a: 0, exp: "长且无规律的密码（如 K12@Lab#2026）能有效抵御暴力破解！", p: "P149" },
    { q: "非对称加密算法中，如果你想让朋友给你发机密信件，你应该事先把什么发给他？", options:["可以直接公开给全世界所有人看【公钥】", "打死也不能泄露自己必须藏好的【私钥】", "你的私人银行卡账号及六位数字的密码", "你平时登录微信或者 QQ 时用的旧密码"], a: 0, exp: "公钥是投信口的门，大家都能投；私钥是开箱钥匙，只有你有！", p: "P153" },
    { q: "量子加密技术号称物理绝对安全，如果黑客在半路试图窃听你的密码，会发生什么？", options:["黑客只要一偷看密码形态就会瞬间改变", "黑客只要一偷看他的电脑主机就会烧毁", "黑客只要一偷看就会立刻被网警给抓捕", "黑客只要一偷看就会被量子光波给闪瞎"], a: 0, exp: "量子态就像肥皂泡，黑客只要看一眼（测量干涉），泡泡瞬间破裂，立马暴露！", p: "P156" },
    { q: "《中华人民共和国网络安全法》是我国网络安全领域的基础性法律，于哪年正式施行？", options:["二零一七年六月一日起正式的颁布施行", "二零零八年八月八日起正式的颁布施行", "二零二一年九月一日起正式的颁布施行", "一九九九年一月一日起正式的颁布施行"], a: 0, exp: "2017 年的《网络安全法》标志着我国网络安全正式进入有法可依时代！", p: "P141" },

    // --- 第七单元：生成式人工智能与多模态 ---
    { q: "生成式人工智能能够根据自然语言指令自动编写计算机程序，这项强大的应用被称为？", options:["根据自然语言指令自动完成【代码生成】", "根据复杂的硬件去控制电脑【显示亮度】", "根据黑客的要求强行的执行【格式硬盘】", "根据用户的要求强制的切断【网络路由】"], a: 0, exp: "你打字说需求，它直接输出网页代码，这就是代码生成！", p: "P163" },
    { q: "如今绝大多数的大语言模型（LLM）都基于一种极其强大的深度学习底层架构，它叫？", options:["超级文字接龙大师的全新【Transformer】", "传统计算机网络七层的【OSI架构体系】", "用来拦截网络攻击的【防火墙架构网络】", "用于解析互联网域名地址【DNS架构体系】"], a: 0, exp: "Transformer（变形金刚）架构，是当下大模型的灵魂核心！", p: "P163" },
    { q: "我们在与生成式人工智能进行交互时，输入给它的语言指令的专业名词叫作什么？", options:["人机交互的重要指令信息系统【提示词】", "用来加密和解密的特殊字符串【长密钥】", "互联网上的统一资源定位地址【地址码】", "用来标识电脑身份特征的底层【物理码】"], a: 0, exp: "Prompt（提示词），就是你控制 AI 的魔法咒语！", p: "P164" },
    { q: "为了让生成式 AI 给出最高质量的回答，我们在编写“提示词”时，应当遵循什么原则？", options:["指令必须明确并且附带条件要【极具体】", "指令极其模糊并且背景信息要【全空白】", "随意输入几个并且毫无关联的【英单词】", "输入一大段乱码并且附带上了【大病毒】"], a: 0, exp: "咒语必须具体（包含主题、风格、细节），AI 才能画准！", p: "P164" },
    { q: "在“文生图”技术中，能够从“一张随机噪声图像”中逐步去除雪花点还原图像的技术是？", options:["逐渐成为绝对主流的【扩散模型的】技术", "专门用来翻译语言的【词向量法则】技术", "用来预测文字接龙的【转换器架构】技术", "用来保护数据安全的【加密与解密】技术"], a: 0, exp: "扩散模型 (Diffusion Model) 从混沌到清晰，是目前 AI 绘画的王者！", p: "P170" },
    { q: "在图片文字识别（OCR）的底层流程中，利用卷积神经网络（CNN）主要是为了完成什么？", options:["极其精准地提取图像里文字的特征线条", "极其随意地涂改图像里关键的颜色图块", "极其快速地发送图像里的木马病毒封包", "极其隐蔽地破坏图像里原有的加密代码"], a: 0, exp: "CNN 是机器的眼睛，专门在模糊像素中抓取“横竖撇捺”的形状特征！", p: "P165" },
    { q: "打破传统单一处理模式，融合文本、图像、音频等多种类型数据，让 AI 拥有感官的技术是？", options:["极其强大且前沿的【多模态人工智能】", "极其基础且传统的【局域网络传输网】", "极其安全且隐蔽的【非对称密码加密】", "极其古老且单一的【单线程文字处理】"], a: 0, exp: "既能看图，又能听声，还能写字，这就叫多模态（Multi-modal）！", p: "P178" },
    { q: "利用多模态人工智能技术，如果我们在输入端同时给出“一段音频和一张照片”，AI 能够？", options:["实现非常酷炫的【图生文或视频的生成】", "实现极其普通的【纯文字之间的全翻译】", "实现强制锁定电脑屏幕【勒索病毒爆发】", "实现直接帮你去银行【全自动的排取款】"], a: 0, exp: "给 AI 图和声音，它能给你合成一段微电影！这就是多模态的绝杀！", p: "P178" },
    { q: "生成式 AI 生成的内容可能存在逻辑欠缺、信息不准等（AI幻觉）问题。因此使用时必须？", options:["保持极其清醒理智的独立的【批判思维】", "保持极度盲目崇拜的完全的【百分百信】", "保持极其恐惧害怕的彻底的【全部抵制】", "保持毫无所谓态度的随意的【疯狂抄袭】"], a: 0, exp: "AI 会“一本正经地胡说八道”，绝不能当甩手掌柜，必须人工审核验证！", p: "P179" },
    { q: "如果 AI 生成的演示文稿前言不搭后语，缺乏因果关系。我们应该进行哪方面的优化？", options:["属于极需补充论点因果关系的【逻辑优化】", "属于极需调整排版字体大小的【视觉设计】", "属于极需人工去核实资料真伪【内容优化】", "属于极需加长文章整体总字数【字数优化】"], a: 0, exp: "骨架散了，前后矛盾，这就是“逻辑”出了大问题！", p: "P179" },
    { q: "在评估 AI 生成的内容时，“核实并标注信息来源”这一行为体现了数字公民的什么素养？", options:["体现了极高的网络诚实守信与【安全责任】", "体现了极高的黑客底层攻防与【破坏技术】", "体现了极低的日常知识储备与【学习能力】", "体现了极差的线下人际交往与【沟通技巧】"], a: 0, exp: "尊重别人的劳动成果和版权，标注来源，是数字公民的道德底线！", p: "P179" },
    { q: "如果发现 AI 生成的“单词消消乐”游戏没有背景音乐，最高效的代码优化方式是？", options:["修改提示词增加关于添加音效【全新指令】", "把电脑的主板音量扬声器调到【最高音量】", "彻底把这个人工智能软件完全【卸载重装】", "给人工智能发红包祈求它加上【全新代码】"], a: 0, exp: "修改提示词，把缺少的要素补进去，让 AI 重新迭代代码！", p: "P167" },
    { q: "在技术性能评估中，我们关注 AI 写的代码是否“响应快速、运行稳定”，这是为了避免？", options:["代码运行极其缓慢甚至导致了【卡顿崩盘】", "游戏里面的图片颜色显得特别【难看刺眼】", "游戏里面存在着严重的单词的【拼写错词】", "游戏里面没有加上非常好听的【背景音乐】"], a: 0, exp: "技术性能只管底层：卡不卡？崩不崩？报错不报错？", p: "P168" },
    { q: "技术应作为人类智慧的延伸而非替代。在利用 AI 制作展板和写报告时，最正确的态度是？", options:["保持审慎理智，人类必须始终掌握判断权", "极度盲目崇拜，把所有的事情交给电脑做", "感到极度恐慌，立刻把所有的网线全拔掉", "抱着毫不关心，随意拿它生成去进行诈骗"], a: 0, exp: "AI 只是高级工具，人类才是真正掌控方向和承担责任的主人！", p: "P179" },
    { q: "【完结撒花】学完七年级整册《信息科技》，并成功通关奇妙网络实验室，你现在的身份是？", options:["通晓底层原理且具备极客精神的【架构师】", "一名依然对计算机网络不通的纯【电脑白】", "企图利用网络技术去破坏学校的【大黑客】", "毫无主见只会照抄 AI 答案的假【手掌柜】"], a: 0, exp: "恭喜特工！大满贯结业！浩瀚的数字宇宙正等待你去探索与创造！", p: "大结局" }
];

// ==========================================
// 2. 初始化与动态注入闯关容器 (绝不修改HTML)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    startQuiz(); // 默认预加载题库
});

// ==========================================
// 修复版：导航栏按钮切换逻辑 (让闯关模式终于能弹出来了！)
// ==========================================
function initNavigation() {
    const tabStudy = document.getElementById('tab-study'); 
    const tabQuiz = document.getElementById('tab-quiz');
    const contentStudy = document.getElementById('study-content'); 
    const contentQuiz = document.getElementById('quiz-content');
    const subNav = document.getElementById('sub-nav');
    
    // 如果找不到按钮，说明 HTML 没贴对，直接退出防止报错
    if(!tabStudy || !tabQuiz || !contentStudy || !contentQuiz) {
        console.error("找不到导航按钮或内容容器！");
        return;
    }

    tabStudy.addEventListener('click', () => {
        // 按钮变色
        tabStudy.className = "neo-btn bg-neo-yellow px-4 md:px-6 py-2 rounded-2xl border-2 border-neo-dark font-bold text-sm md:text-lg flex items-center gap-2 transform transition hover:-translate-y-1 shadow-[4px_4px_0_0_#000]";
        tabQuiz.className = "neo-btn bg-white px-4 md:px-6 py-2 rounded-2xl border-2 border-neo-dark font-bold text-sm md:text-lg text-gray-400 hover:text-neo-dark flex items-center gap-2 transform transition hover:-translate-y-1 shadow-[4px_4px_0_0_#000]";
        // 隐藏闯关，显示复习
        contentStudy.classList.remove('hidden'); 
        contentQuiz.classList.add('hidden');
        if(subNav) subNav.classList.remove('-translate-y-20');
    });

    tabQuiz.addEventListener('click', () => {
        // 按钮变色
        tabQuiz.className = "neo-btn bg-red-500 text-white px-4 md:px-6 py-2 rounded-2xl border-2 border-neo-dark font-bold text-sm md:text-lg flex items-center gap-2 transform transition hover:-translate-y-1 shadow-[4px_4px_0_0_#000]";
        tabStudy.className = "neo-btn bg-white px-4 md:px-6 py-2 rounded-2xl border-2 border-neo-dark font-bold text-sm md:text-lg text-gray-400 hover:text-neo-dark flex items-center gap-2 transform transition hover:-translate-y-1 shadow-[4px_4px_0_0_#000]";
        // 隐藏复习，显示闯关
        contentStudy.classList.add('hidden'); 
        contentQuiz.classList.remove('hidden');
        if(subNav) subNav.classList.add('-translate-y-20');
        
        // 呼叫闯关函数刷出题目！
        startQuiz(); 
    });
}

// 确保网页加载时执行绑定
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
});

// ==========================================
// 3. 终极闯关模式逻辑 (带防卡死盾)
// ==========================================
function startQuiz() {
    try {
        const saved = localStorage.getItem('K12_Quiz_Review');
        if (saved) {
            quizState = JSON.parse(saved);
            if (quizState.hp <= 0 || !quizState.order || quizState.order.length === 0 || quizState.currentIdx >= questionBank.length) resetQuizState();
        } else { resetQuizState(); }
        renderQuiz();
    } catch (e) {
        console.error("数据损坏自动修复：", e); resetQuizState(); renderQuiz();
    }
}

function resetQuizState() {
    quizState = { hp: TOTAL_HP, score: 0, currentIdx: 0, history:[], order: shuffleArray([...Array(questionBank.length).keys()]) };
    localStorage.setItem('K12_Quiz_Review', JSON.stringify(quizState));
}

function renderQuiz() {
    try {
        updateQuizUI();
        const qContainer = document.getElementById('question-text'), optContainer = document.getElementById('options-container'), expBox = document.getElementById('explanation-box');
        if (!qContainer || !optContainer) return;
        
        expBox.classList.add('hidden', 'scale-95', 'opacity-0'); optContainer.innerHTML = '';
        if (quizState.currentIdx >= questionBank.length) { showResultModal(); return; }

        const realIdx = quizState.order[quizState.currentIdx];
        const currentQ = questionBank[realIdx];

        qContainer.innerHTML = `<span class="bg-red-500 text-white px-3 py-1 rounded-lg text-sm mr-2 font-mono shadow-sm">[${currentQ.p}]</span> ${currentQ.q}`;

        let optionsWithIndex = currentQ.options.map((opt, idx) => ({ text: opt, isCorrect: idx === currentQ.a }));
        optionsWithIndex = shuffleArray(optionsWithIndex);

        optionsWithIndex.forEach((optObj, idx) => {
            const btn = document.createElement('button'); btn.className = 'quiz-opt-btn';
            btn.innerHTML = `<span class="w-10 h-10 rounded-xl border-2 border-neo-dark bg-gray-100 flex items-center justify-center font-black mr-4 shrink-0 shadow-sm">${String.fromCharCode(65+idx)}</span> <span class="leading-relaxed text-sm md:text-base">${optObj.text}</span>`;
            btn.onclick = () => handleAnswer(btn, optObj.isCorrect, currentQ, optionsWithIndex, optObj.text);
            optContainer.appendChild(btn);
        });
    } catch (e) {
        console.error("渲染题目出错：", e); localStorage.removeItem('K12_Quiz_Review'); resetQuizState();
    }
}

function handleAnswer(btnElement, isCorrect, qObj, shuffledOpts, selectedText) {
    const allBtns = document.querySelectorAll('.quiz-opt-btn');
    allBtns.forEach(b => { b.classList.add('disabled'); b.onclick = null; });

    if (isCorrect) {
        btnElement.classList.add('correct', 'animate-pop'); quizState.score += Math.floor(100 / questionBank.length); 
        showExplanation(true, qObj.exp);
    } else {
        btnElement.classList.add('wrong', 'animate-shake-wrong'); quizState.hp -= 1;
        const hpEl = document.getElementById('hp-display'); if(hpEl) { hpEl.classList.add('animate-heartbeat'); setTimeout(()=>hpEl.classList.remove('animate-heartbeat'), 800); }
        allBtns.forEach((b, idx) => { if (shuffledOpts[idx].isCorrect) b.classList.add('correct'); });
        showExplanation(false, qObj.exp);
    }

    quizState.history.push({ q: qObj.q, selected: selectedText, isCorrect: isCorrect, correctAnswer: qObj.options[qObj.a] });
    updateQuizUI(); quizState.currentIdx++; localStorage.setItem('K12_Quiz_Review', JSON.stringify(quizState));

    if (quizState.hp <= 0) {
        setTimeout(() => {
            alert("💔 哎呀，血槽空了！期末冲刺失败。请复习错题，再次挑战！");
            localStorage.removeItem('K12_Quiz_Review'); resetQuizState(); renderQuiz();
        }, 1500);
    }
}

function showExplanation(isCorrect, text) {
    const box = document.getElementById('explanation-box'), icon = document.getElementById('explain-icon'), title = document.getElementById('explain-title'), txt = document.getElementById('explain-text');
    box.classList.remove('hidden', 'bg-green-100', 'border-green-500', 'text-green-900', 'bg-red-100', 'border-red-500', 'text-red-900');
    
    if (isCorrect) { box.classList.add('bg-green-100', 'border-green-500', 'text-green-900'); icon.innerHTML = '<i class="fas fa-check-circle text-green-600"></i>'; title.innerText = '完美答对！'; } 
    else { box.classList.add('bg-red-100', 'border-red-500', 'text-red-900'); icon.innerHTML = '<i class="fas fa-times-circle text-red-600"></i>'; title.innerText = '踩中陷阱！'; }
    
    txt.innerHTML = `<strong>👨‍🏫 核心考点解析：</strong>${text}`;
    setTimeout(() => box.classList.remove('scale-95', 'opacity-0'), 50);

    document.getElementById('btn-next-q').onclick = () => { if (quizState.currentIdx >= questionBank.length) showResultModal(); else renderQuiz(); };
}

function updateQuizUI() {
    const qEl = document.getElementById('quiz-current-q'), scoreEl = document.getElementById('quiz-score'), hpEl = document.getElementById('hp-display');
    if (qEl) qEl.innerText = Math.min(quizState.currentIdx + 1, questionBank.length);
    if (scoreEl) scoreEl.innerText = quizState.score;
    let hearts = ''; for (let i = 0; i < TOTAL_HP; i++) hearts += i < quizState.hp ? '❤️' : '🖤';
    if (hpEl) hpEl.innerText = hearts;
}

function showResultModal() {
    const modal = document.getElementById('result-modal'); if(!modal) return;
    modal.classList.remove('hidden'); modal.classList.add('flex');
    const finalScoreDisplay = quizState.score >= 95 ? 100 : quizState.score; document.getElementById('final-score').innerText = finalScoreDisplay;
    let hearts = ''; for (let i = 0; i < quizState.hp; i++) hearts += '❤️'; document.getElementById('final-hp').innerText = hearts || '0';
    let titleBadge = document.getElementById('result-title-badge');
    
    if (finalScoreDisplay >= 90) { titleBadge.innerText = '全知全能架构神 👑'; titleBadge.className = 'text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full border-2 border-yellow-400 font-black'; }
    else if (finalScoreDisplay >= 60) { titleBadge.innerText = '期末通关小达人 👍'; titleBadge.className = 'text-green-600 bg-green-100 px-3 py-1 rounded-full border-2 border-green-400 font-black'; }
    else { titleBadge.innerText = '急需补课的菜鸟 🥺'; titleBadge.className = 'text-red-600 bg-red-100 px-3 py-1 rounded-full border-2 border-red-400 font-black'; }
}

function shuffleArray(array) { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); let temp = array[i]; array[i] = array[j]; array[j] = temp; } return array; }