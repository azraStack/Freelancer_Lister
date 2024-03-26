//EXPRESS
const express = require('express');
const app = express();

//BODY PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//CORS
const cors = require("cors");
// Configure CORS before defining your routes
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:8080','http://localhost:5555'], //frontend,api,database
        credentials: true,
    })
);

//PRISMA
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/', (req, res) => {
    res.send('Welcome to Freelancers Lister!');
});

// READ API get all freelancers
app.get('/freelancers', async (req, res) => {
    const answer = await prisma.freelancers.findMany();
    res.json(answer);
});

// Find data based on name
app.get('/freelancers/:name', async (req, res) => {
    let username = req.params.name
    const answer = await prisma.freelancers.findUnique({
        where: {
        name: username,
        },
    })
    res.json(answer);

});


// Find data based on name contains
app.get('/searchfreelancer/:name', async (req, res) => {
    let searchname = req.params.name
    const answer = await prisma.freelancers.findMany({
        where: {
            name: {
                contains: searchname,
            },
        },
    })
    res.json(answer);

});

// Find data based on skillset
app.get('/freelancerskill/:skill', async (req, res) => {
    let skillname = req.params.skill
    const answer = await prisma.freelancers.findMany({
        where: {
            skillsets: skillname,
        },
    })
    res.json(answer);

});

// CREATE / ADD API for one data
app.post('/freelancer', async (req, res) => {
    const answer = await prisma.freelancers.create({ data: req.body });
    res.json(answer);
});

// CREATE / ADD API for many data
app.post('/manyfreelancers', async (req, res) => {
    const answer = await prisma.freelancers.createMany({
        data: req.body,
        skipDuplicates: true, 
    })
    res.json(answer);
});

// Update API use ID
app.put('/freelancer/:id', async (req, res) => {
    const id = req.params.id
    const answer = await prisma.freelancers.update({ 
        where: { id : Number(id) },
        data: req.body
    });
    res.json(answer);
});

// Update API use Name
app.put('/updatefreelancer/:nama', async (req, res) => {
    let username = req.params.nama
    console.log(username);
    const answer = await prisma.freelancers.update({ 
        where: { name : String(username) },
        data: req.body
    });
    res.json(answer);
});

// DELETE API
app.delete('/freelancer/:userid', async (req, res) => {
    const userid = req.params.userid
    const answer = await prisma.freelancers.delete({ 
        where: { id : Number(userid) },
    });
    res.json(answer);
});


app.listen(8080, () => {
    console.log('App listening on port 8080!');
});

//Run app, then load http://localhost:8080 in a browser to see the output.
