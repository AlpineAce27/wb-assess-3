
console.log('javascript connected')

const listDisplay = document.querySelector('#to-do-list')

const displayAllTasks = (array) => {
    //clear out whats on the page
    listDisplay.innerHTML = ``
    
    array.forEach((el) => {
        const itemLine = document.createElement('section')
        itemLine.innerHTML = `
        <label for="${el.id}">${el.task}</label>
        <button name="${el.id} onclick="deleteTask(${el.id})">X</button>
        <br/>
    `
    itemLine.appendChild(listDisplay)
    })
}

const allTasks = () => {
    axios.get('http://localhost:8000/').then((response) => {
        console.log(response.data)
        displayAllTasks(response.data)
    })
}

const handleSubmit = (event) => {
    event.preventDefault()

    const taskName = document.querySelector('#taskName').value
    const bodyObj = {name: taskName}

    axios.post('http://localhost:8000/newItem', bodyObj).then((response) => {
        console.log(response.data)
        displayAllDrinks(response.data)
    })
}

//const createNewListItem = document.querySelector('#add-task').addEventListener('submit', handleSubmit)

const deleteTask = ((id) => {
    axios.delete(`http://localhost:8000/task/${id}`).then((response) => {
        console.log(response.data)
        displayAllTasks(response.data)
    })
})

allTasks()