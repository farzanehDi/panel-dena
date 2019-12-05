var url = appManagerAddress + "/2";
$(document).ready(function() {
  //---------------- SET LOCATION HASH -----------------
  window.location.hash = "appUserList";

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

  $(".load-content").show();

  $("#user").change(function() {
    if ($("#user").val() == "blocked") {
      url = appManagerAddress + "/4";
      $("#appUserList")
        .DataTable()
        .clear();
      $("#appUserList")
        .DataTable()
        .destroy();
      drawTable();
    } else {
      url = appManagerAddress + "/2";
      $("#appUserList")
        .DataTable()
        .clear();
      $("#appUserList")
        .DataTable()
        .destroy();
      drawTable();
    }
  });

  //---------------------- LOAD DATATABLE --------------
  var drawTable = function() {
    $("#appUserList").dataTable({
      processing: true,
      filter: true,
      dom: "Bfrtip",
      scrollX: true,
      language: {
        url: "./plugin/Persian.json",
        buttons: {
          pageLength: {
            _: "نمایش %d سطر",
            "-1": "نمایش همه"
          }
        }
      },
      lengthMenu: [
        [10, 25, 50, -1],
        ["10 سطر", "25 سطر", "50 سطر", "نمایش همه"]
      ],
      buttons: [
        "pageLength",
        ,
        /*{
                extend: 'pdf',
                title:'لیست کاربران APP',
                exportOptions: {
                    columns: [0,1,2,3,4,5,6]
                }
            }*/
        {
          extend: "csv",
          text:
            '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Csv',
          title: "لیست کاربران APP",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6]
          }
        },
        {
          extend: "excelHtml5",
          text:
            '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Excel',
          title: "لیست کاربران APP",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6]
          }
        }
      ],
      aoColumnDefs: [{ bSortable: false, aTargets: [7, 8] }],
      ajax: {
        url: url,
        // headers: {
        //   Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        // },
        contentType: "application/json; charset=utf-8",
        dataSrc: function(res) {
          $(".load-content").hide();
          return res.data;
        },
        error: function(err) {
          if (err.status == 401) {
            window.location.href = "login.html";
          }
          $(".load-content").hide();
          console.log(err);
        }
      },
      columns: [
        { data: "phonenum" },
        { data: "name" },
        {
          data: null,
          render: function(data) {
            if (data.sex == "0") {
              return "<p>زن</p>";
            } else if (data.sex == "1") {
              return "<p>مرد</p>";
            } else {
              return "";
            }
          }
        },
        { data: "email" },
        { data: "birthday" },
        {
          data: null,
          render: function(data) {
            if (data.province || data.city) {
              return "<p>" + data.province + "/" + data.city + "</p>";
            } else {
              return "";
            }
          }
        },
        {
          data: null,
          render: function(data) {
            if (data.blocked == "False") return "<p>کاربر فعال</p>";
            else return "<p>بلاک شده</p>";
          }
        },
        {
          data: null,
          render: function(data) {
            return (
              '<br/><button class="block btn btn-danger bg-danger" data-phoneNumber="' +
              data.phonenum +
              '" >بلاک</button>'
            );
          }
        },
        {
          data: null,
          render: function(data) {
            return (
              '<br/><button class="unBlock btn btn-primary" data-phoneNumber="' +
              data.phonenum +
              '" >خروج از بلاک</button>'
            );
          }
        }
      ]
    });
  };
  drawTable();
  //  -------------------------- UNBLOCK USER -------------------

  $("#appUserList").on("click", ".unBlock", function() {
    var phoneNumber = $(this).attr("data-phoneNumber");

    $.ajax({
      url: appManagerAddress + "/2/?phoneNumber=" + phoneNumber,
      type: "PUT",
      // headers: {
      //   Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      // },
      dataType: "json",
      contentType: "application/json",
      success: function(data) {
        toastr.success("عملیات با موفقیت انجام شد");

        $("#appUserList")
          .DataTable()
          .clear();
        $("#appUserList")
          .DataTable()
          .destroy();

        drawTable();
      },
      error: function(err) {
        if (err.status == 401) {
          window.location.href = "login.html";
        }
        toastr.error("خطا در ارسال اطلاعات");
      }
    });
  });

  //-------------------------- BLOCK USER -------------------

  $("#appUserList").on("click", ".block", function() {
    var phoneNumber = $(this).attr("data-phoneNumber");

    $.ajax({
      url: appManagerAddress + "/1/?phoneNumber=" + phoneNumber,
      type: "PUT",
      dataType: "json",
      contentType: "application/json",
      // headers: {
      //   Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      // },
      success: function(data) {
        toastr.success("عملیات با موفقیت انجام شد");

        $("#appUserList")
          .DataTable()
          .clear();
        $("#appUserList")
          .DataTable()
          .destroy();

        drawTable();
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
});
