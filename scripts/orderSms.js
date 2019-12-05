$(document).ready(function() {
    //-------------- SET LOCATION HASH ---------------
    window.location.hash = "orderSms";
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
    //-----------send sms------------------------------
    $("#sendSms").click(function(event) {
        $('.txt-error').remove();
        let error = 0;
        let errTexr = '<div class="txt-error">* این فیلد ضروری است</div>';

        if($('#smsTxt').val().trim()===''){
            $(errTexr).insertAfter("#smsTxt");
            error=1;
        }

        if (error == 1) {
            return false;
        }
        else {

            $('#sendSms img').removeClass('d-none');

            let jsonData = JSON.stringify({
                text: $("#smsTxt").val(),
                id: $("#smsType").val()
            });
            $.ajax({
                url: '...',
                type: "POST",
                dataType: "json",
                data: jsonData,
                contentType: "application/json; charset=utf-8",
                datasrc: "",
                success: OnSuccess,
                error: OnError
            });
            return false;
        }
    });

    function OnSuccess(data, status) {
        $('#sendSms img').addClass('d-none');
       toast.success('تغییرات با موفقیت اعمال شد')
    }
    function OnError(jqXHR, textStatus, errorThrown) {

        $('#sendSms img').addClass('d-none');
        toastr.error("خطا در ارسال اطلاعات");

    }
    //----------------- REMOVE LOADIN -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);
});