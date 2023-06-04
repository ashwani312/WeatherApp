import React, { useEffect, useState } from "react";
import './weather.css'
import cloud from '../images/clouds.png'
import humadity from '../images/humidity.png'
import wind from '../images/wind.png'
import clear from '../images/clear.png';
import drizzel from '../images/drizzle.png'
import mist from '../images/mist.png'
import rain from '../images/rain.png'
import snow from '../images/snow.png'


const Weather = () => {
    let [inputValue, setInputValue] = useState('')
    let [details, setDetails] = useState({});
    let [imgUrl, setImgUrl] = useState(cloud);
    let [display, setDisplay] = useState(false);
    let [invalid, setInvalid] = useState(false)

    let number = 0;

    let apiKey = '11fae4da8ec1b995b5acb22baa083989';
    let weatherapi = 'https://api.openweathermap.org/data/2.5/weather?&units=metric';


    const getWeatherDetails = async (city) => {
        number++;
        let apiUrl = weatherapi + "&q=" + city + "&appid=" + apiKey;
        const response = await fetch(apiUrl);
        const data = await response.json()
        if (response.status === 404) {
            setInvalid(true)
            setDisplay(false)
        } else {
            if(number === 2){
                setDisplay(false)
            }else{
                setDisplay(true)
            }
            
            setInvalid(false)
            setDetails(data)
        }
        if (data.weather[0].main === 'Clouds') {
            setImgUrl(cloud);
        } else if (data.weather[0].main === 'Clear') {
            setImgUrl(clear)
        } else if (data.weather[0].main === 'rain') {
            setImgUrl(clear)
        } else if (data.weather[0].main === 'Drizzel') {
            setImgUrl(drizzel)
        } else if (data.weather[0].main === 'Mist') {
            setImgUrl(mist)
        } else if (data.weather[0].main === 'Rain') {
            setImgUrl(rain)
        } else if (data.weather[0].main === 'Snow') {
            setImgUrl(snow)
        }


    }
    useEffect(() => {
        getWeatherDetails('delhi');
    }, [])
    return (
        <>

            <div className="container">
                <div className="weatherBox">
                    <div className="search">
                        <input type="text" className="inputBox" placeholder="enter city name" value={inputValue} onChange={(e) => setInputValue(e.target.value)} 
                        onKeyUp={(e)=>{
                            if(e.key === 'Enter'){
                                // setDisplay(true)

                                getWeatherDetails(inputValue)
                                setInputValue('')
                            }
                        }}
                        />
                        <button
                            onClick={() => {
                                // setDisplay(true)

                                getWeatherDetails(inputValue)
                                setInputValue('')

                            }}
                        >search</button>
                    </div>
                    {invalid && <div className="invalid">
                        <h1>Invalid city name</h1>
                    </div>}
                    {display && <div className="details">
                        <div className="weatherImg">
                            <img src={imgUrl} alt="cloud" />
                        </div>
                        <div className="weatherTemp">
                            <h3 className="cityName">{details.name}</h3>
                            <h1 className="temp">{Math.round(details.main.temp)}°C</h1>
                        </div>
                        <div className="weatherInfo">
                            <div className="info">
                                <img src={humadity} alt="" className="infoImg" />
                                <div>
                                    <h2>{details.main.humidity}%</h2>
                                    <h3>humadity</h3>
                                </div>

                            </div>
                            <div className="info">
                                <img src={wind} alt="" className="infoImg" />
                                <div>
                                    <h2>{details.wind.speed} km/h</h2>
                                    <h3>Wind speed</h3>
                                </div>

                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    );
}
export default Weather