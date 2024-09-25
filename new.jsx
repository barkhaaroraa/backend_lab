const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your name: ', function(name) {
  rl.question('Enter your age: ', function(age) {
    rl.question('Enter your salary: ', function(salary) {
      console.log('Name:', name);
      console.log('Age:', age);
      console.log('Salary:', salary);
      rl.close();
    });
  });
});
