$(document).ready(function() {
  var countNewReqs = function(requests) {
    var counter = 0;
    requests.forEach(function(el) {
      if (el.visited == 0) counter++;
    });

    $("#newRequestsNum").text(counter);
  };

  var getNewReqs = function() {
    $.ajax({
      url: requestsAddress,
      contentType: "application/json; charset=utf-8",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },
      type: "GET",
      success: function(data) {
        countNewReqs(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 401) {
          window.location.href = "login.html";
        }
        // if (jqXHR.status == 500) {
        //   toastr.error("خطا در برقراری ارتباط با سرور");
        // }
        // toastr.error("خطا در برقراری ارتباط با سرور");
        // if (jqXHR.responseJSON.validateError)
        //   jqXHR.responseJSON.validateError.forEach(function(err) {
        //     toastr.error(err);
        //   });
      }
    });
  };

  var countNewOrders = function(orders) {
    // console.log(orders);
    var counter = 0;
    orders.forEach(function(el) {
      if (el.state == "pay") counter++;
    });

    $("#newOrdersNum").text(counter);
  };

  var getNewOrders = function() {
    $.ajax({
      url: ordersAddress,
      contentType: "application/json; charset=utf-8",
      headers: {
        Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
      },
      type: "GET",
      success: function(data) {
        countNewOrders(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 401) {
          window.location.href = "login.html";
        }
        // if (jqXHR.status == 500) {
        //   toastr.error("خطا در برقراری ارتباط با سرور");
        // }
        // toastr.error("خطا در برقراری دریافت سفارشات");
        // if (jqXHR.responseJSON.validateError)
        //   jqXHR.responseJSON.validateError.forEach(function(err) {
        //     toastr.error(err);
        //   });
      }
    });
  };

  getNewReqs();
  getNewOrders();
});
