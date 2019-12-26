$(document).ready(function() {
    //------------------ SET LOCATION HASH -------------------
    window.location.hash = "matrixReport";
    $(".load-content").hide();
    //------------------ GET COOKIE TOKEN -------------------
    function getCookie(token) {
        var name = token + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    //----------DATEPICKER---------
    $("#orderTime_S , #orderTime_E").persianDatepicker({
        altFormat: "YYYY MM DD HH:mm:ss",
        observer: true,
        format: "YYYY-MM-DD"
    });
    //--------------------------SEARCH ORDER---------------------------
    let jsonData={
        'pCode':'',
        'charge':'',
        'active':'',
        'orderTime_S':'',
        'orderTime_E':'',
        'mellicode':'',
        'mobileNo':'',
        'RRN':'',
        'orderStatus':''
    };
    $("#search").click(function() {

        $(".load-content").show();

        jsonData={
            'pCode':$('#pCode').val(),
            'charge':$('#charge').val(),
            'active':$('#active').val(),
            'orderTime_S':$('#orderTime_S').val(),
            'orderTime_E':$('#orderTime_E').val(),
            'mellicode':$('#mellicode').val(),
            'mobileNo':$('#mobileNo').val(),
            'RRN':$('#RRN').val(),
            'orderStatus':$('#orderStatus').val()
        };
        getDataTable();

    });

    var getDataTable = function() {
        var t = $("#matrixReport").DataTable({
            language: {
                url: "./plugin/Persian.json",
                buttons: {
                    pageLength: {
                        _: "نمایش %d سطر",
                        "-1": "نمایش همه"
                    }
                }
            },
            columnDefs: [
                {
                    searchable: false,
                    orderable: false,
                    targets: 0
                }
            ],
            order: [[1, "asc"]],
            // processing: true,
            filter: false,
            targets: 0,
            bDestroy:true,
            dom: "Bfrtip",
            // scrollX: true,

            lengthMenu: [
                [10, 25, 50, -1],
                ["10 سطر", "25 سطر", "50 سطر", "نمایش همه"]
            ],
            buttons: [
                "pageLength",

                {
                    extend: "csv",
                    text:
                        '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Csv',

                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
                    }
                },
                {
                    extend: "excelHtml5",

                    text:
                        '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Excel',
                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
                    }
                }
            ],


            ajax: {
                url:matrixReport,
                type:'PUT',
                dataType: "json",
                data: jsonData,
                contentType: "application/json; charset=utf-8",
                headers: {
                    Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
                },
                dataSrc: function(res) {
                    $(".load-content").hide();
                    console.log(res);
                    if(res.status==0){
                        return res.data;
                    }else{
                        return [];
                    }

                },

                error: function(err) {
                    $(".load-content").hide();
                    if (err.status == 401) {
                        window.location.href = "login.html";
                    }
                    $(".load-content").hide();
                    toastr.error("خطا در برقراری ارتباط با سرور");
                }
            },

            columns: [
                { data: null },
                { data: "orderId" },
                { data: "orderStatus" },

                {
                    data: null,
                    render: function(data) {
                        return `<span>${data.Fname} ${data.Lname}</span>`;
                    }
                },
                { data: "email" },
                { data: "phone" },
                { data: "nationalCode" },
                { data: "province" },
                { data: "city" },
                { data: "chargeAmount" },
                { data: "active" },
                { data: "charge" },
                { data: "Pcode" },
                { data: "PcodeType" },
                { data: "RRN" },
                { data: "orderType" },
                { data: "dateTime" },

            ]
        });
        t.on("order.dt search.dt", function() {
            t.column(0, { search: "applied", order: "applied" })
                .nodes()
                .each(function(cell, i) {
                    cell.innerHTML = i + 1;
                });
        }).draw();
    };
    getDataTable();

    //----------------- REMOVE LOADING -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);


});
