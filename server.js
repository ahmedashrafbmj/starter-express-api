const express = require('express');
const { SerialPort } = require('serialport');

const { ReadlineParser } = require('@serialport/parser-readline');
const axios = require('axios');
const app = express();

    app.get('/api/hello1', (req, res) => {
        const port = new SerialPort({
            path: 'COM1',
            baudRate: 9600
        });

        const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));


        parser.on('data', (data) => {
            const payload = { data: data };
            console.log(payload);
            res.send(payload);
        });


    });
    app.get('/', (req, res) => {
       res.send("hello world")

    });


    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });



