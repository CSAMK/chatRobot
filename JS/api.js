var API = (function () {
    // 定义常用地址
    const BASE_URL = 'https://study.duyiedu.com';

    /**
     * 定义用 get 请求发送的函数，返回一个 Promise 对象
     * @param {String} path URL地址
     * @returns Promise
     */
    function get(path) {
        // 定义一个请求头
        const headers = {};
        // 获取 token
        const TOKEN = localStorage.getItem('token');

        // 如果 TOKEN 有值，就把它放到请求头里面，方便验证身份
        if (TOKEN) {
            headers.authorization = `Bearer ${TOKEN}`;
        }
        return fetch(BASE_URL + path, {
            headers
        });
    }

    /**
     * 定义用 post 请求发送的函数，返回一个 Promise 对象
     * @param {String} path URL地址
     * @param {Object} bodyObj 对象
     * @returns 返回一个 Promise 对象
     */
    // 定义用 post 请求发送的函数
    function post(path, bodyObj) {
        // 定义一个请求头
        const headers = {
            'content-type': 'application/json'
        };
        // 获取 token
        const TOKEN = localStorage.getItem('token');

        // 如果 TOKEN 有值，就把它放到请求头里面，方便验证身份
        if (TOKEN) {
            headers.authorization = `Bearer ${TOKEN}`;
        }

        return fetch(BASE_URL + path, {
            method: 'POST',
            headers,
            body: JSON.stringify(bodyObj)
        })
    }

    // 注册接口
    async function reg(userInfo) {
        const resq = await post('/api/user/reg', userInfo);
        const data = await resq.json();
        return data;
    }

    // 登录接口
    async function login(loginInfo) {
        const resq = await post('/api/user/login', loginInfo);
        const data = await resq.json();
        if (data.code === 0) {
            localStorage.setItem('token', resq.headers.get('authorization'));
            return true;
        } else {
            return false;
        }
    }

    // 验证账号
    async function exists(loginId) {
        const resq = await get(`/api/user/exists?loginId=${loginId}`);
        const data = await resq.json();
        return data;
    }

    // 查看当前用户信息
    async function profile() {
        const resp = await get('/api/user/profile');
        const data = await resp.json();
        return data;
    }

    // 发送聊天信息
    async function sendChat(content) {
        const resq = await post('/api/chat', {
            content
        });
        const data = await resq.json();
        return data;
    }

    // 获取聊天记录
    async function getHistory() {
        const resq = await get('/api/chat/history');
        const data = await resq.json();
        return data;
    }

    // 注销账号
    function loginOut() {
        localStorage.removeItem('token');
    }
    
    return {
        reg,
        login,
        exists,
        profile,
        sendChat,
        getHistory,
        loginOut
    }
})();