import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'devices-list-config-dialog',
  templateUrl: './list-config-dialog.component.html',
  styleUrls: ['./list-config-dialog.component.sass']
})
export class ListConfigDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<ListConfigDialogComponent>
  ) { }

  ngOnInit() {
  }

  // if user submit(click 'OK') configure dialog,
  // send data of col, row
  onSubmitDisplayConfigure(data): void {
    this.matDialogRef.close(data);
  }

  onCancelDisplayConfigure(): void {
    this.matDialogRef.close(undefined);
  }

}
