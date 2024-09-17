// src/service/firestore.service.ts
// Correct imports
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, of, combineLatest } from 'rxjs';  // Correctly importing of and combineLatest from rxjs
import { map, catchError, switchMap } from 'rxjs/operators';  // Import necessary operators

interface UserStats {
  clasesCompletadas: number;
  tareasCompletadas: number;
  logros: number;
}

interface CurrentCourse {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface UserDocument {
  stats?: UserStats;             // Contains user stats
  currentCourse?: CurrentCourse; // Contains current course details
}

interface UserDocument {
  stats?: UserStats;
  currentCourse?: CurrentCourse;
  role?: string; // Added role property
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  // Fetch user stats
  getUserStats(userId: string): Observable<UserStats> {
    return this.firestore.collection('users').doc<UserDocument>(userId).valueChanges().pipe(
      map(user => user?.stats || { clasesCompletadas: 0, tareasCompletadas: 0, logros: 0 }),
      catchError(error => {
        console.error('Error fetching user stats:', error);
        return of({ clasesCompletadas: 0, tareasCompletadas: 0, logros: 0 });
      })
    );
  }

  // Fetch the current course for the user
  getCurrentCourse(userId: string): Observable<CurrentCourse | null> {
    return this.firestore.collection('users').doc<UserDocument>(userId).valueChanges().pipe(
      map(user => user?.currentCourse || null), // Properly access currentCourse
      catchError(error => {
        console.error('Error fetching current course:', error);
        return of(null);
      })
    );
  }

  // Fetch recent sessions
  getRecentSessions(userId: string): Observable<any[]> {
    return this.firestore.collection('users').doc(userId).collection('sessions', ref => ref.orderBy('date', 'desc')).valueChanges().pipe(
      catchError(error => {
        console.error('Error fetching recent sessions:', error);
        return of([]);
      })
    );
  }

  

  // Fetch videos for a specific lesson
  getVideos(lessonId: string): Observable<any[]> {
    return this.firestore.collection(`lessons/${lessonId}/videos`).valueChanges().pipe(
      catchError(error => {
        console.error('Error fetching videos:', error);
        return of([]);
      })
    );
  }

  // Fetch materials for a specific lesson
  getMaterials(lessonId: string): Observable<any[]> {
    return this.firestore.collection(`lessons/${lessonId}/materials`).valueChanges().pipe(
      catchError(error => {
        console.error('Error fetching materials:', error);
        return of([]);
      })
    );
  }

  // Fetch tasks for a specific lesson
  getTasks(lessonId: string): Observable<any[]> {
    return this.firestore.collection(`lessons/${lessonId}/tasks`).valueChanges().pipe(
      catchError(error => {
        console.error('Error fetching tasks:', error);
        return of([]);
      })
    );
  }

  // Add Audio to a Lesson
  addAudio(lessonId: string, audioFile: File): Promise<DocumentReference<unknown>> {
    const filePath = `lessons/${lessonId}/audios/${audioFile.name}`;
    const fileRef = this.storage.ref(filePath);
    return this.storage.upload(filePath, audioFile)
      .then(() => fileRef.getDownloadURL().toPromise())
      .then(url => {
        return this.firestore.collection(`lessons/${lessonId}/audios`).add({
          url,
          name: audioFile.name,
          createdAt: new Date(),
        });
      })
      .catch(error => {
        console.error('Error adding audio:', error);
        throw error;
      });
  }

  // Delete Audio from a Lesson
  deleteAudio(lessonId: string, audioId: string): Promise<void> {
    return this.firestore.collection(`lessons/${lessonId}/audios`).doc(audioId).delete()
      .catch(error => {
        console.error('Error deleting audio:', error);
        throw error;
      });
  }

  // Assign a course to a user
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

  // Fetch a single audio document by ID
  getAudioById(lessonId: string, audioId: string): Observable<any> {
    return this.firestore
      .doc(`lessons/${lessonId}/audios/${audioId}`)
      .valueChanges()
      .pipe(
        catchError(error => {
          console.error('Error fetching audio by ID:', error);
          return of(null);
        })
      );
  }

  // Fetch all audios for a lesson by lesson ID
  getAudiosByLessonId(lessonId: string): Observable<any[]> {
    return this.firestore.collection(`lessons/${lessonId}/audios`).valueChanges().pipe(
      catchError(error => {
        console.error('Error fetching audios by lesson ID:', error);
        return of([]);
      })
    );
  }

