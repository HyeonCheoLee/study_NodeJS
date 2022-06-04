const fs = require('fs');   //파일시스템
fs.readFile('sample.txt', 'utf8', (err,data)=>{
    console.log(data);
});

//이후 cmd에서 nodejs/nodejs 폴더로 이동한다.
//cd nodejs
//node fileread.js
//파일을 읽어서 콘솔로 출력한다. 