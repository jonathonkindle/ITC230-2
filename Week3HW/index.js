const http = require("http"),
 fs = require("fs"),
 qs = require("querystring");

let bikes = require('./bikes');

function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function (err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode,	{ 'Content-Type': contentType });
            res.end(data);
        }
    });
}

http.createServer((req,res) => {
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    var url = req.url.split("?"),
        params = qs.parse(url[1]);
    switch(path) {
    //   case '/':
    //     res.writeHead(200, {'Content-Type': 'text/plain'});
    //     res.end('Home page');
    //     break;
        case '/':   
            fs.readFile("./public/home.html", (err, data) => {
                if (err) return console.error(err);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data.toString());
            });
        break;
        case '/about':
            fs.readFile("./package.json", (err, data) => {
                if (err) return console.error(err);
                res.writeHead(200, {'Content-Type': 'application/json'});
                const jsonobj = JSON.parse(data);
                res.end(JSON.stringify(jsonobj.description));
            });
            // res.writeHead(200, {'Content-Type': 'text/plain'});
            // res.end('About page');
        break;
        case '/getall':
            let found = bikes.getall();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let results = (found) ? JSON.stringify(found) : "No items in the database";
            res.end(results);
        break;
        case '/get':
            let item = bikes.get(params.modelNumber);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let result = (item) ? JSON.stringify(item) : "Not found";
            res.end('Results for ' + params.modelNumber + "\n" + result);
        break;
        case '/delete':
            let deleteItem = bikes.delete(params.modelNumber);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            // let deleteResult = (deleteItem) ? JSON.stringify(deleteItem) : "Not found";
            let deleteResult = (deleteItem.deleted) ? (params.modelNumber + ' has been deleted!') : "Not found";
            res.end(deleteResult);
        break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('The page you requested does not exist!');
        break;
    }
}).listen(process.env.PORT || 3000);