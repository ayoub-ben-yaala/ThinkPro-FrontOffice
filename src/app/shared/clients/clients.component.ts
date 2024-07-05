import { Component } from '@angular/core';
import { LevelManagementService } from '../level-management/level-management.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  levels: any[] = [];
  numbers: number[] = [1, 2, 3, 4, 5, 6];
  coursList1: any[] = [];
  coursList2: any[] = [];
  coursList3: any[] = [];
  coursList4: any[] = [];
  coursList5: any[] = [];
  coursList6: any[] = [];
  coursLists: { [key: number]: any[] } = {};
  displayCourses: { [key: number]: boolean } = {};

  constructor(private levelService: LevelManagementService){}

  ngOnInit(): void {
    this.loadLevels();
    //this.getLevelByName("1",this.coursLists);
    console.log(this.levels);
    
    
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots:true,
    effect: 'fade',
    autoplay:true,
    autoplaySpeed:4000
  };
  loadLevels(): void {
    this.levelService.getAllLevels().subscribe(
      (data: any[]) => {
        this.levels = data;
        console.log(this.levels);
        
        
      },
      (error: any) => {
        console.error('Error loading levels', error);
      }
    );
  }

  getLevelByName(levelName: string, levelNumber: number): void {
    const filteredLevels = this.levels.filter(level => level.levelName === levelName);
    this.coursLists[levelNumber] = [];
    filteredLevels.forEach(level => {
      this.levelService.getCoursById(level.cours).subscribe(
        course => {
          this.coursLists[levelNumber].push(course);
        },
        error => {
          console.error('Error fetching course:', error);
        }
      );
    });
  }

  toggleCourses(levelNumber: number): void {
    if (!this.coursLists[levelNumber]) {
      this.getLevelByName(levelNumber.toString(), levelNumber);
    }
    this.displayCourses[levelNumber] = !this.displayCourses[levelNumber];
  }

  getCoursList(levelNumber: number): any[] {
    return this.coursLists[levelNumber] || [];
  }
  exportToPDF(levelNumber: number): void {
    const doc = new jsPDF();
    const courses = this.getCoursList(levelNumber).map(course => [course.courName, course.duration, course.description]);
    autoTable(doc, {
      head: [['Course Name', 'Duration', 'Description']],
      body: courses,
    });
    doc.save(`courses_level_${levelNumber}.pdf`);
  }
  
}
