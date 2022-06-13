// 定义一个用来创建各个表单的验证器的构造函数
class Validator {
    /**
     * 构造器
     * @param {String} input 元素的类名
     * @param {Function} ruleFun 对应的规则函数
     */
    constructor(input,ruleFun) {
        this.input = $(input);
        this.p = this.input.nextElementSibling;
        this.ruleFun = ruleFun;
        this.input.onblur =  () => {
            this.validation();
        }
        
    }

    // 启动验证的方法
    validation = async () => {
        const err = await this.ruleFun(this.input.value);
        if (err) {
            this.p.innerText = err;
            return false;
        }else {
            this.p.innerText = '';
            return true;
        }
    }

    /**
     * 将需要验证规则的类传进来，如果全都符合要求了，才会返回 true
     * @param  {...any} v 传入由 Validator new 出来的类
     * @returns {Boolean} 返回布尔值
     */
    static allValidation = async (...v) => {
        const arr = v.map(async item => await item.validation());
        const resultArr =  await Promise.all(arr);
        return resultArr.every(result => result);
    }
}