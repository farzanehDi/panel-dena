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
  window.location.hash = "addCompanyUsers";

  var errAccess =
    "<div class=\"txt-error\" style='padding-bottom: 12px; padding-top: 6px; font-size: 15px;'>* لطفا سطح دسترسی تعیین نمایید</div>";

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

  //--------------ADD USER--------------------
  $("#addCompany").on("click", function() {
    var errTexr = '<div class="txt-error">* این فیلد ضروری است</div>',
      company_name = $("#company-name").val(),
      manager_name = $("#manager-name").val(),
      company_email = $("#company-email").val(),
      company_phone = $("#company-phone").val(),
      company_password = $("#password").val(),
      password_confirmation_company = $("#ConfirmPassword").val(),
      company_post = $("#company-post").val(),
      company_code = $("#company-code").val(),
      company_type = $("#company-type").val(),
      address = $("#company-address").val();

    // // username = $("#company-name").val(),
    // pass = $("#password").val(),
    // pass1 = $("#ConfirmPassword").val();

    var error = 0;
    for (var i = 1; i <= 10; i++) {
      if ($(".noEmpty" + i).val() == "") {
        if (
          !$(".noEmpty" + i)
            .parent()
            .find(".txt-error").length
        ) {
          $(errTexr).insertAfter(".noEmpty" + i);
        }

        $(".noEmpty" + i).css({
          "border-color": "red",
          "box-shadow": "0px 0px 2px red"
        });
        error = 1;
      } else {
        $(".noEmpty" + i).css({
          "border-color": "lightgray",
          "box-shadow": "0px 0px 0px lightgray"
        });
      }
    }

    if (error == 1) {
      return false;
    } else if (company_password != password_confirmation_company) {
      toastr.error("عدم تطابق رمز عبور");

      window.document.getElementById("password").style.borderColor = "red";
      window.document.getElementById("ConfirmPassword").style.borderColor =
        "red";
      return false;
    } else if (company_password == password_confirmation_company) {
      var role = ""; //= new Array();

      if ($("#c-MA").is(":checked")) {
        // var jsonArg1 = new Object();
        // jsonArg1.name = 'MA';
        // role.push(jsonArg1);
        role = "designer";
      }

      if ($("#c-OA").is(":checked")) {
        // var jsonArg1 = new Object();
        // jsonArg1.name = 'OA';
        // role.push(jsonArg1);
        role = "user";
      }

      if ($("#c-PA").is(":checked")) {
        // var jsonArg1 = new Object();
        // jsonArg1.name = 'PA';
        // role.push(jsonArg1);
        role = "editor";
      }

      if ($("#c-SA").is(":checked")) {
        // var jsonArg1 = new Object();
        // jsonArg1.name = 'SA';
        // role.push(jsonArg1);
        role = "admin";
      }

      if ($("#c-APA").is(":checked")) {
        // var jsonArg1 = new Object();
        // jsonArg1.name = 'APA';
        // role.push(jsonArg1);
        role = "owner";
      }

      if (role == "" || role == null) {
        if (
          !$("#access")
            .parent()
            .find(".txt-error").length
        ) {
          $(errAccess).insertAfter("#access");
        }
        return false;
      } else {
        $("#access")
          .siblings()
          .remove(".txt-error");
      }

      var jsonData = JSON.stringify({
        company_name: company_name,
        manager_name: manager_name,
        company_email: company_email,
        company_phone: company_phone,
        company_password: company_password,
        password_confirmation_company: password_confirmation_company,
        company_post: company_post,
        company_code: company_code,
        company_type: company_type,
        address: address,
        role: role,
        type: "company"
      });

      window.document.getElementById("password").style.borderColor =
        "lightgray";
      window.document.getElementById("ConfirmPassword").style.borderColor =
        "lightgray";
    }

    $.ajax({
      url: usersAddress,
      type: "POST",
      dataType: "json",
      data: jsonData,
      contentType: "application/json",
      datasrc: "",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },

      success: function(data) {
        toastr.success("ثبت کاربر با موفقیت انجام شد");
        $(".form-control").val("");
        $(".chAccess").prop("checked", false);
        // if (data.code == 0) {
        //   toastr.success("ثبت کاربر با موفقیت انجام شد");
        //   $(".form-control").val("");
        //   $(".chAccess").prop("checked", false);
        //   $("#userInformation")
        //     .DataTable()
        //     .clear();
        //   $("#userInformation")
        //     .DataTable()
        //     .destroy();
        //   drawTable();
        //   $("#company-name").css({
        //     "border-color": "lightgray",
        //     "box-shadow": "0px 0px 0px red"
        //   });
        // } else if (data.code == -2) {
        //   $("#company-name").css({
        //     "border-color": "red",
        //     "box-shadow": "0px 0px 2px red"
        //   });
        //   toastr.error("نام کاربری وارد شده قبلا ثبت شده است");
        // } else if (data.code == -3) {
        //   $("#company-name").css({
        //     "border-color": "lightgray",
        //     "box-shadow": "0px 0px 0px red"
        //   });

        //   toastr.error("شما دسترسی ادمین ندارید");
        // } else if (data.code == -1) {
        //   $("#company-name").css({
        //     "border-color": "lightgray",
        //     "box-shadow": "0px 0px 0px red"
        //   });

        //   toastr.error("تنها ادمین مجاز به تعریف کاربر می باشد");
        // }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 401) {
          window.location.href = "login.html";
        }
        if (jqXHR.status == 500) {
          toastr.error("خطا در برقراری ارتباط با سرور");
        }
        toastr.error("خطا در برقراری ارتباط با سرور");
        if (jqXHR.responseJSON.validateError)
          jqXHR.responseJSON.validateError.forEach(function(err) {
            toastr.error(err);
          });
      }
    });
  });

  //---------------------------------LOAD DATATABLE-------------------
  var drawTable = function() {
    $("#userInformation").dataTable({
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
        url: usersAddress,
        contentType: "application/json; charset=utf-8",
        headers: {
          Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },
        dataSrc: function(res) {
          $(".load-content").hide();
          return res;
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
        { data: "fname" },
        {
          data: null,
          render: function(data) {
            // var obj = data.role;
            // var roleArray = [];
            // obj.forEach(function(key) {
            //   if (key.name == "OA") {
            //     roleArray.push(" سفارشات سایت ");
            //   } else if (key.name == "PA") {
            //     roleArray.push("  خدمات PAN ");
            //   } else if (key.name == "MA") {
            //     roleArray.push(" خدمات پیامک ");
            //   } else if (key.name == "APA") roleArray.push(" خدمات اپلیکیشن ");
            //   else if (key.name == "SA") roleArray.push(" ادمین ");
            // });
            return "<p>" + data.role + "</p>";
          }
        },
        {
          data: null,
          render: function(data) {
            return (
              '<br/><button class="resetPass btn btn-info" data-item="' +
              encodeURIComponent(JSON.stringify(data)) +
              '">ویرایش</button>'
            );
          }
        },
        {
          data: null,
          render: function(data) {
            if (data.fname == "admin")
              return (
                '<br/><button class="deleteUser btn btn-danger bg-danger " data-fname="' +
                data.fname +
                '" disabled data-id="' +
                data.id +
                '">حذف کاربر</button>'
              );
            else
              return (
                '<br/><button class="deleteUser btn btn-danger bg-danger" data-fname="' +
                data.fname +
                '" data-id="' +
                data.id +
                '">حذف کاربر</button>'
              );
          }
        }
      ]
    });
  };

  $("#userListBtn").click(function() {
    drawTable();
  });

  //----------------------- DELETE USER --------------------

  $("#userInformation").on("click", ".deleteUser", function() {
    var id = $(this).attr("data-id");

    // var jsonData = JSON.stringify({
    //   id: id
    // });

    $.ajax({
      url: usersAddress + "/" + id,
      type: "DELETE",
      dataType: "json",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },
      success: function(data) {
        toastr.success("حذف با موفقیت انجام شد");

        $("#userInformation")
          .DataTable()
          .clear();
        $("#userInformation")
          .DataTable()
          .destroy();

        drawTable();
        // if (data.code == 0) {
        //   toastr.success("حذف با موفقیت انجام شد");

        //   $("#userInformation")
        //     .DataTable()
        //     .clear();
        //   $("#userInformation")
        //     .DataTable()
        //     .destroy();

        //   drawTable();
        // } else if (data.code == -2) {
        //   toastr.error("کاربر مورد نظر موجود نیست");
        // } else if (data.code == -3) {
        //   toastr.error("شما دسترسی ادمین ندارید");
        // } else if (data.code == -1) {
        //   toastr.error("تنها ادمین مجاز به تعریف کاربر می باشد");
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

  //--------------------- EDIT USER -----------------

  var selectedID = null;

  $("#userInformation").on("click", ".resetPass", function() {
    var itemInfo = JSON.parse(decodeURIComponent($(this).data("item")));
    // console.log(itemInfo);
    $(".chedit").prop("checked", false);
    var company_name = itemInfo.fname,
      manager_name = itemInfo.lname,
      company_code = itemInfo.company_code,
      company_type = itemInfo.company_type,
      company_address = itemInfo.address,
      city = itemInfo.city,
      province = itemInfo.province,
      // status = itemInfo.status,
      company_phone = itemInfo.phone,
      company_post = itemInfo.post,
      // company_email = itemInfo.email,
      role = itemInfo.role,
      id = itemInfo.id;
    selectedID = id;

    $("#Ecompany-name").val(company_name);
    $("#Emanager-name").val(manager_name);
    // $("#Ecompany-email").val(company_email);
    $("#Ecompany-phone").val(company_phone);
    $("#Ecompany-type").val(company_type);
    $("#Ecompany-code").val(company_code);
    $("#Ecompany-address").val(company_address);
    $("#city").val(city);
    $("#province").val(province);
    // $('#status option[value=' + status +']').prop('selected',true);
    $("#Ecompany-post").val(company_post);

    if (role == "user") {
      $("#editOA").prop("checked", true);
    } else if (role == "designer") {
      $("#editMA").prop("checked", true);
    } else if (role == "editor") {
      $("#editPA").prop("checked", true);
    } else if (role == "admin") $("#editSA").prop("checked", true);
    else if (role == "owner") $("#editAPA").prop("checked", true);

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

    $("#resetPassModal").modal("show");

    $("#resetPassModal").on("hidden.bs.modal", function(e) {
      $(this)
        .find(".txt-error")
        .remove();
    });
  });
  //----------------------------------edit user modal----------------
  $("#changePass").on("click", function() {
    // var pass = $("#Epassword").val();
    // var pass1 = $("#EConfirmPassword").val();
    var company_name = $("#Ecompany-name").val(),
      manager_name = $("#Emanager-name").val(),
      // company_email = $("#Ecompany-email").val(),
      company_phone = $("#Ecompany-phone").val(),
      company_type = $("#Ecompany-type").val(),
      company_code = $("#Ecompany-code").val(),
      company_address = $("#Ecompany-address").val(),
      city = $("#city").val(),
      province = $("#province").val(),
      status = $("#status")
        .find(":selected")
        .text(),
      company_post = $("#Ecompany-post").val();

    // if (pass != pass1) {
    //   toastr.error("عدم تطابق رمز عبور");
    //   window.document.getElementById("Epassword").style.borderColor = "red";
    //   window.document.getElementById("EConfirmPassword").style.borderColor =
    //     "red";
    //   return false;
    // } else if (pass == pass1) {
    var role = "";

    if ($("#editMA").is(":checked")) {
      // var jsonArg1 = new Object();
      // jsonArg1.name = "MA";
      // role.push(jsonArg1);
      role = "designer";
    }

    if ($("#editOA").is(":checked")) {
      // var jsonArg1 = new Object();
      // jsonArg1.name = "OA";
      // role.push(jsonArg1);
      role = "user";
    }

    if ($("#editPA").is(":checked")) {
      // var jsonArg1 = new Object();
      // jsonArg1.name = "PA";
      // role.push(jsonArg1);
      role = "editor";
    }

    if ($("#editSA").is(":checked")) {
      // var jsonArg1 = new Object();
      // jsonArg1.name = "SA";
      // role.push(jsonArg1);
      role = "admin";
    }

    if ($("#editAPA").is(":checked")) {
      // var jsonArg1 = new Object();
      // jsonArg1.name = "APA";
      // role.push(jsonArg1);
      role = "owner";
    }

    if (role == "" || role == null) {
      if (
        !$("#editaccess")
          .parent()
          .find(".txt-error").length
      ) {
        $(errAccess).insertAfter("#editaccess");
      }
      return false;
    } else {
      $("#editaccess")
        .siblings()
        .remove(".txt-error");
    }

    var jsonData = JSON.stringify({
      type: "company",
      company_name: company_name,
      manager_name: manager_name,
      company_code: company_code,
      company_type: company_type,
      company_address: company_address,
      city: city,
      province: province,
      status: status,
      company_phone: company_phone,
      company_post: company_post,
      role: role
    });

    //   window.document.getElementById("Epassword").style.borderColor =
    //     "lightgray";
    //   window.document.getElementById("EConfirmPassword").style.borderColor =
    //     "lightgray";
    // }

    $.ajax({
      url: usersAddress + "/" + selectedID,
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
        $(".chedit").prop("checked", false);
        $("#userInformation")
          .DataTable()
          .clear();
        $("#userInformation")
          .DataTable()
          .destroy();
        $("#resetPassModal").modal("hide");
        drawTable();
        // if (data.code == 0) {
        //   toastr.success("ویرایش با موفقیت انجام شد");
        //   $(".form-control").val("");
        //   $(".chedit").prop("checked", false);
        //   $("#userInformation")
        //     .DataTable()
        //     .clear();
        //   $("#userInformation")
        //     .DataTable()
        //     .destroy();
        //   $("#resetPassModal").modal("hide");
        //   drawTable();

        //   $("#Ecompany-name").css({
        //     "border-color": "lightgray",
        //     "box-shadow": "0px 0px 0px red"
        //   });
        // } else if (data.code == -2) {
        //   $("#Ecompany-name").css({
        //     "border-color": "red",
        //     "box-shadow": "0px 0px 2px red"
        //   });

        //   toastr.error("کاربر مورد نظر موجود نیست");
        // } else if (data.code == -3) {
        //   $("#Ecompany-name").css({
        //     "border-color": "lightgray",
        //     "box-shadow": "0px 0px 0px red"
        //   });

        //   toastr.error("شما دسترسی ادمین ندارید");
        // } else if (data.code == -1) {
        //   $("#Ecompany-name").css({
        //     "border-color": "lightgray",
        //     "box-shadow": "0px 0px 0px red"
        //   });

        //   toastr.error("تنها ادمین مجاز به تعریف کاربر می باشد");
        // }
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

  $(".chAccess").click(function() {
    if ($(this).is(":checked")) {
      return $("#access")
        .siblings()
        .remove(".txt-error");
    }
  });

  $(".chedit").click(function() {
    if ($(this).is(":checked")) {
      return $("#editaccess")
        .siblings()
        .remove(".txt-error");
    }
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
