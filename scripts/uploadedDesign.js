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
  window.location.hash = "uploadedDesign";

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
    $("#designInformation").dataTable({
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
        url: customsAddress,
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
        {
          data: null,
          render: function(data) {
            return (
              '<img  src="http://ytciran.ir' +
              data.pic +
              '" style="width: 100px; height: 50px;">'
            );
          }
        },
        {
          data: null,
          render: function(data) {
            return (
              '<br/><button class="resetD btn btn-info" data-item="' +
              encodeURIComponent(JSON.stringify(data)) +
              '">ویرایش</button>'
            );
          }
        },
        {
          data: null,
          render: function(data) {
            return (
              '<br/><button class="deleteD btn btn-danger bg-danger" data-name="' +
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

  $("#designListBtn").click(function() {
    drawTable();
  });

  //----------------------- DELETE USER --------------------

  $("#designInformation").on("click", ".deleteD", function() {
    var id = $(this).attr("data-id");

    $.ajax({
      url: customsAddress + "/" + id,
      type: "DELETE",
      dataType: "json",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },
      success: function(data) {
        // console.log(data);
        toastr.success("حذف با موفقیت انجام شد");

        $("#designInformation")
          .DataTable()
          .clear();
        $("#designInformation")
          .DataTable()
          .destroy();

        drawTable();
        // if (data.code == 0) {
        //   toastr.success("حذف با موفقیت انجام شد");

        //   $("#designInformation")
        //     .DataTable()
        //     .clear();
        //   $("#designInformation")
        //     .DataTable()
        //     .destroy();

        //   drawTable();
        // } else if (data.code == -2) {
        //   toastr.error("طرح مورد نظر موجود نیست");
        // } else if (data.code == -3) {
        //   toastr.error("شما دسترسی ادمین ندارید");
        // } else if (data.code == -1) {
        //   toastr.error("تنها ادمین مجاز به تعریف طرح می باشد");
        // }
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

  // tesing
  // $("#resetPModal").modal("show");

  //--------------------- EDIT USER -----------------
  var selectedID = null;

  $("#designInformation").on("click", ".resetD", function() {
    var itemInfo = JSON.parse(decodeURIComponent($(this).data("item")));
    // console.log(itemInfo);
    var name = itemInfo.name,
      cost = itemInfo.cost,
      description = itemInfo.description,
      pic = itemInfo.pic,
      id = itemInfo.id;
    selectedID = id;

    $("#Edname").val(name);
    $("#Edcost").val(cost);
    $("#Eddesc").val(description);
    // $("#EdPic").prop("files")[0] = pic;
    var dt = new ClipboardEvent("").clipboardData || new DataTransfer();
    dt.items.add(new File(["foo"], pic));
    EdPic.files = dt.files;

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

    $("#resetDModal").modal("show");

    $("#resetDModal").on("hidden.bs.modal", function(e) {
      $(this)
        .find(".txt-error")
        .remove();
    });
  });
  //----------------------------------edit user modal----------------
  $("#changeD").on("click", function() {
    var name = $("#Edname").val(),
      description = $("#Eddesc").val(),
      cost = $("#Edcost").val(),
      pic = $("#EdPic").prop("files")[0];

    var formData = new FormData();
    formData.append("pic", pic);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("cost", cost);
    // console.log(...formData);

    $.ajax({
      url: customsAddress + "/" + selectedID,
      type: "PATCH",
      contentType: false,
      processData: false,
      cache: false,
      data: formData,
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },

      success: function(data) {
        toastr.success("ویرایش با موفقیت انجام شد");
        $(".form-control").val("");
        $("#designInformation")
          .DataTable()
          .clear();
        $("#designInformation")
          .DataTable()
          .destroy();
        $("#resetDModal").modal("hide");
        drawTable();
        // if (data.code == 0) {
        //   toastr.success("ویرایش با موفقیت انجام شد");
        //   $(".form-control").val("");
        //   $("#designInformation")
        //     .DataTable()
        //     .clear();
        //   $("#designInformation")
        //     .DataTable()
        //     .destroy();
        //   $("#resetDModal").modal("hide");
        //   drawTable();

        //   $("#Edname").css({
        //     "border-color": "lightgray",
        //     "box-shadow": "0px 0px 0px red"
        //   });
        // } else if (data.code == -2) {
        //   $("#Edname").css({
        //     "border-color": "red",
        //     "box-shadow": "0px 0px 2px red"
        //   });

        //   toastr.error("طرح مورد نظر موجود نیست");
        // } else if (data.code == -3) {
        //   $("#Edname").css({
        //     "border-color": "lightgray",
        //     "box-shadow": "0px 0px 0px red"
        //   });

        //   toastr.error("شما دسترسی ادمین ندارید");
        // } else if (data.code == -1) {
        //   $("#Edname").css({
        //     "border-color": "lightgray",
        //     "box-shadow": "0px 0px 0px red"
        //   });

        //   toastr.error("تنها ادمین مجاز به تعریف طرح می باشد");
        // }
      },
      error: function(err) {
        if (err.status == 401) {
          window.location.href = "login.html";
        }
        var message = "خطا در ارسال اطلاعات";
        toastr.error(message);
        console.log(err);
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

  $("input[type=file]").change(function() {
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
