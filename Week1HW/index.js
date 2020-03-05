const http = require("http");  
http.createServer((req,res) => {
    const path = req.url.toLowerCase();
    const fs = require("fs");
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
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('The page you requested does not exist!');
        break;
    }
}).listen(process.env.PORT || 3000);