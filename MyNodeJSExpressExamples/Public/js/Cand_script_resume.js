    //-----------------------------------Сокрытие/отображение разделов резюме----------------------------------------
    function f1(id) {
     document.getElementById(id).classList.toggle('hide');
    var id_ = id + '_';
    if (document.getElementById(id_).innerText === '▷')
    document.getElementById(id_).innerText = '◤';
     else document.getElementById(id_).innerText = '▷';
        }
//----------------------------------Раздел 2-Вуз, факультет, специализация, уровень. Определение переменных, обработчиков событий ----------------------------------------
 var VUZ = null; 
 var FAC = null;
var selFac = null;
function PrepVar_1(  ) {
         if (VUZ === null) VUZ = document.getElementById('Cand_Institute');
         if (FAC === null) FAC = document.getElementById('Cand_Faculty');
        FAC.addEventListener ( 'focus', () => {                                              // поле  Cand_Faculty получает фокус
                 if (VUZ.value != 'МГУ им. адм. Невельского Г.И.')                //  если VUZ != МГУ, удалить символы '*'
                 {       var v1 = FAC.parentElement;
                          v1.innerHTML = (v1.innerHTML).replace('*', '');
                          v1 = document.getElementById('Cand_Specialization').parentElement;
                          v1.innerHTML = (v1.innerHTML).replace('*', '');
                 }
                 else { selFac = document.querySelector('#sel1');
                             if (json_ === null) ListFaculties();
                          }                                      // иначе прочитать списки факультетов, спец,
        });
}
    var json_ = null;                                                         // Чтение списка факультетов MГУ из candResumeFaculties.txt
    var N = 0;
    async function ListFaculties()                                                                // получение списка факультетов
    {           var response = await fetch('TEXT/candResumeFaculties_New.txt');     // чтение текстового файла
                var text = await response.text();                                                   // console.log(text);                 alert (text);
                 json_ = JSON.parse(text);                                                              // преобразование   текстовой строки в JSON
                 console.log (json_);
                 N = json_.Faculties.length;                                                            //alert(json_.Faculties[0].Faculty);
                             // формирование  <option> для  select
                 var select_options = "<option selected value='Выбрать из списка' >Выбрать из списка</option>";
                 for (var i = 0; i < N; i++)
                         select_options += "<option value='" + json_.Faculties[i].Faculty + "'> " + json_.Faculties[i].Faculty +  "</option>";
                  selFac.innerHTML = select_options;             // добавление набора <option> в select
    }

  var sel1_index = 0;                                                 //№ выбранного факультета
  var obj_fac = null;
    var selSpec = null;
  function Faculty()
    {       //    alert ("Faculty()");                                                                        //Функция-обработчик установки курсора в поле Cand_Faculty
               selSpec = document.querySelector('#sel2');                  
               selFac.classList.remove("hide");                                                                // показ списка select
               sel1_index = 0;
               selFac.addEventListener('change', function (e) {                                      // выбор элемента списка
                                var   facName = e.target.value;
                                sel1_index = selFac.selectedIndex - 1;                                        // индекс эл-та  alert("index = " + sel1_index);
                                selFac.classList.add("hide");                                                           //сокрытие select
                               FAC.value = facName;          // элемент списка -> поле Cand_Faculty
                                                                                    // создать список  специализаций для выбранного факультета
                               var select_options = "<option selected value='Выбрать из списка' >Выбрать из списка</option>";
                                obj_fac = json_.Faculties[sel1_index];
                                var N1 = obj_fac.Specializations.length;                                        // число специал. alert("n1 = " + N1);
                                                                                     // формирование  <option> для  select
                                for (var i = 0; i < N1; i++)
                                                 select_options += "<option value='" + obj_fac.Specializations[i].Name + "'> " +
                                                                                      obj_fac.Specializations[i].Name + "</option>";
                                selSpec.innerHTML = select_options;                                               // добавление набора <option> в select
                                                                                                                   });
}
  var sel2_index = 0;                                                                                                              //№ выбранной специализации
  function FacSpecialization()                        //Функция - обработчик установки курсора в поле Cand_Specialization
  {                  sel2_index = 0;
                      selSpec.classList.remove("hide");                                                                                      // показ select
                      selSpec.addEventListener('change', function (e) {                                                        // выбор элемента списка
                                      var specName = e.target.value;
                                     sel2_index = selSpec.selectedIndex - 1;                                                          //alert("index = " + sel2_index);
                                     selSpec.classList.add("hide");                                                                           //сокрытие select
                                     document.querySelector('#Cand_Specialization').value = specName;   // элемент списка -> поле Cand_Specialization
                                     var level_ = obj_fac.Specializations[sel2_index].Level;                               // уровень данной специализации
                                    document.querySelector('#Cand_Level').value = level_;                            // уровень -> поле Cand_Level
                                                                                                                      });
        }
