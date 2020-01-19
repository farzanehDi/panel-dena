$(document).ready(function() {
    //-------------- SET LOCATION HASH ---------------
    window.location.hash = "designers";
    $(".load-content").hide();

    //-------------- GET COOKIE TOKEN ---------------
    function getCookie(token) {
        var name = token + "=",
            decodedCookie = decodeURIComponent(document.cookie),
            ca = decodedCookie.split(";");

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
    //---------------------------------LOAD DATATABLE of designs-------------------
    let drawTableDesigns = function() {
        $("#listOfDesigns").dataTable({

            processing: true,
            filter: true,
            dom: "Bfrtip",
            buttons: [
                "pageLength",

            ],
            lengthMenu: [
                [10, 25, 50, -1],
                ["10 سطر", "25 سطر", "50 سطر", "نمایش همه"]
            ],
            language: {
                url: "./plugin/Persian.json",
                buttons: {
                    pageLength: {
                        _: "نمایش %d سطر",
                        "-1": "نمایش همه"
                    }
                }
            },
            bDestroy: true,
            scrollX: true,
            ajax: {
                url:listOfDesigns+$('#statusDesign').val(),
                method:'post',
                contentType: "application/json; charset=utf-8",
                headers: {
                    Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
                },
                dataSrc: function(res) {
                    // $(".load-content").hide();
                    // console.log(res);
                    return res;
                },
                error: function(err) {
                    if (err.status == 401) {
                        window.location.href = "login.html";
                    }

                    console.log(err);
                }
            },
            columns: [
                { data: "name" },
                // { data: "pic" },
                {
                    data: null,
                    render: function(data) {
                        return (`<a target="_blank" href="${data.pic}">
                                    <img src="${data.pic}" class="designsImg" alt="${data.name}"/>
                                </a>`);

                    }
                },
                { data: "cost" },
                { data: "off" },
                { data: "code" },
                {
                    data: null,
                    render: function(data) {
                        if(data.state=='accept'){
                            return (`تایید شده`);
                        }else if(data.state=='reject'){
                            return (`تایید نشده`);
                        }else if(data.state=='waiting'){
                            return (`در حال انتظار`);
                        }else{
                            return (data.state);
                        }
                    }
                },
                { data: "description" },
                {
                    data: null,
                    render: function(data) {
                        return (`${data.fname} ${data.lname}`);

                    }
                },
                {
                    data: null,
                    render: function(data) {
                        return (
                            '<button class="changeStatus btn btn-primary " data-id="' +
                            data.id +
                            '">تغییر وضعیت </button>'
                        );
                    }
                },
                {
                    data: null,
                    render: function(data) {
                        return (
                            '<button class="saleReport btn btn-success " data-id="' +
                            data.id +
                            '">آمار فروش </button>'
                        );
                    }
                }
            ]
        });
    };

    drawTableDesigns();
    $("#statusDesign").on("change", function() {
        drawTableDesigns();
    });
    //--------------------- change status open modal -----------------
    $("#listOfDesigns").on("click", ".changeStatus", function() {
        let id = $(this).attr("data-id");
        $('#designId').val(id);

        $("#changeStatusModal").modal("show");
    });
    //--------------------- sale report open modal -----------------
    $("#listOfDesigns").on("click", ".saleReport", function() {
        $(".load-content").show();
        let id = $(this).attr("data-id");

        fetch(sales+'?design_id='+id, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },

        }).then(async (response) =>{
            await response.json().then(async (data) => {
                $(".load-content").hide();
                if(data.status==100){
                    $('#totalCountModal').val(data.result.count);
                    $('#totalModal').val(data.result.cost);
                    $("#saleReportModal").modal("show");

                }else {
                    toastr.error('خطا در دریافت اطلاعات');
                }
            });
        }).catch(async (err) => {
            $(".load-content").hide();
            toastr.error('خطا در دریافت اطلاعات');
            }

        );


    });
    //----------------------------------edit change status----------------
    $("#changeStatusDesign").on("click", function() {

        let design_id = $("#designId").val(),
            status =$("#designStatusModal").val();

        let jsonData = JSON.stringify({
            design_id: design_id,
            status:status,
        });

        $.ajax({
            url:designStatus,
            type: "POST",
            dataType: "json",
            data: jsonData,
            contentType: "application/json",
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },

            success: function(data) {

                if(data.status==101){
                    toastr.error(data.validateError[0]);
                }else if(data.status==100){
                    toastr.success("ویرایش با موفقیت انجام شد");
                    $("#listOfDesigns").DataTable().clear();
                    $("#listOfDesigns").DataTable().destroy();
                    drawTableDesigns();
                }else if(data.status==103){
                    toastr.error("طرح یافت نشد");
                }else {
                    toastr.error("خطا در ارسال اطلاعات");
                }

            },
            error: function(err) {
                if (err.status == 401) {
                    window.location.href = "login.html";
                }
                var message = "خطا در ارسال اطلاعات";
                toastr.error(message);

            }
        });
        // });
    });
    //---------------------------------------------
    let drawTableDesigners = function() {
        $("#listOfDesigners").dataTable({

            processing: true,
            filter: true,
            dom: "Bfrtip",
            buttons: [
                "pageLength",

            ],
            lengthMenu: [
                [10, 25, 50, -1],
                ["10 سطر", "25 سطر", "50 سطر", "نمایش همه"]
            ],
            language: {
                url: "./plugin/Persian.json",
                buttons: {
                    pageLength: {
                        _: "نمایش %d سطر",
                        "-1": "نمایش همه"
                    }
                }
            },
            bDestroy: true,
            scrollX: true,
            ajax: {
                url:listOfDesigner,
                method:'post',
                contentType: "application/json; charset=utf-8",
                headers: {
                    Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
                },
                dataSrc: function(res) {
                    // $(".load-content").hide();
                    // console.log(res);
                    return res;
                },
                error: function(err) {
                    if (err.status == 401) {
                        window.location.href = "login.html";
                    }

                    console.log(err);
                }
            },
            columns: [
                {
                    data: null,
                    render: function(data) {
                        return (`${data.fname} ${data.lname}`);

                    }
                },
                { data: "national_code" },
                { data: "phone" },
                {
                    data: null,
                    render: function(data) {
                        return (
                            '<button class="designersDetails btn btn-info pr-5 pl-5" data-item="' +
                                encodeURIComponent(JSON.stringify(data)) +
                            '">جزییات</button>'
                        );
                    }
                },
                {
                    data: null,
                    render: function(data) {
                        return (
                            '<button class="financialReport btn btn-success " data-id="' +
                                data.id +
                            '">وضعیت پرداختی </button>'
                        );
                    }
                },


            ]
        });
    };

    $("#designersBtn").click(function() {
        drawTableDesigners();
    });
    //------------open financial modal report----------------
    $("#listOfDesigners").on("click", ".financialReport", function() {

        let id = $(this).attr("data-id");

        drawTableFinancialReport(id);
        $("#financialReportModal").modal("show");


    });

    //--------------------- show designer details modal -----------------
    $("#listOfDesigners").on("click", ".designersDetails", function() {
        let itemInfo = JSON.parse(decodeURIComponent($(this).data("item")));

        let name = itemInfo.fname+''+itemInfo.lname,
            national_code= itemInfo.national_code,
            phone= itemInfo.phone,
            email= itemInfo.email,
            gender= itemInfo.gender,
            birthday= itemInfo.birthday,
            province= itemInfo.province,
            city= itemInfo.city,
            company_code= itemInfo.company_code,
            company_type= itemInfo.company_type,
            sheba= itemInfo.sheba,
            address= itemInfo.address,
        id = itemInfo.id;




        $("#designerId").val(id);
        $("#designerName").val(name);
        $("#phoneDesigner").val(phone);
        $("#nationalCodeDesigner").val(national_code);
        $("#emailDesigner").val(email);
        $("#genderDesigner").val(gender=='male'?'مرد':'زن');
        $("#birthdayDesigner").val(birthday);
        $("#provinceDesigner").val(province);
        $("#cityDesigner").val(city);
        $("#companyCodeDesigner").val(company_code);
        $("#companyTypeDesigner").val(company_type);
        $("#shebaDesigner").val(sheba);
        $("#addressDesigner").val(address);

        $("#designersDetailsModal").modal("show");


    });


    //----------------- REMOVE LOADIN -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);
});


