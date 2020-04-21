// ------ THE GLORIOUS METHOD WHICH IS FANTASTIC AND CLEAR ------ \\
// Part 1. Create a function that contains the structure of the README and corresponding user input values (done in separate file to keep it cleaner)
// Part 2. Add declarations for variables and dependencies, which includes the file made in part 1
// Part 3. Use an inquirer function to prompt the user for project details so they can be inserted into the object from part 1
// Part 4. Use an Axios function to call GitHub details and return the result for the inquirer function in part 3 to use
// Part 5. Execute the formal writing of the README after all parts above have completed
// ------ Each part is pasted again above the relevant code ------ \\


// Part 1 is contentGenerator.js

// Part 2. Add declarations for variables and dependencies, which includes the file made in part 1
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const readmeItemGenerator = require("./contentGenerator.js")
const writeFileAsync = util.promisify(fs.writeFile);

// Part 3. Use an inquirer function to prompt the user for project and GitHub details so they can be inserted into the object from part 1
function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            name: "projectTitle",
            message: "What is the title of your project?",
        },
        {
            type: "checkbox",
            message: "What items do you want in your table of contents?",
            name: "tableOfContents",
            choices: [
                "Project Title",
                "Description",
                "Installation",
                "Built With",
                "Usage",
                "License",
                "Contributors",
                "Tests",
                "Questions"
            ]
        },
        {
            type: "input",
            name: "description",
            message: "If you could describe your project to your grandma in simple terms, what would you say?"
        },
        {
            type: "input",
            name: "builtWith",
            message: "What programs/apps did you use to develop this project? Note: Magic is an acceptable answer if you'd rather not tell the truth",
        },
        {
            type: "input",
            name: "installation",
            message: "If you installed anything for this project, what was it?",
        },
        {
            type: "input",
            name: "usage",
            message: "Without getting existential, what is the use of this project?"
        },
        {
            type: "list",
            name: "license",
            message: "Which license is most appropriate for this project? (listed in order of global use)",
            choices: [
                "MIT",
                "GPL 3.0",
                "Apache 2.0",
                "GPL 2.0",
                "BSD 3",
                "LGPL 2.1",
                "MS-Pl",
                "BSD 2"
            ]
        },
        {
            type: "input",
            name: "contributors",
            message: "Who contributed this project? Or are you going to claim you're some solo champ?"
        },
        {
            type: "input",
            name: "tests",
            message: "Which tests did you include, if any?"
        },
        {
            type: "input",
            name: "questions",
            message: "What should someone do if they can't make sense of your code?"
        },
        {
            type: "input",
            name: "username",
            message: "What's your GitHub username?"
        }
    ]);
} 

// Part 4. Use an Axios function to call GitHub details and return the result for the inquirer function in part 3 to use
const axios = require("axios");

function apiCall( username ) {
  const queryUrl = `https://api.github.com/users/${username}`;
  
  return axios
  .get(queryUrl)
  .then(function(response){
    
    const result = {
        avatar_url: response.data.avatar_url,
        email : (response.data.email) ? response.email : "my_email@github.com"
    }
    return result;
  })
};

// Part 5. Execute the formal writing of the README after all parts above have completed
  async function initialise() {
   
    try {
      const userInput = await promptUser();
      const results = await apiCall(userInput.username);
      userInput.email = results.email;
      userInput.avatar_url = results.avatar_url;
      const generateContent = readmeItemGenerator(userInput);
       
      console.log(results);
      await writeFileAsync("README.md", generateContent);
  
      console.log("Successfully wrote to README.md");
    } catch(err) {
      console.log(err);
    }
  }
  
  initialise();  