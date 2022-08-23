const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
const fs = require('fs');
const { exec } = require('child_process');
const loadingText = (text) => {
  const loading = [
    `${text}\x1b[36m/\x1b[0m `,
    `${text}\x1b[36m-\x1b[0m `,
    `${text}\x1b[36m\\\x1b[0m `,
    `${text}\x1b[36m|\x1b[0m `,
  ];
  let i = 0;
  return setInterval(() => {
    process.stdout.write(`\r${loading[i++]}`);
    if (i === loading.length) {
      i = 0;
    }
  }, 100);
};
const initMEAN = () => {
  try {
    readline.question('Enter your project name: ', (projectName) => {
      const generatingBacked = loadingText('Generating backend...');
      let generatingFrontend;
      let installingDependencies;
      exec(
        `git clone https://github.com/Natanael-Acero/nodejs-backend-structure ${projectName}-backend`,
        (err, stdout, stderr) => {
          if (err) {
            clearInterval(generatingBacked);
            process.stdout.write('\r');
            console.log(err);
            return;
          }
          clearInterval(generatingBacked);
          process.stdout.write('\r');
          console.log(stdout);
          console.log(stderr);
          fs.writeFile(
            `${projectName}-backend/package.json`,
            `{
            "name": "${projectName}-backend",
            "version": "1.0.0",
            "description": "",
            "main": "server.js",
            "scripts": {
              "test": "echo \\"Error: no test specified\\" && exit 1",
              "start": "node server.js"
            },
            "author": "",
            "license": "MIT",
            "dependencies": {
                "bcrypt": "^5.0.1",
        "body-parser": "^1.19.0",
        "colors": "^1.4.0",
        "cors": "^2.8.5",
        "express": "^4.17.1",
        "jsonwebtoken": "^8.5.1",
        "mongoose": "^5.8.9",
        "nodemailer": "^6.4.4"
            },
            "devDependencies": {
              "nodemon": "^1.18.4",
              "eslint": "^5.16.0"
            }
          }`,
            (err) => {
              if (err) {
                console.log(err);
                readline.close();
              } else {
                process.stdout.write('\r');
                console.log('\x1b[32m', 'Backend generated successfully!');
                generatingFrontend = loadingText('Generating frontend...');
              }
            }
          );
        }
      );
      exec(
        `ng new ${projectName}-frontend --skip-install --style=scss`,
        (error, stdout, stderr) => {
          if (error) {
            console.log(error);
            return;
          }
          clearInterval(generatingFrontend);
          console.log(stdout);
          console.log(stderr);
          console.log('\x1b[34mFrontend done!\x1b[0m');
          readline.question(
            'Do you want to install dependencies? [Y/n] ',
            (answer) => {
              if (answer.toLowerCase() === 'y') {
                installingDependencies = loadingText(
                  'Installing backend dependencies...'
                );
                exec(
                  `cd ${projectName}-backend && npm install && cd ..`,
                  (err, stdout, stderr) => {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    console.log(stdout);
                    console.log(stderr);
                    console.log('\x1b[34mBackend done!\x1b[0m');
                    clearInterval(installingDependencies);
                    process.stdout.write('\r');
                    installingDependencies = loadingText(
                      'Installing frontend dependencies...'
                    );
                  }
                );

                exec(
                  `cd ${projectName}-frontend && npm install`,
                  (err, stdout, stderr) => {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    console.log(stdout);
                    console.log(stderr);
                    console.log('\x1b[34mFrontend done!\x1b[0m');
                    clearInterval(installingDependencies);
                    process.stdout.write('\r');
                    console.log('\x1b[32m', 'All done!');
                  }
                );
              } else {
                console.log('\x1b[36mProject generated successfully!\x1b[0m');
                console.log('\x1b[33mDependencies not installed!\x1b[0m');
                console.log(
                  '\x1b[33mRun "npm install" in the project folder to install them!\x1b[0m'
                );
              }
              readline.close();
            }
          );
        }
      );
    });
  } catch (error) {
    console.log('CATCH:', error);
  }
};

module.exports = {
  initMEAN,
};
