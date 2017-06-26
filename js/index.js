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
       //var hostname= document.hostname;
       //$('input[value=2]:radio').attr('checked', true);
       //$("input[@type=radio]").attr("checked",'2');
       //$('input[value=2]:radio').attr('checked', 'checked');
       //$('input[value=2][name=Q1-1]').attr('checked', 'checked'); 
       //$('input[name="Q1-1"]')[0].checked = true;
       console.log($('input[name=Q1-1]:active').val());
       var htemp = window.location.href.split("=");
       //console.log(htemp[1]);
       //-----------------------------------------------------------------------------------------
       //開啟資料庫
       var db;
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
           console.log(db);
           var transaction = db.transaction(["mList"]);
           var objectStore = transaction.objectStore("mList");
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
               $("#ss012").attr("value", request.result.病歷號);
               $("#ss01").attr("value", request.result.姓名);
               $("#ss03").attr("value", request.result.性別);
               $("#ss04").attr("value", request.result.年齡);
               $("#ss06").attr("value", request.result.診斷);
               $("#ss08").attr("value", request.result.術式);
               $("#ss014").attr("value", request.result.麻VS);

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
               //patient_info['入帳']= $('input[name=Q1-1]:checked').val();
               
//=================================================================================
              var request1 = indexedDB.open("Form1Database");
              request1.onerror = function(event) {
                  alert("Why didn't you allow my web app to use IndexedDB?!");
              };
              request1.onsuccess = function(event) {
                  db = event.target.result;
                  console.log(db);
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
       $("#stest").click(function() {
           console.log(RadioCkeck("2-3-3"));
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

           if (Q20Temp=="可以表達或評估") {

            //2-1
            patient_info["麻醉前後的不舒服"] = RadioCkeck("2-1");
            patient_info["麻醉前後的不舒服-其他"] = $("#TQ2-1-1").val();
            patient_info["麻醉前後的不舒服-最不舒服為"] = $("#TQ2-1-2").val();

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
            
           } else  {
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

           if(Q30Temp == "可以表達或評估") {
              patient_info["傷口疼痛"] = RadioCkeck("3-1");
              patient_info["傷口疼痛-分"] = $("#TQ3-1").val();

              var Q32Temp = RadioCkeck("3-2");
              patient_info["止痛方式"] = Q32Temp;

              if(Q32Temp=="自費止痛") {
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

           if(Q50Temp == "訪視後處置") {

            var Qs501Temp = RadioCkeck("s5-0-1");
            patient_info["訪視後處置"] = Qs501Temp;

            if(Qs501Temp == "通知主治醫師") {

              var Qs502Temp = RadioCkeck("s5-0-2");
              patient_info["通知主治醫師"] = Qs502Temp;

              if(Qs502Temp == "處置方式") {
                patient_info["通知主治醫師-處置方式"] = $("#TQs5-0-2").val();
              } else {
                patient_info["通知主治醫師-處置方式"] = "";
              }
        
            } else {
              patient_info["通知主治醫師"] = "";
              patient_info["通知主治醫師-處置方式"] = "";
            }

           } else if(Q50Temp == "未完成訪視") {

            var Qs503Temp = RadioCkeck("s5-0-3")
            patient_info["未完成訪視"] = Qs503Temp;

            if(Qs502Temp == "其他") {
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

       $("#Ds3-2").hide();
       $("#s4-2").hide();
       $("#Ds4-2-1").hide();
       $("#Ds4-2-2").hide();
       $("#Ds4-2-3").hide();
       $("#Ds4-2-4").hide();
       $("#Ds4-2-5").hide();
       $("#s2-14").hide();
       $("#Ds40").hide();

       //test
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
       //$("#Q1-2Text").hide();
       $("#Q5-0-211Text").hide();
       $("#Q5-0-2Text").hide();
       $("#Q5-0Text").hide();
       $("#Q5-0-3Text").hide();
       $("#Q5-0-4Text").hide();

       //end test

       //-------------------------Q1-1-------------------------
       $("#Q1-1-1").change(function() {
           //$("#btnQ1-1-1").attr("class", "btn btn-danger Small-Width active");
           //$("#btnQ1-1-2,#btnQ1-1-3,#btnQ1-1-4").attr("class", "btn btn-primary Small-Width");
           //console.log($('input[name=Q1-1]:checked').val());
           //var t = $('#btnQ1-1-' + $('input[name=Q1-1]:checked').val()).html().split(">");
           //var t1 = t[1].split("\n");
           //console.log(t1[0]);
       });
       $("#Q1-1-2").change(function() {
           //$("#btnQ1-1-2").attr("class", "btn btn-danger Small-Width active");
           //$("#btnQ1-1-1,#btnQ1-1-3,#btnQ1-1-4").attr("class", "btn btn-primary Small-Width");
           //var t = $('#btnQ1-1-' + $('input[name=Q1-1]:checked').val()).html().split(">");
           //console.log(t[1]);
       });
       $("#Q1-1-3").change(function() {
           //$("#btnQ1-1-3").attr("class", "btn btn-danger Small-Width active");
           //$("#btnQ1-1-2,#btnQ1-1-1,#btnQ1-1-4").attr("class", "btn btn-primary Small-Width");
           //var t = $('#btnQ1-1-' + $('input[name=Q1-1]:checked').val()).html().split(">");
           //console.log(t[1]);
       });
       $("#Q1-1-4").change(function() {
           //$("#btnQ1-1-4").attr("class", "btn btn-danger Small-Width active");
           //$("#btnQ1-1-2,#btnQ1-1-3,#btnQ1-1-1").attr("class", "btn btn-primary Small-Width");
           //var t = $('#btnQ1-1-' + $('input[name=Q1-1]:checked').val()).html().split(">");
           //console.log(t[1]);
       });

       //-------------------------Q1-2-------------------------
       $("#Q1-2-1").change(function() {
           //$("#btnQ1-2-1").attr("class", "btn btn-danger Small-Width active");
           //$("#btnQ1-2-2,#btnQ1-2-3,#btnQ1-2-4").attr("class", "btn btn-primary Small-Width");
       });
       $("#Q1-2-2").change(function() {
           //$("#btnQ1-2-2").attr("class", "btn btn-danger Small-Width active");
           //$("#btnQ1-2-1,#btnQ1-2-3,#btnQ1-2-4").attr("class", "btn btn-primary Small-Width");
       });
       $("#Q1-2-3").change(function() {
           //$("#btnQ1-2-3").attr("class", "btn btn-danger Small-Width active");
           //$("#btnQ1-2-2,#btnQ1-2-1,#btnQ1-2-4").attr("class", "btn btn-primary Small-Width");
       });
       $("#Q1-2-4").change(function() {
           //$("#btnQ1-2-4").attr("class", "btn btn-danger Small-Width active");
           //$("#btnQ1-2-2,#btnQ1-2-3,#btnQ1-2-1").attr("class", "btn btn-primary Small-Width");
           //$("#Q1-2Text").show();
           $("#Q1-2Text").append('<span id="TextQ1-2"><br><br>其他回答者 : <input type="text" id="TQ1-2" style="height:1.5em;" /></span>');

       });
       $("#Q1-2-1,#Q1-2-2,#Q1-2-3").change(function() {
           $("#TextQ1-2").remove();
           //$("#Q1-2Text").hide();

       });
       //-------------------------Q1-3-------------------------
       $("#Q1-3-1").change(function() {
           //$("#btnQ1-3-1").attr("class", "btn btn-danger Small-Width active");
           //$("#btnQ1-3-2,#btnQ1-3-3").attr("class", "btn btn-primary Small-Width");
       });
       $("#Q1-3-2").change(function() {
           //$("#btnQ1-3-2").attr("class", "btn btn-danger Small-Width active");
           //$("#btnQ1-3-1,#btnQ1-3-3").attr("class", "btn btn-primary Small-Width");
       });
       $("#Q1-3-3").change(function() {
           //$("#btnQ1-3-3").attr("class", "btn btn-danger Small-Width active");
           //$("#btnQ1-3-2,#btnQ1-3-1").attr("class", "btn btn-primary Small-Width");
       });

       //-------------------------Q1-4-------------------------
       $("#Q1-4-1").change(function() {
           //$("#btnQ1-4-1").attr("class", "btn btn-danger Middle-Width active");
           //$("#btnQ1-4-2,#btnQ1-4-3,#btnQ1-4-4,#btnQ1-4-5,#btnQ1-4-6").attr("class", "btn btn-primary Middle-Width");
       });
       $("#Q1-4-2").change(function() {
           //$("#btnQ1-4-2").attr("class", "btn btn-danger Middle-Width active");
           //$("#btnQ1-4-1,#btnQ1-4-3,#btnQ1-4-4,#btnQ1-4-5,#btnQ1-4-6").attr("class", "btn btn-primary Middle-Width");
       });
       $("#Q1-4-3").change(function() {
           //$("#btnQ1-4-3").attr("class", "btn btn-danger Middle-Width active");
           //$("#btnQ1-4-2,#btnQ1-4-1,#btnQ1-4-4,#btnQ1-4-5,#btnQ1-4-6").attr("class", "btn btn-primary Middle-Width");
       });
       $("#Q1-4-4").change(function() {
           //$("#btnQ1-4-4").attr("class", "btn btn-danger Middle-Width active");
           //$("#btnQ1-4-2,#btnQ1-4-3,#btnQ1-4-1,#btnQ1-4-5,#btnQ1-4-6").attr("class", "btn btn-primary Middle-Width");
       });
       $("#Q1-4-5").change(function() {
           //$("#btnQ1-4-5").attr("class", "btn btn-danger Middle-Width active");
           //$("#btnQ1-4-2,#btnQ1-4-3,#btnQ1-4-4,#btnQ1-4-1,#btnQ1-4-6").attr("class", "btn btn-primary Middle-Width");
       });
       $("#Q1-4-6").change(function() {
           //$("#btnQ1-4-6").attr("class", "btn btn-danger Middle-Width active");
           //$("#btnQ1-4-2,#btnQ1-4-3,#btnQ1-4-4,#btnQ1-4-5,#btnQ1-4-1").attr("class", "btn btn-primary Middle-Width");
       });

       $("#Q1-4-4,#Q1-4-5,#Q1-4-6").change(function() {
           if (cnt4 == 0) {
               $("#Q1-4Text").append('<span id="TextQ1-4"><br>不滿原因及建議 : <input type="text" id="TQ1-4" style="height:1.5em;" /></span>');
               cnt4++;
           }

       });
       $("#Q1-4-1,#Q1-4-2,#Q1-4-3").change(function() {
           if (cnt4 == 1) {
               $("#TextQ1-4").remove();
               cnt4 = 0;
           }

       });
       //-------------------------Q1-5-------------------------
       $("#Q1-5-1").change(function() {
           //$("#btnQ1-5-1").attr("class", "btn btn-danger Middle-Width active");
           //$("#btnQ1-5-2,#btnQ1-5-3,#btnQ1-5-4,#btnQ1-5-5,#btnQ1-5-6").attr("class", "btn btn-primary Middle-Width");
       });
       $("#Q1-5-2").change(function() {
           //$("#btnQ1-5-2").attr("class", "btn btn-danger Middle-Width active");
           //$("#btnQ1-5-1,#btnQ1-5-3,#btnQ1-5-4,#btnQ1-5-5,#btnQ1-5-6").attr("class", "btn btn-primary Middle-Width");
       });
       $("#Q1-5-3").change(function() {
           //$("#btnQ1-5-3").attr("class", "btn btn-danger Middle-Width active");
           //$("#btnQ1-5-2,#btnQ1-5-1,#btnQ1-5-4,#btnQ1-5-5,#btnQ1-5-6").attr("class", "btn btn-primary Middle-Width");
       });
       $("#Q1-5-4").change(function() {
           //$("#btnQ1-5-4").attr("class", "btn btn-danger Middle-Width active");
           //$("#btnQ1-5-2,#btnQ1-5-3,#btnQ1-5-1,#btnQ1-5-5,#btnQ1-5-6").attr("class", "btn btn-primary Middle-Width");
       });
       $("#Q1-5-5").change(function() {
           //$("#btnQ1-5-5").attr("class", "btn btn-danger Middle-Width active");
           //$("#btnQ1-5-2,#btnQ1-5-3,#btnQ1-5-4,#btnQ1-5-1,#btnQ1-5-6").attr("class", "btn btn-primary Middle-Width");
       });
       $("#Q1-5-6").change(function() {
           //$("#btnQ1-5-6").attr("class", "btn btn-danger Middle-Width active");
           //$("#btnQ1-5-2,#btnQ1-5-3,#btnQ1-5-4,#btnQ1-5-5,#btnQ1-5-1").attr("class", "btn btn-primary Middle-Width");
       });

       $("#Q1-5-4,#Q1-5-5,#Q1-5-6").change(function() {
           if (cnt5 == 0) {
               $("#Q1-5Text").append('<span id="TextQ1-5"><br><br>不滿原因及建議 : <input type="text" id="TQ1-5" style="height:1.5em;" /></span>');
               cnt5++;
           }

       });
       $("#Q1-5-1,#Q1-5-2,#Q1-5-3").change(function() {
           if (cnt5 == 1) {
               $("#TextQ1-5").remove();
               cnt5 = 0;
           }

       });

       //-------------------------Q2-0-------------------------
       $("#Q2-0-2").change(function() {
           //$("#btnQ2-0-2").attr("class", "btn btn-danger active");
           //$("#btnQ2-0-1").attr("class", "btn btn-primary");
           $("#Ds20").hide();

       });
       $("#Q2-0-1").change(function() {
           //$("#btnQ2-0-1").attr("class", "btn btn-danger active");
           //$("#btnQ2-0-2").attr("class", "btn btn-primary");
           $("#Ds20").show();
           //$("#s2-0").removeClass("col-md-12");
           //$("#s2-0").addClass("col-md-6");
       });

       //-------------------------Q2-1-------------------------
       $("#btnQ2-1-1").click(function() {
           if (cnt211 == 0) {
               $("#btnQ2-1-2").removeClass("active");
               $("#btnQ2-1-3").removeClass("active");
               $("#btnQ2-1-4").removeClass("active");
               $("#btnQ2-1-5").removeClass("active");
               $("#btnQ2-1-6").removeClass("active");
               $("#btnQ2-1-7").removeClass("active");
               if (cnt71 == 1) {
                   $("#TextQ2-11").remove();
                   cnt71 = 0;
               }
               if (cnt72 == 1) {
                   $("#TextQ2-12").remove();
                   cnt72 = 0;
               }

               cnt211++;
           } else {
               cnt211 = 0;
           }

       });
       $("#btnQ2-1-6").click(function() {
           if (cnt71 == 0) {
               $("#Q2-11Text").append('<span id="TextQ2-11"><br>其他：<input type="text" id="TQ2-1-1" style="height:1.5em;" /></span>');
               cnt71++;
           } else {
               $("#TextQ2-11").remove();
               cnt71 = 0;
           }

       });
       $("#btnQ2-1-7").click(function() {
           if (cnt72 == 0) {
               $("#Q2-12Text").append('<span id="TextQ2-12"><br>最不舒服為 : <input type="text" id="TQ2-1-2" style="height:1.5em;" /></span>');
               cnt72++;
           } else {
               $("#TextQ2-12").remove();
               cnt72 = 0;
           }

       });
       $("#btnQ2-1-2,#btnQ2-1-3,#btnQ2-1-4,#btnQ2-1-5,#btnQ2-1-6,#btnQ2-1-7").click(function() {
           if (cnt211 == 1) {
               $("#btnQ2-1-1").removeClass("active");
               cnt211 = 0;
           }
       });
       /*
       //-------------------------Q2-2-------------------------
       $("#Q2-2-1").change(function() {
           //$("#btnQ2-2-1").attr("class", "btn btn-danger Max-Width active");
           //$("#btnQ2-2-2,#btnQ2-2-3").attr("class", "btn btn-primary Max-Width");
       });
       $("#Q2-2-2").change(function() {
           //$("#btnQ2-2-2").attr("class", "btn btn-danger Max-Width active");
           //$("#btnQ2-2-1,#btnQ2-2-3").attr("class", "btn btn-primary Max-Width");
       });
       $("#Q2-2-3").change(function() {
           //$("#btnQ2-2-3").attr("class", "btn btn-danger Max-Width active");
           //$("#btnQ2-2-2,#btnQ2-2-1").attr("class", "btn btn-primary Max-Width");
       });
       //-------------------------Q2-3-------------------------
       $("#Q2-3-1").change(function() {
           //$("#btnQ2-3-1").attr("class", "btn btn-danger Small-Width active");
           //$("#btnQ2-3-2").attr("class", "btn btn-primary Small-Width");
       });
       $("#Q2-3-2").change(function() {
           //$("#btnQ2-3-2").attr("class", "btn btn-danger Small-Width active");
           //$("#btnQ2-3-1").attr("class", "btn btn-primary Small-Width");
       });
       $("#Q2-3-31").change(function() {
           //$("#btnQ2-3-31").attr("class", "btn btn-danger Middle-Width active");
           //$("#btnQ2-3-32,#btnQ2-3-33").attr("class", "btn btn-primary Middle-Width");
       });
       $("#Q2-3-32").change(function() {
           //$("#btnQ2-3-32").attr("class", "btn btn-danger Middle-Width active");
           //$("#btnQ2-3-31,#btnQ2-3-33").attr("class", "btn btn-primary Middle-Width");
       });
       $("#Q2-3-33").change(function() {
           //$("#btnQ2-3-33").attr("class", "btn btn-danger Middle-Width active");
           //$("#btnQ2-3-32,#btnQ2-3-31").attr("class", "btn btn-primary Middle-Width");
       });
       */
       $("#Q2-3-2").change(function() {
           //$("#Q2-3Text").append('<span id="TextQ2-3"><br><br>疼痛程度 : <input type="text" size="5" name="who" style="height:1.5em;" />&nbsp;分<br> (異物感(輕1-3)、吞嚥才痛(中4-6)、呼吸也痛(重7-10))<br><br>處置狀況<br><div class="btn-group-toolbar" data-toggle="buttons"><label class="btn btn-primary Middle-Width" id="btnQ2-3-31"><input type="radio" name="Q2-3-3" id="Q2-3-31" value="1">無處置</label><label class="btn btn-primary Middle-Width" id="btnQ2-3-32"><input type="radio" name="Q2-3-3" id="Q2-3-32" value="2">處置有改善</label><label class="btn btn-primary Middle-Width" id="btnQ2-3-33"><input type="radio" name="Q2-3-3" id="Q2-3-33" value="3">處置未改善</label></div></span>');
           $("#Q2-3Text").show();
           $("#Q2-3-31").change(function() {
               //$("#btnQ2-3-31").attr("class", "btn btn-danger Middle-Width active");
               //$("#btnQ2-3-32,#btnQ2-3-33").attr("class", "btn btn-primary Middle-Width");
           });
           $("#Q2-3-32").change(function() {
               //$("#btnQ2-3-32").attr("class", "btn btn-danger Middle-Width active");
               //$("#btnQ2-3-31,#btnQ2-3-33").attr("class", "btn btn-primary Middle-Width");
           });
           $("#Q2-3-33").change(function() {
               //$("#btnQ2-3-33").attr("class", "btn btn-danger Middle-Width active");
               //$("#btnQ2-3-32,#btnQ2-3-31").attr("class", "btn btn-primary Middle-Width");
           });
       });
       $("#Q2-3-1").change(function() {
           //$("#TextQ2-3").remove();
           $("#Q2-3Text").hide();

       });
       //-------------------------Q2-4-------------------------
       $("#Q2-4-1").change(function() {
           //$("#btnQ2-4-1").attr("class", "btn btn-danger Large-Width active");
           //$("#btnQ2-4-2,#btnQ2-4-3").attr("class", "btn btn-primary Large-Width");
       });
       $("#Q2-4-2").change(function() {
           //$("#btnQ2-4-2").attr("class", "btn btn-danger Large-Width active");
           //$("#btnQ2-4-1,#btnQ2-4-3").attr("class", "btn btn-primary Large-Width");
       });
       $("#Q2-4-3").change(function() {
           //$("#btnQ2-4-3").attr("class", "btn btn-danger Large-Width active");
           //$("#btnQ2-4-2,#btnQ2-4-1").attr("class", "btn btn-primary Large-Width");
       });
       $("#Q2-4-2,#Q2-4-3").change(function() {

           if (cnt10 == 0) {
               //$("#Q2-4Text").append('<span id="TextQ2-4"><br><br>處置狀況<br><div class="btn-group" data-toggle="buttons"><label class="btn btn-primary" id="btnQ2-4-31"><input type="radio" name="Q2-4-3" id="Q2-4-31" value="1">無處置</label><label class="btn btn-primary" id="btnQ2-4-32"><input type="radio" name="Q2-4-3" id="Q2-4-32" value="2">處置有改善</label><label class="btn btn-primary" id="btnQ2-4-33"><input type="radio" name="Q2-4-3" id="Q2-4-33" value="3">處置未改善</label></div></span>');
               $("#Q2-4Text").show();
               cnt10++;
               $("#Q2-4-31").change(function() {
                   //$("#btnQ2-4-31").attr("class", "btn btn-danger active");
                   //$("#btnQ2-4-32,#btnQ2-4-33").attr("class", "btn btn-primary");
               });
               $("#Q2-4-32").change(function() {
                   //$("#btnQ2-4-32").attr("class", "btn btn-danger active");
                   //$("#btnQ2-4-31,#btnQ2-4-33").attr("class", "btn btn-primary");
               });
               $("#Q2-4-33").change(function() {
                   //$("#btnQ2-4-33").attr("class", "btn btn-danger active");
                   //$("#btnQ2-4-32,#btnQ2-4-31").attr("class", "btn btn-primary");
               });
           }

       });
       $("#Q2-4-1").change(function() {
           //$("#TextQ2-4").remove();
           $("#Q2-4Text").hide();
           cnt10 = 0;

       });

       //-------------------------Q2-5-------------------------
       $("#Q2-5-2").change(function() {
           //$("#Q2-5Text").append('<span id="TextQ2-5"><br><br>疼痛程度 : <input type="text" size="5" name="who" style="height:1.5em;" />分<br><br>處置狀況<br><div class="btn-group" data-toggle="buttons"><label class="btn btn-primary active"><input type="radio" name="Q2-5-3" id="Q2-5-31" value="1">無處置</label><label class="btn btn-primary"><input type="radio" name="Q2-5-3" id="Q2-5-32" value="2">處置有改善</label><label class="btn btn-primary"><input type="radio" name="Q2-5-3" id="Q2-5-33" value="3">處置未改善</label></div></span>');
           $("#Q2-5Text").show();
       });
       $("#Q2-5-1").change(function() {
           //$("#TextQ2-5").remove();
           $("#Q2-5Text").hide();

       });

       //-------------------------Q2-6-------------------------
       $("#Q2-6-2,#Q2-6-3,#Q2-6-4").change(function() {

           if (cnt12 == 0) {
               //$("#Q2-6Text").append('<span id="TextQ2-6"><br><br>處置狀況<br><div class="btn-group" data-toggle="buttons"><label class="btn btn-primary active"><input type="radio" name="Q2-6-3" id="Q2-6-31" value="1">無處置</label><label class="btn btn-primary"><input type="radio" name="Q2-6-3" id="Q2-6-32" value="2">處置有改善</label><label class="btn btn-primary"><input type="radio" name="Q2-6-3" id="Q2-6-33" value="3">處置未改善</label></div></span>');
               $("#Q2-6Text").show();
               cnt12++;
           }

       });
       $("#Q2-6-1").change(function() {
           //$("#TextQ2-6").remove();
           $("#Q2-6Text").hide();
           cnt12 = 0;

       });

       //-------------------------Q2-7-------------------------
       $("#Q2-7-2,#Q2-7-3,#Q2-7-4").change(function() {

           if (cnt13 == 0) {
               //$("#Q2-7Text").append('<span id="TextQ2-7"><br><br>處置狀況<br><div class="btn-group" data-toggle="buttons"><label class="btn btn-primary active"><input type="radio" name="Q2-7-3" id="Q2-7-31" value="1">無處置</label><label class="btn btn-primary"><input type="radio" name="Q2-7-3" id="Q2-7-32" value="2">處置有改善</label><label class="btn btn-primary"><input type="radio" name="Q2-7-3" id="Q2-7-33" value="3">處置未改善</label></div></span>');
               $("#Q2-7Text").show();
               cnt13++;
           }

       });
       $("#Q2-7-1").change(function() {
           //$("#TextQ2-7").remove();
           $("#Q2-7Text").hide();
           cnt13 = 0;

       });

       //-------------------------Q2-8-------------------------
       $("#Q2-8-2").change(function() {

           if (cnt14 == 0) {
               //$("#Q2-82Text").append('<span id="TextQ2-82"><br><br>處置狀況<br><div class="btn-group" data-toggle="buttons"><label class="btn btn-primary active"><input type="radio" name="Q2-8-3" id="Q2-8-31" value="1">無處置</label><label class="btn btn-primary"><input type="radio" name="Q2-8-3" id="Q2-8-32" value="2">處置有改善</label><label class="btn btn-primary"><input type="radio" name="Q2-8-3" id="Q2-8-33" value="3">處置未改善</label></div></span>');
               $("#Q2-82Text").show();
               cnt14++;
           }
           //$("#Q2-81Text").append('<span id="TextQ2-81"><br><br>嘔吐次數 : <input type="text" size="5" name="who" style="height:1.5em;" />次</span>');
           $("#Q2-81Text").show();
       });

       $("#Q2-8-3").change(function() {

           if (cnt14 == 0) {
               //$("#Q2-82Text").append('<span id="TextQ2-82"><br><br>處置狀況<br><div class="btn-group" data-toggle="buttons"><label class="btn btn-primary active"><input type="radio" name="Q2-8-3" id="Q2-8-31" value="1">無處置</label><label class="btn btn-primary"><input type="radio" name="Q2-8-3" id="Q2-8-32" value="2">處置有改善</label><label class="btn btn-primary"><input type="radio" name="Q2-8-3" id="Q2-8-33" value="3">處置未改善</label></div></span>');
               $("#Q2-82Text").show();
               cnt14++;
           }
           $("#Q2-81Text").hide();
           //$("#TextQ2-81").remove();

       });
       $("#Q2-8-1").change(function() {
           $("#Q2-82Text").hide();
           $("#Q2-81Text").hide();
           //$("#TextQ2-82").remove();
           //$("#TextQ2-81").remove();
           cnt14 = 0;

       });
       //-------------------------Q2-9-------------------------
       $("#Q2-9-4").change(function() {
           //$("#Q2-9Text").append('<span id="TextQ2-9"><br><br>處置方式<br><div class="btn-group" data-toggle="buttons"><label class="btn btn-primary active"><input type="radio" name="Q13-3" id="Q13-31" value="1">單導</label><label class="btn btn-primary"><input type="radio" name="Q13-3" id="Q13-32" value="2">on Foley</label></div></span>');
           $("#Q2-9Text").show();
       });
       $("#Q2-9-1,#Q2-9-2,#Q2-9-3").change(function() {
           //$("#TextQ2-9").remove();
           $("#Q2-9Text").hide();

       });

       //-------------------------Q2-11-------------------------
       $("#Q2-11-2").change(function() {
           //$("#Q2-111Text").append('<span id="TextQ2-111"><br><br>症狀 : <input type="text" name="who" style="height:1.5em;" /></span>');
           $("#Q2-111Text").show();

       });
       $("#Q2-11-1").change(function() {
           //$("#TextQ2-111").remove();
           $("#Q2-111Text").hide();

       });

       //-------------------------Q2-13-------------------------
       $("#Q2-13-2").change(function() {
           //$("#Q2-131Text").append('<span id="TextQ2-131"><br><br>部位 : <input type="text" name="who" style="height:1.5em;" /></span>');
           $("#Q2-131Text").show();

       });
       $("#Q2-13-1").change(function() {
           //$("#TextQ2-131").remove();
           $("#Q2-131Text").hide();

       });

       //-------------------------Q2-14-------------------------
       $("#ttestt").blur(function() {
           var t = $("#ss011").val().split("：");
           if (t[1].val() == "全麻") {
               $("#s2-14").show();
               //$("#s2-15").height($("#s2-14").height());
           } else {
               $("#s2-14").hide();

           }
       });

       $("#Q2-14-2").change(function() {
           //$("#Q2-141Text").append('<span id="TextQ2-141"><br><br>部位 : <input type="text" name="who" style="height:1.5em;" /></span>');
           $("#Q2-141Text").show();

       });
       $("#Q2-14-1").change(function() {
           //$("#TextQ2-141").remove();
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
           $("#Q3-1Text").append('<span id="TextQ3-1"><br><br>疼痛程度 : <input type="text" size="5" id="TQ3-1" style="height:1.5em;" />分 {輕微(1-3)、中度(4-6)、嚴重(7-10)}</span>');
       });
       $("#Q3-1-1").change(function() {
           $("#TextQ3-1").remove();
       });
       //-------------------------Q3-2-------------------------
       $("#Q3-2-1,#Q3-2-2").change(function() {
           $("#Ds3-2").hide();
           //$("#Ds40").hide();
       });
       $("#Q3-2-3").change(function() {
           $("#Ds3-2").show();
           //$("#Ds40").show();
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
           //$("#TextQ5-0-11").remove();
           $("#Q5-0-4Text").hide();
           //$("#TextQ5-0-2141").remove();
           $("#Q5-0-211Text").hide();
           //$("#Q5-0Text").append('<span id="TextQ5-0-1"><br><br>訪視後處置<div class="btn-group-toolbar" data-toggle="buttons"><label class="btn btn-primary Large-Width" id="btnQ5-0-11"><input type="radio" name="Q5-0-1" id="Q5-0-11" value="1">訪視完成並結案</label><label class="btn btn-primary Large-Width" id="btnQ5-0-12"><input type="radio" name="Q5-0-1" id="Q5-0-12" value="2">通知主治醫師</label></div></span>');
           $("#Q5-0Text").show();

           $("#Qs5-0-1-2").change(function() {
               //$("#Q5-0-2Text").append('<span id="TextQ5-0-21"><br><br>通知主治醫師<br><div class="btn-group-toolbar" data-toggle="buttons"><label class="btn btn-primary Large-Width" id="btnQ5-0-21"><input type="radio" name="Q5-0-2" id="Q5-0-21" value="1">再訪</label><label class="btn btn-primary Large-Width" id="btnQ5-0-22"><input type="radio" name="Q5-0-2" id="Q5-0-22" value="2">處置方式</label><label class="btn btn-primary Large-Width" id="btnQ5-0-23"><input type="radio" name="Q5-0-2" id="Q5-0-23" value="3">直接結案</label></div></span>');
               $("#Q5-0-2Text").show();
               $("#Qs5-0-2-1,#Qs5-0-2-3").change(function() {
                   //$("#TextQ5-0-31").remove();
                   $("#Q5-0-3Text").hide();
               });


               $("#Qs5-0-2-2").change(function() {
                   //$("#Q5-0-3Text").append('<span id="TextQ5-0-31"><br>處置方式 : <input type="text" name="who" style="height:1.5em;" /></span>');
                   $("#Q5-0-3Text").show();
               });

           });
           $("#Qs5-0-1-1").change(function() {
               //$("#TextQ5-0-31").remove();
               $("#Q5-0-3Text").hide();
               //$("#TextQ5-0-21").remove();
               $("#Q5-0-2Text").hide();
           });

       });

       $("#Q5-0-2").change(function() {
           //$("#TextQ5-0-1").remove();
           $("#Q5-0Text").hide();
           //$("#TextQ5-0-31").remove();
           $("#Q5-0-3Text").hide();
           //$("#TextQ5-0-21").remove();
           $("#Q5-0-2Text").hide();

           //$("#Q5-0-2Text").append('<span id="TextQ5-0-11"><br><br>未完成訪視<div class="btn-group-toolbar" data-toggle="buttons"><label class="btn btn-primary Large-Width" id="btnQ5-0-211"><input type="radio" name="Q5-0-21" id="Q5-0-211" value="1">已出院</label><label class="btn btn-primary Large-Width" id="btnQ5-0-212"><input type="radio" name="Q5-0-21" id="Q5-0-212" value="2">病人不在</label><label class="btn btn-primary Large-Width" id="btnQ5-0-213"><input type="radio" name="Q5-0-21" id="Q5-0-213" value="3">睡覺中</label><label class="btn btn-primary Large-Width" id="btnQ5-0-214"><input type="radio" name="Q5-0-21" id="Q5-0-214" value="4">其他</label></div></span>');
           $("#Q5-0-4Text").show();

           $("#Qs5-0-3-4").change(function() {
               //$("#Q5-0-211Text").append('<span id="TextQ5-0-2141"><br>其他 : <input type="text" name="who" style="height:1.5em;" /></span>');
               $("#Q5-0-211Text").show();
           });
           $("#Qs5-0-3-1,#Qs5-0-3-2,#Qs5-0-3-3").change(function() {
               //$("#TextQ5-0-2141").remove();
               $("#Q5-0-211Text").hide();
           });

       });
       
        var font=14;
       $("#fontbig").click(function() {
           if(font<=18){
                font=font+1;
                $("#body").attr("style", "font-size:"+font+"px;");
           }
        });
       
       $("#fontsmall").click(function() {
           if(font>=14){
                font=font-1;
                $("#body").attr("style", "font-size:"+font+"px;");
           }
        });
       //
   });


   $(document).on('click', '.navbar-collapse.in', function(e) {
       if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
           $(this).collapse('hide');
       }
   });
