$(document).ready(function() {
    //-------------- SET LOCATION HASH ---------------
    window.location.hash = "financialReportDesigners";


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
    //---------------------------------LOAD Sale Statistics-------------------
    fetch(sales, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {
            $(".load-content").hide();
            // console.log(data);
            if(data.status==100){
                $('#totalCount').text(data.result.count);
                $('#total').text(data.result.cost);

            }else {
                toastr.error('خطا در دریافت اطلاعات');
            }
        });
    }).catch(async (err) => {
        $(".load-content").hide();
            console.log("error to get Sale Statistics")
        }

    );

    //---------------------------------------------
    let drawTable = function() {
        $("#paymentListTable").dataTable({

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
                url:designPayment,
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
                {
                    data: null,
                    render: function(data) {
                        return (
                            '<button class="updatePaymentStatus btn btn-success " data-id="' +
                                data.id +
                            '">بروز رسانی وضعیت پرداخت </button>'
                        );
                    }
                },


            ]
        });
    };

    $("#paymentsListBtn").click(function() {
        drawTable();
    });

    //--------------------- show designer details modal -----------------
    $("#paymentListTable").on("click", ".updatePaymentStatus", function() {
        let id = $(this).attr("data-id");

        $('#paymentId').val(id);

        $("#changeStatusPaymentModal").modal("show");


    });

    //----------------------------------edit change status----------------
    $("#changeStatusPayment").on("click", function() {

        let payment_id = $("#paymentId").val(),
            status =$("#paymentStatusModal").val();

        let jsonData = JSON.stringify({
            payment_id:payment_id,
            status:status,
        });

        $.ajax({
            url:updatePayment,
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
                    $("#paymentListTable").DataTable().clear();
                    $("#paymentListTable").DataTable().destroy();
                    drawTable();
                }else if(data.status==103){
                    toastr.error("پرداختی یافت نشد");
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
    //----------------- REMOVE LOADIN -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);
});


