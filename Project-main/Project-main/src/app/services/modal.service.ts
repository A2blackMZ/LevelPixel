import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  projectId!: number;
  constructor(private dialog: MatDialog) { }

}
