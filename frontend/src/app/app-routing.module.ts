import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "user",
    loadChildren: () =>
      import("./features/user/user.module").then(
        (m) => m.UserModule
      ),
  },
  {
    path: "translate",
    loadChildren: () =>
      import("./features/translate/translate.module").then(
        (m) => m.TranslateModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
