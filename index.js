var i = 0; //the variable is set to zero paragraph

function read() {
  if (!i) {
    //if paragrapgh not equal to zero

    document.getElementById("more").style.display = "inline";

    document.getElementById("read").innerHTML = "Read less";
    i = 1; //indicates paragraph to be in 'read more' mode.
  } else {
    document.getElementById("more").style.display = "none";

    document.getElementById("read").innerHTML = "Read more";
    i = 0; //indicates paragraph to be in 'read less' mode.
  }
}
