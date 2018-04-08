const http = require('http');
const https = require('https');
const fs = require('fs');
const qs = require('querystring');


const githubServer = http.createServer((req, res)=>{
    
    if(req.method === 'POST') {
        let body = "";
        req.on('data', (d)=>{
            body += d;
        });
        req.on("end", ()=>{
            const username = qs.parse(body)["username"];

            const options = {
                hostname: 'api.github.com',
                path: '/users/' + username + '/starred',
                method: 'GET',
                headers: {
                    'User-Agent': 'ChewbaccaJerky'
                }
            };

            https.get(options, (dataStream)=>{
                let repoData = "";
                dataStream.on("data", (data)=>{
                    repoData += data;
                });

                dataStream.on("end", ()=>{
                    const repos = JSON.parse(repoData).map(repo => {
                        return "Repo: " + repo.name + ". Stars: " + repo.stargazers_count + ".";
                    }).join('\n');

                    const ws = fs.createWriteStream('./' + './' + username + '_starred_repos.txt');
                    ws.write(repos);
                });
            });

            res.end();
        });
    }
});

githubServer.listen(8000, () => {
    console.log("Listening to port 8000!");
});