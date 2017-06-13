$(document).ready(function() {
    var cnt513 = 0,
        cnt5221 = 0,
        cnt5224 = 0,
        cntasa = 0,
        id = 1;
    /*
    patient_info["開始使用時間"] = "";
    patient_info["麻醉結束時間"] = "";
    patient_info["臨時上機"] = "";
    patient_info["臨時上機-時間"] = "";
    patient_info["臨時上機-地點"] = "";
    patient_info["臨時上機-已用藥物"] = "";
    patient_info["Cr/洗腎"] = "";
    patient_info["個人史"] = "";
    patient_info["藥物過敏"] = "";
    patient_info["長期使用opioids"] = "";
    patient_info["止痛方式"] = "";
    patient_info["止痛方式-位置"] = "";
    patient_info["止痛方式-fix"] = "";
    patient_info["止痛方式-施打者"] = "";

    patient_info["止痛藥物"] = ""; //整合totall
    patient_info["zofran已給"] = ""; //(mg+麻打/分兩次)

    patient_info["單位設定"] = "";
    patient_info["Loading-初始設定"] = "";
    patient_info["Loading-調整後"] = "";
    patient_info["Bolus-初始設定"] = "";
    patient_info["Bolus-調整後"] = "";
    patient_info["Contin.-初始設定"] = "";
    patient_info["Contin.-調整後"] = "";
    patient_info["Interval-初始設定"] = "";
    patient_info["Interval-調整後"] = "";
    patient_info["4H limit-初始設定"] = "";
    patient_info["4H limit-調整後"] = "";

    patient_info["下床時間"] = "";
    patient_info["排氣時間"] = "";
    patient_info["鎖牌號碼"] = "";
    patient_info["機號"] = "";
    patient_info["胎次"] = "";
    patient_info["PCA同意書確認"] = "";
    patient_info["PFE(PCA)"] = "";
    patient_info["OR/POR 用藥"] = "";

    patient_info["病人狀況-日期"] = "";
    patient_info["病人狀況-時間"] = "";
    patient_info["已輸液量(自控)"] = "";
    patient_info["已輸液量(請求)"] = "";
    patient_info["VAS(動)"] = "";
    patient_info["VAS(靜)"] = "";
    patient_info["宮縮痛"] = "";

    patient_info["頭暈"] = "";
    patient_info["噁心"] = "";
    patient_info["嘔吐"] = "";
    patient_info["癢疹"] = "";
    patient_info["嗜睡"] = "";
    patient_info["難尿"] = "";
    patient_info["頭痛"] = "";
    patient_info["腳麻"] = "";
    patient_info["EA導管"] = "";
    patient_info["衛教"] = "";
    patient_info["處置"] = "";

    */


    //-----------------------------------------------------------------------------------------
    //開啟資料庫
    var db;
    var htemp = window.location.href.split("=");
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
            //$("#ss07").append(Today.getFullYear() + "/" + (Today.getMonth() + 1) + "/" + Today.getDate() + "  " + Today.getHours() + ":" + Today.getMinutes());
            $("#Qtime1").html((Today.getMonth() + 1) + " 月 " + Today.getDate() + " 日");
            $("#Qtime2").html(Today.getHours() + " 點 " + Today.getMinutes() + " 分");
            //$("#ss012").append(request.result.病歷號);
            $("#ss01").append(request.result.姓名);
            $("#ss03").append(request.result.性別);
            $("#ss04").append(request.result.年齡);
            $("#ss06").append(request.result.診斷);
            $("#ss07").append(request.result.術式);
            $("#ss014").append(request.result.麻VS);

            //patient_info['機號'] = request.result.機號;
            //patient_info['刀序1'] = request.result.刀序1;
            //patient_info['刀序2'] = request.result.刀序2;
            patient_info['姓名'] = request.result.姓名;
            patient_info['病房'] = request.result.病房;
            patient_info['病歷號'] = request.result.病歷號;
            patient_info['性別'] = request.result.性別;
            patient_info['年齡'] = request.result.年齡;
            patient_info['診斷'] = request.result.診斷;
            patient_info['術式'] = request.result.術式;
            //patient_info['天數'] = request.result.天數;
            //patient_info['麻VS'] = request.result.麻VS;
            //patient_info['備註'] = request.result.備註;
            //patient_info['入帳'] = request.result.入帳;
            //patient_info['入帳']= $('input[name=Q1-1]:checked').val();

//=================================================================================
              var request1 = indexedDB.open("Form2Database");
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

    //=================================================================================

    $("#Q5-1-3Text").hide();
    $("#Q5-2-2-1Text").hide();
    $("#Q5-2-2-4Text").hide();
    $("#QC5-4-1-1").hide();
    $("#QC5-4-1-2").hide();
    $("#QC5-4-1-3").hide();
    $("#QC5-4-1-4").hide();
    $("#Q5-6-4-2Text").hide();
    $("#Q5-6-4-1Text").hide();
    $("#QC5-4-1-1SEL1").show();
    $("#QC5-4-1-1SEL2").hide();
    $("#QC5-4-1-1SEL3").hide();

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
        patient_info["開始使用時間"] = $("#StartHour").find(":selected").text() + ":" + $("#StartMin").find(":selected").text();
        patient_info["麻醉結束時間"] = $("#EndHour").find(":selected").text() + ":" + $("#EndMin").find(":selected").text();
        if (cnt513 == 1) {
            patient_info["臨時上機"] = "是";
            patient_info["臨時上機-時間"] = $("#month5-3-1").find(":selected").text() + "月" + $("#day5-3-1").find(":selected").text() + "日" + $("#hour-3-1").find(":selected").text() + "時" + $("#min5-3-1").find(":selected").text() + "分";
            patient_info["臨時上機-地點"] = $("#Place5-3-1").find(":selected").text();
            patient_info["臨時上機-已用藥物"] = $("#medicine5-3-1").val();
        } else {
            patient_info["臨時上機"] = "否";
            patient_info["臨時上機-時間"] = "";
            patient_info["臨時上機-地點"] = "";
            patient_info["臨時上機-已用藥物"] = "";
        }

        patient_info["Cr/洗腎"] = $("#T5-2-1").val();

        var pertemp = "";

        if ($("#Q5-2-2-1").prop('checked')) {
            pertemp = "藥物過敏";
            patient_info["藥物過敏"] = $("#QT5-2-2-1").val();
        } else {
            patient_info["藥物過敏"] = "";
        }

        if ($("#Q5-2-2-2").prop('checked')) {
            if (pertemp == "")
                pertemp = "腸胃潰瘍史";
            else
                pertemp = pertemp + "|腸胃潰瘍史";
        }

        if ($("#Q5-2-2-3").prop('checked')) {
            if (pertemp == "")
                pertemp = "藥癮/毒癮患者";
            else
                pertemp = pertemp + "|藥癮/毒癮患者";
        }

        if ($("#Q5-2-2-4").prop('checked')) {
            patient_info["長期使用opioids"] = $("#QT5-2-2-4").val();
            if (pertemp == "")
                pertemp = "長期使用opioids";
            else
                pertemp = pertemp + "|長期使用opioids";
        } else {
            patient_info["長期使用opioids"] = "";
        }

        patient_info["個人史"] = pertemp;

        patient_info["止痛方式"] = RadioCkeck("n5-3-1");
        patient_info["止痛方式-位置"] = $("#Q5-3-2-1").val();
        patient_info["止痛方式-fix"] = $("#Q5-3-2-2").val();
        patient_info["止痛方式-施打者"] = $("#Q5-3-2-3").val();


        if (RadioCkeck("n5-4-1") == "case 1") {
            if ($("#SEL5-4-1-1").find(":selected").text() == "Keto") {
                patient_info["止痛藥物"] = "0.1% Morphine 100 mg /100 ml/Bag +" + $("#SEL5-4-1-1").find(":selected").text() + "*" + $("#QC5-4-1-1SEL1").find(":selected").text() + "支";
            } else if ($("#SEL5-4-1-1").find(":selected").text() == "Vena") {
                patient_info["止痛藥物"] = "0.1% Morphine 100 mg /100 ml/Bag +" + $("#SEL5-4-1-1").find(":selected").text() + "*" + $("#QC5-4-1-1SEL2").find(":selected").text() + "支";
            } else {
                patient_info["止痛藥物"] = $("#QtC5-4-1-1SEL3").val();
            }

        } else if (RadioCkeck("n5-4-1") == "case 2") {
            patient_info["止痛藥物"] = "Marcaine 265mg+ fentanyl 500mcg in N/S：400ml";
        } else if (RadioCkeck("n5-4-1") == "case 3") {
            patient_info["止痛藥物"] = "Marcaine " + $("#QCs5-4-1-3").find(":selected").text() + "mg+ fentanyl " + $("#QCs5-4-1-3-2").find(":selected").text() + "mcg+ morphine " + $("#QCs5-4-1-3-3").find(":selected").text() + "mg：400ml";
        } else if (RadioCkeck("n5-4-1") == "其他") {
            patient_info["止痛藥物"] = $("#QCt5-4-1-4").val();
        } else {
            patient_info["止痛藥物"] = ""; //整合totall 
        }



        patient_info["zofran已給"] = $("#Q5-4-2-1").val() + " mg " + RadioCkeck("n5-2-1"); //(mg+麻打/分兩次)

        patient_info["單位設定"] = RadioCkeck("n5-5-1");
        patient_info["Loading-初始設定"] = $("#Q5-5-2-1-1").val();
        patient_info["Loading-調整後"] = $("#Q5-5-2-1-2").val();
        patient_info["Bolus-初始設定"] = $("#Q5-5-2-2-1").val();
        patient_info["Bolus-調整後"] = $("#Q5-5-2-2-2").val();
        patient_info["Contin.-初始設定"] = $("#Q5-5-2-3-1").val();
        patient_info["Contin.-調整後"] = $("#Q5-5-2-3-2").val();
        patient_info["Interval-初始設定"] = $("#Q5-5-2-4-1").val();
        patient_info["Interval-調整後"] = $("#Q5-5-2-4-2").val();
        patient_info["4H limit-初始設定"] = $("#Q5-5-2-5-1").val();
        patient_info["4H limit-調整後"] = $("#Q5-5-2-5-2").val();

        patient_info["下床時間"] = $("#dbedhour").find(":selected").text() + ":" + $("#dbedmin").find(":selected").text();
        patient_info["排氣時間"] = $("#blhour").find(":selected").text() + ":" + $("#blmin").find(":selected").text();
        patient_info["鎖牌號碼"] = $("#Q5-6-1-1").val();
        patient_info["機號"] = $("#Q5-6-1-2").val();
        patient_info["胎次"] = $("#Q5-6-1-3").val();

        if ($("#Q5-6-2").prop('checked')) {
            patient_info["PCA同意書確認"] = "已確認";
        } else {
            patient_info["PCA同意書確認"] = "未確認";
        }

        pertemp = "";

        if ($("#Q5-6-3-1").prop('checked')) {
            pertemp = "已術訪";
        }

        if ($("#Q5-6-3-2").prop('checked')) {
            if (pertemp == "") {
                pertemp = "已完成";
            } else {
                pertemp = "|已完成";
            }
        }

        patient_info["PFE(PCA)"] = pertemp;


        patient_info["病人狀況-日期"] = $("#Qtime1").html();
        patient_info["病人狀況-時間"] = $("#Qtime2").html();
        patient_info["已輸液量(自控)"] = $("#Qtime3").val();
        patient_info["已輸液量(請求)"] = $("#Qtime4").val();
        patient_info["VAS(動)"] = $("#Qtime5").find(":selected").text();
        patient_info["VAS(靜)"] = $("#Qtime6").find(":selected").text();
        patient_info["宮縮痛"] = $("#s8").find(":selected").text();

        patient_info["頭暈"] = $("#FF1").find(":selected").text();
        patient_info["噁心"] = $("#FF2").find(":selected").text();
        patient_info["嘔吐"] = $("#FF3").find(":selected").text();
        patient_info["癢疹"] = $("#FF4").find(":selected").text();
        patient_info["嗜睡"] = $("#FF5").find(":selected").text();
        patient_info["難尿"] = $("#FF6").find(":selected").text();
        patient_info["頭痛"] = $("#FF7").find(":selected").text();
        patient_info["腳麻"] = $("#FF8").find(":selected").text();
        patient_info["EA導管"] = $("#FF9").find(":selected").text();
        patient_info["衛教"] = $("#FF10").find(":selected").text();
        patient_info["處置"] = $("#FF11").find(":selected").text();

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
        console.log(patient_info);
    });

    $("#Q5-1-3").click(function() {
        if (cnt513 == 0) {
            cnt513 = 1;
            //$("#Q5-1-3").attr("class", "btn btn-danger");
            $("#Q5-1-3Text").show();
        } else {
            cnt513 = 0;
            //$("#Q5-1-3").attr("class", "btn btn-primary");
            $("#Q5-1-3Text").hide();
        }
    });

    $("#Q5-2-2-1").change(function() {
        if (cnt5221 == 0) {
            cnt5221 = 1;
            //$("#Q5-1-3").attr("class", "btn btn-danger");
            $("#Q5-2-2-1Text").show();
        } else {
            cnt5221 = 0;
            //$("#Q5-1-3").attr("class", "btn btn-primary");
            $("#Q5-2-2-1Text").hide();
        }
    });

    $("#Q5-2-2-4").change(function() {
        if (cnt5224 == 0) {
            cnt5224 = 1;
            //$("#Q5-1-3").attr("class", "btn btn-danger");
            $("#Q5-2-2-4Text").show();
        } else {
            cnt5224 = 0;
            //$("#Q5-1-3").attr("class", "btn btn-primary");
            $("#Q5-2-2-4Text").hide();
        }
    });

    $("#Q5-4-1-1").change(function() {

        $("#QC5-4-1-1").show();
        $("#QC5-4-1-2").hide();
        $("#QC5-4-1-3").hide();
        $("#QC5-4-1-4").hide();
        //$(window).resize();
    });


    $('select').change(function() {
        id = $("#SEL5-4-1-1").find(':selected').data('id');
        //或是以下方式也可以
        //id= $(this).find(':selected').attr('data-id');              
        //alert(id2);
        if (id == 1) {
            $("#QC5-4-1-1SEL1").show();
            $("#QC5-4-1-1SEL2").hide();
            $("#QC5-4-1-1SEL3").hide();
        } else if (id == 2) {
            $("#QC5-4-1-1SEL1").hide();
            $("#QC5-4-1-1SEL2").show();
            $("#QC5-4-1-1SEL3").hide();
        } else if (id == 3) {
            $("#QC5-4-1-1SEL1").hide();
            $("#QC5-4-1-1SEL2").hide();
            $("#QC5-4-1-1SEL3").show();
        }

    });


    $("#Q5-4-1-2").change(function() {
        $("#QC5-4-1-2").show();
        $("#QC5-4-1-1").hide();
        $("#QC5-4-1-3").hide();
        $("#QC5-4-1-4").hide();
        $(window).resize();
    });
    $("#Q5-4-1-3").change(function() {
        $("#QC5-4-1-3").show();
        $("#QC5-4-1-1").hide();
        $("#QC5-4-1-2").hide();
        $("#QC5-4-1-4").hide();
        $(window).resize();
    });
    $("#Q5-4-1-4").change(function() {
        $("#QC5-4-1-4").show();
        $("#QC5-4-1-1").hide();
        $("#QC5-4-1-2").hide();
        $("#QC5-4-1-3").hide();
        $(window).resize();
    });

    //-------------------------Q5-6-------------------------
    /*$("#Q5-6-4-1").change(function() {
        $("#Q5-6-4-1Text").show();
        $("#Q5-6-4-2Text").hide();
    });
    $("#Q5-6-4-2").change(function() {
        $("#Q5-6-4-1Text").hide();
        $("#Q5-6-4-2Text").show();
    });*/
});

$(document).on('click', '.navbar-collapse.in', function(e) {
    if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
        $(this).collapse('hide');
    }
});