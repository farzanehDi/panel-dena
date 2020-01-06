$(document).ready(function() {
    //------------------ SET LOCATION HASH -------------------
    window.location.hash = "cardProductionInformation";
    $(".load-content").hide();
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

    //----------DATEPICKER---------
    $("#Date1 , #Date2 , #dateStart , #dateEnd").persianDatepicker({
        altFormat: "YYYY MM DD HH:mm:ss",
        observer: true,
        format: "YYYY-MM-DD"
    });

    //--------------------------card production info---------------------------

    $("#search").click(function() {

        $(".load-content").show();
        let date1 = $("#Date1").val();
        let date2 = $("#Date2").val();

        fetch(
        `${adminActionAddress}??orderid=0&orderStatus=&dateStart=${date1}&timeStart=00:00:00&dateEnd=${date2}&timeEnd=23:59:59&nationalcode=&pan=6221&RRN=&cartType=`, {
            method: "GET",
            contentType:'application/json',
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },

        }).then(async (response) =>{
            // await response.json().then(async (data) => {
                $(".load-content").hide();
                // console.log(data);
                window.location.href=`${adminActionAddress}??orderid=0&orderStatus=&dateStart=${date1}&timeStart=00:00:00&dateEnd=${date2}&timeEnd=23:59:59&nationalcode=&pan=6221&RRN=&cartType=`;
            // });
        }).catch(async (err) => {
            $(".load-content").hide();
                toastr.error('خطا در دریافت اطلاعات')
            }

        );

    });


//    -------------post section---------------
    $("#searchPostalInfo").click(function() {

        $(".load-content").show();

        fetch(
            `${postalInfo}&orderStatus=&nationalcode=&RRN=&dateStart=${$("#dateStart").val()}&dateEnd=${$("#dateEnd").val()}`, {
                method: "GET",
                contentType:'application/json',
                headers: {
                    Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
                },

            }).then(async (response) =>{

            $(".load-content").hide();
            window.location.href=`${postalInfo}&orderStatus=&nationalcode=&RRN=&dateStart=${$("#dateStart").val()}&dateEnd=${$("#dateEnd").val()}`;

        }).catch(async (err) => {
                $(".load-content").hide();
                toastr.error('خطا در دریافت اطلاعات')
            }

        );

    });

    //----------------- REMOVE LOADING -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);
//    --------
});
