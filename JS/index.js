// 首页页面事件
(async function () {
    // 先验证账号
    const resq = await API.profile();
    console.log(resq)
    if (resq.code !== 0) {
        alert(resq.msg);
        location.href = './login.html';
        return;
    }

    // 获取相应的 dom 元素
    const doms = {
        // 侧边栏的个人信息区域
        aside: {
            nickname: $('#nickname'),
            loginId: $('#loginId'),
        },
        // 聊天框
        chatContainer: $('.chat-container'),
        // form表单
        form: $('.msg-container'),
        // 输入信息的文本框
        txtMsg: $('#txtMsg'),
        // 退出按钮
        close: $('.close'),
    }

    // 显示用户的个人信息
    showInfo();

    function showInfo() {
        doms.aside.nickname.innerText = resq.data.nickname;
        doms.aside.loginId.innerText = resq.data.loginId;
    }

    // 获取聊天记录
    getRecord();
    async function getRecord() {
        const record = await API.getHistory();
        // console.log(record)
        for (const item of record.data) {
            addRecord(item);
        }
    }

    // 添加聊天记录
    /**
     * 根据传入的数据对象将相应的数据提取出来放到聊天框中
     * @param {Object} data 数据对象
     */
    function addRecord(data) {
        const chatItem = $$$('div');
        chatItem.className = 'chat-item';
        if (data.from) {
            chatItem.classList.add('me');
        }
        const img = $$$('img');
        img.className = 'chat-avatar';
        img.src = data.from ? './asset/avatar.png' : './asset/robot-avatar.jpg';

        const chatContent = $$$('div');
        chatContent.className = 'chat-content';
        chatContent.innerText = data.content;

        const chatDate = $$$('div');
        chatDate.className = 'chat-date';
        chatDate.innerText = formatDate(data.createdAt);

        chatItem.appendChild(img);
        chatItem.appendChild(chatContent);
        chatItem.appendChild(chatDate);

        doms.chatContainer.appendChild(chatItem);
        setScroll(doms.chatContainer);
    }

    // 定义一个用来格式化时间的函数
    /**
     * 根据传入的时间戳返回一个这样格式的字符串：2022-04-04 14:12:22
     * @param {Number} timestamp 时间戳
     */
    function formatDate(timestamp) {
        const time = new Date(timestamp);

        const year = time.getFullYear();
        const month = time.getMonth().toString().padStart(2, '0');
        const date = (time.getDate() + 1).toString().padStart(2, '0');
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const seconds = time.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    }

    // 设置表单的提交事件
    doms.form.onsubmit = function(e) {
        e.preventDefault();
        // console.log(txtMsg.value.trim());
        sendMessage(txtMsg.value.trim());
    }

    // 设置关闭按钮的点击事件
    doms.close.onclick = function () {
        API.loginOut();
        location.href = './login.html';
    }

    // 定义一个用来调整滚动框位置的函数
    /**
     * 调整指定的元素调整它滚动框的位置
     * @param {DOM} dom 指定的元素
     */
    function setScroll(dom) {
        dom.scrollTop = dom.scrollHeight;
    }

    // 发送聊天信息
    /**
     * 根据传入的内容发送聊天信息
     * @param {String}  content 要发送的内容
     */
    async function sendMessage(content) {
        if (!content) {
            return;
        }
        addRecord({
            from: true,
            content,
            createdAt: Date.now(),
        });
        doms.txtMsg.value = '';
        const resq = await API.sendChat(content);
        addRecord({
            from: false,
            content:resq.data.content,
            createdAt: resq.data.createdAt,
        });
    }
})()