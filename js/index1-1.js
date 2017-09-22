$(document).ready(function() {
    var cnt513 = 0,
        cnt5221 = 0,
        cnt5224 = 0,
        cntasa = 0,
        cnt222 = 0,
        cnt223 = 0,
        cnt225 = 0,
        cnt232 = 0,
        cnt233 = 0,
        cnt235 = 0,  
        cnt5N2 = 0,     
        cnt5N3 = 0,  
        cnt5N5 = 0,   
        id = 1,
		hd1 = 1,
		hd2 = 0,
		hd3 = 0,
		hd4 = 0,
		hd5 = 0,
		hd6 = 1;
	
	
	$("#QQ5-6").hide("fast");

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
    $('#B2-2-2').hide();
    $('#B2-2-3').hide();
    $('#B2-2-5').hide();
    $('#B2-3-2').hide();
    $('#B2-3-3').hide();
    $('#B2-3-5').hide();
    $('#B5-N-2').hide();
    $('#B5-N-5').hide();

//新增1    
    $("#Q5-3-1").hide();
    $("#Q5-3-2").hide();
    $("#Q5-3-3").hide();
    $("#Q5-3-4").hide();
    $("#Q5-3-5").hide();
    $("#Q5-3-6").hide();
    $("#QT5-3-1").hide();
    $("#QT5-3-2").hide();
    $("#QT5-3-3").hide();
    $("#QT5-3-4").hide();
    $("#QT5-3-5").hide();
	
	$("#QQ5-6-1").addClass("active");
	$("#dissy1").prop("checked", true);
	$("#QQ5-6-2").addClass("active");
	$("#disscuss1").prop("checked", true);
	$("#QQ5-6-3").addClass("active");
	$("#vomp1").prop("checked", true);
	$("#QQ5-6-4").addClass("active");
	$("#ich1").prop("checked", true);
	$("#QQ5-6-5").addClass("active");
	$("#sleepy1").prop("checked", true);
	$("#QQ5-6-6").addClass("active");
	$("#pee1").prop("checked", true);
	$("#QQ5-6-7").addClass("active");
	$("#headache1").prop("checked", true);
	$("#QQ5-6-8").addClass("active");
	$("#feet1").prop("checked", true);
	$("#QQ5-6-9").addClass("active");
	$("#ea1").prop("checked", true);
//新增1 END 

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
            $("#ss06").attr("value", request.result.診斷);
            $("#ss07").attr("value", request.result.術式);
            $("#ss014").attr("value", request.result.麻VS);

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

                    SelectCheckbox("5-2-2", patient_info['個人史'], "藥物過敏", "腸胃潰瘍史", "藥癮/毒癮患者", "長期使用opioids");
                    SetText("Q5-2-2-1Text", "QT5-2-2-1", patient_info['藥物過敏'], patient_info['個人史'], "藥物過敏");
                    SetText("Q5-2-2-4Text", "QT5-2-2-4", patient_info['長期使用opioids'], patient_info['個人史'], "長期使用opioids");

                    var temp = patient_info['開始使用時間'].split(":");
                    $("#StartHour").val(temp[0]);
                    $("#StartMin").val(temp[1]);

                    temp = patient_info['麻醉結束時間'].split(":");
                    $("#EndHour").val(temp[0]);
                    $("#EndMin").val(temp[1]);

                    if (patient_info['臨時上機'] == "臨時上機") {
                        cnt513 = 1;
                        $("#Q5-1-3").attr("class", "btn btn-danger");
                        $("#Q5-1-3Text").show();


                        temp = patient_info['臨時上機-時間'].split("月");
                        $("#month5-3-1").val(temp[0]);

                        temp = temp[1].split("日");
                        $("#day5-3-1").val(temp[0]);

                        temp = temp[1].split("時");
                        $("#hour5-3-1").val(temp[0]);

                        temp = temp[1].split("分");
                        $("#min5-3-1").val(temp[0]);

                        $("#Place5-3-1").val(patient_info['臨時上機-地點']);

                        $("#medicine5-3-1").val(patient_info['臨時上機-已用藥物']);

                    }

                    SelectRadio("n5-3-1", patient_info['止痛方式'], "IVPCA", "PCEA", "C/S 8-8)", "PCEA+PIB");

                    $("#Q5-3-2-1").val(patient_info['止痛方式-位置']);
                    $("#Q5-3-2-2").val(patient_info['止痛方式-fix']);
                    $("#Q5-3-2-3").val(patient_info['止痛方式-施打者']);

                    //SelectRadio("n5-3-1", patient_info['止痛方式'], "IVPCA", "PCEA", "C/S 8-8)", "PCEA+PIB");
                    //patient_info["止痛藥物"] = "123456";

                    if (patient_info['止痛藥物'].search("0.1%") != -1) {

                        SelectRadio("n5-4-1", "case 1", "case 1", "case 2", "case 3", "其他");
                        $("#QC5-4-1-1").show();

                        if (patient_info['止痛藥物'].search("Keto") != -1) {
                            $("#SEL5-4-1-1").val("Keto");
                            temp = patient_info['止痛藥物'].split("Keto");
                            temp = temp[1].split("支");
                            $("#Keto").val(temp[0]);
                            $("#QC5-4-1-1SEL1").show();
                            $("#QC5-4-1-1SEL2").hide();
                            $("#QC5-4-1-1SEL3").hide();

                        } else if (patient_info['止痛藥物'].search("Vena") != -1) {
                            $("#SEL5-4-1-1").val("Vena");
                            temp = patient_info['止痛藥物'].split("Vena");
                            temp = temp[1].split("支");
                            $("#Vena").val(temp[0]);
                            $("#QC5-4-1-1SEL1").hide();
                            $("#QC5-4-1-1SEL2").show();
                            $("#QC5-4-1-1SEL3").hide();
                        } else {
                            $("#SEL5-4-1-1").val("Other");
                            temp = patient_info['止痛藥物'].split("+");
                            $("#QtC5-4-1-1SEL3").val(temp[1].replace(/\s+/g, ""));
                            $("#QC5-4-1-1SEL1").hide();
                            $("#QC5-4-1-1SEL2").hide();
                            $("#QC5-4-1-1SEL3").show();
                        }

                    } else if (patient_info['止痛藥物'].search("N/S：400ml") != -1) {

                        SelectRadio("n5-4-1", "case 2", "case 1", "case 2", "case 3", "其他");
                        $("#QC5-4-1-2").show();

                    } else if (patient_info['止痛藥物'].search("mg：400ml") != -1) {

                        SelectRadio("n5-4-1", "case 3", "case 1", "case 2", "case 3", "其他");
                        $("#QC5-4-1-3").show();

                        var temp1 = patient_info['止痛藥物'].split("+");
                        temp = temp1[0].split("mg");
                        temp = temp[0].split(" ");
                        $("#QCs5-4-1-3").val(temp[1]);

                        temp = temp1[1].split("mcg");
                        temp = temp[0].split("l ");
                        $("#QCs5-4-1-3-2").val(temp[1]);

                        temp = temp1[2].split("mg");
                        temp = temp[0].split("e ");
                        $("#QCs5-4-1-3-3").val(temp[1]);                      

                    } else {

                        SelectRadio("n5-4-1", "其他", "case 1", "case 2", "case 3", "其他");
                        $("#QC5-4-1-4").show();

                        $("#QCt5-4-1-4").val(patient_info['止痛藥物']);

                    }
                    temp = patient_info['zofran已給'].split("mg");

                    $("#Q5-4-2-1").val(temp[0]);
                    SelectRadio("5-4-4", temp[1].replace(/\s+/g, ""), "麻打", "分2次");

                    SelectRadio("n5-5-1", patient_info['單位設定'], "ml", "mg");

                    $("#Q5-5-2-1-1").val(patient_info['Loading-初始設定']);
                    $("#Q5-5-2-1-2").val(patient_info['Loading-調整後']);

                    $("#Q5-5-2-2-1").val(patient_info['Bolus-初始設定']);
                    $("#Q5-5-2-2-2").val(patient_info['Bolus-調整後']);

                    $("#Q5-5-2-3-1").val(patient_info['Contin.-初始設定']);
                    $("#Q5-5-2-3-2").val(patient_info['Contin.-調整後']);

                    $("#Q5-5-2-4-1").val(patient_info['Interval-初始設定']);
                    $("#Q5-5-2-4-2").val(patient_info['Interval-調整後']);

                    $("#Q5-5-2-5-1").val(patient_info['4H limit-初始設定']);
                    $("#Q5-5-2-5-2").val(patient_info['4H limit-調整後']);

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
                    //patient_info['PFE(PCA)'] = "術訪|完成";
                    SelectCheckbox("n5-6-3", patient_info['PFE(PCA)'], "術訪", "完成");

                    $("#Qtime3").val(patient_info['已輸液量(自控)']);
                    $("#Qtime4").val(patient_info['已輸液量(請求)']);

                    $("#Qtime5").val(patient_info['VAS(動)']);
                    $("#Qtime6").val(patient_info['VAS(靜)']);
                    $("#s8").val(patient_info['宮縮痛']);

                    $("#FF1").val(patient_info['頭暈']);
                    $("#FF2").val(patient_info['噁心']);
                    $("#FF3").val(patient_info['嘔吐']);
                    $("#FF4").val(patient_info['癢疹']);
                    $("#FF5").val(patient_info['嗜睡']);
                    $("#FF6").val(patient_info['難尿']);
                    $("#FF7").val(patient_info['頭痛']);
                    $("#FF8").val(patient_info['腳麻']);
                    $("#FF9").val(patient_info['EA導管']);
                    $("#FF10").val(patient_info['衛教']);
                    $("#FF11").val(patient_info['處置']);

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

    function SelectRadio(QNum, Qtext, c1, c2, c3, c4, c5, c6, c7) {

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
            patient_info['病歷號'] = hhtemp;
        }

        //event.preventDefault();
        patient_info["開始使用時間"] = $("#StartHour").find(":selected").text() + ":" + $("#StartMin").find(":selected").text();
        patient_info["麻醉結束時間"] = $("#EndHour").find(":selected").text() + ":" + $("#EndMin").find(":selected").text();
        if (cnt513 == 1) {
            patient_info["臨時上機"] = "臨時上機";
            patient_info["臨時上機-時間"] = $("#month5-3-1").find(":selected").text() + "月" + $("#day5-3-1").find(":selected").text() + "日" + $("#hour5-3-1").find(":selected").text() + "時" + $("#min5-3-1").find(":selected").text() + "分";
            patient_info["臨時上機-地點"] = $("#Place5-3-1").find(":selected").text();
            patient_info["臨時上機-已用藥物"] = $("#medicine5-3-1").val();
        } else {
            patient_info["臨時上機"] = "";
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
                patient_info["止痛藥物"] = "0.1% Morphine 100 mg /100 ml/Bag + " + $("#SEL5-4-1-1").find(":selected").text() + $("#Keto").find(":selected").text() + "支";
            } else if ($("#SEL5-4-1-1").find(":selected").text() == "Vena") {
                patient_info["止痛藥物"] = "0.1% Morphine 100 mg /100 ml/Bag +" + $("#SEL5-4-1-1").find(":selected").text() + $("#Vena").find(":selected").text() + "支";
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



        patient_info["zofran已給"] = $("#Q5-4-2-1").val() + "mg " + RadioCkeck("n5-2-1"); //(mg+麻打/分兩次)

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


    $("#btnQ5-N-2").click(function() {
        if(cnt5N2==0) {
            $('#B5-N-2').show();
            cnt5N2=1;
        } else if(cnt5N3 == 0) {
            $('#B5-N-2').hide();
            cnt5N2=0;
        } else {
           cnt5N2=0; 
        }
    });
    $("#btnQ5-N-3").click(function() {
        if(cnt5N3==0) {
            $('#B5-N-2').show();
            cnt5N3=1;
        } else if(cnt5N2 == 0){
            $('#B5-N-2').hide();
            cnt5N3=0;
        } else {
           cnt5N3=0; 
        } 
    });
    $("#btnQ5-N-5").click(function() {
        if(cnt5N5==0) {
            $('#B5-N-5').show();
            cnt5N5=1;
        } else if(cnt5N2 == 0){
            $('#B5-N-5').hide();
            cnt5N5=0;
        }
    });

    $("#btnQ2-2-1").click(function() {
        $('#Q2-2-2').prop('checked', "false");
        $('#btnQ2-2-2').removeClass('active');
        $('#Q2-2-3').prop('checked', "false");
        $('#btnQ2-2-3').removeClass('active');
        $('#Q2-2-4').prop('checked', "false");
        $('#btnQ2-2-4').removeClass('active');  
        $('#Q2-2-5').prop('checked', "false");
        $('#btnQ2-2-5').removeClass('active');  
        $('#B2-2-2').hide();
        $('#B2-2-3').hide();
        $('#B2-2-5').hide(); 
        cnt222=0;  
        cnt223=0;
        cnt225=0;
    });
    $("#btnQ2-2-2").click(function() {
        $('#Q2-2-1').prop('checked', "false");
        $('#btnQ2-2-1').removeClass('active');
        if(cnt222==0) {
            $('#B2-2-2').show();
            cnt222=1;
        } else {
            $('#B2-2-2').hide();
            cnt222=0;
        }
    });
    $("#btnQ2-2-3").click(function() {
        $('#Q2-2-1').prop('checked', "false");
        $('#btnQ2-2-1').removeClass('active');
        if(cnt223==0) {
            $('#B2-2-3').show();
            cnt223=1;
        } else {
            $('#B2-2-3').hide();
            cnt223=0;
        }
    });
    $("#btnQ2-2-4").click(function() {
        $('#Q2-2-1').prop('checked', "false");
        $('#btnQ2-2-1').removeClass('active');
    });
    $("#btnQ2-2-5").click(function() {
        $('#Q2-2-1').prop('checked', "false");
        $('#btnQ2-2-1').removeClass('active');
        if(cnt225==0) {
            $('#B2-2-5').show();
            cnt225=1;
        } else {
            $('#B2-2-5').hide();
            cnt225=0;
        }
    });

    $("#btnQ2-3-1").click(function() {
        $('#Q2-3-2').prop('checked', "false");
        $('#btnQ2-3-2').removeClass('active');
        $('#Q2-3-3').prop('checked', "false");
        $('#btnQ2-3-3').removeClass('active');
        $('#Q2-3-4').prop('checked', "false");
        $('#btnQ2-3-4').removeClass('active');  
        $('#Q2-3-5').prop('checked', "false");
        $('#btnQ2-3-5').removeClass('active');
        $('#B2-3-2').hide();
        $('#B2-3-3').hide();
        $('#B2-3-5').hide();
        cnt232=0;  
        cnt233=0;
        cnt235=0;
    });

    $("#btnQ2-3-2").click(function() {
        $('#Q2-3-1').prop('checked', "false");
        $('#btnQ2-3-1').removeClass('active');
        if(cnt232==0) {
            $('#B2-3-2').show();
            cnt232=1;
        } else {
            $('#B2-3-2').hide();
            cnt232=0;
        }
    });
    $("#btnQ2-3-3").click(function() {
        $('#Q2-3-1').prop('checked', "false");
        $('#btnQ2-3-1').removeClass('active');
        if(cnt233==0) {
            $('#B2-3-3').show();
            cnt233=1;
        } else {
            $('#B2-3-3').hide();
            cnt233=0;
        }
    });
    $("#btnQ2-3-4").click(function() {
        $('#Q2-3-1').prop('checked', "false");
        $('#btnQ2-3-1').removeClass('active');
    });
    $("#btnQ2-3-5").click(function() {
        $('#Q2-3-1').prop('checked', "false");
        $('#btnQ2-3-1').removeClass('active');
        if(cnt235==0) {
            $('#B2-3-5').show();
            cnt235=1;
        } else {
            $('#B2-3-5').hide();
            cnt235=0;
        }
    });

    $("#Q5-1-3").click(function() {
        if (cnt513 == 0) {
            cnt513 = 1;
            $("#Q5-1-3").attr("class", "btn btn-danger");
            $("#Q5-1-3Text").show();
        } else {
            cnt513 = 0;
            $("#Q5-1-3").attr("class", "btn btn-primary");
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
//新增2
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
        $("#QT5-3-2").show();        
        $(window).resize();
    });    
    $("#Q5-3-5-1,#Q5-3-5-2,#Q5-3-5-3,#Q5-3-5-4,#Q5-3-5-5,#Q5-3-5-6,#Q5-3-5-7").change(function() {        
        $("#QT5-3-2").hide();        
        $(window).resize();
    });
    
    $("#Q5-3-4-4").change(function() {        
        $("#QT5-3-3").show();        
        $(window).resize();
    });    
    $("#Q5-3-4-1,#Q5-3-4-2,#Q5-3-4-3").change(function() {        
        $("#QT5-3-3").hide();        
        $(window).resize();
    });
    
     $("#Q5-3-6-3").change(function() {        
        $("#QT5-3-4").show();        
        $(window).resize();
    });    
    $("#Q5-3-6-1,#Q5-3-6-2").change(function() {        
        $("#QT5-3-4").hide();        
        $(window).resize();
    });
    
     $("#Q5-3-7-3").change(function() {        
        $("#QT5-3-5").show();        
        $(window).resize();
    });    
    $("#Q5-3-7-1,#Q5-3-7-2").change(function() {        
        $("#QT5-3-5").hide();        
        $(window).resize();
    });
//新增 END
/*
    $("#Qn5-4-1-1").change(function() {

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


    $("#Qn5-4-1-2").change(function() {
        $("#QC5-4-1-2").show();
        $("#QC5-4-1-1").hide();
        $("#QC5-4-1-3").hide();
        $("#QC5-4-1-4").hide();
        $(window).resize();
    });
    $("#Qn5-4-1-3").change(function() {
        $("#QC5-4-1-3").show();
        $("#QC5-4-1-1").hide();
        $("#QC5-4-1-2").hide();
        $("#QC5-4-1-4").hide();
        $(window).resize();
    });
    $("#Qn5-4-1-4").change(function() {
        $("#QC5-4-1-4").show();
        $("#QC5-4-1-1").hide();
        $("#QC5-4-1-2").hide();
        $("#QC5-4-1-3").hide();
        $(window).resize();
    });
*/
    //-------------------------Q5-6-------------------------
    /*$("#Q5-6-4-1").change(function() {
        $("#Q5-6-4-1Text").show();
        $("#Q5-6-4-2Text").hide();
    });
    $("#Q5-6-4-2").change(function() {
        $("#Q5-6-4-1Text").hide();
        $("#Q5-6-4-2Text").show();
    });*/
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
	
	$("#hide1").click(function() {
        if (hd1 == 0) {
            $("#QQ5-1").hide("fast");
			hd1=1;
        }else{
			$("#QQ5-1").show("fast");
			hd1=0;
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
