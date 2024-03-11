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
  "الإسماعيلية": "Ismailia",
  "الجيزة": "Giza",
  "المنيا": "Al Minyā",
  "المنوفية": "Al Minūfīyah",
  "القليوبية": "Al Qalyūbīyah",
  "القاهرة": "Al Qāhirah",
  "مصر الجديدة": "Heliopolis",
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
  "سوهاج": "Sohag",
  "شرم الشيخ": "Sharm ash Shaykh",
  " العاشر من رمضان": "10th of Ramadan City",
  " السادس من أكتوبر": "Sixth of October City",
  "القاهرة الجديدة": "New Cairo",
  "حلوان": "Helwan",
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

// Get the prayer times by location
function getPrayerTimesByLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  axios.get(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=5`)
    .then(GetPrayerTimes)
}
navigator.geolocation.getCurrentPosition(getPrayerTimesByLocation, showError);


// Get the selected value
let result = document.querySelector(".result");
citiesList.addEventListener("change", (city) => {
  result.innerHTML = "";
  result.classList.remove("show");
  // Send request to get times
  axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${city.target.value}&country=eg&method=5`)
    .then(GetPrayerTimes)
    .catch((error) => alert(" Error Connection "));
})

// Function to get times from API
function GetPrayerTimes(response) {
  const data = response.data.data.timings;
  let result = document.querySelector(".result");
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
      `
      <div class="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
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
}

// Show error
let errorShow = document.querySelector(".error");
function showError(error) {
  errorShow.classList.remove("d-none");
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorShow.innerHTML = " رفض المستخدم طلب تحديد الموقع الجغرافى تلقائيا لعرض الوقت اسمح بتحديد الموقع او اختر المدينة";
      result.classList.add("show");
      break;
    case error.POSITION_UNAVAILABLE:
      result.innerHTML = " معلومات الموقع غير متوفرة"
      result.classList.add("show")
      break;
    case error.TIMEOUT:
      result.innerHTML = " تم تجاوز الوقت المحدد للطلب"
      result.classList.add("show")
      break;
    case error.UNKNOWN_ERROR:
      result.innerHTML = " خطأ غير معروف"
      result.classList.add("show")
      break;
  }
}
// ---------------------------------------------------------------------------------
// Add year to footer
let year = document.querySelector("#year");
year.innerHTML = new Date().getFullYear();