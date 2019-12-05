$(document).ready(function () {

//------------------ SET LOCATION HASH -------------------
    window.location.hash = "systemStatus";

         //-------------- GET COOKIE TOKEN ---------------
  function getCookie(token) {
    var name = token + "=",
      decodedCookie = decodeURIComponent(document.cookie),
      ca = decodedCookie.split(";");

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

    

    $.ajax({
        url: smsPanelManagerAddress,
        type: "GET",
        headers: {
             Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
         },
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            $(".load-content").hide()
            if (data.status == 1) {
                $("#systemStatus.statusTxt").css('color', '#0b820d');
                $("#systemStatus").html("روشن");

                $("#status").prop('checked', true);
            } else {
                $("#systemStatus.statusTxt").css('color', '#e2121a');
                $("#systemStatus").html("خاموش");

                $("#status").prop('checked', false);
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(".load-content").hide();
            if (jqXHR.status == 401) {
                window.location.href = "login.html";
            }
            toastr.error("خطا در دریافت اطلاعات");
        }
    });
//----------------- SET STATUS -------------------

    $("#status").on('click', function () {
        var url,
            text,
            color,
            fColor;
        if ($(this).is(':checked')) {
            url = "https://46.209.114.153/kadona/api/SmsPanelManger/1";
            text = "روشن";
            color = "linear-gradient(to right, #d61e36 14%,#ba1631 99%)";
            fColor = "#0b820d";
            localStorage.setItem('status', "on");
        } else {
            url = "https://46.209.114.153/kadona/api/SmsPanelManger/0";
            text = "خاموش";
            color = "#666";
            fColor = "#e2121a";
            localStorage.setItem('status', "off");
        }


        $.ajax({
            url: url,
            type: "PUT",
            headers: {
                 Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                toastr.success("عملیات با موفقیت انجام شد");
                $("#systemStatus").html(text);
                $('#systemStatus').css("color", fColor);
                $(".main header").css("background", color)

            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 401) {
                    window.location.href = "login.html";
                }
                toastr.error("خطا در ارسال اطلاعات");
            }
        });

    });

//----------------- REMOVE LOADING -------------------
    setTimeout(function () {
        $('body').find('#loading-main').remove();
    }, 0);

});
