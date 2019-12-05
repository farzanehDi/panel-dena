$(document).ready(function() {
  //------------------ SET LOCATION HASH -------------------
  window.location.hash = "userManagement";

  $(".load-content").show();

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

  //------------------------ BLOCK CARD -----------------------

  $("#phoneBlock").click(function(eventObject) {
    var errTexr = '<div class="txt-error">* این فیلد ضروری است</div>',
      phoneNumber = $("#phoneNumber").val();

    if (phoneNumber == "") {
      if (
        !$("#phoneNumber")
          .parent()
          .find(".txt-error").length
      ) {
        $(errTexr).insertAfter("#phoneNumber");
      }

      $("#phoneNumber").css({
        "border-color": "red"
      });
      return false;
    } else {
      $("#phoneNumber").css({
        "border-color": "black"
      });
    }

    $.ajax({
      url: appManagerAddress + "/1/?phoneNumber=" + phoneNumber,
      type: "PUT",

      dataType: "json",
      contentType: "application/json",
      datasrc: "",
      // headers: {
      //   Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      // },

      success: function(data) {
        toastr.success("بلاک کارت با موفقیت انجام شد");

        $(".form-control").val("");
        $("#blockPhoneList")
          .DataTable()
          .clear();
        $("#blockPhoneList")
          .DataTable()
          .destroy();

        drawTableUser();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 401) {
          window.location.href = "login.html";
        }
        toastr.error("خطا در ارسال اطلاعات");
      }
    });
  });
  //------------------ LOAD DATATABLE ------------------
  var drawTableUser = function() {
    $("#blockPhoneList").dataTable({
      processing: true,
      filter: true,
      dom: "Bfrtip",
      order: [[1, "dsc"]],
      language: {
        url: "./plugin/Persian.json",
        buttons: {
          pageLength: {
            _: "نمایش %d سطر",
            "-1": "نمایش همه"
          }
        }
      },
      scrollX: true,
      lengthMenu: [
        [10, 25, 50, -1],
        ["10 سطر", "25 سطر", "50 سطر", "نمایش همه"]
      ],
      buttons: [
        "pageLength",

        /*{
                extend: 'pdf',
                title:'لیست شماره های بلاک شده',
                exportOptions: {
                    columns: [0,1]
                }
            }*/
        {
          extend: "csv",
          text:
            '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Csv',
          title: "لیست شماره های بلاک شده",
          exportOptions: {
            columns: [0, 1]
          }
        },
        {
          extend: "excelHtml5",
          text:
            '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Excel',
          title: "لیست شماره های بلاک شده",
          exportOptions: {
            columns: [0, 1]
          }
        }
      ],
      aoColumnDefs: [{ bSortable: false, aTargets: [2] }],
      ajax: {
        url: appManagerAddress + "/6",
        contentType: "application/json; charset=utf-8",
        // headers: {
        //   Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        // },
        dataSrc: function(res) {
          $(".load-content").hide();
          return res.data;
        },
        error: function(err) {
          $(".load-content").hide();
          console.log(err);
          if (err.status == 401) {
            window.location.href = "login.html";
          }
          if (err.status == 500) {
            toastr.error("خطا در برقراری ارتباط با سرور");
          }
        }
      },
      columns: [
        { data: "phoneNo" },
        { data: "date" },
        {
          data: null,
          render: function(data) {
            return (
              '<br/><button class="unblock btn btn-primary" data-phone="' +
              data.phoneNo +
              '" >خروج از بلاک</button>'
            );
          }
        }
      ]
    });
  };
  drawTableUser();

  //---------------------- UNBLOCK CARD -------------------

  $("#blockPhoneList").on("click", ".unblock", function() {
    var phone = $(this).attr("data-phone");
    $.ajax({
      url: appManagerAddress + "/2/?phoneNumber=" + phone,
      type: "PUT",
      dataType: "json",
      contentType: "application/json",
      // headers: {
      //   Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      // },
      success: function(data) {
        toastr.success("عملیات با موفقیت انجام شد");

        $("#blockPhoneList")
          .DataTable()
          .clear();
        $("#blockPhoneList")
          .DataTable()
          .destroy();
        $(".load-content").hide();
        drawTableUser();
      },
      error: function(err) {
        if (err.status == 401) {
          window.location.href = "login.html";
        }
        toastr.error("خطا در ارسال اطلاعات");
      }
    });
  });

  //---------------------- REMOVE ERROR -----------------
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
