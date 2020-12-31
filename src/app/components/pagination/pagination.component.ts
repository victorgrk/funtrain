import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {

  @Output() page = new EventEmitter<number>()
  @Input() size: number;
  currentPage = 1;

  generateArray(): number[] {
    return Array(this.getPageNumber()).fill(0).map((_, i) => i + 1)
  }

  plusOne() {
    this.set(this.currentPage + 1)
  }
  minusOne() {
    this.set(this.currentPage - 1)
  }
  set(i: number) {
    this.currentPage = Math.max(1, Math.min(i, this.getPageNumber()))
    this.page.emit(this.currentPage)
  }

  getPageNumber() {
    return Math.ceil(this.size / 12);
  }

}
