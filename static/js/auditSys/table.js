function nextStep() {
    storeCookie();
    window.location.href = 'tableName';
}


function storeCookie() {
    localStorage.setItem('departmentId', $('#department').combobox('getValue'));
    localStorage.setItem('position', $('#position').val());
    localStorage.setItem('deadline', $('#deadline').val());
    localStorage.setItem('salary', $('#salary').val());
    localStorage.setItem('describe', $('#describe').texteditor('getValue'));
    localStorage.setItem('requirement', $('#requirement').texteditor('getValue'));
    localStorage.setItem('other', $('#other').texteditor('getValue'));
}


function setCookie(name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    //如果有三个参数，最后一个参数是有效时间
    var expires = (argc > 2) ? argv[2] : null;
    if (expires != null) {
        var LargeExpDate = new Date();
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
    }
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString()));
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}


function tableName() {
    var title = document.getElementById('tableTitle').value;
    var data = {'title': title};
    $.ajax({
        type: 'POST',
        url: 'table',
        dataType: 'json',
        data: data,
        success: function (data) {
            setCookie('tableName', title);
            setCookie('tableId', data);
            window.location.href = 'createTable?table_id=' + data;
        },
        error: function (data) {
            alert("ERROR");
            console.log();
        }

    })
}

function createQuestion(id, type, title) {
    var question_id;
    var formData = {'id': id, 'type': type, 'title': title};
    $.ajax({
        type: 'POST',
        url: 'question',
        dataType: 'json',
        data: formData,
        async: false,
        success: function (data) {
            question_id = data['id'];
            alert("成功")
        },
        error: function () {
            alert("失败")
        }
    })
    return question_id;
}


function updateQuestion(id, type, title) {

    var formData = {'id': id, 'type': type, 'title': title};
    $.ajax({
        type: 'PUT',
        url: 'question',
        dataType: 'json',
        data: formData,
        success: function (data) {
            if (data.error) {
                alert(data.error)
            } else {
                alert("成功")
            }

        },
        error: function () {
            alert("失败")
        }
    })
}

function initTest() {
    var url = window.location.href.split('?');
    var id;
    var table_id;
    var tableName;

    if (url.length > 1) {
        if (url[1].indexOf('table_id=') != -1) {
            table_id = url[1].substr(url[1].indexOf('table_id=') + 9, url[1].length - 1);
            tableName = getCookie('tableName');
            transferBtn(table_id, tableName);
            setFormValue();
        } else if (url[1].indexOf('id=') != -1) {
            id = url[1].substr(url[1].indexOf('id=') + 3, url[1].length - 1);

            var returnBtn = document.createElement('button');
            returnBtn.innerText = '返回';
            returnBtn.style.float = 'right';
            returnBtn.style.height = '35px';
            returnBtn.style.width = '70px';
            returnBtn.style.marginRight = '20px';
            returnBtn.onclick = function () {
                history.go(-1);
            }

            document.getElementById('pageTitle').appendChild(returnBtn);

            setFormValue();
            var table = document.getElementById('publicTable');
            document.getElementById('publicTable').deleteRow(table.rows.length - 2);

            var btn = document.getElementById('submitJob');
            var parent = btn.parentNode;
            var newBtn = btn.cloneNode(false);
            newBtn.innerText = '编辑';
            newBtn.style.marginTop = '0';

            parent.removeChild(btn);
            parent.appendChild(newBtn);
            newBtn.onclick = function () {
                jobEdit(id);
            }
        }

    }

    function setFormValue() {
        $('#department').combobox('setValue', localStorage.getItem('departmentId'))
        var deadline = localStorage.getItem('deadline').replace(' ', 'T');
        localStorage.getItem('position') == null ?
            $('#position').val('') : $('#position').textbox('setValue', localStorage.getItem('position'));
        localStorage.getItem('deadline') == null ?
            $('#deadline').val('') : $('#deadline').val(deadline);
        localStorage.getItem('salary') == null ?
            $('#salary').val('') : $('#salary').textbox('setValue', localStorage.getItem('salary'));
        localStorage.getItem('describe') == null ?
            $('#describe').texteditor('setValue', '') : $('#describe').texteditor('setValue', localStorage.getItem('describe'));
        localStorage.getItem('requirement') == null ?
            $('#requirement').texteditor('setValue', '') : $('#requirement').texteditor('setValue', localStorage.getItem('requirement'));
        localStorage.getItem('other') == null ?
            $('#other').texteditor('setValue', '') : $('#other').texteditor('setValue', localStorage.getItem('other'));
    }


    function transferBtn(table_id, tableName) {
        var table_btn = document.getElementsByClassName('tabelBtm')[0];
        var next_ele = table_btn.nextElementSibling;
        var parent = table_btn.parentNode;
        parent.removeChild(table_btn);
        var a = document.createElement('a');
        a.href = 'createTable?id=' + table_id;
        a.innerText = tableName;
        a.onclick = function () {
            storeCookie();
        }
        parent.appendChild(a)
    }
}


