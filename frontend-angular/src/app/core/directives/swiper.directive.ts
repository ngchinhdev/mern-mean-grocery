import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { SwiperOptions } from 'swiper/types';

@Directive({
  selector: '[appSwiper]',
  standalone: true
})
export class SwiperDirective implements AfterViewInit {
  private readonly swiperElement: HTMLElement;

  @Input('config')
  config?: SwiperOptions;

  constructor(private el: ElementRef<HTMLElement & { initialize: () => void; }>) {
    this.swiperElement = el.nativeElement;
  }

  ngAfterViewInit(): void {
    console.log(this.config);
    Object.assign(this.el.nativeElement, this.config);

    this.el.nativeElement.initialize();
  }
}
