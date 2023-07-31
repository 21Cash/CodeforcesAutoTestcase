const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs')
const port = 10043;

app.use(bodyParser.json());

app.post('/', (req, res) => {
  const data = req.body;

  let arr = [];
  
  
  
  
  const jsonString = JSON.stringify(data, null, 4);
  
  
  const jsonFile = JSON.parse(jsonString);
  
  
  const testCases = jsonFile.tests;
  
  
  
  for(let test of testCases) {
    arr.push({
      "correct_answers" : [test.output.trim()],
      "test" : test.input
    });
  }
  

  
  
  const str = JSON.stringify(arr);
  
  
  
  fs.writeFile('cash.cpp__tests', str,
    function(err) {     
  });

  console.log("Testcases Loaded.\n");

  res.sendStatus(200);
});

app.listen(port, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Listening on port ${port}`);
});