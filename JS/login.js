// 登录页面事件
// 账号的类以及验证规则
const txtLoginId = new Validator('#txtLoginId',  async function (val) {
    if (!val) {
        return '账号不能为空！';
    }
});

// 密码的类以及验证规则
const txtLoginPwd = new Validator('#txtLoginPwd',async function (val) {
    if (!val) {
        return '密码不能为空！';
    }
});

// 表单提交事件
const form = $('.user-form');
form.onsubmit = async function (e) {
    e.preventDefault();

    const result = await Validator.allValidation(txtLoginId,txtLoginPwd);

    if (!result) {
        return;
    }

    const formData = new FormData(form);
    const obj = Object.fromEntries(formData.entries());

    const req = await API.login(obj);
    if (!req) {
        alert('账号或密码有错误!');
        txtLoginPwd.input.value = '';
    }else {
        alert('登录成功！');
        location.href = './index.html'
    }
    
}