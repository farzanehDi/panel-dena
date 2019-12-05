$(document).ready(function() {
    //-------------- SET LOCATION HASH ---------------
    window.location.hash = "chargeGroupCard";
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
    $('#sendChargeCardGroup').on('click', function (e) {

        if($('#uploadDepositingReceipt').val()==='' || $('#uploadChargeCard').val()===''){
            toastr.error("لطفا فیش واریزی و فایل اکسل را بارگزاری کنید");
            return false;
        }

        $('#loading').removeClass('d-none');

        let formData = new FormData();
        formData.append('section', 'general');
        //formData.append('action', 'previewImg');
        formData.append('excel', $('#uploadChargeCard')[0].files[0]);
        formData.append('image', $('#uploadDepositingReceipt')[0].files[0]);

        $.ajax({
            url: uploadPan,
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

                // console.log(data);
                $('#loading').addClass('d-none');
                $(".uploadedDepositingReceipt , .uploadedChargeGroupCardExcel").removeClass('d-block').addClass('d-none');
                $("#uploadDepositingReceiptContainer,#uploadChargeGroupCardExcel").removeClass('d-none');
                $('#uploadChargeCard,#uploadDepositingReceipt').val('');
                toastr.success("آپلود فایل با موفقیت انجام شد");

            },
            error: function(){
                toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش کنید");
                $('#loading').addClass('d-none');
            }


        });
    });
    //--------------------download file-----------
    $('#downloadChargeCardGroup').on('click', function (e) {

        fetch('...', {
            method: "GET",
            headers:{
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            }
        }).then(async (response) =>{

            await response.json().then(async (data) => {

                window.location.href=data;

            });

        }).catch(err => {
            toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش کنید");
            console.log('error to fetch categories')
        });
    });

    //----------------- REMOVE LOADIN -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);
});


function onDropChargeGroupCardExcel(input,successContainer,name,uploadContaner){
    let ext = $(`#${input}`).val().split('.').pop().toLowerCase();

    if(input==='uploadDepositingReceipt'){
        if($.inArray(ext, ['png']) == -1 && $.inArray(ext, ['jpg']) == -1 && $.inArray(ext, ['jpeg']) == -1) {
            toastr.error("شما مجاز به انتخاب عکس می باشید");
            $(`#${input}`).val('');
            return false;
        }
    }else{
        if($.inArray(ext, ['xlsx']) == -1) {
            toastr.error("شما مجاز به انتخاب فایل اکسل می باشید");
            $(`#${input}`).val('');
            return false;
        }
    }

    let file_size = $(`#${input}`)[0].files[0].size;
    if(file_size>10000000) {
        alert("حداکثر حجم فایل مجاز 10 مگابایت می باشد.");
        $(`#${input}`).val('');
        return false;
    }

    $(`.${successContainer}`).removeClass('d-none').addClass('d-block');
    $(`#${name}`).text($(`#${input}`).val());
    $(`#${uploadContaner}`).removeClass('d-block').addClass('d-none');
}

function removeFileChargeCard(uploaded,name,upload,input){

    $(`.${uploaded}`).removeClass('d-block').addClass('d-none');
    $(`#${name}`).text("");
    $(`#${upload}`).addClass('d-block');
    $(`#${input}`).val('');
}