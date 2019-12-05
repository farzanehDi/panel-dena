var kadona_baseURL = "https://46.209.114.153";
// var ytciran_baseURL = "https://cors-anywhere.herokuapp.com/http://ytciran.ir";
var ytciran_baseURL = "http://ytciran.ir";
// PAN COUNT SECTION
// SYSTEM STATUS SECTION
var panCountAddress = kadona_baseURL + "/kadona/panel/mgm/pan";
var smsPanelManagerAddress = kadona_baseURL + "/kadona/api/SmsPanelManger";

// APP USER LIST SECTION
// USER MANAGMENT SECTION
var appManagerAddress = kadona_baseURL + "/kadona/api/appManager";

// BILLING ID SECTION
var createBillAddress = kadona_baseURL + "/kadona/api/createBill";

// CARD MANAGMENT SECTION
var checkPanAddress = kadona_baseURL + "/kadona/api/checkPan";

// CUSTOMER GUIDE SECTION
var errorMessageAddress = kadona_baseURL + "/kadona/api/errorMessage";

// FINAL LIST SECTION
var getAllOrdersAddress = kadona_baseURL + "/kadona/getallorders";
var ordersByDateAddress = kadona_baseURL + "/kadona/ordersbydate";

// INFORMATION SECTION
var getReportAddress = kadona_baseURL + "/kadona/api/report";

// KADOONA ORDER SECTION
// ORGANIZE ORDER REGISTRATION SECTION
var adminActionAddress = kadona_baseURL + "/kadona/api/adminAction";

// ORGAN ORDER SECTION
var organOrderAddress = kadona_baseURL + "/kadona/panel/orders/orgorders";

// PAN UPLOAD SECTION
var panUploadAddress = kadona_baseURL + "/kadona/api/adminAction";

// SEARCH BILL SECTION
var searchBillAddress = kadona_baseURL + "/kadona/api/bills";

// SEND SMS SECTION
var sendSmsAddress = kadona_baseURL + "/kadona/api/sendsms";

// TEXT CHANGE SECTION
var appUserAddress = kadona_baseURL + "/kadona/api/appUser";

// HANDLE ORDERS
var handleOrdersAddress = kadona_baseURL + "/kadona/api/adminAction/103";

// OTHER SECTIONS
var productsAddress = ytciran_baseURL + "/api/products";
var cartsAddress = ytciran_baseURL + "/api/carts";
var ordersAddress = ytciran_baseURL + "/api/orders";
var destinationsAddress = ytciran_baseURL + "/api/destinations";
var customsAddress = ytciran_baseURL + "/api/customs";
var usersAddress = ytciran_baseURL + "/api/users";
var catsAddress = ytciran_baseURL + "/api/cats";
var optionsAddress = ytciran_baseURL + "/api/options";
var requestsAddress = ytciran_baseURL + "/api/requests";

//---------------------------------------------------------
let blockedCard = kadona_baseURL + "...";
let blockedList = kadona_baseURL + "...";
let uploadPan = kadona_baseURL +"/kadona/api/adminAction";
let activePan = kadona_baseURL +"/kadona/api/getToken?cartid=";
let userStatus = ytciran_baseURL +"/api/userStatus";
let userRole = ytciran_baseURL +"/api/userRole";
let updateCat = ytciran_baseURL +"/api/updateCat";
let deleteCat = ytciran_baseURL +"/api/delCat";
let logOut=ytciran_baseURL +"/api/logout";
let updateProduct=ytciran_baseURL +"/api/updateProduct";
let delProduct=ytciran_baseURL +"/api/delProduct";
let productStatus=ytciran_baseURL +"/api/productStatus";
let updateOption=ytciran_baseURL +"/api/updateOption";
let delOption=ytciran_baseURL +"/api/delOption";
let delOrder=ytciran_baseURL +"/api/delOrder";
let carts=ytciran_baseURL +"/api/carts";
let orderStatus=ytciran_baseURL +"/api/orderStatus";
let updatePicOfCart=ytciran_baseURL +"/api/updatePicOfCart";
let updateTextOfCart=ytciran_baseURL +"/api/updateTextOfCart";
let requestStatus=ytciran_baseURL +"/api/requestStatus";
let delRequest=ytciran_baseURL +"/api/delRequest";
let updateCostOfCard=ytciran_baseURL +"/api/updateCostOfCard";
let updateLimitation=ytciran_baseURL +"/api/updateLimitation";
let getCostOfCard=ytciran_baseURL +"/api/getCostOfCard";
let getLimitation=ytciran_baseURL +"/api/getLimitation";
let adminAction=kadona_baseURL +"/kadona/api/adminAction/103?orderid=";
