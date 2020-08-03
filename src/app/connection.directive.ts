import { Directive, Attribute, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appConnection]'
})
export class ConnectionDirective implements OnInit {

  constructor(
    @Attribute('slowSrc') private slowSrc,
    @Attribute('fastSrc') private fastSrc,
    private host: ElementRef<HTMLImageElement>
  ) { }

  ngOnInit(): void {
    const { effectiveType } = navigator.connection;
    let src;
    if (
      /\slow-2g|2g|3g/.test(effectiveType)
    ){
      src = this.slowSrc;
    } else {
      src = this.fastSrc;
    }
    this.host.nativeElement.setAttribute('src', src);
  }

}