function tableInit() {
    var url = window.location.href.split('?');
    var id = url[1].substr(url[1].indexOf('=') + 1, url[1].length - 1);

    var title = getCookie('tableName');

    var data = getQuestion(id);

    var br = document.createElement('br');

    var okBtn = document.createElement('button');
    okBtn.innerText = '完成';
    okBtn.style.float = 'right';
    okBtn.style.height = '35px';
    okBtn.style.width = '70px';
    okBtn.style.marginRight = '20px';

    var previewBtn = okBtn.cloneNode(false);
    previewBtn.style.background = 'white';
    previewBtn.style.color = 'black';
    previewBtn.style.border = 'darkGrey solid 1px';
    previewBtn.innerText = '预览';

    var pageTitle = document.createElement('div');
    pageTitle.id = 'pageTitle';
    pageTitle.style.marginBottom = '30px';
    pageTitle.style.marginTop = '20px';
    pageTitle.innerText = title;

    var moduleDiv = document.createElement('div');
    // moduleDiv.style.height = '200px';
    moduleDiv.style.width = '80%';
    moduleDiv.style.margin = '0px auto';
    moduleDiv.style.marginTop = '20px';

    var questionContainer = document.createElement('div');
    questionContainer.style.border = 'darkGrey solid 1px';
    questionContainer.style.width = '80%';
    questionContainer.style.height = '150px';
    questionContainer.style.margin = '10px auto';
    questionContainer.style.borderRadius = '10px';

    var panel = document.createElement('div');
    panel.style.width = '90%';
    panel.style.height = '20%';
    panel.style.marginTop = '10px';
    panel.style.marginLeft = '20px';

    var panel2 = panel.cloneNode(false);
    var questionLabel = document.createElement('label');
    questionLabel.innerText = '问题类型:';

    var questionType = document.createElement('select');
    questionType.options[0] = new Option('单项输入', 'Text');
    questionType.options[1] = new Option('矩阵输入', 'Text Area');
    questionType.options[2] = new Option('文件', 'File');
    questionType.options[3] = new Option('图片', 'Image');

    var questionDesLabel = questionLabel.cloneNode(false);
    questionDesLabel.innerText = '问题题目:';

    var quesDescribe = document.createElement('input');
    quesDescribe.type = 'text';

    var updateBtn = document.createElement('button');
    updateBtn.innerText = '更新';
    updateBtn.style.background = 'green';
    updateBtn.style.border = 'green 1px solid ';
    updateBtn.style.width = '70px';
    updateBtn.style.marginLeft = '40%';
    updateBtn.style.marginTop = '30px';

    var delBtn = updateBtn.cloneNode(false);
    delBtn.innerText = '删除';
    delBtn.style.border = 'red 1px solid ';
    delBtn.style.marginLeft = '10px';
    delBtn.style.background = 'red';

    var addBtn = document.createElement('button');
    addBtn.innerText = '添加';
    addBtn.style.marginLeft = '46%';
    addBtn.style.marginTop = '20px';

    var addQuesBtn = updateBtn.cloneNode(true);
    addQuesBtn.innerText = '添加';

    //如果已经有改表格创建的问题，就展示当前已有的问题
    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            var type = data[i]['answer_type'];
            var title = data[i]['title'];

            var newPanel = panel.cloneNode(false);
            var newPanel2 = panel2.cloneNode(false);
            var newQuestionLabel = questionLabel.cloneNode(true);
            var newQuestionType = questionType.cloneNode(true);
            var newQuestionDesLabel = questionDesLabel.cloneNode(true);
            var newQuesDescribe = quesDescribe.cloneNode(false);
            var addContainer = questionContainer.cloneNode(false);
            var newUpdateBtn = updateBtn.cloneNode(true);
            var newDelBtn = delBtn.cloneNode(true);

            newUpdateBtn.setAttribute('id', data[i]['id']);

            var all_options = newQuestionType.options;
            for (var j = 0; j < all_options.length; j++) {
                if (all_options[j].value == type) {
                    all_options[j].selected = true;
                }
            }
            newQuesDescribe.value = title;

            newPanel.appendChild(newQuestionLabel);
            newPanel.appendChild(newQuestionType);
            newPanel2.appendChild(newQuestionDesLabel);
            newPanel2.appendChild(newQuesDescribe);
            addContainer.appendChild(newPanel);
            addContainer.appendChild(newPanel2);
            addContainer.appendChild(newUpdateBtn);
            addContainer.appendChild(newDelBtn);
            moduleDiv.appendChild(addContainer);
            moduleDiv.appendChild(addBtn);
            updateBtnHandler(newUpdateBtn, newQuestionType, newQuesDescribe);
            delQuesBtnHandler(newDelBtn, addContainer, moduleDiv)

        }
    } else {
        panel.appendChild(questionLabel);
        panel.appendChild(questionType);
        panel2.appendChild(questionDesLabel);
        panel2.appendChild(quesDescribe);
        questionContainer.appendChild(panel);
        questionContainer.appendChild(panel2);
        questionContainer.appendChild(addQuesBtn);
        questionContainer.appendChild(delBtn);
        moduleDiv.appendChild(questionContainer);
        moduleDiv.appendChild(addBtn);
        addQuesBtnHandler(addQuesBtn, updateBtn, questionType, quesDescribe);
        updateBtnHandler(updateBtn, questionType, quesDescribe);
        delQuesBtnHandler(delBtn, questionContainer, moduleDiv)
    }

    function delQuesBtnHandler(delBtn, questionContainer, moduleDiv) {
        delBtn.onclick = function () {
            var pre_btn = delBtn.previousElementSibling;
            if (confirm("确认删除？")) {
                if (pre_btn.id != '') {
                    delQuestion(pre_btn.id)
                }
                moduleDiv.removeChild(questionContainer);
            }


        }
    }

    function addQuesBtnHandler(addQuesBtn, updateBtn, questionType, quesDescribe) {
        addQuesBtn.onclick = function () {
            var type = questionType.value;
            var title = quesDescribe.value;
            var question_id = createQuestion(id, type, title);
            var parent = addQuesBtn.parentNode;
            var pre_btn = addQuesBtn.previousElementSibling;
            parent.removeChild(addQuesBtn);
            updateBtn.setAttribute('id', question_id);
            pre_btn.after(updateBtn);
        }
    }

    function updateBtnHandler(updateBtn, questionType, quesDescribe) {
        updateBtn.onclick = function () {
            var type = questionType.value;
            var title = quesDescribe.value;
            updateQuestion(updateBtn.id, type, title);

        }


        addBtn.onclick = function () {

            var newPanel = panel.cloneNode(false);
            var newPanel2 = panel2.cloneNode(false);
            var newQuestionLabel = questionLabel.cloneNode(true);
            var newQuestionType = questionType.cloneNode(true);
            var newQuestionDesLabel = questionDesLabel.cloneNode(true);
            var newQuesDescribe = quesDescribe.cloneNode(true);
            var addContainer = questionContainer.cloneNode(false);
            var newAddQuesBtn = addQuesBtn.cloneNode(true);
            var newUpdateQuesBtn = updateBtn.cloneNode(true);
            var newDelBtn = delBtn.cloneNode(true);

            newPanel.appendChild(newQuestionLabel);
            newPanel.appendChild(newQuestionType);
            newPanel2.appendChild(newQuestionDesLabel);
            newPanel2.appendChild(newQuesDescribe);
            addContainer.appendChild(newPanel);
            addContainer.appendChild(newPanel2);
            addContainer.appendChild(newAddQuesBtn);
            addContainer.appendChild(newDelBtn);
            moduleDiv.appendChild(addContainer);

            var next_btn = addBtn.nextElementSibling;
            next_btn.after(addBtn);

            addQuesBtnHandler(newAddQuesBtn, newUpdateQuesBtn, newQuestionType, newQuesDescribe);
            delQuesBtnHandler(newDelBtn, addContainer, moduleDiv)
        }


        var container = document.getElementById('container');
        container.appendChild(okBtn);
        container.appendChild(previewBtn);
        container.appendChild(br);
        container.appendChild(pageTitle);
        container.appendChild(moduleDiv);

        previewBtn.onclick = function () {
            window.location.href = 'tableTemplate?id=' + id;
        }

        var host = window.location.host;
        var preUrl = 'http://' + host + '/api/jobManagement';

        if (document.referrer == preUrl) {
            okBtn.onclick = function () {
                window.location.href = 'jobManagement';
            }
        } else {
            okBtn.onclick = function () {
                window.location.href = 'jobPublic?table_id=' + id;
            }
        }


    }
}

