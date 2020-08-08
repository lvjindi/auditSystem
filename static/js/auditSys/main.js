
/**
 * 优化器添加
 * **/
function optimizerAdd() {
    var data = {
        'name': $('#name').val(),
        'description': $('#description').val(),
    }
    $.ajax({
        type: 'POST',
        url:'http://'+window.location.host+ ':8080/optimizer/create',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.error) {
                alert(data.data)
            } else {
                alert("添加成功");
                window.location.href = 'optimizerDisplay.html'
            }
        }
    })
}

/**
 * 平台添加
 * **/
function platformAdd() {
    var data = {
        'content': $('#content').val(),
        'description': $('#description').val(),
    }
    $.ajax({
        type: 'POST',
        url: 'http://'+window.location.host+ ':8080/platform/create',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.error) {
                alert(data.data)
            } else {
                alert("添加成功");
                window.location.href = 'platformDisplay.html'
            }
        }
    })
}

function dataSetAdd() {
    var data = {
        'dsName': $('#dsName').val(),
        'description': $('#description').val(),
        'extend': $('#extend').val(),
        'downloadUrl': $('#downloadUrl').val(),
    }
    $.ajax({
        type: 'POST',
        url:'http://'+window.location.host+':8080/dataset/create',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.error) {
                alert(data.data)
            } else {
                alert("添加成功");
                window.location.href = 'dataSetDisplay.html'
            }
        }
    })
}

function netStructAdd() {
    var data = {
        'content': $('#content').val(),
        'description': $('#description').val(),
    }
    $.ajax({
        type: 'POST',
        url: 'http://'+window.location.host+':8080/netstruct/create',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.error) {
                alert(data.data)
            } else {
                alert("添加成功");
                window.location.href = 'netStructDisplay.html'
            }
        }
    })
}

function providerAdd() {
    var data = {
        'name': $('#name').val(),
        'introduce': $('#introduce').val(),
        'email': $('#email').val(),
        'phone': $('#phone').val(),
    }
    $.ajax({
        type: 'POST',
        url: 'http://'+window.location.host+ ':8080/provider/create',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.error) {
                alert(data.data)
            } else {
                alert("添加成功");
                window.location.href = 'providerDisplay.html'
            }
        }
    })
}

function categoryAdd() {
    var data = {
        'modelName': $('#modelName').val(),
        'description': $('#description').val(),
        'parentId': $('#parentId').combobox('getValue'),
    }
    $.ajax({
        type: 'POST',
        url:'http://'+window.location.host+ ':8080/category/create',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.error) {
                alert(data.data)
            } else {
                var prevurl = document.referrer;
                if (prevurl.search('categoryDisplay') != -1) {
                    alert("添加成功");
                    window.location.href = 'categoryDisplay.html';
                } else {
                    alert("添加成功");
                    window.location.href = 'treeDisplay.html';
                }
            }
        },
        error: function () {
            alert("Error");
            console.log();
        }

    })
}

function modelInfoAdd() {
    // var file=$("#pythonFile").filebox("files")[0];
    // alert(file);
    var data = {
        'modelName': $('#modelName').val(),
        'function': $('#function').val(),
        'netStructId': $('#netStructId').combobox('getValue'),
        'evaluation': $('#evaluation').val(),
        'pythonFile': $('#pythonFile').filebox('getText'),
        'picture': $('#picture').filebox('getText'),
        'creator': $('#creator').combobox('getValue'),
        'modelSize': $('#modelSize').val(),
    }
    $.ajax({
        type: 'POST',
        url:'http://'+window.location.host+ ':8080/model/create',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.error) {
                alert(data.data)
            } else {
                alert("添加成功");
                window.location.href = 'modelInfoDisplay.html'
            }
        }
    })
}

function modelSetAdd() {
    // var file=$("#pythonFile").filebox("files")[0];
    // alert(file);
    var data = {

        'modelId': $('#modelId').combobox('getValue'),
        'categoryId': $('#categoryId').combobox('getValue'),
        'optimizerId': $('#optimizerId').combobox('getValue'),
        'platformId': $('#platformId').combobox('getValue'),
        'dataId': $('#dataId').combobox('getValue'),
        'providerId': $('#providerId').combobox('getValue'),
        'modelFile': $('#modelFile').filebox('getText'),
        'performance': $('#performance').val(),
    }
    $.ajax({
        type: 'POST',
        url: 'http://'+window.location.host+ ':8080/modelSet/create',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.error) {
                alert(data.data)
            } else {
                alert("添加成功");
                window.location.href = 'modelSetDisplay.html'
            }
        }
    })
}


