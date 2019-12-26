$(document).ready(function(e) {
    //------------------ SET LOCATION HASH -------------------
    window.location.hash = "siteBanner";
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

    chargePage();
    guidPage();
    termPage();
    agentPage();
    aboutPage();
    //----------------- REMOVE LOADING -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main").remove();
    }, 0);

    $("#slidersTab").click(function() {
        $(".load-content").show();
        getMainPageSliders();
        getBuyPageSliders();

    });
});
//----------------get pic of charge page----------
function chargePage(){

    $.ajax({
        url:getPicOfChargePage,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

        success: function (data) {

            $('#chargeImg').attr('src','http://pushna.ir'+data);

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (jqXHR.status == 401) {
                window.location.href = "login.html";
            }
            console.log('error to get Pic Of Charge Page');
            toastr.error("خطا در دریافت اطلاعات");
        }
    });

}
//----------------get pic of guid page----------
function guidPage(){

    $.ajax({
        url:getPicOfGuidePage,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

        success: function (data) {

            $('#guidImg').attr('src','http://pushna.ir'+data);

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (jqXHR.status == 401) {
                window.location.href = "login.html";
            }
            console.log('error to get Pic Of guid Page');
            toastr.error("خطا در دریافت اطلاعات");
        }
    });

}
//----------------get pic of term page----------
function termPage(){

    $.ajax({
        url:getPicOfTermPage,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

        success: function (data) {

            $('#termImg').attr('src','http://pushna.ir'+data);

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (jqXHR.status == 401) {
                window.location.href = "login.html";
            }
            console.log('error to get Pic Of term Page');
            toastr.error("خطا در دریافت اطلاعات");
        }
    });

}
//----------------get pic of agent page----------
function agentPage(){

    $.ajax({
        url:getPicOfAgentPage,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

        success: function (data) {
            $(".load-content").hide();
            // console.log(data);
            $('#agentImg').attr('src','http://pushna.ir'+data);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(".load-content").hide();
            if (jqXHR.status == 401) {
                window.location.href = "login.html";
            }
            console.log('error to get Pic Of agent Page');
            toastr.error("خطا در دریافت اطلاعات");
        }
    });

}
//----------------get pic of about page----------
function aboutPage(){

    $.ajax({
        url:getPicOfAboutPage,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

        success: function (data) {
            $(".load-content").hide();
            // console.log(data);
            $('#aboutImg').attr('src','http://pushna.ir'+data);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(".load-content").hide();
            if (jqXHR.status == 401) {
                window.location.href = "login.html";
            }
            console.log('error to get Pic Of about Page');
            toastr.error("خطا در دریافت اطلاعات");
        }
    });

}

function updateChargePage(img){


    $('#chargeImgDiv .loading').removeClass('d-none');

    let formData = new FormData();
    formData.append("charge_pic",$(`#${img.closest('div').id}`).find('input').prop("files")[0]);


    fetch(updatePicOfChargePage, {
        method: "POST",
        body:formData,
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {
            $('#chargeImgDiv .loading').addClass('d-none');
            console.log(data);

            if(data.status==100){
                toastr.success('عملیات با موفقیت انجام شد');
                chargePage();
                removeImg('chargeImgDiv');
            }else if(data.status==101){
                toastr.error(data.validateError[0]);
            }else if(data.status==119){
                toastr.error('اجازه دسترسی تغییر عکس را ندارید');
            }else {
                toastr.error('خطا در ارسال اطلاعات');
            }
        });
    }).catch(async (err) => {
            $('#chargeImgDiv .loading').addClass('d-none');

            console.log("error to update image charge")
        }

    );

}

