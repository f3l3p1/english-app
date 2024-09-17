// src/app/manager/video-manager/video-manager.component.ts
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/service/firestore.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-manager',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.scss'],
})
export class VideoManagerComponent implements OnInit {
  videos: any[] = [];

  constructor(private firestoreService: FirestoreService, private route: ActivatedRoute) {}

  ngOnInit() {
    const lessonId = this.route.snapshot.paramMap.get('id');
    if (lessonId) {
      this.firestoreService.getVideos(lessonId).subscribe(videos => {
        this.videos = videos;
      });
    }
  }

  playVideo(url: string) {
    // Logic to play video, e.g., opening a modal with a video player
    window.open(url, '_blank'); // Opens the video in a new tab
  }
}