 // Fetch audios for a specific lesson identified by its title
 getAudios(lessonId: string, lessonIdentifier: string): Observable<any[]> {
  return this.firestore.collection(`lessons/${lessonId}/audios`, ref =>
    ref.where('lessonTittle', '==', lessonIdentifier) // Filtering by lesson title or ID
  ).valueChanges().pipe(
    catchError(error => {
      console.error('Error fetching audios:', error);
      return of([]);
    })
  );
}


// Fetch user role
getUserRole(userId: string): Observable<string | null> {
  // Specify the type explicitly to avoid type errors
  return this.firestore.collection('users').doc<UserDocument>(userId).valueChanges().pipe(
    map(user => user?.role || null),  // Access role safely
    catchError(error => {
      console.error('Error fetching user role:', error);
      return of(null);  // Handle errors gracefully
    })
  );
}


// Fetch feedbacks for a specific student
getFeedbacksForStudent(studentId: string): Observable<any[]> {
  return this.firestore.collection('users').doc(studentId).collection('feedbacks').valueChanges().pipe(
    catchError(error => {
      console.error('Error fetching feedbacks:', error);
      return of([]);
    })
  );
}

// Add feedback for a student
addFeedback(studentId: string, feedback: { name: string; description: string; date: Date }): Promise<void> {
  return this.firestore.collection('users').doc(studentId).collection('feedbacks').add(feedback).then(() => {
    console.log('Feedback added successfully');
  }).catch(error => {
    console.error('Error adding feedback:', error);
    throw error;
  });
}

// Fetch students (users without the teacher role)
getStudents(): Observable<UserDocument[]> {
  return this.firestore.collection<UserDocument>('users', ref => ref.where('role', '==', 'student'))
    .valueChanges()
    .pipe(
      catchError(error => {
        console.error('Error fetching students:', error);
        return of([]);
      })
    );
}

// Upload a file to a specified lesson collection (audio, video, tasks, materials)
uploadFile(lessonId: string, file: File, type: 'audios' | 'videos' | 'tasks' | 'materials'): Promise<DocumentReference<unknown>> {
  const filePath = `lessons/${lessonId}/${type}/${file.name}`;
  const fileRef = this.storage.ref(filePath);
  return this.storage.upload(filePath, file)
    .then(() => fileRef.getDownloadURL().toPromise())
    .then(url => {
      return this.firestore.collection(`lessons/${lessonId}/${type}`).add({
        url,
        name: file.name,
        createdAt: new Date(),
      });
    })
    .catch(error => {
      console.error(`Error uploading ${type}:`, error);
      throw error;
    });
}

// Fetch files (audio, video, tasks, materials) for a lesson
getFiles(lessonId: string, type: 'audios' | 'videos' | 'tasks' | 'materials'): Observable<any[]> {
  return this.firestore.collection(`lessons/${lessonId}/${type}`).valueChanges().pipe(
    catchError(error => {
      console.error(`Error fetching ${type}:`, error);
      return of([]);
    })
  );
}

// Fetch feedbacks for a specific student and include teacher names
getFeedbacksWithTeacherNames(studentId: string): Observable<any[]> {
  return this.firestore.collection('users').doc(studentId).collection('feedbacks').valueChanges().pipe(
    switchMap((feedbacks: any[]) => {
      if (feedbacks.length === 0) return of([]); // Return empty array if no feedbacks

      // Fetch teacher names for each feedback
      const teacherObservables = feedbacks.map(feedback => {
        if (!feedback.teacherId) {
          // Return feedback with "Unknown Teacher" if teacherId is missing
          return of({ ...feedback, teacherName: 'Unknown Teacher' });
        }

        // Retrieve teacher's name using teacherId
        return this.firestore.collection('users').doc(feedback.teacherId).valueChanges().pipe(
          map((teacher: any) => ({
            ...feedback,
            teacherName: teacher?.nombre || teacher?.displayName || teacher?.name || 'Unknown Teacher'  // Fallback if name fields are missing
          }))
        );
      });
      return combineLatest(teacherObservables);
    }),
    catchError(error => {
      console.error('Error fetching feedbacks with teacher names:', error);
      return of([]);
    })
  );
}


}
