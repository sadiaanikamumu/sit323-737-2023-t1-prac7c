const { json } = require('express');
const express = require('express'); 
const axios = require('axios');
const app = express(); 



// Need to import Express libraries to read POST body data (e.g. req.body)
app.use(express.json());             
app.use(express.urlencoded());       



// Our users
let users = [ 
  { id: 1, name: 'Sadia', age: 24 }, 
  { id: 2, name: 'Anika', age: 22 }, 
  { id: 3, name: 'Mumu', age: 25 },
  { id: 4, name: 'Dolu', age: 21 },
  { id: 5, name: 'Jhum', age: 23 },
  { id: 6, name: 'Sinthu', age: 26 }
]; 


// Home page request
// curl http://localhost:3000/
app.get('/', (req, res) => { 
  res.send("Welcome to My Server");
}); 

 
// Get all users in the array
// curl http://localhost:3000/users


app.get('/users', (req, res) => { 
  res.json(users); 
}); 

app.get('/user2', (req, res) => { 
  const data = axios.get('http://container2:8080/hi')
  res.json(data); 
}); 

app.get('/hi', (req, res) => { 
  res.send('Hello from container2'); 
}); 
app.get('/hi/health', (req, res) => { 
  res.send('I am up'); 
});


// Get a user of a specified ID
// curl http://localhost:3000/users/-id-
app.get('/users/:id', function(req, res) {
    console.log("User ID " + req.params.id + " requested");
    var userID = req.params.id;
    var userFound = false;

    users.forEach((user, index, array) => {
        if (user.id == userID) {
            res.send(users[index]);
            userFound = true;
        }
    });

    if (userFound == false) {
        res.send("ERROR: User with ID " + userID + " does not exist");
    }
});


 
// Post a new user
// curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"id":4,"name":"emma"}'
app.post('/users', (req, res) => {

  if (req.body === undefined) {
    // Invalid data received (likely not in JSON format)
    console.log("ERROR: req.body is undefined");
    res.status(400).send("ERROR: req.body is undefined");
  } 
  else {
    // Decode the JSON into a string for readability with Stringify()
    userData = JSON.stringify(req.body);
    console.log("Adding new user with data: " + userData);

    // Store JSON directly into our array
    const newUser = req.body; 
    users.push(newUser); 
    res.status(201).json(newUser); 
  }
  
}); 

 

// Update a user via an existing ID
// curl -X PUT http://localhost:3000/users/-id- -H "Content-Type: application/json" -d '{"id":55,"name":"doona"}'
app.put('/users/:id', (req, res) => { 

  // Retrieve the user ID from the parameters (params) named 'id' in the URL
  const userId = parseInt(req.params.id); 
  console.log("Update user with ID: " + req.params.id);

  // Retrieve the PUT data (with the -d flag in Curl) of the user data
  const updatedUser = req.body; 

  // Update a user (if the ID exists)
  users = users.map(user => user.id === userId ? updatedUser : user); 
  res.status(200).json(updatedUser); 
}); 

 

// Delete a user via an existing ID
// curl -X DELETE http://localhost:3000/users/-id-
app.delete('/users/:id', (req, res) => { 
  // Retrieve the user ID from the parameters (params) named 'id' in the URL 
  const userId = parseInt(req.params.id);

  // Remove the user (if the ID exists)
  users = users.filter(user => user.id !== userId); 
  res.status(204).send(); 
}); 

 

app.listen(8080, () => { 
  console.log('Server is listening on port 8080'); 
}); 