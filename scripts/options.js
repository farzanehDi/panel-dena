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
  window.location.hash = "options";

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

  var controlP = function(data) {
    data.forEach(function(item) {
      var markup =
        '<li class="dropItem" data-id=' + item.id + ">" + item.name + "</li>";
      $(".dropdownMenu").append(markup);
    });
  };
  // get prod
  $.ajax({
    url: productsAddress,
    contentType: "application/json; charset=utf-8",
    headers: {
      Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
    },
    type: "GET",
    success: function(data) {
      $(".load-content").hide();
      controlP(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $(".load-content").hide();
      if (jqXHR.status == 401) {
        window.location.href = "login.html";
      }
      else if (jqXHR.status == 500) {
        toastr.error("خطا در برقراری ارتباط با سرور");
      }
      else toastr.error("خطا در برقراری ارتباط با سرور");

    }
  });

  // add cats id
  $(".dropdownMenu").click(function(e) {
    $("#optId").val($(e.target.closest(".dropItem")).data("id"));
  });

  //--------------ADD options--------------------
  $("#addOpt").on("click", function() {
    var errTexr = '<div class="txt-error">* این فیلد ضروری است</div>',
      name = $("#optname").val(),
      productId = $("#optId").val(),
      value = $("#optvalue").val();

    var error = 0;
    for (var i = 1; i <= 3; i++) {
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
        productId: productId,
        value: value
      });
    }

    $(".load-content").show();
    $.ajax({
      url: optionsAddress,
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
        if(data.status==100){
            toastr.success("ثبت ویژگی با موفقیت انجام شد");
            $(".form-control").val("");
            $("#optionsInformation").DataTable().clear();
            $("#optionsInformation").DataTable().destroy();
            drawTable();
        }else if(data.status==101){
            toastr.error(data.validateError[0]);
        }else {
          toastr.error('خطا در ارسال اطلاعات')
        }

      },
      error: function(jqXHR, textStatus, errorThrown) {
        $(".load-content").hide();
        if (jqXHR.status == 401) {
          window.location.href = "login.html";
        }
        if (jqXHR.status == 500) {
          toastr.error("خطا در برقراری ارتباط با سرور");
        }
        if (jqXHR.responseJSON.validateError)
          jqXHR.responseJSON.validateError.forEach(function(err) {
            toastr.error(err);
          });
      }
    });
  });

  //---------------------------------LOAD DATATABLE-------------------
  var drawTable = function() {

    $("#optionsInformation").dataTable({
      language: {
        url: "./plugin/Persian.json"
      },
      processing: true,
      filter: true,
      dom: "Bfrtip",
      buttons: [],
      scrollX: true,
      bDestroy: true,
      aoColumnDefs: [{ bSortable: false, aTargets: [2, 3] }],
      ajax: {
        url: optionsAddress,
        contentType: "application/json; charset=utf-8",
        headers: {
          Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },
        dataSrc: function(data) {
          console.log(data);
          if(data.status==100){
            return data.result;
          }else {
            return []
          }


        },
        error: function(err) {
          if (err.status == 401) {
            window.location.href = "login.html";
          }
          console.log('error to get options');
        }
      },
      columns: [
        { data: "name" },
        { data: "productId" },
        { data: "productName" },
        {
          data: null,
          render: function(data) {
            return (
              '<button class="pr-4 pl-4 resetOpt btn btn-info" data-item="' +
              encodeURIComponent(JSON.stringify(data)) +
              '">ویرایش</button>'
            );
          }
        },
        {
          data: null,
          render: function(data) {
            return (
              '<button class="pr-4 pl-4 deleteOpt btn btn-danger bg-danger" data-name="' +
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

  $("#optListBtn").click(function() {
    drawTable();
  });

  //----------------------- DELETE OPTIONS --------------------

  $("#optionsInformation").on("click", ".deleteOpt", function() {
    let id = $(this).attr("data-id");

    let jsonData = JSON.stringify({
        option_id: id
    });

    $.ajax({
      url:delOption,
      type: "POST",
      data:jsonData,
      dataType: "json",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },
      success: function(data) {
          if(data.status==100){
              toastr.success("حذف با موفقیت انجام شد");
              $("#optionsInformation").DataTable().clear();
              $("#optionsInformation").DataTable().destroy();
              drawTable();
          }else if(data.status==103){
              toastr.error('ویژگی محصول یافت نشد');
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
        if (err.status == 500) {
          toastr.error("خطا در برقراری ارتباط با سرور");
        }

        toastr.error("خطا در ارسال اطلاعات");
        if (err.responseJSON.validateError)
          err.responseJSON.validateError.forEach(function(err) {
            toastr.error(err);
          });
        // console.log(err);
      }
    });
  });

    //--------------------- EDIT OPTIONS -----------------


  $("#optionsInformation").on("click", ".resetOpt", function() {
    var itemInfo = JSON.parse(decodeURIComponent($(this).data("item")));
    var name = itemInfo.name,
      productId = itemInfo.productId,
      value = itemInfo.value,
      id = itemInfo.id;


    $("#Eoptname").val(name);
    $("#EoptId").val(productId);
    $("#Eoptvalue").val(value);
    $("#optionId").val(id);


    $("#resetOptModal").modal("show");

    $("#resetOptModal").on("hidden.bs.modal", function(e) {
      $(this)
        .find(".txt-error")
        .remove();
    });
  });
  //----------------------------------edit user modal----------------
  $("#changeOpt").on("click", function() {
    var name = $("#Eoptname").val(),
      productId = $("#EoptId").val(),
      value = $("#Eoptvalue").val(),
      id = $("#optionId").val();

    var jsonData = JSON.stringify({
      name: name,
      productId: productId,
      value: value,
      option_id:id
    });

    $.ajax({
      url:updateOption,
      type: "POST",
      dataType: "json",
      data: jsonData,
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },

      success: function(data) {
        if(data.status==100){
            toastr.success("ویرایش با موفقیت انجام شد");
            $(".form-control").val("");
            $("#optionsInformation").DataTable().clear();
            $("#optionsInformation").DataTable().destroy();
            $("#resetOptModal").modal("hide");
            drawTable();
        }else if(data.status==103){
            toastr.error('ویژگی محصول یافت نشد');
        }else if(data.status==101){
            toastr.error(data.validateError[0]);
        }else {
            toastr.error('خطا در ارسال اطلاعات');
        }


      },
      error: function(err) {
        if (err.status == 401) {
          window.location.href = "login.html";
        }else {
            var message = "خطا در ارسال اطلاعات";
            toastr.error(message);
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
