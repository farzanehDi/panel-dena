$(document).ready(function() {
  //-------------- SET LOCATION HASH ---------------
  window.location.hash = "billingID";

  //-------------- GET COOKIE ROLE ---------------
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

  var role = getCookieRole("role");

  //   if (role.length) {
  //     role = JSON.parse(role);
  //   }

  if (role === null) {
    location.href = "login.html";
    return false;
  }

  //   for (i = 0; i < role.length; i++) {
  //     if (role[i] == "uadmin") {
  //       $(".pan,.uAdmin").show();
  //     } else if (role[i] == "radmin") {
  //       $(".rAdmin").show();
  //     } else if (role[i] == "sadmin") {
  //       $(".excel,.sAdmin").show();
  //     } else if (role[i] == "oadmin") {
  //       $(".excel,.oAdmin").show();
  //     } else if (role[i] == "padmin") {
  //       $(".sms,.pAdmin").show();
  //     } else if (role[i] == "badmin") {
  //       $(".sms,.bAdmin").show();
  //     } else if (role[i] == "readmin") {
  //       $(".pan,.reAdmin").show();
  //     } else if (role[i] == "searchadmin") {
  //       $(".sms,.searchAdmin").show();
  //     } else if (role[i] == "gadmin") {
  //       $(".sms,.gAdmin").show();
  //     } else if (role[i] == "admin")
  //       $(
  //         ".rAdmin,.sAdmin,.uAdmin,.user,.oAdmin,.pAdmin,.bAdmin,.excel,.sms,.reAdmin,.pan,.searchAdmin,.gAdmin"
  //       ).show();
  //   }

  if (role == "owner")
    $(
      ".rAdmin,.sAdmin,.uAdmin,.user,.oAdmin,.pAdmin,.bAdmin,.excel,.sms,.reAdmin,.pan,.searchAdmin,.gAdmin"
    ).show();

  //-------------------------- SEARCH ------------------------------

  $("#search").click(function(eventObject) {
    var pan = $("#pan").val(),
      amount = $("#amount").val();

    if (pan.length != 16) {
      toastr.error("pan نامبر باید 16 رقم باشد");
      $("#pan").css("border-color", "red");
      $("#amount").css("border-color", "lightgray");
      return false;
    } else if (amount < 100000 || amount > 5000000) {
      toastr.error("مبلغ وارد شده نادرست می باشد");
      $("#amount").css("border-color", "red");
      $("#pan").css("border-color", "lightgray");
      return false;
    } else {
      $("#amount,#pan").css("border-color", "lightgray");
      $.ajax({
        url: createBillAddress +"/?pan=" + pan + "&amount=" + amount,
        type: "GET",
        headers: {
          Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },
        datasrc: "",
        success: OnSuccess,
        error: OnError
      });
      return false;
    } //--else
  });

  function OnSuccess(data, status) {
    if (data.status != 0) toastr.warning(data.status);
    $("#BillId").append(
      "<tr><td>" +
        data.pan +
        "</td><td>" +
        data.amount +
        "</td><td>" +
        data.billID +
        "</td><td>" +
        data.paymentID +
        "</td>></tr>"
    );
  }

  function OnError(jqXHR, textStatus, errorThrown) {
    if (jqXHR.status == 401) {
      window.location.href = "login.html";
    }
    if (jqXHR.status == 500) {
      toastr.error("خطا در برقراری ارتباط با سرور");
    }
    toastr.error("خطا در ارسال اطلاعات");
  }

  //------------------- RESET INPUT -----------------
  $("input").keyup(function() {
    $(this).css({
      "border-color": "#ccc",
      "box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)"
    });
  });

  //----------------- REMOVE LOADING -------------------
  setTimeout(function() {
    $("body")
      .find("#loading-main")
      .remove();
  }, 0);

  //----------------- FORMAT NUMBER -------------------
  $("input.formatNumber").keyup(function(event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    $(this).val(function(index, value) {
      return value.replace(/\D/g, "");
    });
  });
});
