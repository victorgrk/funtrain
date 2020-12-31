import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router"
import { Subscription } from "rxjs"
import { filter, map, mergeMap } from "rxjs/operators"
import { SEOService } from "./core/services/seo.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription

  constructor(private router: Router,
    private route: ActivatedRoute,
    private $seo: SEOService
  ) { }
  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild
          }
          return route
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((event: any) => {
        this.$seo.updateTitle(event.title)
        this.$seo.updateOgUrl(event.ogUrl)
        this.$seo.updateDescription(event.title + event.description)
      })
  }
  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe()
    }
  }

}
