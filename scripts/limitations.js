$(document).ready(function(e) {
    //------------------ SET LOCATION HASH -------------------
    window.location.hash = "limitations";
    //-------------get max min of charge------------
    fetch(getChargeLimitation, {
        method: "GET",
        headers:{
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        }
    }).then(async (response) =>{

        await response.json().then(async (data) => {


            if(data.status==100){
                $('#minCharge').val((parseInt(data.min_charge.value.replace(/[^\d]+/gi, '')) || 0).toLocaleString('en-US'));
                $('#maxCharge').val((parseInt(data.max_charge.value.replace(/[^\d]+/gi, '')) || 0).toLocaleString('en-US'));
            }

        });

    }).catch(err => {

        console.log('error to get max min')
    });
    //-------------get cost of card------------
    fetch(getCostOfCard, {
        method: "GET",
        headers:{
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        }
    }).then(async (response) =>{

        await response.json().then(async (data) => {

            if(data.status==100){
                $('#priceOfCardBody').val((parseInt(data.result.replace(/[^\d]+/gi, '')) || 0).toLocaleString('en-US'));
            }

        });

    }).catch(err => {

        console.log('error to get cost of card')
    });
    //-------------get Limitation of card------------
    fetch(getLimitation, {
        method: "GET",
        headers:{
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        }
    }).then(async (response) =>{

        await response.json().then(async (data) => {
            $(".load-content").hide();
            if(data.status==100){
                $('#numberOfCard').val(data.result);
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

document.getElementById('priceOfCardBody').addEventListener('input', event =>
    event.target.value = (parseInt(event.target.value.replace(/[^\d]+/gi, '')) || 0).toLocaleString('en-US')
);
document.getElementById('minCharge').addEventListener('input', event =>
    event.target.value = (parseInt(event.target.value.replace(/[^\d]+/gi, '')) || 0).toLocaleString('en-US')
);
document.getElementById('maxCharge').addEventListener('input', event =>
    event.target.value = (parseInt(event.target.value.replace(/[^\d]+/gi, '')) || 0).toLocaleString('en-US')
);

function numberOfCard(){

    $(".txt-error").remove();
    let errTexr = '<div class="txt-error">* این مورد الزامی است</div>';
    let errorNum=false;

    let input=document.getElementById('numberOfCard');
    if(input.value.length===0){
        $(errTexr).insertAfter(input);
        input.classList.add('borderRed');
        errorNum=true;
    }else {input.classList.remove('borderRed');}


    if(errorNum){return false;}

    $('.loadingNumber').removeClass('d-none');


    fetch(updateLimitation+'?limitation='+parseInt($('#numberOfCard').val().replace(/,/g, ""),10), {
        method: "POST",
        // body:jsonData,
        headers:{
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        }
    }).then(async (response) =>{

        await response.json().then(async (data) => {

            $('.loadingNumber').addClass('d-none');
            if(data.status==100){
                toastr.success('اطلاعات با موفقیت ارسال شد');
            }else if(data.status==101){
                toastr.error(data.validateError[0]);
            }
        });

    }).catch(err => {
        $('.loadingNumber').addClass('d-none');
        toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش کنید");
        console.log('error to fetch categories')
    });
}

function updateCostOfBodyCard(){

    $(".txt-error").remove();
    let errTexr = '<div class="txt-error">* این مورد الزامی است</div>';
    let errorNum=false;

    let input=document.getElementById('priceOfCardBody');
        if(input.value.length===0){
            $(errTexr).insertAfter(input);
            input.classList.add('borderRed');
            errorNum=true;
        }else {input.classList.remove('borderRed');}


    if(errorNum){return false;}

    $('.loadingBody').removeClass('d-none');


    fetch(updateCostOfCard+'?cost='+parseInt($('#priceOfCardBody').val().replace(/,/g, ""),10), {
        method: "POST",
        // body:jsonData,
        headers:{
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        }
    }).then(async (response) =>{

        await response.json().then(async (data) => {
            $('.loadingBody').addClass('d-none');

            if(data.status==100){
                toastr.success('اطلاعات با موفقیت ارسال شد');
            }else if(data.status==101){
                toastr.error(data.validateError[0]);
            }
        });

    }).catch(err => {
        $('.loadingBody').addClass('d-none');
        toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش کنید");
        console.log('error to fetch categories')
    });
}


function updateMaxMin(){

    $(".txt-error").remove();
    let errTexr = '<div class="txt-error">* این مورد الزامی است</div>';
    let errorNum=false;

    let minCharge=document.getElementById('minCharge');
    let maxCharge=document.getElementById('maxCharge');

        if(minCharge.value.length===0){
            $(errTexr).insertAfter(minCharge);
            minCharge.classList.add('borderRed');
            errorNum=true;
        }else {minCharge.classList.remove('borderRed');}
    if(maxCharge.value.length===0){
        $(errTexr).insertAfter(maxCharge);
        maxCharge.classList.add('borderRed');
        errorNum=true;
    }else {maxCharge.classList.remove('borderRed');}


    if(errorNum){return false;}

    $('.loadingMaxMin').removeClass('d-none');


    fetch(updateChargeLimitation+'?min_charge='+parseInt($('#minCharge').val().replace(/,/g, ""),10)+'&max_charge='+parseInt($('#maxCharge').val().replace(/,/g, ""),10), {
        method: "POST",
        headers:{
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        }
    }).then(async (response) =>{

        await response.json().then(async (data) => {
            $('.loadingMaxMin').addClass('d-none');

            if(data.status==100){
                toastr.success('اطلاعات با موفقیت ارسال شد');
            }else if(data.status==101){
                toastr.error(data.validateError[0]);
            }
        });

    }).catch(err => {
        $('.loadingMaxMin').addClass('d-none');
        toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش کنید");
        console.log('error to post min max')
    });
}