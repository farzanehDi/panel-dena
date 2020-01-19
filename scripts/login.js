$(document).ready(function() {
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

  //------------------ GET COOKIE ROLE -------------------
  function getCookieRole(role) {
    var name = role + "=";
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

  var token = getCookie("AuthorizationToken");
  var role = getCookieRole("role");

  if (token && role) {
    window.location.href = "index.html";
  }
  //---------------------- LOGIN -------------------------
  $("#login").click(function(event) {
    var error = 0;
    var errTexr = '<div class="txt-error">* این فیلد ضروری است</div>';

    for (i = 1; i <= 2; i++) {
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
    else {

      $('#login img').removeClass('d-none');

      var jsonData = JSON.stringify({
        email: $("#username").val(),
        password: $("#inputPassword").val()
      });
      $.ajax({
        url: login,
        type: "POST",
        dataType: "json",
        data: jsonData,
        contentType: "application/json; charset=utf-8",
        datasrc: "",
        success: OnSuccess,
        error: OnError
      });
      return false;
    }
  });

  function OnSuccess(data) {


    $('#login img').addClass('d-none');
    if(data.status==100){
      document.cookie = "role=" + data.role + ";path=/";
      document.cookie = "AuthorizationToken=" + data["token"] + ";path=/";
      window.location.href = "index.html";
    }else if(data.status==111){
      toastr.error('پسورد وارد شده نامعتبر است')
    }else if(data.status==103){
      toastr.error('کاربر مورد نظر یافت نشد')
    }else if(data.status==102){
      toastr.error('اجازه دسترسی مسدود شده است')
    }else {
      toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش نمایید");
    }

  }
  function OnError(jqXHR, textStatus, errorThrown) {

    $('#login img').addClass('d-none');

    toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش نمایید");

  }



});
