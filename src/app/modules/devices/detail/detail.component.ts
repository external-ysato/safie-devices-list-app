import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import videojs from 'video.js';

import { DeviceService } from '../../../services/device/device.service';
import { PAGE_NAME } from '../../../constants';

@Component({
  selector: 'devices-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService
  ) { }

  @ViewChild('player', { static: false }) private playerElement: ElementRef;
  private id: string = '';
  private pageName: string = PAGE_NAME.DETAIL;

  private initStreamPlayer() {
    const player = videojs(this.playerElement.nativeElement);

    // before send XHR request to get stream API,
    // add API key to request header
    videojs.Hls.xhr.beforeRequest = (options: {[key: string]: any}) => {
      options.headers = Object.assign({}, this.deviceService.getApiKey());
      return options;
    };

    player.ready(() => {
      player.src({
        src: this.deviceService.getStreamUrl(this.id)
      });
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit() {
    this.initStreamPlayer();
  }

}
