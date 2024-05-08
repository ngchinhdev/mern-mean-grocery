import { Component, ViewEncapsulation } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: "app-header",
    standalone: true,
    imports: [MatIconModule, RouterLink, RouterLinkActive, MatMenuModule],
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
    encapsulation: ViewEncapsulation.None
})

export class HeaderComponent {
    title = "frontend-angular";
}