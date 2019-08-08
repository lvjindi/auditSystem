//index模块中所用到js
function menu() {
    var roleType = {};
    roleType.SUPER_ADMIN = 'Super Admin';
    roleType.OFFICE_HEAD = 'Office Head';
    roleType.DEAN = 'Dean';
    roleType.HEADMASTER_OFFICE = 'Headmaster Office';
    roleType.SECRETARY = 'Secretary';
    roleType.DIRECTOR = 'Directory';
    roleType.APPLICANT = 'Applicant';
    roleType.REGULAR_USER = 'Regular User';

    var leftPanel = document.getElementById('container-left');
    var rightPanel = document.getElementById('container-right');
    //普通用户显示的菜单栏
    var menuRU = ['职位浏览'];
    //申请设显示的菜单栏
    var menuAP = ['职位浏览', '历史纪录'];
    //办公室主任显示的菜单栏
    var menuOH = ['我的发布', '待处理任务', '历史纪录'];
    //其他
    var menuOther = ['待处理任务', '历史记录'];

    var value = permissionRole();
    var role = value[0];
    var topContainer = document.getElementById('container-top');
    //没有登录-创建登录按钮,否则创建退出按钮
    if (role == null) {
        var loginButton = document.createElement('button');
        loginButton.id = 'indexButton';

        var registerButton = loginButton.cloneNode(false);
        registerButton.style.background = 'white';
        registerButton.style.color = 'black';
        registerButton.style.marginRight = '50px';
        loginButton.innerText = '登录';
        loginButton.onclick = function () {
            window.location.href = 'login';
        }
        registerButton.innerText = '注册';
        registerButton.onclick = function () {
            window.location.href = 'register';
        }
        topContainer.appendChild(registerButton)
        topContainer.appendChild(loginButton)
    } else {
        var logoutButton = document.createElement('button');
        logoutButton.id = 'indexButton';
        logoutButton.innerText = '退出';
        logoutButton.style.marginRight = '50px';
        logoutButton.onclick = function () {
            $.ajax({
                type: 'GET',
                url: '/api/logout',
                dataType: 'json',
                success: function (data) {
                    alert("成功退出")
                    location.reload();

                }
            })
        }

        var namePanel = document.createElement('div');
        namePanel.style.fontSize = '16px';
        namePanel.innerText = value[1];
        namePanel.style.float = 'right';
        namePanel.style.marginRight = '20px';
        namePanel.style.marginTop = '30px';

        topContainer.appendChild(logoutButton);
        topContainer.appendChild(namePanel);
    }

    var menu = []
    if (role == roleType.REGULAR_USER || role == null) {
        menu = menuRU;
    } else if (role == roleType.APPLICANT) {
        menu = menuAP;
    } else if (role == roleType.OFFICE_HEAD) {
        var publicButton = document.createElement('button');
        publicButton.id = 'loginBtm';
        publicButton.innerText = '+发布招聘信息';
        publicButton.style.width = '80%';
        publicButton.style.marginLeft = '10%';
        publicButton.style.marginTop = '10px';
        publicButton.style.marginBottom = '15px';
        leftPanel.append(publicButton);

        publicButton.onclick = function () {
            rightPanel.src = 'jobPublic'
        }
        menu = menuOH;
    } else {
        menu = menuOther;
    }
    createMenu(menu, leftPanel)


}

function permissionRole() {
    var temp;
    $.ajax({
        type: 'GET',
        url: '/api/role',
        dataType: 'json',
        async: false,
        success: function (data) {
            temp = data;
        },
        error: function () {
            console.log()
        }
    })
    return temp;
}

function createMenu(menu, leftPanel) {
    for (var i = 0; i < menu.length; i++) {
        var panel = document.createElement('div');
        panel.style.width = '99.5%';
        panel.style.height = '30px';
        panel.style.background = 'linear-gradient(white 60%, #F2F2F2)';
        panel.innerText = menu[i];
        panel.style.textAlign = 'center';
        panel.style.lineHeight = '30px';
        panel.style.border = '#F2F2F2 solid 1px';
        leftPanel.append(panel);
    }
}