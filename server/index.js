const express = require('express');
// const bodyParser = require('body-parser');
// const pino = require('express-pino-logger')();
const { createProxyMiddleware } = require('http-proxy-middleware');
var cors = require('cors')

const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(pino);

app.use(cors());

app.use('', createProxyMiddleware({
    // target: 'https://nyaasi-api.herokuapp.com/'
    // target: 'https://nyaa.si/'
    target: 'https://nyaa.si/', //target url
    changeOrigin: true,
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

// app.get('/api', (req, res) => {
//     const name = req.query.name || 'World';
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);
