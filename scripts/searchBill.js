$(document).ready(function() {
  //------------------ SET LOCATIN HASH -------------------
  window.location.hash = "searchBill";

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

  //--------DATEPICKER-------
  $("#Date1 , #Date2").persianDatepicker({
    altFormat: "YYYY MM DD HH:mm:ss",
    observer: true,
    format: "YYYY-MM-DD"
  });
  $("#Date1 , #Date2").val("");

  //------------------- SEARCH BILL ---------------------

  var fromDateVal = moment()
    .subtract(7, "d")
    .format("jYYYY-jMM-jDD");
  $("#Date1").val(fromDateVal);

  var toDateVal = moment().format("jYYYY-jMM-jDD");
  $("#Date2").val(toDateVal);

  var date1 = $("#Date1").val(),
    date2 = $("#Date2").val(),
    pan = $("#pan").val(),
    phone = $("#phone").val(),
    status = $("#status").val(),
    type = $("#type").val();

  $("#search").click(function() {
    date1 = $("#Date1").val();
    date2 = $("#Date2").val();
    pan = $("#pan").val();
    phone = $("#phone").val();
    status = $("#status").val();
    type = $("#type").val();

    $("#searchBill")
      .DataTable()
      .clear();
    $("#searchBill")
      .DataTable()
      .destroy();
    getBill();
  });

  var getBill = function() {
    $("#searchBill").DataTable({
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
      order: [[3, "dsc"]],
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
                title:'لیست قبوض',
                exportOptions: {
                    columns: [0,1, 2, 3, 4, 5]
                }
            }*/
        {
          extend: "csv",
          text:
            '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Csv',
          title: "لیست قبوض",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5]
          }
        },
        {
          extend: "excelHtml5",
          text:
            '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Excel',
          title: "لیست قبوض",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5]
          }
        }
      ],

      ajax: {
        url:
          searchBillAddress +"/?pan=" +
          pan +
          "&phone=" +
          phone +
          "&dateFrom=" +
          date1 +
          "&dateTo=" +
          date2 +
          "&status=" +
          status +
          "&type=" +
          type,
        dataSrc: "",
        // headers: {
        //   Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        // },
        error: function(err) {
          if (err.status == 401) {
            window.location.href = "login.html";
          }
          if (err.status == 500) {
            toastr.error("خطا در برقراری ارتباط با سرور");
          }
        }
      },

      columns: [
        { data: "phone" },
        //{"data": "pan"}
        {
          data: null,
          render: function(data) {
            return (
              '<p dir="ltr">' +
              data.pan.substring(0, 4) +
              " " +
              data.pan.substring(4, 8) +
              " " +
              data.pan.substring(8, 12) +
              " " +
              data.pan.substring(12, 16) +
              "</p>"
            );
          }
        },
        { data: "amount" },
        { data: "date" },
        { data: "status" },
        { data: "type" }
      ]
    });
  };
  getBill();

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
