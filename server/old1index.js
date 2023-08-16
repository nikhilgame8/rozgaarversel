const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');
const fs = require('fs')
var axios = require('axios');

// app.get('*', function (req, res) {
//     res.send("hiiiiiiii")
// })


console.log("default")


app.use(express.static(path.resolve(__dirname, '../build')));


app.get('*', function (request, response) {
    app.use(express.static(path.resolve(__dirname, '../build')));
    res.status(404)
    console.log("fffffff")
    const filePath = path.resolve(__dirname, '../build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_TITLE/g, 'Times Ascent');
        data = data.replace(/\$OG_DESCRIPTION/g, "Times Ascent, a part of The Times of India, is focused on career enhancement, jobs, upskill courses, latest events, trending news, remote work, human resource, free resume maker, psychometric tests, interview tips- timesascent.com");
        result = data.replace(/\$OG_IMAGE/g, 'https://timesascent.com/Times_Ascent_Icon.png');
        response.send(result);
        // response.sendFile(filePath);
    });
})

app.listen(port, () => console.log(`Listening on port ${port}`));