function tableTemplateInit() {
    var url = window.location.href.split('?');
    var id = url[1].substr(url[1].indexOf('=') + 1, url[1].length - 1);

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'question?id=' + id,
        success: function (data) {
            if (!data.error) {
                var container = document.getElementById('templateContainer');
                var pageTitle = document.createElement('div');
                pageTitle.id = 'pageTitle';
                pageTitle.style.marginBottom = '30px';
                pageTitle.style.marginTop = '20px';
                pageTitle.innerText = data['rows'][0]['table']['title'];
                var returnBtn = document.createElement('button');
                returnBtn.innerText = '返回';
                returnBtn.style.float = 'right';
                returnBtn.style.height = '35px';
                returnBtn.style.width = '70px';
                returnBtn.style.marginRight = '20px';

                returnBtn.onclick = function () {
                    history.go(-1);
                }

                container.appendChild(returnBtn);
                container.appendChild(pageTitle);

                for (var i = 0; i < data['rows'].length; i++) {
                    var questionPanel = document.createElement('div');
                    questionPanel.style.height = '15%';
                    questionPanel.style.marginTop = '10px';
                    questionPanel.style.marginLeft = '20px';
                    questionPanel.style.width = '60%';
                    questionPanel.style.paddingLeft = '25%';
                    var br = document.createElement('br');
                    var label = document.createElement('label');
                    var question;
                    if (data['rows'][i]['answer_type'] == 'Text') {
                        question = document.createElement('input');
                        question.type = 'text';
                    } else if (data['rows'][i]['answer_type'] == 'Text Area') {
                        question = document.createElement('textarea');
                    } else {
                        question = document.createElement('input');
                        question.type = 'file';
                    }
                    question.id = 'question-' + data['rows'][i]['id'];

                    label.innerText = data['rows'][i]['title'] + ':';
                    questionPanel.appendChild(label);
                    questionPanel.appendChild(br);
                    questionPanel.appendChild(question);

                    container.appendChild(questionPanel);
                }
            } else {
                alert(data.error)
                top.location = 'login';//跳出iframe框架
            }

        },
        error: function () {
            alert("error")
        }
    })

}

