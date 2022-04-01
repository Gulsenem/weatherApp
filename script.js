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
				time.innerHTML = sonuc.location.localtime.split(" ")[1];
				//icon.src= 'sonuc.current.condition.icon';
				text.innerHTML = sonuc.current.condition.text;
				temp.innerHTML = sonuc.current.temp_c + " °C";
				pr.innerHTML = " " + sonuc.current.humidity + " %";
				km.innerHTML = " " +  sonuc.current.vis_km + " km";
			})
			.catch(err => console.error(err));	
			

			const d = new Date();
			let iso_d = d.toISOString().slice(0, 10); //date now und slice (2022-04-01)
			console.log(iso_d);


			const a = new Date();
			let b = a.toISOString(a.setMonth(a.getMonth()+1));
			let end_dt = b.slice(0, 10);
			console.log(end_dt);
			
			fetch('https://weatherapi-com.p.rapidapi.com/history.json?q='+ inp.value + '&dt='+ iso_d +'&lang=de&' + end_dt, options)
				.then(response => response.json())
				.then(response => {

					for(let i=0; i< response.forecast.forecastday[0].hour.length; i++)
					{
						let sd = document.createElement("div");
						document.getElementById("tr").appendChild(sd);

						let td = document.createElement("h5");
						td.innerHTML = response.forecast.forecastday[0].hour[i].time.split(" ")[1];

						sd.appendChild(td);

						let td_t = document.createElement("p");
						td_t.innerHTML = response.forecast.forecastday[0].hour[i].temp_c + "°C";

						sd.appendChild(td_t);

			}
				})
				.catch(err => console.error(err));
	
	}

		

} 