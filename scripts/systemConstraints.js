$(document).ready(function(e) {
    //------------------ SET LOCATION HASH -------------------
    window.location.hash = "systemConstraints";
    //-------------get number of error------------
    fetch(getNumberOfFailed, {
        method: "GET",
        headers:{
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        }
    }).then(async (response) =>{

        await response.json().then(async (data) => {

            // console.log(data);
            if(data.status==0){
                $('#numberOfErr').text(data.report[0]);
                $('#numberOfFailed').val(data.report[1]);
            }

        });

    }).catch(err => {

        console.log('error to get count off error')
    });
    //-------------get admin mobile------------
    fetch(getAdminMobile, {
        method: "GET",
        headers:{
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        }
    }).then(async (response) =>{

        await response.json().then(async (data) => {
            $(".load-content").hide();
            if(data.status==0){
                $('#adminMobile').val(data.msg);
            }

        });

    }).catch(err => {
        $(".load-content").hide();
        $('#loading').addClass('d-none');
        toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش کنید");
        console.log('error to fetch Limitation')
    });

    //----------------- REMOVE LOADING -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);
});


function numberOfFailed(){

    $(".txt-error").remove();
    let errTexr = '<div class="txt-error">* این مورد الزامی است</div>';
    let errorNum=false;

    let input=document.getElementById('numberOfFailed');
    if(input.value.length===0){
        $(errTexr).insertAfter(input);
        input.classList.add('borderRed');
        errorNum=true;
    }else {input.classList.remove('borderRed');}


    if(errorNum){return false;}

    $('.loadingNumber').removeClass('d-none');


    fetch(postNumberOfFailed+$('#numberOfFailed').val(), {
        method: "PUT",
        headers:{
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        }
    }).then(async (response) =>{

        await response.json().then(async (data) => {

            $('.loadingNumber').addClass('d-none');
            // console.log(data);
            if(data.status==0){
                toastr.success('اطلاعات با موفقیت ارسال شد');
            }else if(data.status==101){
                toastr.error(data.msg);
            }
        });

    }).catch(err => {
        $('.loadingNumber').addClass('d-none');
        toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش کنید");
        console.log('error to post number of failed')
    });
}

function updateAdminMobile(){

    $(".txt-error").remove();
    let errTexr = '<div class="txt-error">* این مورد الزامی است</div>';
    let errorNum=false;

    let input=document.getElementById('adminMobile');
    if(input.value.length===0){
        $(errTexr).insertAfter(input);
        input.classList.add('borderRed');
        errorNum=true;
    }else {input.classList.remove('borderRed');}


    if(errorNum){return false;}

    $('.loadingBody').removeClass('d-none');


    fetch(postAdminMobile+$('#adminMobile').val(), {
        method: "PUT",
        // body:jsonData,
        headers:{
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        }
    }).then(async (response) =>{

        await response.json().then(async (data) => {
            $('.loadingBody').addClass('d-none');
            console.log(data);
            if(data.status==0){
                toastr.success(data.msg);
            }else{
                toastr.error(data.msg);
            }
        });

    }).catch(err => {
        $('.loadingBody').addClass('d-none');
        toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش کنید");
        console.log('error to fetch categories')
    });
}