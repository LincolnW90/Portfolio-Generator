const inq = require('inquirer');
const { type } = require('os');

// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

const promptUser = () => {
  return inq.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('enter your username');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Do you want a bio section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide information about yourself (bio)',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};

const promptProject = portfolioData => {
  // if no project array, adds it
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`
  ==================
  Add a new project
  ==================
  `);
  return inq.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your project name? (required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('enter your project name');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Describe the project (required)'
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What languages is this project built with? (select all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('enter your GitHub link');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to add another project?',
      default: false
    }
  ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    })
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });