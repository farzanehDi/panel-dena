var noora_baseURL = "http://46.209.114.153:8866";
// var noora_baseURL = "https://cors-anywhere.herokuapp.com/http://ytciran.ir";
var site_baseURL = "http://pushna.ir";
// PAN COUNT SECTION
// SYSTEM STATUS SECTION
var panCountAddress = noora_baseURL + "/kadona/panel/mgm/pan";
var smsPanelManagerAddress = noora_baseURL + "/kadona/api/SmsPanelManger";

// APP USER LIST SECTION
// USER MANAGMENT SECTION
var appManagerAddress = noora_baseURL + "/kadona/api/appManager";

// BILLING ID SECTION
var createBillAddress = noora_baseURL + "/kadona/api/createBill";

// CARD MANAGMENT SECTION
var checkPanAddress = noora_baseURL + "/kadona/api/checkPan";

// CUSTOMER GUIDE SECTION
var errorMessageAddress = noora_baseURL + "/kadona/api/errorMessage";

// FINAL LIST SECTION
var getAllOrdersAddress = noora_baseURL + "/kadona/getallorders";
var ordersByDateAddress = noora_baseURL + "/kadona/ordersbydate";

// INFORMATION SECTION
var getReportAddress = noora_baseURL + "/kadona/api/report";

// KADOONA ORDER SECTION
// ORGANIZE ORDER REGISTRATION SECTION
var adminActionAddress = noora_baseURL + "/kadona/api/adminAction/107";

// ORGAN ORDER SECTION
var organOrderAddress = noora_baseURL + "/kadona/panel/orders/orgorders";

// PAN UPLOAD SECTION
var panUploadAddress = noora_baseURL + "/kadona/api/adminAction";

// SEARCH BILL SECTION
var searchBillAddress = noora_baseURL + "/kadona/api/bills";

// SEND SMS SECTION
var sendSmsAddress = noora_baseURL + "/kadona/api/sendsms";

// TEXT CHANGE SECTION
var appUserAddress = noora_baseURL + "/kadona/api/appUser";

// HANDLE ORDERS
var handleOrdersAddress = noora_baseURL + "/kadona/api/adminAction/103";

// OTHER SECTIONS
var productsAddress = site_baseURL + "/api/products";
var cartsAddress = site_baseURL + "/api/carts";
var ordersAddress = site_baseURL + "/api/orders";
var destinationsAddress = site_baseURL + "/api/destinations";
var customsAddress = site_baseURL + "/api/customs";
var usersAddress = site_baseURL + "/api/users";
var catsAddress = site_baseURL + "/api/cats";
var optionsAddress = site_baseURL + "/api/options";
var requestsAddress = site_baseURL + "/api/requests";

//---------------------------------------------------------
let blockedCard = noora_baseURL + "...",
blockedList = noora_baseURL + "...",
postalInfo = noora_baseURL +"/kadona/api/adminAction/108?orderid=0",
uploadPan = noora_baseURL +"/kadona/api/adminAction",
activePan = noora_baseURL +"/kadona/api/getToken?cartid=",
userStatus = site_baseURL +"/api/userStatus",
userRole = site_baseURL +"/api/userRole",
updateCat = site_baseURL +"/api/updateCat",
deleteCat = site_baseURL +"/api/delCat",
logOut=site_baseURL +"/api/logout",
updateProduct=site_baseURL +"/api/updateProduct",
delProduct=site_baseURL +"/api/delProduct",
productStatus=site_baseURL +"/api/productStatus",
updateOption=site_baseURL +"/api/updateOption",
delOption=site_baseURL +"/api/delOption",
delOrder=site_baseURL +"/api/delOrder",
carts=site_baseURL +"/api/carts",
orderStatus=site_baseURL +"/api/orderStatus",
updatePicOfCart=site_baseURL +"/api/updatePicOfCart",
updateTextOfCart=site_baseURL +"/api/updateTextOfCart",
requestStatus=site_baseURL +"/api/requestStatus",
delRequest=site_baseURL +"/api/delRequest",
updateCostOfCard=site_baseURL +"/api/updateCostOfCard",
updateLimitation=site_baseURL +"/api/updateLimitation",
getCostOfCard=site_baseURL +"/api/getCostOfCard",
getLimitation=site_baseURL +"/api/getLimitation",
login=site_baseURL +"/api/login",
adminAction=noora_baseURL +"/kadona/api/adminAction/103?orderid=",
sendExcel=noora_baseURL +"/kadona/api/chargeManual?type=",
getExcel=noora_baseURL +"/kadona/api/chargeManual/100?type=",
promotionalTxt=noora_baseURL +"/kadona/api/sendsms/10?content=",
getServiceStatus=noora_baseURL +"/kadona/api/adminAction/104",
getAdminMobile=noora_baseURL +"/kadona/api/adminAction/105",
postAdminMobile=noora_baseURL +"/kadona/api/adminAction/103?PhoneNo=",
matrixReport=noora_baseURL +"/kadona/api/adminAction/102",
getChargeLimitation=site_baseURL +"/api/getChargeLimitation",
updateChargeLimitation=site_baseURL +"/api/updateChargeLimitation",
getBuyFromSite=site_baseURL +"/api/getBuyFromSite",
updateBuyFromSite=site_baseURL +"/api/updateBuyFromSite?buy_from_site=",
getChargeFromSite=site_baseURL +"/api/getChargeFromSite",
updateChargeFromSite=site_baseURL +"/api/updateChargeFromSite?charge_from_site=",
getRegisterInSite=site_baseURL +"/api/getRegisterInSite",
updateRegisterInSite=site_baseURL +"/api/updateRegisterInSite?register_in_site=",
uploadAndroidApp=site_baseURL +"/api/uploadAndroidApp",
getAndroidAppUrl=site_baseURL +"/api/getAndroidAppUrl",
getPicOfChargePage=site_baseURL +"/api/getPicOfChargePage",
updatePicOfChargePage=site_baseURL +"/api/updatePicOfChargePage",
getPicOfGuidePage=site_baseURL +"/api/getPicOfGuidePage",
updatePicOfGuidePage=site_baseURL +"/api/updatePicOfGuidePage",
getPicOfTermPage=site_baseURL +"/api/getPicOfTermPage",
updatePicOfTermPage=site_baseURL +"/api/updatePicOfTermPage",
getPicOfAgentPage=site_baseURL +"/api/getPicOfAgentPage",
updatePicOfAgentPage=site_baseURL +"/api/updatePicOfAgentPage",
getPicOfAboutPage=site_baseURL +"/api/getPicOfAboutPage",
updatePicOfAboutPage=site_baseURL +"/api/updatePicOfAboutPage",
getSlidesOfHomePage=site_baseURL +"/api/getSlidesOfHomePage",
updateSlidesOfHomePage=site_baseURL +"/api/updateSlidesOfHomePage",
getSlidesOfBuyPage=site_baseURL +"/api/getSlidesOfBuyPage",
updateSlidesOfBuyPage=site_baseURL +"/api/updateSlidesOfBuyPage",
getSpecialOfBuyPage=site_baseURL +"/api/getSpecialOfBuyPage",
updateSpecialPicOfBuyPage=site_baseURL +"/api/updateSpecialPicOfBuyPage",
updateSpecialUrlOfBuyPage=site_baseURL +"/api/updateSpecialUrlOfBuyPage",
getNumberOfFailed=noora_baseURL +"/kadona/api/adminAction/106",
postNumberOfFailed=noora_baseURL +"/kadona/api/adminAction/106?count=",
sendOrderSms=noora_baseURL +"/kadona/api/adminAction/102";
