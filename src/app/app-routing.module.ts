import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { CharacterSelectionComponent } from "./components/character-selection/character-selection.component";
import { AuthGuard } from "./helpers/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" }, // Sets login as the default page
  { path: "login", component: LoginComponent },
  { path: "character-selection", component: CharacterSelectionComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }, // If a url in invalid it falls back to the login page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
