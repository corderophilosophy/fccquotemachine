"use strict";
const c = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
const colors = {
  color: "",
  background: ""
};
const btn = document.getElementById("getQuote");
// const xhr = new XMLHttpRequest();
const quoteAPI = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous";

function pickColor() {
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += c[(Math.floor(Math.random() * 16))];
  }
  return color;
}

function invertColor() {
  let origColor = pickColor();
  colors.color = origColor;
  origColor = origColor.slice(1).toUpperCase();
  let r = parseInt(origColor.slice(0, 2), 16),
    g = parseInt(origColor.slice(2, 4), 16),
    b = parseInt(origColor.slice(4, 6), 16);
  let newR = (255 - r).toString(16),
    newG = (255 - g).toString(16),
    newB = (255 - b).toString(16);
  let newColor = "#" + newR + newG + newB;
  colors.background = newColor;
}

function changeColor() {
  const quoteWrapper = document.getElementById("quoteWrapper");
  invertColor();
  quoteWrapper.style.color = colors.color;
  quoteWrapper.style.background = colors.background;
}


function requestQuote() {
  $.ajax({
    url: quoteAPI,
    type: 'POST',
    data: {},
    dataType: 'json',
    success: function (data) {
      document.getElementById("quote").innerHTML = data.quote;
      document.getElementById("author").innerHTML = "-" + data.author;
    },
    error: function (err) {
      alert(err);
    },
    beforeSend: function (xhr) {
      xhr.setRequestHeader("X-Mashape-Authorization", "urwIsbBrGBmshvnwdbwnm1jO1kqwp1jsBokjsnCGSHEyjQ9Hcc");
    }
  });
}
btn.addEventListener("click", function () {
  requestQuote();
  changeColor();
}, false);