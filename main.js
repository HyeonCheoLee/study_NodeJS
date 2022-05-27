var http = require('http'); //require  외부 모듈을 가져올수 있다.(http, fs, url 모듈)
var fs = require('fs');
var url = require('url');
var testFolder= './data'; // 불러올 폴더의 위치(..은 이전 폴더, .은 현재 폴더)

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;    //쿼리스트링 가져오기
    var pathName = url.parse(_url, true).pathname;    //pathname은 쿼리스트링이 아니라 단순히 pathname이다 

    console.log(url.parse(_url, true));
    console.log(queryData);

    if(pathName ==="/"){
        //쿼리스트링이 undefined면 title과 description 직접 세팅
        if(queryData.id === undefined){

            //파일을 읽어올 때, fs.readFile 을 사용한다.
            //디렉토리에 파일 목록 읽어올 때, fs.readdir 을 쓴다
            var title = "welcome";
            var description = "hello? there are nodejs..."

            //파일목록을 불러와서 루프처리
            fs.readdir(testFolder, (err, filelist) => { // 하나의 데이터씩 나누어 출력
                console.log(filelist);
                var list = "";

                filelist.forEach(element => {
                    list += `<li><a href="/?id=${element}">${element}</a></li>`
                });
                var template = 
                `
                <!doctype html>
                <html>
                    <head>
                        <title>${title}</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB</a></h1>
                        <ol>
                        ${list}
                        </ol>
                        <h2>${title}</h2>
                        <p>
                        ${description}
                        </p>
                    </body>
                </html>
                `;
            
                response.writeHead(200);
                response.end(template); //__dirname : 현재실행중인 폴더경로

            })
        }else{
            fs.readFile(`data/${queryData.id}`, 'utf-8', (err, description) =>{

                var title = queryData.id;
                            //파일목록을 불러와서 루프처리
                fs.readdir(testFolder, (err, filelist) => { // 하나의 데이터씩 나누어 출력
                    console.log(filelist);
                    var list = "";
                    
                    filelist.forEach(element => {
                        list += `<li><a href="/?id=${element}">${element}</a></li>`
                    });
                    var template = 
                    `
                    <!doctype html>
                    <html>
                        <head>
                            <title>${title}</title>
                            <meta charset="utf-8">
                        </head>
                        <body>
                            <h1><a href="/">WEB</a></h1>
                            <ol>
                            ${list}
                            </ol>
                            <h2>${title}</h2>
                            <p>
                            ${description}
                            </p>
                        </body>
                    </html>
                    `;
                
                    response.writeHead(200);
                    response.end(template); //__dirname : 현재실행중인 폴더경로

                })
            })
        }
    }else{
        response.writeHead(404);
        response.end("NOT FOUND"); //__dirname : 현재실행중인 폴더경로
    }
});
app.listen(3000);