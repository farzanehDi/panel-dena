$(document).ready(function() {
    //------------------ SET LOCATION HASH -------------------
    window.location.hash = "cardProductionInformation";

    //------------------ GET COOKIE TOKEN -------------------
    function getCookie(token) {
        var name = token + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
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

    //----------DATEPICKER---------
    $("#Date1 , #Date2").persianDatepicker({
        altFormat: "YYYY MM DD HH:mm:ss",
        observer: true,
        format: "YYYY-MM-DD"
    });
    //--------------------------SEARCH ORDER---------------------------

    var date1 = $("#Date1").val(),
        date2 = $("#Date2").val(),
        time1 = $("#time1").val(),
        time2 = $("#time2").val(),
        minute1 = $("#minute1").val(),
        minute2 = $("#minute2").val(),
        sc1 = $("#sc1").val(),
        sc2 = $("#sc2").val(),
        orderid = $("#ordId").val(),
        pan = $("#pan").val(),
        RRN = $("#rrn").val(),
        nationalcode = $("#nationalCode").val(),
        cartType = $("input[name=type]:checked").val(),
        orderStatus = $("input[name=state]:checked").val(),
        title = "KD" + date1.substring(2, 10).replace(/\-/g, "");

    time1 = time1 + ":" + minute1 + ":" + sc1;
    time2 = time2 + ":" + minute2 + ":" + sc2;

    if (orderid == "") orderid = "0";

    if (pan == "") pan = "62210620";

    if (orderStatus == undefined) orderStatus = "";

    if (cartType == undefined) cartType = "";

    $("#search").click(function() {
        date1 = $("#Date1").val();
        date2 = $("#Date2").val();
        time1 = $("#time1").val();
        time2 = $("#time2").val();
        minute1 = $("#minute1").val();
        minute2 = $("#minute2").val();
        sc1 = $("#sc1").val();
        sc2 = $("#sc2").val();
        orderid = $("#ordId").val();
        pan = $("#pan").val();
        RRN = $("#rrn").val();
        nationalcode = $("#nationalCode").val();
        cartType = $("input[name=type]:checked").val();
        orderStatus = $("input[name=state]:checked").val();
        title = "KD" + date1.substring(2, 10).replace(/\-/g, "");

        time1 = time1 + ":" + minute1 + ":" + sc1;
        time2 = time2 + ":" + minute2 + ":" + sc2;

        if (orderid == "") orderid = "0";
        if (pan == "") pan = "62210620";

        if (orderStatus == undefined) orderStatus = "";

        if (cartType == undefined) cartType = "";

        var errorTime = 0;
        for (var i = 1; i <= 4; i++) {
            if ($(".time" + i).val().length != 2) {
                $(".time" + i).css({
                    "border-color": "red",
                    "box-shadow": "0px 0px 2px red"
                });

                errorTime = 1;
            } else {
                $(".time" + i).css({
                    "border-color": "lightgray",
                    "box-shadow": "0px 0px 0px lightgray"
                });
            }
        }

        if (errorTime == 1) {
            toastr.error("زمان وارد شده باید دو رقمی باشد");
            return false;
        } else {
            $(".load-content").show();
            $("#finalList").DataTable().clear();
            $("#finalList").DataTable().destroy();
            getDataTable();
        }
    });

    var getDataTable = function() {
        var t = $("#finalList").DataTable({
            language: {
                url: "./plugin/Persian.json",
                buttons: {
                    pageLength: {
                        _: "نمایش %d سطر",
                        "-1": "نمایش همه"
                    }
                }
            },
            columnDefs: [
                {
                    searchable: false,
                    orderable: false,
                    targets: 0
                }
            ],
            order: [[1, "asc"]],
            // processing: true,
            filter: false,
            targets: 0,
            bDestroy:true,
            dom: "Bfrtip",
            scrollX: true,

            lengthMenu: [
                [10, 25, 50, -1],
                ["10 سطر", "25 سطر", "50 سطر", "نمایش همه"]
            ],
            buttons: [
                "pageLength",

                {
                    extend: "csv",
                    text:
                        '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Csv',
                    title: title,
                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
                    }
                },
                {
                    extend: "excelHtml5",
                    title: title,
                    text:
                        '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Excel',
                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
                    }
                }
            ],

            ajax: {
                url: `
        ${adminActionAddress}?orderid=${orderid}&orderStatus=${orderStatus}&dateStart=${date1}&timeStart=${time1}&dateEnd=${date2}&timeEnd=${time2}&nationalcode=${nationalcode}&pan=${pan}&RRN=${RRN}&cartType=${cartType}&orderType=Site`,
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
                    toastr.error("خطا در برقراری ارتباط با سرور");
                }
            },

            columns: [
                { data: null },
                { data: "orderID" },
                {
                    data: null,
                    render: function(data) {
                        return '<p dir="ltr">' + data.pan.panNo + "</p>";
                    }
                },
                {
                    data: null,
                    render: function(data) {
                        return "<p>" + data.pan.panNo.substring(0, 4) + "</p>";
                    }
                },
                {
                    data: null,
                    render: function(data) {
                        return "<p>" + data.pan.panNo.substring(5, 9) + "</p>";
                    }
                },
                {
                    data: null,
                    render: function(data) {
                        return "<p>" + data.pan.panNo.substring(10, 14) + "</p>";
                    }
                },
                {
                    data: null,
                    render: function(data) {
                        return "<p>" + data.pan.panNo.substring(15, 19) + "</p>";
                    }
                },
                {
                    data: null,
                    render: function(data) {
                        return "<p>" + data.pan.ExDate + "</p>";
                    }
                },
                {
                    data: null,
                    render: function(data) {
                        return "<p>" + data.pan.Cvv2 + "</p>";
                    }
                },
                {
                    data: null,
                    render: function(data) {
                        return "<p>" + data.pan.Track1 + "</p>";
                    }
                },
                {
                    data: null,
                    render: function(data) {
                        return "<p>" + data.pan.Track2 + "</p>";
                    }
                },
                {
                    data: "productCode"
                },
                {
                    data: null,
                    render: function(data) {
                        if (data.cartDesc == "null") return "";
                        else return "<p>" + data.cartDesc + "</p>";
                    }
                },

                {
                    data: null,
                    render: function(data) {
                        var expireDate = data.pan.ExDate.replace(/\//g, "");
                        return (
                            '<p dir="ltr">' +
                            data.pan.panNo.replace(/ /g, "") +
                            "001" +
                            data.productCode +
                            "001" +
                            data.orderID +
                            "00000" +
                            data.dateTime +
                            expireDate +
                            "</p>"
                        );
                    }
                },
                {
                    data: null,
                    render: function(data) {
                        if (data.pan.pin) {
                            return data.pan.pin;
                        } else {
                            return "2318";
                        }
                    }
                }
            ]
        });
        t.on("order.dt search.dt", function() {
            t.column(0, { search: "applied", order: "applied" })
                .nodes()
                .each(function(cell, i) {
                    cell.innerHTML = i + 1;
                });
        }).draw();
    };
    getDataTable();

    //------------------------ SEARCH ---------------------
    $(document).on("click", ".invoice-button", function() {
        var self = $(this);

        var name = self.attr("data-name"),
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

    //------------------ FORMAT NUMBER -------------------
    $("input.formatNumber").keyup(function(event) {
        // skip for arrow keys
        if (event.which >= 37 && event.which <= 40) return;

        // format number
        $(this).val(function(index, value) {
            return value.replace(/\D/g, "");
        });
    });

    //------------------- RESET INPUT -----------------
    $("input").keyup(function() {
        $(this).css({
            "border-color": "#ccc",
            "box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)"
        });
    });
});
