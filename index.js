const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./assets/js/modules/replaceTemplate');


const tempOverview = fs.readFileSync(
    `${__dirname}/assets/templates/overview.html`,
    'utf-8'
);

const tempCard = fs.readFileSync(
    `${__dirname}/assets/templates/template-card.html`,
    'utf-8'
);

const tempProperty = fs.readFileSync(
    `${__dirname}/assets/templates/property.html`,
    'utf-8'
);

const data = fs.readFileSync(`${__dirname}/assets/data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);



// Server configuration

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);


    // overview page
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PROPERTIES%}', cardsHtml);
        res.end(output);

        //property path
    } else if (pathname === '/property') {
        res.writeHead(200, {
            'Content-type': 'text/html',
        });
        const property = dataObj[query.id];
        const output = replaceTemplate(tempProperty, property);
        res.end(output);

        // API
    } else if (pathname === '/api') {
        res.end(data);

        // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
        });
        res.end('<h1>Oh no... Page not found');
    }
});


server.listen(8000, '127.0.0.1', () => {
    console.log("Server is listening")
})
