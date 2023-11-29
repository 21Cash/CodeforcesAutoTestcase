const app = require('express')();
const bodyParser = require('body-parser');
const fs = require('fs')

app.use(bodyParser.json());

const port = 10043;

function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const formattedDateTime = `[${year}/${month}/${day} ${hours}:${minutes}:${seconds}]`;

  return formattedDateTime;
}

function getWritePath() {
  const pathData = fs.readFileSync('path.txt', 'UTF-8');
  const lines = pathData.split(/\r?\n/);
  
  const pathStr = lines[0];
  return pathStr;
}

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
  
  // console.log("WritePath : ");
  // console.log(pathStr);
  
  const pathStr = getWritePath();

  
  fs.writeFile(pathStr, str,
    function(err) {     
  });

  console.log(`${getCurrentDateTime()} => Testcases Loaded.\n`);

  res.sendStatus(200);
});

app.listen(port, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Listening on port ${port}`);

  console.log(`Writing To Path ${getWritePath()}`);
});