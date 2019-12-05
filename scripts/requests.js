// var setUpIp = (function() {
//   var setUpIp = null;
//   $.ajax({
//     async: false,
//     global: false,
//     // 'url': 'js/setupIp.json',
//     url: "./setupIp.json",
//     dataType: "json",
//     success: function(data) {
//       setUpIp = data;
//     }
//   });
//   return setUpIp;
// })();

$(document).ready(function() {
  //-------------- SET LOCATION HASH ---------------
  window.location.hash = "requests";

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

  //---------------------------------LOAD DATATABLE-------------------
  var drawTable = function() {
    $("#requestsInformation").dataTable({
      buttons: [
        "pageLength",

      ],
      lengthMenu: [
        [10, 25, 50, -1],
        ["10 سطر", "25 سطر", "50 سطر", "نمایش همه"]
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
      // processing: true,
      bDestroy: true,
      filter: true,
      processing: true,
      dom: "Bfrtip",
      scrollX: true,
      aoColumnDefs: [{ bSortable: false, aTargets: [2, 3] }],
      ajax: {
        url: requestsAddress,
        contentType: "application/json; charset=utf-8",
        headers: {
          Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },
        dataSrc: function(res) {
          // console.log(res);
          // $(".load-content").hide();
          return res;
        },
        error: function(err) {
          if (err.status == 401) {
            // alert(getCookie("AuthorizationToken"));
            window.location.href = "login.html";
          }
          // $(".load-content").hide();
          console.log(err);
        }
      },
      columns: [
        {
          data: null,
          render: function(data) {
            switch (data.type) {
              case "contact":
                return ('<span>تماس با ما</span>');
              case "brand":
                return ('<span>برندها</span>');
              case "agent":
                return ('<span>نمایندگی</span>');
              case "organizational":
                return ('<span>سازمان</span>');

              default:
                return (`<span>${data.type}</span>`);
            }

          }
        },
        {
          data: null,
          render: function(data) {
            return (
                `<span>${data.fname} ${data.lname}</span>`
            );
          }
        },
        {
          data: null,
          render: function(data) {
            return (
              '<button class="displayR btn btn-info" data-item="' +
              encodeURIComponent(JSON.stringify(data)) +
              '">نمایش درخواست</button>'
            );
          }
        },

        {
          data: null,
          render: function(data) {
            return (
              '<button class="deleteR btn btn-danger bg-danger pr-5 pl-5" data-name="' +
              data.visited +
              '" data-id="' +
              data.id +
              '">حذف</button>'
            );
          }
        }
      ]
    });
  };

  drawTable();

  var setVisited = function(itemInfo) {
    if (itemInfo.visited == 0) {
      var jsonData = JSON.stringify({
        visited: "1",
        request_id:itemInfo.id
      });

      $.ajax({
        url:requestStatus,
        type: "POST",
        dataType: "json",
        data: jsonData,
        contentType: "application/json",
        headers: {
          Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

        success: function(data) {

          if(data.status==100){
            var newReqs = +$("#newRequestsNum").text();
            if (newReqs > 0) newReqs--;
            $("#newRequestsNum").text(newReqs);

            toastr.success("درخواست مشاهده شد");
            $("#requestsInformation").DataTable().clear();
            $("#requestsInformation").DataTable().destroy();
            drawTable();
          }else if(data.status==103){
            toastr.error('درخواست یافت نشد');
          }else if(data.status==101){
            toastr.error(data.validateError[0]);
          }else {
            toastr.error('خطا در ارسال اطلاعات');
          }

        },
        error: function(err) {
          if (err.status == 401) {
            window.location.href = "login.html";
          }
          var message = "خطا در ارسال اطلاعات";
          toastr.error(message);
          if (err.responseJSON.validateError)
            err.responseJSON.validateError.forEach(function(err) {
              toastr.error(err);
            });
        }
      });
    }
  };

  var displayBrand = function(itemInfo) {
    $("#brand_name").val(itemInfo.fname);
    $("#web_url").val(itemInfo.site);
    $("#brand_title").val(itemInfo.title);
    $("#kadoonaBrand_phone").val(itemInfo.phone);
    $("#kadoonaBrand_mobile").val(itemInfo.mobile);
    $("#kadoonaBrand_em").val(itemInfo.email);
    $("#kadoona-brands__msg").val(itemInfo.desc);
    if (itemInfo.visited == 1)
      $("#brandRModal h1.text-visited").text("این درخواست مشاهده شده است");
    else $("#brandRModal h1.text-visited").text("");
    $("#brandRModal").modal("show");
    setVisited(itemInfo);
  };

  var displayContact = function(itemInfo) {
    $("#contact_name").val(itemInfo.fname);
    $("#contact_lname").val(itemInfo.lname);
    $("#contact_email").val(itemInfo.email);
    $("#contact_subject").val(itemInfo.title);
    $("#contact_mobile").val(itemInfo.mobile);
    $("#contact_phone").val(itemInfo.phone);
    $("#msg").val(itemInfo.desc);
    if (itemInfo.visited == 1)
      $("#contactRModal h1.text-visited").text("این درخواست مشاهده شده است");
    else $("#contactRModal h1.text-visited").text("");
    $("#contactRModal").modal("show");
    setVisited(itemInfo);
  };

  var displayAgent = function(itemInfo) {
    $("#agency_name").val(itemInfo.fname);
    $("#agency_lname").val(itemInfo.lname);
    $("#agency_email").val(itemInfo.email);
    $("#agency_comp").val(itemInfo.company);
    $("#agency_phone").val(itemInfo.phone);
    $("#agency_mobile").val(itemInfo.mobile);
    $("#agency_address").val(itemInfo.address);
    if (itemInfo.visited == 1)
      $("#agencyRModal h1.text-visited").text("این درخواست مشاهده شده است");
    else $("#agencyRModal h1.text-visited").text("");
    $("#agencyRModal").modal("show");
    setVisited(itemInfo);
  };

  var displayOrgan = function(itemInfo) {
    $("#kadoonaei_name").val(itemInfo.fname);
    $("#kadoonaei_lastName").val(itemInfo.lname);
    $("#kadoonaei_em").val(itemInfo.email);
    $("#kadoonaei_com").val(itemInfo.company);
    $("#kadoonaei_rank").val(itemInfo.role);
    $("#kadoonaei_phone").val(itemInfo.phone);
    $("#kadoonaei_mobile").val(itemInfo.mobile);
    $("#kadoonaei__msg").val(itemInfo.desc);
    if (itemInfo.visited == 1)
      $("#organRModal h1.text-visited").text("این درخواست مشاهده شده است");
    else $("#organRModal h1.text-visited").text("");
    $("#organRModal").modal("show");
    setVisited(itemInfo);
  };

  // Display Information
  $("#requestsInformation").on("click", ".displayR", function() {
    var itemInfo = JSON.parse(decodeURIComponent($(this).data("item")));
    // console.log(itemInfo);

    switch (itemInfo.type) {
      case "contact":
        displayContact(itemInfo);
        break;
      case "brand":
        displayBrand(itemInfo);
        break;
      case "agent":
        displayAgent(itemInfo);
        break;
      case "organizational":
        displayOrgan(itemInfo);
        break;
      default:
        return;
    }
  });

  //----------------------- DELETE REQ --------------------

  $("#requestsInformation").on("click", ".deleteR", function() {
    let id = $(this).attr("data-id");

    $.ajax({
      url: delRequest,
      type: "POST",
      data:JSON.stringify({request_id:id}),
      dataType: "json",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },
      success: function(data) {

        if(data.status==100){
          toastr.success("حذف با موفقیت انجام شد");
          $("#requestsInformation").DataTable().clear();
          $("#requestsInformation").DataTable().destroy();
          drawTable();
        }else if(data.status==103){
          toastr.error('درخواست پیدا نشد');
        }else if(data.status==101){
          toastr.error(data.validateError[0]);
        }else {
          toastr.error('خطا در ارسال اطلاعات');
        }

      },
      error: function(err) {
        if (err.status == 401) {
          window.location.href = "login.html";
        }
        else if (err.status == 500) {
          toastr.error("خطا در برقراری ارتباط با سرور");
        }
        else
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

  //----------------- REMOVE LOADIN -------------------
  setTimeout(function() {
    $("body")
      .find("#loading-main")
      .remove();
  }, 0);
});