function optimizerJudge() {
    var url = window.location.href.split('?');
    var id;
    if (url.length > 1) {
        if (url[1].indexOf('id=') != -1) {
            id = url[1].substr(url[1].indexOf('id=') + 3, url[1].length - 1);
            localStorage.getItem('name') == null ?
                $("#name").textbox("setValue", '') : $("#name").textbox("setValue", localStorage.getItem('name'));
            localStorage.getItem('description') == null ?
                $("#description").textbox("setValue", '') : $("#description").textbox("setValue", localStorage.getItem('description'));
            var btn = document.getElementById('submitJob');
            var parent = btn.parentNode;
            var newBtn = btn.cloneNode(false);
            newBtn.innerText = '编辑';
            newBtn.style.marginTop = '0';
            parent.removeChild(btn);
            parent.appendChild(newBtn);
            newBtn.onclick = function () {
                optimizerEdit(id);
            }
        }
    }
}

function optimizerEdit(id) {
    var data = {
        'id': id,
        'name': $('#name').val(),
        'description': $('#description').val(),
    }
    $.ajax({
        type: 'POST',
        url: 'http://'+window.location.host+':8080/optimizer/update?id=' + id,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            alert("编辑成功");
            localStorage.clear();
            window.location.href = 'optimizerDisplay.html';
        },
        error: function () {
            alert("Error");
            console.log();
        }

    })
}

function platformJudge() {
    var url = window.location.href.split('?');
    var id;
    if (url.length > 1) {
        if (url[1].indexOf('id=') != -1) {
            id = url[1].substr(url[1].indexOf('id=') + 3, url[1].length - 1);
            localStorage.getItem('content') == null ?
                $("#content").textbox("setValue", '') : $("#content").textbox("setValue", localStorage.getItem('content'));
            localStorage.getItem('description') == null ?
                $("#description").textbox("setValue", '') : $("#description").textbox("setValue", localStorage.getItem('description'));
            var btn = document.getElementById('submitJob');
            var parent = btn.parentNode;
            var newBtn = btn.cloneNode(false);
            newBtn.innerText = '编辑';
            newBtn.style.marginTop = '0';
            parent.removeChild(btn);
            parent.appendChild(newBtn);
            newBtn.onclick = function () {
                platformEdit(id);
            }
        }
    }
}

function platformEdit(id) {
    var data = {
        'id': id,
        'content': $('#content').val(),
        'description': $('#description').val(),
    }
    $.ajax({
        type: 'POST',
        url: 'http://'+window.location.host+':8080/platform/update?id=' + id,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            alert("编辑成功");
            localStorage.clear();
            window.location.href = 'platformDisplay.html';
        },
        error: function () {
            alert("Error");
            console.log();
        }

    })
}

function dataSetJudge() {
    var url = window.location.href.split('?');
    var id;
    if (url.length > 1) {
        if (url[1].indexOf('id=') != -1) {
            id = url[1].substr(url[1].indexOf('id=') + 3, url[1].length - 1);
            localStorage.getItem('dsName') == null ?
                $("#dsName").textbox("setValue", '') : $("#dsName").textbox("setValue", localStorage.getItem('dsName'));
            localStorage.getItem('description') == null ?
                $("#description").textbox("setValue", '') : $("#description").textbox("setValue", localStorage.getItem('description'));
            localStorage.getItem('extend') == null ?
                $("#extend").textbox("setValue", '') : $("#extend").textbox("setValue", localStorage.getItem('extend'));
            localStorage.getItem('downloadUrl') == null ?
                $("#downloadUrl").textbox("setValue", '') : $("#downloadUrl").textbox("setValue", localStorage.getItem('downloadUrl'));
            var btn = document.getElementById('submitJob');
            var parent = btn.parentNode;
            var newBtn = btn.cloneNode(false);
            newBtn.innerText = '编辑';
            newBtn.style.marginTop = '0';
            parent.removeChild(btn);
            parent.appendChild(newBtn);
            newBtn.onclick = function () {
                dataSetEdit(id);
            }
        }
    }
}

function dataSetEdit(id) {
    var data = {
        'id': id,
        'dsName': $('#dsName').val(),
        'description': $('#description').val(),
        'extend': $('#extend').val(),
        'downloadUrl': $('#downloadUrl').val(),
    }
    $.ajax({
        type: 'POST',
        url: 'http://'+window.location.host+':8080/dataset/update?id=' + id,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            alert("编辑成功");
            localStorage.clear();
            window.location.href = 'dataSetDisplay.html';
        },
        error: function () {
            alert("Error");
            console.log();
        }

    })
}

