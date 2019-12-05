$(document).ready(function() {
  //-------------- SET LOCATION HASH ---------------
  window.location.hash = "orders";
  $(".load-content").hide();
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
    $("#ordersInformation").dataTable({
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
      dom: "Bfrtip",
      scrollX: true,
      aoColumnDefs: [{ bSortable: false, aTargets: [2, 3] }],
      ajax: {
        url: ordersAddress+'?status='+$('#orderType').val(),
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
        { data: "id" },
        { data: "amount" },

          {
              data: null,
              render: function(data) {
                if(data.state=='pending'){
                    return (
                        '<span>در انتظار پرداخت</span>'
                    );
                }else if(data.state=='cancel'){
                    return (
                        '<span>لغو شده</span>'
                    );
                }else if(data.state=='processing'){
                    return (
                        '<span>تایید شده</span>'
                    );
                }else if(data.state=='failed'){
                    return (
                        '<span>خطا در پرداخت</span>'
                    );
                }else if(data.state=='cancel'){
                    return (
                        '<span>لغو توسط کاربر</span>'
                    );
                }else if(data.state=='pay'){
                    return (
                        '<span>پرداخت شده</span>'
                    );
                }else if(data.state=='reject'){
                    return (
                        '<span>رد شده</span>'
                    );
                }else if(data.state=='waiting'){
                    return (
                        '<span>در انتظار چاپ</span>'
                    );
                }else if(data.state=='sending'){
                    return (
                        '<span>در حال ارسال</span>'
                    );
                }else if(data.state=='done'){
                    return (
                        '<span>تکمیل شده</span>'
                    );
                }else if(data.state=='error'){
                    return (
                        '<span>خطا در ارتباط</span>'
                    );
                }else {
                    return (
                        `<span>${data.state}</span>`
                    );
                }

              }
          },
        {
          data: null,
          render: function(data) {
            return (
              '<button class="orderDetails btn btn-info"  data-id="'+data.id+'" >  نمایش جزییات </button>'
            );
          }
        },
        {
          data: null,
          render: function(data) {
            return (
              '<button class=" deleteOrder btn btn-danger bg-danger" data-id="' +data.id +'">حذف سفارش</button>'
            );
          }
        }
      ]
    });
  };
  drawTable();
    $("#orderType").on("change", function() {
        drawTable();
    });

  //----------------------- DELETE ORDER --------------------

  $("#ordersInformation").on("click", ".deleteOrder", function() {
    let id = $(this).attr("data-id");

    $.ajax({
      url:delOrder,
      type: "POST",
      data:JSON.stringify({order_id:id}),
      dataType: "json",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },
      success: function(data) {

          if(data.status==100){
              toastr.success("حذف با موفقیت انجام شد");
              $("#ordersInformation").DataTable().clear();
              $("#ordersInformation").DataTable().destroy();
              drawTable();
          }else if(data.status==103){
              toastr.error('سفارش یافت نشد');
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
        else
        toastr.error("خطا در ارسال اطلاعات");

      }
    });
  });


  //--------------------- EDIT Orders -----------------

  $("#ordersInformation").on("click", ".orderDetails", function() {

      let id = $(this).attr("data-id");
      window.location.href=window.location.pathname +'#'+ 'orderDetails?id='+id;
      // window.location.href=+'/index.html#orderDetails?id='+id;

      // let sum = itemInfo.amount,
    //   state = itemInfo.state,
    //   comment = itemInfo.comment,
    //   id = itemInfo.id;
    // selectedID = id;
    // prevState = state;
    //
    // $("#EtotalSum").val(sum);
    // $("#EorderMsg").val(comment);
    // $("input[name=EorderState][value=" + state + "]").attr("checked","checked");

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


