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
        var wstemp;

        $("#Show1").hide();
        $("#Show0").hide();
        $("#Show1btn").hide();
        $("#Show2btn").hide();


        $("#info11").change(function() {
            var id = $("#info11").find(':selected').data('id');

            if (id == 1) {
                $("#info12").remove();
                $("#info14").remove();
                $("#info13").append('<span id="division2Text"><select name="bigout"><option value="1">一般外科</option><option value="2">胸腔外科</option><option value="3">神經外科</option><option value="4">整形外科</option><option value="5">乳房外科</option><option value="6">心臟外科</option><option value="7">小兒外科</option></select></span>');

            }
            if (id == 2) {
                $("#info12").remove();
                $("#info13").remove();
                $("#info14").append('<span id="division3Text"><select name="bigout"><option value="1">骨科</option><option value="2">泌尿科</option><option value="3">耳鼻喉科</option><option value="4">牙科</option><option value="5">皮膚科</option><option value="6">疼痛科</option></select></span>');
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
            RowCnt++;
            $("table").append("<tr id='T" + (RowCnt+1) + "'>" +
                "<td>" +
                "<input type='checkbox' name='CC' value=RR id='R" + (RowCnt+1) + "'>" +
                "</td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td>" + $("#info01").val() + "</td>" +
                "<td></td>" +
                "<td>" + $("#info04").val() + "</td>" +
                "<td>" + Mfunction() + "</td>" +
                "<td>" + $("#info03").val() + "</td>" +
                "<td></td>" +
                "<td>" + $("#info09").val() + "</td>" +
                "<td></td>" +
                "<td>" + $('#info18 :selected').text() + "</td>" +
                "<td></td>" +
                "<td></td>" +
                "</tr>");
            console.log($("table").html());

            wstemp[RowCnt+1] = new Array();
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
            wstemp[RowCnt+1] = "" + "," +
                             "" + "," + 
                             "" + "," + 
                             $("#info01").val() + "," + 
                             "" + "," + 
                             $("#info04").val() + "," +
                             Mfunction() + "," +
                             $("#info03").val() + "," +
                             $("#info08").val() + "," +
                             $("#info09").val() + "," +
                             "" + "," + 
                             $("#info18").val() + "," +
                             "" + "," + 
                             "";

            console.log(wstemp);

        });

        function Mfunction() {
            if ($("#info02").val() == 1)
                return ("M");
            else
                return ("F");
        }
        function to_json(workbook) {
          var result = {};
          workbook.SheetNames.forEach(function(sheetName) {
            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if(roa.length > 0){
              result[sheetName] = roa;
            }
          });
          return result;
        }
        $('#excel-file').change(function(e) {
            console.log('start');
            var files = e.target.files;
            //console.log(files[0]);
            var fileReader = new FileReader();

            fileReader.onload = function(ev) {
                var data = ev.target.result

                var workbook = XLSX.read(data, {
                    type: 'binary'
                });

                document.getElementById('htmlout').innerHTML = "";
                var result = [];
                workbook.SheetNames.forEach(function(sheetName) {
                    var htmlstr = XLSX.write(workbook, {
                        sheet: sheetName,
                        type: 'binary',
                        bookType: 'html'
                    });
                    var wstemp1 = XLSX.write(workbook, {
                        sheet: sheetName,
                        type: 'binary',
                        bookType: 'csv'
                    });

                    wstemp = wstemp1.split("\n");

                    //var wstemp3 =   

                    document.getElementById('htmlout').innerHTML += htmlstr;
                    //RowCnt++;
                    $("#T0").remove();
                    console.log(htmlstr);
                });
                $("#Show2btn").show();
                //document.getElementById('btn').innerHTML = "<br><br>"
                RowCnt = 0;

                while ($("#T" + (RowCnt + 2)).length == 1) {
                    RowCnt++;
                }
                console.log(RowCnt);

            };

            fileReader.readAsBinaryString(files[0]);

        });

        $("#Showbtn2").click(function() {


            var i = 0;
            var testout = new Array();
            testout[0] = new Array();
            testout[0] = wstemp[1].split(",");
            testout[0][1]="刀序1";
            testout[0][2]="刀序2";
            /*
            testout[0][0]="s0";
            testout[0][1]="s1";
            testout[0][2]="s2";
            testout[0][3]="s3";
            testout[0][4]="s4";
            testout[0][5]="s5";
            testout[0][6]="s6";
            testout[0][7]="s7";
            testout[0][8]="s8";
            testout[0][9]="s9";
            testout[0][10]="s10";
            testout[0][11]="s11";
            testout[0][12]="s12";
            testout[0][13]="s13";
            */
            //console.log(testout[0]);
            var testoutcnt = 0;

            for (i = 2; i <= RowCnt+2; i++) {
                if ($("#R" + i).prop('checked')) {
                    
                    testoutcnt++;
                    testout[testoutcnt] = new Array();
                    testout[testoutcnt] = wstemp[i].split(",");
                    //var changetemp = testout[testoutcnt][0];
                    //testout[testoutcnt][0] = testout[testoutcnt][3];
                    //testout[testoutcnt][3] = changetemp;
                    console.log(wstemp[i]);
                    $("#T" + i).remove();

                } else {
                    //console.log(i + "do nothing");
                }
            }

            //console.log(wstemp);  

            var tcnt = 0;

            var ws_name = "SheetJS";

            var wb = new Workbook(),
                ws = sheet_from_array_of_arrays(testout);

            /* add worksheet to workbook */
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


        });

    });