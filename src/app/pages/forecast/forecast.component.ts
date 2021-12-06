import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import {WeatherApiService} from "../../services/weather-api.service";
import {Api5DaysWeatherResponse} from "../../interfaces/weather-api.interface";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  weathers: Api5DaysWeatherResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherService: WeatherApiService
  ) { }

  ngOnInit(): void {
    const zipcode = this.activatedRoute.snapshot.params['zipcode'];
    this.weatherService.get5DaysForecastFromZipcode(zipcode).subscribe(res => {
      this.weathers = res;
    })
  }

  getWeatherIcon(main: string): string {
    return this.weatherService.getWeatherIcon(main);
  }

}
