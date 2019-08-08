//account模块中所用到js
function register() {
    $.ajax({
        type: 'POST',
        url: '/api/register',
        data: $('registerForm').serialize(),
        dataType: 'json',
        success: function (data) {
            if (data.error) {
                alert(data.error)
            }
            else {
                alert("注册成功")
            }
        },
        error: function (data) {
            alert("失败")
        }
    })
}

function login() {
    $.ajax({
        type: 'POST',
        url: '/api/register',
        data: $('loginForm').serialize(),
        dataType: 'json',
        success: function (data) {
            alert("成功")
        },
        error: function () {
            alert("失败")
        }
    })
}