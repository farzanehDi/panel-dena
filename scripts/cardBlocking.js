$(document).ready(function() {
    //-------------- SET LOCATION HASH ---------------
    window.location.hash = "cardBlocking";
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
    let drawTable = function() {
        $("#blockedListInformation").dataTable({

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

            processing: true,
            filter: true,
            dom: "Bfrtip",

            scrollX: true,
            bDestroy: true,
            aoColumnDefs: [{ bSortable: false, aTargets: [1,2] }],
            ajax: {
                url:ordersAddress,
                contentType: "application/json; charset=utf-8",
                headers: {
                    Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
                },
                dataSrc: function(res) {
                    console.log(res);
                    return res;
                },
                error: function(err) {
                    if (err.status == 401) {

                        window.location.href = "login.html";
                    }
                }
            },
            columns: [
                { data: "id" },
                { data: "id" },
                {
                    data: null,
                    render: function(data) {
                        return (
                            `<button class="unblockPan btn btn-success m-1" data-pan="${data.id}">
                             رفع مسدودی</button>`
                        );
                    }
                }
            ]
        });
    };

    $("#blockedListTab").click(function() {
        drawTable();
    });

    //-----------------------open modal for unblock pan--------------------

    $("#blockedListInformation").on("click", ".unblockPan", function() {
        let pan= $(this).attr("data-pan");

        $("#panNumberModal").val(pan);
        $("#unblockPanModal").modal("show");

    });
    //---------------------unblock pan-------------------
    $("#unblockPan").on("click", function() {

        $(".txt-error").remove();

        let errTexr = '<div class="txt-error">* این مورد الزامی است</div>';

        if($("#descriptionModal").val().trim().length===0){

            $(errTexr).insertAfter("#descriptionModal");
            $("#descriptionModal").addClass('borderRed');
            return false;
        }else {
            $(".errTexr").remove();
            $("#descriptionModal").removeClass('borderRed');
        }

        let jsonData=JSON.stringify({
            pan:$("#panNumberModal").val(),
            description:$("#descriptionModal").val(),
        });

        $.ajax({
            url: blockedList,
            type: "DELETE",
            dataType: "json",
            data:jsonData,
            contentType: "application/json",
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },
            success: function(data) {
                toastr.success("عملیات با موفقیت انجام شد");

                $("#blockedListInformation").DataTable().clear();
                $("#blockedListInformation").DataTable().destroy();
                drawTable();
            },
            error: function(err) {
                if (err.status == 401) {
                    window.location.href = "login.html";
                }
                if (err.status == 500) {
                    toastr.error("خطا در برقراری ارتباط با سرور");
                }
                toastr.error("خطا در رفع مسدودی");

            }
        });
    });

    //----------------------- block pan--------------------

    $("#blockPan").on("click", function() {
        $(".txt-error , .errPan").remove();
        // $(".txt-error").remove();
        let errPan = '<div class="errPan text-danger text-right">* لطفا یک پن نامبر 16 رقمی وارد نمایید</div>';
        let errTexr = '<div class="txt-error">* این مورد الزامی است</div>';
        let errorNum=false;

        let inputs=document.querySelectorAll('.noEmpty');

        inputs.forEach(function(item) {
           if(item.value.length===0){
               $(errTexr).insertAfter(item);
               item.classList.add('borderRed');
               errorNum=true;
           }else {

               item.classList.remove('borderRed');
           }
        });

        if(errorNum){
            return false;
        }

        if($("#panNumber").val().length!==10){
            $(errPan).insertAfter("#panNumber");
            $("#panNumber").addClass('borderRed');
            return false;
        }else {
            $(".errPan").remove();
            $("#panNumber").removeClass('borderRed');
        }

        let jsonData=JSON.stringify({
              pan:$("#panNumber").val(),
              description:$("#description").val(),
        });

        $.ajax({
            url: blockedCard ,
            type: "POST",
            dataType: "json",
            data:jsonData,
            contentType: "application/json",
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },
            success: function(data) {
                toastr.success("عملیات با موفقیت انجام شد");
            },
            error: function(err) {
                if (err.status == 401) {
                    window.location.href = "login.html";
                }

                toastr.error("خطا در رفع مسدودی");

            }
        });
    });

    //----------------- REMOVE LOADIN -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);
});