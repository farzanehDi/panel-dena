$(document).ready(function() {
  //------------------ SET LOCATION HASH -------------------
  window.location.hash = "mainPage";

  
  //-------------- GET COOKIE TOKEN ---------------
  // function getCookie(token) {
  //   var name = token + "=",
  //     decodedCookie = decodeURIComponent(document.cookie),
  //     ca = decodedCookie.split(";");
  //
  //   for (var i = 0; i < ca.length; i++) {
  //     var c = ca[i];
  //     while (c.charAt(0) == " ") {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // }

  // $(".load-content").show();
  $("#inlineDatepickerWithMinMax").persianDatepicker({
    altField: "#inlineDatepickerWithMinMaxAlt",
    altFormat: "YYYY MM DD HH:mm:ss",
    minDate: 1416983467029,
    maxDate: 1419983467029
  });

  //----------------------- PAN COUNT ------------------
  // $.ajax({
  //   type: "GET",
  //   dataType: "json",
  //   contentType: "application/json",
  //   url: panCountAddress,
  //   headers: {
  //     Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
  //   },
  //   success: function(data) {
  //     $("#nocharge").text(data.assignedPan);
  //     $("#khcharge").text(data.freePan);
  //     $(".load-content").hide();
  //   },
  //   error: function(err) {
  //     if (err.status == 401) {
  //       window.location.href = "login.html";
  //     }
  //     toastr.error("خطا در برقراری ارتباط با سرور");
  //   }
  // });
  //------------------ ON/OFF SYSTEM STATUS ---------------- http://46.209.114.153:8866/Kadona/api/SmsPanelManger
  // $.ajax({
  //   url: smsPanelManagerAddress,
  //   type: "GET",
  //   dataType: "json",
  //   contentType: "application/json",
  //   headers: {
  //     Authorization: "Bearer " + getCookie("AuthorizationToken") + "",
  //     verify: false
  //   },

    // success: function(data) {
    //   if (data.status == 1) {
    //     localStorage.setItem("status", "on");
    //   } else {
    //     localStorage.setItem("status", "off");
    //   }
    // },
    // error: function(jqXHR, textStatus, errorThrown) {
    //   if (jqXHR.status == 401) {
    //     window.location.href = "login.html";
    //   }
    //
    //   if (jqXHR.statusText == "error" && status == 0) {
        // console.log(jqXHR.statusText, jqXHR.status);
        // window.location.href = smsPanelManagerAddress;
        // var win = window.open(smsPanelManagerAddress + "/", "_blank");
        // if (win) {
          //Browser has allowed it to be opened
        //   win.focus();
        // } else {
          //Browser has blocked it
        //   alert("Please allow popups for this website");
        // }
  //     } else {
  //       toastr.error("خطا در دریافت اطلاعات سیستم پنل پیامکی");
  //     }
  //   }
  // });
  //----------------- REMOVE LOADING -------------------
  setTimeout(function() {
    $("body")
      .find("#loading-main")
      .remove();
  }, 0);
});
