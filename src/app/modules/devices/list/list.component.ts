import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';

import _ from 'lodash';

import { ListConfigDialogComponent } from '../list-config-dialog/list-config-dialog.component';

import { Device } from '../device';
import { List } from '../list';
import { DeviceService } from '../../../services/device/device.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import {
  LIST_UPDATE_INTERVAL,
  PAGE_NAME,
  LIST_DISPLAY_CONFIG,
  LOCAL_STORAGE_KEY
} from '../../../constants';

@Component({
  selector: 'devices-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  constructor(
    private deviceService: DeviceService,
    private localStorageService: LocalStorageService,
    public matDialog: MatDialog
  ) { }

  private pageName: string = PAGE_NAME.LIST;
  private timer: Subscription;

  private devices: Device[] = [];
  private list:    List = null;
  private key = LOCAL_STORAGE_KEY;

  // if user update display config in dialog,
  // initial values of col, row get from localStorage
  // range is array created from constants
  // this range is used in configure dialog
  private displayConfig: {[key: string]: any} = {
    col: {
      initial:
        this.localStorageService.get(this.key.LIST_DISPLAY_CONFIG_COL) ||
        LIST_DISPLAY_CONFIG.COL_INITIAL,
      range: _.range(
        LIST_DISPLAY_CONFIG.COL_MIN,
        LIST_DISPLAY_CONFIG.COL_MAX + 1
      )
    },
    row: {
      initial:
        this.localStorageService.get(this.key.LIST_DISPLAY_CONFIG_ROW) ||
        LIST_DISPLAY_CONFIG.ROW_INITIAL,
      range: [
        LIST_DISPLAY_CONFIG.ROW_NO_LIMIT,
        ..._.range(
          LIST_DISPLAY_CONFIG.ROW_MIN,
          LIST_DISPLAY_CONFIG.ROW_MAX + 1
        )
      ]
    }
  }

  private getDevices(): void {
    this.deviceService.getDevices()
      .subscribe(response => {
        this.devices = response.record.map(d => ({ id: d.device_id }));
      });
  }

  // interval timer pass update device signal
  // to device.service
  private updateDevices(): void {
    this.timer = interval(LIST_UPDATE_INTERVAL)
      .subscribe(() => {
        this.deviceService.updateDevices(new Date);
      });
  }

  private setList(): void {
    this.list = {
      row: this.displayConfig.row.initial,
      col: this.displayConfig.col.initial
    }
  }

  // when user submit display config dialog,
  // update col, row of list and save value to localStorage
  private updateListConfig(num: number, type: ('col' | 'row')): void {
    const key: string = type === 'col' ?
      this.key.LIST_DISPLAY_CONFIG_COL :
      this.key.LIST_DISPLAY_CONFIG_ROW;

    if (this.displayConfig[type].range.includes(num)) {
      this.list[type] = num;
      this.localStorageService.set(key, num);
    }
  }

  ngOnInit() {
    this.getDevices();
    this.setList();
    this.updateDevices();
  }

  // called when user click setting button in list page(gear icon)
  openConfigDialog(): void {
    const dialog = this.matDialog.open(ListConfigDialogComponent, {
      data: {
        list: this.list,
        displayConfig: this.displayConfig
      }
    });

    // when user close dialog(submit, cancel, click background),
    // called this and call update method
    dialog.afterClosed().subscribe((result: ({[key: string]: number} | undefined)): void => {
      if (!result) {
        return;
      }

      this.updateListConfig(result.col, 'col');
      this.updateListConfig(result.row, 'row');
    });
  }

}
