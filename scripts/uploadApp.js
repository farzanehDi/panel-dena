$(document).ready(function(e) {
    //------------------ SET LOCATION HASH -------------------
    window.location.hash = "uploadApp";
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
    getAndroidUrl();
    //------------send app----------
    $('#sendApp').on('click', function (e) {

        if($('#uploadApp').val()===''){
            toastr.error("لطفا فایل خود را انتخاب نمایید");
            return false;
        }

        $('#loading').removeClass('d-none');

        let formData = new FormData();
        formData.append('section', 'general');
        formData.append('android_app', $('input[type=file]')[0].files[0]);

        $.ajax({
            url: uploadAndroidApp,
            type: "POST",             // Type of request to be send, called as method
            data:formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            dataType: "json",
            contentType: false,     // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false,
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },
            success: function(data)   // A function to be called if request succeeds
            {

                if(data.status==100){
                    toastr.success("آپلود فایل با موفقیت انجام شد");
                    getAndroidUrl();
                }else if(data.status==101){
                    toastr.error(data.validateError[0]);
                }else if(data.status==119){
                    toastr.error('شما اجازه انجام این عملیات را ندارید');
                }else {
                    toastr.error('خطا در بارگزاری اپلیکیشن');
                }
                // console.log(data);
                $('#uploadApp').val('');
                $('#loading').addClass('d-none');
                $(".uploaded").removeClass('d-block').addClass('d-none');
                $("#upload").removeClass('d-none');


            },
            error: function(){
                toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش کنید");
                $('#loading').addClass('d-none');
            }
        });
    });


    //----------------- REMOVE LOADING -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);

});

function onDrop(){

    let ext = $('#uploadApp').val().split('.').pop().toLowerCase();
    if($.inArray(ext, ['apk']) == -1) {
        toastr.error("شما مجاز به انتخاب فایل apk می باشید");
        $('#uploadPan').val('');
        return false;
    }

    $(".uploaded").removeClass('d-none').addClass('d-block');
    $("#fileName").text($("#uploadApp").val());
    $("#upload").addClass('d-none').removeClass('d-block');
}

function removeFile(){

    $(".uploaded").removeClass('d-block').addClass('d-none');
    $("#fileName").text("");
    $("#upload").addClass('d-block');
    $('#uploadApp').val('');
}

//----------------get app url----------
function getAndroidUrl(){

    $.ajax({
        url:getAndroidAppUrl,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

        success: function (data) {
            $(".load-content").hide();
            // console.log(data);
            $('#appUrl').text(data);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(".load-content").hide();
            if (jqXHR.status == 401) {
                window.location.href = "login.html";
            }
            console.log('error to get app url');
            toastr.error("خطا در دریافت اطلاعات");
        }
    });

}
