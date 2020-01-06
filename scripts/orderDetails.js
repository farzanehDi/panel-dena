$(document).ready(function(e) {


    //------------------ SET LOCATION HASH -------------------

    order();
    cartsItem();
    // $(".load-content").hide();

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


    //----------------- REMOVE LOADING -------------------
    setTimeout(function() {
        $("body")
            .find("#loading-main")
            .remove();
    }, 0);



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
            x.setAttribute("width", "150px");
            x.setAttribute("height", "85px");
            x.style.border="solid lightgray 1px";
            x.setAttribute("alt", "تصویر محصول");
            x.className="changeImg";
            $(x).insertBefore($((`#${objFileInput.closest('div').id}`)).find('.removeImg'));

            $((`#${objFileInput.closest('div').id}`)).find('label').addClass('d-none');
            $((`#${objFileInput.closest('div').id}`)).find('.removeImg').removeClass('d-none');
            $((`#${objFileInput.closest('div').id}`)).find('.updateImg').removeClass('d-none').addClass('d-flex');
            // $((`#${objFileInput.closest('div').id}`)).css('height','80px');

        };
        fileReader.readAsDataURL(objFileInput.files[0]);
    }
}

function removeImg(removeClass){

    $(`#${removeClass.closest('div').id}`).find('label').removeClass('d-none');
    // $(`#${removeClass.closest('.parent').id}`).find('.sendBtn').addClass('d-none');
    $(`#${removeClass.closest('div').id}`).find('.removeImg').addClass('d-none');
    $(`#${removeClass.closest('div').id}`).find('.updateImg').addClass('d-none').removeClass('d-flex');
    $(`#${removeClass.closest('div').id}`).find('input').val('');
    $(`#${removeClass.closest('div').id}`).find('img').remove();


}

function order(){
    $(".load-content").show();
    const urlParams = new URLSearchParams(location.hash.split('?')[1]);
    const id = urlParams.get('id');

    fetch(ordersAddress+'?order_id='+id, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {
            $(".load-content").hide();
            // console.log(data);
            let orderStatus;

            if(data[0].state=='pending'){
                orderStatus='در حال انتظار';

            }else if(data[0].state=='done'){

                orderStatus='انجام شده';

            }else if(data[0].state=='cancel'){

                orderStatus='لغو شده';

            }else if(data[0].state=='processing'){

                orderStatus='تایید شده';

            }else if(data[0].state=='failed'){

                orderStatus='خطا در پرداخت';

            }else if(data[0].state=='cancel'){

                orderStatus='لغو توسط کاربر';

            }else if(data[0].state=='pay'){

                orderStatus='پرداخت شده';

            }else if(data[0].state=='reject'){

                orderStatus='رد شده';

            }else if(data[0].state=='waiting'){

                orderStatus='در انتظار چاپ';

            }else if(data[0].state=='sending'){

                orderStatus='در حال ارسال';

            }else if(data[0].state=='done'){

                orderStatus='تکمیل شده';

            }else if(data[0].state=='error'){

                orderStatus='خطا در ارتباط';

            }else {

                orderStatus=`${data[0].state}`

            }

            // if(data[0].state=='pay'){
            //     $('.sectionStatus').removeClass('d-none');
            // }else {
            //     $('.sectionStatus').removeClass('d-none');
            // }
            $('#createdAt').text(data[0].created_at);
            $('#buyer').text(data[0].fname+" "+data[0].lname);
            $('#orderStatus').text(orderStatus);
            $('#orderId').text(data[0].id);
            $('#orderPrice').text(data[0].amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $('#ordercomment').text(data[0].comment==''?'پیغامی گذاشته نشده است':data[0].comment);


        });
    }).catch(async (err) => {
            $(".load-content").hide();
            console.log("error to get order details")
        }

    );
}

