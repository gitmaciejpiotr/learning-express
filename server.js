const express = require('express');
const path = require('path');
const multer  = require('multer');
const upload = multer({ dest: 'public/' });
const hbs = require('express-handlebars');

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/info', (req, res) => {
    res.render('info', { layout: 'dark' });
});

app.get('/history', (req, res) => {
    res.render('history');
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', { layout: false, name: req.params.name });
});

app.post('/contact/send-message', upload.single('project_design'), (req, res) => {

    const { author, sender, title, message } = req.body;

    console.log(req.file.originalname);
    console.log(req.body);

    if (author && sender && title && message && req.file.originalname) {
        res.render('contact', { isSent: true, fileName: req.file.originalname });
    }
    else {
        res.render('contact', { isError: true });
    }

});

app.use((req, res) => {
    res.status(404).send('404 not found...');
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});