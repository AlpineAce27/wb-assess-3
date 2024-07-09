
console.log('javascript connected')

const listDisplay = document.querySelector('#to-do-list')

const displayAllTasks = (array) => {
    console.log(array)
    //clear out whats on the page
    listDisplay.innerHTML = ``
    
    array.forEach((el) => {
        const itemLine = document.createElement('section')
        itemLine.innerHTML = `
        <button name="${el.id}" onclick=deleteTask(${el.id})>X</button>
        <label for="${el.id}">${el.task}</label>
        <br/>
    `
    listDisplay.appendChild(itemLine)
    })
}

const allTasks = () => {
    axios.get('http://localhost:8000/toDoList').then((response) => {
        console.log(response.data)
        displayAllTasks(response.data)
    })
}

const handleSubmit = (event) => {
    event.preventDefault()

    const taskName = document.querySelector('#taskName').value
    const bodyObj = {task: taskName}

    axios.post('http://localhost:8000/newItem', bodyObj).then((response) => {
        console.log(response.data)
        displayAllTasks(response.data)
    })
}

const createNewListItem = document.querySelector('#add-task').addEventListener('submit', handleSubmit)

const deleteTask = ((id) => {
    console.log("Delete button pressed")
    axios.delete(`http://localhost:8000/removeItem/${id}`).then((response) => {
        console.log(response.data)
        displayAllTasks(response.data)
    })
})

allTasks()
