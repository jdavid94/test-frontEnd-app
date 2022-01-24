import { Generic } from "./generic";
import { Student } from "./student";
import { Test } from "./test";

export class Course implements Generic {
    id: number;
    name: string;
    createAt: string;
    students: Student[] = [];
    tests: Test[] = [];
}
