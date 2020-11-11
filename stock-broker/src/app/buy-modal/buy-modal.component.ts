import { Component, Input} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {HttpServiceService} from '../http-service.service';
@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent {
  @Input() name: string;
  @Input() price: number; 
  @Input() title: string;
  closeResult = '';
  
  constructor(private modalService: NgbModal, private httpService:HttpServiceService) { }



  open(content) {
    if (this.price == null){
      this.httpService.getCurrentPriceData(this.name).subscribe(data =>{
        console.log(data)
        this.price = data['data']['last']
        console.log(this.price);
      });
    }
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

  onSubmit(purchase: any){
    // console.log(purchase)
    var priceShare = {
      'price' : this.price,
      'shares': parseInt(purchase)
    }

    if(localStorage.getItem(this.name + '-shares') != null){
      var oldShares = localStorage.getItem(this.name + '-shares')
      var oldSharesJSON = JSON.parse(oldShares);
      var newSharesJSON = {}
      newSharesJSON['shares'] = parseInt(oldSharesJSON.shares) + priceShare.shares;
      newSharesJSON['total'] = oldSharesJSON.total + priceShare.price*priceShare.shares;
      newSharesJSON['name'] = oldSharesJSON.name;
      console.log('new shares JSON' + newSharesJSON);
      localStorage.setItem(this.name + '-shares', JSON.stringify(newSharesJSON));
    }
    else{
    var shareTotal ={};
    shareTotal['shares'] = priceShare.shares;
    shareTotal['total'] = priceShare.shares*priceShare.price;
    shareTotal['name'] = this.title;
    console.log(shareTotal);
    localStorage.setItem(this.name + '-shares', JSON.stringify(shareTotal));
    }
  }
}


