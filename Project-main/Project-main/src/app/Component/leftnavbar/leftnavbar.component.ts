import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-leftnavbar',
  templateUrl: './leftnavbar.component.html',
  styleUrls: ['./leftnavbar.component.css']
})
export class LeftnavbarComponent implements OnInit {
  userRole: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

  }

}
