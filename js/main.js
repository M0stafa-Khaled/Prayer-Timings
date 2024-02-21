// Date 
const date = document.getElementById("date");
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
date.innerHTML = today.toLocaleDateString('ar-EG', options);

// Cities
const cities = {
  "الدقهلية": "Ad Daqahlīyah",
  "البحر الاحمر": "Al Baḩr al Aḩmar",
  "البحيرة": "Al Buḩayrah",
  "الفيوم": "Al Fayyūm",
  "الغربية": "Al Gharbīyah",
  "الأسكندرية": "Alexandria",
  "الإسماعيلية": "Al Ismā'īlīyah",
  "الجيزة": "Giza",
  "المنيا": "Al Minyā",
  "المنوفية": "Al Minūfīyah",
  "القليوبية": "Al Qalyūbīyah",
  "القاهرة": "Al Qāhirah",
  "الأقصر": "Al Uqşur",
  "الوادي الجديد": "Al Wādī al Jadīd",
  "السويس": "As Suways",
  "الشرقية": "Ash Sharqīyah",
  "أسوان": "Aswān",
  "أسيوط": "Asyūţ",
  "بنى سويف": "Banī Suwayf",
  "بورسعيد": "Port Said",
  "دمياط": "Dumyāţ",
  "جنوب سيناء": "Janūb Sīnā'",
  "كفر الشيخ": "Kafr ash Shaykh",
  "مطروح": "Maţrūḩ",
  "قنا": "Qinā",
  "شمال سيناء": "Shamāl Sīnā'",
  "سوهاج": "Sūhāj",
};

// Add cities to select list option
let citiesList = document.querySelector("#cities");
for (const [city, value] of Object.entries(cities)) {
  citiesList.innerHTML += `<option value="${value}">${city}</option>`
};
const tiems = {
  "الفجر": "Fajr",
  "الشروق": "Sunrise",
  "الظهر": "Dhuhr",
  "العصر": "Asr",
  "المغرب": "Maghrib",
  "العشاء": "Isha"
}

// Get the selected value
citiesList.addEventListener("change", (city) => {
  // Send request to get times
  axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${city.target.value}&country=eg`)
    .then(function (response) {
      const data = response.data.data.timings;
      let result = document.querySelector(".result");
      result.innerHTML = "";
      let times = Object.keys(tiems);
      times.forEach(time => {
        // slice time to 12 hours format
        let time12 = parseInt(data[tiems[time]].slice(0, 2));
        // add AM or PM
        if (time12 > 12) {
          time12 = time12 - 12;
          time12 = `PM ${time12}:${data[tiems[time]].slice(3, 5)}`;
        } else if (time12 == 12) {
          time12 = `PM ${time12}:${data[tiems[time]].slice(3, 5)}`;
        } else {
          time12 = `AM ${time12}:${data[tiems[time]].slice(3, 5)}`;
        };
        result.innerHTML +=
          `<div class="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
            <div class="card border-primary mb-3" style="max-width: 18rem; min-width: 16rem; height: 10rem; box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);">
              <div class="card-header text-center fs-4 fw-bold">${time}</div>
              <div class="card-body text-danger d-flex justify-content-center align-items-center">
                <h5 class="card-title fw-bold fs-3" id="${tiems[time]}">${time12}</h5>
              </div>
            </div>
          </div>`
      })
      // Show result
      result.classList.add("show")
      result.style.height = "auto";
    })
})
// Get year to footer
let year = document.querySelector("#year");
year.innerHTML = new Date().getFullYear();
