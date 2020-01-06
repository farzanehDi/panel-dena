$(document).ready(function(e) {
    //------------------ SET LOCATION HASH -------------------
    window.location.hash = "specialPic";
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

    getSpecialPic();

    //----------------- REMOVE LOADING -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main").remove();
    }, 0);


});
//----------------get pic of charge page----------
function getSpecialPic(){

    $.ajax({
        url:getSpecialOfBuyPage,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

        success: function (data) {
            $(".load-content").hide();
            // console.log(data);
            $('#specialImage1').attr('src',data.pic1);
            $('#specialImage2').attr('src',data.pic2);
            $('#specialImage3').attr('src',data.pic3);
            $('#specialImage4').attr('src',data.pic4);
            $('#specialImage5').attr('src',data.pic5);
            $('#specialImage6').attr('src',data.pic6);
            $('#url1').val(data.url1);
            $('#url2').val(data.url2);
            $('#url3').val(data.url3);
            $('#url4').val(data.url4);
            $('#url5').val(data.url5);
            $('#url6').val(data.url6);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(".load-content").hide();
            if (jqXHR.status == 401) {
                window.location.href = "login.html";
            }
            console.log('error to get special pic');
            toastr.error("خطا در دریافت اطلاعات");
        }
    });

}

function showPreview(objFileInput,divName) {

    let ext=(objFileInput.value).split('.').pop().toLowerCase();

    if($.inArray(ext, ['png']) == -1 && $.inArray(ext, ['jpg']) == -1 && $.inArray(ext, ['jpeg']) == -1 && $.inArray(ext, ['gif']) == -1) {

        toastr.error("شما مجاز به انتخاب عکس می باشید");
        objFileInput.val('');
        return false;
    }

    if (objFileInput.files[0]) {
        let fileReader = new FileReader();
        fileReader.onload = function (e) {

            if (objFileInput.files[0]) {
                let fileReader = new FileReader();
                fileReader.onload = function (e) {
                    $(`#${divName}`).attr("src", e.target.result);
                };
                fileReader.readAsDataURL(objFileInput.files[0]);
            }
        };
        fileReader.readAsDataURL(objFileInput.files[0]);
    }
}

function updateSpecialPics() {
    $('.loadingUpdatePic').removeClass('d-none');

    let formData = new FormData();
    if($(`#pic1`).prop("files")[0]){
        formData.append("pic1",$(`#pic1`).prop("files")[0]);
    }
    if($(`#pic2`).prop("files")[0]){
        formData.append("pic2",$(`#pic2`).prop("files")[0]) ;
    }
    if($(`#pic3`).prop("files")[0]){
        formData.append("pic3",$(`#pic3`).prop("files")[0]);
    }
    if($(`#pic4`).prop("files")[0]){
        formData.append("pic4",$(`#pic4`).prop("files")[0]);
    }
    if($(`#pic5`).prop("files")[0]){
        formData.append("pic5",$(`#pic5`).prop("files")[0]);
    }
    if($(`#pic6`).prop("files")[0]){
        formData.append("pic6",$(`#pic6`).prop("files")[0]);
    }

    fetch(updateSpecialPicOfBuyPage, {
        method: "POST",
        body:formData,
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {
            $('.loadingUpdatePic').addClass('d-none');

            if(data.status==100){
                toastr.success('عملیات با موفقیت انجام شد');

            }else if(data.status==101){
                toastr.error(data.validateError[0]);
            }else if(data.status==119){
                toastr.error('اجازه دسترسی تغییر عکس را ندارید');
            }else {
                toastr.error('خطا در ارسال اطلاعات');
            }
        });
    }).catch(async (err) => {
            $('.loadingUpdatePic').addClass('d-none');

            console.log("error to update special pic")
        }

    );
}


function updateSpecialUrls() {
    $('.loadingUpdateLink').removeClass('d-none');

    fetch(`${updateSpecialUrlOfBuyPage}?url1=${$('#url1').val()}&url2=${$('#url2').val()}&url3=${$('#url3').val()}
    &url4=${$('#url4').val()}&url5=${$('#url5').val()}&url6=${$('#url6').val()}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {
            $('.loadingUpdateLink').addClass('d-none');

            if(data.status==100){
                toastr.success('عملیات با موفقیت انجام شد');

            }else if(data.status==101){
                toastr.error(data.validateError[0]);
            }else if(data.status==119){
                toastr.error('اجازه دسترسی تغییر لینک را ندارید');
            }else {
                toastr.error('خطا در ارسال اطلاعات');
            }
        });
    }).catch(async (err) => {
            $('.loadingUpdateLink').addClass('d-none');

            console.log("error to update special link")
        }

    );
}



