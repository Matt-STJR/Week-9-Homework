// Part 1. Create a function that contains the structure of the README and corresponding user input values (done in separate file to keep it cleaner)
function readmeItemGenerator(userInput) {
    return `
        # **README GENERATOR - Week 9 Homework**

        # Title of Project
        ${userInput.projectTitle}
        
        ## Description    
        ${userInput.description}
        
        ## Table of Contents
        ${userInput.tableOfContents}
        
        ### Installed packages 
        ${userInput.installation}

        ### Programs used during development
        ${userInput.builtWith}

        ### Useage cases 
        ${userInput.usage}

        ### Common questions
        ${userInput.questions}
        
        ### License${userInput.license}

        #### Badges
        [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
        
        ### GitHub Username of Primary Developer
        ${userInput.email}

        ### GitHub Profile Picture of Primary Developer
        ${userInput.avatar_url}

        ### Contributors
        ${userInput.contributors}
    `;
  }
  
  module.exports = readmeItemGenerator;