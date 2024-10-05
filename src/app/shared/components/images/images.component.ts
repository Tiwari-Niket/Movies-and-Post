import { Component, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ZoomImageComponent } from '../zoom-image/zoom-image.component';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [MatRippleModule, MatDialogModule],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent {
  @Input() public images!: string[];

  constructor(private dialog: MatDialog) { }


  openDialog(image: string) {
    const dialogRef = this.dialog.open(ZoomImageComponent, {
      data: image,
      width: '90%',
      height: '90%',
      minWidth:'90%',
      minHeight: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


