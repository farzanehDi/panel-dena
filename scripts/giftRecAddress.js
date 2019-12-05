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
  window.location.hash = "giftRecAddress";

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
    $("#addressInformation").dataTable({
      language: {
        url: "./plugin/Persian.json"
      },
      processing: true,
      filter: true,
      dom: "Bfrtip",
      buttons: [],
      scrollX: true,
      aoColumnDefs: [{ bSortable: false, aTargets: [2, 3] }],
      ajax: {
        // url: "http://170.10.114.60:8865/admin/user/crud/users",
        url: destinationsAddress,
        contentType: "application/json; charset=utf-8",
        headers: {
          Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },
        dataSrc: function(res) {
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
        { data: "name" },
        { data: "address" },
        {
          data: null,
          render: function(data) {
            return (
              '<br/><button class="resetAdd btn btn-info" data-item="' +
              encodeURIComponent(JSON.stringify(data)) +
              '">ویرایش</button>'
            );
          }
        },
        {
          data: null,
          render: function(data) {
            return (
              '<br/><button class="deleteAdd btn btn-danger bg-danger" data-name="' +
              data.name +
              '" data-id="' +
              data.id +
              '">حذف</button>'
            );
          }
        }
      ]
    });
  };

  $("#addListBtn").click(function() {
    drawTable();
  });

  //----------------------- DELETE USER --------------------

  $("#addressInformation").on("click", ".deleteAdd", function() {
    var id = $(this).attr("data-id");

    $.ajax({
      url: destinationsAddress + "/" + id,
      type: "DELETE",
      dataType: "json",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },
      success: function(data) {
        toastr.success("حذف با موفقیت انجام شد");

        $("#addressInformation")
          .DataTable()
          .clear();
        $("#addressInformation")
          .DataTable()
          .destroy();

        drawTable();
      },
      error: function(err) {
        if (err.status == 401) {
          window.location.href = "login.html";
        }
        if (err.status == 500) {
          toastr.error("خطا در برقراری ارتباط با سرور");
        }

        if (err.status == 403) {
          toastr.error("شما دسترسی به حذف آدرس ندارید !");
        }

        toastr.error("خطا در ارسال اطلاعات");
        if (err.responseJSON.validateError)
          err.responseJSON.validateError.forEach(function(err) {
            toastr.error(err);
          });
      }
    });
  });

  // tesing
  // $("#resetAddModal").modal("show");

  //--------------------- EDIT USER -----------------
  var selectedID = null;

  $("#addressInformation").on("click", ".resetAdd", function() {
    var itemInfo = JSON.parse(decodeURIComponent($(this).data("item")));
    // console.log(itemInfo);
    var name = itemInfo.name,
      shipping_cost = itemInfo.shipping_cost,
      shipping_type = itemInfo.shipping_type,
      email = itemInfo.email,
      province = itemInfo.province,
      city = itemInfo.city,
      address = itemInfo.address,
      post = itemInfo.post,
      phone = itemInfo.phone,
      id = itemInfo.id;

    $("#Eaddname").val(name);
    $("#EaddPhone").val(phone);
    $("#EaddEmail").val(email);
    $("#Eprovince").val(province);
    $("#Ecity").val(city);
    $("#Eaddress").val(address);
    $("#Ecost").val(shipping_cost);
    $("#Epost").val(post);
    $("input[name=Eshipping][value=" + shipping_type + "]").attr(
      "checked",
      "checked"
    );

    selectedID = id;

    //---------------------DIFFERENT ROLE----------------

    // $.ajax({
    //   type: "GET",
    //   async: false,
    //   dataType: "json",
    //   url: "http://170.10.114.60:8865/admin/user/crud/roles?id=" + id,
    //   contentType: "application/json; charset=utf-8",
    //   headers: {
    //     Authorization: getCookie("AuthorizationToken")
    //   },
    //   success: function(data) {
    //     for (var i = 0; i < data.length; ++i) {
    //       role.push(data[i].name);
    //     }
    //   },
    //   error: function(err) {
    //     if (err.status == 401) {
    //       window.location.href = "login.html";
    //     }
    //     if (err.status == 500) {
    //       toastr.error("خطا در برقراری ارتباط با سرور");
    //     }
    //     // toastr.error("خطا در دریافت اطلاعات کاربر");
    //     return false;
    //   }
    // });

    // for (var i = 0; i < role.length; i++) {
    //   if (role[i] == "OA") {
    //     $("#editOA").prop("checked", true);
    //   } else if (role[i] == "MA") {
    //     $("#editMA").prop("checked", true);
    //   } else if (role[i] == "PA") {
    //     $("#editPA").prop("checked", true);
    //   } else if (role[i] == "SA") $("#editSA").prop("checked", true);
    //   else if (role[i] == "APA") $("#editAPA").prop("checked", true);
    // }

    $("#resetAddModal").modal("show");

    $("#resetAddModal").on("hidden.bs.modal", function(e) {
      $(this)
        .find(".txt-error")
        .remove();
    });
  });
  //----------------------------------edit user modal----------------
  $("#changeAdd").on("click", function() {
    var name = $("#Eaddname").val(),
      phone = $("#EaddPhone").val(),
      email = $("#EaddEmail").val(),
      shipping_type = $("input[name=Eshipping]:checked").val(),
      province = $("#Eprovince").val(),
      city = $("#Ecity").val(),
      address = $("#Eaddress").val(),
      shipping_cost = $("#Ecost").val(),
      post = $("#Epost").val();

    var jsonData = JSON.stringify({
      name: name,
      phone: phone,
      email: email,
      address: address,
      city: city,
      province: province,
      shipping_cost: shipping_cost,
      shipping_type: shipping_type,
      post: post
    });

    $.ajax({
      url: destinationsAddress + "/" + selectedID,
      type: "PATCH",
      dataType: "json",
      data: jsonData,
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },

      success: function(data) {
        toastr.success("ویرایش با موفقیت انجام شد");
        $(".form-control").val("");
        $("#addressInformation")
          .DataTable()
          .clear();
        $("#addressInformation")
          .DataTable()
          .destroy();
        $("#resetAddModal").modal("hide");
        drawTable();
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
