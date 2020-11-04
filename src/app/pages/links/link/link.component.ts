import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { AuthentificationService } from 'src/app/core/services/Authentification.service'

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
  @Input() link: any
  @Output() update = new EventEmitter<any>()
  @Output() delete = new EventEmitter<any>()
  constructor(private $auth: AuthentificationService) { }
  get auth() {
    return this.$auth.hasPermissionToEdit('administration')
  }
}
