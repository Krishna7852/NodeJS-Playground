const fs = require('fs');
/**
 * Q4) Write the smallest possible Nodejs script, which parses this file and puts the questions in correct order into another file. 
 * Your approach should be generic with minimal assumptions.
 * Note: All Quations are Listed in quations.txt file
 */
/* Assumptions 
1. each question starts with Q
2. each question will consists of integer followed by Q
3. each question indexing closes with a )
*/
class arrangeQuestions {
    constructor() {
        this.filename = './questions.txt';
    }

    async readFile() {
        const fileContent = fs.readFileSync(this.filename, 'utf-8');
        return fileContent;
    }

    isQuestion(question) {
        const lst = question.split('');
        if(lst[0] === 'Q' && !isNaN(parseInt(lst[1])) && question.includes(')')) {
            return true;
        }
        return false;
    }

    async groupQuestions(stringList) {
        const questions = {};
        let question = '';
        for (let i = 0 ; i < stringList.length; i++) {
            const str = stringList[i].trim();
            if (str) {
                if(this.isQuestion(str)) {
                    question = str.slice(0, str.indexOf(')') + 1);
                    questions[question] = str.slice(str.indexOf(')') + 1, str.length);
                }
                else {
                    questions[question] = (questions[question] || '') + str + '\n';
                }
            }
        }
        return questions;
    }

    async arrangeContents() {
        const fileContent = await this.readFile();
        const questions = await this.groupQuestions(fileContent.split('\n'));
        const questionKeys = Object.keys(questions).sort();
        fs.writeFileSync('out.txt', ''); //clear file content
        for (let i = 0; i < questionKeys.length; i++) {
            fs.writeFileSync('out.txt', questionKeys[i] + ' ' + questions[questionKeys[i]] + '\n', { flag: "a+" });
        }
    }
}

const obj =  new arrangeQuestions();

obj.arrangeContents();