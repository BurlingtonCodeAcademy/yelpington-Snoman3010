const { request, response } = require('express');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs')

app.use(express.static('./client/public'));

//api get requests
//individual restaurant or location
app.get('/api/:restaurant' , (request, response) => {
    response.sendFile(path.resolve(`./api/${request.params.restaurant}.json`))
})
//list of restaurants
app.get('/api', (request, response) => {
    response.sendFile(path.resolve('./api/list.json'))
})

//all other get requests
app.get('*', (request, response) => {
    response.sendFile(path.resolve('./client/public/index.html'));
})

//post request for comments
app.post('/comment/:restaurant', express.urlencoded({extended: false}), (request, response) => {
    addComment(request.params.restaurant, request.body, response)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

//push new comment onto comment array of original json object and overwrite restaurant json file with updated object
function addComment(restId, reqBody, res){
    let restObj = JSON.parse(reqBody.jsonOriginal);
    restObj.notes.push(reqBody.comment.trim());
    const fileLocation = `./api/${restId}.json`
    fs.writeFile(fileLocation, JSON.stringify(restObj), (err) => {
        if(err){
            res.status(500).send(err);
        }else{
            //force refresh of page so new comment shows up
            res.redirect(`/restaurant/${restId}`);
        }
    })
}