//-----------------------------------Раздел- 3-Доп. образование------------------------------------------------------------
var N_AddEdu = 1;                                                                                                                           // всего позиций по Доп.Образ.,  заполненных позиций 
                                                                                                                                                               // может быть на 1 меньше
function ShowPos_AddEdu() {
           document.querySelector('#Cand_Date1__').disabled = false;
           document.querySelector('#Cand_Date2__').disabled = false;
           document.querySelector('#Cand_Specialization_').disabled = false;
          N_AddEdu = document.querySelectorAll('#Cand_Institute__').length;
}
function Check_AddNewPos_AddEdu()
{        var selectors = new Array('#Cand_Institute__', '#Cand_Date1__', '#Cand_Date2__', '#Cand_Specialization_');
         var t = false;
         for (var i = 0; i < 4; i++)
         {   var objs = document.querySelectorAll(  selectors[i] );
              for (var j = 0; j < objs.length; j++)
              {          t = objs[j].value == "" || objs[j].value == null  ;
                  if (t) { alert("Один или нсколько пунктов раздела о дополнительном образовании заполнены неправильно");
                              return false; }
             }
         } 
         N_AddEdu = document.querySelectorAll('#Cand_Institute__').length;
          return true;
}   
  var ins_AddEdu = new Array("Вуз",
                                                     "<input type='text' name='Cand_Institute__'  value=''  />",
                                                     "Период обучения", 
                                                      "<input type='date' class='shortDate' name='Cand_Date1__'  id='Cand_Date1__'  value=''  />   &nbsp;  -  &nbsp;"
                                                 +  " <input type='date' class='shortDate' name='Cand_Date2__'  id='Cand_Date2__'  value=''  /> ", 
                                                     "Специализация",
                                                     "<textarea rows='2' name='Cand_Specialization_'   id='Cand_Specialization_'></textarea>"
                                                    );
function AddNewPos_AddEdu()
{           if ( !Check_AddNewPos_AddEdu() )  return ;
            var ins = document.getElementById("INSERT_1");
            var parent = ins.parentNode;
            for (var i = 0; i < 6; i++)
              {  var d1 = document.createElement("div");
                  d1.innerHTML = ins_AddEdu[i];
                  parent.insertBefore(d1, ins);
              }
}
 //-----------------------------------Раздел- 4-Доп. подготовка ----------------------------------------------------
var selSkill = null;
 function PC_Skill() {
                  selSkill = document.querySelector('#sel3');
                  selSkill.classList.remove("hide");                                                                         // показ select
                 selSkill.addEventListener('change', function (e)
                                {      var skill = e.target.value;                                                                  // выбор элемента списка
                                        selSkill.classList.add("hide");                                                          //сокрытие select
                                       document.querySelector('#Cand_Skill').value = skill;                    // уровень -> поле Cand_Skill
                               } );
     }
    var langSkill = null;
    function Lang_Skill() {
                 langSkill = document.querySelector('#sel4');
                 langSkill.classList.remove("hide");                                                                        // показ select
                langSkill.addEventListener('change', function (e) {                                                // выбор элемента списка
                                        var skill = e.target.value;
                                         langSkill.classList.add("hide");                                                            //сокрытие select
                                         document.querySelector('#Cand_Lang_Level').value = skill;          // уровень -> поле Cand_Lang_Level
            });
        }
//-----------------------------------Раздел- 5-Доп. сведения ----------------------------------------------------
function IncreeseField() {                                                         // увеличение поля для сопроводительного письма
                         var field = document.querySelector('#Cand_AddLetter');
                            var rows = field.rows;
                           if (field.rows == "30") field.setAttribute("rows", "2")
                           else field.setAttribute("rows", "30")
}
 //=======================Методы обработки графических файлов соискателя===========================================
var Client_Files = [ null, null, null, null, null ];
var Client_Files_Number = 0;                                                                                 // число загруженных  файлов

