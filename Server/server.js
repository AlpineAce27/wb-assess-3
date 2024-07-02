import express from 'express';
//import axios from 'axios';
import cors from 'cors';

const app = express();
const port = '8000';

app.use(express.json()) //lets our app use and interpret Json files
app.use(cors())
app.use(express.static('src')) //lets us talk to our front end (src is our folder with front end files)

let toDoList = [
   {
    id : 1,
    task : "Buy groceries",
   },
   {
    id : 2,
    task : "Walk the dog",
   },
   {
    id : 3,
    task : "Save the cheerleader",
   },
   {
    id : 4,
    task : "Save the world",
   }
]
let globalID = 5
//endpoints

app.get('/', (req, res) => {
    console.log('/ endpoint hit')
    displayAllTasks(toDoList)
    res.send(toDoList)
    res.render('index.html')
})

app.post('/newItem', (req, res) => {
    console.log('/newItem endpoint hit')
    const newItem = {
        id: globalID,
        task : req.body.task
    }
    console.log(newItem)
    toDoList.push(newItem)
    //add that list item to the toDoList object
    res.send(toDoList)
    //res.render('index.html')
})

app.delete('/removeItem', (req, res) => {
    console.log('/removeItem endpoint hit')
    
    console.log(req.body.id)
    //find the item with a corresponding id and remove it from the toDoList object
    res.send(toDoList)
    //res.render('index.html')
})

// app.put('/editItem', (req, res) => {
//     console.log('/editItem endpoint hit')
//     //grab the data from input for (item ID and new text)
//     //find the item with a a corresponding id and change the text to reflect the changes
//     res.send(toDoList)
//     //res.render('index.html')
// })

app.listen(port, () => console.log(`Flying high at http://localhost:${port}`))