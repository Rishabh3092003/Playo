//<script>
var myIndex = 0;
carousel();
function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) { myIndex = 1 }
  x[myIndex - 1].style.display = "block";
  setTimeout(carousel, 2000); // Change image every 2 seconds
}

/*
    $(document).ready(function(){
      $(".profile .icon_wrap").click(function(){
        $(this).parent().toggleClass("active");
        $(".notifications").removeClass("active");
      });

      $(".notifications .icon_wrap").click(function(){
        $(this).parent().toggleClass("active");
         $(".profile").removeClass("active");
      });

      $(".show_all .link").click(function(){
        $(".notifications").removeClass("active");
        $(".popup").show();
      });

      $(".close").click(function(){
        $(".popup").hide();
      });
    });*/
//</script>

//-----------------------------------------search box----------------------------------
const SearchBox = document.querySelector(".SearchBox"),
  SelectButton = SearchBox.querySelector(".select-btn"),
  searchInp = SearchBox.querySelector("input"),
  options = SearchBox.querySelector(".options");

fetch('https://localhost:44370/api/Location/GetCities')
  .then(response => response.json())
  .then(jsonData => {
    let cityArray = jsonData.map(city => city.City);
  })
  .catch(error => console.error(error));

function addCountry(selectedCountry) {
  options.innerHTML = "";
  cityArray.forEach(country => {
    let isSelected = country == selectedCountry ? "selected" : "";
    let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
    options.insertAdjacentHTML("beforeend", li);
  });
}
addCountry();

function updateName(selectedLi) {
  searchInp.value = "";
  addCountry(selectedLi.innerText);
  SearchBox.classList.remove("active");
  SelectButton.firstElementChild.innerText = selectedLi.innerText;
}

searchInp.addEventListener("keyup", () => {
  let arr = [];
  let searchWord = searchInp.value.toLowerCase();
  arr = cityArray.filter(data => {
    return data.toLowerCase().startsWith(searchWord);
  }).map(data => {
    let isSelected = data == SelectButton.firstElementChild.innerText ? "selected" : "";
    return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
  }).join("");
  options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Country not found</p>`;
});

SelectButton.addEventListener("click", () => SearchBox.classList.toggle("active"));