// src/service/firestore.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Define interfaces for user stats, current course, and recent session
interface UserStats {
  clasesCompletadas: number;
  tareasCompletadas: number;
  logros: number;
}

interface CurrentCourse {
  id: string; // Changed to string to match course IDs like 'newcomers'
  title: string;
  description: string;
  image: string;
}

interface RecentSession {
  title: string;
  sessionNumber: number;
  date: Date;
}

interface UserDocument {
  stats?: UserStats;
  currentCourse?: CurrentCourse;
  completedLessons?: string[]; // To track completed lessons
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private coursesOrder: string[] = ['newcomers', 'novices', 'transitionals', 'skilled'];

  constructor(private firestore: AngularFirestore) {}

  // Fetch user stats
  getUserStats(userId: string): Observable<UserStats> {
    return this.firestore.collection('users').doc<UserDocument>(userId).valueChanges().pipe(
      map(user => user?.stats || { clasesCompletadas: 0, tareasCompletadas: 0, logros: 0 }),
      catchError(error => {
        console.error('Error fetching user stats:', error);
        throw error;
      })
    );
  }

  // Fetch the current course for the user
  getCurrentCourse(userId: string): Observable<CurrentCourse | null> {
    return this.firestore.collection('users').doc<UserDocument>(userId).valueChanges().pipe(
      map(user => user?.currentCourse || null),
      catchError(error => {
        console.error('Error fetching current course:', error);
        throw error;
      })
    );
  }

  // Fetch recent sessions
  getRecentSessions(userId: string): Observable<RecentSession[]> {
    return this.firestore.collection('users').doc(userId).collection<RecentSession>('sessions', ref => ref.orderBy('date', 'desc')).valueChanges().pipe(
      catchError(error => {
        console.error('Error fetching recent sessions:', error);
        throw error;
      })
    );
  }

  // Check if the user can subscribe to the next course
  canSubscribe(userId: string, nextCourseId: string): Observable<boolean> {
    return this.firestore.collection('users').doc<UserDocument>(userId).valueChanges().pipe(
      map(user => {
        const completedLessons = user?.completedLessons || [];
        const currentCourse = user?.currentCourse?.id || 'newcomers'; // Defaults to 'newcomers'
        const currentIndex = this.coursesOrder.indexOf(currentCourse);
        const expectedNextCourse = this.coursesOrder[currentIndex + 1];

        // Ensure the user is trying to subscribe to the correct next course
        if (nextCourseId !== expectedNextCourse) {
          return false;
        }

        // Check if all lessons for the current course are completed
        return this.hasCompletedAllLessons(currentCourse, completedLessons);
      }),
      catchError(error => {
        console.error('Error checking subscription eligibility:', error);
        return of(false);
      })
    );
  }

  // Helper method to check if all lessons are completed
  private hasCompletedAllLessons(courseId: string, completedLessons: string[]): boolean {
    const lessonsMap: Record<string, string[]> = {
      newcomers: ['lesson1', 'lesson2'], // Replace with actual lessons
      novices: ['lesson1', 'lesson2'],
      transitionals: ['lesson1', 'lesson2'],
      skilled: ['lesson1', 'lesson2'],
    };

    const requiredLessons = lessonsMap[courseId] || [];
    // Add explicit typing for the lesson parameter
    return requiredLessons.every((lesson: string) => completedLessons.includes(lesson));
  }

  // Assign a course to the user
  assignCourse(userId: string, course: CurrentCourse): Promise<void> {
    return this.firestore.collection('users').doc(userId).update({
      currentCourse: course,
      stats: {
        clasesCompletadas: 0,
        tareasCompletadas: 0,
        logros: 0,
      }
    }).then(() => {
      console.log(`Assigned course ${course.title} to user ${userId}`);
    }).catch(error => {
      console.error('Error assigning course:', error);
      throw error;
    });
  }

  // Update stats after completing a lesson
  updateUserStats(userId: string, completedLessons: number, completedTasks: number, achievements: number): Promise<void> {
    return this.firestore.collection('users').doc(userId).update({
      'stats.clasesCompletadas': completedLessons,
      'stats.tareasCompletadas': completedTasks,
      'stats.logros': achievements
    }).catch(error => {
      console.error('Error updating user stats:', error);
      throw error;
    });
  }

  // Update recent sessions to return a void promise by handling the DocumentReference internally
  updateRecentSessions(userId: string, session: RecentSession): Promise<void> {
    return this.firestore.collection('users').doc(userId).collection('sessions').add({
      ...session,
      date: new Date()
    }).then(() => {
      console.log('Session added successfully');
    }).catch(error => {
      console.error('Error updating recent sessions:', error);
      throw error;
    });
  }
}
