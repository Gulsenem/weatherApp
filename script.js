let stadt = document.getElementById("stadt");
let container = document.getElementById("container");
let temp = document.getElementById("temp");
let inp = document.getElementById("inp");
let icon = document.querySelector("img");
let pr = document.getElementById("pr");
let km = document.getElementById("km");
let time = document.getElementById("time");
let text = document.getElementById("text");

function submit(){
	if(inp.value == "")
	{
		alert("Bitte ein Ort eingeben!");
	}
	
	else {
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
				'X-RapidAPI-Key': 'b6ea4c6179mshaee28b624113c0cp195f32jsna08ab544faa1'
			}
		};
		
		fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=' + inp.value, options)
			.then(response => response.json())
			.then(sonuc => {

				container.style.display = "block";
				stadt.innerHTML = sonuc.location.name;
				time.innerHTML = sonuc.location.localtime;
				//icon.src= 'sonuc.current.condition.icon';
				text.innerHTML = sonuc.current.condition.text;
				temp.innerHTML = sonuc.current.temp_c + " °C";
				pr.innerHTML = " " + sonuc.current.humidity + " %";
				km.innerHTML = " " +  sonuc.current.vis_km + " km";
			})
			.catch(err => console.error(err));	
			
			
			
			/*const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
					'X-RapidAPI-Key': 'b6ea4c6179mshaee28b624113c0cp195f32jsna08ab544faa1'
				}
			};*/
			
			fetch('https://weatherapi-com.p.rapidapi.com/history.json?q=Bonn&dt=2022-03-30&lang=en&end_dt=2022-03-31', options)
				.then(response => response.json())
				.then(response => {

					for(let i=0; i< response.forecast.forecastday[0].hour.length; i++)
					{
						let e = document.createElement("div");
						e.innerHTML = response.forecast.forecastday[0].hour[i].time.split(" ")[1];
						container.appendChild(e);

						let f = document.createElement("div");
						f.innerHTML = response.forecast.forecastday[0].hour[12].temp_c + "°C";
						container.appendChild(f);
					}
					document.getElementById("tab_time").innerHTML = response.forecast.forecastday[0].hour[12].time.split(" ")[1];
					document.getElementById("tab_temp").innerHTML = response.forecast.forecastday[0].hour[12].temp_c + "°C";
				})
				.catch(err => console.error(err));
	
			//https://weatherapi-com.p.rapidapi.com/history.json?q=Bonn&dt=2022-03-30&lang=en&end_dt=2022-03-31'
	}

		

}