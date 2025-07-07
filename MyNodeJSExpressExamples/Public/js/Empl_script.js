//-----------------------------------Сокрытие/отображение разделов резюме----------------------------------------
function Empl_f1(id)
{    document.getElementById(id).classList.toggle('hide');
            var id_ = id + '_';
            if (document.getElementById(id_).innerText === '▷')
                document.getElementById(id_).innerText = '◤';
            else document.getElementById(id_).innerText = '▷';
        }
 //-------------------Сохранние данных-----------------------------------------------------------------------------

  //-------------------Прочитать текст справки-----------------------------------------------------------------------------
  async function Empl_NodeText() {
            var response = await fetch('TEXT/emplAnketaNote.txt');
            var text = await response.text();                       //console.log (text);
            return text;
  }
//--------------------------------------------------Выделить Работодатели----отобразить меню 2-го уровня-------------------------

//----------------------------------------------Краткая форма вакансии --------------------------------
function ShowBriefVac()
{            var brief = document.querySelector('#briefVac');
             brief.classList.remove("display_none");
       var obj = document.getElementById("Vac_JobTitleBrief");
              obj.innerHTML =  document.getElementById("Vac_JobTitle").value + '. <br>'+ document.getElementById("Vac_JobResp").value;
   obj = document.getElementById("Vac_JobTypeBrief");
              obj.innerHTML =  document.getElementById("Vac_JobType").value;
  obj = document.getElementById("Vac_JobSalaryBrief");
              obj.innerHTML =  document.getElementById("Vac_Salary").value + "  " + document.getElementById("Vac_Salary_1").value;
  obj = document.getElementById("Vac_JobPC_SkillBrief");
              obj.innerHTML =  document.getElementById("Vac_PC_Skill").value + ".<br> " + document.getElementById("Vac_Soft").value;
   obj = document.getElementById("Vac_JobAddSkillBrief");
              obj.innerHTML =  document.getElementById("Vac_AddSkill").value; 
    var check =null;
    var val="";
     for (var i=1; i<10; i++ )
        {  check = document.getElementById( "q" + i ).checked;
           if (document.getElementById( "q" + i ).checked) 
                      val += document.getElementById( "q" + i + "_").innerHTML + ", "
        }
     obj = document.getElementById("Vac_JobCharsVrief");
     obj.innerHTML =  val;
}
function CloseBriefVac()
{document.querySelector('#briefVac').classList.add("display_none");}
