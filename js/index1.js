$(document).ready(function() {
    var cnt51211 = 0, cnt51212 = 0, cnt51214 = 0,
        cnt51411 = 0, cnt51412 = 0, cnt51414 = 0,
        cnt513 = 0,
        cnt5221 = 0, cnt5224 = 0,
        cnt5232 = 0, cnt5233 = 0, cnt5234 = 0,
        cntasa = 0,
        id = 1,
        Q21 = 0,
        Q33 = 0,
        hd2 = 0, hd3 = 0, hd4 = 0, hd5 = 0, hd6 = 1;
    
    $("#Q5-1-3Text").hide();    
    $("#Q5-1-2-1-1Text,#Q5-1-2-1-2Text,#Q5-1-2-1-4Text").hide();
    $("#Q5-1-4-1-1Text,#Q5-1-4-1-2Text,#Q5-1-4-1-4Text").hide();
    $("#Q5-2-2-1Text,#Q5-2-2-4Text").hide();
    $("#Q5-2-3-2Text,#Q5-2-3-3Text,#Q5-2-3-4Text").hide();
    $("#Q5-3-1,#Q5-3-2,#Q5-3-3,#Q5-3-4,#Q5-3-5,#Q5-3-6").hide();
    $("#QT5-3-1,#QT5-3-2").hide();
    $("#QT5-3-3-1,#QT5-3-3-2,#QT5-3-3-3,#QT5-3-3-4,#QT5-3-3-5").hide();
    $("#QT5-3-4-1,#QT5-3-4-2,#QT5-3-4-3,#QT5-3-4-4,#QT5-3-4-5").hide();
    $("#QT5-3-5-1,#QT5-3-5-2,#QT5-3-5-3,#QT5-3-5-4,#QT5-3-5-5").hide();    
    $("#Q5-6-4-2Text,#Q5-6-4-1Text").hide();
    $("#QC5-4-1-1SEL1,#QC5-4-1-1SEL2,#QC5-4-1-1SEL3").show();
    $("#FF9-1Btn").hide();
    $("#QQ5-6").hide("fast");
    
    $("#btnQF1-1").addClass("active");	$("#QF1-1").prop("checked", true);
	$("#btnQF2-1").addClass("active");	$("#QF2-1").prop("checked", true);
	$("#btnQF3-1").addClass("active");	$("#QF3-1").prop("checked", true);
	$("#btnQF4-1").addClass("active");	$("#QF4-1").prop("checked", true);
	$("#btnQF5-1").addClass("active");	$("#QF5-1").prop("checked", true);
	$("#btnQF6-1").addClass("active");	$("#QF6-1").prop("checked", true);
	$("#btnQF7-1").addClass("active");	$("#QF7-1").prop("checked", true);
	$("#btnQF8-1").addClass("active");	$("#QF8-1").prop("checked", true);
	$("#btnQF11-1").addClass("active");	$("#QF11-1").prop("checked", true);


    //-----------------------------------------------------------------------------------------
    //開啟資料庫
    var db;
    var hhtemp = 0;
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

          if(htemp[1].search("-") != -1) {
            hhtemp = htemp[1];
            //historyDB = 1;
            var htemp1 = htemp[1].split("-");

            if(htemp1[1] == "2") {
              htemp[1] = htemp1[0];
            } else {
              htemp[1] = htemp1[0] + "-" + (parseInt(htemp1[1])-1);
            }

          }

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
            $("#ss01").attr("value", request.result.姓名);
            $("#ss03").attr("value", request.result.性別);
            $("#ss04").attr("value", request.result.年齡);            
            $("#ss07").attr("value", request.result.術式);
            
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

            //=================================================================================
            var request1 = indexedDB.open("Form2Database");
            request1.onerror = function(event) {
                alert("Why didn't you allow my web app to use IndexedDB?!");
            };
            request1.onsuccess = function(event) {
                db = event.target.result;
                console.log(db);

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

                    SelectCheckbox("Q5-2-2", patient_info['個人史'], "藥物過敏", "腸胃潰瘍史", "藥癮/毒癮患者", "長期使用opioids");
                    SetText("Q5-2-2-1Text", "QT5-2-2-1", patient_info['藥物過敏'], patient_info['個人史'], "藥物過敏");
                    SetText("Q5-2-2-4Text", "QT5-2-2-4", patient_info['長期使用opioids'], patient_info['個人史'], "長期使用opioids");
                    
                    var temp = patient_info['麻醉結束時間'].split(":");
                    $("#EndHour").val(temp[0]);
                    $("#EndMin").val(temp[1]);

                    var temp = patient_info['預計使用期間'].split(":");
                    $("#StartMonth").val(temp[0]);
                    $("#StartDay").val(temp[1]);
                    
                    $("#Q5-1-1").val(patient_info["已知用藥-Zfran"]);                    
                    
                    
                    SelectRadio("5-1-3","臨時上機","臨時上機");
                    $("#p5").html(patient_info["臨時上機-時間"]);
                    $("#Place5-3-1").val(patient_info['臨時上機-地點']);
                    
                    SetText("Q5-3-1-1Text", "Q5-3-1-1", patient_info['機號'], patient_info['個人史'], "藥物過敏");

                    $("#Q5-3-1-1").val(patient_info["機號"]);
                    $("#Q5-3-1-2").val(patient_info["鎖牌號碼"]);                 
                   

                    temp = patient_info['下床時間'].split(":");
                    $("#dbedhour").val(temp[0]);
                    $("#dbedmin").val(temp[1]);

                    temp = patient_info['排氣時間'].split(":");
                    $("#blhour").val(temp[0]);
                    $("#blmin").val(temp[1]);

                    $("#Q5-6-1-1").val(patient_info['鎖牌號碼']);
                    $("#Q5-6-1-2").val(patient_info['機號']);
                    $("#Q5-6-1-3").val(patient_info['胎次']);

                    if(patient_info['PCA同意書確認'] = "已確認") {
                        RadioSet("n5-6-2");
                    }
                    
                    SelectCheckbox("n5-6-3", patient_info['PFE(PCA)'], "術訪", "完成");

                    $("#Qtime3").val(patient_info['已輸液量(自控)']);
                    $("#Qtime4").val(patient_info['已輸液量(請求)']);

                    $("#Qtime5").val(patient_info['VAS(動)']);
                    $("#Qtime6").val(patient_info['VAS(靜)']);
                    $("#s8").val(patient_info['宮縮痛']);

                    SelectRadio("F1",patient_info["頭暈"],"無", "不按也會", "按多才會", "幾乎每次按都會");
                    SelectRadio("F2",patient_info["噁心"],"無", "不按也會", "按多才會", "幾乎每次按都會");
                    SelectRadio("F3",patient_info["嘔吐"],"無", "不按也會", "按多才會", "幾乎每次按都會");
                    SelectRadio("F4",patient_info["癢疹"],"無", "需抓癢但可以接受", "冷毛巾可改善", "需用藥");
                    SelectRadio("F5",patient_info["嗜睡"],"無", "聲音可喚醒", "物理刺激可喚醒", "無法喚醒");
                    SelectRadio("F6",patient_info["難尿"],"無", "待自解", "輕微可自解", "需導管", "on foley");
                    SelectRadio("F7",patient_info["頭痛"],"無", "與姿勢改變無關", "與姿勢改變有關");
                    SelectRadio("F8",patient_info["腳麻"],"無", "感覺減弱", "影響muscle power");
                    SelectRadio("F11",patient_info["處置"],"調整設定", "Keto", "Vena", "Naloxone", "Novamin", "Zofran", "Primperan", "停用", "EA>IVPCA", "Bloob patch+施打者");
                    SelectCheckbox("F10", patient_info['衛教'], "勿協助按壓", "增加活動", "預防性按壓", "預告DC");
                    
                    
                    $("#TQ1").val(patient_info["其他交班事項"]);
                    
                    if(patient_info["備袋"] != "" && patient_info["備袋"] != undefined) {
                        SelectRadio("2","備袋","備袋");
                        $("#p2").html(patient_info["備袋"]);
                    }
                    
                    SelectRadio("3",patient_info["備袋狀況"],"無備袋","已用","已取回");
                    
                    if(patient_info["U1126"] != "" && patient_info["U1126"] != undefined) {
                        SelectRadio("4","U1126","U1126");
                        $("#p4").html(patient_info["U1126"]);
                    }
                    
                    SelectRadio("5","用藥資料單完成","用藥資料單完成");

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

    //=================================================================================



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

    function SelectRadio(QNum, Qtext, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10) {

        var TNum = 0;
        console.log(Qtext);
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
                case c8:
                    TNum = 8;
                    break;
                case c9:
                    TNum = 9;
                    break;
                case c10:
                    TNum = 10;
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


            if (Qtext.search(c1) != -1)
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
        
        if(hhtemp != 0 && hhtemp != undefined) {
            patient_info["病歷號"] = hhtemp;
        } else {
            patient_info["病歷號"] = htemp[1];
        }
        //event.preventDefault();
        
        patient_info["Cre."] = $("#ss06").val();        
        
        
        var pertemp = "", pertemp1 = "", pertemp2 = "", pertemp3 = "";
        if ($("#Q5-2-2-1").prop('checked')) {
            pertemp = "藥物過敏";
            pertemp1 = $("#QT5-2-2-1").val();
        } else {
            pertemp = "";
            pertemp1 = "";
        }
        if ($("#Q5-2-2-2").prop('checked')) {
            if (pertemp == "")
                pertemp = "腸胃潰瘍史";
            else
                pertemp = pertemp + "|腸胃潰瘍史";
        } else{
            pertemp = pertemp + "";
        }
        if ($("#Q5-2-2-3").prop('checked')) {
            if (pertemp == "")
                pertemp = "藥癮/毒癮患者";
            else
                pertemp = pertemp + "|藥癮/毒癮患者";
        } else{
            pertemp = pertemp + "";
        }
        if ($("#Q5-2-2-4").prop('checked')) {
            pertemp2 = $("#QT5-2-2-4").val();
            if (pertemp == "")
                pertemp = "長期使用opioids";
            else
                pertemp = pertemp + "|長期使用opioids";
        } else {
            pertemp = pertemp + "";
            pertemp2 = "";
        }
        if ($("#Q5-2-2-5").prop('checked')) {
            if (pertemp == "")
                pertemp = "洗腎";
            else
                pertemp = pertemp + "|洗腎";
        } else{
            pertemp = pertemp + "";
        }
        patient_info["個人史"] = pertemp;
        patient_info["藥物過敏"] = pertemp1;
        patient_info["長期使用opioids"] = pertemp2;
        
        
        pertemp = "", pertemp1 = "", pertemp2 = "", pertemp3 = "";
        if ($("#Q5-2-3-1").prop('checked')) {
            pertemp = "術後急性疼痛";
        }
        else{
            pertemp = pertemp + "";
        }
        if ($("#Q5-2-3-2").prop('checked')) {
            pertemp1 = $("#QT5-2-3-2").val();
            if(pertemp == "")
                pertemp = "剖腹產";
            else
                pertemp = pertemp + "|剖腹產";
        } else {
            pertemp = pertemp + "";
            pertemp1 = "";
        }
        if ($("#Q5-2-3-3").prop('checked')) {
            pertemp2 = $("#QT5-2-3-3").val();
            if(pertemp == "")
                pertemp = "減痛分娩";
            else
                pertemp = pertemp + "|減痛分娩";
        } else {
            pertemp = pertemp + "";
            pertemp2 = "";
        }
        if ($("#Q5-2-3-5").prop('checked')) {
            if(pertemp == "")
                pertemp = "癌症疼痛";
            else
                pertemp = pertemp + "|癌症疼痛";
        }
        else{
            pertemp = pertemp + "";
        }
        if ($("#Q5-2-3-4").prop('checked')) {
            pertemp3 = $("#QT5-2-3-4").val();
            if (pertemp == "")
                pertemp = "其他";
            else
                pertemp = pertemp + "|其他";
        } else {
            pertemp = pertemp + "";
            pertemp3 = "";
        }
        patient_info["使用原因"] = pertemp;
        patient_info["剖腹產：胎次"] = pertemp1;
        patient_info["減痛分娩：胎次"] = pertemp2;
        patient_info["其他"] = pertemp3;
        
        
        patient_info["麻醉結束時間"] = $("#EndHour").find(":selected").text() + ":" + $("#EndMin").find(":selected").text();
        patient_info["預計使用期間"] = $("#StartMonth").find(":selected").text() + "月" + $("#StartDay").find(":selected").text() + "日";
        
        patient_info["已知用藥-Zfran"] = $("#Q5-1-1").find(":selected").text() + "mg";
        
        pertemp="";
        if($("#Q5-1-2-1-1").prop('checked')){
            pertemp = "morphine " + $("#QT5-1-2-1-1").val() + " mg";
        }
        else{
            pertemp = "";
        }
        if($("#Q5-1-2-1-2").prop('checked')){
            if(pertemp==""){
                pertemp ="keto " + $("#QT5-1-2-1-2").val() + " mg";
            }
            else{
                pertemp = pertemp + " + keto " + $("#QT5-1-2-1-2").val() + " mg";
            }
        }
        else{
            pertemp = pertemp + "";
        }
        if($("#Q5-1-2-1-3").prop('checked')){
            if(pertemp==""){
                pertemp ="Tencam 1支";
            }
            else{
                pertemp = pertemp + " + Tencam 1支";
            }            
        }
        else{
            pertemp = pertemp + "";
        }
        if($("#Q5-1-2-1-4").prop('checked')){
            if(pertemp==""){
                pertemp = $("#QT5-1-2-1-3").val();
            }
            else{
                pertemp = pertemp + " + " + $("#QT5-1-2-1-3").val();
            }
        }
        else{
            pertemp = pertemp + "";
        }
        if(pertemp == ""){
            pertemp = "無";
        }
        else 
        {
            pertemp = pertemp;
        }
        patient_info["已知用藥-OR"] = pertemp;
        
        
        pertemp="";
        if($("#Q5-1-4-1-1").prop('checked')){
            pertemp = "morphine " + $("#QT5-1-4-1-1").val() + " mg";
        }
        else{
            pertemp = "";
        }
        if($("#Q5-1-4-1-2").prop('checked')){
            if(pertemp==""){
                pertemp ="keto " + $("#QT5-1-4-1-2").val() + " mg";
            }
            else{
                pertemp = pertemp + " + keto " + $("#QT5-1-4-1-2").val() + " mg";
            }
        }
        else{
            pertemp = pertemp + "";
        }
        if($("#Q5-1-4-1-3").prop('checked')){
            if(pertemp==""){
                pertemp ="Tencam 1支";
            }
            else{
                pertemp = pertemp + " + Tencam 1支";
            }            
        }
        else{
            pertemp = pertemp + "";
        }
        if($("#Q5-1-4-1-4").prop('checked')){
            if(pertemp==""){
                pertemp = $("#QT5-1-4-1-3").val();
            }
            else{
                pertemp = pertemp + " + " + $("#QT5-1-4-1-3").val();
            }
        }
        else{
            pertemp = pertemp + "";
        }
        if(pertemp == ""){
            pertemp = "無";
        }
        else 
        {
            pertemp = pertemp;
        }
        patient_info["已知用藥-POR"] = pertemp;
        
        
        if (cnt513 == 1) {
            patient_info["臨時上機"] = "臨時上機";
            patient_info["臨時上機-時間"] = $("#p5").html();
            patient_info["臨時上機-地點"] = $("#Place5-3-1").find(":selected").text();
        } else {
            patient_info["臨時上機"] = "";
            patient_info["臨時上機-時間"] = "";
            patient_info["臨時上機-地點"] = "";
        }

        patient_info["機號"] = $("#Q5-3-1-1").val();
        patient_info["鎖牌號碼"] = $("#Q5-3-1-2").val();
        
        pertemp="", pertemp1="", pertemp2="";
        if($("#Q5-3-2-1").prop('checked')){
            patient_info["止痛方式"] = $("#Q5-3-2-1").val();
            if($("#Q5-3-3-1").prop('checked')){
                patient_info["止痛藥物"] = $("#Q5-3-3-1").val();
            }
            else if($("#Q5-3-3-2").prop('checked')){
                patient_info["止痛藥物"] = $("#Q5-3-3-2").val();        
            }
            else if($("#Q5-3-3-3").prop('checked')){
                patient_info["止痛藥物"] = $("#Q5-3-3-3-1").val();        
            }
            else{
                patient_info["止痛藥物"] = "";
            }
            
            if($("#Q5-3-4-1").prop('checked')){
                patient_info["機器設定-Loading dose"] = "3 mg" ;
                patient_info["機器設定-PCA dose"] = "1 mg" ;
                patient_info["機器設定-Infusion dose"] = "0 mg" ;
                patient_info["機器設定-Lock-out interval"] = "5 min" ;
                patient_info["機器設定-4-hr limit"] = "20 mg" ;
            }
            else if($("#Q5-3-4-2").prop('checked')){
                patient_info["機器設定-Loading dose"] = "3 mg" ;
                patient_info["機器設定-PCA dose"] = "2 mg" ;
                patient_info["機器設定-Infusion dose"] = "0 mg" ;
                patient_info["機器設定-Lock-out interval"] = "10 min" ;
                patient_info["機器設定-4-hr limit"] = "30 mg" ;
            }
            else if($("#Q5-3-4-3").prop('checked')){
                patient_info["機器設定-Loading dose"] = "2 mg" ;
                patient_info["機器設定-PCA dose"] = "1 mg" ;
                patient_info["機器設定-Infusion dose"] = "0 mg" ;
                patient_info["機器設定-Lock-out interval"] = "5 min" ;
                patient_info["機器設定-4-hr limit"] = "15 mg" ;
            }
            else if($("#Q5-3-4-4").prop('checked')){
                patient_info["機器設定-Loading dose"] = $("#Q5-3-4-4-1").val() + " mg" ;
                patient_info["機器設定-PCA dose"] = $("#Q5-3-4-4-2").val() + " mg" ;
                patient_info["機器設定-Infusion dose"] = $("#Q5-3-4-4-3").val() + " mg" ;
                patient_info["機器設定-Lock-out interval"] = $("#Q5-3-4-4-4").val() + " min" ;
                patient_info["機器設定-4-hr limit"] = $("#Q5-3-4-4-5").val() + " mg" ;
            }
            else{
                patient_info["機器設定-Loading dose"] = "" ;
                patient_info["機器設定-PCA dose"] = "" ;
                patient_info["機器設定-Infusion dose"] = "" ;
                patient_info["機器設定-Lock-out interval"] = "" ;
                patient_info["機器設定-4-hr limit"] = "" ;
            }
            patient_info["位置"] = "" ;
            patient_info["fix"] = "" ;
            patient_info["施打者"] = "" ;
        }
        else if($("#Q5-3-2-2").prop('checked')){
            patient_info["止痛方式"] = $("#Q5-3-2-2").val();
            if($("#Q5-3-5-1").prop('checked')){
                patient_info["止痛藥物"] = "Marcaine 0.66 mg/mL + Fentanyl 1.25 mcg/mL: 400mL";
            }
            else if($("#Q5-3-5-2").prop('checked')){
                patient_info["止痛藥物"] = "Marcaine 0.66 mg/mL + Fentanyl 1.25 mcg/mL + Morphine 0.01 mg/mL: 400mL";        
            }
            else if($("#Q5-3-5-3").prop('checked')){
                patient_info["止痛藥物"] = "Marcaine 0.66 mg/mL + Morphine 0.01 mg/mL: 400mL";        
            }
            else if($("#Q5-3-5-4").prop('checked')){
                patient_info["止痛藥物"] = "Marcaine 1 mg/mL: 400mL";        
            }
            else if($("#Q5-3-5-5").prop('checked')){
                patient_info["止痛藥物"] = "Chirocaine 0.66 mg/mL + Fentanyl 1.25 mcg/mL: 400mL";        
            }
            else if($("#Q5-3-5-6").prop('checked')){
                patient_info["止痛藥物"] = "Chirocaine 0.66 mg/mL + Fentanyl 1.25 mcg/mL + Morphine 0.01 mg/mL: 400mL";    
            }
            else if($("#Q5-3-5-7").prop('checked')){
                patient_info["止痛藥物"] = "Chirocaine 1 mg/mL: 400mL";    
            }
            else if($("#Q5-3-5-8").prop('checked')){
                patient_info["止痛藥物"] = $("#QT5-3-5-8-1").val();    
            }
            else{
                patient_info["止痛藥物"] = "";
            }
            
            if($("#Q5-3-6-1").prop('checked')){
                patient_info["機器設定-Loading dose"] = "0 ml" ;
                patient_info["機器設定-PCA dose"] = "3 ml" ;
                patient_info["機器設定-Infusion dose"] = "4 ml" ;
                patient_info["機器設定-Lock-out interval"] = "20 min" ;
                patient_info["機器設定-4-hr limit"] = "35 ml" ;
            }
            else if($("#Q5-3-6-2").prop('checked')){
                patient_info["機器設定-Loading dose"] = "0 ml" ;
                patient_info["機器設定-PCA dose"] = "6 ml" ;
                patient_info["機器設定-Infusion dose"] = "6 ml" ;
                patient_info["機器設定-Lock-out interval"] = "15 min" ;
                patient_info["機器設定-4-hr limit"] = "80 ml" ;
            }
            else if($("#Q5-3-6-3").prop('checked')){
                patient_info["機器設定-Loading dose"] = $("#Q5-3-6-3-1").val() + " ml" ;
                patient_info["機器設定-PCA dose"] = $("#Q5-3-6-3-2").val() + " ml" ;
                patient_info["機器設定-Infusion dose"] = $("#Q5-3-6-3-3").val() + " ml" ;
                patient_info["機器設定-Lock-out interval"] = $("#Q5-3-6-3-4").val() + " min" ;
                patient_info["機器設定-4-hr limit"] = $("#Q5-3-6-3-5").val() + " ml" ;
            }
            else{
                patient_info["機器設定-Loading dose"] = "" ;
                patient_info["機器設定-PCA dose"] = "" ;
                patient_info["機器設定-Infusion dose"] = "" ;
                patient_info["機器設定-Lock-out interval"] = "" ;
                patient_info["機器設定-4-hr limit"] = "" ;
            }
            patient_info["位置"] = $("#Q5-3-8-1").val() ;
            patient_info["fix"] = $("#Q5-3-8-2").val() ;
            patient_info["施打者"] = $("#Q5-3-8-3").val() ;
        }
        else if($("#Q5-3-2-3").prop('checked')){
            patient_info["止痛方式"] = $("#Q5-3-2-3").val();
            if($("#Q5-3-5-1").prop('checked')){
                patient_info["止痛藥物"] = "Marcaine 0.66 mg/mL + Fentanyl 1.25 mcg/mL: 400mL";
            }
            else if($("#Q5-3-5-2").prop('checked')){
                patient_info["止痛藥物"] = "Marcaine 0.66 mg/mL + Fentanyl 1.25 mcg/mL + Morphine 0.01 mg/mL: 400mL";        
            }
            else if($("#Q5-3-5-3").prop('checked')){
                patient_info["止痛藥物"] = "Marcaine 0.66 mg/mL + Morphine 0.01 mg/mL: 400mL";        
            }
            else if($("#Q5-3-5-4").prop('checked')){
                patient_info["止痛藥物"] = "Marcaine 1 mg/mL: 400mL";        
            }
            else if($("#Q5-3-5-5").prop('checked')){
                patient_info["止痛藥物"] = "Chirocaine 0.66 mg/mL + Fentanyl 1.25 mcg/mL: 400mL";        
            }
            else if($("#Q5-3-5-6").prop('checked')){
                patient_info["止痛藥物"] = "Chirocaine 0.66 mg/mL + Fentanyl 1.25 mcg/mL + Morphine 0.01 mg/mL: 400mL";    
            }
            else if($("#Q5-3-5-7").prop('checked')){
                patient_info["止痛藥物"] = "Chirocaine 1 mg/mL: 400mL";    
            }
            else if($("#Q5-3-5-8").prop('checked')){
                patient_info["止痛藥物"] = $("#QT5-3-5-8-1").val();    
            }
            else{
                patient_info["止痛藥物"] = "";
            }
            
            if($("#Q5-3-7-1").prop('checked')){
                patient_info["機器設定-Loading dose"] = "0 ml" ;
                patient_info["機器設定-PCA dose"] = "3 ml" ;
                patient_info["機器設定-Infusion dose"] = "4 ml" ;
                patient_info["機器設定-Lock-out interval"] = "20 min" ;
                patient_info["機器設定-4-hr limit"] = "40 ml" ;
            }
            else if($("#Q5-3-7-2").prop('checked')){
                patient_info["機器設定-Loading dose"] = "0 ml" ;
                patient_info["機器設定-PCA dose"] = "6 ml" ;
                patient_info["機器設定-Infusion dose"] = "8 ml" ;
                patient_info["機器設定-Lock-out interval"] = "15 min" ;
                patient_info["機器設定-4-hr limit"] = "80 ml" ;
            }
            else if($("#Q5-3-7-3").prop('checked')){
                patient_info["機器設定-Loading dose"] = $("#Q5-3-7-3-1").val() + " ml" ;
                patient_info["機器設定-PCA dose"] = $("#Q5-3-7-3-2").val() + " ml" ;
                patient_info["機器設定-Infusion dose"] = $("#Q5-3-7-3-3").val() + " ml" ;
                patient_info["機器設定-Lock-out interval"] = $("#Q5-3-7-3-4").val() + " min" ;
                patient_info["機器設定-4-hr limit"] = $("#Q5-3-7-3-5").val() + " ml" ;
            }
            else{
                patient_info["機器設定-Loading dose"] = "" ;
                patient_info["機器設定-PCA dose"] = "" ;
                patient_info["機器設定-Infusion dose"] = "" ;
                patient_info["機器設定-Lock-out interval"] = "" ;
                patient_info["機器設定-4-hr limit"] = "" ;
            }
            patient_info["位置"] = $("#Q5-3-8-1").val() ;
            patient_info["fix"] = $("#Q5-3-8-2").val() ;
            patient_info["施打者"] = $("#Q5-3-8-3").val() ;
        }
        else if($("#Q5-3-2-4").prop('checked')){
            patient_info["止痛方式"] = $("#Q5-3-2-4").val();
            patient_info["止痛藥物"] = "Morphine 2 mg";            
            patient_info["機器設定-Loading dose"] = "" ;
            patient_info["機器設定-PCA dose"] = "" ;
            patient_info["機器設定-Infusion dose"] = "" ;
            patient_info["機器設定-Lock-out interval"] = "" ;
            patient_info["機器設定-4-hr limit"] = "" ;
            patient_info["位置"] = $("#Q5-3-8-1").val() ;
            patient_info["fix"] = $("#Q5-3-8-2").val() ;
            patient_info["施打者"] = $("#Q5-3-8-3").val() ;
        }
        else{
            patient_info["止痛方式"] = "";
            patient_info["止痛藥物"] = "";            
            patient_info["機器設定-Loading dose"] = "";
            patient_info["機器設定-PCA dose"] = "";
            patient_info["機器設定-Infusion dose"] = "";
            patient_info["機器設定-Lock-out interval"] = "";
            patient_info["機器設定-4-hr limit"] = "" ;
            patient_info["位置"] = "" ;
            patient_info["fix"] = "" ;
            patient_info["施打者"] = "" ;
        }        
        
        
        patient_info["下床時間"] = $("#dbedhour").find(":selected").text() + ":" + $("#dbedmin").find(":selected").text();
        patient_info["排氣時間"] = $("#blhour").find(":selected").text() + ":" + $("#blmin").find(":selected").text();
        patient_info["胎次"] = $("#Q5-6-1-3").val();

        if ($("#Qn5-6-2-1").prop('checked')) {
            patient_info["PCA同意書確認"] = "已確認";
        } else {
            patient_info["PCA同意書確認"] = "未確認";
        }

        pertemp = "";

        if ($("#Qn5-6-3-1").prop('checked')) {
            pertemp = "已術訪";
        }

        if ($("#Qn5-6-3-2").prop('checked')) {
            if (pertemp == "") {
                pertemp = "已完成";
            } else {
                pertemp += "|已完成";
            }
        }
        patient_info["PFE(PCA)"] = pertemp;


        patient_info["病人狀況-日期"] = $("#Qtime1").html();
        patient_info["病人狀況-時間"] = $("#Qtime2").html();
        patient_info["已輸液量"] = $("#Qtime3").val();
        patient_info["有效次數"] = $("#Qtime4").val();
        patient_info["請求次數"] = $("#Qtime5").val();
        patient_info["VAS(動)"] = $("#Qtime6").find(":selected").text();
        patient_info["VAS(靜)"] = $("#Qtime7").find(":selected").text();
        patient_info["VAS(宮縮)"] = $("#Qtime7").find(":selected").text();

        patient_info["頭暈"] = RadioCkeck("F1");
        patient_info["噁心"] = RadioCkeck("F2");
        patient_info["嘔吐"] = RadioCkeck("F3");
        patient_info["癢疹"] = RadioCkeck("F4");
        patient_info["嗜睡"] = RadioCkeck("F5");
        patient_info["難尿"] = RadioCkeck("F6");
        patient_info["頭痛"] = RadioCkeck("F7");
        patient_info["腳麻"] = RadioCkeck("F8");        
        patient_info["處置"] = RadioCkeck("F11");
        
        pertemp = "";
        if($("#FF9-1-1").prop('checked')){
            pertemp = "有滲濕，" + "小於3x3";
        }
        else if($("#FF9-1-2").prop('checked')){
            pertemp = "有滲濕，" + "大於3x3";
        }
        else{
            pertemp = $("#FF9-2").val();
        }
        if($("#FF9-1-3").prop('checked')){
            pertemp = pertemp + "，需加壓";
        }
        else{
            pretemp = pertemp + "";
        }
        if($("#FF9-3").prop('checked')){
            pertemp = pertemp + "，需換藥重貼";
        }
        else{
            pretemp = pertemp + "";
        }
        patient_info["EA導管"] = pertemp;  
        
        
        
        patient_info["衛教"] = CheckboxCkeck("F10");
        
        
        patient_info["其他交班事項"] = $("#TQ1").val();
        patient_info["備袋"] = $("#p2").html();
        patient_info["備袋狀況"] = RadioCkeck("3");
        patient_info["U1126"] = $("#p4").html();
        patient_info["用藥資料單完成"] = RadioCkeck("5");

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
    
    
    
    $("#Q5-1-2-1-1").change(function() {
        if (cnt51211 == 0) {
            cnt51211 = 1;
            $("#Q5-1-2-1-1Text").show();
            $("#Q5-1-2-1-5").prop("checked",false);            
            $('#btnQ5-1-2-1-5').removeClass('active');
        } else {
            cnt51211 = 0;
            $("#Q5-1-2-1-1Text").hide();
        }
    });
    
    $("#Q5-1-2-1-2").change(function() {
        if (cnt51212 == 0) {
            cnt51212 = 1;
            $("#Q5-1-2-1-2Text").show();
            $("#Q5-1-2-1-5").prop("checked",false);            
            $('#btnQ5-1-2-1-5').removeClass('active');
        } else {
            cnt51212 = 0;
            $("#Q5-1-2-1-2Text").hide();
        }
    });
    
    $("#Q5-1-2-1-3").change(function() {
        $("#Q5-1-2-1-5").prop("checked",false);            
        $('#btnQ5-1-2-1-5').removeClass('active');
    });
    
    $("#Q5-1-2-1-4").change(function() {
        if (cnt51214 == 0) {
            cnt51214 = 1;
            $("#Q5-1-2-1-4Text").show();
            $("#Q5-1-2-1-5").prop("checked",false);            
            $('#btnQ5-1-2-1-5').removeClass('active');
        } else {
            cnt51214 = 0;
            $("#Q5-1-2-1-4Text").hide();
        }
    });
    
    $("#Q5-1-2-1-5").change(function() {
        cnt51211 = 0,cnt51212 = 0,cnt51214 = 0;
        $("#Q5-1-2-1-5").prop("checked",true); 
        $('#Q5-1-2-1-1,#Q5-1-2-1-2,#Q5-1-2-1-3,#Q5-1-2-1-4').prop('checked', false);
        $("#Q5-1-2-1-1Text,#Q5-1-2-1-2Text,#Q5-1-2-1-4Text").hide();
        $('#btnQ5-1-2-1-1,#btnQ5-1-2-1-2,#btnQ5-1-2-1-3,#btnQ5-1-2-1-4').removeClass('active');
        $('#btnQ5-1-2-1-5').attr('class','btn btn-primary active');
    });
    
    $("#Q5-1-4-1-1").change(function() {
        if (cnt51411 == 0) {
            cnt51411 = 1;
            $("#Q5-1-4-1-1Text").show();
            $("#Q5-1-4-1-5").prop("checked",false);            
            $('#btnQ5-1-4-1-5').removeClass('active');
        } else {
            cnt51411 = 0;
            $("#Q5-1-4-1-1Text").hide();
        }
    });
    
    $("#Q5-1-4-1-2").change(function() {
        if (cnt51412 == 0) {
            cnt51412 = 1;
            $("#Q5-1-4-1-2Text").show();
            $("#Q5-1-4-1-5").prop("checked",false);            
            $('#btnQ5-1-4-1-5').removeClass('active');
        } else {
            cnt51412 = 0;
            $("#Q5-1-4-1-2Text").hide();
        }
    });
    
    $("#Q5-1-4-1-3").change(function() {
        $("#Q5-1-4-1-5").prop("checked",false);            
        $('#btnQ5-1-4-1-5').removeClass('active');
    });
    
    $("#Q5-1-4-1-4").change(function() {
        if (cnt51414 == 0) {
            cnt51414 = 1;
            $("#Q5-1-4-1-4Text").show();
            $("#Q5-1-4-1-5").prop("checked",false);            
            $('#btnQ5-1-4-1-5').removeClass('active');
        } else {
            cnt51414 = 0;
            $("#Q5-1-4-1-4Text").hide();
        }
    });
    
    $("#Q5-1-4-1-5").change(function() {
        cnt51411 = 0,cnt51412 = 0,cnt51414 = 0;
        $("#Q5-1-4-1-5").prop("checked",true); 
        $('#Q5-1-4-1-1,#Q5-1-4-1-2,#Q5-1-4-1-3,#Q5-1-4-1-4').prop('checked', false);
        $("#Q5-1-4-1-1Text,#Q5-1-4-1-2Text,#Q5-1-4-1-4Text").hide();
        $('#btnQ5-1-4-1-1,#btnQ5-1-4-1-2,#btnQ5-1-4-1-3,#btnQ5-1-4-1-4').removeClass('active');
        $('#btnQ5-1-4-1-5').attr('class','btn btn-primary active');
    });
    
    $("#Q5-1-3").click(function() {
        if (cnt513 == 0) {
            cnt513 = 1;
            $("#Q5-1-3").attr("class", "btn btn-danger");
            $("#Q5-1-3Text").show();
            var Today = new Date();
            $("#p5").html(Today.getFullYear() + "/" + (Today.getMonth() + 1) + "/" + Today.getDate() + "  " + Today.getHours() + ":" + Today.getMinutes());
        } else {
            cnt513 = 0;
            $("#Q5-1-3").attr("class", "btn btn-primary");
            $("#Q5-1-3Text").hide();
            $("#p5").html("");
        }
    });

    $("#Q5-2-2-1").change(function() {
        if (cnt5221 == 0) {
            cnt5221 = 1;
            $("#Q5-2-2-1Text").show();
        } else {
            cnt5221 = 0;
            $("#Q5-2-2-1Text").hide();
        }
    });

    $("#Q5-2-2-4").change(function() {
        if (cnt5224 == 0) {
            cnt5224 = 1;
            $("#Q5-2-2-4Text").show();
        } else {
            cnt5224 = 0;
            $("#Q5-2-2-4Text").hide();
        }
    });
    
    $("#Q5-2-3-2").change(function() {
        if (cnt5232 == 0) {
            cnt5232 = 1;
            $("#Q5-2-3-2Text").show();
        } else {
            cnt5232 = 0;
            $("#Q5-2-3-2Text").hide();
        }
    });
    
    $("#Q5-2-3-3").change(function() {
        if (cnt5233 == 0) {
            cnt5233 = 1;
            $("#Q5-2-3-3Text").show();
        } else {
            cnt5233 = 0;
            $("#Q5-2-3-3Text").hide();
        }
    });
    
    $("#Q5-2-3-4").change(function() {
        if (cnt5234 == 0) {
            cnt5234 = 1;
            $("#Q5-2-3-4Text").show();
        } else {
            cnt5234 = 0;
            $("#Q5-2-3-4Text").hide();
        }
    });
    
    $("#Q5-3-2-1").change(function() {
        $("#Q5-3-1").show();
        $("#Q5-3-2").hide();
        $("#Q5-3-3").hide();
        $("#Q5-3-4").hide();
        $("#Q5-3-5").hide();
        $("#Q5-3-6").hide();
        $(window).resize();
    });
    
    $("#Q5-3-2-2").change(function() {
        $("#Q5-3-1").hide();
        $("#Q5-3-2").show();
        $("#Q5-3-3").show();
        $("#Q5-3-4").hide();
        $("#Q5-3-5").hide();
        $("#Q5-3-6").show();
        $(window).resize();
    });
    
    $("#Q5-3-2-3").change(function() {
        $("#Q5-3-1").hide();
        $("#Q5-3-2").show();
        $("#Q5-3-3").hide();
        $("#Q5-3-4").show();
        $("#Q5-3-5").hide();
        $("#Q5-3-6").show();
        $(window).resize();
    });
    
    $("#Q5-3-2-4").change(function() {
        $("#Q5-3-1").hide();
        $("#Q5-3-2").hide();
        $("#Q5-3-3").hide();
        $("#Q5-3-4").hide();
        $("#Q5-3-5").show();
        $("#Q5-3-6").show();
        $(window).resize();
    });
    
    $("#Q5-3-3-3").change(function() {        
        $("#QT5-3-1").show();        
        $(window).resize();
    });    
    $("#Q5-3-3-1,#Q5-3-3-2").change(function() {        
        $("#QT5-3-1").hide();        
        $(window).resize();
    });
    
    $("#Q5-3-5-8").change(function() {
        $('#btnQ5-3-5-1,#btnQ5-3-5-2,#btnQ5-3-5-3,#btnQ5-3-5-4,#btnQ5-3-5-5,#btnQ5-3-5-6,#btnQ5-3-5-7').attr('class' , 'btn btn-primary');
        $("#QT5-3-2").show();        
        $(window).resize();
    });    
    $("#Q5-3-5-1").change(function() {
        $('#btnQ5-3-5-2,#btnQ5-3-5-3,#btnQ5-3-5-4,#btnQ5-3-5-5,#btnQ5-3-5-6,#btnQ5-3-5-7,#btnQ5-3-5-8').attr('class' , 'btn btn-primary');
        $("#QT5-3-2").hide();        
        $(window).resize();
    });
    $("#Q5-3-5-2").change(function() {
        $('#btnQ5-3-5-1,#btnQ5-3-5-3,#btnQ5-3-5-4,#btnQ5-3-5-5,#btnQ5-3-5-6,#btnQ5-3-5-7,#btnQ5-3-5-8').attr('class' , 'btn btn-primary');
        $("#QT5-3-2").hide();        
        $(window).resize();
    });
    $("#Q5-3-5-3").change(function() {
        $('#btnQ5-3-5-1,#btnQ5-3-5-2,#btnQ5-3-5-4,#btnQ5-3-5-5,#btnQ5-3-5-6,#btnQ5-3-5-7,#btnQ5-3-5-8').attr('class' , 'btn btn-primary');
        $("#QT5-3-2").hide();        
        $(window).resize();
    });
    $("#Q5-3-5-4").change(function() {
        $('#btnQ5-3-5-1,#btnQ5-3-5-2,#btnQ5-3-5-3,#btnQ5-3-5-5,#btnQ5-3-5-6,#btnQ5-3-5-7,#btnQ5-3-5-8').attr('class' , 'btn btn-primary');
        $("#QT5-3-2").hide();        
        $(window).resize();
    });
    $("#Q5-3-5-5").change(function() {
        $('#btnQ5-3-5-1,#btnQ5-3-5-2,#btnQ5-3-5-3,#btnQ5-3-5-4,#btnQ5-3-5-6,#btnQ5-3-5-7,#btnQ5-3-5-8').attr('class' , 'btn btn-primary');
        $("#QT5-3-2").hide();        
        $(window).resize();
    });
    $("#Q5-3-5-6").change(function() {
        $('#btnQ5-3-5-1,#btnQ5-3-5-2,#btnQ5-3-5-3,#btnQ5-3-5-4,#btnQ5-3-5-5,#btnQ5-3-5-7,#btnQ5-3-5-8').attr('class' , 'btn btn-primary');
        $("#QT5-3-2").hide();        
        $(window).resize();
    });
    $("#Q5-3-5-7").change(function() {
        $('#btnQ5-3-5-1,#btnQ5-3-5-2,#btnQ5-3-5-3,#btnQ5-3-5-4,#btnQ5-3-5-5,#btnQ5-3-5-6,#btnQ5-3-5-8').attr('class' , 'btn btn-primary');
        $("#QT5-3-2").hide();        
        $(window).resize();
    });
     
    $("#Q5-3-4-1").change(function() {
        $('#btnQ5-3-4-2,#btnQ5-3-4-3,#btnQ5-3-4-4').attr('class' , 'btn btn-primary');
        $("#QT5-3-3-1,#QT5-3-3-2,#QT5-3-3-3,#QT5-3-3-4,#QT5-3-3-5").hide();        
        $(window).resize();
    });
    
    $("#Q5-3-4-2").change(function() {
        $('#btnQ5-3-4-1,#btnQ5-3-4-3,#btnQ5-3-4-4').attr('class' , 'btn btn-primary');
        $("#QT5-3-3-1,#QT5-3-3-2,#QT5-3-3-3,#QT5-3-3-4,#QT5-3-3-5").hide();        
        $(window).resize();
    });
    
    $("#Q5-3-4-3").change(function() {
        $('#btnQ5-3-4-1,#btnQ5-3-4-2,#btnQ5-3-4-4').attr('class' , 'btn btn-primary');
        $("#QT5-3-3-1,#QT5-3-3-2,#QT5-3-3-3,#QT5-3-3-4,#QT5-3-3-5").hide();        
        $(window).resize();
    });
    
    $("#Q5-3-4-4").change(function() {
        $('#btnQ5-3-4-1,#btnQ5-3-4-2,#btnQ5-3-4-3').attr('class' , 'btn btn-primary');
        $("#QT5-3-3-1,#QT5-3-3-2,#QT5-3-3-3,#QT5-3-3-4,#QT5-3-3-5").show();   
        $(window).resize();
    });
    
    $("#Q5-3-6-3").change(function() {
        $('#btnQ5-3-6-1,#btnQ5-3-6-2').attr('class' , 'btn btn-primary');
        $("#QT5-3-4-1,#QT5-3-4-2,#QT5-3-4-3,#QT5-3-4-4,#QT5-3-4-5").show();        
        $(window).resize();
    });    
    $("#Q5-3-6-1").change(function() {
        $('#btnQ5-3-6-2,#btnQ5-3-6-3').attr('class' , 'btn btn-primary');
        $("#QT5-3-4-1,#QT5-3-4-2,#QT5-3-4-3,#QT5-3-4-4,#QT5-3-4-5").hide();        
        $(window).resize();
    });
    $("#Q5-3-6-2").change(function() {
        $('#btnQ5-3-6-1,#btnQ5-3-6-3').attr('class' , 'btn btn-primary');
        $("#QT5-3-4-1,#QT5-3-4-2,#QT5-3-4-3,#QT5-3-4-4,#QT5-3-4-5").hide();        
        $(window).resize();
    });
    
    $("#Q5-3-7-3").change(function() {
        $('#btnQ5-3-7-1,#btnQ5-3-7-2').attr('class' , 'btn btn-primary');
        $("#QT5-3-5-1,#QT5-3-5-2,#QT5-3-5-3,#QT5-3-5-4,#QT5-3-5-5").show();        
        $(window).resize();
    });    
    $("#Q5-3-7-1").change(function() {
        $('#btnQ5-3-7-2,#btnQ5-3-7-3').attr('class' , 'btn btn-primary');
        $("#QT5-3-5-1,#QT5-3-5-2,#QT5-3-5-3,#QT5-3-5-4,#QT5-3-5-5").hide();        
        $(window).resize();
    });
    $("#Q5-3-7-2").change(function() {
        $('#btnQ5-3-7-1,#btnQ5-3-7-3').attr('class' , 'btn btn-primary');
        $("#QT5-3-5-1,#QT5-3-5-2,#QT5-3-5-3,#QT5-3-5-4,#QT5-3-5-5").hide();        
        $(window).resize();
    });    
    
    $("#Q2-1").change(function() {
        if (Q21 == 0) {

            var Today = new Date();
            $("#p2").html(Today.getFullYear() + "/" + (Today.getMonth() + 1) + "/" + Today.getDate() + "  " + Today.getHours() + ":" + Today.getMinutes());

            Q21 = 1;
        } else if (Q21 == 1) {
            $("#p2").html("");
            Q21 = 0;
        }
    });
    $("#Q4-1").change(function() {
        if (Q33 == 0) {

            var Today = new Date();
            $("#p4").html(Today.getFullYear() + "/" + (Today.getMonth() + 1) + "/" + Today.getDate() + "  " + Today.getHours() + ":" + Today.getMinutes());
            Q33 = 1;
        } else if (Q33 == 1) {
            $("#p4").html("");
            Q33 = 0;
        }
    });
    
    $("#FF9-1").change(function() {
        $("#FF9-1Btn").show();
        $(window).resize();
        });
    
    $("#FF9-2").change(function() {
        $("#FF9-1Btn").hide();
        $(window).resize();
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
    
    $("#hide2").click(function() {
        if (hd2 == 0) {
            $("#QQ5-2").hide("fast");
			hd2=1;
        }else{
			$("#QQ5-2").show("fast");
			hd2=0;
		}
    });
	$("#hide3").click(function() {
        if (hd3 == 0) {
            $("#QQ5-3").hide("fast");
			hd3=1;
        }else{
			$("#QQ5-3").show("fast");
			hd3=0;
		}
    });
	$("#hide4").click(function() {
        if (hd4 == 0) {
            $("#QQ5-4").hide("fast");
			hd4=1;
        }else{
			$("#QQ5-4").show("fast");
			hd4=0;
		}
    });
	$("#hide5").click(function() {
        if (hd5 == 0) {
            $("#QQ5-5").hide("fast");
			hd5=1;
        }else{
			$("#QQ5-5").show("fast");
			hd5=0;
		}
    });
	$("#hide6").click(function() {
        if (hd6 == 0) {
            $("#QQ5-6").hide("fast");
			hd6=1;
        }else{
			$("#QQ5-6").show("fast");
			hd6=0;
		}
    });
});

$(document).on('click', '.navbar-collapse.in', function(e) {
    if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
        $(this).collapse('hide');
    }
});
