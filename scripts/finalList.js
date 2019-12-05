$(document).ready(function() {
  var role = JSON.parse(localStorage.getItem("role"));
  if (role === null) {
    location.href = "login.html";
    return false;
  }

  for (i = 0; i < role.length; i++) {
    if (role[i] == "uadmin") {
      $(".pan,.uAdmin").show();
    } else if (role[i] == "radmin") {
      $(".rAdmin").show();
    } else if (role[i] == "sadmin") {
      $(".excel,.sAdmin").show();
    } else if (role[i] == "oadmin") {
      $(".excel,.oAdmin").show();
    } else if (role[i] == "padmin") {
      $(".sms,.pAdmin").show();
    } else if (role[i] == "badmin") {
      $(".sms,.bAdmin").show();
    } else if (role[i] == "readmin") {
      $(".pan,.reAdmin").show();
    } else if (role[i] == "admin")
      $(
        ".rAdmin,.sAdmin,.uAdmin,.user,.oAdmin,.pAdmin,.bAdmin,.excel,.sms,.reAdmin,.pan"
      ).show();
  }
  //  --------------------------load datatable------------------------

  $("#finalList").DataTable({
    processing: true,
    filter: false,

    dom: "Bfrtip",
    lengthMenu: [
      [10, 25, 50, -1],
      ["10 rows", "25 rows", "50 rows", "Show all"]
    ],
    buttons: [
      "pageLength",
      {
        extend: "pdf",
        footer: true,
        exportOptions: {
          columns: [0, 1, 2, 3, 4, 5, 6, 7]
        }
      },
      {
        extend: "csv",
        footer: false,
        exportOptions: {
          columns: [0, 1, 2, 3, 4, 5, 6, 7]
        }
      },
      {
        extend: "excel",
        footer: false,
        exportOptions: {
          columns: [0, 1, 2, 3, 4, 5, 6, 7]
        }
      }
    ],
    //buttons: [
    //  'pageLength', 'copy', 'csv', 'excel', 'pdf', 'print'
    //],

    ajax: {
      url: getAllOrdersAddress,
      dataSrc: ""
    },

    columns: [
      { data: "pan" },
      { data: "expiration_date" },
      { data: "cvv2" },
      { data: "track1" },
      { data: "track2" },
      { data: "product_code" },
      {
        data: null,
        render: function(data) {
          return (
            "<p>" +
            data.pan.replace(/ /g, "") +
            "001" +
            data.product_code +
            "001" +
            data.order_id +
            "00000" +
            data.order_date +
            "</p>"
          );
        }
      },
      {
        data: "status",
        render: function(data) {
          return "<span>2318</span>";
        }
      },
      {
        data: null,
        render: function(data) {
          return (
            '<button class="invoice-button" data-name="' +
            data.first_name +
            '" data-family="' +
            data.last_name +
            '" data-state="' +
            data.city +
            '" data-address="' +
            data.primary_address +
            '"' +
            'data-address1="' +
            data.secondary_address +
            '" data-post="' +
            data.postal_code +
            '"' +
            ' data-productCode="' +
            data.product_code +
            '" data-quantity="' +
            data.quantity +
            '" data-total="' +
            data.invoice +
            '">' +
            '<img src="./img/factor.png" height="30px" width="30px"/></button>'
          );
        }
      }
    ]
  });
  //----------------------------------------------------search----------------------------

  $("#search").click(function() {
    var Datesearch = $("#Date").val();

    $("#finalList")
      .DataTable()
      .clear();
    $("#finalList")
      .DataTable()
      .destroy();

    $("#finalList").DataTable({
      processing: true,
      filter: false,

      dom: "Bfrtip",
      lengthMenu: [
        [10, 25, 50, -1],
        ["10 rows", "25 rows", "50 rows", "Show all"]
      ],
      buttons: [
        "pageLength",
        {
          extend: "pdf",
          footer: true,
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7]
          }
        },
        {
          extend: "csv",
          footer: false,
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7]
          }
        },
        {
          extend: "excelHtml5",
          title: Datesearch,
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7]
          }
        }
      ],

      ajax: {
        url: ordersByDateAddress + "/" + Datesearch,
        dataSrc: ""
      },

      columns: [
        { data: "pan" },
        { data: "expiration_date" },
        { data: "cvv2" },
        { data: "track1" },
        { data: "track2" },
        { data: "product_code" },
        {
          data: null,
          render: function(data) {
            return (
              "<p>" +
              data.pan.replace(/ /g, "") +
              "001" +
              data.product_code +
              "001" +
              data.order_id +
              "00000" +
              data.order_date +
              "</p>"
            );
          }
        },
        {
          data: "status",
          render: function(data) {
            return "<span>2318</span>";
          }
        },
        {
          data: null,
          render: function(data) {
            return (
              '<button class="invoice-button" data-name="' +
              data.first_name +
              '" data-family="' +
              data.last_name +
              '" data-state="' +
              data.city +
              '" data-address="' +
              data.primary_address +
              '"' +
              'data-address1="' +
              data.secondary_address +
              '" data-post="' +
              data.postal_code +
              '"' +
              ' data-productCode="' +
              data.product_code +
              '" data-quantity="' +
              data.quantity +
              '" data-total="' +
              data.invoice +
              '">' +
              '<img src="./img/factor.png" height="30px" width="30px"/></button>'
            );
          }
        }
      ]
    });
  });

  //-----------------------------------------------------print factor---------------------
  $(document).on("click", ".invoice-button", function() {
    var self = $(this),
      name = self.attr("data-name"),
      family = self.attr("data-family"),
      address1 = self.attr("data-state"),
      address2 = self.attr("data-address"),
      address3 = self.attr("data-address1"),
      post = self.attr("data-post"),
      productCode = self.attr("data-productCode"),
      quantity = self.attr("data-quantity"),
      total = self.attr("data-total");

    $("#name").text(name);
    $("#family").text(family);
    $("#postCode").text(post);
    $("#address").text(address1 + " " + address2 + " " + address3);
    $("#quantity").text(quantity);
    $("#productCode").text(productCode);
    $("#total").text(total);

    $("#factorModal").modal({
      backdrop: false
    });
    return false;
  });

  //----------------- REMOVE LOADING -------------------
  setTimeout(function() {
    $("body")
      .find("#loading-main")
      .remove();
  }, 0);
});
