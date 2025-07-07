 //============== Мое кастомное всплывающее окно alert==================================================
function MyCustomAlert(str) {
    str = str.replace(/\n/g, "<br>");
    var btn = document.createElement("button");
    var btn_stl = "position:relative; padding-right: 10px; font: 500 1em calibri; border:3px double #fff; border-radius:10px; background:royalblue; color: #fff;";
    btn.style = btn_stl;
    btn.innerHTML = "&nbsp;&nbsp;OK&nbsp;&nbsp;";
    var popupWnd = document.createElement("div");
    var stl = "border:3px solid lightblue;  border-radius:25px; min-height:100px; min-width:250px; max-width:450px; "
        + "padding-left: 20px; padding-right: 10px;padding-top: 10px;padding-bottom: 5px; font: 500 1.1em calibri; color: navy;"
        + "box-shadow:  1px 2px 1px #ddd, 2px 3px 1px #ddd";

    popupWnd.style = stl;
    popupWnd.innerHTML = "<div  id='ID_DIV'>" + str + "<br><br>";
    popupWnd.appendChild(btn);
    btn.style.left = "70%";
    btn.addEventListener("click", () => { document.body.removeChild(popupWnd); })

    popupWnd.style.position = "absolute";
    popupWnd.style.left = "45%";
    popupWnd.style.top = 0;
    popupWnd.style.backgroundColor = '#fff';
    document.body.appendChild(popupWnd);
} 

async function MyCustomConfirm(str) {
    if (str == "") return;
    str = str.replace(/\n/g, "<br>");
    var btn1 = document.createElement("button");
    var btn2 = document.createElement("button");
    var btn_stl = "position:relative; padding-right: 10px; font: 500 1em calibri; border:3px double #fff; border-radius:10px; background:royalblue; color: #fff;";
    btn1.style = btn_stl;
    btn2.style = btn_stl;
    btn1.innerHTML = "&nbsp;Да ";
    btn2.innerHTML = "&nbsp;Нет ";
    var popupWnd = document.createElement("div");
    var stl = "border:3px solid lightblue;  border-radius:25px; min-height:100px; min-width:150px; max-width:450px; "
        + "padding-left: 20px; padding-right: 10px;padding-top: 10px;padding-bottom: 5px; font: 500 1.1em calibri; color: navy;"
        + "box-shadow:  1px 2px 1px #ddd, 2px 3px 1px #ddd";

    popupWnd.style = stl;
    popupWnd.innerHTML = "<div  id='ID_DIV'>" + str + "<br><br>";
    popupWnd.appendChild(btn1);
    popupWnd.appendChild(btn2);
    btn1.style.left = "15%";
    btn2.style.left = "25%";
    popupWnd.style.position = "absolute";
    popupWnd.style.left = "50%";
    popupWnd.style.top ="2%";
    popupWnd.style.backgroundColor = '#fff';
     document.body.appendChild(popupWnd);
     btn1.addEventListener("click", () => { document.body.removeChild(popupWnd);   DeleteYes(); } );
     btn2.addEventListener("click", () => { document.body.removeChild(popupWnd);   DeleteNo(); } );
    }  
     
 