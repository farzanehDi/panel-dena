var dateFrom = "",
  dateTo = "",
  type = "",
  phone = "",
  unread = "0";

var url =
  errorMessageAddress +
  "/?unread=" +
  unread +
  "&phone=" +
  phone +
  "&dateFrom=" +
  dateFrom +
  "&dateTo=" +
  dateTo +
  "&type=" +
  type;
var drawTable;
$(document).ready(function() {
  //----------------- SET LOCATION HASH -------------------
  window.location.hash = "customerGuide";

  $("#Date1,#Date2").datepicker({
    format: "yyyy-mm-dd"
    //startDate: '-3d'
  });

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

  /* $("#Date1 , #Date2").persianDatepicker({

     altFormat: "YYYY MM DD HH:mm:ss",
     observer: true,
     format: 'YYYY/MM/DD'

    });*/
  //$("#Date1 , #Date2").val("");

  //------------------------LOAD DATATABLE----------------

  setInterval(function() {
    $("#customerGuide")
      .DataTable()
      .clear();
    $("#customerGuide")
      .DataTable()
      .destroy();
    drawTable();
  }, 180000);

  drawTable = function() {
    $("#customerGuide").dataTable({
      language: {
        url: "./plugin/Persian.json",
        buttons: {
          pageLength: {
            _: "نمایش %d سطر",
            "-1": "نمایش همه"
          }
        }
      },
      columnDefs: [
        {
          searchable: false,
          orderable: false,
          targets: 0
        }
      ],
      order: [[1, "dsc"]],
      processing: true,
      filter: false,
      targets: 0,
      scrollX: true,

      dom: "Bfrtip",

      lengthMenu: [
        [10, 25, 50, -1],
        ["10 سطر", "25 سطر", "50 سطر", "نمایش همه"]
      ],
      buttons: [
        "pageLength",
        ,
        /*{
                extend: 'pdf',
                title:'لیست راهنمای مشتری',
                exportOptions: {}
            }*/
        {
          extend: "csv",
          text:
            '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Csv',
          title: "لیست راهنمای مشتری",
          exportOptions: {}
        },
        {
          title: "لیست راهنمای مشتری",
          extend: "excelHtml5",
          text:
            '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Excel'
        }
      ],
      ajax: {
        url: url,
        headers: {
          Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },
        dataSrc: "",
        error: function(err) {
          if (err.status == 401) {
            window.location.href = "login.html";
          }
          if (err.status == 500) {
            toastr.error("خطا در برقراری ارتباط با سرور");
          }
        }
      },

      columns: [{ data: "phone" }, { data: "date" }, { data: "Message" }]
    });
  };
  drawTable();
  //--------------------- DELETE MESSAGE --------------------
  $("#deleteMessage").click(function() {
    $.ajax({
      url: errorMessageAddress + "/?",
      type: "POST",
      // headers: {
      //   Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      // },
      //dataType: "json",
      //contentType: "application/json; charset=utf-8",
      datasrc: "",

      success: function(data) {
        toastr.success("عملیات حذف با موفقیت انجام شد");
        location.reload();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 401) {
          window.location.href = "login.html";
        }
        toastr.error("خطا در حذف اطلاعات");
      }
    });
  });

  //---------------------ALL MESSAGE --------------

  $("#allMessage").click(function() {
    unread = "1";
    url = errorMessageAddress + "/?unread=" + unread;

    $("#customerGuide")
      .DataTable()
      .clear();
    $("#customerGuide")
      .DataTable()
      .destroy();
    drawTable();
  });

  //---------------------SEARCH MESSAGE --------------

  $("#searchMessage").click(function() {
    unread = "1";
    dateFrom = $("#Date1").val();
    dateTo = $("#Date2").val();
    type = $("#type").val();
    phone = $("#mobile").val();
    url =
      errorMessageAddress +
      "/?unread=" +
      unread +
      "&phone=" +
      phone +
      "&dateFrom=" +
      dateFrom +
      "&dateTo=" +
      dateTo +
      "&type=" +
      type;

    $("#customerGuide")
      .DataTable()
      .clear();
    $("#customerGuide")
      .DataTable()
      .destroy();
    drawTable();
  });

  //----------------------NEW MESSAGE--------------
  $("#newMessage").click(function() {
    unread = "0";
    dateFrom = $("#Date1").val();
    dateTo = $("#Date2").val();
    type = $("#type").val();
    phone = $("#mobile").val();
    url =
      errorMessageAddress +
      "/?unread=" +
      unread +
      "&phone=" +
      phone +
      "&dateFrom=" +
      dateFrom +
      "&dateTo=" +
      dateTo +
      "&type=" +
      type;
    $("#customerGuide")
      .DataTable()
      .clear();
    $("#customerGuide")
      .DataTable()
      .destroy();

    drawTable();
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
