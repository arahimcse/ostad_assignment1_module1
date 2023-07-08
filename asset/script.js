
function getWeatherData(data) {
  let input = document.getElementById("getLocation");
  let cityName = "";
  if(data == "Current Weather")
  {
    let city = input.value;
    if(city)
    {
      input.setAttribute("onkeyup", "getWeatherData(this.value)");
      cityName = '&q='+city;

    } else{
      input.setAttribute('class', 'required form-control mb-3');
      input.setAttribute('placeholder','Required Field*');
      return;
    }
  } else 
  {
    cityName = '&q='+ data;
  }
    const apiKey = "&appid=d161c055de3aba894953f90b499f676b";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric"+ cityName +apiKey;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      weatherInfo(this);
      }
    xhttp.open("GET", apiUrl);
    xhttp.send();
  }

  /**
   * This function will manage response data from server
   */
  function weatherInfo(data)
  {
    let disPlay = document.getElementById("weatherInfo");
    try
    {
      const {message} = JSON.parse(data.response); //Normal response is string format. So, JSON.parse() need to conver string to object
      if(message)
      {
        disPlay.innerHTML = "<p>" + message + "</p>";
      } else 
      {
        const jsonData = JSON.parse(data.response);
        const {temp, humidity} =  jsonData.main; //Nested Object distructure
        const {description} =  jsonData.weather[0]; //Nested Object distructure
        disPlay.innerHTML ="<h5>Temperature: " + Math.round(temp) + "<span>&#176;</span>C</h5>" + "<h5> Description: " + description + "</h5>" + "<h5> Humidity: " + humidity + "%</h5>";
      }
    } catch(err)
    {
      disPlay.innerHTML="<h5>" +err.message + "</h5>";
    }
  }