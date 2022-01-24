import { Generic } from "./generic";
import { Question } from "./question";
import { Subject } from './subject';

export class Test implements Generic {
    id: number;
    name: string;    
    questions: Question[] = [];
    subjectFather: Subject;
    subjectSon: Subject;
    answered: boolean;
}
