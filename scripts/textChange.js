$(document).ready(function() {
  //------------------ SET LOCATION HASH -------------------
  window.location.hash = "textChange";

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

  var errTexr = '<div class="txt-error">* این فیلد ضروری است</div>';
  //------------------- GET TABLIGHAT -------------------
  $.ajax({
    url: appUserAddress + "/4",
    type: "GET",
    headers: {
      Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
    },
    dataType: "json",
    contentType: "application/json",
    success: function(data) {
        $(".load-content").hide();
      $("#tabligh").html(data.title);
    },
    error: function(jqXHR, textStatus, errorThrown) {
        $(".load-content").hide();
      if (jqXHR.status == 401) {
        window.location.href = "login.html";
      }
      toastr.error("خطا در دریافت اطلاعات");
    }
  });

  //----------------- CHANGE TEXT -----------------------

  $("#changeTxt").click(function(eventObject) {
    var title = $("#title").val();
    var message = $("#message").val();
    var link = $("#link").val();

    if (title == "") {
      $("#title").css({
        "border-color": "red",
        "box-shadow": "0px 0px 2px red"
      });

      if (
        !$("#title")
          .parent()
          .find(".txt-error").length
      ) {
        $(errTexr).insertAfter("#title");
      }
      return false;
    } else {
      $("#title").css({
        "border-color": "black"
      });
    }

    var jsonData = JSON.stringify({
      title: title,
      message: message,
      link: link
    });

    $.ajax({
      url: appUserAddress +"/2",
      type: "DELETE",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },
      data: jsonData,
      dataType: "json",
      contentType: "application/json",
      success: function(data) {
        toastr.success("تغییر متن با موفقیت انجام شد");
        window.setTimeout(function() {
          location.reload();
        }, 1000);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 401) {
          window.location.href = "login.html";
        }
        toastr.error("خطا در ارسال اطلاعات");
      }
    });
  });
  //------------------ REMOVE ERROR -------------------

  $("input").keyup(function() {
    $(this).css({
      "border-color": "#ccc",
      "box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)"
    });

    $(this)
      .parent()
      .find(".txt-error")
      .remove();
  });

  //----------------- REMOVE LOADING -------------------
  setTimeout(function() {
    $("body")
      .find("#loading-main")
      .remove();
  }, 0);
});
