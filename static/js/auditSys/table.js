function nextStep() {
    setCookie('department', document.getElementsByName('department').value);
    setCookie('position', document.getElementsByName('position').value);
    setCookie('deadline', document.getElementsByName('deadline').value);
    setCookie('salary', document.getElementsByName('salary').value);
    setCookie('describe', document.getElementsByName('describe').value);
    setCookie('requirement', document.getElementsByName('requirement').value);
    window.location.href = 'tableName';
}

function setCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 60 * 60 * 1000);//一个小时后过期
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
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


function tableInit() {
    var url = window.location.href.split('?');
    var id = url[1].substr(url[1].indexOf('=') + 1, url[1].length - 1);
    var title = getTableName(id)

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

    //如果已经有改表格创建的问题，就创建当前已有的问题
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
            window.location.href = 'jobTemplate?id=' + id;
        }

        okBtn.onclick = function () {
            window.location.href = 'jobPublic'
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
            var container = document.getElementById('templateContainer');
            var pageTitle = document.createElement('div');
            pageTitle.id = 'pageTitle';
            pageTitle.style.marginBottom = '30px';
            pageTitle.style.marginTop = '20px';
            pageTitle.innerText = data[0]['table']['title'];
            var returnBtn = document.createElement('button');
            returnBtn.innerText = '返回';
            returnBtn.style.float = 'right';
            returnBtn.style.height = '35px';
            returnBtn.style.width = '70px';
            returnBtn.style.marginRight = '20px';

            returnBtn.onclick = function () {
                window.location.href = 'createTable?id=' + id;
            }

            container.appendChild(returnBtn);
            container.appendChild(pageTitle);

            for (var i = 0; i < data.length; i++) {
                var questionPanel = document.createElement('div');
                questionPanel.style.height = '15%';
                questionPanel.style.marginTop = '10px';
                questionPanel.style.marginLeft = '20px';
                questionPanel.style.width = '60%';
                questionPanel.style.paddingLeft = '25%';

                var label = document.createElement('label');
                var question;
                if (data[i]['answer_type'] == 'Text') {
                    question = document.createElement('input');
                    question.type = 'text';
                } else if (data[i]['answer_type'] == 'Text Area') {
                    question = document.createElement('textarea');
                } else {
                    question = document.createElement('input');
                    question.type = 'file';
                }
                question.id = 'question-' + data[i]['id'];

                label.innerText = data[i]['title'] + ':';
                questionPanel.appendChild(label);
                questionPanel.appendChild(question);

                container.appendChild(questionPanel);
            }
        },
        error: function () {
            alert("error")
        }
    })

}


function getTableName(id) {
    var name;
    $.ajax({
        type: 'GET',
        url: 'table?id=' + id,
        dataType: 'json',
        async: false,
        success: function (data) {
            name = data['title'];
        },
        error: function () {
            alert('ERROR');
            console.log();
        }
    })
    return name;
}

function getQuestion(id) {
    var tmp;
    $.ajax({
        type: 'GET',
        url: 'question?id=' + id,
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.length > 0) {
                tmp = data;
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