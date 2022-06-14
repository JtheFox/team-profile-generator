// package imports
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateHTML');

function promptMember(role) {
    const roleQuestion = Object.entries({
        manager: {
            type: 'input',
            name: 'office',
            message: 'Enter the member\'s office number:'
        },
        engineer: {
            type: 'input',
            name: 'github',
            message: 'Enter the member\'s GitHub username:'
        },
        intern: {
            type: 'input',
            name: 'school',
            message: 'Enter the member\'s school name:'
        }
    });

   const memberQuestions = [
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
        roleQuestion.get(role) || roleQuestion.get('engineer')
    ]
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
            type: 'input',
            name: 'role',
            message: 'Enter the team member\'s role (manager, engineer, intern, etc):\n'
        }]);
        console.log('Role', role)
    }
}

init();