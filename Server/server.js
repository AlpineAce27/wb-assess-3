import express from 'express';
import axios from 'axios';
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

app.get('/toDoList', (req, res) => {
    console.log('/ endpoint hit')
    res.send(toDoList)
})

app.post('/newItem', (req, res) => {
    console.log('/newItem endpoint hit')
    const newItem = {
        id: globalID,
        task : req.body.task
    }
    //console.log(newItem)
    //add that list item to the toDoList object
    toDoList.push(newItem)
    res.send(toDoList)
    globalID++
})

app.delete('/removeItem/:id', (req, res) => {
    console.log('/removeItem endpoint hit')
    const id2kill = Number(req.params.id)
    //console.log(id2kill)
    const newArray = toDoList.filter((el) => {
        //console.log(el.id, id2kill)
        return( el.id !== id2kill)
    })
    //console.log(newArray)
    toDoList = newArray
    res.send(toDoList)
})

app.put('/editItem/:id', (req, res) => {
    console.log('/editItem endpoint hit')
    //grab the data from input for (item ID and new text)
    const editRequest = {
        id: req.params.id,
        task: req.body.task
    }
    //find the item in the array with a corresponding ID
    const editItem = toDoList.find((el) => el.id == editRequest.id)
    //change the task of that item
    editItem.task = editRequest.task
    //send it back
    res.send(toDoList)
})

app.listen(port, () => console.log(`Flying high at http://localhost:${port}`))