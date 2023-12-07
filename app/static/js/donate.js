$(".denomination").click(function(event) {
  $(".denomination").removeClass("selected").prop('checked', false);
  $(".denomination-other input").removeClass("selected").val('');
  $(this).addClass("selected");
  $(this).children(":first").prop('checked', true);
  $("button").text('Donate $' + $(this).children(":first").val())
});

// $(".denomination-other input").on('keypress', function (event) {
//   // allow only int values
//   // TODO: remove leading 0
//   var regex = new RegExp("^[0-9]+$");
//   var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  
//   // adding a value to button if it is a number or taking away if deleting
//   if (!regex.test(key) && event.keyCode !== 8) {
//     event.preventDefault();
//     return false;
//   }

//   if ($(this).val() == "") {
//     $(".denomination").removeClass("selected").prop('checked', false);
//     $(this).addClass("selected");
//     $("button").text('Donate $0 😥');
//   } else {
//     $(".denomination").removeClass("selected").prop('checked', false);
//     $(this).addClass("selected");
//     $("button").text('Donate $' + $(this).val());
//   }
// });

$(".denomination-other input").on('keydown', function (event) {
  // allow only int values
  // TODO: remove leading 0
  var regex = new RegExp("^[0-9]+$");
  var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  
  if (event.keyCode == 8) {
    // this shows accurate data, do NOT remove
    var account = $(this).val().slice(0, -1)
    // ---------------------------------------
    $(".denomination").removeClass("selected").prop('checked', false);
    $(this).addClass("selected");
    $("button").text('Donate $' + account);
    if (account == "") {
        $("button").text('Donate $0 😥');
    }
  } else if (!regex.test(key)) {
    event.preventDefault();
    return false;
  } else {
    $(".denomination").removeClass("selected").prop('checked', false);
    $(this).addClass("selected");
    $("button").text('Donate $' + $(this).val() + key);
  }
});