$(document).ready(function() {
    //-------------- SET LOCATION HASH ---------------
    window.location.hash = "discountCoupon";
    $(".load-content").hide();
    //----------DATEPICKER---------
    $("#couponExpire").persianDatepicker({
        altFormat: "YYYY MM DD HH:mm:ss",
        observer: true,
        format: "YYYY-MM-DD"
    });
    //
    // $("#couponExpire").val('');

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

    //--------------ADD coupon--------------------
    $("#addCoupon").on("click", function() {

        var errTexr = '<div class="txt-error">* این فیلد ضروری است</div>',
            type = $("#couponType").val(),
            amount = $("#couponAmount").val(),
            percent = $("#couponPercent").val(),
            expire_date = $("#couponExpire").val();

        let error = 0;
        for (var i = 1; i <= 4; i++) {
            if ($(".noEmpty" + i).val() == "") {
                if (
                    !$(".noEmpty" + i)
                        .parent()
                        .find(".txt-error").length
                ) {
                    $(errTexr).insertAfter(".noEmpty" + i);
                }

                $(".noEmpty" + i).css({
                    "border-color": "red",
                    "box-shadow": "0px 0px 2px red"
                });
                error = 1;
            } else {
                $(".noEmpty" + i).css({
                    "border-color": "lightgray",
                    "box-shadow": "0px 0px 0px lightgray"
                });
            }
        }

        if (error == 1) {
            return false;
        } else {

            let jsonData = JSON.stringify({
                type:type,
                amount:amount,
                percent:percent,
                expire_date:expire_date
            });

            $(".load-content").show();
            $.ajax({
                url:createCoupon,
                type: "POST",
                dataType: "json",
                data: jsonData,
                contentType: "application/json",
                headers: {
                    Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
                },

                success: function(data) {
                    $(".load-content").hide();
                    console.log(data);
                    if(data.status==101){
                        toastr.error(data.validateError[0]);
                    }else if(data.status==100){
                        toastr.success("ثبت با موفقیت انجام شد");
                    }else {
                        toastr.error("خطا در ارسال اطلاعات");
                    }


                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $(".load-content").hide();
                    // console.log(data);
                    if (jqXHR.status == 401) {
                        window.location.href = "login.html";
                    }
                    if (jqXHR.status == 500) {
                        toastr.error("خطا در برقراری ارتباط با سرور");
                    }

                    toastr.error("خطا در برقراری ارتباط با سرور");

                }
            });

        }
    });

    //---------------------------------LOAD DATATABLE-------------------
    let drawTable = function() {
        $("#couponListTable").dataTable({

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
                url:getCoupons,
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
                { data: "code" },

                {
                    data: null,
                    render: function(data) {
                        if(data.type=='money'){
                            return ('ثابت');
                        }else if(data.type=='percent'){
                            return ('درصدی');
                        }
                        else{
                            return (data.status);
                        }
                    }
                },
                { data: "amount" },
                { data: "percent" },
                {
                    data: null,
                    render: function(data) {
                        if(data.status=='open'){
                            return ('باز');
                        }else if(data.status=='close'){
                            return ('بسته');
                        }
                        else{
                            return (data.status);
                        }
                    }
                },
                { data: "expire_date" },
            ]
        });
    };

    $("#couponListBtn").click(function() {
        drawTable();
    });
    //---------------------- REMOVE ERROR -----------------
    $("input").keyup(function() {
        $(this).css({
            "border-color": "#ccc",
            "box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)"
        });
        $(this)
            .parent()
            .find(".txt-error")
            .remove();
    });

    //----------------- REMOVE LOADIN -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);
});