function jobTemInit() {
    var url = window.location.href.split('?');
    var id = url[1].substr(url[1].indexOf('=') + 1, url[1].length - 1);

    var container = document.getElementById('jobTem');

    var pageTitle = document.createElement('div');
    pageTitle.id = 'pageTitle';
    pageTitle.style.marginBottom = '30px';
    pageTitle.style.marginTop = '20px';
    pageTitle.style.padding = '0px 0px';

    var returnBtn = document.createElement('button');
    returnBtn.innerText = '返回';
    returnBtn.style.float = 'right';
    returnBtn.style.height = '35px';
    returnBtn.style.width = '70px';
    returnBtn.style.marginRight = '20px';

    returnBtn.onclick = function () {
        history.go(-1);
    }

    container.appendChild(returnBtn)
    container.appendChild(pageTitle);
    var label = document.createElement('label');
    label.style.marginLeft = '15%';
    label.style.fontWeight = 'bold';

    var panel = document.createElement('div');
    panel.style.maxWidth = '70%';
    panel.style.height = 'auto';
    panel.style.margin = '10px auto';
    panel.style.background = '#F2F2F2';
    panel.style.letterSpacing = '2px';
    panel.style.padding = '5px 10px';


    pageTitle.innerText = localStorage.getItem('position');

    var div = document.createElement('div');
    div.style.width = '32%';
    div.style.margin = '-15px auto 30px auto';

    var time = document.createElement('label');
    time.style.fontSize = '12px';
    time.innerText = '创建时间：' + localStorage.getItem('create_time');

    var account = time.cloneNode(false);
    time.style.marginLeft = '20px';
    account.innerText = '浏览数：' + localStorage.getItem('account');

    div.appendChild(time);
    div.appendChild(account);
    container.appendChild(div);

    if (localStorage.getItem('salary') != null || localStorage.getItem('salary') != '') {
        var salaryLabel = label.cloneNode(false);
        salaryLabel.innerText = '薪资';
        var salaryPanel = panel.cloneNode(false);
        salaryPanel.innerText = localStorage.getItem('salary')
        container.appendChild(salaryLabel);
        container.appendChild(salaryPanel);
    }

    if (localStorage.getItem('department') != null || localStorage.getItem('department') != '') {
        var departLabel = label.cloneNode(false);
        departLabel.innerText = '招聘单位';
        var departPanel = panel.cloneNode(false);
        departPanel.innerText = localStorage.getItem('department');
        container.appendChild(departLabel);
        container.appendChild(departPanel);
    }

    if (localStorage.getItem('deadline') != null || localStorage.getItem('deadline') != '') {
        var deadLineLabel = label.cloneNode(false);
        deadLineLabel.innerText = '截止时间';
        var deadLinePanel = panel.cloneNode(false);
        deadLinePanel.innerText = localStorage.getItem('deadline');
        container.appendChild(deadLineLabel);
        container.appendChild(deadLinePanel);
    }

    if (localStorage.getItem('describe') != null || localStorage.getItem('describe') != '') {
        var descrLabel = label.cloneNode(false);
        descrLabel.innerText = '岗位描述';
        var descrPanel = panel.cloneNode(false);
        descrPanel.innerHTML = localStorage.getItem('describe');
        container.appendChild(descrLabel);
        container.appendChild(descrPanel);
    }

    if (localStorage.getItem('requirement') != null || localStorage.getItem('requirement') != '') {
        var reqLabel = label.cloneNode(false);
        reqLabel.innerText = '任职资格';
        var reqPanel = panel.cloneNode(false);
        reqPanel.innerHTML = localStorage.getItem('requirement');
        container.appendChild(reqLabel);
        container.appendChild(reqPanel);
    }

    if (localStorage.getItem('other') != null || localStorage.getItem('other') != '') {
        var otherLabel = label.cloneNode(false);
        otherLabel.innerText = '其他';
        var otherPanel = panel.cloneNode(false);
        otherPanel.innerHTML = localStorage.getItem('other');
        container.appendChild(otherLabel);
        container.appendChild(otherPanel);
    }

    // if (role != 'Office Head') {
    var appBtn = document.createElement('button');
    appBtn.style.height = '40px';
    appBtn.style.marginLeft = '45%';
    appBtn.style.marginTop = '30px';
    appBtn.innerText = '申请岗位';
    container.appendChild(appBtn);
    appBtn.onclick = function () {
        window.location.href = 'tableTemplate?id=' + getCookie('tableId');
    }
    // }


}