function ShowHideFile(num)                                                                                   //показать/скрыть изображение
{   if (num == -1) num = "photo";                                                                          
    var objImage = document.getElementById('image_' + num);                       //  alert(objImage.src);
    if (objImage.src.substring(0, 4) === 'data' || objImage.src.substring(0, 4) === 'blob')
        objImage.src = "";
     else objImage.src = Client_Files[num];                                                            //  alert(num);
}

const sz1 = "max-height: 200px; max-width: 200px;";
const sz2 = "max-height: 500px; max-width:500px;";
function IncDecFile(num) {
    if (num == -1) num = "photo";
    var objImage = document.getElementById('image_' + num);
    var st = objImage.getAttribute("style");
    if (st == sz1) st = sz2;
    else st = sz1;
    objImage.setAttribute("style", st);
}

function AddUpdFile(num)                                                                                         // Вставить/изменить файл  
{   if (num >= 4) return;
    if (num == -1) num = "photo";                                                                               // alert(num);
    var input = document.getElementById("Cand_File_hidden_" + num);              // скрытый элемент <input type='file'  >
    document.getElementById("Cand_File_hidden_" + num).click();                      // программный щелчок по скрытому элементу 
    input.addEventListener('change', function ()                                                        // обработчик изменения поля скрытого элемента    
                        {   var file = input.files[0];                            
                           var reader = new FileReader();                                                         //  объект, читающий выбранный файл   
                           if (file) reader.readAsDataURL(file);
                            reader.onloadend = function ()                                                         // по окончании загрузки  файла выполнить
                            {           //alert("file.Name = " + file.Name);
                                         Client_Files[num] = reader.result;
                                        // alert("reader.result=\ n" + reader.result);
                                         document.getElementById('image_' + num).src = reader.result;
                                         document.getElementById('Cand_File_' + num).value = file.name;
                                         document.getElementById('image_' + num).classList.remove("hide");  
                            }
                      });         
}
var GLOB_NUM = 0;
async function DeleteFile(num)                                                                                     //удалить cведения о файле
{   if (num == -1) num = "photo";
     GLOB_NUM = num;
    await MyCustomConfirm("Вы хотите удалить файл " + document.getElementById('Cand_File_' + num).value + "?");
}
function DeleteYes()
{   var num = GLOB_NUM;
    var file_name = document.getElementById('Cand_File_' + num).value; 
    document.getElementById('Cand_File_' + num).value = "";
    document.getElementById('image_' + num).src = null;
    document.getElementById("Cand_File_hidden_" + num).value = null;
    document.getElementById('image_' + num).src = "";
    document.getElementById('image_' + num).classList.add("hide");  
    Client_Files[num] = null;
    DeleteFileFromServer(file_name);
} 
function DeleteNo()
{}
async function DeleteFileFromServer(file_name)
{   var formData = new FormData();
    formData.append("Cand_ID", document.getElementById("Cand_ID").value);     // порядковый номер клиента-соискателя в текущем сеансе
    formData.append("Cand_file_name", file_name);
    const response1 = await fetch("/delete_file", {   method: "POST",    body: formData,    });
    const result1 = await response1.text();
   if (result1 != "none")   MyCustomAlert(result1);
}

var FREE_POSITIONS = 1;
function AddNewPositionsFile()                                                          //добавить строки для размещения нового документа
{   if (FREE_POSITIONS >= 4) return;
    FREE_POSITIONS++;
    var fp = FREE_POSITIONS - 1;
    var part1 = document.getElementById("part1_0").innerHTML;
    part1 = part1.replace("Фото документа 1", "Фото документа " + FREE_POSITIONS);
    part1 = part1.replace(/\(0\)/g, "(" + fp + ")");            
    part1 = part1.replace(/_0/g, "_" + fp);
    var part2 = document.getElementById("part2_0").innerHTML;
    part2 = part2.replace(/\(0\)/g, "(" + fp + ")");            
    part2 = part2.replace(/_0/g,   "_"+fp);
    var part3 = "";
    var part4 = document.getElementById("part4_0").innerHTML;
    part4 = part4.replace(/_0/g, "_" + fp);
    part4.replace(/src="[^"]+"/, "src='' ");
    var elem = (part1 + part2 + part3 + part4).replace(/<\/div>/g, "</div>\n"); alert(elem);
    var ins = document.getElementById("INSERT");
    var parent = ins.parentNode;
    var elem = document.createElement("div"); elem.innerHTML = part1;   elem.setAttribute('id', 'part1_' + fp);  parent.insertBefore(elem, ins);
          elem = document.createElement("div"); elem.innerHTML = part2; elem.setAttribute('id', 'part2_' + fp); parent.insertBefore(elem, ins); 
          elem = document.createElement("div"); elem.innerHTML = part3; elem.setAttribute('id', 'part3_' + fp); parent.insertBefore(elem, ins);
          elem = document.createElement("div"); elem.innerHTML = part4; elem.setAttribute('id', 'part4_' + fp); parent.insertBefore(elem, ins);
 }

