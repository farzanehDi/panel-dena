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
  window.location.hash = "categories";
  $(".load-content").hide();
    getCats();
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

  // var controlParentDepth = function(parentId, callBack) {
  //   $(".load-content").show();
  //   $.ajax({
  //     url: catsAddress + "/" + parentId,
  //     type: "GET",
  //     dataType: "json",
  //     contentType: "application/json",
  //     headers: {
  //       Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
  //     },
  //     success: function(data) {
  //         console.log(data);
  //       // In this case we don't allow user to add this category
  //       $(".load-content").hide();
  //       if (data.result[0].parentId !== null) {
  //         // console.log(data.result[0]);
  //         toastr.error("افزودن این دسته بندی امکان پذیر نیست");
  //         callBack(0);
  //       } else callBack(1);
  //     },
  //     error: function(err) {
  //       $(".load-content").hide();
  //       console.log(err);
  //       if (err.status == 401) {
  //         window.location.href = "login.html";
  //       }
  //       if (err.status == 500) {
  //         toastr.error("خطا در برقراری ارتباط با سرور");
  //       }
  //
  //       toastr.error("خطا در ارسال اطلاعات");
  //       // if (err.responseJSON.validateError)
  //       //   err.responseJSON.validateError.forEach(function(err) {
  //       //     toastr.error(err);
  //       //   });
  //       // console.log(err);
  //       callBack(0);
  //     }
  //   });
  // };

  //--------------ADD CAT--------------------
  $("#addCat").on("click", function() {

    var errTexr = '<div class="txt-error">* این فیلد ضروری است</div>',
      name = $("#catname").val(),
      parentId = $("#catParentId").val(),
      display_on_menu = $("#Dmenu").is(":checked"),
      display_on_sidebar = $("#Dsidebar").is(":checked");

    var error = 0;
    for (var i = 1; i <= 1; i++) {
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
    } else {

          var jsonData = JSON.stringify({
            name: name,
            parentId: +parentId,
            display_on_menu: String(display_on_menu),
            display_on_sidebar: String(display_on_sidebar)
          });

          $(".load-content").show();
          $.ajax({
            url: catsAddress,
            type: "POST",
            dataType: "json",
            data: jsonData,
            contentType: "application/json",
            datasrc: "",
            headers: {
              Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },

            success: function(data) {
              $(".load-content").hide();
              // console.log(data);
              if(data.status==101){
                  toastr.error("این نام موجود می باشد");
              }else if(data.status==100){
                  toastr.success("ثبت با موفقیت انجام شد");
              }else {
                  toastr.error("خطا در ارسال اطلاعات");
              }


            },
            error: function(jqXHR, textStatus, errorThrown) {
              $(".load-content").hide();
              // console.log(data);
              if (jqXHR.status == 401) {
                window.location.href = "login.html";
              }
              if (jqXHR.status == 500) {
                toastr.error("خطا در برقراری ارتباط با سرور");
              }

              toastr.error("خطا در برقراری ارتباط با سرور");

            }
          });

    }
  });

  //---------------------------------LOAD DATATABLE-------------------
  var drawTable = function() {
    $("#categoriesInformation").dataTable({

      processing: true,
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
         url: catsAddress,
        contentType: "application/json; charset=utf-8",
        headers: {
          Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },
        dataSrc: function(res) {
          // $(".load-content").hide();
          //   console.log(res);
          return res;
        },
        error: function(err) {
          if (err.status == 401) {
            window.location.href = "login.html";
          }

          console.log(err);
        }
      },
      columns: [
        { data: "name" },
        { data: "parentId" },
        {
          data: null,
          render: function(data) {
            return (
              '<button class="resetCat btn btn-info pr-5 pl-5" data-item="' +
              encodeURIComponent(JSON.stringify(data)) +
              '">ویرایش</button>'
            );
          }
        },
        {
          data: null,
          render: function(data) {
            return (
              '<button class="deleteCat btn btn-danger bg-danger pr-5 pl-5" data-name="' +
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

  $("#catListBtn").click(function() {
    drawTable();
  });

  //----------------------- DELETE CAT --------------------

  $("#categoriesInformation").on("click", ".deleteCat", function() {
    let id = $(this).attr("data-id");

    let jsonData = JSON.stringify({
      cat_id: id
    });


    $.ajax({
      url:deleteCat,
      type: "POST",
      dataType: "json",
      data:jsonData,
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },
      success: function(data) {

        if(data.status==103){
          toastr.error("دسته بندی موجود نیست");
        }else if(data.status==100){
          toastr.success("حذف با موفقیت انجام شد");
          $("#categoriesInformation").DataTable().clear();
          $("#categoriesInformation").DataTable().destroy();
            getCats();
          drawTable();
        }else {
          toastr.error("خطا در ارسال اطلاعات");
        }

      },
      error: function(err) {
        if (err.status == 401) {
          window.location.href = "login.html";
        }
        else if (err.status == 500) {
          toastr.error("خطا در برقراری ارتباط با سرور");
        }else {
          toastr.error("خطا در ارسال اطلاعات");
        }

      }
    });
  });


  //--------------------- EDIT CATS -----------------
   $("#categoriesInformation").on("click", ".resetCat", function() {
    var itemInfo = JSON.parse(decodeURIComponent($(this).data("item")));

    var name = itemInfo.name,
      parentId = itemInfo.parentId,
      display_on_menu = itemInfo.display_on_menu,
      display_on_sidebar = itemInfo.display_on_sidebar,
      id = itemInfo.id;


    $("#catId").val(id);
    $("#Ecatname").val(name);
    $("#EcatParentId").val(parentId);
    $("#EDmenu").prop("checked", display_on_menu == "true");
    $("#EDsidebar").prop("checked", display_on_sidebar == "true");



    $("#resetCatModal").modal("show");

    $("#resetCatModal").on("hidden.bs.modal", function(e) {
      $(this)
        .find(".txt-error")
        .remove();
    });
  });
  //----------------------------------edit cat modal----------------
  $("#changeCat").on("click", function() {

    var name = $("#Ecatname").val(),
      parentId = +$("#EcatParentId").val(),
      display_on_menu = $("#EDmenu").is(":checked"),
      display_on_sidebar = $("#EDsidebar").is(":checked"),
      catId = $("#catId").val();

    // controlParentDepth(parentId, function(isAllowed) {
      // if (isAllowed === 0) return false;
      var jsonData = JSON.stringify({
        name: name,
        cat_id:catId,
        parentId: parentId,
        display_on_menu: String(display_on_menu),
        display_on_sidebar: String(display_on_sidebar)
      });

      $.ajax({
        url:updateCat,
        type: "POST",
        dataType: "json",
        data: jsonData,
        contentType: "application/json",
        headers: {
          Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

        success: function(data) {

          if(data.status==103){
            toastr.error("دسته بندی یافت نشد");
          }else if(data.status==100){
            toastr.success("ویرایش با موفقیت انجام شد");
            $("#categoriesInformation").DataTable().clear();
            $("#categoriesInformation").DataTable().destroy();
            $("#resetCatModal").modal("hide");
            drawTable();
          }else {
            toastr.error("خطا در ارسال اطلاعات");
          }

        },
        error: function(err) {
          if (err.status == 401) {
            window.location.href = "login.html";
          }
          var message = "خطا در ارسال اطلاعات";
          toastr.error(message);

        }
      });
    // });
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

//------fetch categories------
function getCats(){

    fetch(catsAddress, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {

          $('#catParentId, #EcatParentId').html('<option value="0">انتخاب دسته پدر...</option>');

            data.map((cat)=>{
              $('#catParentId , #EcatParentId').append(`
                <option value="${cat.id}">${cat.name}</option>
              `)
            })

        });
    }).catch(async (err) => {

            console.log("error to get cats")
        }

    );
}
