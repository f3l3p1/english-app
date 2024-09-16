import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Define types for Lessons, Course, and Courses with an index signature
type Lessons = {
  [key: number]: string[];
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
  levels: { number: number; lessons: string[] }[] = [];

  courses: Courses = {
    newcomers: {
      title: 'New Comers',
      lessons: {
        1: [
          'Professions and occupations',
          'Likes and dislikes: what do you like to do, and don\'t',
          'Introduce yourself: Name, Age, location, spell your name, basic wh questions',
          'Numbers: How do pay for something?',
          'Meeting new people: scenario type of activities, going to places and meeting'
        ],
        2: [
          'Parts of the body / Adjectives',
          'Colors and things related to one\'s reality: this, that, these and those',
          'Family members: S apostrophe',
          'Physical description: Adjectives, has / have, To be'
        ],
        3: [
          'Basic WH questions: What, Where, When, Which and Who',
          'Ask for general information: can you tell me, can you give me, will you, could you, among others.',
          'Fixed sentences, Seasons of the year, vocab about wearing clothes'
        ],
        4: [
          'At the doctor\'s office: make an appointment, formal greetings, ask and give info, vocabulary about symptoms',
          'At the supermarket: how to carry out transactions, vocabulary about food and the supermarket',
          'At the bank: ask, how to find places within a bank, vocabulary about banks and bank-related things',
          'Going outside: ask directions, how to get to places'
        ]
      }
    },
    novices: {
      title: 'Novices',
      lessons: {
        1: [
          'Do and does various activities / Coordinators',
          'Daily Routines, include related phrasal verbs (wake)',
          'Give commands, imperatives, wh questions and giving directions',
          'Do and does various activities / Listening',
          'Do and does Shopping and clothes vocabulary'
        ],
        2: [
          'Parts of the body / Adjectives',
          'Short Stories, adverbs of frequency.',
          'What do you do on special dates / substitution',
          'Verb to be various activities / introduce yourself, family and friends'
        ],
        3: [
          'Verb to be various activities / professions',
          'Verb to be various activities / Physical description',
          'Verb to be various activities / Demonstratives and articles',
          'Subj and Obj Pronouns practice',
          'Pronouns Practice / Shopping Vocab'
        ],
        4: [
          'Articles and Demonstratives, Places',
          'Articles and demonstratives, Adjectives',
          'Articles and demonstratives, household items',
          'Demonstratives and articles / at a restaurant',
          'Demonstratives and articles / at the grocery store'
        ]
      }
    },
    transitionals: {
      title: 'Transitionals',
      lessons: {
        1: [
          'Superlatives and Comparatives / better - worse, best - worst',
          'Comps and Sups / Most - Least, More - Less',
          'Comps and Sups / titles and adjectives',
          'Sups and Comps / Scenario',
          'Sups and Comps / WH words, small businesses',
          'Sups and comps / At a restaurant'
        ],
        2: [
          'Present Continuous / like and dislike + ing',
          'Present Continuous + adverbs',
          'Present Continuous + wh questions',
          'Present Continuous / describe',
          'Present Continuous / Leisure activities (weekend mood)',
          'Present Continuous / Leisure act'
        ],
        3: [
          'Just Reflexives',
          'Subject and Object Pronouns',
          'Reflexives uses',
          'Subj and Obj Pronouns practice',
          'Pronouns Practice / Shopping Vocab',
          'Subject, Object and Reflexive Pronouns / Pirates Conversation'
        ],
        4: [
          'Possessives Intro',
          'Possessive Adjective and Pronouns / Describe',
          'Possessive apostrophes / Family relationships',
          'Possessives, introduce a friend',
          'Possessives / To the theater!',
          'Possessives Practice'
        ]
      }
    },
    skilled: {
      title: 'Skilled',
      lessons: {
        1: [
          'Can / can\'t - prepositions of time and place',
          'Can / can\'t practice',
          'Will vs going to / love and other stuff, Conversational skills',
          'Will vs Going to / quiz show',
          'Present Simple to talk about the future'
        ],
        2: [
          'Modals of speculation',
          'Might and may Intro',
          'Present simple + adverbs of time',
          'Present cont + adverbs of time',
          'Present cont + started but not finished',
          'Present Cont + Possessives'
        ],
        3: [
          'Uses of get',
          'Uses of get / imperatives',
          'Uses of get, story telling, give directions',
          'Should and must',
          'Might and may'
        ],
        4: [
          'New year\'s resolutions',
          'Present Perfect summary / music and love',
          'Darla the Llama Present perfect adverbs',
          'Personal Growth (Lately/ since/For/ recently)'
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
}
