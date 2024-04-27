import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrameworkService {
  private frameworkKey: string = 'framework';

  constructor() { }

  // save to local storage
  saveFramework(framework: any[]): void {
    localStorage.setItem(this.frameworkKey, JSON.stringify(framework));
  }

  // retrieve from local storage
  getFramework(): any[] {
    const frameworkData = localStorage.getItem(this.frameworkKey);
    return frameworkData ? JSON.parse(frameworkData) : [];
  }

  // Method to remove a course from the framework schedule
  removeFromFramework(course: any): void {
    let frameworkData = this.getFramework();
    const index = frameworkData.findIndex((c: any) => c.courseCode === course.courseCode);
    if (index !== -1) {
      frameworkData.splice(index, 1);
      this.saveFramework(frameworkData); 
    }
  }
}
