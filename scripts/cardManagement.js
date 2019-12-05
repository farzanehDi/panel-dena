$(document).ready(function() {
  //-------------- SET LOCATION HASH ---------------
  window.location.hash = "cardManagement";

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
  //---------------------BLOCK CARD-----------------------

  $("#cardBlock").click(function(eventObject) {
    var errTexr = '<div class="txt-error">* این فیلد ضروری است</div>',
      PANumber = $("#PANumber").val();

    if (PANumber == "") {
      if (
        !$("#PANumber")
          .parent()
          .find(".txt-error").length
      ) {
        $(errTexr).insertAfter("#PANumber");
      }

      $("#PANumber").css({
        "border-color": "red"
      });
      return false;
    } else {
      $("#PANumber").css({
        "border-color": "black"
      });
    }
    $.ajax({
      url: checkPanAddress + "/3/?kadoonaCard=" + PANumber,
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
        $("#blockCardList")
          .DataTable()
          .clear();
        $("#blockCardList")
          .DataTable()
          .destroy();
        drawTableCard();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 401) {
          window.location.href = "login.html";
        }
        toastr.error("خطا در ارسال اطلاعات");
      }
    });
  });
  //--------------------- LOAD DATATABLE ------------------
  var drawTableCard = function() {
    $("#blockCardList").dataTable({
      searching: true,
      processing: true,
      filter: false,
      dom: "Bfrtip",
      order: [[2, "dsc"]],
      scrollX: true,
      lengthMenu: [
        [10, 25, 50, -1],
        ["10 سطر", "25 سطر", "50 سطر", "نمایش همه"]
      ],
      buttons: [
        "pageLength",
        ,
        /*{
                extend: 'pdf',
                title:'لیست کارت های بلاک شده',
                exportOptions: {
                    columns: [0,1,2]
                }
            }*/
        {
          extend: "csv",
          title: "لیست کارت های بلاک شده",
          text:
            '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Csv',

          exportOptions: {
            columns: [0, 1, 2]
          }
        },
        {
          extend: "excelHtml5",
          title: "لیست کارت های بلاک شده",
          text:
            '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Excel',
          exportOptions: {
            columns: [0, 1, 2]
          }
        }
      ],
      language: {
        url: "./plugin/Persian.json",
        buttons: {
          pageLength: {
            _: "نمایش %d سطر",
            "-1": "نمایش همه"
          }
        }
      },
      aoColumnDefs: [{ bSortable: false, aTargets: [3] }],
      ajax: {
        url: checkPanAddress + "/?user=dena",
        contentType: "application/json; charset=utf-8",
        // headers: {
        //   Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        // },

        dataSrc: function(res) {
          $(".load-content").hide();
          return res;
        },
        error: function(err) {
          $(".load-content").hide();
          console.log(err);
          if (err.status == 500) {
            toastr.error("خطا در برقراری ارتباط با سرور");
          }
          if (err.status == 401) {
            window.location.href = "login.html";
          }
        }
      },
      columns: [
        { data: "pan" },
        { data: "user" },
        { data: "dateTime" },
        {
          data: null,
          render: function(data) {
            return (
              '<br/><button class="unblockCard btn btn-primary" data-pan="' +
              data.pan +
              '" >خروج از بلاک</button>'
            );
          }
        }
      ]
    });
  };
  drawTableCard();

  //-------------------------- UNBLOCK CARD -------------------

  $("#blockCardList").on("click", ".unblockCard", function() {
    var kadoonaCard = $(this).attr("data-pan");
    $.ajax({
      url: checkPanAddress + "/4/?kadoonaCard=" + kadoonaCard,
      type: "PUT",
      // headers: {
      //   Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      // },
      dataType: "json",
      contentType: "application/json",
      //headers: {
      //  Authorization:localStorage.getItem('AuthorizationToken')
      //},
      success: function(data) {
        toastr.success("عملیات با موفقیت انجام شد");

        $("#blockCardList")
          .DataTable()
          .clear();
        $("#blockCardList")
          .DataTable()
          .destroy();

        drawTableCard();
      },
      error: function(err) {
        if (err.status == 401) {
          window.location.href = "login.html";
        }
        toastr.error("خطا در ارسال اطلاعات");
      }
    });
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
});
