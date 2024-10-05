import { Component, inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-zoom-image',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './zoom-image.component.html',
  styleUrl: './zoom-image.component.scss'
})
export class ZoomImageComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<ZoomImageComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
