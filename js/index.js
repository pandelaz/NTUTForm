  $(document).ready(function() {
      var cnt4 = 0,
          cnt5 = 0,
          cnt71 = 0,
          cnt72 = 0,
          cnt10 = 0,
          cnt12 = 0,
          cnt13 = 0,
          cnt14 = 0,
          cnt15 = 0,
          cnt16 = 0,
          cnt17 = 0,
          cnt18 = 0,
          cnt19 = 0,
          cnt20 = 0,
          cnt21 = 0,
          cnt22 = 0,
          cnt23 = 0,
          cnt24 = 0,
          cnt25 = 0,
          cnt26 = 0,
          cnt27 = 0,
          cnt211 = 0,
          cnt212 = 0,
          cnt213 = 0,
          cnt214 = 0,
          cnt215 = 0,
          cnt216 = 0,
          cnt217 = 0,
          cnt513 = 0,
          cntasa = 0,
          id = 0,
          id2 = 0;

      $("#Ds3-2").hide();
      $("#s4-2").hide();
      $("#Ds4-2-1").hide();
      $("#Ds4-2-2").hide();
      $("#Ds4-2-3").hide();
      $("#Ds4-2-4").hide();
      $("#Ds4-2-5").hide();
      $("#s2-14").hide();
      $("#Ds40").hide();

      $("#Q1-2Text").hide();
      $("#Q1-4Text").hide();
      $("#Q1-5Text").hide();
      $("#Q2-1-6Text").hide();
      $("#Q2-1-7Text").hide();
      $("#Q2-3Text").hide();
      $("#Q2-4Text").hide();
      $("#Q2-5Text").hide();
      $("#Q2-6Text").hide();
      $("#Q2-7Text").hide();
      $("#Q2-81Text").hide();
      $("#Q2-82Text").hide();
      $("#Q2-9Text").hide();
      $("#Q2-111Text").hide();
      $("#Q2-131Text").hide();
      $("#Q2-141Text").hide();
      $("#Q3-1Text").hide();
      $("#Q5-0-211Text").hide();
      $("#Q5-0-2Text").hide();
      $("#Q5-0Text").hide();
      $("#Q5-0-3Text").hide();
      $("#Q5-0-4Text").hide();

      //var hostname= document.hostname;

      //$('input[value=2]:radio').attr('checked', true);
      //$("input[@type=radio]").attr("checked",'2');
      //$('input[value=2]:radio').attr('checked', 'checked');
      //$('input[value=2][name=Q1-1]').attr('checked', 'checked'); 
      //$('input[name="Q1-1"]')[0].checked = true;      

      //console.log($('input[name=Q1-1]:active').val());
      var htemp = window.location.href.split("=");
      //console.log(htemp[1]);
      //-----------------------------------------------------------------------------------------
      //開啟資料庫
      var db;
      var hhtemp = 0;
      var patient_info = {
          "病歷號": "",
          "姓名": ""
      };
      var request = indexedDB.open("TestDatabase");
      request.onerror = function(event) {
          alert("Why didn't you allow my web app to use IndexedDB?!");
      };
      request.onsuccess = function(event) {
          db = event.target.result;
          //console.log(db);
          var transaction = db.transaction(["mList"]);
          var objectStore = transaction.objectStore("mList");

          if (htemp[1].search("-") != -1) {
              hhtemp = htemp[1];
              //historyDB = 1;
              var htemp1 = htemp[1].split("-");

              if (htemp1[1] == "2") {
                  htemp[1] = htemp1[0];
              } else {
                  htemp[1] = htemp1[0] + "-" + (parseInt(htemp1[1]) - 1);
              }

          }
          console.log(hhtemp);
          console.log(htemp[1]);
          var request = objectStore.get(htemp[1]);
          request.onerror = function(event) {
              // Handle errors!
              alert("not found!");
          };
          request.onsuccess = function(event) {
              // Do something with the request.result!
              //alert("Name for SSN 沈xx is " + request.result.ssn);
              var Today = new Date();
              //document.write("今天日期是 " + Today.getFullYear()+ " 年 " + (Today.getMonth()+1) + " 月 " + Today.getDate() + " 日");
              $("#ss07").append(Today.getFullYear() + "/" + (Today.getMonth() + 1) + "/" + Today.getDate() + "  " + Today.getHours() + ":" + Today.getMinutes());
              if (hhtemp != 0 && hhtemp != undefined) {
                  $("#ss012").attr("value", hhtemp);
              } else {
                  $("#ss012").attr("value", request.result.病歷號);
              }

              $("#ss01").attr("value", request.result.姓名);
              $("#ss03").attr("value", request.result.性別);
              $("#ss04").attr("value", request.result.年齡);
              $("#ss06").attr("value", request.result.診斷);
              $("#ss08").attr("value", request.result.術式);
              $("#ss014").attr("value", request.result.麻VS);
              patient_info = request.result;
              /*
                            patient_info['機號'] = request.result.機號;
                            patient_info['刀序1'] = request.result.刀序1;
                            patient_info['刀序2'] = request.result.刀序2;
                            patient_info['姓名'] = request.result.姓名;
                            patient_info['病房'] = request.result.病房;
                            patient_info['病歷號'] = request.result.病歷號;
                            patient_info['性別'] = request.result.性別;
                            patient_info['年齡'] = request.result.年齡;
                            patient_info['診斷'] = request.result.診斷;
                            patient_info['術式'] = request.result.術式;
                            patient_info['天數'] = request.result.天數;
                            patient_info['麻VS'] = request.result.麻VS;
                            patient_info['備註'] = request.result.備註;
                            patient_info['入帳'] = request.result.入帳;
              */

              //console.log(patient_info);








              //patient_info['入帳']= $('input[name=Q1-1]:checked').val();

              //=================================================================================
              var request1 = indexedDB.open("Form1Database");
              request1.onerror = function(event) {
                  alert("Why didn't you allow my web app to use IndexedDB?!");
              };
              request1.onsuccess = function(event) {
                  db = event.target.result;
                  //console.log(db);

                  var transaction2 = db.transaction(["mList"]);
                  var objectStore2 = transaction2.objectStore("mList");
                  var request2 = objectStore2.get(patient_info['病歷號']);
                  request2.onerror = function(event) {
                      alert("not found!");
                  };
                  request2.onsuccess = function(event) {
                      if (request2.result != undefined)
                          patient_info = request2.result;
                      console.log(patient_info);

                      SelectRadio("1-1", patient_info['訪視地點'], "病房", "ICU", "POR", "電訪");

                      SelectRadio("1-2", patient_info['回答者'], "本人", "家屬", "看護", "其他");
                      SetText("Q1-2Text", "TQ1-2", patient_info['回答者-其他回答者'], patient_info['回答者'], "其他");

                      SelectRadio("1-3", patient_info['訪視時間點(麻醉後)'], "02~24hr", "24~48hr", ">72hr");

                      SelectRadio("1-4", patient_info['麻醉前訪視滿意度'], "非常滿意", "滿意", "普通", "不滿意", "非常不滿意", "無法表達");
                      SetText("Q1-4Text", "TQ1-4", patient_info['麻醉前訪視滿意度-其他'], patient_info['麻醉前訪視滿意度'], "無法表達");

                      SelectRadio("1-5", patient_info['麻醉滿意度'], "非常滿意", "滿意", "普通", "不滿意", "非常不滿意", "無法表達");
                      SetText("Q1-5Text", "TQ1-5", patient_info['麻醉滿意度-其他'], patient_info['麻醉前訪視滿意度'], "無法表達");

                      SelectRadio("2-0", patient_info['麻醉後相關問題'], "可以表達或評估", "無法表達或評估");

                      SelectCheckbox("2-1", patient_info['麻醉前後的不舒服'], "無", "焦慮緊張", "肚子餓", "感覺寒冷", "傷口疼痛", "其他", "無法表達");
                      SetText("Q2-1-6Text", "TQ2-1-6", patient_info['麻醉前後的不舒服-其他'], patient_info['麻醉前後的不舒服'], "其他");
                      SetText("Q2-1-7Text", "TQ2-1-7", patient_info['麻醉前後的不舒服-最不舒服為'], patient_info['麻醉前後的不舒服'], "無法表達");

                      SelectRadio("2-2", patient_info['全身麻醉中甦醒'], "無", "疑似有(聽到聲音或記憶不完全)", "有(可以清楚描述手術過程)");

                      SelectRadio("2-3", patient_info['喉嚨痛'], "無", "有");
                      SetText("Q2-3Text", "TQ2-3", patient_info['喉嚨痛-疼痛程度'], patient_info['喉嚨痛'], "有");
                      SelectRadio("2-3-3", patient_info['喉嚨痛-處置狀況'], "無處置", "處置有改善", "處置未改善");

                      SelectRadio("2-4", patient_info['聲音沙啞'], "無", "有、但仍可發聲", "有、且無法發聲");
                      SelectRadio("2-4-3", patient_info['聲音沙啞-處置狀況'], "無處置", "處置有改善", "處置未改善");

                      SelectRadio("2-5", patient_info['頭痛'], "無", "有");
                      SetText("Q2-5Text", "TQ2-5", patient_info['頭痛-疼痛程度'], patient_info['頭痛'], "有");
                      SelectRadio("2-5-3", patient_info['頭痛-處置狀況'], "無處置", "處置有改善", "處置未改善");

                      SelectRadio("2-6", patient_info['眩暈'], "無", "輕微(1-3)", "中度(4-6)", "嚴重(7-10)");
                      SelectRadio("2-6-5", patient_info['眩暈-處置狀況'], "無處置", "處置有改善", "處置未改善");

                      SelectRadio("2-7", patient_info['噁心'], "無", "輕微(不影響日常)", "中度(有時影響日常)", "嚴重(無法進行日常)");
                      SelectRadio("2-7-5", patient_info['噁心-處置狀況'], "無處置", "處置有改善", "處置未改善");

                      SelectRadio("2-8", patient_info['嘔吐'], "無", "有", "不清楚確實次數");
                      SetText("Q2-81Text", "TQ2-8", patient_info['嘔吐-嘔吐次數'], patient_info['嘔吐'], "有");
                      SelectRadio("2-8-4", patient_info['嘔吐-處置狀況'], "無處置", "處置有改善", "處置未改善");

                      SelectRadio("2-9", patient_info['排尿困難'], "無", "術前已經 on Foley", "輕微可自解", "須處置");
                      SelectRadio("2-9-5", patient_info['排尿困難-處置方式'], "單導", "on Foley");

                      SelectRadio("2-10", patient_info['神經損傷'], "無", "部分運動喪失及輕微感覺或感覺正常", "完全運動喪失及輕微感覺或感覺正常", "完全運動及感覺喪失");

                      SelectRadio("2-11", patient_info['譫妄 Delirium'], "無", "有");
                      SetText("Q2-111Text", "TQ2-11", patient_info['譫妄 Delirium-症狀'], patient_info['譫妄 Delirium'], "有");

                      SelectRadio("2-12", patient_info['Apfel score'], "抽菸", "暈動史");

                      SelectRadio("2-13", patient_info['眼部受傷'], "無", "有");
                      SetText("Q2-131Text", "TQ2-13", patient_info['眼部受傷-部位'], patient_info['眼部受傷'], "有");

                      SelectRadio("2-14", patient_info['PDPH'], "無", "有");
                      SetText("Q2-141Text", "TQ2-14", patient_info['PDPH-分'], patient_info['PDPH'], "有");
                      SelectRadio("2-14-3", patient_info['PDPH-處置狀況'], "無處置", "處置有改善", "處置未改善");

                      $("#TQ2-15").val(patient_info['麻醉後相關問題-其他']);

                      SelectRadio("3-0", patient_info['術後疼痛評估'], "可以表達或評估", "無法表達或評估");

                      SelectRadio("3-1", patient_info['傷口疼痛'], "無", "有");
                      SetText("Q3-1Text", "TQ3-1", patient_info['傷口疼痛-分'], patient_info['傷口疼痛'], "有");

                      SelectRadio("3-2", patient_info['止痛方式'], "沒用藥", "病房止痛", "自費止痛");

                      SelectRadio("s3-2-1", patient_info['呼吸抑制'], "無", "輕微 10次/分", "嚴重 8次/分");

                      SelectRadio("s3-2-2", patient_info['嗜睡'], "無", "聲音可喚醒", "物理刺激可喚醒", "無法喚醒");

                      SelectRadio("s3-2-3", patient_info['搔癢'], "無", "不須抓癢", "須抓癢但未破皮", "抓癢抓至破皮");

                      SelectRadio("s3-2-4", patient_info['感覺阻斷'], "無", "感覺減弱", "只能感覺到觸碰", "完全沒有感覺");

                      SelectRadio("s3-2-5", patient_info['運動阻斷'], "無", "膝蓋手肘尚可移動", "只可移動腳掌手掌", "完全無法移動");

                      SelectRadio("5-0", patient_info['訪視結果'], "訪視後處置", "未完成訪視");
                      SelectRadio("s5-0-1", patient_info['訪視後處置'], "訪視完成並結案", "通知主治醫師");
                      SelectRadio("s5-0-2", patient_info['通知主治醫師'], "再訪", "處置方式", "直接結案");
                      SelectRadio("s5-0-3", patient_info['未完成訪視'], "已出院", "病人不在", "睡覺中", "其他");
                      SetText("Q5-0-3Text", "TQs5-0-2", patient_info['通知主治醫師-處置方式'], patient_info['通知主治醫師'], "處置方式");
                      SetText("Q5-0-211Text", "TQs5-0-3", patient_info['未完成訪視-其他'], patient_info['未完成訪視'], "其他");
                  };




              };
              // This event is only implemented in recent browsers
              request1.onupgradeneeded = function(event) {
                  db = event.target.result;
                  // Create an objectStore for this database
                  var objectStore1 = db.createObjectStore("mList", {
                      keyPath: "病歷號"
                  });
              };
              //=================================================================================


          };
      };
      // This event is only implemented in recent browsers
      request.onupgradeneeded = function(event) {
          db = event.target.result;
          // Create an objectStore for this database
          var objectStore = db.createObjectStore("mList", { keyPath: "病歷號" });
      };
      //-----------------------------------------------------------------------------------------
      $("#testttt").click(function() {
          console.log(CheckboxCkeck("2-1"));
      });

      function RadioCkeck(QNum) {
          var valtemp = $('input[name=Q' + QNum + ']:checked').val();
          if (valtemp != undefined) {
              t = $('#btnQ' + QNum + '-' + valtemp).html().split(">");
              t1 = t[1].split("\n");
              return t1[0];
          } else {
              return "";
          }
      }

      function CheckboxCkeck(QNum) {
          var n = $('input[name=Q' + QNum + ']:checked').length;
          var rt = "";
          if (n > 0) {
              $('input[name=Q' + QNum + ']:checked').each(function() {
                  var valtemp = $(this).val();
                  //console.log(valtemp);
                  if (valtemp != undefined) {
                      t = $('#btnQ' + QNum + '-' + valtemp).html().split(">");
                      t1 = t[1].split("\n");
                      if (rt != "")
                          rt = rt + "|" + t1[0];
                      else
                          rt = t1[0];
                  }
              });
              return rt;
          }

      }

      function RadioSet(QNum) {
          $('#Q' + QNum).prop('checked', "true");
          $('#btnQ' + QNum).addClass('active');
          //console.log($('input[name=Q1-1]:checked').val());
      }

      function SetText(Sid, TextNum, SText, QText, RText) {

          if (QText == "" || QText == undefined || QText == "undefined") {} else {
              if (QText.search(RText) != -1) {
                  //console.log(Sid);
                  $("#" + TextNum).val(SText);
                  $("#" + Sid).show();
              }
          }
      }

      function SelectRadio(QNum, Qtext, c1, c2, c3, c4, c5, c6, c7) {

          var TNum = 0;
          //console.log(Qtext);
          if (Qtext == "" || Qtext == undefined || Qtext == "undefined") {} else {
              switch (Qtext) {
                  case c1:
                      TNum = 1;
                      break;
                  case c2:
                      TNum = 2;
                      break;
                  case c3:
                      TNum = 3;
                      break;
                  case c4:
                      TNum = 4;
                      break;
                  case c5:
                      TNum = 5;
                      break;
                  case c6:
                      TNum = 6;
                      break;
                  case c7:
                      TNum = 7;
                      break;
                  default:
                      TNum = 99;
              }
              RadioSet((QNum + "-" + TNum));
          }
      }

      function SelectCheckbox(QNum, Qtext, c1, c2, c3, c4, c5, c6, c7) {

          //var TNum = 0;
          //console.log(Qtext);
          if (Qtext == "" || Qtext == undefined || Qtext == "undefined") {} else {


              if (Qtext == c1)
                  RadioSet((QNum + "-1"));
              if (Qtext.search(c2) != -1)
                  RadioSet((QNum + "-2"));
              if (Qtext.search(c3) != -1)
                  RadioSet((QNum + "-3"));
              if (Qtext.search(c4) != -1)
                  RadioSet((QNum + "-4"));
              if (Qtext.search(c5) != -1)
                  RadioSet((QNum + "-5"));
              if (Qtext.search(c6) != -1)
                  RadioSet((QNum + "-6"));
              if (Qtext.search(c7) != -1)
                  RadioSet((QNum + "-7"));
          }
      }

      $("#saveinfo").click(function(event) {
          //event.preventDefault();
          for (var i = 1; i <= 5; i++) {
              try {
                  //if ($('input[name=Q1-' + i + ']:checked').val() != undefined) {
                  var t = $('#btnQ1-' + i + '-' + $('input[name=Q1-' + i + ']:checked').val()).html().split(">");
                  var t1 = t[1].split("\n");
                  //console.log($("#s1-" + i).find(".panel-heading").html() + " : " + t1[0]);
                  patient_info[$("#s1-" + i).find(".panel-heading").html()] = t1[0];
                  if (i == 2) {
                      //console.log($("Q1-2Text").html());
                      patient_info["回答者-其他回答者"] = $("#TQ1-2").val();
                  } else if (i == 4) {
                      patient_info["麻醉前訪視滿意度-其他"] = $("#TQ1-4").val();
                  } else if (i == 5) {
                      patient_info["麻醉滿意度-其他"] = $("#TQ1-5").val();
                  }
                  //$("#s1-" + i).find(".panel-heading").html()
                  //}
              } catch (e) {
                  //console.log(i);
              }
          }

          var Q20Temp = RadioCkeck("2-0");
          patient_info["麻醉後相關問題"] = Q20Temp;

          if (Q20Temp == "可以表達或評估") {

              //2-1
              //patient_info["麻醉前後的不舒服"] = RadioCkeck("2-1");
              patient_info["麻醉前後的不舒服"] = CheckboxCkeck("2-1");
              patient_info["麻醉前後的不舒服-其他"] = $("#TQ2-1-6").val();
              patient_info["麻醉前後的不舒服-最不舒服為"] = $("#TQ2-1-7").val();

              //2-2
              patient_info["全身麻醉中甦醒"] = RadioCkeck("2-2");

              //2-3
              patient_info["喉嚨痛"] = RadioCkeck("2-3");
              patient_info["喉嚨痛-疼痛程度"] = $("#TQ2-3").val();
              patient_info["喉嚨痛-處置狀況"] = RadioCkeck("2-3-3");

              //2-4
              patient_info["聲音沙啞"] = RadioCkeck("2-4");
              patient_info["聲音沙啞-處置狀況"] = RadioCkeck("2-4-3");

              //2-5
              patient_info["頭痛"] = RadioCkeck("2-5");
              patient_info["頭痛-疼痛程度"] = $("#TQ2-5").val();
              patient_info["頭痛-處置狀況"] = RadioCkeck("2-5-3");
              //2-6 
              patient_info["眩暈"] = RadioCkeck("2-6");
              patient_info["眩暈-處置狀況"] = RadioCkeck("2-6-5");

              //2-7
              patient_info["噁心"] = RadioCkeck("2-7");
              patient_info["噁心-處置狀況"] = RadioCkeck("2-7-5");

              //2-8
              patient_info["嘔吐"] = RadioCkeck("2-8");
              patient_info["嘔吐-嘔吐次數"] = $("#TQ2-8").val();
              patient_info["嘔吐-處置狀況"] = RadioCkeck("2-8-4");

              //2-9
              patient_info["排尿困難"] = RadioCkeck("2-9");
              patient_info["排尿困難-處置方式"] = RadioCkeck("2-9-5");

              //2-10
              patient_info["神經損傷"] = RadioCkeck("2-10");

              //2-11
              patient_info["譫妄 Delirium"] = RadioCkeck("2-11");
              patient_info["譫妄 Delirium-症狀"] = $("#TQ2-11").val();

              //2-12
              patient_info["Apfel score"] = RadioCkeck("2-12");

              //2-13
              patient_info["眼部受傷"] = RadioCkeck("2-13");
              patient_info["眼部受傷-部位"] = $("#TQ2-13").val();

              //2-14
              patient_info["PDPH"] = RadioCkeck("2-14");
              patient_info["PDPH-分"] = $("#TQ2-14").val();
              patient_info["PDPH"] = RadioCkeck("2-14-3");


              //2-15
              patient_info["麻醉後相關問題-其他"] = $("#TQ2-15").val();

          } else {
              //console.log("無法表達或評估");
              patient_info["麻醉前後的不舒服"] = "";
              patient_info["麻醉前後的不舒服-其他"] = "";
              patient_info["麻醉前後的不舒服-最不舒服為"] = "";
              patient_info["全身麻醉中甦醒"] = "";
              patient_info["喉嚨痛"] = "";
              patient_info["喉嚨痛-疼痛程度"] = "";
              patient_info["喉嚨痛-處置狀況"] = "";
              patient_info["聲音沙啞"] = "";
              patient_info["聲音沙啞-處置狀況"] = "";
              patient_info["頭痛"] = "";
              patient_info["頭痛-疼痛程度"] = "";
              patient_info["頭痛-處置狀況"] = "";
              patient_info["眩暈"] = "";
              patient_info["眩暈-處置狀況"] = "";
              patient_info["噁心"] = "";
              patient_info["噁心-處置狀況"] = "";
              patient_info["嘔吐"] = "";
              patient_info["嘔吐-嘔吐次數"] = "";
              patient_info["嘔吐-處置狀況"] = "";
              patient_info["排尿困難"] = "";
              patient_info["排尿困難-處置方式"] = "";
              patient_info["神經損傷"] = "";
              patient_info["譫妄 Delirium"] = "";
              patient_info["譫妄 Delirium-症狀"] = "";
              patient_info["Apfel score"] = "";
              patient_info["眼部受傷"] = "";
              patient_info["眼部受傷-部位"] = "";
              patient_info["PDPH"] = "";
              patient_info["PDPH-分"] = "";
              patient_info["PDPH"] = "";
              patient_info["麻醉後相關問題-其他"] = "";
          }

          var Q30Temp = RadioCkeck("3-0");
          patient_info["術後疼痛評估"] = Q30Temp;

          if (Q30Temp == "可以表達或評估") {
              patient_info["傷口疼痛"] = RadioCkeck("3-1");
              patient_info["傷口疼痛-分"] = $("#TQ3-1").val();

              var Q32Temp = RadioCkeck("3-2");
              patient_info["止痛方式"] = Q32Temp;

              if (Q32Temp == "自費止痛") {
                  patient_info["呼吸抑制"] = RadioCkeck("s3-2-1");
                  patient_info["嗜睡"] = RadioCkeck("s3-2-2");
                  patient_info["搔癢"] = RadioCkeck("s3-2-3");
                  patient_info["感覺阻斷"] = RadioCkeck("s3-2-4");
                  patient_info["運動阻斷"] = RadioCkeck("s3-2-5");
              } else {
                  patient_info["呼吸抑制"] = "";
                  patient_info["嗜睡"] = "";
                  patient_info["搔癢"] = "";
                  patient_info["感覺阻斷"] = "";
                  patient_info["運動阻斷"] = "";
              }

          } else {
              patient_info["傷口疼痛"] = "";
              patient_info["傷口疼痛-分"] = "";
              patient_info["止痛方式"] = "";
              patient_info["呼吸抑制"] = "";
              patient_info["嗜睡"] = "";
              patient_info["搔癢"] = "";
              patient_info["感覺阻斷"] = "";
              patient_info["運動阻斷"] = "";
          }

          var Q50Temp = RadioCkeck("5-0");
          patient_info["訪視結果"] = Q50Temp;

          if (Q50Temp == "訪視後處置") {

              var Qs501Temp = RadioCkeck("s5-0-1");
              patient_info["訪視後處置"] = Qs501Temp;

              if (Qs501Temp == "通知主治醫師") {

                  var Qs502Temp = RadioCkeck("s5-0-2");
                  patient_info["通知主治醫師"] = Qs502Temp;

                  patient_info["未完成訪視"] = "";

                  if (Qs502Temp == "處置方式") {
                      patient_info["通知主治醫師-處置方式"] = $("#TQs5-0-2").val();
                      patient_info["未完成訪視-其他"] = "";
                  } else {
                      patient_info["通知主治醫師-處置方式"] = "";
                      patient_info["未完成訪視-其他"] = "";
                  }

              } else {
                  patient_info["通知主治醫師"] = "";
                  patient_info["未完成訪視"] = "";
                  patient_info["通知主治醫師-處置方式"] = "";
                  patient_info["未完成訪視-其他"] = "";
              }

          } else if (Q50Temp == "未完成訪視") {

              patient_info["通知主治醫師"] = "";

              var Qs503Temp = RadioCkeck("s5-0-3")
              patient_info["未完成訪視"] = Qs503Temp;

              patient_info["通知主治醫師-處置方式"] = "";

              if (Qs503Temp == "其他") {
                  patient_info["未完成訪視-其他"] = $("#TQs5-0-3").val();
              } else {
                  patient_info["未完成訪視-其他"] = "";
              }


          } else {
              patient_info["訪視後處置"] = "";
              patient_info["通知主治醫師"] = "";
              patient_info["未完成訪視"] = "";
              patient_info["通知主治醫師-處置方式"] = "";
              patient_info["未完成訪視-其他"] = "";
          }


          console.log(patient_info);

          var transaction = db.transaction(["mList"], "readwrite");
          transaction.oncomplete = function(event) {
              console.log("done");
          };
          transaction.onerror = function(event) {
              console.log("add error");
              //===================================
              var transaction1 = db.transaction(["mList"], "readwrite");
              var objectStore1 = transaction1.objectStore("mList");
              var request1 = objectStore1.get(patient_info['病歷號']);
              request1.onsuccess = function(event) {
                  console.log("Updating : ");
                  //console.log(request1.result);
                  //request1.result = patient_info;
                  objectStore1.put(patient_info);
              };
              //===================================
          };
          var objectStore = transaction.objectStore("mList");

          var request = objectStore.add(patient_info);
          request.onsuccess = function(event) {
              // event.target.result == customerData[i].ssn;
          };
          //}
      });






      //-----------------------------------------------------------------------------------------


      //-------------------------Q1-2-------------------------

      $("#Q1-2-4").change(function() {
          $("#Q1-2Text").show();
      });
      $("#Q1-2-1,#Q1-2-2,#Q1-2-3").change(function() {
          $("#Q1-2Text").hide();
      });

      //-------------------------Q1-4-------------------------
      $("#Q1-4-4,#Q1-4-5,#Q1-4-6").change(function() {
          if (cnt4 == 0) {
              $("#Q1-4Text").show();
              cnt4++;
          }
      });
      $("#Q1-4-1,#Q1-4-2,#Q1-4-3").change(function() {
          if (cnt4 == 1) {
              $("#Q1-4Text").hide();
              cnt4 = 0;
          }

      });
      //-------------------------Q1-5-------------------------
      $("#Q1-5-4,#Q1-5-5,#Q1-5-6").change(function() {
          if (cnt5 == 0) {
              $("#Q1-5Text").show();
              cnt5++;
          }

      });
      $("#Q1-5-1,#Q1-5-2,#Q1-5-3").change(function() {
          if (cnt5 == 1) {
              $("#Q1-5Text").hide();
              cnt5 = 0;
          }

      });

      //-------------------------Q2-0-------------------------
      $("#Q2-0-2").change(function() {
          $("#Ds20").hide();

      });
      $("#Q2-0-1").change(function() {
          $("#Ds20").show();
      });

      //-------------------------Q2-1-------------------------
      $("#btnQ2-1-1").click(function() {
          if (cnt211 == 0) {
              $("#btnQ2-1-2").removeClass("active");
              $("#Q2-1-2").prop("checked", false);
              $("#btnQ2-1-3").removeClass("active");
              $("#btnQ2-1-4").removeClass("active");
              $("#btnQ2-1-5").removeClass("active");
              $("#btnQ2-1-6").removeClass("active");
              $("#btnQ2-1-7").removeClass("active");
              

              if (cnt71 == 1) {
                  $("#Q2-1-6Text").hide();
                  cnt71 = 0;
              }
              if (cnt72 == 1) {
                  $("#Q2-1-7Text").hide();
                  cnt72 = 0;
              }

              cnt211++;
          } else {
              cnt211 = 0;
          }
          if ($("#Q2-1-2").prop("checked"))
              console.log("按");
          else
              console.log("沒");
      });
      $("#btnQ2-1-6").click(function() {
          if (cnt71 == 0) {
              $("#Q2-1-6Text").show();
              cnt71++;
          } else {
              $("#Q2-1-6Text").hide();
              cnt71 = 0;
          }

      });
      $("#btnQ2-1-7").click(function() {
          if (cnt72 == 0) {
              $("#Q2-1-7Text").show();
              cnt72++;
          } else {
              $("#Q2-1-7Text").hide();
              cnt72 = 0;
          }

      });
      $("#btnQ2-1-2,#btnQ2-1-3,#btnQ2-1-4,#btnQ2-1-5,#btnQ2-1-6,#btnQ2-1-7").click(function() {
          if (cnt211 == 1) {
              $("#btnQ2-1-1").removeClass("active");
              cnt211 = 0;
          }
      });

      $("#Q2-3-2").change(function() {
          $("#Q2-3Text").show();
      });
      $("#Q2-3-1").change(function() {
          $("#Q2-3Text").hide();
      });
      //-------------------------Q2-4-------------------------
      $("#Q2-4-2,#Q2-4-3").change(function() {

          if (cnt10 == 0) {
              $("#Q2-4Text").show();
              cnt10++;
          }

      });
      $("#Q2-4-1").change(function() {
          $("#Q2-4Text").hide();
          cnt10 = 0;
      });

      //-------------------------Q2-5-------------------------
      $("#Q2-5-2").change(function() {
          $("#Q2-5Text").show();
      });
      $("#Q2-5-1").change(function() {
          $("#Q2-5Text").hide();

      });

      //-------------------------Q2-6-------------------------
      $("#Q2-6-2,#Q2-6-3,#Q2-6-4").change(function() {

          if (cnt12 == 0) {
              $("#Q2-6Text").show();
              cnt12++;
          }

      });
      $("#Q2-6-1").change(function() {
          $("#Q2-6Text").hide();
          cnt12 = 0;

      });

      //-------------------------Q2-7-------------------------
      $("#Q2-7-2,#Q2-7-3,#Q2-7-4").change(function() {
          if (cnt13 == 0) {
              $("#Q2-7Text").show();
              cnt13++;
          }

      });
      $("#Q2-7-1").change(function() {
          $("#Q2-7Text").hide();
          cnt13 = 0;
      });

      //-------------------------Q2-8-------------------------
      $("#Q2-8-2").change(function() {
          if (cnt14 == 0) {
              $("#Q2-82Text").show();
              cnt14++;
          }
          $("#Q2-81Text").show();
      });

      $("#Q2-8-3").change(function() {

          if (cnt14 == 0) {
              $("#Q2-82Text").show();
              cnt14++;
          }
          $("#Q2-81Text").hide();
      });
      $("#Q2-8-1").change(function() {
          $("#Q2-82Text").hide();
          $("#Q2-81Text").hide();
          cnt14 = 0;

      });
      //-------------------------Q2-9-------------------------
      $("#Q2-9-4").change(function() {
          $("#Q2-9Text").show();
      });
      $("#Q2-9-1,#Q2-9-2,#Q2-9-3").change(function() {
          $("#Q2-9Text").hide();

      });

      //-------------------------Q2-11-------------------------
      $("#Q2-11-2").change(function() {
          $("#Q2-111Text").show();

      });
      $("#Q2-11-1").change(function() {
          $("#Q2-111Text").hide();

      });

      //-------------------------Q2-13-------------------------
      $("#Q2-13-2").change(function() {
          $("#Q2-131Text").show();

      });
      $("#Q2-13-1").change(function() {
          $("#Q2-131Text").hide();

      });

      //-------------------------Q2-14-------------------------
      $("#ss011").blur(function() {
          var t = $("#ss011").val();
          if (t == "全麻") {
              $("#s2-14").show();
          } else {
              $("#s2-14").hide();
          }
      });

      $("#Q2-14-2").change(function() {
          $("#Q2-141Text").show();

      });
      $("#Q2-14-1").change(function() {
          $("#Q2-141Text").hide();

      });
      //-------------------------Q3-0-------------------------
      $("#Q3-0-2").change(function() {
          $("#Ds30").hide();
      });
      $("#Q3-0-1").change(function() {
          $("#Ds30").show();
      });

      //-------------------------Q3-1-------------------------
      $("#Q3-1-2").change(function() {
          $("#Q3-1Text").show();
      });
      $("#Q3-1-1").change(function() {
          $("#Q3-1Text").hide();
      });
      //-------------------------Q3-2-------------------------
      $("#Q3-2-1,#Q3-2-2").change(function() {
          $("#Ds3-2").hide();
      });
      $("#Q3-2-3").change(function() {
          $("#Ds3-2").show();
      });

      //-------------------------Q4-1-------------------------
      $("#Q4-1-1").change(function() {
          if (cnt16 == 0) {
              $("#s4-2").show();
              $("#Ds4-2-1").show();
              cnt16 = 1;
          } else {
              $("#Ds4-2-1").hide();
              cnt16 = 0;
              if (cnt16 == 0 && cnt17 == 0 && cnt18 == 0 && cnt19 == 0)
                  $("#s4-2").hide();
          }
      });
      $("#Q4-1-2").change(function() {
          if (cnt17 == 0) {
              $("#s4-2").show();
              $("#Ds4-2-2").show();
              cnt17 = 1;
          } else {
              $("#Ds4-2-2").hide();
              cnt17 = 0;
              if (cnt16 == 0 && cnt17 == 0 && cnt18 == 0 && cnt19 == 0)
                  $("#s4-2").hide();
          }

      });
      $("#Q4-1-3").change(function() {
          if (cnt18 == 0) {
              $("#s4-2").show();
              $("#Ds4-2-3").show();
              cnt18 = 1;
          } else {
              $("#Ds4-2-3").hide();
              cnt18 = 0;
              if (cnt16 == 0 && cnt17 == 0 && cnt18 == 0 && cnt19 == 0)
                  $("#s4-2").hide();
          }

      });
      $("#Q4-1-4").change(function() {
          if (cnt19 == 0) {
              $("#s4-2").show();
              $("#Ds4-2-4").show();
              cnt19 = 1;
          } else {
              $("#Ds4-2-4").hide();
              cnt19 = 0;
              if (cnt16 == 0 && cnt17 == 0 && cnt18 == 0 && cnt19 == 0)
                  $("#s4-2").hide();
          }

      });
      $("#Q4-1-5").change(function() {
          if (cnt20 == 0) {
              $("#Q4-1Text").append('<span id="TextQ4-1"><br>其他 : <input type="text" name="who" style="height:1.5em;" /></span>');
              cnt20 = 1;
          } else {
              $("#TextQ4-1").remove();
              cnt20 = 0;
          }

      });

      $("#Q4-2-1-1,#Q4-2-1-2,#Q4-2-1-3,#Q4-2-1-4,#Q4-2-1-5,#Q4-2-2-1,#Q4-2-2-2,#Q4-2-2-3,#Q4-2-2-4,#Q4-2-2-5,#Q4-2-3-1,#Q4-2-3-2,#Q4-2-3-3,#Q4-2-3-4,#Q4-2-3-5,#Q4-2-4-1,#Q4-2-4-2,#Q4-2-4-3,#Q4-2-4-4,#Q4-2-4-5").change(function() {
          if (($('input[name=Qn4-2-1]:checked').val() > 3) || ($('input[name=Qn4-2-2]:checked').val() > 3) || ($('input[name=Qn4-2-3]:checked').val() > 3) || ($('input[name=Qn4-2-4]:checked').val() > 3)) {
              if (cnt21 == 0) {
                  $("#Ds4-2-5").show();
                  cnt21 = 1;
              }
          } else {
              $("#Ds4-2-5").hide();
              cnt21 = 0;
          }

      });
      //-------------------------Q4-2-5-------------------------
      $("#Q4-2-5-4").change(function() {
          $("#Q4-2Text").append('<span id="TextQ4-2"><br><br>其他 : <input type="text" name="who" style="height:1.5em;" /></span>');

      });
      $("#Q4-2-5-1,#Q4-2-5-2,#Q4-2-5-3").change(function() {
          $("#TextQ4-2").remove();

      });

      $("#Q5-0-1").change(function() {

          $("#Q5-0-4Text").hide();

          $("#Q5-0-211Text").hide();
          $("#Q5-0Text").show();

          $("#Qs5-0-1-2").change(function() {
              $("#Q5-0-2Text").show();
              $("#Qs5-0-2-1,#Qs5-0-2-3").change(function() {
                  $("#Q5-0-3Text").hide();
              });


              $("#Qs5-0-2-2").change(function() {
                  $("#Q5-0-3Text").show();
              });

          });
          $("#Qs5-0-1-1").change(function() {
              $("#Q5-0-3Text").hide();
              $("#Q5-0-2Text").hide();
          });

      });

      $("#Q5-0-2").change(function() {
          $("#Q5-0Text").hide();
          $("#Q5-0-3Text").hide();
          $("#Q5-0-2Text").hide();
          $("#Q5-0-4Text").show();
          $("#Qs5-0-3-4").change(function() {
              $("#Q5-0-211Text").show();
          });
          $("#Qs5-0-3-1,#Qs5-0-3-2,#Qs5-0-3-3").change(function() {
              $("#Q5-0-211Text").hide();
          });

      });

      var font = 14;
      $("#fontbig").click(function() {
          font = font + 1;
          $("#body").attr("style", "font-size:" + font + "px;");
      });

      $("#fontsmall").click(function() {
          if (font >= 14) {
              font = font - 1;
              $("#body").attr("style", "font-size:" + font + "px;");
          }
      });
      //
  });


  $(document).on('click', '.navbar-collapse.in', function(e) {
      if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
          $(this).collapse('hide');
      }
  });