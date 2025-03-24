// filepath: translate-app/app.js
const express = require('express');
const bodyParser = require('body-parser');
const translate = require('google-translate-api-x');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <!doctype html>
        <html>
        <head><title>Translate to Hindi App</title></head>
        <body>
            <form method="post" action="/">
                <label for="user_input">Enter text:</label>
                <input type="text" id="user_input" name="user_input">
                <input type="submit" value="Submit">
            </form>
            ${req.query.translated_text ? `<h2>Translated Text: ${req.query.translated_text}</h2>` : ''}
        </body>
        </html>
    `);
});

app.post('/', (req, res) => {
    const userInput = req.body.user_input;
    translate(userInput, { to: 'hi' }).then(response => {
        res.redirect('/?translated_text=' + encodeURIComponent(response.text));
    }).catch(err => {
        console.error(err);
        res.send('Error translating text');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});