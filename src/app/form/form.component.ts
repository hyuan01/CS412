import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../weather.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  currentWeather: any;
  currentTemperature: any;
  cached: string;
  weatherData: any;
  query: any;

  constructor(private weatherService : WeatherService) { }

  ngOnInit(): void {
  }

  getPlaceWeather(): void {
    console.log("GETPLACEWEATHER");
    console.log(this.query);
    this.weatherService.getWeather(this.query).subscribe(
      (data) => {
        let temp = JSON.stringify(data);
        let temptemp = JSON.stringify(data);
        let temptemptemp = JSON.stringify(data);
        let temptemptemptemp = JSON.stringify(data);

        if ((temp.match(/city not found/g) || []).length > 0) {
          this.currentWeather = null;
          this.currentTemperature = null;
          this.cached = null;
          this.weatherData = [null, null, null];
        } else {
          let temp4 = temptemptemp.split("\"cached\":")[1];
          this.cached = temp4.substring(0,temp4.indexOf('}'));

          if (this.cached=="true") {
            let temp2 = temp.split('\\"description\\":\\"')[1];
            this.currentWeather = temp2.substring(0,temp2.indexOf('\\",'));
            let temp3 = temptemp.split('\\"temp\\":')[1];
            this.currentTemperature = temp3.substring(0,temp3.indexOf(',\\"'));
          } else {
            let temp2 = temp.split('"description":"')[1];
            this.currentWeather = temp2.substring(0,temp2.indexOf('"'));
            let temp3 = temptemp.split('"temp":')[1];
            this.currentTemperature = temp3.substring(0,temp3.indexOf(',"'));
          }
          this.weatherData = ["Weather " + this.currentWeather, "Temperature " + (parseInt(this.currentTemperature)-273).toString(), "Cached? " + this.cached];
        }
      }
    );
  }
}
