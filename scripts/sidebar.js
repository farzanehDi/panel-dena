$(document).ready(function() {
  $(".buttonBar").click(function() {
    $(this).toggleClass("change");
    $(".sidebar").toggleClass("open-menu");
    $(".menubar:before").css("width", "0");
    $(".main").toggleClass("menu-compact");
  });

  //add active class on menu
  $("ul.list-sidebar li").click(function(e) {
    $("li").removeClass("page-active");
    $(this).addClass("page-active");

    $(this)
      .siblings()
      .find("span.fa-chevron-left")
      .removeClass("menu-expand");
    $(this)
      .siblings()
      .find(".sub-menu")
      .removeClass("in");
    $(this)
      .siblings()
      .find(".sub-menu li")
      .removeClass("active");

    if (
      $(this)
        .parent()
        .hasClass("sub-menu")
    ) {
      $("li").removeClass("active");
      $(this).addClass("active");
    }
  });

  $("ul.list-sidebar li.panel a").click(function(e) {
    e.preventDefault();
    $(this)
      .find("span.fa-chevron-left")
      .toggleClass("menu-expand");
  });

  //------------------ GET COOKIE ROLE -------------------
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

  var role = getCookieRole("role");
  let links=document.querySelectorAll('li');
  // role = JSON.parse(role);

  switch (role) {
    case "owner":
      links.forEach(function(item) {
        if(item.classList.contains('owner')){
          item.classList.remove('d-none');
        }else {
          item.classList.add('d-none');

        }
      });

      break;
    case "admin":
      links.forEach(function(item) {
        if(item.classList.contains('admin')){
          item.classList.remove('d-none');
        }else {
          item.classList.add('d-none');

        }
      });
      break;
    case "editor":
      links.forEach(function(item) {
        if(item.classList.contains('editor')){
          item.classList.remove('d-none');
        }else {
          item.classList.add('d-none');

        }
      });
      break;
    case "agent":
      links.forEach(function(item) {
        if(item.classList.contains('agent')){
          item.classList.remove('d-none');
        }else {
          item.classList.add('d-none');

        }
      });
      break;

    default:
      return;
  }

  // for testing !!!!!!!!!!!!!!!!!!!!!!!!!!!
  // $(".SA,.PA,.MA,.OA,.APA").show();

  //   for (var i = 0; i < role.length; i++) {
  //     if (role[i] == "OA") {
  //       $(".OA").show();
  //     } else if (role[i] == "MA") {
  //       $(".MA").show();
  //     } else if (role[i] == "PA") {
  //       $(".PA").show();
  //     } else if (role[i] == "APA") {
  //       $(".APA").show();
  //     } else if (role[i] == "SA") $(".SA,.PA,.MA,.OA,.APA").show();
  //   }
  //------------------- SYSTEM STATUS OFF -----------------

  if (localStorage.getItem("status") == "off") {
    $(".main header").css("background", "#666");
    toastr.options = {
      timeOut: "1500"
    };
    toastr.info(" سیستم در حالت غیر فعال می باشد", "کاربر گرامی");
  }
});
