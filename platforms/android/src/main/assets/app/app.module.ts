import {registerElement} from 'nativescript-angular/element-registry';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";

import { AppComponent } from "./app.component";

var map = require("nativescript-mapbox");
registerElement("Mapbox", () => map.Mapbox);

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
