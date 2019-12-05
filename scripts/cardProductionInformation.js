$(document).ready(function(e) {
    //------------------ SET LOCATION HASH -------------------
    window.location.hash = "cardProductionInformation";
    $(".load-content").hide();

    //----------------- REMOVE LOADING -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);
});

//-----------------download card information---------
function downloadCardInfo(){

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
        console.log('error to download card info')
    });
}

//------------download send information--------------

function downloadSendCardInfo(){

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
        console.log('error to download send card info')
    });
}