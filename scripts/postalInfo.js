$(document).ready(function() {
    //------------------ SET LOCATION HASH -------------------
    window.location.hash = "postalInfo";

    //----------DATEPICKER---------
    $("#dateStart , #dateEnd").persianDatepicker({
        altFormat: "YYYY MM DD HH:mm:ss",
        observer: true,
        format: "YYYY-MM-DD"
    });

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
    //---------------------------------LOAD DATATABLE-------------------
    var drawTablePost = function() {
        $("#postalInfo").dataTable({

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

            order: [[ 0, "desc" ]],
            bDestroy: true,
            filter: true,
            dom: "Bfrtip",
            buttons: [
                "pageLength",
                {
                    extend: "excelHtml5",
                    title:'postinformation',
                    text:
                        '<i class="fa fa-download text-primary" aria-hidden="true"></i> دریافت فایل Excel',
                    exportOptions: {
                        columns: [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                    }
                }
            ],


            ajax: {
                url:`${postalInfo}&orderStatus=${$("#orderStatus").val()}&nationalcode=${$("#nationalcode").val()}&RRN=${$("#RRN").val()}&dateStart=${$("#dateStart").val()}&dateEnd=${$("#dateEnd").val()}`,
                type: "GET",
                contentType: "application/json",
                dataType:'json',
                headers: {
                    Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
                },
                dataSrc: function(res) {
                    $(".load-content").hide();

                    if(res.status==0){
                        return res.data;
                    }else {
                        return [];
                    }

                },
                error: function(err) {
                    if (err.status == 401) {
                        // alert(getCookie("AuthorizationToken"));
                        window.location.href = "login.html";
                    }
                    $(".load-content").hide();
                    console.log('err');
                }
            },
            columns: [
                { data: "RRN" },
                { data: "orderId" },
                {
                    data: null,
                    render: function(data) {
                        return (
                            `<span>${data.Fname} ${data.Lname}</span>`
                        );
                    }
                },
                { data: "email" },
                { data: "phone" },
                { data: "address" },

                {
                    data: null,
                    render: function(data) {
                        return (
                            `<span>${data.gender=='male'?'آقا':'خانم'}</span>`
                        );
                    }
                },
                { data: "mellicode" },
                { data: "companyCode" },
                { data: "companyType" },
                { data: "province" },
                { data: "city" },
                { data: "post" },
            ]
        });
    };
    drawTablePost();
    $("#searchPostalInfo").on("click", function() {
        $(".load-content").show();
        drawTablePost();
    });

//----------------- REMOVE LOADIN -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);
});
