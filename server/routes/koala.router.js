const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION
// Create pool.js connection in modules folder

// GET
// localhost:5000/koalas will go here
koalaRouter.get('/', (req, res) => {
    let queryText = `SELECT * FROM koala;`;
    pool.query(queryText)
      .then((result) => {
        // Sends back results to object
        res.send(result.rows);
      })
      .catch((err) => {
          console.log('Error getting koala', err);
          res.sendStatus(500);
      });
});

// POST
koalaRouter.get('/', (req, res) => {
    const newKoala = req.body;
    console.log('Adding new koala', newKoala);
    let queryText = `
      INSERT INTO (name, gender, age, ready_to_transfer, notes)
      VALUES ($1, $2, $3, $4, $5);
    `;
    pool.query(queryText, [
        newKoala.name,
        newKoala.gender,
        newKoala.age,
        newKoala.ready_to_transfer, 
        newKoala.notes
    ])
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log('Error adding new koala', err);
    });
});

// PUT


// DELETE

module.exports = koalaRouter;