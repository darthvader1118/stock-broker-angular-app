import {Directive, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Directive({
  selector: '[ngInit]'
})
export class NgInitDirectiveDirective implements OnInit{
  @Input() values: any = {};

  @Input() ngInit;
  ngOnInit() {
    if(this.ngInit) { this.ngInit(); }
  }  

}