function netStructJudge() {
    var url = window.location.href.split('?');
    var id;
    if (url.length > 1) {
        if (url[1].indexOf('id=') != -1) {
            id = url[1].substr(url[1].indexOf('id=') + 3, url[1].length - 1);
            localStorage.getItem('content') == null ?
                $("#content").textbox("setValue", '') : $("#content").textbox("setValue", localStorage.getItem('content'));
            localStorage.getItem('description') == null ?
                $("#description").textbox("setValue", '') : $("#description").textbox("setValue", localStorage.getItem('description'));
            var btn = document.getElementById('submitJob');
            var parent = btn.parentNode;
            var newBtn = btn.cloneNode(false);
            newBtn.innerText = '编辑';
            newBtn.style.marginTop = '0';
            parent.removeChild(btn);
            parent.appendChild(newBtn);
            newBtn.onclick = function () {
                netStructEdit(id);
            }
        }
    }
}

function netStructEdit(id) {
    var data = {
        'id': id,
        'content': $('#content').val(),
        'description': $('#description').val(),
    }
    $.ajax({
        type: 'POST',
        url:  'http://'+window.location.host+':8080/netstruct/update?id=' + id,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            alert("编辑成功");
            localStorage.clear();
            window.location.href = 'netStructDisplay.html';
        },
        error: function () {
            alert("Error");
            console.log();
        }

    })
}

function providerJudge() {
    var url = window.location.href.split('?');
    var id;
    if (url.length > 1) {
        if (url[1].indexOf('id=') != -1) {
            id = url[1].substr(url[1].indexOf('id=') + 3, url[1].length - 1);
            localStorage.getItem('name') == null ?
                $("#name").textbox("setValue", '') : $("#name").textbox("setValue", localStorage.getItem('name'));
            localStorage.getItem('introduce') == null ?
                $("#introduce").textbox("setValue", '') : $("#introduce").textbox("setValue", localStorage.getItem('introduce'));
            localStorage.getItem('email') == null ?
                $("#email").textbox("setValue", '') : $("#email").textbox("setValue", localStorage.getItem('email'));
            localStorage.getItem('phone') == null ?
                $("#phone").textbox("setValue", '') : $("#phone").textbox("setValue", localStorage.getItem('phone'));
            var btn = document.getElementById('submitJob');
            var parent = btn.parentNode;
            var newBtn = btn.cloneNode(false);
            newBtn.innerText = '编辑';
            newBtn.style.marginTop = '0';
            parent.removeChild(btn);
            parent.appendChild(newBtn);
            newBtn.onclick = function () {
                providerEdit(id);
            }
        }
    }
}

function providerEdit(id) {
    var data = {
        'id': id,
        'name': $('#name').val(),
        'introduce': $('#introduce').val(),
        'email': $('#email').val(),
        'phone': $('#phone').val(),
    }
    $.ajax({
        type: 'POST',
        url:  'http://'+window.location.host+':8080/provider/update?id=' + id,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            alert("编辑成功");
            localStorage.clear();
            window.location.href = 'providerDisplay.html';
        },
        error: function () {
            alert("Error");
            console.log();
        }

    })
}


function categoryJudge() {
    var url = window.location.href.split('?');
    var id;
    if (url.length > 1) {
        if (url[1].indexOf('id=') != -1) {
            id = url[1].substr(url[1].indexOf('id=') + 3, url[1].length - 1);
            $('#parentId').combobox('setValue', localStorage.getItem('parentId'));
            localStorage.getItem('modelName') == null ?
                $("#modelName").textbox("setValue", '') : $("#modelName").textbox("setValue", localStorage.getItem('modelName'));
            localStorage.getItem('description') == null ?
                $("#description").textbox("setValue", '') : $("#description").textbox("setValue", localStorage.getItem('description'));

            var btn = document.getElementById('submitJob');
            var parent = btn.parentNode;
            var newBtn = btn.cloneNode(false);
            newBtn.innerText = '编辑';
            newBtn.style.marginTop = '0';
            parent.removeChild(btn);
            parent.appendChild(newBtn);
            newBtn.onclick = function () {
                categoryEdit(id);
            }
        }
    }
}

function categoryEdit(id) {
    var data = {
        'id': id,
        'modelName': $('#modelName').val(),
        'description': $('#description').val(),
        'parentId': $('#parentId').combobox('getValue'),
    }
    $.ajax({
        type: 'POST',
        url: 'http://'+window.location.host+':8080/category/update?id=' + id,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            alert("编辑成功");
            localStorage.clear();
            window.location.href = 'categoryDisplay.html';
        },
        error: function () {
            alert("Error");
            console.log();
        }

    })
}


