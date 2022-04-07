let stadt = document.getElementById("stadt");
let wrapper = document.getElementById("wr");
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
	
	else 
	{
		wrapper.style.display= "block";
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

						let tr = document.createElement("tr");						
						document.getElementById("tb").appendChild(tr);

						let th = document.createElement("th");
						th.innerHTML = response.forecast.forecastday[0].hour[i].time.split(" ")[1];

						tr.appendChild(th);

						let td = document.createElement("td");
						td.innerHTML = response.forecast.forecastday[0].hour[i].temp_c + "°C";
						tr.appendChild(td);

			}
				})
				.catch(err => console.error(err));


				// Forecast Rapid Api

				fetch('https://weatherapi-com.p.rapidapi.com/forecast.json?q='+ inp.value + '&days=7', options)
					.then(response => response.json())
					.then(response => {
						console.log(response);
						console.log(response.forecast.forecastday[1].date);
						for(let f=1; f<response.forecast.forecastday.length; f++)
						{
							let div1 = document.createElement("div");
							document.getElementById("tag_box").appendChild(div1);

							let h5 =  document.createElement("h5");
							h5.innerHTML = response.forecast.forecastday[f].date;
							div1.appendChild(h5);

							let p = document.createElement("p");
							div1.appendChild(p);
							
							let div2 = document.createElement("div");
							div2.innerHTML = "Max: " + response.forecast.forecastday[f].day.maxtemp_c + " °C";
							p.appendChild(div2);
							let div3 = document.createElement("div");					
							div3.innerHTML ="Min: " + response.forecast.forecastday[f].day.mintemp_c + " °C";	
							p.appendChild(div3);	
						}

					})
					.catch(err => console.error(err));
	
	}

		

} 