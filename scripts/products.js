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
  window.location.hash = "products";
    loadCategories();
  // $(".load-content").hide();

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

  var controlCats = function(data) {
    data.forEach(function(item) {
      var markup =
        '<li class="dropItem" data-name="'+item.name+'" data-id=' + item.id + ">" + item.name + "</li>";
      $(".dropdownMenu").append(markup);
    });
  };
  // get cats
  $.ajax({
    url: catsAddress,
    contentType: "application/json; charset=utf-8",
    headers: {
      Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
    },
    type: "GET",
    success: function(data) {
      $(".load-content").hide();
      controlCats(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $(".load-content").hide();
      if (jqXHR.status == 401) {
        window.location.href = "login.html";
      }
      if (jqXHR.status == 500) {
        toastr.error("خطا در برقراری ارتباط با سرور");
      }
      toastr.error("خطا در برقراری ارتباط با سرور");
      // if (jqXHR.responseJSON.validateError)
      //   jqXHR.responseJSON.validateError.forEach(function(err) {
      //     toastr.error(err);
      //   });
    }
  });




  $(".dropdownMenu").click(function(e) {
    var cardId = $(e.target.closest(".dropItem")).data("id");
    var cardName = $(e.target.closest(".dropItem")).data("name");

      $("#pcat").val(cardId);
      $("#nameCat").val(cardName);

  });


  //--------------ADD PRODUCT--------------------
  $("#addProduct").on("click", function() {
    var errTexr = '<div class="txt-error">* این فیلد ضروری است</div>',
      name = $("#pname").val(),
      cat = +$("#pcat").val(),
      description = $("#pdesc").val(),
      state = $("input[name=state]:checked").val(),
      cost = +$("#pcost").val(),
      code = $("#pcode").val(),
      pic = $("#pPic").prop("files")[0],
      off = $("#poff").val();

    var error = 0;
    for (var i = 1; i <= 6; i++) {
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
      var formData = new FormData();
      formData.append("pic", pic);
      formData.append("name", name);
      formData.append("cat", cat);
      formData.append("description", description);
      formData.append("code", code);
      formData.append("off", off);
      formData.append("state", state);
      formData.append("cost", cost);
    }

    $(".load-content").show();
    $.ajax({
      url: productsAddress,
      type: "POST",
      data: formData,
      contentType: false,
      dataType: "json",
      processData: false,
      cache: false,
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },

      success: function(data) {
        // console.log(data);
        $(".load-content").hide();

        if(data.status==100){
          toastr.success("محصول با موفقیت افزوده شد");
          $('.form-control').val('');
          removeImg();
        }else if(data.status==119){
          toastr.error('لطفا تصویر محصول را بارگزاری نمایید');
        }else if(data.status==101){
            toastr.error(data.validateError[0]);
        }else {
          toastr.error('خطا در ارسال اطلاعات');
        }

      },
      error: function(jqXHR, textStatus, errorThrown) {
        $(".load-content").hide();
        if (jqXHR.status == 401) {
          window.location.href = "login.html";
        }
        else if (jqXHR.status == 500) {
          toastr.error("خطا در برقراری ارتباط با سرور");
        }else
        toastr.error("خطا در برقراری ارتباط با سرور");

      }
    });
  });

  //---------------------------------LOAD DATATABLE-------------------
  const drawTable = function() {

    $("#productsInformation").dataTable({
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
        url: productsAddress+'?cat_id='+$("#category").val(),
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
              '<img  src="' + data.pic +'" style="width: 100px; height: 50px;">'
            );
          }
        },
          { data: "code" },
          { data: "nameOfCat" },
          {
              data: null,
              render: function(data) {
                  if(data.state=='empty'){
                      return (
                          '<span>ناموجود</span>'
                      );
                  }else {
                      return (
                          '<span>موجود</span>'
                      );
                  }

              }
          },
        {
          data: null,
          render: function(data) {
            return (
              '<button class="pr-4 pl-4 resetP btn btn-info" data-item="' +
              encodeURIComponent(JSON.stringify(data)) +
              '">ویرایش</button>'
            );
          }
        },
          {
              data: null,
              render: function(data) {
                if(data.state=='empty'){
                    return (
                        `<button class="pr-3 pl-3 text-nowrap changeState btn btn-success" 
                                data-id="${data.id}" data-state="${data.state}">&nbsp;موجود کن&nbsp;</button>`
                    );
                }else{
                    return (
                        `<button class="pr-3 pl-3 text-nowrap changeState btn btn-warning" 
                                data-id="${data.id}" data-state="${data.state}">ناموجود کن</button>`
                    );
                  }

              }
          },
        {
          data: null,
          render: function(data) {
            return (
              '<button class="pr-4 pl-4 deleteP btn btn-danger bg-danger" data-name="' +
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

  $("#pListBtn").click(function() {

    drawTable();
  });

  //----------------------- DELETE PRODUCT --------------------

  $("#productsInformation").on("click", ".deleteP", function() {

    let id = $(this).attr("data-id");

    let jsonData = JSON.stringify({
      product_id: id
    });


    $.ajax({
      url:delProduct,
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

          $("#productsInformation").DataTable().clear();
          $("#productsInformation").DataTable().destroy();
          drawTable();

        }else if(data.status==103){
          toastr.error('محصول یافت نشد')
        }else{
          toastr.error('خطا در ارسال اطلاعات');
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

  //----------change state-----------------
    $("#productsInformation").on("click", ".changeState", function() {

        let id = $(this).attr("data-id");
        let state = $(this).attr("data-state");

        let jsonData = JSON.stringify({
            product_id: id,
            status:state=='empty'?'supply':'empty'
        });


        $.ajax({
            url:productStatus,
            type: "POST",
            data:jsonData,
            dataType: "json",
            contentType: "application/json",
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },
            success: function(data) {
              // console.log(data);
                if(data.status==100){
                    toastr.success("عملیات با موفقیت انجام شد");

                    $("#productsInformation").DataTable().clear();
                    $("#productsInformation").DataTable().destroy();
                    drawTable();

                }else if(data.status==103){
                    toastr.error('محصول یافت نشد')
                }else{
                    toastr.error('خطا در ارسال اطلاعات');
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


  //--------------------- EDIT PRD -----------------

  $("#productsInformation").on("click", ".resetP", function() {
    var itemInfo = JSON.parse(decodeURIComponent($(this).data("item")));
    // console.log(itemInfo);
    var name = itemInfo.name,
      cat = itemInfo.cat,
      description = itemInfo.description,
      code = itemInfo.code,
      off = itemInfo.off,
      // state = itemInfo.state,
      pic = itemInfo.pic,
      cost = parseFloat(itemInfo.cost),
      id = itemInfo.id;


    $("#Epname").val(name);

    $("#Epcat").val(cat),
    $("#EpId").val(id),
      $("#Epdesc").val(description),
      // $("input[name=Estate][value=" + state + "]").attr("checked", "checked"),
      $("#Epcost").val(cost),
      $("#Epcode").val(code),
      // ($("#EpPic").prop("files")[0] = pic),
      $("#Epoff").val(off);
    // var dt = new ClipboardEvent("").clipboardData || new DataTransfer();
    // dt.items.add(new File(["foo"], pic));
    // EpPic.files = dt.files;

    $("#resetPModal").modal("show");

    $("#resetPModal").on("hidden.bs.modal", function(e) {
      $(this)
        .find(".txt-error")
        .remove();
    });
  });
  //----------------------------------edit user modal----------------
  $("#changeP").on("click", function() {
    var name = $("#Epname").val(),
      cat = +$("#Epcat").val(),
      description = $("#Epdesc").val(),
      // state = $("input[name=Estate]:checked").val(),
      cost = +$("#Epcost").val(),
      code = $("#Epcode").val(),
      pic = $("#EpPic").prop("files")[0],
      off = $("#Epoff").val(),
      id = $("#EpId").val();


      var formData = new FormData();
      formData.append("pic", pic);
      formData.append("name", name);
      formData.append("cat", cat);
      formData.append("description", description);
      formData.append("code", code);
      formData.append("off", off);
      formData.append("product_id",id);
      formData.append("cost", cost);

      $.ajax({
        url:updateProduct,
        type: "POST",
        data: formData,
        dataType:'json',
        contentType: false,
        processData: false,
        cache: false,
        headers: {
          Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

        success: function(data) {

          // console.log(data);
          if(data.status==100){
              toastr.success("ویرایش با موفقیت انجام شد");
              $(".form-control").val("");
              $("#productsInformation").DataTable().clear();
              $("#productsInformation").DataTable().destroy();
              $("#resetPModal").modal("hide");
              drawTable();

          }else if(data.status==103){
            toastr.error('محصول یافت نشد')
          }else{
            toastr.error('خطا در ارسال اطلاعات');
          }

        },
        error: function(err) {
          if (err.status == 401) {
            window.location.href = "login.html";
          }
          var message = "خطا در ارسال اطلاعات";
          toastr.error(message);
          // if (err.responseJSON && err.responseJSON.validateError)
          //   err.responseJSON.validateError.forEach(function(err) {
          //     toastr.error(err);
          //   });
          // else {
          //   JSON.parse(err.responseText).validateError.forEach(function(err) {
          //     toastr.error(err);
          //   });
          // }
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
  //--------------change category for filter products----
    $("#category").on("change", function() {
        drawTable();
    });
  //---------------load categories----------------
    function loadCategories(){
        fetch(catsAddress, {
            method: "GET",
            headers:{
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            }
        }).then(async (response) =>{

            await response.json().then(async (data) => {
                // console.log(data);
                data.map(cat=>{
                    $('#category').append(`
                  <option value=${cat.id}>${cat.name}</option>
                `)
                })

            });

        }).catch(err => {
            console.log('error to fetch categories')
        });
    }

});




function showPreview(objFileInput) {

  let ext=(objFileInput.value).split('.').pop().toLowerCase();

  if($.inArray(ext, ['png']) == -1 && $.inArray(ext, ['jpg']) == -1 && $.inArray(ext, ['jpeg']) == -1) {

    toastr.error("شما مجاز به انتخاب عکس می باشید");
    objFileInput.val('');
    return false;
  }

  if (objFileInput.files[0]) {
    let fileReader = new FileReader();
    fileReader.onload = function (e) {

      const x = document.createElement("IMG");
      x.setAttribute("src", e.target.result);
      x.setAttribute("width", "200px");
      x.setAttribute("alt", "تصویر محصول");
      $(x).insertBefore($(`#productImage`).find('.removeImg1'));

      $((`#${objFileInput.closest('div').id}`)).find('label').addClass('d-none');
      $((`#${objFileInput.closest('div').id}`)).find('.removeImg1').removeClass('d-none');


    };
    fileReader.readAsDataURL(objFileInput.files[0]);
  }
}

function removeImg(){

  $(`#productImage`).find('label').removeClass('d-none');
  $(`#productImage`).find('.removeImg1').addClass('d-none');
  $(`#productImage`).find('input').val('');
  $(`#productImage`).find('img').remove();


}