function cartsItem(){
    $(".load-content").show();
    const urlParams = new URLSearchParams(location.hash.split('?')[1]);
    const id = urlParams.get('id');

    fetch(carts+'?order_id='+id, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {

            // console.log(data);
            $(".load-content").hide();
            $(".orderSection").html('');
            await data.result.map((item,index)=>{

                $(".orderSection").append(`<div class="section p-lg-3 p-2 mb-3">

                             <div class="d-flex align-items-stretch justify-content-between flex-wrap">
                                 <div class="col-lg-5 col-12">
                                     <p class="pb-1 border-bottom text-right">محصول</p>
                                     <div class="d-flex align-items-center  h-75 ">
                                         <img src="${item.pic!=null?item.pic:'./images/noImage.png'}" class="img-fluid " >&nbsp;
                                         <span class="text-info linkCart" onclick="itemDetails(${item.id})">${item.name}</span>
                                     </div>
                                 </div>
                                 <div class="col-lg-3 col-6 text-right">
                                     <p class=" pb-1 border-bottom">تعداد</p>
                                     <p class="d-flex align-items-center h-75 ">${item.num} عدد</p>
                                 </div>

                                 <div class="col-lg-3 col-6 text-right">
                                     <p class=" pb-1 border-bottom">جمع کل</p>
                                     <p class="d-flex align-items-center  h-75 ">${item.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان</p>
                                 </div>
                             </div>
                             <p class="mt-4 col-12 text-right"><span class="text-danger">متن کارت</span>: ${item.desc}</p>
                             <p class="mt-2 col-12 text-right"><span class="text-danger">آدرس گیرنده</span>: ${item.province} ${item.city} ${item.address}</p>
                             <p class="mt-2 col-12 text-right"><span class="text-danger">روش ارسال</span>: ${item.shipping_type}</p>
                             <p class="mt-2 col-12 text-right"><span class="text-danger">هزینه ارسال</span>: ${item.shipping_cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان</p>


                             <div class="col-12 mt-4 mb-1 text-right ">
                                 <a  data-toggle="collapse" href="#collapseExample${index}" role="button" class="text-info"
                                     aria-expanded="false" aria-controls="collapseExample">
                                     <i class="fas fa-edit">&nbsp;</i>
                                     ویرایش سفارش
                                 </a>

                                 <div class="collapse" id="collapseExample${index}">
                                     <div class="card card-body border-info" >

                                         <div class="d-flex align-items-center justify-content-around flex-wrap">
                                             <div class="d-flex flex-column align-items-center justify-content-center col-lg-5 col-12" id="${item.id}">
                                                 <button class="removeImg p-0 d-none btn btn-danger"
                                                         onClick="removeImg(this)" >
                                                     &times;
                                                 </button>
                                                 <button class="updateImg d-none btn btn-info pt-1 pb-1 align-items-center justify-content-center"
                                                         onClick="updateOrderImage(this)" >
                                                     <img src="./images/spinner.gif" class="img-fluid d-none loading"  alt="loading">&nbsp;
                                                     ویرایش تصویر
                                                 </button>

                                                 <label class="btn btn-info text-center " >
                                                     <span class="m-0"><i class="fas fa-upload">&nbsp;</i>تغییر تصویر</span>
                                                     <input type='file' class="form-control d-none" onChange="showPreview(this);"
                                                            accept="image/*" />
                                                 </label>
                                             </div>

                                             <div class="col-lg-7 col-12" data-id="${item.id}">
                                                 <label class="float-right">متن پیغام</label>
                                                 <input class="form-control" value="${item.desc}">
                                                 <button class="updateTxt btn btn-info pt-1 mt-1 pb-1 align-items-center justify-content-center d-flex align-items-center justify-content-center"
                                                         onClick="updateOrderTxt(this)" >
                                                     <img src="./images/spinner.gif" class="img-fluid d-none loading"  alt="loading">&nbsp;
                                                     ویرایش متن
                                                 </button>
                                             </div>
                                         </div>

                                     </div>
                                 </div>
                             </div>
                     </div>`);

            });


        });
    }).catch(async (err) => {
            $(".load-content").hide();
            console.log("error to get cart")
        }

    );
}

function changeStatus(){

    const urlParams = new URLSearchParams(location.hash.split('?')[1]);
    const id = urlParams.get('id');

        fetch(adminAction+id, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
            },

        }).then(async (response) =>{
            await response.json().then(async (data) => {
                // console.log(data);
                if(data==0){
                    // orderStatusFn()
                }else{
                    toastr.error(data.message);
                }
            });
        }).catch(async (err) => {
                $('#statusChangeBtn img').addClass('d-none');
                // toastr.error('متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش نمایید');
                console.log("error to post register pan number")
            }
        );

}

