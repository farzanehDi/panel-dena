$(document).ready(function () {

//------------------ SET LOCATION HASH -------------------
    window.location.hash = "siteService";

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
    //----------------get Buy From Site status----------
    $.ajax({
        url:getBuyFromSite,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },
        dataType: "json",
        contentType: "application/json",
        success: function (data) {

            if (data.status == 100) {
                $("#BuyFromSite").prop('checked', data.result=='true');
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (jqXHR.status == 401) {
                window.location.href = "login.html";
            }
            console.log('error to get buy from site');
            toastr.error("خطا در دریافت اطلاعات");
        }
    });
    //----------------get Charge From Site----------
    $.ajax({
        url:getChargeFromSite,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },
        dataType: "json",
        contentType: "application/json",
        success: function (data) {

            if (data.status == 100) {
                $("#chargeFromSite").prop('checked', data.result=='true');
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (jqXHR.status == 401) {
                window.location.href = "login.html";
            }
            console.log('error to get charge from site');
            toastr.error("خطا در دریافت اطلاعات");
        }
    });
    //----------------get Register In Site----------
    $.ajax({
        url:getRegisterInSite,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            $(".load-content").hide();
            if (data.status == 100) {
                $("#registerInSite").prop('checked', data.result=='true');
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(".load-content").hide();
            if (jqXHR.status == 401) {
                window.location.href = "login.html";
            }
            console.log('error to get register in site');
            toastr.error("خطا در دریافت اطلاعات");
        }
    });
//----------------- update buy from site-------------------
    $("#BuyFromSite").on('click', function () {

        $.ajax({
            url:updateBuyFromSite+$(this).is(':checked'),
            type: "POST",
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },
            dataType: "json",
            contentType: "application/json",
            success: function (data) {

                if(data.status==100){
                    toastr.success('به روز رسانی با موفقیت انجام شد')
                }else{
                    toastr.error(data.validateError[0]);
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 401) {
                    window.location.href = "login.html";
                }
                toastr.error("خطا در ارسال اطلاعات");
            }
        });

    });
    //----------------- update charge from site-------------------
    $("#chargeFromSite").on('click', function () {

        $.ajax({
            url:updateChargeFromSite+$(this).is(':checked'),
            type: "POST",
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },
            dataType: "json",
            contentType: "application/json",
            success: function (data) {

                if(data.status==100){
                    toastr.success('به روز رسانی با موفقیت انجام شد')
                }else{
                    toastr.error(data.validateError[0]);
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 401) {
                    window.location.href = "login.html";
                }
                toastr.error("خطا در ارسال اطلاعات");
            }
        });

    });
    //----------------- update register in site-------------------
    $("#registerInSite").on('click', function () {

        $.ajax({
            url:updateRegisterInSite+$(this).is(':checked'),
            type: "POST",
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },
            dataType: "json",
            contentType: "application/json",
            success: function (data) {

                if(data.status==100){
                    toastr.success('به روز رسانی با موفقیت انجام شد')
                }else{
                    toastr.error(data.validateError[0]);
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 401) {
                    window.location.href = "login.html";
                }
                toastr.error("خطا در ارسال اطلاعات");
            }
        });

    });

//----------------- REMOVE LOADING -------------------
    setTimeout(function () {
        $('body').find('#loading-main').remove();
    }, 0);

});
