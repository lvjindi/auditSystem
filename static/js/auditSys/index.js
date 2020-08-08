//index模块中所用到js

function index() {
    // var container = document.getElementById('container-right');
     var container = window.parent.document.getElementById("container-right");
     var circle=document.createElement('div');
     var name=document.createElement('div');
     var words=document.createElement('div');
     circle.className='circle';
     name.className='data';
     words.className='words';
    $.ajax({
        type: 'GET',
        url: 'http://'+window.location.host+':8080/modelSet/getModelNum',
        dataType: 'json',
        async: false,
        success: function (data) {
            for(var i=0;i<data.content.length;i++){
                var circle1=circle.cloneNode(true);
                var name1=name.cloneNode(true);
                var words1= words.cloneNode(true);
                circle1.style.marginLeft=''+(38/(data.content.length+1))+'%';
                words1.innerText=data.content[i].modelName;
                name1.innerText=data.content[i].number;
                var url="pages/netDisplay.html?category="+words1.textContent;
                clickHandler(circle1, url, container);
                circle1.appendChild(words1);
                circle1.appendChild(name1);
                document.body.appendChild(circle1);
            }

        },
        error: function () {
            console.log()
        }
    })


}

function clickHandler(panel, url, container) {
    panel.onclick = function () {
        container.src = url;
    }
}

function DisplaySubMenu1() {
    var container = document.getElementById('container-right1');
    window.location.href='../index.html';

}

function DisplaySubMenu2() {
    var x;
    var submenu;
    var container = document.getElementById('container-right1');
    var url = ['treeDisplay.html', 'optimizerDisplay.html', 'platformDisplay.html', 'dataSetDisplay.html','netStructDisplay.html','providerDisplay.html','modelInfoDisplay.html','modelSetDisplay.html'];
    x = document.getElementById("submenu2");
    submenu = x.getElementsByTagName("li");
    let n = submenu.length;
    for (var i = 0; i < n; i++) {
        submenu[i].style.background = "white";
        if (submenu[i].style.display == 'none') {
            submenu[i].style.display = 'block';
            clickHandler(submenu[i], url[i], container);
        } else submenu[i].style.display = 'none';
    }
}

