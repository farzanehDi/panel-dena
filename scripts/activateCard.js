$(document).ready(function() {
    //-------------- SET LOCATION HASH ---------------
    window.location.hash = "activateCard";
    $(".load-content").hide();

    //-----------------------active card--------------------

    $("#activeCard").on("click", function() {
        $(".errPan").remove();

        let errPan = '<div class="errPan text-danger text-right">* لطفا یک پن نامبر 16 رقمی وارد نمایید</div>';

        if($("#panNumberActive").val().length!==16){
            $(errPan).insertAfter("#panNumberActive");
            $("#panNumberActive").addClass('borderRed');
            return false;
        }else {
            $(".errPan").remove();
            $("#panNumberActive").removeClass('borderRed');
        }

        $('.loadingActivePan').removeClass('d-none');

        $.ajax({
            url: activePan+$("#panNumberActive").val() ,
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },
            success: function(data) {
                $('.loadingActivePan').addClass('d-none');
                if(data==0){
                    toastr.success("فعالسازی با موفقیت انجام شد");
                }else{
                    toastr.error(data.message);
                }

            },
            error: function(err) {
                $('.loadingActivePan').addClass('d-none');
                if (err.status == 401) {
                    window.location.href = "login.html";
                }

                toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش نمایید");

            }
        });
    });
    //----------------- REMOVE LOADIN -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);
});