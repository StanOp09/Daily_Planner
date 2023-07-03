$(document).ready(function () {
  // Display current day at the top of the calendar
  var currentDate = dayjs().format("dddd, MMMM D, YYYY, h:mm:ss a");
  $("#currentDay").text(currentDate);
  
  // Save button click event
  $(".saveBtn").on("click", function () {
    var timeblockId = $(this).parent().attr("id");
    var textContent = $(this).siblings(".description").val();
    localStorage.setItem(timeblockId, textContent);
  });
  
  // Load saved events from local storage
  $(".time-block").each(function () {
    var timeblockId = $(this).attr("id");
    var savedText = localStorage.getItem(timeblockId);
    if (savedText !== null) {
      $(this).find(".description").val(savedText);
    }
  });
  
  // Update timeblock colors based on current time
  function updateTimeblockColors() {
    var currentHour = dayjs().hour();
  
    $(".time-block").each(function () {
      var hour = parseInt($(this).attr("id").split("-")[1]);
  
      if (hour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (hour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }
  
  updateTimeblockColors();
  });