async function SaveGraphFilesOnServer()                                          // сохранение документов (файлов) в серверной директории
{    var formData = new FormData();
     formData.append("Cand_ID", document.getElementById("Cand_ID").value);     // порядковый номер клиента-соискателя в текущем сеансе
    const photo = document.querySelectorAll('input[type="file"]');                           
    var photo_ = [];                                    // в списке файловых объектов не должно быть пустых элеентв
    var j = 0;
    var f_nums = "";
    for (var i = 0; i < photo.length; i++)
    {   var num;
        if (i == 0) num = 'photo'; else num = i - 1;
        if (Client_Files[num] !=null)  {   photo_[j] = photo[i];       j++;   f_nums += num;
                                                             if (i < photo.length - 1) f_nums += " ";
                                                          }
    }
    formData.append("Cand_NUMS", f_nums);
    for (var i = 0; i < photo_.length; i++) 
            formData.append("CAND_FILES", photo_[i].files[0]);
    const response1 = await fetch("/upload", {  method: "POST",
                                                                                body: formData,
                                                                            });
    const result1 = await response1.text();
    MyCustomAlert(result1);  
}
//----------------------------------------------------------------------------------------------------------------------------------------------
 //-------------------Сохранение текстовых данных из резюме---------------------------- //▷◤// ------------------------------------
async function SaveData(  )
{   /*var form1 = new FormData(document.getElementById('frm1'));    var object = {};    for (let [key, value] of form1) { console.log(`${key} - ${value}`); object[key] = value; };    */
    var resume_data = "";                          // получение  данных из  резюме  для сохранения в БД
   for (var i=1; i<9; i++)
   {  var frm = new FormData(document.getElementById('frm' + i ));
       for (let [key, value] of frm)
       {
           if (key.includes("Cand_AddLetter")) value = value.replace(/\"/g, "\"\"");
               if (key.includes("Cand_")) resume_data += key + "▷" + value + "◤" + "\n";
       } 
       }
    resume_data += "Cand_Date5▷" + document.getElementById("Cand_Date5").value + "◤" + "\n" + 
                                    "Cand_Date6▷" + document.getElementById("Cand_Date6").value + "◤"             ;
    var object__ = {};
    object__["cand_id"] = document.getElementById("INDEX").innerText;
    object__["resume_data"] = resume_data;
    var json__ = JSON.stringify(object__);   //  преобразование в json объект     alert(resume_data);
    var res0 = "Передача данных на сервер. Размер данных = " + resume_data.length + "\n";
    let response__ = await fetch('/candidates_resume_data', {  method: 'POST',
                                                                                                                    headers: { "Content-Type": "application/json; charset=UTF-8" },
                                                                                                                    body: json__ }); 
    let result = await response__.text();        MyCustomAlert(res0 + result);
    return;
  }
 //---------------------------------------------------------------------------------------------------------------------------
 //-------------------Чтение текста справки-----------------------------------------------------------------------------
           var modal = null;
           var close = null;
 async function NodeText() {
                                 var response = await fetch('/TEXT/candResumeNote.txt');
                                var text = await response.text();               //            console.log (text);
                                modal = document.querySelector('#modal');
                                return text;
           }
 function ShowCEFR() {
                   modal.classList.remove("display_none");
                                // alert("modal.classList.contains('display_none')  = " + modal.classList.contains('display_none'));
                   modal.classList.add("display_block");
                                //alert("modal.classList.contains('display_block')  = " + modal.classList.contains('display_block'));
                   close = document.querySelector('#closeTable');
                   close.addEventListener  ( 'click', () => {   modal.classList.remove("display_block");
                                                                                   modal.classList.add("display_none");
                                                                            });
        }
  //---------------------------------Показать краткую форму резюме---------------------------------------------------------------
