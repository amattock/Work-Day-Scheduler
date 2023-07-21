var displayCurrentDay = document.querySelector("#currentDay");
var currentDay = moment();
displayCurrentDay.textContent = currentDay.format("dddd, MMMM Do YYYY");

// time blocks for working hours
var timeBlock = $(".time-block").addClass("row");
var blockText = $("<p>").addClass("description");
timeBlock.append(blockText);

// currentHour refrences format() that returns string 
var currentHour = parseInt(moment().format("H"));

// when page is refreshed, saved events remain
var loadEvents = function (timeSlots) {

  // elements are different time instances
  timeSlots.forEach((element) => {
    console.log(element);
    let text = localStorage.getItem(parseInt(element.time));
    console.log(text);
    if (text) {
      element.text.val(text);
    }
  });
};

// fetch events variable uses funtion to refrences time by "id" atributes
var fetchEvents = function () {
  var tempArr = [];
  $("textarea").each(function (index, elem) {
    tempArr.push({
      time: $(elem).attr("id"),
      text: $(elem),
    });
  });
  loadEvents(tempArr);
};

// function refrences CSS past, future and present by color variation
$("textarea").each(function () {
  var $this = $(this);
  var id = parseInt($this.attr("id"));

  if (id < currentHour) {
    $(this).addClass("past");
  }
  if (id > currentHour) {
    $(this).addClass("future");
  }
  if (id === currentHour) {
    $(this).addClass("present");
  }
});

// ".click" and ".preventdefault" save events on load
$("button.saveBtn").click(function (event) {
  event.preventDefault();

  // $(this) current button being clicked
  var $element = $(this).siblings("textarea");
  // var "time" is console logged 
  var time = $element.attr("id");
  console.log(time);
  // $.val() gets text context
  var text = $element.val().trim();
  console.log(text);

  // saves variables time and text to events to "localStorage"
  if (time && text !== "") {
    console.log(time, text);
    localStorage.setItem(time, text);
  }
});

$(".saveBtn").hover(function () {
  $(this).addClass("saveBtn:hover");
});

fetchEvents();