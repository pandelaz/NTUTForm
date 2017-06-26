$(document).ready(function() {
    var Q21 = 0,
        Q33 = 0;

    /*

    patient_info["病歷號"] = $("#TQ1).val();
    patient_info["其他交班事項"] = $("#TQ1).val();
    patient_info["備袋"] = $("#TQ1).val();
    patient_info["備袋狀況"] = $("#TQ1).val();
    patient_info["U1126"] = $("#TQ1).val();
    patient_info["用藥資料單完成"] = $("#TQ1).val();

    */

    //=================================
    var request = indexedDB.open("From3Database");
    request.onerror = function(event) {
        alert("Why didn't you allow my web app to use IndexedDB?!");
    };
    request.onsuccess = function(event) {
        db = event.target.result;
        console.log(db);
    };
    // This event is only implemented in recent browsers
    request.onupgradeneeded = function(event) {
        db = event.target.result;
        // Create an objectStore for this database
        var objectStore = db.createObjectStore("mList", {
            keyPath: "病歷號"
        });
    };
    //===================================


    var htemp = window.location.href.split("=");
    var patient_info = {
        "病歷號": "",
        "其他交班事項": ""
    };

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

        patient_info["病歷號"] = htemp[1];

        patient_info["其他交班事項"] = $("#TQ1").val();

        patient_info["備袋"] = $("#p2").val();

        patient_info["備袋狀況"] = RadioCkeck("3");

        patient_info["U1126"] = $("#p4").val();

        patient_info["用藥資料單完成"] = RadioCkeck("5");

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
});

$(document).on('click', '.navbar-collapse.in', function(e) {
    if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
        $(this).collapse('hide');
    }
});
