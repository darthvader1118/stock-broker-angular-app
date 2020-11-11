import { Component, OnInit, Input, Renderer2,  Inject } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.css']
})
export class NewsModalComponent implements OnInit{
  @Input() newsPiece: object;
  pubDate: Date;
  pubDateString: string;
  closeResult = '';
  constructor(private modalService: NgbModal, private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document) { }

  open(content) {
    this.pubDate = new Date(this.newsPiece['publishedAt']);
    this.pubDateString = this.pubDate.toDateString();
   console.log(this.newsPiece['source'])
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() : void{

    let script = this._renderer2.createElement('script');
    script.type = `application/ld+json`;
    script.text = `
        {
          function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
            fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk')
        }
    `;

    this._renderer2.appendChild(this._document.body, script);
  }
}
