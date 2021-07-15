const fs = require('fs');
const inq = require('inquirer');
const generatePage = require('./src/page-template.js')
const profileDataArgs = process.argv.slice(2, process.argv.length);
const [name, github] = profileDataArgs



fs.writeFile('index.html', generatePage(name, github), err => {
  if (err) throw new Error(err);

  console.log('Portfolio complete')
});

