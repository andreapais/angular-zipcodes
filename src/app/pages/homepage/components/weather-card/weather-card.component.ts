import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IWeather} from "../../../../interfaces/weather-api.interface";
import {WeatherApiService} from "../../../../services/weather-api.service";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  @Input() zipCode: string;
  @Output() remove = new EventEmitter<string>();

  weather: IWeather;

  constructor(
    private weatherService: WeatherApiService
  ) {
  }

  ngOnInit(): void {
    this.weatherService.getWeatherFromZipcode(this.zipCode).pipe(
      catchError((err: HttpErrorResponse) => {

        if(err.status === 404){
          alert(`City with zipcode ${this.zipCode} not found`);
        } else {
          alert('An error has occurred, check logs')
        }

        this.remove.emit(this.zipCode)

        return throwError(() => err)
      })
    ).subscribe(weather => {
      this.weather = weather
    })
  }

  removeZipcode(): void {
    this.remove.emit(this.zipCode)
  }

}