function updateGuidPage(img){


    $('#guidImgDiv .loading').removeClass('d-none');

    let formData = new FormData();
    formData.append("guide_pic",$(`#${img.closest('div').id}`).find('input').prop("files")[0]);


    fetch(updatePicOfGuidePage, {
        method: "POST",
        body:formData,
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {
            $('#guidImgDiv .loading').addClass('d-none');

            if(data.status==100){
                toastr.success('عملیات با موفقیت انجام شد');
                guidPage();
                removeImg('guidImgDiv');
            }else if(data.status==101){
                toastr.error(data.validateError[0]);
            }else if(data.status==119){
                toastr.error('اجازه دسترسی تغییر عکس را ندارید');
            }else {
                toastr.error('خطا در ارسال اطلاعات');
            }
        });
    }).catch(async (err) => {
            $('#guidImgDiv .loading').addClass('d-none');

            console.log("error to update image guid")
        }

    );

}

function updateTermPage(img){
    $('#termImgDiv .loading').removeClass('d-none');

    let formData = new FormData();
    formData.append("term_pic",$(`#${img.closest('div').id}`).find('input').prop("files")[0]);


    fetch(updatePicOfTermPage, {
        method: "POST",
        body:formData,
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {
            $('#termImgDiv .loading').addClass('d-none');

            if(data.status==100){
                toastr.success('عملیات با موفقیت انجام شد');
                termPage();
                removeImg('termImgDiv');
            }else if(data.status==101){
                toastr.error(data.validateError[0]);
            }else if(data.status==119){
                toastr.error('اجازه دسترسی تغییر عکس را ندارید');
            }else {
                toastr.error('خطا در ارسال اطلاعات');
            }
        });
    }).catch(async (err) => {
            $('#termImgDiv .loading').addClass('d-none');

            console.log("error to update image term")
        }

    );

}

function updateAgentPage(img){
    $('#agentImgDiv .loading').removeClass('d-none');

    let formData = new FormData();
    formData.append("agent_pic",$(`#${img.closest('div').id}`).find('input').prop("files")[0]);


    fetch(updatePicOfAgentPage, {
        method: "POST",
        body:formData,
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {
            $('#agentImgDiv .loading').addClass('d-none');

            if(data.status==100){
                toastr.success('عملیات با موفقیت انجام شد');
                agentPage();
                removeImg('agentImgDiv');
            }else if(data.status==101){
                toastr.error(data.validateError[0]);
            }else if(data.status==119){
                toastr.error('اجازه دسترسی تغییر عکس را ندارید');
            }else {
                toastr.error('خطا در ارسال اطلاعات');
            }
        });
    }).catch(async (err) => {
            $('#agentImgDiv .loading').addClass('d-none');

            console.log("error to update image term")
        }

    );

}

function updateAboutPage(img){
    $('#aboutImgDiv .loading').removeClass('d-none');

    let formData = new FormData();
    formData.append("about_pic",$(`#${img.closest('div').id}`).find('input').prop("files")[0]);


    fetch(updatePicOfAboutPage, {
        method: "POST",
        body:formData,
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {
            $('#aboutImgDiv .loading').addClass('d-none');

            if(data.status==100){
                toastr.success('عملیات با موفقیت انجام شد');
                aboutPage();
                removeImg('aboutImgDiv');
            }else if(data.status==101){
                toastr.error(data.validateError[0]);
            }else if(data.status==119){
                toastr.error('اجازه دسترسی تغییر عکس را ندارید');
            }else {
                toastr.error('خطا در ارسال اطلاعات');
            }
        });
    }).catch(async (err) => {
            $('#aboutImgDiv .loading').addClass('d-none');

            console.log("error to update image term")
        }

    );

}

//-----------image preview---------
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

            const x = document.createElement("IMG");
            x.setAttribute("src", e.target.result);
            x.setAttribute("width", "150px");
            x.setAttribute("height", "80px");
            x.setAttribute("alt", "تصویر محصول");
            x.className = "imgPreview";
            $(x).insertBefore($(`#${divName}`).find('.removeImgSite'));

            $((`#${objFileInput.closest('div').id}`)).find('label').addClass('d-none');
            $((`#${objFileInput.closest('div').id}`)).find('.removeImgSite').removeClass('d-none');
            $((`#${objFileInput.closest('div').id}`)).find('.updateImgSite').removeClass('d-none').addClass('d-flex');

        };
        fileReader.readAsDataURL(objFileInput.files[0]);
    }
}