function drawTableFinancialReport(id) {
    $("#paymentListReportTable").dataTable({

        processing: true,
        filter: true,
        dom: "Bfrtip",
        buttons: [
            "pageLength",

        ],
        lengthMenu: [
            [10, 25, 50, -1],
            ["10 سطر", "25 سطر", "50 سطر", "نمایش همه"]
        ],
        language: {
            url: "./plugin/Persian.json",
            buttons: {
                pageLength: {
                    _: "نمایش %d سطر",
                    "-1": "نمایش همه"
                }
            }
        },
        bDestroy: true,
        scrollX: true,
        ajax: {
            url:designPayment+'?user_id='+id,
            method:'post',
            contentType: "application/json; charset=utf-8",
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },
            dataSrc: function(res) {
                // $(".load-content").hide();
                console.log(res);
                return res;
            },
            error: function(err) {
                if (err.status == 401) {
                    window.location.href = "login.html";
                }

                console.log(err);
            }
        },
        columns: [
            {
                data: null,
                render: function(data) {
                    return (`${data.fname} ${data.lname}`);

                }
            },
            { data: "amount" },
            {
                data: null,
                render: function(data) {
                    if(data.status=='waiting')
                        return (`در حال پرداخت`);
                    else if(data.status=='pay')
                        return (`پرداخت شده`);
                    else if(data.status=='cancel')
                        return (`لغو شده`);
                    else
                        return (data.status);
                }
            },

        ]
    });
}