function ShowBrief()
{           var brief = document.querySelector('#brief');
             brief.classList.remove("display_none");
             document.querySelector('#fio_resume').innerHTML = document.querySelector('#Cand_Family').value + '&nbsp;  ' +
                                                                                                      document.querySelector('#Cand_Name').value + '&nbsp;  ' +
                                                                                                       document.querySelector('#Cand_SurName').value;
            document.querySelector('#brief_img').src = Client_Files['photo'];
            document.querySelector('#edu_resume').innerHTML = document.querySelector('#Cand_Institute').value + '<br>' +
                                                                                                      document.querySelector('#Cand_Faculty').value + '<br> ' +
                                                                                                      document.querySelector('#Cand_Specialization').value + '<br>' +
                                                                                                      document.querySelector('#Cand_Level').value;  
    document.querySelector('#brief_contact').innerHTML = document.querySelector('#Cand_Email').value +
                                                                                                ' , &nbsp;' + (document.querySelector('#Cand_Phone').value).replace(/\s/g, '-');

           var dt1 = document.querySelector('#Cand_Date3').value;
           var dt2 = document.querySelector('#Cand_Date4').value;
            if (dt1 != '' && dt1 !=null)
           {     dt1 = new Date(dt1);                                                                                                                                         //    alert('Date(dt1) = /' + dt1 + '/');
                if (dt2 == '') dt2 = new Date();          else dt2 = new Date(dt2); 
                var y = dt2.getFullYear();                  var m = dt2.getMonth();          var d = dt2.getDate();                          //alert(y + '-' + m + '-' + d);
                var dt3 = Math.floor(  ( Date.UTC(y, m, d) -    Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())  ) / (1000 * 60 * 60 * 24)  );
                y = Math.floor(dt3 / 365);                 m = Math.floor((dt3 % 365 + 10) / 30);                                               //    alert(years + "  " + monthes);
              document.querySelector('#experience_resume').innerHTML = 'лет ' + y + ', месяцев ' + m;
          }
    
    document.querySelector('#PC_skill_resume').innerHTML = document.querySelector('#Cand_Skill').value;
      document.querySelector('#lang_lev_resume').innerHTML = document.querySelector('#Cand_Lang').value  + " &nbsp; "
    + document.querySelector('#Cand_Lang_Level').value;
} 
function CloseBrief()
{  document.querySelector('#brief').classList.add("display_none");
 }

var popupDiv  = null;
function ShowPopup(id_brief, id_Cand_AddLetter)
{                                                                                                                                       // Координаты элемента с краткой формой резюме
    var coords = document.getElementById(id_brief).getBoundingClientRect();
    var X = coords.left + coords.width / 5;
    var Y = coords.top + coords.height / 3;                                                                 //    alert( X + " " + Y);
    var Letter = "";
    if (id_Cand_AddLetter != 0 && id_Cand_AddLetter != "")
        Letter = document.getElementById(id_Cand_AddLetter).value;              //    alert(Letter);
        Letter = "<p>" + Letter.replace(/\n/g, "</p><p>") +"</p>";
                                                                                                                                // Создание элемента div для всплывающего окна
    popupDiv = document.createElement("div");                                               // Задание содержимого и стилей всплывающего окна
    popupDiv.innerHTML = "<a href='javascript:HidePopup()'  "
                                 + " style = 'position:relative; width:10px; height:10px; top:2px; left:93%; border:1px solid gray; ' >&#10060;</a> "
                                 + "<br>" + Letter  ;
                                                                                                                                        //alert(popupDiv.innerHTML);
        popupDiv.style.position = "fixed";
        popupDiv.style.width = "30%";
        popupDiv.style.height = "40vh";
        popupDiv.style.backgroundColor = "#eee";
        popupDiv.style.border = "1px solid #aaa";
        popupDiv.style.top = "" + Y + "px"; // "50%";
        popupDiv.style.left = "" + X + "px"; //  "50%";
        popupDiv.style.overflowX = "hidden"
        popupDiv.style.overflowY = "auto";
        popupDiv.style.paddingLeft = "8px";
        popupDiv.style.paddingRight = "8px";
                                                            //popupDiv.style.marginTop = "-100px";    popupDiv.style.marginLeft = "-150px";
         popupDiv.style.font = "400 0.9em  Tahoma";
       document.body.appendChild(popupDiv);
}
function HidePopup() {
    document.body.removeChild(popupDiv);
    popupDiv = null;
}