$(document).ready(function(e) {
    //------------------ SET LOCATION HASH -------------------
    window.location.hash = "limitations";
    $(".load-content").hide();

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

            if(data.status==100){
                $('#numberOfCard').val(data.result);
            }

        });

    }).catch(err => {
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

// document.getElementById('maxCharge').addEventListener('input', event =>
//     event.target.value = (parseInt(event.target.value.replace(/[^\d]+/gi, '')) || 0).toLocaleString('en-US')
// );
// document.getElementById('minCharge').addEventListener('input', event =>
//     event.target.value = (parseInt(event.target.value.replace(/[^\d]+/gi, '')) || 0).toLocaleString('en-US')
// );
document.getElementById('priceOfCardBody').addEventListener('input', event =>
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

    // let jsonData=JSON.stringify({
    //     limitation:parseInt($('#numberOfCard').val().replace(/,/g, ""),10),
    // });

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

    // let jsonData=JSON.stringify({
    //     cost:parseInt($('#priceOfCardBody').val().replace(/,/g, ""),10),
    // });

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