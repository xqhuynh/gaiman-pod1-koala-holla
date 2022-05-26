const express = require('express');
const koalaRouter = express.Router();

const pool = require('../modules/pool')


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

//SAVON WORKING ON

// POST


// SAVON WORKING ON

// PUT method for updating a record in the DB
koalaRouter.put("/:id", (req, res) => {

    //Log out the router path
    console.log(`In the PUT request in koala.router.js`)

    // Explicitly set the ID from param to a variable
    const koalaId = req.params.id

    // Explicitly set the req.body information to a variable
    const koalaUpdate = req.body

     // Check if bad data (a non-number) was sent
     if (isNaN(Number(koalaId))) {

        // If so, return a response indicating that much
        res.status(400).send({error: `Invalid song id of ${koalaId}`})
    }

    // Set the base SQL query to update
    const sqlQuery = `
        UPDATE "koala"
        SET (
            name = $2,
            gender = $3,
            age = $4,
            ready_to_transfer = $5,
            notes = $6
            )
        WHERE id = $1
    `

    // Set the SQL parameters to pass in into `sqlQuery`
    const sqlParams = [
        koalaUpdate.name,              // $2
        koalaUpdate.gender,            // $3
        koalaUpdate.age,               // $4
        koalaUpdate.ready_to_transfer, // $5
        koalaUpdate.notes,             // $6
    ]

    // Make the DB query to update a record
    pool.query(sqlQuery, sqlParams)

        // Handle a successful update
        .then(() => {
            console.log(`The update to ID: ${koalaId} was successful`)
            res.sendStatus(201)
        })

        // Catch any DB errors that may arise
        .catch((err) => {
            console.log(`
                ========================================
                An error has occurred in the PUT method:

                    koala PUT object from client:
                        ${koalaUpdate}

                ERROR: ${err}
                ========================================
            `)
            res.sendStatus(500)
        })
})

// DELETE method for removing a record from the DB
koalaRouter.delete("/:id", (req, res) => {

    console.log("Called the koala DELETE route")

    // Explicitly set the ID from param to a variable
    const koalaId = req.params.id

    // Check if bad data (a non-number) was sent
    if (isNaN(Number(koalaId))) {

        // If so, return a response indicating that much
        res.status(400).send({error: `Invalid song id of ${koalaId}`})
    }

    // Set the base SQL command for the DB to delete a record
    const sqlQuery = `
        DELETE FROM "koala"
        WHERE id = $1
    `

    // Set the parameter to pass into the SQL query (the `id`)
    const sqlParams = [
        koalaId,
    ]

    // Send the SQL command to the DB to execute the command
    pool.query(sqlQuery, sqlParams)

        // Get the success response
        .then(() => {
            console.log(`
                Removed record with ID: ${koalaId}.
            `)
            res.sendStatus(204) // Use `204` for DELETE
        })

        // Catch any DB errors that may arise
        .catch((err) => {
            console.log(`
                ========================================
                An error has occurred in the PUT method:

                    koala DELETE object from client:
                        ${koalaUpdate}

                ERROR: ${err}
                ========================================
            `)
            res.sendStatus(500)
        }
    )
})


koalaRouter.post('/', (req, res) => {
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


module.exports = koalaRouter;