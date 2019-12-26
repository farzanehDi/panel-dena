$(document).ready(function(e) {
    //------------------ SET LOCATION HASH -------------------
    window.location.hash = "promotionalText";
    $(".load-content").hide();
    //----------------- REMOVE LOADING -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);
});



function sendPromotionalTxt(){

    $(".txt-error").remove();
    let errTexr = '<div class="txt-error">* این مورد الزامی است</div>';
    let errorNum=false;

    let input=document.getElementById('promotionalTxt');
    if(input.value.length===0){
        $(errTexr).insertAfter(input);
        input.classList.add('borderRed');
        errorNum=true;
    }else {input.classList.remove('borderRed');}


    if(errorNum){return false;}

    $('.promotionalTxt').removeClass('d-none');


    fetch(promotionalTxt+$('#promotionalTxt').val(), {
        method: "GET",
        headers:{
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        }
    }).then(async (response) =>{

        await response.json().then(async (data) => {
            console.log(data);
            $('.promotionalTxt').addClass('d-none');
            if(data==0){
                $('#promotionalTxt').val('');
                toastr.success('پیام شما با موفقیت ارسال شد');
            }else{
                toastr.error(data)
            }
        });

    }).catch(err => {
        $('.promotionalTxt').addClass('d-none');
        toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش کنید");
        console.log('error to post promotionalTxt')
    });
}

