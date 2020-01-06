var hashLoad = false;
var token, role;

function clearCookie(cookie) {
  document.cookie = cookie + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
}

//----------------- GET COOKIE TOKEN -------------------
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

//----------------- GET COOKIE ROLE -------------------
function getCookieRole(role) {
  var name = role + "=";
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

//----------------- AJAX -------------------
function ajaxload() {
  $(".main .menubar ul li ")
    .find("a.title_menu")
    .click(function(e) {
      e.preventDefault();
      // history.replaceState(undefined, undefined, "#mainPage");
      let qs = $(this).attr("href");
      qs = qs + ".html";
      $(".ajax_container").load(qs, function(res, state, jqXHR) {});

      hashLoad = true;

      token = getCookie("AuthorizationToken");
      role = getCookieRole("role");

      // if (role.length) {
      // role = JSON.parse(role);
      // }

      // !!!!!!!!!!!! for testin !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      if (!token || !role) {
        window.location.href = "login.html";
        clearCookie("AuthorizationToken");
        clearCookie("role");
      }
    });
}

ajaxload();

/************* Hash change ***************/

function homepage() {
  $(".ajax_container").load("mainPage.html");
}

function locationHashChanged() {
  var h = location.hash.substr(1);
  hashLoad = false;

  $("ul.list-sidebar li a")
    .closest("li")
    .removeClass("page-active");
  $("ul.list-sidebar li a")
    .closest("li .sub-menu")
    .removeClass("in");
  $("ul.list-sidebar li a")
    .closest("li .sub-menu")
    .parent()
    .find("span.fa-chevron-left")
    .removeClass("menu-expand");

  if (location.hash == "" || location.hash == "#mainPage") {
    homepage();
  }
  if (location.hash == "#organizeOrderRegistration") {
    $(".ajax_container").load("organizeOrderRegistration.html");
  }

  // if (location.hash == "#addUsers") {
  //   $(".ajax_container").load("addUsers.html");
  // }
  if (location.hash == "#uploadedDesign") {
    $(".ajax_container").load("uploadedDesign.html");
  }

  if (location.hash == "#products") {
    $(".ajax_container").load("products.html");
  }

  if (location.hash == "#categories") {
    $(".ajax_container").load("categories.html");
  }

  if (location.hash == "#requests") {
    $(".ajax_container").load("requests.html");
  }

  if (location.hash == "#options") {
    $(".ajax_container").load("options.html");
  }

  if (location.hash == "#orders") {
    $(".ajax_container").load("orders.html");
  }

  if (location.hash == "#cart") {
    $(".ajax_container").load("cart.html");
  }

  if (location.hash == "#giftRecAddress") {
    $(".ajax_container").load("giftRecAddress.html");
  }

  if (location.hash == "#addPersonUsers") {
    $(".ajax_container").load("addPersonUsers.html");
  }

  if (location.hash == "#addCompanyUsers") {
    $(".ajax_container").load("addCompanyUsers.html");
  }

  if (location.hash == "#systemStatus") {
    $(".ajax_container").load("systemStatus.html");
  }

  if (location.hash == "#panUpload") {
    $(".ajax_container").load("panUpload.html");
  }
  if (location.hash == "#billingID") {
    $(".ajax_container").load("billingID.html");
  }
  if (location.hash == "#cardManagement") {
    $(".ajax_container").load("cardManagement.html");
  }
  if (location.hash == "#sendSMS") {
    $(".ajax_container").load("sendSMS.html");
  }
  if (location.hash == "#appUserList") {
    $(".ajax_container").load("appUserList.html");
  }
  if (location.hash == "#userManagement") {
    $(".ajax_container").load("userManagement.html");
  }
  if (location.hash == "#textChange") {
    $(".ajax_container").load("textChange.html");
  }
  if (location.hash == "#customerGuide") {
    $(".ajax_container").load("customerGuide.html");
  }
  if (location.hash == "#information") {
    $(".ajax_container").load("information.html");
  }
  if (location.hash == "#searchBill") {
    $(".ajax_container").load("searchBill.html");
  }
  if (location.hash == "#KadoonaOrder") {
    $(".ajax_container").load("KadoonaOrder.html");
  }
  if (location.hash == "#cardBlocking") {
    $(".ajax_container").load("cardBlocking.html");
  }
  if (location.hash == "#activateGroupCard") {
    $(".ajax_container").load("activateGroupCard.html");
  }
  if (location.hash == "#chargeGroupCard") {
    $(".ajax_container").load("chargeGroupCard.html");
  }
  if (location.hash == "#cardProductionInformation") {
    $(".ajax_container").load("cardProductionInformation.html");
  }
  if (location.hash == "#limitations") {
    $(".ajax_container").load("limitations.html");
  }
    if (location.hash == "#activateCard") {
        $(".ajax_container").load("activateCard.html");
    }
    if (location.hash == "#orderSms") {
        $(".ajax_container").load("orderSms.html");
    }
    if (location.hash.split('?')[0] == "#orderDetails") {
        $(".ajax_container").load("orderDetails.html");
    }
    if (location.hash.split('?')[0] == "#promotionalText") {
        $(".ajax_container").load("promotionalText.html");
    }
    if (location.hash.split('?')[0] == "#serviceStatus") {
        $(".ajax_container").load("serviceStatus.html");
    }
    if (location.hash.split('?')[0] == "#systemConstraints") {
        $(".ajax_container").load("systemConstraints.html");
    }
    if (location.hash.split('?')[0] == "#matrixReport") {
        $(".ajax_container").load("matrixReport.html");
    }
    if (location.hash.split('?')[0] == "#siteService") {
        $(".ajax_container").load("siteService.html");
    }
    if (location.hash.split('?')[0] == "#uploadApp") {
        $(".ajax_container").load("uploadApp.html");
    }
    if (location.hash.split('?')[0] == "#siteBanner") {
        $(".ajax_container").load("siteBanner.html");
    }
    if (location.hash.split('?')[0] == "#specialPic") {
        $(".ajax_container").load("specialPic.html");
    }

  $("ul.list-sidebar li a").each(function() {
    if (h == "") {
      h = "mainPage";
      hashLoad = true;
    }
    var attrHref = $(this).attr("href");
    if (attrHref == h) {
      $(this)
        .closest("li")
        .addClass("page-active");
      $(this)
        .closest("li .sub-menu")
        .addClass("in");
      $(this)
        .closest("li .sub-menu")
        .parent()
        .find("span.fa-chevron-left")
        .addClass("menu-expand");
      $(this)
        .closest("li .sub-menu li")
        .removeClass("active");
    }
  });
}

$(function() {
  _loadOnHashChange();
  $(window).trigger("hashchange");

  $("#current_date").text(
    moment()
      .locale("fa")
      .format("ddd") +
      "  " +
      moment()
        .locale("fa")
        .format("jD  jMMMM  jYYYY")
  );
});

var _loadOnHashChange = function() {
  $(window).on("hashchange", function() {
    if (hashLoad) {
      hashLoad = false;
      return true;
    }
    locationHashChanged();

    token = getCookie("AuthorizationToken");
    role = getCookieRole("role");

    // if (role.length) {
    // role = JSON.parse(role);
    // }
    if (!token || !role) {
      window.location.href = "login.html";
      clearCookie("AuthorizationToken");
      clearCookie("role");
    }
  });

  
};
