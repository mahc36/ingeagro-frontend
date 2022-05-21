import {Component, Input, OnInit} from '@angular/core';
import {ToggleminicartService} from "../../services/toggleminicart.service";

@Component({
  selector: 'app-minicart',
  templateUrl: './minicart.component.html',
  styleUrls: ['./minicart.component.scss']
})
export class MinicartComponent implements OnInit {

  expanded = false;

  constructor(private toggleMiniCartService: ToggleminicartService) { }

  public closeMiniCart() : void {
    this.expanded = false;
  }

  ngOnInit(): void {
    this.toggleMiniCartService.toggleMiniCartStatus.subscribe({
      next: value => {
        this.expanded = value;
      }
    })
  }

}
