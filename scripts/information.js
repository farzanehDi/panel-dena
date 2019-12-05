$(document).ready(function() {
  //-------------- SET LOCATION HASH ---------------
  window.location.hash = "information";

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

  //-----DATEPICKER-----
  $("#dateFrom , #dateTo").persianDatepicker({
    altFormat: "YYYY MM DD HH:mm:ss",
    observer: true,
    format: "YYYY-MM-DD"
  });
  $("#dateFrom , #dateTo").val("");

  //---------------- GET COOKIE ROLE -----------------

  // function getCookieRole(role) {
  //   var name = role + "=";
  //   var decodedCookie = decodeURIComponent(document.cookie);
  //   var ca = decodedCookie.split(";");
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

  // var role = getCookieRole("role");

  // if (role.length) {
  // role = JSON.parse(role);
  // }

  // if (role === null) {
  //   location.href = "login.html";
  //   return false;
  // }
  //
  // switch (role) {
  //   case "owner":
  //     $(
  //       ".rAdmin,.sAdmin,.uAdmin,.user,.oAdmin,.pAdmin,.bAdmin,.excel,.sms,.reAdmin,.pan,.searchAdmin,.gAdmin"
  //     ).show();
  //     break;
  //   default:
  //     return;
  // }

  // for (i = 0; i < role.length; i++) {
  //     if (role[i] == "uadmin") {
  //         $(".pan,.uAdmin").show();
  //     } else if (role[i] == "radmin") {
  //         $(".rAdmin").show();
  //     } else if (role[i] == "sadmin") {
  //         $(".excel,.sAdmin").show();
  //     } else if (role[i] == "oadmin") {
  //         $(".excel,.oAdmin").show();
  //     } else if (role[i] == "padmin") {
  //         $(".sms,.pAdmin").show();
  //     } else if (role[i] == "badmin") {
  //         $(".sms,.bAdmin").show();
  //     } else if (role[i] == "readmin") {
  //         $(".pan,.reAdmin").show();
  //     } else if (role[i] == "searchadmin") {
  //         $(".sms,.searchAdmin").show();
  //     } else if (role[i] == "gadmin") {
  //         $(".sms,.gAdmin").show();
  //     } else if (role[i] == "admin")
  //         $(".rAdmin,.sAdmin,.uAdmin,.user,.oAdmin,.pAdmin,.bAdmin,.excel,.sms,.reAdmin,.pan,.searchAdmin,.gAdmin").show();
  // }
  //--------------------------------------------------------

  var fromDateVal = moment()
    .subtract(7, "d")
    .format("jYYYY-jMM-jDD");

  $("#dateFrom").val(fromDateVal);
  var toDateVal = moment().format("jYYYY-jMM-jDD");
  $("#dateTo").val(toDateVal);

  var dateFrom = $("#dateFrom").val(),
    dateTo = $("#dateTo").val(),
    phone = $("#phone").val(),
    status = $("#status").val(),
    type = $("#type").val();

  $("#search").click(function(eventObject) {
    dateFrom = $("#dateFrom").val();
    dateTo = $("#dateTo").val();
    phone = $("#phone").val();
    status = $("#status").val();
    type = $("#type").val();

    if (phone != "") {
      phone = 98 + phone;
    }

    $("#reportPan").DataTable().clear();
    $("#reportPan").DataTable().destroy();
    getInformation();
  });

  var getInformation = function() {
    $("#reportPan").DataTable({
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
          type: "pstring",
          targets: 0,
          searchable: false,
          orderable: false
        }
      ],
      order: [[1, "asc"]],
      processing: true,
      filter: false,
      targets: 0,
      scrollX: true,
      dom: "Bfrtip",
      //cache:true,
      lengthMenu: [
        [10, 25, 50, -1],
        ["10 سطر", "25 سطر", "50 سطر", "نمایش همه"]
      ],
      buttons: [
        "pageLength",
        ,
        /*{
                extend: 'pdf',
                title:'گزارش پنل پیامکی',
                exportOptions: {
                    columns: [0,1,2,3,4,5]
                }
            }*/
        {
          extend: "csv",
          text:
            '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Csv',
          title: "گزارش پنل پیامکی",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5]
          }
        },
        {
          extend: "excelHtml5",
          text:
            '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Excel',
          title: "گزارش پنل پیامکی",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5]
          }
        }
      ],
      ajax: {
        url:
          getReportAddress +
          "/?phone=" +
          phone +
          "&dateFrom=" +
          dateFrom +
          "&dateTo=" +
          dateTo +
          "&status=" +
          status +
          "&type=" +
          type,
        dataSrc: "",
        contentType: "application/json; charset=utf-8",
        headers: {
          Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },
        dataSrc: function(res) {
          $(".load-content").hide();
          return res;
        },
        error: function(err) {
          $(".load-content").hide();
          if (err.status == 401) {
            window.location.href = "login.html";
          }
          if (err.status == 500) {
            toastr.error("خطا در برقراری ارتباط با سرور");
          }
        }
        //' cache':true
      },
      columns: [
        { data: "amount" },
        { data: "count" },
        { data: "dateFrom" },
        { data: "dateTo" },
        { data: "status" },
        { data: "type" }
      ]
    });
  };

  getInformation();

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
