// package imports
const inquirer = require('inquirer');
const fs = require('fs');
const generateHTML = require('./utils/generateHTML');

function getMemberPrompts(role) {
    const roleQuestion = new Map(Object.entries({
        manager: 'Enter the member\'s office number:',
        engineer: 'Enter the member\'s GitHub username:',
        intern: 'Enter the member\'s school name:'
    }));

   return [
        {
            type: 'input',
            name: 'name',
            message: 'Enter the member\'s name:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the member\'s email:'
        },
        {
            type: 'input',
            name: 'info',
            message: roleQuestion.get(role)
        }
    ]
}

function writeHTML(html) {
    try {
        fs.writeFileSync('generated.html', html)
        console.log('Page successfully created at generated.html');
    } catch {
        console.log('Error writing to file, please try again.');
    }
}

async function init() {
    const team = await inquirer.prompt([{
        type: 'input',
        name: 'count',
        message: 'How many members are in your team?',
        async validate(num) {
            if (isNaN(num)) return 'Please enter a number'
            num = parseInt(num);
            if (Math.floor(num) > 0 && num < 7) return true;
            else return 'Please enter a number 1-6';
        }
    }]);
    team.members = [];
    for (let i = 0; i < team.count; i++) {
        let rolePrompt = await inquirer.prompt([{
            type: 'list',
            name: 'role',
            message: `Choose team member ${i}'s role:`,
            choices: [{name: 'Manager', value: 'manager'}, {name: 'Engineer', value: 'engineer'}, {name: 'Intern', value: 'intern'}]
        }]);
        let infoPrompt = await inquirer.prompt(getMemberPrompts(rolePrompt.role));
        team.members.push({
            id: i+1,
            ...rolePrompt,
            ...infoPrompt
        })
    }
    console.log('Generating a webpage for your team...');
    writeHTML(generateHTML(team.members));
}

init();