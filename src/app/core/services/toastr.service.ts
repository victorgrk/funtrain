import { Injectable } from '@angular/core'

import { ToastrService as toaster } from 'ngx-toastr'

@Injectable({
  providedIn: `root`,
})
export class ToastrService {
  constructor(private $toastr: toaster) { }

  success(title, message) {
    this.$toastr.success(title, message)
  }

  error(error) {
    switch (error.status) {
      case 404:
        this.$toastr.error(`La ressource demandée est introuvable`)
        break
      case 500:
        this.$toastr.error(
          `Une erreur est survenue sur le serveur, merci de rééssayer plus tard`
        )
        break
      case 401:
        this.$toastr.error(
          `Cette ressource est protégé par une authentification`
        )
        break
      case 403:
        this.$toastr.error(
          `Vous n'avez pas les permissions pour éditer ces informations`
        )
        break
      case 400:
        break
      default:
        this.$toastr.error(
          `Une erreur inconnue est survenue, si l'erreur persiste, merci de contacter l'administrateur de ce site`
        )
        break
    }
  }
}
