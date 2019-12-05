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
  window.location.hash = "cart";

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
    $("#cartInformation").dataTable({
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
        url: cartsAddress,
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
        { data: "cost" },
        {
          data: null,
          render: function(data) {
            return (
              '<br/><button class="resetCart btn btn-info" data-item="' +
              encodeURIComponent(JSON.stringify(data)) +
              '">ویرایش</button>'
            );
          }
        },
        {
          data: null,
          render: function(data) {
            return (
              '<br/><button class="deleteCart btn btn-danger bg-danger" data-name="' +
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

  $("#cartListBtn").click(function() {
    drawTable();
  });

  //----------------------- DELETE CART --------------------

  $("#cartInformation").on("click", ".deleteCart", function() {
    var id = $(this).attr("data-id");

    $.ajax({
      url: cartsAddress + "/" + id,
      type: "DELETE",
      dataType: "json",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },
      success: function(data) {
        toastr.success("حذف با موفقیت انجام شد");

        $("#cartInformation")
          .DataTable()
          .clear();
        $("#cartInformation")
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

        toastr.error("خطا در ارسال اطلاعات");
        if (err.responseJSON.validateError)
          err.responseJSON.validateError.forEach(function(err) {
            toastr.error(err);
          });
      }
    });
  });

  //--------------------- EDIT CART -----------------
  var selectedID = null;

  $("#cartInformation").on("click", ".resetCart", function() {
    var itemInfo = JSON.parse(decodeURIComponent($(this).data("item")));
    // console.log(itemInfo);

    var name = itemInfo.name,
      desc = itemInfo.desc,
      num = itemInfo.num,
      type = itemInfo.type,
      cost = itemInfo.cost,
      product = itemInfo.product,
      custom = itemInfo.custom,
      destination = itemInfo.destination,
      order = itemInfo.order,
      id = itemInfo.id;

    $("#Ecartname").val(name);
    $("#Ecartdesc").val(desc);
    $("#EcartNum").val(num);
    $("#Ecartcost").val(cost);
    $("#EpId").val(product);
    $("#EdesignId").val(custom);
    $("#EaddressId").val(destination);
    $("#EorderId").val(order);
    $("input[name=Etype][value=" + type + "]").attr("checked", "checked");

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

    $("#resetCartModal").modal("show");

    $("#resetCartModal").on("hidden.bs.modal", function(e) {
      $(this)
        .find(".txt-error")
        .remove();
    });
  });
  //----------------------------------edit user modal----------------
  $("#changeCart").on("click", function() {
    var name = $("#Ecartname").val(),
      desc = $("#Ecartdesc").val(),
      num = $("#EcartNum").val(),
      type = $("input[name=Etype]:checked").val(),
      cost = $("#Ecartcost").val(),
      product = $("#EpId").val(),
      custom = $("#EdesignId").val(),
      destination = $("#EaddressId").val(),
      order = $("#EorderId");

    var jsonData = JSON.stringify({
      name: name,
      num: num,
      cost: cost,
      desc: desc,
      type: type,
      product: product,
      order: order,
      destination: destination,
      custom: custom
    });

    $.ajax({
      url: cartsAddress + "/" + selectedID,
      type: "PATCH",
      // dataType: "json",
      data: jsonData,
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },

      success: function(data) {
        toastr.success("ویرایش با موفقیت انجام شد");
        $(".form-control").val("");
        $("#cartInformation")
          .DataTable()
          .clear();
        $("#cartInformation")
          .DataTable()
          .destroy();
        $("#resetCartModal").modal("hide");
        drawTable();
      },
      error: function(err) {
        console.log(err);
        if (err.status == 401) {
          window.location.href = "login.html";
        }
        var message = "خطا در ارسال اطلاعات";
        toastr.error(message);
        if (err.responseJSON && err.responseJSON.validateError)
          err.responseJSON.validateError.forEach(function(err) {
            toastr.error(err);
          });
        else {
          JSON.parse(err.responseText).validateError.forEach(function(err) {
            toastr.error(err);
          });
        }
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
