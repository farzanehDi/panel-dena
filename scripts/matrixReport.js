$(document).ready(function() {
    //------------------ SET LOCATION HASH -------------------
    window.location.hash = "matrixReport";

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

    $("#orderTime_S , #orderTime_E").val('');
    //--------------------------SEARCH ORDER---------------------------
    getInfo();
    $("#searchMatrixReport").click(function() {

        $(".load-content").show();
        getInfo();

    });

    let getDataTable = function(data) {
        $("#matrixReport").DataTable({
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
            filter: false,
            targets: 0,
            bDestroy:true,
            dom: "Bfrtip",

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
                        columns: [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15]
                    }
                },
                {
                    extend: "excelHtml5",

                    text:
                        '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Excel',
                    exportOptions: {
                        columns: [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15]
                    }
                }
            ],

            data:data,
            columns: [

                { data: "RRN" },
                { data: "orderId" },
                {
                    data: null,
                    render: function(data) {
                        if(data.orderStatus=='pending'){
                            return (
                                '<span>در انتظار پرداخت</span>'
                            );
                        }else if(data.orderStatus=='cancel'){
                            return (
                                '<span>لغو شده</span>'
                            );
                        }else if(data.orderStatus=='processing'){
                            return (
                                '<span>تایید شده</span>'
                            );
                        }else if(data.orderStatus=='failed'){
                            return (
                                '<span>خطا در پرداخت</span>'
                            );
                        }else if(data.orderStatus=='cancel'){
                            return (
                                '<span>لغو توسط کاربر</span>'
                            );
                        }else if(data.orderStatus=='pay'){
                            return (
                                '<span>پرداخت شده</span>'
                            );
                        }else if(data.orderStatus=='reject'){
                            return (
                                '<span>رد شده</span>'
                            );
                        }else if(data.orderStatus=='waiting'){
                            return (
                                '<span>در انتظار چاپ</span>'
                            );
                        }else if(data.orderStatus=='sending'){
                            return (
                                '<span>در حال ارسال</span>'
                            );
                        }else if(data.orderStatus=='done'){
                            return (
                                '<span>تکمیل شده</span>'
                            );
                        }else if(data.orderStatus=='error'){
                            return (
                                '<span>خطا در ارتباط</span>'
                            );
                        }else {
                            return (
                                `<span>${data.orderStatus}</span>`
                            );
                        }

                    }
                },

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
                {
                    data: null,
                    render: function(data) {
                        if(data.active=='false'){
                            return (
                                '<span>غیر فعال</span>'
                            );
                        }else if(data.active=='true'){
                            return (
                                '<span>فعال</span>'
                            );
                        }else {
                            return (
                                `<span>${data.active}</span>`
                            );
                        }
                    }
                },
                {
                    data: null,
                    render: function(data) {
                        if(data.charge=='false'){
                            return (
                                '<span>شارژ نشده</span>'
                            );
                        }else if(data.charge=='true'){
                            return (
                                '<span>شارژ شده</span>'
                            );
                        }else {
                            return (
                                `<span>${data.charge}</span>`
                            );
                        }
                    }
                },
                { data: "Pcode" },
                {
                    data: null,
                    render: function(data) {
                        if(data.PcodeType='default'){
                            return (
                                '<span>ساده</span>'
                            );
                        }else if(data.PcodeType=='custom'){
                            return (
                                '<span>طرح دلخواه</span>'
                            );
                        }else {
                            return (
                                `<span>${data.PcodeType}</span>`
                            );
                        }
                    }
                },
                { data: "orderType" },
                { data: "dateTime" },

            ]
        });

    };


    //----------------- REMOVE LOADING -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);
//    -------
    function getInfo(){

        $.ajax({
            url:matrixReport,
            type: "PUT",
            dataType: "json",
            data:JSON.stringify({
                pCode:$('#pCode').val(),
                charge:$('#charge').val(),
                active:$('#active').val(),
                orderTime_S:$('#orderTime_S').val(),
                orderTime_E:$('#orderTime_E').val(),
                mellicode:$('#mellicode').val(),
                mobileNo:$('#mobileNo').val(),
                RRN:$('#RRN').val(),
                orderStatus:$('#orderStatus').val()
            }),
            contentType: "application/json; charset=utf-8",
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },

            success: function(res) {
                $(".load-content").hide();
                if(res.status==0){
                    getDataTable(res.data);
                }else {
                    getDataTable([]);
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
        });

    }
});


