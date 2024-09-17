// src/app/lessons/lessons.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Define types for Lessons, Course, and Courses with an index signature
type Lesson = {
  id: string;       // Add ID field
  title: string;    // Lesson title
};

type Lessons = {
  [key: number]: Lesson[];  // Updated to use Lesson type
};

type Course = {
  title: string;
  lessons: Lessons;
};

type Courses = {
  [key: string]: Course;  // Index signature to allow string indexing
};

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {
  courseTitle: string = '';
  levels: { number: number; lessons: Lesson[] }[] = [];  // Use Lesson type here

  courses: Courses = {
    newcomers: {
      title: 'New Comers',
      lessons: {
        1: [
          { id: '1', title: 'Professions and occupations' },
          { id: '2', title: 'Likes and dislikes: what do you like to do, and don\'t' },
          { id: '3', title: 'Introduce yourself: Name, Age, location, spell your name, basic wh questions' },
          { id: '4', title: 'Numbers: How do pay for something?' },
          { id: '5', title: 'Meeting new people: scenario type of activities, going to places and meeting' }
        ],
        2: [
          { id: '6', title: 'Parts of the body / Adjectives' },
          { id: '7', title: 'Colors and things related to one\'s reality: this, that, these and those' },
          { id: '8', title: 'Family members: S apostrophe' },
          { id: '9', title: 'Physical description: Adjectives, has / have, To be' }
        ],
        3: [
          { id: '10', title: 'Basic WH questions: What, Where, When, Which and Who' },
          { id: '11', title: 'Ask for general information: can you tell me, can you give me, will you, could you, among others.' },
          { id: '12', title: 'Fixed sentences, Seasons of the year, vocab about wearing clothes' }
        ],
        4: [
          { id: '13', title: 'At the doctor\'s office: make an appointment, formal greetings, ask and give info, vocabulary about symptoms' },
          { id: '14', title: 'At the supermarket: how to carry out transactions, vocabulary about food and the supermarket' },
          { id: '15', title: 'At the bank: ask, how to find places within a bank, vocabulary about banks and bank-related things' },
          { id: '16', title: 'Going outside: ask directions, how to get to places' }
        ]
      }
    },
    novices: {
      title: 'Novices',
      lessons: {
        1: [
          { id: '17', title: 'Do and does various activities / Coordinators' },
          { id: '18', title: 'Daily Routines, include related phrasal verbs (wake)' },
          { id: '19', title: 'Give commands, imperatives, wh questions and giving directions' },
          { id: '20', title: 'Do and does various activities / Listening' },
          { id: '21', title: 'Do and does Shopping and clothes vocabulary' }
        ],
        2: [
          { id: '22', title: 'Parts of the body / Adjectives' },
          { id: '23', title: 'Short Stories, adverbs of frequency.' },
          { id: '24', title: 'What do you do on special dates / substitution' },
          { id: '25', title: 'Verb to be various activities / introduce yourself, family and friends' }
        ],
        3: [
          { id: '26', title: 'Verb to be various activities / professions' },
          { id: '27', title: 'Verb to be various activities / Physical description' },
          { id: '28', title: 'Verb to be various activities / Demonstratives and articles' },
          { id: '29', title: 'Subj and Obj Pronouns practice' },
          { id: '30', title: 'Pronouns Practice / Shopping Vocab' }
        ],
        4: [
          { id: '31', title: 'Articles and Demonstratives, Places' },
          { id: '32', title: 'Articles and demonstratives, Adjectives' },
          { id: '33', title: 'Articles and demonstratives, household items' },
          { id: '34', title: 'Demonstratives and articles / at a restaurant' },
          { id: '35', title: 'Demonstratives and articles / at the grocery store' }
        ]
      }
    },
    transitionals: {
      title: 'Transitionals',
      lessons: {
        1: [
          { id: '36', title: 'Superlatives and Comparatives / better - worse, best - worst' },
          { id: '37', title: 'Comps and Sups / Most - Least, More - Less' },
          { id: '38', title: 'Comps and Sups / titles and adjectives' },
          { id: '39', title: 'Sups and Comps / Scenario' },
          { id: '40', title: 'Sups and Comps / WH words, small businesses' },
          { id: '41', title: 'Sups and comps / At a restaurant' }
        ],
        2: [
          { id: '42', title: 'Present Continuous / like and dislike + ing' },
          { id: '43', title: 'Present Continuous + adverbs' },
          { id: '44', title: 'Present Continuous + wh questions' },
          { id: '45', title: 'Present Continuous / describe' },
          { id: '46', title: 'Present Continuous / Leisure activities (weekend mood)' },
          { id: '47', title: 'Present Continuous / Leisure act' }
        ],
        3: [
          { id: '48', title: 'Just Reflexives' },
          { id: '49', title: 'Subject and Object Pronouns' },
          { id: '50', title: 'Reflexives uses' },
          { id: '51', title: 'Subj and Obj Pronouns practice' },
          { id: '52', title: 'Pronouns Practice / Shopping Vocab' },
          { id: '53', title: 'Subject, Object and Reflexive Pronouns / Pirates Conversation' }
        ],
        4: [
          { id: '54', title: 'Possessives Intro' },
          { id: '55', title: 'Possessive Adjective and Pronouns / Describe' },
          { id: '56', title: 'Possessive apostrophes / Family relationships' },
          { id: '57', title: 'Possessives, introduce a friend' },
          { id: '58', title: 'Possessives / To the theater!' },
          { id: '59', title: 'Possessives Practice' }
        ]
      }
    },
    skilled: {
      title: 'Skilled',
      lessons: {
        1: [
          { id: '60', title: 'Can / can\'t - prepositions of time and place' },
          { id: '61', title: 'Can / can\'t practice' },
          { id: '62', title: 'Will vs going to / love and other stuff, Conversational skills' },
          { id: '63', title: 'Will vs Going to / quiz show' },
          { id: '64', title: 'Present Simple to talk about the future' }
        ],
        2: [
          { id: '65', title: 'Modals of speculation' },
          { id: '66', title: 'Might and may Intro' },
          { id: '67', title: 'Present simple + adverbs of time' },
          { id: '68', title: 'Present cont + adverbs of time' },
          { id: '69', title: 'Present cont + started but not finished' },
          { id: '70', title: 'Present Cont + Possessives' }
        ],
        3: [
          { id: '71', title: 'Uses of get' },
          { id: '72', title: 'Uses of get / imperatives' },
          { id: '73', title: 'Uses of get, story telling, give directions' },
          { id: '74', title: 'Should and must' },
          { id: '75', title: 'Might and may' }
        ],
        4: [
          { id: '76', title: 'New year\'s resolutions' },
          { id: '77', title: 'Present Perfect summary / music and love' },
          { id: '78', title: 'Darla the Llama Present perfect adverbs' },
          { id: '79', title: 'Personal Growth (Lately/ since/For/ recently)' }
        ]
      }
    }
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const courseId = +this.route.snapshot.paramMap.get('id')!;
    const courseKeys = Object.keys(this.courses) as Array<keyof Courses>;  // Ensure correct key type
    const courseKey = courseKeys[courseId - 1];  // Retrieve the correct course key

    if (courseKey && this.courses[courseKey]) {
      this.courseTitle = this.courses[courseKey].title;
      this.levels = Object.entries(this.courses[courseKey].lessons).map(([key, value]) => ({
        number: +key,
        lessons: value,
      }));
    }
  }

  goBack() {
    this.router.navigate(['/tabs/tab3']);  // Ensure correct route for navigation
  }

  goToUpdateProfile() {
    this.router.navigate(['/update-profile']);  // Ensure correct route for navigation
  }

  getLevelClass(level: number): string {
    switch (level) {
      case 1:
        return 'blue-background';
      case 2:
        return 'yellow-background';
      case 3:
        return 'green-background';
      case 4:
        return 'purple-background';
      default:
        return '';
    }
  }

  // Correct method to navigate to the lesson dashboard
  navigateToDashboard(lesson: Lesson) {  // Ensure lesson object is passed
    this.router.navigate(['/lesson-dashboard', lesson.id], { queryParams: { title: lesson.title } });
  }
}
