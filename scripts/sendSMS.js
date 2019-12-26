$(document).ready(function() {
  //------------------ SET LOCATION HASH -------------------
  window.location.hash = "sendSMS";

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

  //-------------------SEND MESSAGE---------------------

  $("#sendSMS").on("click", function() {
    var mobile = $("#mobile").val(),
      message = $("#message").val(),
      error = 0,
      errTexr = '<div class="txt-error">* این فیلد ضروری است</div>';

    for (var i = 1; i <=2; i++) {
      if ($(".noEmpty" + i).val() == "") {
        if (
          !$(".noEmpty" + i)
            .parent()
            .find(".txt-error").length
        ) {
          $(errTexr).insertAfter(".noEmpty" + i);
        }
        $(".noEmpty" + i).css({
          "border-color": "red",
          "box-shadow": "0px 0px 2px red"
        });
        error = 1;
      } else {
        $(".noEmpty" + i).css({
          "border-color": "lightgray",
          "box-shadow": "0px 0px 0px lightgray"
        });
      }
    }

    if (error == 1) {
      return false;
    }

      $('.sendSms').removeClass('d-none');
    $.ajax({
      url:
        sendSmsAddress +
        "/5/?username=denaAdmin&password=Dena1234!$&desNo=" +
        mobile +
        "&content=" +
        message,
      type: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },
      dataType: "json",
      contentType: "application/json",
      success: function(data) {
        $('.sendSms').addClass('d-none');
          if(data==0){
              $(".form-control").val("");
              toastr.success('پیام شما با موفقیت ارسال شد');
          }else{
              toastr.error(data)
          }

      },
      error: function(jqXHR, textStatus, errorThrown) {
          $('.sendSms').addClass('d-none');
        if (jqXHR.status == 401) {
          window.location.href = "login.html";
        }
        toastr.error("خطا در ارسال اطلاعات");
      }
    });
  });

  //------------------ REMOVE ERROR -------------------
  $("input , textarea").keyup(function() {
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

  //------------------ FORMAT NUMBER -------------------
  $("input.formatNumber").keyup(function(event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    $(this).val(function(index, value) {
      return value.replace(/\D/g, "");
    });
  });
});