function publicJob() {
    var data = {
        'department': $('#department').combobox('getValue'),
        'position': $('#position').val(),
        'deadline': $('#deadline').val(),
        'salary': $('#salary').val(),
        'describe': $('#describe').texteditor('getValue'),
        'requirement': $('#requirement').texteditor('getValue'),
        'other': $('#other').texteditor('getValue'),
        'table_id': getCookie('tableId') == null ? '0' : getCookie('tableId'),

    }

    $.ajax({
        type: 'POST',
        url: 'job',
        data: data,
        async: true,
        dataType: 'json',
        success: function (data) {
            // delAllCookies();
            localStorage.clear();
            if (data.error) {
                alert(data.data)
            } else {
                alert("发布成功");
                window.location.href = 'jobPublic'
            }
        }
    })
}

function jobEdit(id) {
    alert($('#department').combobox('getValue'))
    var data = {
        'id': id,
        'department_id': $('#department').combobox('getValue'),
        'position': $('#position').val(),
        'deadline': $('#deadline').val(),
        'salary': $('#salary').val(),
        'describe': $('#describe').texteditor('getValue'),
        'requirement': $('#requirement').texteditor('getValue'),
        'other': $('#other').texteditor('getValue'),
        'table_id': getCookie('tableId') == null ? '0' : getCookie('tableId'),
    }
    $.ajax({
        type: 'PUT',
        url: 'job?id=' + id,
        data: data,
        dataType: 'json',
        success: function (data) {
            alert("编辑成功");
            // delAllCookies();
            localStorage.clear();
            window.location.href = 'jobManagement';
        },
        error: function () {
            alert("Error");
            console.log();
        }

    })
}

function getQuestion(id) {
    var tmp;
    $.ajax({
        type: 'GET',
        url: 'question?id=' + id,
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data['rows'].length > 0) {
                tmp = data['rows'];
            } else {
                tmp = null;
            }
        }

    })
    return tmp;
}

function delQuestion(id) {
    $.ajax({
        type: 'DELETE',
        url: 'question?id=' + id,
        dataType: 'json',
        success: function (data) {
            if (data.error) {
                alert(data.error)
            } else {
                alert('删除成功');
            }
        }

    })
}

