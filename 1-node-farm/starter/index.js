//require read write file module
const fs = require('fs');
const http = require('http');
const url = require('url');

/**
 * SERVER
 */

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) {output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');}

    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempcard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    /**
     * ROUTE
     */
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {'content-type': 'text/html'});

        const cardHtml = dataObj.map(el => replaceTemplate(tempcard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);

        res.end(output);

    } else if (pathName == '/api') {
        res.writeHead(200, {'content-type': 'application/html'});
        res.end(data);

    } else if (pathName === '/product') {
        res.end('This is PRODUCT');

    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found</h1>');
    }

});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
    // display on terminal
});



/**
 * READ FILE
 */
// read file
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textIn = fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
//     console.log(data);
// });

// console.log('Reading file ...');

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// // write file
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');


// fs.readFile('./txt/starteeee.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('Error ', err);

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('Your file has been written');
//             });
            
//         });
//     });
// });
// console.log('Will read file!');