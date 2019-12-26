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

        $('#loading').removeClass('d-none');

        let formData = new FormData();
        formData.append('section', 'general');
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

                if(data.status==0){
                    toastr.success("آپلود فایل با موفقیت انجام شد");
                }else {
                    toastr.error(data.msg);
                }
                // console.log(data);
                $('#uploadPan').val('');
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


  //----------------- REMOVE LOADING -------------------
  setTimeout(function() {
    $("body")
      .find("#loading-main")
      .remove();
  }, 0);

});

function onDrop(){

    let ext = $('#uploadPan').val().split('.').pop().toLowerCase();
    if($.inArray(ext, ['xlsx','xls']) == -1) {
        toastr.error("شما مجاز به انتخاب فایل اکسل می باشید");
        $('#uploadPan').val('');
        return false;
    }


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
