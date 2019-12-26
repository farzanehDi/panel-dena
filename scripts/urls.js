var noora_baseURL = "http://46.209.114.153:8866";
// var noora_baseURL = "https://cors-anywhere.herokuapp.com/http://ytciran.ir";
var pushna_baseURL = "http://pushna.ir";
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
var adminActionAddress = noora_baseURL + "/kadona/api/adminAction";

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
var productsAddress = pushna_baseURL + "/api/products";
var cartsAddress = pushna_baseURL + "/api/carts";
var ordersAddress = pushna_baseURL + "/api/orders";
var destinationsAddress = pushna_baseURL + "/api/destinations";
var customsAddress = pushna_baseURL + "/api/customs";
var usersAddress = pushna_baseURL + "/api/users";
var catsAddress = pushna_baseURL + "/api/cats";
var optionsAddress = pushna_baseURL + "/api/options";
var requestsAddress = pushna_baseURL + "/api/requests";

//---------------------------------------------------------
let blockedCard = noora_baseURL + "...";
let blockedList = noora_baseURL + "...";
let uploadPan = noora_baseURL +"/kadona/api/adminAction";
let activePan = noora_baseURL +"/kadona/api/getToken?cartid=";
let userStatus = pushna_baseURL +"/api/userStatus";
let userRole = pushna_baseURL +"/api/userRole";
let updateCat = pushna_baseURL +"/api/updateCat";
let deleteCat = pushna_baseURL +"/api/delCat";
let logOut=pushna_baseURL +"/api/logout";
let updateProduct=pushna_baseURL +"/api/updateProduct";
let delProduct=pushna_baseURL +"/api/delProduct";
let productStatus=pushna_baseURL +"/api/productStatus";
let updateOption=pushna_baseURL +"/api/updateOption";
let delOption=pushna_baseURL +"/api/delOption";
let delOrder=pushna_baseURL +"/api/delOrder";
let carts=pushna_baseURL +"/api/carts";
let orderStatus=pushna_baseURL +"/api/orderStatus";
let updatePicOfCart=pushna_baseURL +"/api/updatePicOfCart";
let updateTextOfCart=pushna_baseURL +"/api/updateTextOfCart";
let requestStatus=pushna_baseURL +"/api/requestStatus";
let delRequest=pushna_baseURL +"/api/delRequest";
let updateCostOfCard=pushna_baseURL +"/api/updateCostOfCard";
let updateLimitation=pushna_baseURL +"/api/updateLimitation";
let getCostOfCard=pushna_baseURL +"/api/getCostOfCard";
let getLimitation=pushna_baseURL +"/api/getLimitation";
let login=pushna_baseURL +"/api/login";
let adminAction=noora_baseURL +"/kadona/api/adminAction/103?orderid=";
let sendExcel=noora_baseURL +"/kadona/api/chargeManual?type=";
let getExcel=noora_baseURL +"/kadona/api/chargeManual/100?type=";
let promotionalTxt=noora_baseURL +"/kadona/api/sendsms/10?content=";
let getServiceStatus=noora_baseURL +"/kadona/api/adminAction/104";
let getAdminMobile=noora_baseURL +"/kadona/api/adminAction/105";
let postAdminMobile=noora_baseURL +"/kadona/api/adminAction/103?PhoneNo=";
let matrixReport=noora_baseURL +"/kadona/api/adminAction/102";
let getChargeLimitation=pushna_baseURL +"/api/getChargeLimitation";
let updateChargeLimitation=pushna_baseURL +"/api/updateChargeLimitation";
let getBuyFromSite=pushna_baseURL +"/api/getBuyFromSite";
let updateBuyFromSite=pushna_baseURL +"/api/updateBuyFromSite?buy_from_site=";
let getChargeFromSite=pushna_baseURL +"/api/getChargeFromSite";
let updateChargeFromSite=pushna_baseURL +"/api/updateChargeFromSite?charge_from_site=";
let getRegisterInSite=pushna_baseURL +"/api/getRegisterInSite";
let updateRegisterInSite=pushna_baseURL +"/api/updateRegisterInSite?register_in_site=";
let uploadAndroidApp=pushna_baseURL +"/api/uploadAndroidApp";
let getAndroidAppUrl=pushna_baseURL +"/api/getAndroidAppUrl";
let getPicOfChargePage=pushna_baseURL +"/api/getPicOfChargePage";
let updatePicOfChargePage=pushna_baseURL +"/api/updatePicOfChargePage";
let getPicOfGuidePage=pushna_baseURL +"/api/getPicOfGuidePage";
let updatePicOfGuidePage=pushna_baseURL +"/api/updatePicOfGuidePage";
let getPicOfTermPage=pushna_baseURL +"/api/getPicOfTermPage";
let updatePicOfTermPage=pushna_baseURL +"/api/updatePicOfTermPage";
let getPicOfAgentPage=pushna_baseURL +"/api/getPicOfAgentPage";
let updatePicOfAgentPage=pushna_baseURL +"/api/updatePicOfAgentPage";
let getPicOfAboutPage=pushna_baseURL +"/api/getPicOfAboutPage";
let updatePicOfAboutPage=pushna_baseURL +"/api/updatePicOfAboutPage";
let getSlidesOfHomePage=pushna_baseURL +"/api/getSlidesOfHomePage";
let updateSlidesOfHomePage=pushna_baseURL +"/api/updateSlidesOfHomePage";
let getSlidesOfBuyPage=pushna_baseURL +"/api/getSlidesOfBuyPage";
let updateSlidesOfBuyPage=pushna_baseURL +"/api/updateSlidesOfBuyPage";
