// src/app/manager/material-manager/material-manager.component.ts
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/service/firestore.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-material-manager',
  templateUrl: './material-manager.component.html',
  styleUrls: ['./material-manager.component.scss'],
})
export class MaterialManagerComponent implements OnInit {
  materials: any[] = [];

  constructor(private firestoreService: FirestoreService, private route: ActivatedRoute) {}

  ngOnInit() {
    const lessonId = this.route.snapshot.paramMap.get('id');
    if (lessonId) {
      this.firestoreService.getMaterials(lessonId).subscribe(materials => {
        this.materials = materials;
      });
    }
  }

  downloadMaterial(url: string) {
    // Logic to download material
    window.open(url, '_blank');
  }
}
