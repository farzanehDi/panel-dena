$(document).ready(function(e) {


  //------------------ SET LOCATION HASH -------------------
  window.location.hash = "panUpload";

  $(".load-content").hide();

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

  //------------send excel file----------
    $('#sendPan').on('click', function (e) {

        if($('#uploadPan').val()===''){
            toastr.error("لطفا فایل خود را انتخاب نمایید");
            return false;
        }

        //var fd = new FormData();
        //fd.append( 'file', $('#uploadimg')[0].files[0] );
        //var formData = new FormData($(this)[0]);
        //console.log(formData);
        //
        //var formDataSerialized = $(this).serialize();
        //console.log(formDataSerialized);
        $('#loading').removeClass('d-none');

        let formData = new FormData();
        formData.append('section', 'general');
        //formData.append('action', 'previewImg');
        formData.append('excel', $('input[type=file]')[0].files[0]);

        $.ajax({
            url: uploadPan,
            type: "POST",             // Type of request to be send, called as method
            data:formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false,
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },
            success: function(data)   // A function to be called if request succeeds
            {

                if(data.status===0){
                    toastr.success("آپلود فایل با موفقیت انجام شد");
                }else {
                    toastr.error(data.msg);
                }
                // console.log(data);
                $('#loading').addClass('d-none');
                $(".uploaded").removeClass('d-block').addClass('d-none');
                $("#upload").removeClass('d-none');


            },
            error: function(){
                toastr.error("متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش کنید");
                $('#loading').addClass('d-none');
            }


        });
    });
  //----------DATEPICKER---------
  // $(".expDate").persianDatepicker({
  //   altFormat: "YYYY MM DD HH:mm:ss",
  //   observer: true,
  //   format: "YY/MM"
  // });

//   $("#addCardBtn").click(function() {
//
//     var markup = `
//     <div class="card-item">
//     <div class="col-sm-12 text-right">
//         <button class="btn removeCardBtn hoverBtn" type="button">
//             <img src="images/negative.png" alt="add" class="minus-img">
//         </button>
//     </div>
//
//     <div class="col-sm-12">
//         <div class="row">
//             <div class="col-sm-4">
//                 <div class="form-group">
//                     <span class="input-icon icon-right">
//                         <input type="text" class="form-control noEmpty2 formatNumber panNum"
//                             placeholder="Pan">
//                         <i class="fa fa-list-ol circular"></i>
//                     </span>
//                 </div>
//             </div>
//
//             <div class="col-sm-4">
//                 <div class="form-group">
//                     <span class="input-icon icon-right">
//                         <input type="text" class="form-control noEmpty3 track1"
//                             placeholder="Track1">
//                         <i class="fa fa-list-ol circular"></i>
//                     </span>
//                 </div>
//             </div>
//
//             <div class="col-sm-4">
//                 <div class="form-group">
//                     <span class="input-icon icon-right">
//                         <input type="text" class="form-control noEmpty4 track2"
//                             placeholder="Track2">
//                         <i class="fa fa-list-ol circular"></i>
//                     </span>
//                 </div>
//             </div>
//         </div>
//     </div>
//
//     <div class="col-sm-12">
//         <div class="row">
//             <div class="col-sm-4">
//                 <div class="form-group">
//                     <span class="input-icon icon-right">
//                         <input type="text" class="form-control noEmpty5 formatNumber cvv2"
//                             placeholder="Cvv2">
//                         <i class="fa fa-list-ol circular"></i>
//                     </span>
//                 </div>
//             </div>
//
//             <div class="col-sm-4">
//                 <div class="form-group">
//                     <span class="input-icon icon-right">
//                         <input type="text" class="form-control noEmpty6 formatNumber pin"
//                             placeholder="Pin">
//                         <i class="fa fa-list-ol circular"></i>
//                     </span>
//                 </div>
//             </div>
//
//             <div class="col-sm-4">
//                 <div class="row">
//                     <div class="col-sm-4">
//                         تاریخ انقضا :
//                     </div>
//
//                 <div class="col-sm-4 form-group">
//                     <input class="form-control noEmpty7 formatNumber month" type="text"
//                         autocomplete="off" placeholder="ماه" minlength="2" maxlength="2">
//                 </div>
//
//                 <div class="col-sm-4 form-group">
//                     <input class="form-control noEmpty8 formatNumber year" type="text"
//                         autocomplete="off" placeholder="سال" minlength="2" maxlength="2">
//                 </div>
//               </div>
//             </div>
//         </div>
//     </div>
// </div>
//     `;
//
//     $("#cards-box").append(markup);
//   });

  // $("#cards-box").click(function(e) {
  //   // Check if removeCardBtn is clicked then call function removeCard
  //   if (e.target.matches(".removeCardBtn, .removeCardBtn *")) {
  //     $(e.target)
  //       .closest("div.card-item")
  //       .remove();
  //   }
  // });

  //--------------ADD USER--------------------
  // $("#submitCards").on("click", function() {
  //   var errTexr = '<div class="txt-error">* این فیلد ضروری است</div>',
  //     email = $("#email").val(),
  //     panNo = $(".panNum").val(),
  //     month = $(".month").val(),
  //     year = $(".year").val(),
  //     Track1 = $(".track1").val(),
  //     Track2 = $(".track2").val(),
  //     Cvv2 = $(".cvv2").val(),
  //     pin = $(".pin").val();
  //
  //   var error = 0;
  //   for (var i = 1; i <= 8; i++) {
  //     if ($(".noEmpty" + i).val() == "") {
  //       if (
  //         !$(".noEmpty" + i)
  //           .parent()
  //           .find(".txt-error").length
  //       ) {
  //         $(errTexr).insertAfter(".noEmpty" + i);
  //       }
  //
  //       $(".noEmpty" + i).css({
  //         "border-color": "red",
  //         "box-shadow": "0px 0px 2px red"
  //       });
  //       error = 1;
  //     } else {
  //       $(".noEmpty" + i).css({
  //         "border-color": "lightgray",
  //         "box-shadow": "0px 0px 0px lightgray"
  //       });
  //     }
  //   }
  //
  //   if (error == 1) {
  //     return false;
  //   } else {
  //     var cardList = [];
  //
  //     $(".panNum").each(function(index) {
  //       var cardInfo = {};
  //       cardInfo.panNo = $(this).val();
  //       cardInfo.Cvv2 = $(".cvv2")
  //         .eq(index)
  //         .val();
  //       cardInfo.Track1 = $(".track1")
  //         .eq(index)
  //         .val();
  //       cardInfo.Track2 = $(".track2")
  //         .eq(index)
  //         .val();
  //       cardInfo.pin = $(".pin")
  //         .eq(index)
  //         .val();
  //
  //       var month = $(".month")
  //         .eq(index)
  //         .val();
  //       var year = $(".year")
  //         .eq(index)
  //         .val();
  //
  //       cardInfo.ExDate = year + "/" + month;
  //       cardInfo.status = "0";
  //       cardInfo.RRN = "-";
  //
  //       cardList.push(cardInfo);
  //     });
  //
  //     var jsonData = JSON.stringify({
  //       // token ?
  //       token: "1212265645bbhfklgjckvm",
  //       email: email,
  //       list: cardList
  //     });
  //   }
  //
  //   $(".load-content").show();
  //   $.ajax({
  //     url: panUploadAddress,
  //     type: "POST",
  //     dataType: "json",
  //     data: jsonData,
  //     contentType: "application/json",
  //     datasrc: "",
  //     headers: {
  //       Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
  //     },
  //
  //     success: function(data) {
  //       $(".load-content").hide();
  //       if (data.report.length == 0) {
  //         $(".table-body").html("");
  //         $(".alert-box").css("display", "none");
  //         toastr.success("ثبت کارت ها با موفقیت انجام شد");
  //       } else {
  //         $(".table-body").html("");
  //         data.report.forEach(function(el) {
  //           var markup = `
  //             <tr>
  //               <td>${el}</td>
  //             </tr>
  //             `;
  //           $(".table-body").append(markup);
  //         });
  //         $(".alert-box").css("display", "block");
  //       }
  //       $(".form-control").val("");
  //     },
  //     error: function(jqXHR, textStatus, errorThrown) {
  //       $(".load-content").hide();
  //       $(".table-body").html("");
  //       $(".alert-box").css("display", "none");
  //       console.log(jqXHR);
  //       console.log(errorThrown);
  //       if (jqXHR.status == 401) {
  //         window.location.href = "login.html";
  //       }
  //       if (jqXHR.status == 500) {
  //         toastr.error("خطا در برقراری ارتباط با سرور");
  //       }
  //       toastr.error("خطا در برقراری ارتباط با سرور");
  //     }
  //   });
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

  //----------------- REMOVE LOADING -------------------
  setTimeout(function() {
    $("body")
      .find("#loading-main")
      .remove();
  }, 0);

  //------------------ FORMAT NUMBER -------------------
  // $("input.formatNumber").keyup(function(event) {
  //   // skip for arrow keys
  //   if (event.which >= 37 && event.which <= 40) return;
  //
  //   // format number
  //   $(this).val(function(index, value) {
  //     return value.replace(/\D/g, "");
  //   });
  // });

  //------------------- RESET INPUT -----------------
  // $("input").keyup(function() {
  //   $(this).css({
  //     "border-color": "#ccc",
  //     "box-shadow": "inset 0 1px 1px rgba(0,0,0,.075)"
  //   });
  // });
});

function onDrop(){
    let ext = $('#uploadPan').val().split('.').pop().toLowerCase();
    if($.inArray(ext, ['xlsx']) == -1) {
        toastr.error("شما مجاز به انتخاب فایل اکسل می باشید");
        $('#uploadPan').val('');
        return false;
    }

    //$("#message").empty();
    //$("#file_error2").empty();
    let file_size = $('#uploadPan')[0].files[0].size;
    if(file_size>20000000) {
        alert("حداکثر حجم فایل مجاز ۲۰ مگابایت می باشد.");
        $('#uploadPan').val('');
        //$(".demoInputBox").css("border-color","#FF0000","marginTop","-20px");
        return false;
    }

    $(".uploaded").removeClass('d-none').addClass('d-block');
    $("#fileName").text($("#uploadPan").val());
    $("#upload").addClass('d-none').removeClass('d-block');
}

function removeFile(){

    $(".uploaded").removeClass('d-block').addClass('d-none');
    $("#fileName").text("");
    $("#upload").addClass('d-block');
    $('#uploadPan').val('');
}
