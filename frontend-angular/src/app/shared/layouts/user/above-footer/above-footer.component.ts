import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-above-footer",
    standalone: true,
    imports: [MatIconModule],
    templateUrl: "./above-footer.component.html"
})

export class AboveFooterComponent {
    title = "frontend-angular";
}