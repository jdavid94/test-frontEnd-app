import { Question } from './question';
import { Student } from './student';

export class Answer {
    id: string;
    text: string;
    student: Student;
    question: Question;
}
