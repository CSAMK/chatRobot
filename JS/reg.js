// 注册页面事件
// 账号的类以及验证规则
const txtLoginId = new Validator('#txtLoginId',  async function (val) {
    if (!val) {
        return '账号不能为空！';
    }
    const result = await API.exists(val);
    // console.log(result)
    if (result.data) {
        return '此账号已经存在！';
    }
});

// 昵称的类以及验证规则
const txtNickname = new Validator('#txtNickname',  async function (val) {
    if (!val) {
        return '昵称不能为空！';
    }
});

// 密码的类以及验证规则
const txtLoginPwd = new Validator('#txtLoginPwd',async function (val) {
    if (!val) {
        return '密码不能为空！';
    }
});

// 二次密码的类以及验证规则
const txtLoginPwdConfirm = new Validator('#txtLoginPwdConfirm',async function (val) {
    if (!val) {
        return '密码不能为空！';
    }
    if (val !== txtLoginPwd.input.value) {
        return '两次密码不一样！';
    }
});

// 表单提交事件
const form = $('.user-form');
form.onsubmit = async function (e) {
    e.preventDefault();

    const result = await Validator.allValidation(txtLoginId,txtNickname,txtLoginPwd,txtLoginPwdConfirm);

    if (!result) {
        return;
    }

    const formData = new FormData(form);
    const obj = Object.fromEntries(formData.entries());

    API.reg(obj).then(() => {
        alert('注册成功！');
        location.href = './login.html';
    });
    
}