function modelInfoJudge() {
    var url = window.location.href.split('?');
    var id;
    if (url.length > 1) {
        if (url[1].indexOf('id=') != -1) {
            id = url[1].substr(url[1].indexOf('id=') + 3, url[1].length - 1);
            $('#netStructId').combobox('setValue', localStorage.getItem('netStructId'));
            $('#creator').combobox('setValue', localStorage.getItem('creator'));
            localStorage.getItem('modelName') == null ?
                $("#modelName").textbox("setValue", '') : $("#modelName").textbox("setValue", localStorage.getItem('modelName'));
            localStorage.getItem('function') == null ?
                $("#function").textbox("setValue", '') : $("#function").textbox("setValue", localStorage.getItem('function'));
            localStorage.getItem('evaluation') == null ?
                $("#evaluation").textbox("setValue", '') : $("#evaluation").textbox("setValue", localStorage.getItem('evaluation'));
            localStorage.getItem('description') == null ?
                $("#description").textbox("setValue", '') : $("#description").textbox("setValue", localStorage.getItem('description'));
            localStorage.getItem('pythonFile') == null ?
                $("#pythonFile").filebox('setText', '') : $("#pythonFile").filebox('setText', localStorage.getItem('pythonFile'));
            localStorage.getItem('picture') == null ?
                $("#picture").filebox('setText', '') : $("#picture").filebox('setText', localStorage.getItem('picture'));
            localStorage.getItem('modelSize') == null ?
                $("#modelSize").textbox("setValue", '') : $("#modelSize").textbox("setValue", localStorage.getItem('modelSize'));
            var btn = document.getElementById('submitJob');
            var parent = btn.parentNode;
            var newBtn = btn.cloneNode(false);
            newBtn.innerText = '编辑';
            newBtn.style.marginTop = '0';
            parent.removeChild(btn);
            parent.appendChild(newBtn);
            newBtn.onclick = function () {
                modelInfoEdit(id);
            }
        }
    }
}

function modelInfoEdit(id) {
    var data = {
        'id':id,
        'modelName': $('#modelName').val(),
        'function': $('#function').val(),
        'netStructId': $('#netStructId').combobox('getValue'),
        'evaluation': $('#evaluation').val(),
        'pythonFile': $('#pythonFile').filebox('getText'),
        'picture': $('#picture').filebox('getText'),
        'creator': $('#creator').combobox('getValue'),
        'modelSize': $('#modelSize').val(),
    }
    $.ajax({
        type: 'POST',
        url: 'http://'+window.location.host+':8080/model/update?id=' + id,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            alert("编辑成功");
            localStorage.clear();
            window.location.href = 'modelInfoDisplay.html';
        },
        error: function () {
            alert("Error");
            console.log();
        }

    })
}


function modelSetJudge() {
    var url = window.location.href.split('?');
    var id;
    if (url.length > 1) {
        if (url[1].indexOf('id=') != -1) {
            id = url[1].substr(url[1].indexOf('id=') + 3, url[1].length - 1);
            $('#modelId').combobox('setValue', localStorage.getItem('modelId'));
            $('#categoryId').combobox('setValue', localStorage.getItem('modelsunId'));
             $('#optimizerId').combobox('setValue', localStorage.getItem('optimizerId'));
            $('#platformId').combobox('setValue', localStorage.getItem('platformId'));
             $('#dataId').combobox('setValue', localStorage.getItem('dataId'));
            $('#providerId').combobox('setValue', localStorage.getItem('providerId'));
            localStorage.getItem('performance') == null ?
                $("#performance").textbox("setValue", '') : $("#performance").textbox("setValue", localStorage.getItem('performance'));
            localStorage.getItem('modelFile') == null ?
                $("#modelFile").filebox('setText', '') : $("#modelFile").filebox('setText', localStorage.getItem('modelFile'));

            var btn = document.getElementById('submitJob');
            var parent = btn.parentNode;
            var newBtn = btn.cloneNode(false);
            newBtn.innerText = '编辑';
            newBtn.style.marginTop = '0';
            parent.removeChild(btn);
            parent.appendChild(newBtn);
            newBtn.onclick = function () {
                modelSetEdit(id);
            }
        }
    }
}

function modelSetEdit(id) {
    var data = {
        'id':id,
        'modelId': $('#modelId').combobox('getValue'),
        'categoryId': $('#categoryId').combobox('getValue'),
        'optimizerId': $('#optimizerId').combobox('getValue'),
        'platformId': $('#platformId').combobox('getValue'),
        'dataId': $('#dataId').combobox('getValue'),
        'providerId': $('#providerId').combobox('getValue'),
        'performance': $('#performance').val(),
        'modelFile': $('#modelFile').filebox('getText'),
    }
    $.ajax({
        type: 'POST',
        url: 'http://'+window.location.host+ ':8080/modelSet/update?id=' + id,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            alert("编辑成功");
            localStorage.clear();
            window.location.href = 'modelSetDisplay.html';
        },
        error: function () {
            alert("Error");
            console.log();
        }

    })
}


