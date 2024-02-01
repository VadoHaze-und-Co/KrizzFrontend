import {Routes} from '@angular/router';
import {QualificationListComponent} from "./components/dialogs/qualification-list/qualification-list.component";
import {SiteComponent} from "./components/site/site.component";
import {AuthGuard} from "./keycloak/auth-guard";

export const routes: Routes = [
  {path: '', component: SiteComponent, canActivate: [AuthGuard]}
];
