import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "src/app/core/services/toastr.service";
import { APIService } from "src/app/core/services/API.service";
import { ReCaptchaV3Service } from "ngx-captcha";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent {
  fg: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
    titre: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });

  error: string;
  success: string;
  token: string;
  constructor(
    private $api: APIService,
    private $toastr: ToastrService,
    $captcha: ReCaptchaV3Service
  ) {
    $captcha.execute('6LfD658UAAAAADBP3z-jJ97T-HzcN2j6fmoYH7H4y', 'homepage', (token) => { this.token = token })
  }

  onSubmit() {
    const values = this.fg.value;
    values.token = this.token
    this.$api
      .post("contact", values)
      .subscribe(e => {
        if (e) {
          this.$toastr.success("Votre message a bien été envoyé", "Houra");
        }
      });
  }
}
