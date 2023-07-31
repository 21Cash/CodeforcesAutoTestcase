const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs')

app.use(bodyParser.json());

const port = 10043;

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
  

  const pathData = fs.readFileSync('path.txt', 'UTF-8');
  const lines = pathData.split(/\r?\n/);
  
  const pathStr = lines[0];
  
  const str = JSON.stringify(arr);
  
  // console.log("WritePath : ");
  // console.log(pathStr);
  
  
  fs.writeFile(pathStr, str,
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