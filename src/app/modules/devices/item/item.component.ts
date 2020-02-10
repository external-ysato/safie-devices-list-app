import { Component, OnInit, Input } from '@angular/core';
import { Device } from '../device';
import { DeviceService } from '../../../services/device/device.service';

@Component({
  selector: 'devices-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass']
})
export class ItemComponent implements OnInit {

  constructor(
    private deviceService: DeviceService
  ) { }

  private imageBlobUrl: string | ArrayBuffer = null;
  // this value have target element is in viewport or not
  // using Intersection Observer API(ng-in-viewport)
  private visible: boolean = false;

  private getImage(): void {
    if (!this.device) {
      return;
    }

    this.deviceService.getImage(this.device.id)
      .subscribe(response => {
        this.createImageFromBlob(response);
      })
  }

  // subscribe update state by interval timer
  // and if target element is in viewport, get image
  private updateImage(): void {
    this.deviceService.updateState.subscribe((date: Date) => {
      if (this.visible) {
        this.getImage();
      }
    });
  }

  // generate from image API response to data URL
  private createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageBlobUrl = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  @Input() device: Device;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.updateImage();
  }

  // called when target element enter or leave viewport
  // visible argument have true(enter) or false(leave)
  onIntersection({ visible }: { visible: boolean }): void {
    this.visible = visible;
    // called when target element enter viewport first
    if (this.visible && !this.imageBlobUrl) {
      this.getImage();
    }
  }

}
