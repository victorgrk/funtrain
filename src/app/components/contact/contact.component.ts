import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { APIService } from "src/app/services/API.service";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  fg: FormGroup;

  error: string;
  success: string;

  contactSubscription: Subscription;
  constructor(
    private $fb: FormBuilder,
    private $api: APIService,
    private $toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fg = this.$fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      mail: ["", [Validators.required, Validators.email]],
      titre: ["", Validators.required],
      message: ["", Validators.required]
    });
  }

  onSubmit() {
    this.contactSubscription = this.$api
      .post("contact", this.fg.value)
      .subscribe(e => {
        if (e) {
          this.$toastr.success("Votre message a bien été envoyé");
        } else {
          this.$toastr.error(
            "Une erreur est survenue lors de l'envoi de votre message"
          );
        }
      });
  }
}
