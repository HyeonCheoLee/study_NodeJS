var testFolder= './data'; // 불러올 폴더의 위치(..은 이전 폴더, .은 현재 폴더)
var fs = require('fs'); // filesystem을 사용하기 위해 


fs.readdir(testFolder, (err, filelist) => { // 하나의 데이터씩 나누어 출력
    console.log(filelist);
    filelist.forEach(element => {
        console.log(element);
    });
})