$(document).ready(function(e) {
    //------------------ SET LOCATION HASH -------------------
    window.location.hash = "serviceStatus";
    //-------------get status------------
    fetch(getServiceStatus, {
        method: "GET",
        headers:{
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        }
    }).then(async (response) =>{
        $(".load-content").hide();
        await response.json().then(async (data) => {

            // console.log(data);
            $('#sabteAhval').text(data.sabteAhval=='True'?"فعال":"غیرفعال");
            $('#shahkar').text(data.shahkar=='True'?"فعال":"غیرفعال");
            $('#charge').text(data.charge=='True'?"فعال":"غیرفعال");
            $('#pay').text(data.pay=='True'?"فعال":"غیرفعال");
            $('#activation').text(data.activation=='True'?"فعال":"غیرفعال");
            $('#post').text(data.post=='True'?"فعال":"غیرفعال");

        });

    }).catch(err => {
        $(".load-content").hide();
        console.log('error to get statuses')
    });

    //----------------- REMOVE LOADING -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);
});

