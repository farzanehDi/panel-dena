$(document).ready(function() {
    //-------------- SET LOCATION HASH ---------------
    window.location.hash = "activateGroupCard";
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

//------------send excel file----------
    $('#sendActiveCardGroup').on('click', function (e) {

        if($('#uploadActiveCard').val()===''){
            toastr.error("لطفا فایل خود را انتخاب نمایید");
            return false;
        }


        $('#loading').removeClass('d-none');

        let formData = new FormData();
        formData.append('section', 'general');
        formData.append('excel', $('input[type=file]')[0].files[0]);

        $.ajax({
            url:sendExcel+'active',
            type: "POST",             // Type of request to be send, called as method
            data:formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false,
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },
            success: function(data)   // A function to be called if request succeeds
            {

                $('#loading').addClass('d-none');

                console.log(data);
                if(data.status==0){
                    $('#loading').addClass('d-none');
                    $(".uploadedActiveGroupCardExcel").removeClass('d-block').addClass('d-none');
                    $("#uploadActiveGroupCardExcel").removeClass('d-none');
                    $('#uploadActiveCard').val('');
                    toastr.success(data.msg);
                }else{
                    toastr.error(data.msg)
                }


            },
            error: function(){
                toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش کنید");
                $('#loading').addClass('d-none');
            }


        });
    });

    //--------------------------------------------
    $('#downloadActiveCardGroup').on('click', function (e) {

        $(".load-content").show();
        fetch(getExcel+'active', {
            method: "GET",
            headers:{
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            }
        }).then(async (response) =>{
            $(".load-content").hide();
            await response.json().then(async (data) => {

                console.log(data);
                if(data.status==0){
                    window.location.href=data;
                }else {
                    toastr.error(data.msg);
                }
            });

        }).catch(err => {
            $(".load-content").hide();
            toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش کنید");
            console.log('error to get download link')
        });
    });

    //----------------- REMOVE LOADIN -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);
});


function onDropActiveGroupCardExcel(){
    let ext = $('#uploadActiveCard').val().split('.').pop().toLowerCase();
    if($.inArray(ext, ['xlsx','xls']) == -1) {
        toastr.error("شما مجاز به انتخاب فایل اکسل می باشید");
        $('#uploadActiveCard').val('');
        return false;
    }

    //$("#message").empty();
    //$("#file_error2").empty();
    let file_size = $('#uploadActiveCard')[0].files[0].size;
    if(file_size>20000000) {
        alert("حداکثر حجم فایل مجاز ۲۰ مگابایت می باشد.");
        $('#uploadActiveCard').val('');
        //$(".demoInputBox").css("border-color","#FF0000","marginTop","-20px");
        return false;
    }

    $(".uploadedActiveGroupCardExcel").removeClass('d-none').addClass('d-block');
    $("#fileNameActiveCard").text($("#uploadActiveCard").val());
    $("#uploadActiveGroupCardExcel").removeClass('d-block').addClass('d-none');
}

function removeFileActiveCard(){

    $(".uploadedActiveGroupCardExcel").removeClass('d-block').addClass('d-none');
    $("#fileNameActiveCard").text("");
    $("#uploadActiveGroupCardExcel").addClass('d-block');
    $('#uploadActiveCard').val('');
}