const api = {
    key: "f4eae211f913a6a27ddfa41ecbfd0d73",
    baseurl: "http://api.openweathermap.org/data/2.5/"
}

const serachBox = document.querySelector('[search-box]');
serachBox.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode == 13) {
        getResults(serachBox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(data => data.json())
        // .then(data => console.log(data))
        .then(displayResults)
}

function displayResults(data) {
    let city = document.querySelector('.location .city')
    city.innerText = `${data.name}, ${data.sys.country}`

    let now = new Date()
    let months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    let date = document.querySelector('.location .date')
    date.innerText = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;

    let weather = document.querySelector('.current .weather')
    weather.innerText = `${data.weather[0].main}`

    let hilow = document.querySelector('.current .hi-low')
    hilow.innerHTML = `${Math.round(data.main.temp_max)}<span>°C</span> / ${Math.round(data.main.temp_min)}<span>°C</span>`;
}