function removeImg(divName){

    $(`#${divName}`).find('label').removeClass('d-none');
    $(`#${divName}`).find('.removeImgSite').addClass('d-none');
    $(`#${divName}`).find('.updateImgSite').addClass('d-none').removeClass('d-flex');
    $(`#${divName}`).find('input').val('');
    $(`#${divName}`).find('.imgPreview').remove();
}

//-----------------slider section-----------
function getMainPageSliders(){
    $.ajax({
        url:getSlidesOfHomePage,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

        success: function (data) {

            $('#mainPageSlider1').attr('src','http://pushna.ir'+data.slide1);
            $('#mainPageSlider2').attr('src','http://pushna.ir'+data.slide2);
            $('#mainPageSlider3').attr('src','http://pushna.ir'+data.slide3);

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (jqXHR.status == 401) {
                window.location.href = "login.html";
            }
            console.log('error to get Pic Of about Page');
            toastr.error("خطا در دریافت اطلاعات");
        }
    });

}

function getBuyPageSliders(){
    $.ajax({
        url:getSlidesOfBuyPage,
        type: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

        success: function (data) {
            $(".load-content").hide();
            console.log(data);
            $('#buyPageSlider1').attr('src','http://pushna.ir'+data.slide1);
            $('#buyPageSlider2').attr('src','http://pushna.ir'+data.slide2);
            $('#buyPageSlider3').attr('src','http://pushna.ir'+data.slide3);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(".load-content").hide();
            if (jqXHR.status == 401) {
                window.location.href = "login.html";
            }
            console.log('error to get Pic Of about Page');
            toastr.error("خطا در دریافت اطلاعات");
        }
    });

}

function updatemainPageSliders(){
    $('.mainPageLoader').removeClass('d-none');

    let formData = new FormData();
    if($(`#editSlider1`).prop("files")[0]){
        formData.append("slide1",$(`#editSlider1`).prop("files")[0]);
    }
    if($(`#editSlider2`).prop("files")[0]){
        formData.append("slide2",$(`#editSlider2`).prop("files")[0]) ;
    }
    if($(`#editSlider3`).prop("files")[0]){
        formData.append("slide3",$(`#editSlider3`).prop("files")[0]);
    }

    fetch(updateSlidesOfHomePage, {
        method: "POST",
        body:formData,
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {
            $('.mainPageLoader').addClass('d-none');

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
            $('.mainPageLoader').addClass('d-none');

            console.log("error to update main page slider")
        }

    );
}

function updateBuyPageSliders(){
    $('.buyPageLoader').removeClass('d-none');

    let formData = new FormData();
    if($(`#buyEditSlider1`).prop("files")[0]){
        formData.append("slide1",$(`#buyEditSlider1`).prop("files")[0]);
    }
    if($(`#buyEditSlider2`).prop("files")[0]){
        formData.append("slide2",$(`#buyEditSlider2`).prop("files")[0]) ;
    }
    if($(`#buyEditSlider3`).prop("files")[0]){
        formData.append("slide3",$(`#buyEditSlider3`).prop("files")[0]);
    }

    fetch(updateSlidesOfBuyPage, {
        method: "POST",
        body:formData,
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {
            $('.buyPageLoader').addClass('d-none');

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
            $('.buyPageLoader').addClass('d-none');

            console.log("error to update main page slider")
        }

    );
}

function editPageSlider(objFileInput,sliderName){
    let ext=(objFileInput.value).split('.').pop().toLowerCase();

    if($.inArray(ext, ['png']) == -1 && $.inArray(ext, ['jpg']) == -1 && $.inArray(ext, ['jpeg']) == -1 && $.inArray(ext, ['gif']) == -1) {

        toastr.error("شما مجاز به انتخاب عکس می باشید");
        objFileInput.val('');
        return false;
    }

    if (objFileInput.files[0]) {
        let fileReader = new FileReader();
        fileReader.onload = function (e) {

            $(`#${sliderName}`).attr("src", e.target.result);


        };
        fileReader.readAsDataURL(objFileInput.files[0]);
    }
}
