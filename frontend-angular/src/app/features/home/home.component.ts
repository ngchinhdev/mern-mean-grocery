import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "swiper/css";
import "swiper/css/pagination";

@Component({
    selector: "app-home",
    standalone: true,
    templateUrl: "./home.component.html",
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomeComponent {
    title = "frontend-angular";
}