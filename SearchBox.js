const wrapper = document.querySelector(".wrapper"),
    selectBtn = wrapper.querySelector(".select-btn"),
    searchInp = wrapper.querySelector("input"),
    options = wrapper.querySelector(".options");
    
    let Cities = [];

    // Fetch the data from the API
    fetch('https://localhost:44370/api/Location/GetCities')
        .then(response => response.json())
        .then(jsonData => {
            // Assign the data to the Cities array
            Cities = jsonData.map(city => city.City);
            // Call the addCountry function to pop up the dropdown menu
            addCountry();
        })
        .catch(error => console.error(error));
    
    function addCountry(selectedCountry) {
        options.innerHTML = "";
        Cities.forEach(country => {
            let isSelected = country == selectedCountry ? "selected" : "";
            let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
            options.insertAdjacentHTML("beforeend", li);
        });
    }
    
    function updateName(selectedLi) {
        searchInp.value = "";
        addCountry(selectedLi.innerText);
        wrapper.classList.remove("active");
        selectBtn.firstElementChild.innerText = selectedLi.innerText;
    }
    
    searchInp.addEventListener("keyup", () => {
        let arr = [];
        let searchWord = searchInp.value.toLowerCase();
        arr = Cities.filter(data => {
            return data.toLowerCase().startsWith(searchWord);
        }).map(data => {
            let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
            return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
        }).join("");
        options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Country not found</p>`;
    });
    
    selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));
    