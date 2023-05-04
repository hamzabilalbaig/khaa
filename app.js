const express = require('express');
const app = express();
const Gtts = require('gtts')
const  bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
const ejs = require('ejs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM(ejs).window.document;
app.set('view engine', 'ejs');
var gptPrompt = 'tum kese ho'
var prompt
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const gpt3= async (text) => {
    try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 1000
    });
    console.log('gpt3',completion.data.choices[0].text);
    prompt = completion.data.choices[0].text;
        
} catch (error) {
    console.log(error);
}
}


app.post('/bolo',async function (req, res) {
console.log(req.body);
    await gpt3(req.body.text);
})


app.get('/', function (req, res) {
    res.render('index');
});

app.get('/bolo', function (req, res) {
    res.render('speach');
});

app.post('/', function (req, res) {
    const text = req.body.text;
    const gpt = prompt
    var lang = 'hi';
    var path = Date.now() + '.mp3';
    const mp3 = new Gtts(gpt, lang);
    mp3.save(path,(err,result) => {
        if (err) {
            
            FileSystem.unlinkSync(path);
            res.send('not done');
        }
        res.download(path); 
    })
})
const port = process.env.PORT || 5025;
app.listen(port, function () {
    console.log('listening on port',port);
//   console.log('Open url to hear Hallelujah http://localhost:3000/hear?lang=en&text=meralunpakarabrar');
});

// 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