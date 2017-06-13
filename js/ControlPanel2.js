    function datenum(v, date1904) {
        if (date1904) v += 1462;
        var epoch = Date.parse(v);
        return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
    }

    function sheet_from_array_of_arrays(data, opts) {
        var ws = {};
        var range = {
            s: {
                c: 10000000,
                r: 10000000
            },
            e: {
                c: 0,
                r: 0
            }
        };
        for (var R = 0; R != data.length; ++R) {
            for (var C = 0; C != data[R].length; ++C) {
                if (range.s.r > R) range.s.r = R;
                if (range.s.c > C) range.s.c = C;
                if (range.e.r < R) range.e.r = R;
                if (range.e.c < C) range.e.c = C;
                var cell = {
                    v: data[R][C]
                };
                if (cell.v == null) continue;
                var cell_ref = XLSX.utils.encode_cell({
                    c: C,
                    r: R
                });

                if (typeof cell.v === 'number') cell.t = 'n';
                else if (typeof cell.v === 'boolean') cell.t = 'b';
                else if (cell.v instanceof Date) {
                    cell.t = 'n';
                    cell.z = XLSX.SSF._table[14];
                    cell.v = datenum(cell.v);
                } else cell.t = 's';

                ws[cell_ref] = cell;
            }
        }
        if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
        return ws;
    }


    function Workbook() {
        if (!(this instanceof Workbook)) return new Workbook();
        this.SheetNames = [];
        this.Sheets = {};
    }

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    $(document).ready(function() {

        var RowCnt = 0;

        var db;
        //var TableDB;

        var ArrForm1 = new Array();
        var ArrForm2 = new Array();
        var ArrForm3 = new Array();



        db = opendb("TestDatabase", "病歷號");
        //================================================
        function opendb(dbname, KeyPathStr) {
            var request = indexedDB.open(dbname);
            request.onerror = function(event) {
                alert("Why didn't you allow my web app to use IndexedDB?!");
            };
            request.onsuccess = function(event) {
                db = event.target.result;
                console.log(db);
                //=======================================
                var transaction = db.transaction(["mList"]);
                var objectStore = transaction.objectStore("mList");
                var request1 = objectStore.get("HTML");
                request1.onerror = function(event) {
                    // Handle errors!
                    alert("not found!");
                };
                request1.onsuccess = function(event) {
                    // Do something with the request.result!
                    //alert("Name for SSN 沈xx is " + request.result.姓名);
                    //console.log(request.result);
                    $("#htmlout").html(request1.result.HtmlTemp);
                    $("#btnQ0-1-1").hide();
                };
                //=======================================
            };
            request.onupgradeneeded = function(event) {
                db = event.target.result;
                var objectStore = db.createObjectStore("mList", { keyPath: KeyPathStr });
            };
        }
        //================================================
        function write_to_db(vardb, data) {
            console.log(vardb);
            var transaction = vardb.transaction(["mList"], "readwrite");
            //console.log(data);
            // Do something when all the data is added to the database.
            transaction.oncomplete = function(event) {
                console.log("done");
                //alert("All done!");
            };

            transaction.onerror = function(event) {
                // Don't forget to handle errors!
                console.log("add error");

            };

            var objectStore = transaction.objectStore("mList");
            for (var i in data) {
                var request = objectStore.add(data[i]);
                request.onsuccess = function(event) {
                    // event.target.result == customerData[i].ssn;
                };
            }
        }
        //================================================
        function write_temp_html(vardb, data,curl) {
            //console.log(vardb);
            var transaction = vardb.transaction(["mList"], "readwrite");
            //console.log(data);
            // Do something when all the data is added to the database.
            transaction.oncomplete = function(event) {
                console.log("done");
                //alert("All done!");
            };

            transaction.onerror = function(event) {
                // Don't forget to handle errors!
                console.log("add error");

                //===================================
                var transaction1 = db.transaction(["mList"], "readwrite");
                var objectStore1 = transaction1.objectStore("mList");
                var request1 = objectStore1.get("HTML");
                request1.onsuccess = function(event) {
                    console.log("Updating : ");
                    console.log(request1.result);
                    request1.result.HtmlTemp = data.HtmlTemp;
                    objectStore1.put(data);
                    //$("#excel-file").hide();
                    RowCnt = -1;
                    while ($("#T" + (RowCnt + 1)).length == 1) {
                        RowCnt++;
                    }
                    location.assign(curl);
                };
                //===================================

            };

            var objectStore = transaction.objectStore("mList");

            var request = objectStore.add(data);
            request.onsuccess = function(event) {
                // event.target.result == customerData[i].ssn;
                location.assign(curl);
            };

        }
        //================================================



        function to_json(workbook) {
            var result = {};
            workbook.SheetNames.forEach(function(sheetName) {
                var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });
            return result;
        }


        $("#Show1").hide();
        $("#Show0").hide();
        $("#Show1btn").hide();

        $("#division").change(function() {
            var id = $("#division").find(':selected').data('id');

            if (id == 1) {
                $("#division1Text").remove();
                $("#division3Text").remove();
                $("#Textdivision2").append('<span id="division2Text"><select name="bigout"><option value="1">一般外科</option><option value="2">胸腔外科</option><option value="3">神經外科</option><option value="4">整形外科</option><option value="5">乳房外科</option><option value="6">心臟外科</option><option value="7">小兒外科</option></select></span>');

            }
            if (id == 2) {
                $("#division1Text").remove();
                $("#division2Text").remove();
                $("#Textdivision3").append('<span id="division3Text"><select name="bigout"><option value="1">骨科</option><option value="2">泌尿科</option><option value="3">耳鼻喉科</option><option value="4">牙科</option><option value="5">皮膚科</option><option value="6">疼痛科</option></select></span>');
            }
        });
        $("#Q0-1-1").change(function() {
            $("#Show1").hide();
            $("#Show1btn").hide();
            $("#Show0").show();
        });
        $("#Q0-1-2").change(function() {
            $("#Show0").hide();
            $("#Show1").show();
            $("#Show1btn").show();
        });
        $("#Showbtn1").click(function() {
            RowCnt = -1;
            while ($("#T" + (RowCnt + 1)).length == 1) {
                RowCnt++;
            }
            RowCnt++;
            $("table").html($("table").html() +
                "<tr id='T" + RowCnt + "'>" +
                "<td>" + $("#info01").val() + "</td>" +
                "<td>" + $("#info03").val() + "</td>" +
                "<td>" + $("#info04").val() + "</td>" +
                "<td>" + "" + "</td>" +
                "<td><a class='btn btn-danger1 navbar-btn' id='Fbtn" + RowCnt + "a1' href='index.html?ssn=" + $("#info04").val() + "'>未填</a></td>" +
                "<td><a class='btn btn-danger2 navbar-btn' id='Fbtn" + RowCnt + "a2' href='index1.html?ssn=" + $("#info04").val() + "'>未填</a></td>" +
                "<td><a class='btn btn-danger3 navbar-btn' id='Fbtn" + RowCnt + "a3' href='index2.html?ssn=" + $("#info04").val() + "'>未填</a></td>" +
                "</tr>");
            console.log(RowCnt);

            var wstemp = [{
                "機號": "",
                "刀序1": "",
                "刀序2": "",
                "姓名": $("#info01").val(),
                "病房": "",
                "病歷號": $("#info04").val(),
                "性別": Mfunction(),
                "年齡": $("#info03").val(),
                "診斷": $("#info08").val(),
                "術式": $("#info09").val(),
                "天數": "",
                "麻VS": $("#info18").val(),
                "備註": "",
                "入帳": "",
            }];

            write_to_db(db, wstemp);
            /*
                        wstemp[RowCnt][0] = ""; //機號
                        wstemp[RowCnt][1] = ""; //刀序1
                        wstemp[RowCnt][2] = ""; //刀序2
                        wstemp[RowCnt][3] = $("#info01").val(); //姓名
                        wstemp[RowCnt][4] = ""; //病房
                        wstemp[RowCnt][5] = $("#info04").val(); //病歷號
                        wstemp[RowCnt][6] = Mfunction(); //性別
                        wstemp[RowCnt][7] = $("#info03").val(); //年齡
                        wstemp[RowCnt][8] = $("#info08").val(); //診斷
                        wstemp[RowCnt][9] = $("#info09").val(); //術式
                        wstemp[RowCnt][10] = ""; //天數
                        wstemp[RowCnt][11] = $("#info18").val(); //麻VS
                        wstemp[RowCnt][12] = ""; //備註
                        wstemp[RowCnt][13] = ""; //入帳

            */
        });

        function Mfunction() {
            if ($("#gender").val() == 1)
                return ("M");
            else
                return ("F");
        }

        $('#excel-file').change(function(e) {
            //console.log('start');
            var files = e.target.files;
            //console.log(files);
            var fileReader = new FileReader();

            fileReader.onload = function(ev) {
                var data = ev.target.result

                var workbook = XLSX.read(data, {
                    type: 'binary'
                });

                document.getElementById('htmlout').innerHTML = "";
                var result = [];
                workbook.SheetNames.forEach(function(sheetName) {
                    //=========================================================================
                    //html顯示表格
                    var htmlstr = XLSX.write(workbook, {
                        sheet: sheetName,
                        type: 'binary',
                        bookType: 'html'
                    });
                    RowCnt = -1;
                    document.getElementById('htmlout').innerHTML = htmlstr;
                    while ($("#T" + (RowCnt + 1)).length == 1) {
                        RowCnt++;
                    }
                    //console.log(RowCnt);

                    var temp = htmlstr.split("</td>");
                    console.log(temp);
                    var temp2 = temp[0].split("<td>");
                    htmlstr = temp2[0] + "<td>姓名</td>" + "<td>年齡</td>" + "<td>病歷號</td>" + "<td>病房</td><td>麻醉後訪視</td><td>止痛訪視</td><td>交班事項</td>";
                    //console.log(temp);
                    var i = 0;

                    for (i = 15; i < temp.length - 1; i = i + 15) {
                        //console.log(i);
                        var temp3 = temp[i].split("<td>");
                        var temp4 = temp[i + 6].split("<td>");

                        htmlstr += temp3[0] + temp[i + 4] + "</td>" + temp[i + 8] + "</td>" + temp[i + 6] + "</td>" + temp[i + 5] + "</td>";
                        htmlstr += "<td><a class='btn btn-danger1 navbar-btn' id='Fbtn" + (i / 15) + "a1' href='index.html?ssn=" + temp4[1] + "'>未填</a></td>"; //tssn[Math.floor(i / 14)]
                        htmlstr += "<td><a class='btn btn-danger2 navbar-btn' id='Fbtn" + (i / 15) + "a2' href='index1.html?ssn=" + temp4[1] + "'>未填</a></td>";
                        htmlstr += "<td><a class='btn btn-danger3 navbar-btn' id='Fbtn" + (i / 15) + "a3' href='index2.html?ssn=" + temp4[1] + "'>未填</a></td>";
                    }
                    htmlstr += temp[temp.length - 1];
                    //console.log(htmlstr);
                    document.getElementById('htmlout').innerHTML = htmlstr;
                    $("#s0").height("auto");
                    //console.log(htmlstr);
                    //=========================================================================
                    //儲存病人資訊至DB
                    var patient_info = to_json(workbook);
                    //jsonstr = jsonstr.replaceAll("姓名","s2");
                    //console.log(jsonstr.SheetJS);
                    /*
                                       for(var a in patient_info.SheetJS) {
                                        patient_info.SheetJS[a]["訪視地點"] = "";
                                        patient_info.SheetJS[a]["回答者"] = "";
                                        patient_info.SheetJS[a]["回答者-其他回答者"] = "";
                                        patient_info.SheetJS[a]["訪視時間點(麻醉後)"] = "";
                                        patient_info.SheetJS[a]["麻醉前訪視滿意度"] = "";
                                        patient_info.SheetJS[a]["麻醉前訪視滿意度-其他"] = "";
                                        patient_info.SheetJS[a]["麻醉滿意度"] = "";
                                        patient_info.SheetJS[a]["麻醉滿意度-其他"] = "";

                                        patient_info.SheetJS[a]["麻醉後相關問題"] = "";
                                        patient_info.SheetJS[a]["麻醉前後的不舒服"] = "";
                                        patient_info.SheetJS[a]["麻醉前後的不舒服-其他"] = "";
                                        patient_info.SheetJS[a]["麻醉前後的不舒服-最不舒服為"] = "";
                                        patient_info.SheetJS[a]["全身麻醉中甦醒"] = "";
                                        patient_info.SheetJS[a]["喉嚨痛"] = "";
                                        patient_info.SheetJS[a]["喉嚨痛-疼痛程度"] = "";
                                        patient_info.SheetJS[a]["喉嚨痛-處置狀況"] = "";
                                        patient_info.SheetJS[a]["聲音沙啞"] = "";
                                        patient_info.SheetJS[a]["聲音沙啞-處置狀況"] = "";
                                        patient_info.SheetJS[a]["頭痛"] = "";
                                        patient_info.SheetJS[a]["頭痛-疼痛程度"] = "";
                                        patient_info.SheetJS[a]["頭痛-處置狀況"] = "";
                                        patient_info.SheetJS[a]["眩暈"] = "";
                                        patient_info.SheetJS[a]["眩暈-處置狀況"] = "";
                                        patient_info.SheetJS[a]["噁心"] = "";
                                        patient_info.SheetJS[a]["噁心-處置狀況"] = "";
                                        patient_info.SheetJS[a]["嘔吐"] = "";
                                        patient_info.SheetJS[a]["嘔吐-嘔吐次數"] = "";
                                        patient_info.SheetJS[a]["嘔吐-處置狀況"] = "";
                                        patient_info.SheetJS[a]["排尿困難"] = "";
                                        patient_info.SheetJS[a]["排尿困難-處置方式"] = "";
                                        patient_info.SheetJS[a]["神經損傷"] = "";
                                        patient_info.SheetJS[a]["譫妄 Delirium"] = "";
                                        patient_info.SheetJS[a]["譫妄 Delirium-症狀"] = "";
                                        patient_info.SheetJS[a]["Apfel score"] = "";
                                        patient_info.SheetJS[a]["眼部受傷"] = "";
                                        patient_info.SheetJS[a]["眼部受傷-部位"] = "";
                                        patient_info.SheetJS[a]["PDPH"] = "";
                                        patient_info.SheetJS[a]["PDPH-分"] = "";
                                        patient_info.SheetJS[a]["PDPH"] = "";
                                        patient_info.SheetJS[a]["麻醉後相關問題-其他"] = "";

                                        patient_info.SheetJS[a]["術後疼痛評估"] = "";
                                        patient_info.SheetJS[a]["傷口疼痛"] = "";
                                        patient_info.SheetJS[a]["傷口疼痛-分"] = "";
                                        patient_info.SheetJS[a]["止痛方式"] = "";
                                        patient_info.SheetJS[a]["呼吸抑制"] = "";
                                        patient_info.SheetJS[a]["嗜睡"] = "";
                                        patient_info.SheetJS[a]["搔癢"] = "";
                                        patient_info.SheetJS[a]["感覺阻斷"] = "";
                                        patient_info.SheetJS[a]["運動阻斷"] = "";

                                        patient_info.SheetJS[a]["訪視結果"] = "";
                                        patient_info.SheetJS[a]["訪視後處置"] = "";
                                        patient_info.SheetJS[a]["通知主治醫師"] = "";
                                        patient_info.SheetJS[a]["未完成訪視"] = "";
                                        patient_info.SheetJS[a]["通知主治醫師-處置方式"] = "";
                                        patient_info.SheetJS[a]["未完成訪視-其他"] = "";
                                        console.log(patient_info.SheetJS[a]);
                                       }

                    */
                    write_to_db(db, patient_info.SheetJS);
                    //TableDB = opendb("TableDB", "HtmlTemp");
                    //=========================================================================



                }); //workbook.SheetNames.forEach
            }; //fileReader.onload

            fileReader.readAsBinaryString(files[0]);
        }); //$('#excel-file').change


        function ReadF2db(people_id) {
            //----------------------opendb----------------------------
            //
            var Form2db = new Array(people_id.length);
            var requestF1 = indexedDB.open("Form2Database");
            var Fcnt = 0;
            requestF1.onerror = function(event) {
                alert("Why didn't you allow my web app to use IndexedDB?!");
            };
            requestF1.onsuccess = function(event) {
                db = event.target.result;
                console.log(db);
                var transaction = db.transaction(["mList"], "readonly");
                var resource = transaction.objectStore("mList").openCursor();

                resource.onsuccess = function(event) {

                    var cursor = event.target.result;
                    //console.log(event);
                    if (cursor) {
                        if (cursor.value.病歷號 != "HTML") {
                            Form2db[Fcnt] = (cursor.value);
                            Fcnt++;
                        }
                        cursor.continue();
                    } else {
                        var f2cnt = 0;
                        for (var f2db1 in Form2db[0]) {
                            ArrForm2[0][f2cnt] = f2db1;
                            f2cnt++;
                        }
                        var f2cnt1=1;
                        var f2cnt2=0;

                        for (var f2db in Form2db) {
                          ArrForm2[f2cnt1] = new Array();
                          for (var f2db1 in Form2db[f2db]) {
                              //console.log(Form1db[f1db][f1db1]);
                              
                              ArrForm2[f2cnt1][f2cnt2] = Form2db[f2db][f2db1];
                              f2cnt2++;
                          }
                          f2cnt1++;  
                          f2cnt2=0;                      
                        }
                        console.log(Form2db);
                        console.log(ArrForm2);

                        ReadF3db(people_id);
                        
                    }
                };

                resource.onerror = function(event) { //出现错误给出提示
                    alert("can't create database,error:" + resource.error);
                };
            };

            // This event is only implemented in recent browsers
            requestF1.onupgradeneeded = function(event) {
                db = event.target.result;
                // Create an objectStore for this database
                var objectStore = db.createObjectStore("mList", {
                    keyPath: "病歷號"
                });
            };
            //===========================================
        }

        function ReadF3db(people_id) {
            //----------------------opendb----------------------------
            //
            var Form3db = new Array(people_id.length);
            var requestF1 = indexedDB.open("From3Database");
            var Fcnt = 0;
            requestF1.onerror = function(event) {
                alert("Why didn't you allow my web app to use IndexedDB?!");
            };
            requestF1.onsuccess = function(event) {
                db = event.target.result;
                console.log(db);
                var transaction = db.transaction(["mList"], "readonly");
                var resource = transaction.objectStore("mList").openCursor();

                resource.onsuccess = function(event) {

                    var cursor = event.target.result;
                    //console.log(event);
                    if (cursor) {
                        if (cursor.value.病歷號 != "HTML") {
                            Form3db[Fcnt] = (cursor.value);
                            Fcnt++;
                        }
                        cursor.continue();
                    } else {
                        var f3cnt = 0;
                        for (var f3db1 in Form3db[0]) {
                            ArrForm3[0][f3cnt] = f3db1;
                            f3cnt++;
                        }
                        var f3cnt1=1;
                        var f3cnt2=0;

                        for (var f3db in Form3db) {
                          ArrForm3[f3cnt1] = new Array();
                          for (var f3db1 in Form3db[f3db]) {
                              //console.log(Form1db[f1db][f1db1]);
                              
                              ArrForm3[f3cnt1][f3cnt2] = Form3db[f3db][f3db1];
                              f3cnt2++;
                          }
                          f3cnt1++;  
                          f3cnt2=0;                      
                        }
                        //console.log(Form3db);
                        //console.log(ArrForm3);
                        db = opendb("TestDatabase", "病歷號");

                        var ws_name1 = "form1";
                        var ws_name2 = "form2";
                        var ws_name3 = "form3";

                        var wb = new Workbook(),
                            ws1 = sheet_from_array_of_arrays(ArrForm1),
                            ws2 = sheet_from_array_of_arrays(ArrForm2),
                            ws3 = sheet_from_array_of_arrays(ArrForm3);

                        //add worksheet to workbook
                        wb.SheetNames.push(ws_name1);
                        wb.Sheets[ws_name1] = ws1;

                        wb.SheetNames.push(ws_name2);
                        wb.Sheets[ws_name2] = ws2;

                        wb.SheetNames.push(ws_name3);
                        wb.Sheets[ws_name3] = ws3;

                        var wbout = XLSX.write(wb, {
                            bookType: 'xlsx',
                            bookSST: true,
                            type: 'binary'
                        });

                        saveAs(new Blob([s2ab(wbout)], {
                            type: "application/octet-stream"
                        }), "finall.xlsx")

                        window.indexedDB.deleteDatabase("TestDatabase");
                        window.indexedDB.deleteDatabase("Form1Database");
                        window.indexedDB.deleteDatabase("Form2Database");
                        window.indexedDB.deleteDatabase("Form3Database");
                        location.assign(window.location.href);

                    }
                };

                resource.onerror = function(event) { //出现错误给出提示
                    alert("can't create database,error:" + resource.error);
                };
            };

            // This event is only implemented in recent browsers
            requestF1.onupgradeneeded = function(event) {
                db = event.target.result;
                // Create an objectStore for this database
                var objectStore = db.createObjectStore("mList", {
                    keyPath: "病歷號"
                });
            };
            //===========================================
        }

        $("#Showbtn3").click(function() {
            //console.log('start');
            //var files = e.target.files;
            //console.log(files);
            var fileReader = new FileReader();

            fileReader.onload = function(ev) {
                var data = ev.target.result

                var workbook = XLSX.read(data, {
                    type: 'binary'
                });

                document.getElementById('htmlout').innerHTML = "";
                var result = [];
                workbook.SheetNames.forEach(function(sheetName) {
                    //=========================================================================
                    //html顯示表格
                    var htmlstr = XLSX.write(workbook, {
                        sheet: sheetName,
                        type: 'binary',
                        bookType: 'html'
                    });
                    RowCnt = -1;
                    document.getElementById('htmlout').innerHTML = htmlstr;
                    while ($("#T" + (RowCnt + 1)).length == 1) {
                        RowCnt++;
                    }
                    //console.log(RowCnt);

                    var temp = htmlstr.split("</td>");
                    console.log(temp);
                    var temp2 = temp[0].split("<td>");
                    htmlstr = temp2[0] + "<td>姓名</td>" + "<td>年齡</td>" + "<td>病歷號</td>" + "<td>病房</td><td>麻醉後訪視</td><td>止痛訪視</td><td>交班事項</td>";
                    //console.log(temp);
                    var i = 0;

                    for (i = 15; i < temp.length - 1; i = i + 15) {
                        //console.log(i);
                        var temp3 = temp[i].split("<td>");
                        var temp4 = temp[i + 6].split("<td>");

                        htmlstr += temp3[0] + temp[i + 4] + "</td>" + temp[i + 8] + "</td>" + temp[i + 6] + "</td>" + temp[i + 5] + "</td>";
                        htmlstr += "<td><a class='btn btn-danger1 navbar-btn' id='Fbtn" + (i / 15) + "a1' href='index.html?ssn=" + temp4[1] + "'>未填</a></td>"; //tssn[Math.floor(i / 14)]
                        htmlstr += "<td><a class='btn btn-danger2 navbar-btn' id='Fbtn" + (i / 15) + "a2' href='index1.html?ssn=" + temp4[1] + "'>未填</a></td>";
                        htmlstr += "<td><a class='btn btn-danger3 navbar-btn' id='Fbtn" + (i / 15) + "a3' href='index2.html?ssn=" + temp4[1] + "'>未填</a></td>";
                    }
                    htmlstr += temp[temp.length - 1];
                    //console.log(htmlstr);
                    document.getElementById('htmlout').innerHTML = htmlstr;
                    $("#s0").height("auto");
                    //console.log(htmlstr);
                    //=========================================================================
                    //儲存病人資訊至DB
                    var patient_info = to_json(workbook);

                    write_to_db(db, patient_info.SheetJS);

                }); //workbook.SheetNames.forEach
            }; //fileReader.onload

            var oReq = new XMLHttpRequest();

            oReq.open("GET", "https://pandelaz.github.io/NTUTForm/ControlPanel2_TestFile2.xlsx", true);
            oReq.responseType = "blob";
            oReq.onload = function(e) {
              var bbuffer = oReq.response; // not responseText
              //console.log(bbuffer);
              fileReader.readAsBinaryString(bbuffer);
              /* ... */
            }
            oReq.send();

            


        });


        $("#Showbtn2").click(function() {

            //console.log($("#htmlout").html());

            var htmlsplit = $("#htmlout").html().split("</tr>"); //頭尾無效 1~length-2
            var people_id = new Array(htmlsplit.length - 2);
            for (var icnt = 1; icnt <= htmlsplit.length - 2; icnt++) {
                var htmlsplit2 = htmlsplit[icnt].split("</td>");
                var htmlsplit3 = htmlsplit2[2].split("<td>");
                people_id[icnt - 1] = htmlsplit3[1];
            }
            //console.log(people_id);

            var Form1db = new Array(people_id.length);
            var Form2db = new Array(people_id.length);
            var Form3db = new Array(people_id.length);
            var Fcnt = 0;

            ArrForm1[0] = new Array();
            ArrForm2[0] = new Array();
            ArrForm3[0] = new Array();

            //----------------------opendb----------------------------
            //
            var requestF1 = indexedDB.open("Form1Database");
            requestF1.onerror = function(event) {
                alert("Why didn't you allow my web app to use IndexedDB?!");
            };
            requestF1.onsuccess = function(event) {
                db = event.target.result;
                console.log(db);
                var transaction = db.transaction(["mList"], "readonly");
                var resource = transaction.objectStore("mList").openCursor();

                resource.onsuccess = function(event) {

                    var cursor = event.target.result;
                    //console.log(event);
                    if (cursor) {
                        if (cursor.value.病歷號 != "HTML") {
                            Form1db[Fcnt] = (cursor.value);
                            Fcnt++;
                        }
                        cursor.continue();
                    } else {
                        //console.log(Form1db);

                        var f1cnt = 0;
                        for (var f1db1 in Form1db[0]) {
                            ArrForm1[0][f1cnt] = f1db1;
                            f1cnt++;
                        }
                        var f1cnt1=1;
                        var f1cnt2=0;

                        for (var f1db in Form1db) {
                          ArrForm1[f1cnt1] = new Array();
                          for (var f1db1 in Form1db[f1db]) {
                              //console.log(Form1db[f1db][f1db1]);
                              
                              ArrForm1[f1cnt1][f1cnt2] = Form1db[f1db][f1db1];
                              f1cnt2++;
                          }
                          f1cnt1++;  
                          f1cnt2=0;                      
                        }
                        console.log(ArrForm1);

                        ReadF2db(people_id);
                    }
                };

                resource.onerror = function(event) { //出现错误给出提示
                    alert("can't create database,error:" + resource.error);
                };
            };

            // This event is only implemented in recent browsers
            requestF1.onupgradeneeded = function(event) {
                db = event.target.result;
                // Create an objectStore for this database
                var objectStore = db.createObjectStore("mList", {
                    keyPath: "病歷號"
                });
            };
            //===========================================







            /*
                        var testout = new Array();
                        testout[0] = new Array();
                        

                        var ws_name = "SheetJS";

                        var wb = new Workbook(),
                            ws = sheet_from_array_of_arrays(testout);

                        //add worksheet to workbook
                        wb.SheetNames.push(ws_name);
                        wb.Sheets[ws_name] = ws;
                        var wbout = XLSX.write(wb, {
                            bookType: 'xlsx',
                            bookSST: true,
                            type: 'binary'
                        });

                        saveAs(new Blob([s2ab(wbout)], {
                            type: "application/octet-stream"
                        }), "test.xlsx")
            */
            //window.indexedDB.deleteDatabase("TestDatabase");
            //window.indexedDB.deleteDatabase("Form1Database");
            //window.indexedDB.deleteDatabase("Form2Database");
            //window.indexedDB.deleteDatabase("Form3Database");
        });

        $('body').on("click", function(e) {
            //console.log(e.target.id);
            //=========================================================================
            //儲存表單填寫狀況
            //excel-file
            //btnQ0-1-1
            //btnQ0-1-2
            //Showbtn1
            //Showbtn2
            //if (e.target.id == "excel-file" || e.target.id == "btnQ0-1-1" || e.target.id == "btnQ0-1-2" || e.target.id == "Showbtn1" || e.target.id == "Showbtn2") {

            //} else {
            //console.log(e.target.id.search("Fbtn"));
            if (e.target.id.search("Fbtn") >= 0) {
                e.preventDefault();
                $("#" + e.target.id).html("已填");
                var etemp = e.target.id.split("n");
                var etemp2 = etemp[1].split("a");
                $("#T" + etemp2[0]).html($("#T" + etemp2[0]).html().replace(("btn-danger" + etemp2[1]), "btn-default disabled"));
                console.log($("#htmlout").html());
                //console.log($("#"+e.target.id).html());
                //var htemp = new Array();
                //var htemp[0] = new Array();
                var htemp = [{
                    "病歷號": "HTML",
                    "HtmlTemp": $("#htmlout").html()
                }];
                //console.log(htemp[0]);
                write_temp_html(db, htemp[0],$("#" + e.target.id).attr('href'));
                console.log($("#" + e.target.id).attr('href'));

                //=============================================================



                //=============================================================
            }
        });



    });