function sendOrderSmsFn(){

    const urlParams = new URLSearchParams(location.hash.split('?')[1]);
    const id = urlParams.get('id');

    fetch(`${sendOrderSms}?orderid=${id}&orderStatus=${$('#changeStatus').val()}`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {

            console.log(data);
            // if(data==0){
            //     orderStatusFn()
            // }else{
            //     toastr.error(data.message);
            // }

        });
    }).catch(async (err) => {
            $('#statusChangeBtn img').addClass('d-none');
            // toastr.error('متاسفانه مشکلی پیش آمده است لطفا بعدا تلاش نمایید');
            console.log("error to send sms")
        }
    );

}

function updateOrderImage(cart) {


    $('.updateImg img').removeClass('d-none');

    let formData = new FormData();
    formData.append("cart_id", cart.closest('div').id);
    formData.append("pic",$(`#${cart.closest('div').id}`).find('input').prop("files")[0]);


    fetch(updatePicOfCart, {
        method: "POST",
        body:formData,
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {
            $('.updateImg img').addClass('d-none');
            // console.log(data);

            if(data.status==100){
                toastr.success('عملیات با موفقیت انجام شد');
                cartsItem();
                // order();
            }else if(data.status==103){
                toastr.error('سفارش یافت نشد');
            }else if(data.status==101){
                toastr.error(data.validateError[0]);
            }else if(data.status==118){
                toastr.error('اجازه دسترسی تغییر عکس را ندارید');
            }else {
                toastr.error('خطا در ارسال اطلاعات');
            }
        });
    }).catch(async (err) => {
            $('.updateImg img').addClass('d-none');

            console.log("error to update image cart")
        }

    );
}



function updateOrderTxt(text) {


    $('.updateTxt img').removeClass('d-none');


    fetch(updateTextOfCart+'?cart_id='+$(text).closest('div').data('id')+'&text='+$(text).closest('div').find('input').val(), {
        method: "POST",

        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {
            $('.updateTxt img').addClass('d-none');
            // console.log(data);

            if(data.status==100){
                toastr.success('تغییر متن با موفقیت انجام شد');
                cartsItem();
                // order();
            }else if(data.status==103){
                toastr.error('سفارش یافت نشد');
            }else if(data.status==101){
                toastr.error(data.validateError[0]);
            }else {
                toastr.error('خطا در ارسال اطلاعات');
            }
        });
    }).catch(async (err) => {
            $('.updateTxt img').addClass('d-none');

            console.log("error to update image cart")
        }

    );
}

function orderStatusFn() {

    if($('#changeStatus').val()==''){
        $('#changeStatus').addClass('borderRed');
        return false;
    }else {
        $('#changeStatus').removeClass('borderRed');
    }

    $('#statusChangeBtn img').removeClass('d-none');
    const urlParams = new URLSearchParams(location.hash.split('?')[1]);
    const id = urlParams.get('id');
    fetch(orderStatus + '?status=' + $('#changeStatus').val() + '&order_id=' + id, {
        method: "POST",
        // body:jsonData,
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) => {
        await response.json().then(async (data) => {
            $('#statusChangeBtn img').addClass('d-none');

            if (data.status == 100) {
                toastr.success('عملیات با موفقیت انجام شد');
                sendOrderSmsFn(); //--send sms for customer---
                if($('#changeStatus').val()=='processing'){
                    changeStatus(); //----service for register pan number
                }
                order();
            } else if (data.status == 103) {
                toastr.error('سفارش یافت نشد');
            } else if (data.status == 101) {
                toastr.error(data.validateError[0]);
            } else {
                toastr.error('خطا در ارسال اطلاعات');
            }
        });
    }).catch(async (err) => {
            $('#statusChangeBtn img').addClass('d-none');
            console.log("error to post order status")
        }
    );
}

function itemDetails(id){

    fetch(carts+'?cart_id='+id, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },

    }).then(async (response) =>{
        await response.json().then(async (data) => {

            // console.log(data);

            if(data.status==100){
                $('#cartImage').attr('src',data.result[0].pic);
                $('#cartName').val(data.result[0].name);
                $('#cartCode').val(data.result[0].code);
                $('#cartCost').val(data.result[0].cost);
                $('#cartId').val(data.result[0].productId);
                $('#cartStatus').val(data.result[0].state=='empty'?'ناموجود':'موجود');
                $('#cartDescription').val(data.result[0].description);

                $("#cartDetailsModal").modal("show");
            }else {
                toastr.error('موردی یافت نشد')
            }


        });
    }).catch(async (err) => {

            console.log("error to get cart")
        }

    );
}