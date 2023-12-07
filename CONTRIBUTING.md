# Guide to Contributing

### Team Norms
- Treat each other with respect
- Actively listen
- Be willing to compromise
- Be open to relying on and helping each other
- Meet on Wednesdays after 6:30 pm
  
### Git Workflow
- We will follow a forking and feature-branching Git workflow such that when a developer wants to make a change or implement a feature, they will create a branch on the local repository, make the changes, create a pull request, and wait for members of the team to review the changes. If successful, the other members will approve the merge request.
  
### Rules of Contributions
- The contributions will be related to the user stories the developer is assigned to work and every developer has the responsibility of making contributions and double-checking that the contributions are valid/correct in regard to the project.

### Instructions for Local Environment
- We'll be using a primarily Linux-focused local environment and explore the possibilities of using Docker.

### Instructions for Building and Testing
#### To run front-end...
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- use `npm install` and `npm install react`, then `npm start` in the project directory `cd front-end` so the front-end app runs.
- open [http://localhost:3001](http://localhost:3001) to view the web app in your browser. The page will reload when you make changes.
- create an account, or use a valid log in to access the full app's functionality
- use `npm test` for testing

#### To run and test back-end...
- use `npm install`, then `npm start` in the project directory `cd back-end` for the back-end to run
- be sure to use `npm install c8 --save-dev`, `npm install mocha chai --save-dev`, `npm install mongoose`, and `npm install express`
- use `npm test` to run the c8 module and mocha/chai unit tests. results and code coverage will appear in the terminal
- open [http://localhost:3001](http://localhost:3001) to view the complete app in your browser.