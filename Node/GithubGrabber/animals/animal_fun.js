// Phase 1 Read/Write to File using fs and process
// const fs = require('fs');

// fs.readFile('./animal.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.log(err);
//     }
    
//     const char = process.argv[2];
//     if(!char) {
//         throw 'Missing arguments!';
//     }
//     else if(char.length !== 1) {
//         throw 'only accepts char';
//     }

//     const animals = data.split('\n');
//     const result = animals.filter(animal => char === animal.charAt(0).toLowerCase());
//     const filepath = "./animals/" + char + "_animals.txt"; 

//     fs.writeFile(filepath, result, error => console.log(error));
// });


// Phase 2 Creating Server with http
const http = require('http');
const queryString = require('querystring');
const fs = require('fs');
const cache = {};


const server = http.createServer((req, res) => {
    const url = req.url.replace("/search?", "");
    const params = queryString.parse(url);

    if(cache[params["letter"]] !== undefined) {
        res.write(cache[params["letter"]]);
        res.end();
        return;
    }

    fs.readFile('./animal.txt', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const animals = data.split('\n');
        const result = animals.filter(animal => params["letter"] === animal.charAt(0).toLowerCase());


        let HTML = "";
        HTML = "<html>";
        HTML += "<body>";
        HTML += "<h1>These are the animals you are looking for!</h1>";
        HTML += "<ul>";
        
        for(let i = 0; i < result.length; i++){
            HTML += "<li>" + result[i] + "</li>";    
        }

        HTML += "</ul>";
        HTML += "</body>";
        HTML += "</html>";
        cache[params["letter"]] = HTML;

        res.write(HTML);
        res.end();
    });
});

server.listen(8000, () => console.log("I'm listening to port 8000"));