document.addEventListener('DOMContentLoaded', () => {

    // ================= 1. 终极题库构建 (100分满分) =================
    
    // 1.1 单选题 (30题 × 2分 = 60分)
    const rawMCQ = [
        { id: "m1", text: "1982年，卡内基梅隆大学的程序员将微动开关接入网络来实时查看饮料库存，这被称为最早的物联网雏形，它的名字是？", options: ["Only 可乐售卖机", "特洛伊咖啡壶", "智能门禁系统", "阿帕网路由器"], correctIndex: 0, explain: "1982年的Only可乐机是最早的雏形，1991年的特洛伊咖啡壶是另一个著名早期案例。" },
        { id: "m2", text: "物联网系统通常被划分为三个层级。负责“对数据进行计算、处理、挖掘，并提供用户服务”的属于哪一层？", options: ["应用层", "网络层", "感知层", "物理层"], correctIndex: 0, explain: "应用层相当于大脑；网络层相当于神经；感知层相当于五官。" },
        { id: "m3", text: "相比于传统的互联网，物联网（IoT）最核心的区别在于？", options: ["重在对物理世界物品的感知和控制", "网速必须达到 5G 标准以上", "只能通过无线网络进行连接", "数据传输不需要经过服务器"], correctIndex: 0, explain: "互联网重在信息的交流，物联网重在“物”的感知与控制。" },
        { id: "m4", text: "关于二维码技术，以下说法错误的是？", options: ["如果二维码破损了五分之一，就绝对无法被扫码设备识别", "采用黑白方块的二进制编码存储信息", "包含校验纠错机制，具有一定的抗损性", "动态二维码可以防止截图盗用，提高安全性"], correctIndex: 0, explain: "二维码具有纠错功能，即使部分破损或被遮挡，依然可以被正确识别。" },
        { id: "m5", text: "RFID（射频识别）技术在生活中应用广泛，如高速ETC。以下哪种环境会对 RFID 的识别造成严重干扰？", options: ["金属表面或液体环境", "没有光线的黑暗环境", "温度高达 40℃ 的夏天", "大雨滂沱的天气"], correctIndex: 0, explain: "RFID依靠无线电波通信，金属会反射电波，液体会吸收电波，从而导致标签失效。" },
        { id: "m6", text: "景区采用红外传感器进行人流量统计。如果传感器分别安装在闸机的左右两侧形成“隐形光墙”，这种传感器属于？", options: ["对射式传感器", "漫反射式传感器", "热成像传感器", "超声波传感器"], correctIndex: 0, explain: "发射器和接收器分居两侧是对射式，抗干扰强；都在同一侧依靠物体反光的是漫反射式。" },
        { id: "m7", text: "在红外统计算法的代码中，为了防止游人衣服晃动导致多次误计数，程序员必须加入什么逻辑？", options: ["防抖动滤波 (如 time.sleep)", "提高红外线的发射功率", "将传感器更换为彩色摄像头", "删除循环语句"], correctIndex: 0, explain: "通过软件延时(防抖动)可以过滤掉短时间内不稳定的脉冲信号。" },
        { id: "m8", text: "环境质量监测系统中常使用“多传感器融合技术”，其主要优势不包括？", options: ["降低了设备的采购和维护成本", "解决单一传感器易受干扰的局限", "实现多源信息融合，提升监测准确性", "实现空间区域的联动预测"], correctIndex: 0, explain: "多传感器融合需要部署更多设备，会增加硬件成本，但能极大提升准确性。" },
        { id: "m9", text: "在智慧校园中，连接设备距离近、功耗极低、且经常用于设备“配对”控制（如手机控制智能灯）的无线通信技术是？", options: ["蓝牙 (Bluetooth)", "Wi-Fi", "LoRa", "光纤通信"], correctIndex: 0, explain: "蓝牙适合短距离、低功耗、主从配对控制；Wi-Fi功耗较高适合宽带传输。" },
        { id: "m10", text: "智慧大棚需要将温湿度数据传输到几公里外的控制中心，且无法提供持续大电源，最适合采用的通信技术是？", options: ["NB-IoT 或 LoRa", "ZigBee", "Wi-Fi 7", "双绞线"], correctIndex: 0, explain: "LoRa和NB-IoT属于低功耗广域网(LPWAN)，兼具远距离和低功耗特点。" },
        { id: "m11", text: "MQTT 是一种轻量级的物联网协议，它采用的通信模式是？", options: ["发布 —— 订阅 (Pub-Sub) 模式", "点对点直接模式", "HTTP 请求响应模式", "全网广播模式"], correctIndex: 0, explain: "MQTT通过 Broker 中转，发布者和订阅者通过 Topic 解耦通信。" },
        { id: "m12", text: "在 MQTT 协议中，为了保证报警指令“精准送达且绝对不重复”，应将服务质量（QoS）设置为？", options: ["QoS 2", "QoS 0", "QoS 1", "QoS 3"], correctIndex: 0, explain: "QoS 0可能丢，QoS 1可能重复，QoS 2最耗资源但保证唯一且必达。" },
        { id: "m13", text: "校园 Wi-Fi 路由器工作在免授权的 ISM 频段，最常见的两个频段是？", options: ["2.4 GHz 和 5 GHz", "900 MHz 和 1800 MHz", "1 GHz 和 3 GHz", "红外和紫外频段"], correctIndex: 0, explain: "Wi-Fi主要工作在2.4G(穿墙好)和5G(速度快)频段。" },
        { id: "m14", text: "通过网络获取的数据经常是 JSON 格式。在 Python 微控制器编程中，通常需要引入哪个库来将其解析为字典？", options: ["ujson", "math", "socket", "random"], correctIndex: 0, explain: "通常使用 ujson 库的 loads 方法来解析 JSON 字符串。" },
        { id: "m15", text: "室温突超70度时，设备不经云端直接控制蜂鸣器报警。这种极速响应方式体现了？", options: ["边缘计算", "云计算", "分布式存储", "AI 图像识别"], correctIndex: 0, explain: "数据靠最近的设备就地处理叫边缘计算，低延迟不怕断网。" },
        { id: "m16", text: "家用电器中的温度传感器常使用哪种元件，因为它体积小、灵敏度高？", options: ["热敏电阻", "热电偶", "光敏电阻", "压电陶瓷"], correctIndex: 0, explain: "热敏电阻适合家用；热电偶测量范围极广，多用于工业高温环境。" },
        { id: "m17", text: "在智能窗户系统中，接收到指令后最终带动窗户机械开合的设备属于？", options: ["执行器 (如舵机/电机)", "传感器", "网关", "代理服务器"], correctIndex: 0, explain: "舵机、继电器等能够做出物理动作的设备统称为执行器。" },
        { id: "m18", text: "当硬件通过网络接收指令时，使用 `try...except` 语句的根本目的是？", options: ["捕获异常数据，防止程序因类型转换失败而崩溃", "加快代码执行速度", "满足 Python 强制缩进", "重启开发板"], correctIndex: 0, explain: "网络传来的数据不可控，直接转换可能报错，必须用 try 拦截异常。" },
        { id: "m19", text: "将智能家居一天内的温度数据转化为折线图或热力图，这属于？", options: ["数据可视化", "数据加密", "数据采集", "身份认证"], correctIndex: 0, explain: "将抽象数字变成直观图表展现规律的过程称为数据可视化。" },
        { id: "m20", text: "智能手表测量心率的光学传感器（PPG），主要利用了血液中的什么物质对光线的吸收作用？", options: ["血红蛋白", "血小板", "白细胞", "骨胶原"], correctIndex: 0, explain: "心脏跳动改变血管内血红蛋白浓度，从而引起反射光强度的周期变化。" },
        { id: "m21", text: "现代智慧交通摄像头不仅能拍摄画面，还能自动读出车牌号。这说明其具备了？", options: ["图像获取与目标识别双重能力", "激光测距能力", "自动拦截能力", "释放电磁波能力"], correctIndex: 0, explain: "结合 AI 技术，摄像头实现了从“看清”到“看懂”的跨越。" },
        { id: "m22", text: "智慧路口若一侧排队车辆极长，系统会自动延长该方向绿灯时间。这种决策基于？", options: ["数据驱动的科学计算", "交警的直觉", "车辆的重量", "天气预报"], correctIndex: 0, explain: "通过传感器实时采集车流量数据，算法分析后实现动态优化控制。" },
        { id: "m23", text: "智能大棚中，除了温湿度和水分，还有一种气体传感器的数值对植物光合作用至关重要，它是？", options: ["二氧化碳传感器", "一氧化碳传感器", "甲烷传感器", "氦气传感器"], correctIndex: 0, explain: "二氧化碳是植物进行光合作用合成有机物的主要原料。" },
        { id: "m24", text: "医院智能药柜系统通常会接入 Database，其中文意思是？", options: ["数据库", "代理服务器", "接口", "路由器"], correctIndex: 0, explain: "数据库用于有组织地高效存储和检索海量信息。" },
        { id: "m25", text: "黑客伪造一个名为“Free-WiFi”的热点，诱导用户连接并窃取密码。这属于？", options: ["Wi-Fi 钓鱼", "DDoS 攻击", "RFID 标签伪造", "SQL 注入"], correctIndex: 0, explain: "这是一种典型的网络层欺骗手段，诱骗用户主动送出信息。" },
        { id: "m26", text: "控制海量漏洞设备同时向目标服务器发送巨量请求，导致其瘫痪。这种攻击是？", options: ["DDoS（分布式拒绝服务）攻击", "中间人攻击", "API 越权攻击", "物理破坏"], correctIndex: 0, explain: "利用“僵尸网络”耗尽目标网络带宽或系统资源就是 DDoS。" },
        { id: "m27", text: "为防智能门锁轻易被盗用，除了密码外，最安全的认证方式是结合？", options: ["生物特征认证 (指纹/人脸)", "二维码认证", "出厂默认密码", "关闭无线网络"], correctIndex: 0, explain: "生物特征具有终生不变性和极强的唯一不可复制性。" },
        { id: "m28", text: "国家强调物联网核心技术（如高端芯片）必须“自主可控”，根本原因在于？", options: ["防止外部断供卡脖子和恶意后门，保障国家安全", "只是为了让设备更便宜", "为了增加国内就业", "为了彻底断开国际互联网"], correctIndex: 0, explain: "没有自主核心技术就如同在别人地基上建房子，随时面临安全威胁。" },
        { id: "m29", text: "根据《网络安全法》，APP收集用户位置和通信录等敏感信息时，必须？", options: ["明示目的并取得用户同意", "只要加密就可以偷偷收集", "强迫用户同意否则锁死手机", "直接传到公开的云盘上"], correctIndex: 0, explain: "数据采集必须合法、正当、必要，并严格保护隐私。" },
        { id: "m30", text: "某普通用户能利用系统漏洞查询到管理员级别的机密数据，这属于应用层的？", options: ["身份认证和访问控制不足 (越权调用)", "物理设备破坏", "光纤被挖断", "电磁干扰"], correctIndex: 0, explain: "未严格校验用户权限，导致低权限访问高权限接口，属于典型的越权漏洞。" }
    ];

    // 1.2 代码填空大题 (2题，共10空 × 4分 = 40分)
    const rawCodeQs = [
        {
            id: "c1",
            title: "【代码实操】红外人流统计与 MQTT 发布",
            desc: "行空板读取引脚 p0 的红外传感器模拟量(被遮挡时数值小于100)，亮蓝灯、总数加1，并通过 MQTT 发送数据，最后延时1秒防抖。请补全核心代码。",
            answers: ["mqttclient", "read_analog", "publish", "str", "time.sleep"],
            htmlTemplate: `
<pre class="code-pre">
<span class="code-keyword">from</span> unihiker_k10 <span class="code-keyword">import</span> pin, rgb, wifi, <input type="text" class="code-input" id="c1-b0" autocomplete="off" placeholder="(空1)">, time

<span class="code-comment"># 连接 MQTT 代理服务器</span>
mqttclient.connect(server=<span class="code-string">"192.168.1.10"</span>, port=1883, user=<span class="code-string">"siot"</span>, psd=<span class="code-string">"dfrobot"</span>)
num = 0

<span class="code-keyword">while True</span>:
    <span class="code-comment"># 读取红外模拟量数据</span>
    intensity = p0.<input type="text" class="code-input" id="c1-b1" autocomplete="off" placeholder="(空2)">()
    
    <span class="code-keyword">if</span> intensity < 100:  <span class="code-comment"># 检测到遮挡</span>
        rgb.write(num=2, R=0, G=0, B=255)
        num += 1
        
        <span class="code-comment"># 发布数据，注意内容必须转换为字符串</span>
        mqttclient.<input type="text" class="code-input" id="c1-b2" autocomplete="off" placeholder="(空3)">(topic=<span class="code-string">"siot/people"</span>, content=<input type="text" class="code-input" id="c1-b3" autocomplete="off" placeholder="(空4)">(num))
        
        <span class="code-comment"># 防抖动滤波</span>
        <input type="text" class="code-input" id="c1-b4" autocomplete="off" placeholder="(空5)">(1)
    <span class="code-keyword">else</span>:
        rgb.write(num=2, R=0, G=0, B=0)
</pre>`,
            explain: "解析：空1需导入 mqttclient。空2读取模拟量用 read_analog。空3发布方法是 publish。空4数据需强转字符串用 str。空5延时防抖用 time.sleep。"
        },
        {
            id: "c2",
            title: "【代码实操】智能窗户保护逻辑与JSON解析",
            desc: "行空板订阅指令，控制引脚1的舵机。需解析 JSON，并用 try 捕获异常，同时限制舵机角度在 0~180 度之间防止损坏。请补全代码。",
            answers: ["subscribe", "ujson.loads", "try", "int", "max"],
            htmlTemplate: `
<pre class="code-pre">
<span class="code-keyword">import</span> ujson, time
<span class="code-keyword">from</span> unihiker_k10 <span class="code-keyword">import</span> mqttclient, servo
s1 = servo(1)

<span class="code-keyword">def</span> <span class="code-function">on_message_recv</span>(msg):
    <span class="code-comment"># 将接收的字节流解析为字典</span>
    data_dict = <input type="text" class="code-input" id="c2-b1" autocomplete="off" placeholder="(空7)">(msg)
    raw_angle = data_dict.get("angle")
    
    <span class="code-comment"># 异常捕获，防非法数据崩溃</span>
    <input type="text" class="code-input" id="c2-b2" autocomplete="off" placeholder="(空8)">:
        <span class="code-comment"># 转为整型</span>
        target = <input type="text" class="code-input" id="c2-b3" autocomplete="off" placeholder="(空9)">(raw_angle)
        
        <span class="code-comment"># 硬件保护：限制角度在 0 到 180 之间</span>
        safe_angle = <input type="text" class="code-input" id="c2-b4" autocomplete="off" placeholder="(空10)">(0, min(180, target))
        s1.angle(safe_angle)
        
    <span class="code-keyword">except</span> Exception <span class="code-keyword">as</span> e:
        print("错误:", e)

<span class="code-comment"># 绑定主题并设置回调函数监听</span>
mqttclient.<input type="text" class="code-input" id="c2-b0" autocomplete="off" placeholder="(空6)">(topic=<span class="code-string">"home/window"</span>, callback=on_message_recv)

<span class="code-keyword">while True</span>:
    time.sleep(1)
</pre>`,
            explain: "解析：空6监听消息用 subscribe。空7解析JSON用 ujson.loads。空8异常捕获用 try。空9强制转整型用 int。空10用 max 函数限制下限0度。"
        }
    ];

    // ================= 2. 状态管理 =================
    let state = {
        mcq: [],
        mcqAnswers: {},   
        codeAnswers: {},  
        currentSection: 'mcq', 
        currentIndex: 0,
        startTime: 0,
        timerInterval: null
    };

    let isReviewMode = false;
    const STORAGE_KEY = 'iot_exam_v3';
    const RETRY_KEY = 'iot_retry_count_v3';

    // 渲染重做次数
    const retryCount = parseInt(localStorage.getItem(RETRY_KEY) || "0");
    document.getElementById('retry-counter').innerText = retryCount;

    // 洗牌算法
    function shuffleArray(array) {
        let cur = array.length, ran;
        while (cur !== 0) {
            ran = Math.floor(Math.random() * cur); cur--;
            [array[cur], array[ran]] = [array[ran], array[cur]];
        }
        return array;
    }

    function initExam() {
        let clonedMCQ = JSON.parse(JSON.stringify(rawMCQ));
        shuffleArray(clonedMCQ); // 题目打乱
        state.mcq = clonedMCQ.map(q => {
            let correctText = q.options[q.correctIndex];
            shuffleArray(q.options); // 选项打乱
            q.newCorrectIndex = q.options.indexOf(correctText);
            return q;
        });

        state.mcqAnswers = {};
        state.codeAnswers = {};
        state.currentSection = 'mcq';
        state.currentIndex = 0;
        isReviewMode = false;
        
        saveState();
        buildNavGrid();
        startTimer();
        renderQuestion();
    }

    // ================= 3. UI 渲染 =================
    const screens = {
        start: document.getElementById('start-screen'),
        quiz: document.getElementById('quiz-screen'),
        result: document.getElementById('result-screen')
    };

    function showScreen(name) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[name].classList.add('active');
    }

    function buildNavGrid() {
        const gridMcq = document.getElementById('grid-mcq');
        const gridCode = document.getElementById('grid-code');
        gridMcq.innerHTML = ''; gridCode.innerHTML = '';

        state.mcq.forEach((q, idx) => {
            const box = document.createElement('div');
            box.className = 'grid-box';
            // 添加内联样式替代复杂CSS，确保立刻生效
            box.style.padding = "5px 0";
            box.style.textAlign = "center";
            box.style.border = "1px solid rgba(255,255,255,0.1)";
            box.style.borderRadius = "4px";
            box.style.cursor = "pointer";
            box.style.fontSize = "0.85rem";
            
            box.innerText = idx + 1;
            box.id = `nav-mcq-${idx}`;
            box.onclick = () => { jumpTo('mcq', idx); };
            gridMcq.appendChild(box);
        });

        rawCodeQs.forEach((q, idx) => {
            const box = document.createElement('div');
            box.className = 'grid-box';
            box.style.padding = "5px 0";
            box.style.textAlign = "center";
            box.style.border = "1px solid rgba(255,255,255,0.1)";
            box.style.borderRadius = "4px";
            box.style.cursor = "pointer";
            box.style.fontSize = "0.85rem";

            box.innerText = `C${idx + 1}`;
            box.id = `nav-code-${idx}`;
            box.onclick = () => { jumpTo('code', idx); };
            gridCode.appendChild(box);
        });
        updateNavGridStatus();
    }

    function updateNavGridStatus() {
        // 选择题状态
        state.mcq.forEach((q, idx) => {
            const box = document.getElementById(`nav-mcq-${idx}`);
            box.style.background = "transparent";
            box.style.borderColor = "rgba(255,255,255,0.1)";
            box.style.color = "var(--text-main)";

            if (isReviewMode) {
                if (state.mcqAnswers[q.id] === q.newCorrectIndex) {
                    box.style.background = "var(--success)"; // 绿
                    box.style.color = "#000";
                } else {
                    box.style.background = "var(--danger)"; // 红
                    box.style.color = "#fff";
                }
            } else {
                if (state.mcqAnswers[q.id] !== undefined) {
                    box.style.background = "var(--primary)"; // 答过实心蓝
                    box.style.color = "#000";
                }
                if (state.currentSection === 'mcq' && state.currentIndex === idx) {
                    box.style.borderColor = "var(--primary)"; // 当前蓝框
                    box.style.boxShadow = "0 0 8px var(--primary)";
                } else {
                    box.style.boxShadow = "none";
                }
            }
        });

        // 代码题状态
        rawCodeQs.forEach((q, idx) => {
            const box = document.getElementById(`nav-code-${idx}`);
            box.style.background = "transparent";
            box.style.borderColor = "rgba(255,255,255,0.1)";
            box.style.color = "var(--text-main)";

            let isFull = true;
            let isAllCorrect = true;
            q.answers.forEach((ans, ansIdx) => {
                const userVal = state.codeAnswers[`${q.id}-b${ansIdx}`];
                if(!userVal) isFull = false;
                if(isReviewMode && (!userVal || userVal.trim().toLowerCase() !== ans.trim().toLowerCase())) {
                    isAllCorrect = false;
                }
            });

            if (isReviewMode) {
                if (isAllCorrect) { box.style.background = "var(--success)"; box.style.color="#000"; }
                else { box.style.background = "var(--danger)"; box.style.color="#fff"; }
            } else {
                if (isFull) { box.style.background = "var(--primary)"; box.style.color="#000"; }
                if (state.currentSection === 'code' && state.currentIndex === idx) {
                    box.style.borderColor = "var(--primary)";
                    box.style.boxShadow = "0 0 8px var(--primary)";
                } else {
                    box.style.boxShadow = "none";
                }
            }
        });
    }

    function renderQuestion() {
        const container = document.getElementById('question-container');
        container.innerHTML = '';

        if (state.currentSection === 'mcq') {
            document.getElementById('q-type-indicator').innerText = "单项选择题 (2分)";
            document.getElementById('q-type-indicator').className = "question-type-badge badge-mcq";
            
            const q = state.mcq[state.currentIndex];
            let html = `<div style="font-size: 1.2rem; margin-bottom: 20px; line-height: 1.6;">${state.currentIndex + 1}. ${q.text}</div>`;
            
            q.options.forEach((opt, i) => {
                let borderCol = "rgba(255,255,255,0.1)";
                let bgCol = "rgba(255,255,255,0.03)";
                let icon = "";
                const isSelected = state.mcqAnswers[q.id] === i;

                if (isReviewMode) {
                    if (i === q.newCorrectIndex) {
                        borderCol = "var(--success)"; bgCol = "rgba(16, 185, 129, 0.2)";
                        icon = `<i class="fas fa-check" style="color:var(--success); margin-left:auto;"></i>`;
                    } else if (isSelected) {
                        borderCol = "var(--danger)"; bgCol = "rgba(239, 68, 68, 0.2)";
                        icon = `<i class="fas fa-times" style="color:var(--danger); margin-left:auto;"></i>`;
                    }
                } else if (isSelected) {
                    borderCol = "var(--primary)"; bgCol = "rgba(0, 229, 255, 0.15)";
                }

                html += `
                <div onclick="selectMcq(${i})" style="padding: 15px; margin-bottom: 10px; border: 1px solid ${borderCol}; background: ${bgCol}; border-radius: 8px; cursor: pointer; display: flex; align-items: center; transition: 0.2s;">
                    <div style="width: 25px; height: 25px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-right: 15px; font-size:0.9rem;">${['A','B','C','D'][i]}</div>
                    <div style="font-size: 1rem;">${opt}</div>
                    ${icon}
                </div>`;
            });

            if (isReviewMode) {
                html += `<div style="margin-top:20px; padding:15px; background:rgba(245, 158, 11, 0.1); border-left:4px solid var(--warning); border-radius:4px;">
                            <strong style="color:var(--warning);"><i class="fas fa-lightbulb"></i> 解析：</strong><br>
                            <span style="color:#ddd; font-size:0.95rem;">${q.explain}</span>
                         </div>`;
            }
            container.innerHTML = html;

        } else {
            document.getElementById('q-type-indicator').innerText = "代码大题 (共10个空，每空4分)";
            document.getElementById('q-type-indicator').className = "question-type-badge badge-code";
            
            const q = rawCodeQs[state.currentIndex];
            let html = `<div style="font-size: 1.2rem; font-weight:bold; margin-bottom: 10px; color:var(--primary);">${q.title}</div>`;
            html += `<div style="font-size: 0.95rem; margin-bottom: 20px; color: var(--text-muted);">${q.desc}</div>`;
            html += `<div style="background: #11151c; padding: 20px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); font-family: 'Fira Code', monospace; line-height:1.8; font-size: 0.95rem; overflow-x: auto;">${q.htmlTemplate}</div>`;

            if (isReviewMode) {
                html += `<div style="margin-top:20px; padding:15px; background:rgba(245, 158, 11, 0.1); border-left:4px solid var(--warning); border-radius:4px;">
                            <strong style="color:var(--warning);"><i class="fas fa-lightbulb"></i> 解析：</strong><br>
                            <span style="color:#ddd; font-size:0.95rem;">${q.explain}</span>
                         </div>`;
            }
            container.innerHTML = html;

            q.answers.forEach((ans, idx) => {
                const inputId = `${q.id}-b${idx}`;
                const inputEl = document.getElementById(inputId);
                if (inputEl) {
                    inputEl.style.background = "rgba(255,255,255,0.05)";
                    inputEl.style.border = "none";
                    inputEl.style.borderBottom = "2px solid var(--primary)";
                    inputEl.style.color = "var(--primary)";
                    inputEl.style.fontFamily = "monospace";
                    inputEl.style.fontSize = "1rem";
                    inputEl.style.textAlign = "center";
                    inputEl.style.width = "100px";
                    
                    inputEl.value = state.codeAnswers[inputId] || "";
                    
                    if (isReviewMode) {
                        inputEl.disabled = true;
                        const userVal = (state.codeAnswers[inputId] || "").trim().toLowerCase();
                        if (userVal === ans.trim().toLowerCase()) {
                            inputEl.style.borderBottomColor = "var(--success)";
                            inputEl.style.color = "var(--success)";
                        } else {
                            inputEl.style.borderBottomColor = "var(--danger)";
                            inputEl.style.color = "var(--danger)";
                            const hint = document.createElement('span');
                            hint.style.color = "var(--warning)";
                            hint.style.fontSize = "0.85rem";
                            hint.style.marginLeft = "5px";
                            hint.innerText = `(正解: ${ans})`;
                            inputEl.parentNode.insertBefore(hint, inputEl.nextSibling);
                        }
                    } else {
                        inputEl.addEventListener('input', (e) => {
                            state.codeAnswers[inputId] = e.target.value;
                            updateNavGridStatus();
                            saveState();
                        });
                    }
                }
            });
        }
        updateNavGridStatus();
        
        // 更新按钮状态
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        btnPrev.disabled = (state.currentSection === 'mcq' && state.currentIndex === 0);
        btnNext.disabled = (state.currentSection === 'code' && state.currentIndex === rawCodeQs.length - 1);
    }

    window.selectMcq = function(optIndex) {
        if(isReviewMode) return;
        const qId = state.mcq[state.currentIndex].id;
        state.mcqAnswers[qId] = optIndex;
        saveState();
        renderQuestion();
    };

    function jumpTo(section, index) {
        state.currentSection = section;
        state.currentIndex = index;
        renderQuestion();
    }

    // ================= 4. 计时与存储 =================
    function startTimer() {
        state.startTime = Date.now() - (state.startTime > 0 ? state.startTime : 0); // 简单处理恢复
        if(state.timerInterval) clearInterval(state.timerInterval);
        state.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - state.startTime)/1000);
            const m = String(Math.floor(elapsed/60)).padStart(2, '0');
            const s = String(elapsed%60).padStart(2, '0');
            document.getElementById('current-time').innerText = `${m}:${s}`;
        }, 1000);
    }

    function saveState() {
        if(isReviewMode) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    if(localStorage.getItem(STORAGE_KEY)) {
        document.getElementById('btn-continue').classList.remove('hidden');
    }

    // ================= 5. 事件绑定 =================
    document.getElementById('btn-start').addEventListener('click', () => { initExam(); showScreen('quiz'); });
    
    document.getElementById('btn-continue').addEventListener('click', () => {
        state = JSON.parse(localStorage.getItem(STORAGE_KEY));
        showScreen('quiz'); buildNavGrid(); startTimer(); renderQuestion();
    });

    document.getElementById('btn-next').addEventListener('click', () => {
        if(state.currentSection === 'mcq') {
            if(state.currentIndex < 29) jumpTo('mcq', state.currentIndex + 1);
            else jumpTo('code', 0);
        } else {
            if(state.currentIndex < 1) jumpTo('code', state.currentIndex + 1);
        }
    });

    document.getElementById('btn-prev').addEventListener('click', () => {
        if(state.currentSection === 'code') {
            if(state.currentIndex > 0) jumpTo('code', state.currentIndex - 1);
            else jumpTo('mcq', 29);
        } else {
            if(state.currentIndex > 0) jumpTo('mcq', state.currentIndex - 1);
        }
    });

    // 核心交卷批改逻辑
    document.getElementById('btn-force-submit').addEventListener('click', () => {
        if(!confirm("确认交卷吗？未作答题目记0分。")) return;
        clearInterval(state.timerInterval);
        
        let mcqScore = 0, mcqWrong = 0;
        state.mcq.forEach(q => {
            if(state.mcqAnswers[q.id] === q.newCorrectIndex) mcqScore += 2;
            else mcqWrong++;
        });

        let codeScore = 0, codeWrong = 0;
        rawCodeQs.forEach(q => {
            q.answers.forEach((ans, idx) => {
                const userVal = (state.codeAnswers[`${q.id}-b${idx}`] || "").trim().toLowerCase();
                if(userVal === ans.trim().toLowerCase()) codeScore += 4;
                else codeWrong++;
            });
        });

        const totalScore = mcqScore + codeScore;
        const totalWrong = mcqWrong + codeWrong;

        document.getElementById('final-score').innerText = totalScore;
        document.getElementById('stat-mcq-score').innerText = mcqScore;
        document.getElementById('stat-code-score').innerText = codeScore;
        document.getElementById('stat-wrong').innerText = totalWrong;
        document.getElementById('stat-time').innerText = document.getElementById('current-time').innerText;

        const evalEl = document.getElementById('evaluation-text');
        if(totalScore >= 90) { evalEl.innerText = "🌟 神级架构师！无懈可击！"; evalEl.style.color = "var(--primary)"; }
        else if(totalScore >= 75) { evalEl.innerText = "✅ 优秀！基础很扎实。"; evalEl.style.color = "var(--success)"; }
        else if(totalScore >= 60) { evalEl.innerText = "⚠️ 及格过关，小心底层的漏洞。"; evalEl.style.color = "var(--warning)"; }
        else { evalEl.innerText = "❌ 危险！请务必查看解析重新复盘。"; evalEl.style.color = "var(--danger)"; }

        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(RETRY_KEY, retryCount + 1);
        showScreen('result');
    });

    document.getElementById('btn-restart').addEventListener('click', () => location.reload());

    document.getElementById('btn-review').addEventListener('click', () => {
        isReviewMode = true;
        document.querySelector('.header-right').style.display = 'none';
        showScreen('quiz');
        buildNavGrid(); // 重新渲染网格为红绿模式
        jumpTo('mcq', 0);
    });

    // 详尽 JSON 导出
    document.getElementById('btn-export-json').addEventListener('click', () => {
        const report = {
            examTitle: "八年级物联网(IoT)全真测评",
            timestamp: new Date().toLocaleString(),
            totalScore: document.getElementById('final-score').innerText,
            retryHistory: retryCount + 1,
            details: state.mcq.map(q => ({
                question: q.text,
                userAnswer: state.mcqAnswers[q.id] !== undefined ? q.options[state.mcqAnswers[q.id]] : "未作答",
                isCorrect: state.mcqAnswers[q.id] === q.newCorrectIndex
            })).concat(rawCodeQs.map(q => ({
                question: q.title,
                blanks: q.answers.map((ans, i) => ({
                    user: state.codeAnswers[`${q.id}-b${i}`] || "",
                    correct: ans
                }))
            })))
        };
        const a = document.createElement('a');
        a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
        a.download = `IoT_Score_${new Date().getTime()}.json`;
        document.body.appendChild(a); a.click(); a.remove();
    });
});