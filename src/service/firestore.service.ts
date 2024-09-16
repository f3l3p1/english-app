// src/service/firestore.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Define interfaces for user stats, current course, and recent session
interface UserStats {
  clasesCompletadas: number;
  tareasCompletadas: number;
  logros: number;
}

interface CurrentCourse {
  id: number;
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
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
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
    // Handle the DocumentReference internally if needed, but return void
    console.log('Session added successfully');
  }).catch(error => {
    console.error('Error updating recent sessions:', error);
    throw error;
  });
}


}
