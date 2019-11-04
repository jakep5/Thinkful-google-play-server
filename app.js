const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const apps = require('./app-data.js');

apps.get('/apps', (req, res) => {
    const {search = "", sort, genre} = req.query;

    if(sort) {
        if(!['rating', 'title'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be either rating or title of app')
        }
    }

    if(genre) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
            return res 
                .status(400)
                .send('Genre must be one of the following : Action, Puzzle, Strategy, Casual, Arcade, or Card.')
        }
    }

    let results = apps
        .filter(app => 
            app.title.toLowerCase().includes(search.toLowerCase()));

    if(sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
        }
    )}

    if(genre) {
        results.filter(app =>
            app.genre.includes(genre))
    }

    res.json(results)
    
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
})