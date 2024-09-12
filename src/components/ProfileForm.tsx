import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-profile-form",
  templateUrl: "./profile-form.component.html",
})
export class ProfileFormComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
  });

  constructor(private store: Store) {}

  onSubmit() {
    this.store.dispatch(updateProfile({ profile: this.profileForm.value }));
  }
}
