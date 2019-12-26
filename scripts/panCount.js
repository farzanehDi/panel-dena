$(document).ready(function() {
  //------------------ SET LOCATION HASH -------------------
  window.location.hash = "mainPage";

  $("#inlineDatepickerWithMinMax").persianDatepicker({
    altField: "#inlineDatepickerWithMinMaxAlt",
    altFormat: "YYYY MM DD HH:mm:ss",
    minDate: 1416983467029,
    maxDate: 1419983467029
  });
  //----------------- REMOVE LOADING -------------------
  setTimeout(function() {
    $("body")
      .find("#loading-main")
      .remove();
  }, 0);
});
