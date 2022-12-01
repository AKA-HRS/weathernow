let weather = {
	apiKey: "f514f67a8a492f7cfd5f741959c17916",
	fetchWeather: function (city) {
		fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
		)
			.then((response) => {
				if (!response.ok) {
					alert("No weather found.");
					throw new Error("No weather found.");
				}
				return response.json();
			})
			.then((data) => this.displayWeather(data));
	},

	displayWeather: function (data) {
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;	
		document.getElementById(this.Check).querySelector(".city").innerText = "Weather in " + name;
		document.getElementById(this.Check).querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
		document.getElementById(this.Check).querySelector(".description").innerText = description;
		document.getElementById(this.Check).querySelector(".temp").innerText = temp + "°C";
		document.getElementById(this.Check).querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
		document.getElementById(this.Check).querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
		document.getElementById(this.Check).querySelector(".weather").classList.remove("loading");
	},

};



//to duplicate div card//
document.getElementById('add').onclick = duplicate;
var i = 1;
var original = document.getElementById('real');
function duplicate() {
	var clone = original.cloneNode(true);// "deep" clone
	clone.classList = "card";
	clone.id = "real" + i++;
	window.scrollTo(0, document.body.scrollHeight);
	original.parentNode.appendChild(clone);
}
function Delete(button) {
	var card = button.parentNode;
	var real = card.parentNode;
	var main = real.parentNode;
	main.removeChild(real);
}


function info(button) {
	var inp = button.parentNode.querySelector(".search-bar").value;
	var idd = button.parentNode.parentNode.parentNode.id;
	Object.assign(weather, {Check: idd });
	weather.fetchWeather(inp);
}
