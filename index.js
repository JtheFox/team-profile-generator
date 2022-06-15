// package imports
const inquirer = require('inquirer');
const fs = require('fs');
const generateHTML = require('./utils/generateHTML');

function getMemberPrompts(role) {
    const roleQuestions = {
        engineer: 'Enter the engineer\'s GitHub username:',
        intern: 'Enter the intern\'s school name:'
    };
    return [
        {
            type: 'input',
            name: 'name',
            message: `Enter the ${role}'s name:`
        },
        {
            type: 'input',
            name: 'email',
            message: `Enter the ${role}'s email:`
        },
        {
            type: 'input',
            name: 'info',
            message: roleQuestions[role]
        }
    ]
}

function writeHTML(html) {
    try {
        fs.writeFileSync('team.html', html)
        console.log('Page successfully created at team.html');
    } catch {
        console.log('Error writing to file, please try again.');
    }
}

async function init() {
    var id = 1;
    const team = [];
    const manager = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the manager\'s name:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter the manager\'s email:'
        },
        {
            type: 'input',
            name: 'info',
            message: 'Enter the manager\'s office number:'
        }
    ]);
    team.push({ id, role: 'manager', ...manager })
    let role = true;
    do {
        id++;
        rolePrompt = await inquirer.prompt({
            type: 'list',
            name: 'role',
            message: 'Add a team member:',
            choices: [{ name: 'Engineer', value: 'engineer' }, { name: 'Intern', value: 'intern' }, { name: 'Done adding members', value: false }]
        });
        role = rolePrompt.role;
        if (role) {
            let member = await inquirer.prompt(getMemberPrompts(role));
            team.push({ id, role, ...member });
        }
    } while (role)
    console.log('Generating a webpage for your team...');
    writeHTML(generateHTML(team));
}

init();