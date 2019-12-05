$(document).ready(function() {
  //-------------- SET LOCATION HASH ---------------
  window.location.hash = "addPersonUsers";

  let errAccess =
    "<div class='txt-error' style='padding-bottom: 12px; padding-top: 6px; font-size: 15px;'>* لطفا سطح دسترسی تعیین نمایید</div>";

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
  let drawTable = function() {
    $("#userInformation").dataTable({
      // processing: true,
      filter: true,
      dom: "Bfrtip",
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
      bDestroy: true,
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
          // console.log(res);
          return res;
        },
        error: function(err) {
          if (err.status == 401) {
            console.log(err);
            // alert(getCookie("AuthorizationToken"));
            // window.location.href = "login.html";
          }
          $(".load-content").hide();
          console.log(err);
        }
      },
      columns: [
          {
              data: null,
              render: function(data) {
                  return (
                      `<span>${data.fname} ${data.lname}</span>`
                  );
              },
          },
        { data: "national_code" },
        {
          data: null,
          render: function(data) {
            if(data.role=='owner'){
                return "<span>مالک سیستم</span>";
            }else if(data.role=='admin'){
                return "<span>مدیر سیستم</span>";
            }else if(data.role=='editor'){
                return "<span>صدور کارت</span>";
            }else if(data.role=='agent'){
                return "<span>شعب</span>";
            }else if(data.role=='designer'){
                return "<span>طراح</span>";
            }else {
                return "<span>" + data.role + "</span>";
            }
            // var obj =data.role;
            // var roleArray = [];
            // obj.forEach(function(key) {
            //     if (key.name == "OA") {
            //         roleArray.push(' سفارشات سایت ');
            //     }else if (key.name == "PA") {
            //         roleArray.push('  خدمات PAN ');
            //     } else if (key.name == "MA") {
            //         roleArray.push(' خدمات پیامک ');
            //     }else if (key.name == "APA")
            //         roleArray.push(' خدمات اپلیکیشن ');
            //     else if (key.name == "SA")
            //         roleArray.push(' ادمین ');

            // });

          }
        },
        {
          data: null,
          render: function(data) {
            return (
              '<button class="information btn btn-info" data-item="' +
              encodeURIComponent(JSON.stringify(data)) +
              '">نمایش اطلاعات</button>'
            );
          }
        },
          {
              data: null,
              render: function(data) {
                if(data.status===1){
                    return (
                        '<button class="pr-4 pl-4 blockUser btn btn-danger" data-status="'+data.status+'" data-id="'+data.id+'" ' +
                        '>مسدود کردن</button>'
                    );
                }
                 else{
                      return (
                          '<button class="blockUser btn btn-success" data-status="'+data.status+'" data-id="'+data.id+'" ' +
                          '>خروج از مسدودی</button>'
                      );
                  }

              }
          },
        // {
        //   data: null,
        //   render: function(data) {
        //     if (data.fname == "admin")
        //       return (
        //         '<br/><button class="deleteUser btn btn-danger bg-danger " data-fname="' +
        //         data.fname +
        //         '" disabled data-id="' +
        //         data.id +
        //         '">حذف کاربر</button>'
        //       );
        //     else
        //       return (
        //         '<br/><button class="deleteUser btn btn-danger bg-danger" data-fname="' +
        //         data.fname +
        //         '" data-id="' +
        //         data.id +
        //         '">حذف کاربر</button>'
        //       );
        //   }
        // }
      ]
    });
  };


    drawTable();
    $("#userType").on("change", function() {
        drawTable();
    });
   //----------------------- BLOCK/UNBLOCK USER --------------------

  $("#userInformation").on("click", ".blockUser", function() {
    let id = $(this).attr("data-id");
    let status = $(this).attr("data-status");

    let jsonData = JSON.stringify({
      user_id: id,
      status:status==1?0:1
    });
    // console.log(status,jsonData);
    // return false;

    $.ajax({
      url:userStatus,
      type: "POST",
      dataType: "json",
      data:jsonData,
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },
      success: function(data) {
        // console.log(data);

        if(data.status==100){
          toastr.success("عملیات با موفقیت انجام شد");

          $("#userInformation").DataTable().clear();
          $("#userInformation").DataTable().destroy();
          drawTable();
        }else if(data.status==103){
          toastr.error('کاربر یافت نشد');
        }else {
          toastr.error('متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش نمایید');
        }

      },
      error: function(err) {
        if (err.status == 401) {
          window.location.href = "login.html";
        }
        else if (err.status == 500) {
          toastr.error("خطا در برقراری ارتباط با سرور");
        }
        else {
          toastr.error("خطا در ارسال اطلاعات");
        }


      }
    });
  });

  // tesing
  // $("#informationModal").modal("show");

  //--------------------- EDIT USER -----------------
  // let selectedID = null;

  $("#userInformation").on("click", ".information", function() {
    const itemInfo = JSON.parse(decodeURIComponent($(this).data("item")));
    $(".chedit").prop("checked", false);

    const fname = itemInfo.fname,
      lname = itemInfo.lname,
      // email = itemInfo.email,
      phone = itemInfo.phone,
      post = itemInfo.post,
      gender = itemInfo.gender,
      nationalCode = itemInfo.national_code,
      birthday= itemInfo.birthday,
      address = itemInfo.address,
      city = itemInfo.city,
      province = itemInfo.province,
      status = itemInfo.status,
      role = itemInfo.role,
      id = itemInfo.id;

    // selectedID = itemInfo.id;

    $("#userId").val(id);
    $("#Efname").val(fname);
    $("#Elname").val(lname);
    $("#birthday").val(birthday);
    $("#sex").val(gender=='male'?'آقا':'خانم');
    // $("#Eemail").val(email);
    // $("#Eday").val(birthdate_day);
    // $("#Eyear").val(birthdate_year);
    // $("#Emonth option[value=" + birthdate_month + "]").prop("selected", true);
    // $("input[name=Egender][value=" + gender + "]").prop("checked", true);
    $("#EnationalCode").val(nationalCode);
    $("#Ephone").val(phone);
    $("#Eaddress").val(address);
    $("#city").val(city);
    $("#province").val(province);
    $("#status").val(status==1?'فعال':'غیر فعال');
    // $('#status option[value=' + status +']').prop('selected',true);
    $("#Epost").val(post);

    if (role == "agent") {
      $("#agent").prop("checked", true);
    } else if (role == "editor") {
      $("#editor").prop("checked", true);
    } else if (role == "admin") $("#admin").prop("checked", true);
    else if (role == "designer") $("#designer").prop("checked", true);
    else if (role == "owner") $("#owner").prop("checked", true);

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

    $("#informationModal").modal("show");

    $("#informationModal").on("hidden.bs.modal", function(e) {
      $(this).find(".txt-error").remove();
    });
  });
  //----------------------------------edit user modal----------------
  $("#changeRole").on("click", function() {

    let role = "";

    if ($("#agent").is(":checked")) {
      // var jsonArg1 = new Object();
      // jsonArg1.name = "MA";
      // role.push(jsonArg1);
      role = "agent";
    }

    if ($("#editor").is(":checked")) {
      // var jsonArg1 = new Object();
      // jsonArg1.name = "OA";
      // role.push(jsonArg1);
      role = "editor";
    }

    if ($("#owner").is(":checked")) {
      // var jsonArg1 = new Object();
      // jsonArg1.name = "PA";
      // role.push(jsonArg1);
      role = "owner";
    }

    // if ($("#editSA").is(":checked")) {
    //   // var jsonArg1 = new Object();
    //   // jsonArg1.name = "SA";
    //   // role.push(jsonArg1);
    //   role = "admin";
    // }

    if ($("#admin").is(":checked")) {
      // var jsonArg1 = new Object();
      // jsonArg1.name = "APA";
      // role.push(jsonArg1);
      role = "admin";
    }
    if ($("#designer").is(":checked")) {
      // var jsonArg1 = new Object();
      // jsonArg1.name = "APA";
      // role.push(jsonArg1);
      role = "designer";
    }

    // console.log(role);

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
      user_id:$('#userId').val(),
      role: role
    });


    $.ajax({
      url:userRole,
      type: "POST",
      dataType: "json",
      data: jsonData,
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },

      success: function(data) {

        if (data.status==100){

          toastr.success("ویرایش با موفقیت انجام شد");
          $(".form-control").val("");
          $(".chedit").prop("checked", false);
          $("#userInformation").DataTable().clear();
          $("#userInformation").DataTable().destroy();
          $("#informationModal").modal("hide");
          drawTable();
        }else if(data.status==103){
          toastr.error('کاربر یافت نشد');
        }else {
          toastr.error('متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش نمایید');
        }


      },
      error: function(err) {
        console.log(err);
        if (err.status == 401) {
          window.location.href = "login.html";
        }
        var message = "خطا در ارسال اطلاعات";
        toastr.error(message);

      }
    });
  });

  // $(".chAccess").click(function() {
  //   if ($(this).is(":checked")) {
  //     return $("#access")
  //       .siblings()
  //       .remove(".txt-error");
  //   }
  // });
  //
  // $(".chedit").click(function() {
  //   if ($(this).is(":checked")) {
  //     return $("#editaccess")
  //       .siblings()
  //       .remove(".txt-error");
  //   }
  // });

  //---------------------- REMOVE ERROR -----------------
  // $("input").keyup(function() {
  //   $(this).css({
  //     "border-color": "#ccc",
  //     "box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)"
  //   });
  //   $(this)
  //     .parent()
  //     .find(".txt-error")
  //     .remove();
  // });

  //----------------- REMOVE LOADIN -------------------
  setTimeout(function() {
    $("body")
      .find("#loading-main")
      .remove();
  }, 0);
});


