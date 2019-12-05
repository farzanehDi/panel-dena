$(document).ready(function() {
  //------------------ SET LOCATION HASH -------------------
  window.location.hash = "organizeOrderRegistration";

  var errTexr = '<div class="txt-error">* این فیلد ضروری است</div>';

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

  $("#addCardBtn").click(function() {
    var markup = `
    <div class="row orderItem">
        <div class="col-sm-4">
            <div class="row">
                <div class="col-sm-2">
                    <button class="btn removeCardBtn hoverBtn" type="button">
                        <img src="images/negative.png" alt="add" class="minus-img">
                    </button>
                </div>

                <div class="col-sm-10">
                    <div class="form-group">
                        <span class="input-icon icon-right">
                            <input type="text" class="form-control noEmpty1 orgName"
                                placeholder="نام سازمان" tabindex="1" autocomplete="off">
                            <i class="fa fa-sitemap circular"></i>
                        </span>
                    </div>
                </div>
              </div>

            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <span class="input-icon icon-right">
                        <input type="text" class="form-control noEmpty2 formatNumber count"
                            placeholder="تعداد" tabindex="2">
                        <i class="fa fa-list-ol circular"></i>
                    </span>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="form-group">
                    <span class="input-icon icon-right">
                        <input type="text" class="form-control noEmpty3 Pcode" placeholder="کد محصول"
                            tabindex="4" autocomplete="off">
                        <i class="fa fa-barcode circular"></i>
                    </span>
                </div>
            </div>
      </div>
    `;

    $("#all_orders").append(markup);
  });

  $("#all_orders").click(function(e) {
    // Check if removeCardBtn is clicked then call function removeCard
    if (e.target.matches(".removeCardBtn, .removeCardBtn *")) {
      $(e.target)
        .closest("div.orderItem")
        .remove();
    }
  });
  //------------------ REGISTER -------------------
  $("#register").click(function(eventObject) {
    var error = 0;
    for (var i = 1; i <= 3; i++) {
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
    } else {
      var ordersList = [];

      $(".orgName").each(function(index) {
        var order = {};
        order.OrgName = $(this).val();
        order.count = $(".count")
          .eq(index)
          .val();
        order.Pcode = $(".Pcode")
          .eq(index)
          .val();

        ordersList.push(order);
      });

      $.ajax({
        url: adminActionAddress + "/101",
        type: "PUT",
        dataType: "json",
        data: {
          token: "0",
          msg: "salam",
          list: ordersList
        },
        contentType: "application/json; charset=utf-8",
        //datasrc:'',
        headers: {
          Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },
        success: function(data) {
          console.log(data);
          $("#order").text(data.msg);
          if (data.code == 0) {
            toastr.success("ثبت سفارش با موفقیت انجام شد");

            thisC.remove();
          } else if (data.code == -3) {
            toastr.error("شما دسترسی ادمین ندارید");
          } else if (data.code == -1) {
            toastr.error("تنها ادمین مجاز به تعریف کاربر می باشد");
          }
        },
        error: function(err) {
          console.log(err);
          if (err.status == 401) {
            window.location.href = "login.html";
          }
          var message = "خطا در ارسال اطلاعات";
          toastr.error(message);
        }
      });
    }
  });

  //------------- REMOVE ERROR --------------
  $("#order").on("keyup", "input", function() {
    $(this).css({
      "border-color": "#ccc",
      "box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)"
    });
    $(this)
      .parent()
      .find(".txt-error")
      .remove();
  });

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

  //------------------ FORMAT NUMBER -------------------
  $("input.formatNumber").keyup(function(event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    $(this).val(function(index, value) {
      return value.replace(/\D/g, "");
    });
  });

  //----------------- REMOVE LOADING -------------------
  setTimeout(function() {
    $("body")
      .find("#loading-main")
      .remove();
  }, 0);
});
