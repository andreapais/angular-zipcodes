import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Api5DaysWeatherResponse, IWeather} from "../interfaces/weather-api.interface";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  private readonly APP_ID = '5a4b2d457ecbef9eb2a71e480b947604';
  private readonly BASE_PATH = 'https://api.openweathermap.org/data/2.5';
  private readonly UNITS = 'metric';

  constructor(
    private http: HttpClient
  ) { }

  getWeatherFromZipcode(zipcode: string): Observable<IWeather> {
    const options = {
      params: {
        q: zipcode,
        appid: this.APP_ID,
        units: this.UNITS
      }
    }

    return this.http.get<IWeather>(this.BASE_PATH + '/weather', options)
  }

  get5DaysForecastFromZipcode(zipcode: string): Observable<Api5DaysWeatherResponse>{
    const options = {
      params: {
        q: zipcode,
        appid: this.APP_ID,
        units: this.UNITS,
        cnt: 5
      }
    }

    return this.http.get<Api5DaysWeatherResponse>(this.BASE_PATH + '/forecast/daily', options);
  }

  getWeatherIcon(main: string): string {
    let icon = '';

    switch(main) {
      case 'Clouds':
        icon = 'clouds';
        break;
      case 'Clear':
        icon = 'sun';
        break;
      case 'Snow':
        icon = 'snow';
        break;
      case 'Rain':
        icon = 'rain';
        break;
      case 'Drizzle':
        icon = 'rain';
        break;
      case 'Thunderstorm':
        icon = 'rain';
        break;
    }

    return icon;
  }

}
