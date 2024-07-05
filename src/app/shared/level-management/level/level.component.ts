import { Component } from '@angular/core';
import { LevelManagementService } from '../level-management.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent {
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots:true,
    effect: 'fade',
    autoplay:true,
    autoplaySpeed:1500
  };
  levels: any[] = [];
  constructor(private levelService: LevelManagementService){}

  ngOnInit(): void {
    this.loadLevels();
  }

  loadLevels(): void {
    this.levelService.getAllLevels().subscribe(
      (data: any[]) => {
        this.levels = data;
      },
      (error: any) => {
        console.error('Error loading levels', error);
      }
    );
  }

}
