$(document).ready(function(e) {
    //------------------ SET LOCATION HASH -------------------
    window.location.hash = "systemConstraints";
    //-------------get number of error------------
    // fetch('....', {
    //     method: "GET",
    //     headers:{
    //         Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
    //     }
    // }).then(async (response) =>{
    //
    //     await response.json().then(async (data) => {
    //
    //         if(data.status==100){
    //             $('#priceOfCardBody').val((parseInt(data.result.replace(/[^\d]+/gi, '')) || 0).toLocaleString('en-US'));
    //         }
    //
    //     });
    //
    // }).catch(err => {
    //
    //     console.log('error to get cost of card')
    // });
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


// function numberOfCard(){
//
//     $(".txt-error").remove();
//     let errTexr = '<div class="txt-error">* این مورد الزامی است</div>';
//     let errorNum=false;
//
//     let input=document.getElementById('numberOfCard');
//     if(input.value.length===0){
//         $(errTexr).insertAfter(input);
//         input.classList.add('borderRed');
//         errorNum=true;
//     }else {input.classList.remove('borderRed');}
//
//
//     if(errorNum){return false;}
//
//     $('.loadingNumber').removeClass('d-none');
//
//
//     fetch(updateLimitation+'?limitation='+parseInt($('#numberOfCard').val().replace(/,/g, ""),10), {
//         method: "POST",
//         // body:jsonData,
//         headers:{
//             Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
//         }
//     }).then(async (response) =>{
//
//         await response.json().then(async (data) => {
//
//             $('.loadingNumber').addClass('d-none');
//             if(data.status==100){
//                 toastr.success('اطلاعات با موفقیت ارسال شد');
//             }else if(data.status==101){
//                 toastr.error(data.validateError[0]);
//             }
//         });
//
//     }).catch(err => {
//         $('.loadingNumber').addClass('d-none');
//         toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش کنید");
//         console.log('error to fetch categories')
//     });
// }

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