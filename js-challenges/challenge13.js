import fs from 'fs'

const args = process.argv.slice(2)
const TODO_FILE = 'todos.json'

const readTodos = () => {
    if (!fs.existsSync(TODO_FILE)) return []
    const data = fs.readFileSync(TODO_FILE, 'utf-8')
    return JSON.parse(data)
}

const writeTodos = (todos) => {
    fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2))
}

const listTodos = (filter, order) => {
    const todos = readTodos()
    let filteredTodos = todos

    if (filter === 'outstanding') {
        filteredTodos = todos.filter(todo => !todo.completed)
    } else if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed)
    }

    if (order === 'asc') {
        filteredTodos.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else if (order === 'desc') {
        filteredTodos.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    console.log('Daftar Pekerjaan')
    filteredTodos.forEach(todo => {
        console.log(`${todo.id}. [${todo.completed ? 'x' : ' '}] ${todo.content}`)
    })
}

const listAllTodos = () => {
    const todos = readTodos()
    console.log('Daftar Pekerjaan')
    todos.forEach(todo => {
        console.log(`${todo.id}. [${todo.completed ? 'x' : ' '}] ${todo.content}`)
    })
}

const addTask = (content) => {
    const todos = readTodos()
    const newTask = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        completed: false,
        content: content.join(' '),
        tags: [],
        date: new Date().toISOString()
    }
    todos.push(newTask)
    writeTodos(todos)
    console.log(`"${newTask.content}" berhasil ditambahkan.`)
}

const deleteTask = (id) => {
    let todos = readTodos()
    const task = todos.find(todo => todo.id === parseInt(id))
    if (task) {
        const [deletedTask] = todos.splice(task, 1)
        todos = todos.map((todo, index) => ({ ...todo, id: index + 1 }))
        writeTodos(todos)
        console.log(`"${task.content}" telah dihapus dari daftar.`)
    } else {
        console.log('Task tidak ditemukan.')
    }
}

const completeTask = (id) => {
    const todos = readTodos()
    const task = todos.find(todo => todo.id === parseInt(id))
    if (task) {
        task.completed = true
        writeTodos(todos)
        console.log(`"${task.content}" telah selesai.`)
    } else {
        console.log('Task tidak ditemukan.')
    }
}

const uncompleteTask = (id) => {
    const todos = readTodos()
    const task = todos.find(todo => todo.id === parseInt(id))
    if (task) {
        task.completed = false
        writeTodos(todos)
        console.log(`"${task.content}" status selesai dibatalkan.`)
    } else {
        console.log('Task tidak ditemukan.')
    }
}

const tagTask = (id, tags) => {
    const todos = readTodos()
    const task = todos.find(todo => todo.id === parseInt(id))
    if (task) {
        const newTags = [...new Set([...task.tags, ...tags])]
        task.tags = newTags
        writeTodos(todos)
        console.log(`Tag "${tags.join(', ')}" telah ditambahkan ke task "${task.content}"`)
    } else {
        console.log('Task tidak ditemukan.')
    }
}

const filterByTag = (tag) => {
    const todos = readTodos()
    const filteredTodos = todos.filter(todo => todo.tags.includes(tag))
    console.log('Daftar Pekerjaan')
    filteredTodos.forEach(todo => {
        console.log(`${todo.id}. [${todo.completed ? 'x' : ' '}] ${todo.content}`)
    })
}

const showHelp = () => {
    console.log(`
>>> JS TODO <<<
node todo.js <command>
node todo.js list
node todo.js task <task_id>
node todo.js add <task_content>
node todo.js delete <task_id>
node todo.js complete <task_id>
node todo.js uncomplete <task_id>
node todo.js list:outstanding asc|desc
node todo.js list:completed asc|desc
node todo.js tag <task_id> <tag_name 1> <tag_name 2> ... <tag_name n>
node todo.js filter <tag_name>
`)
    process.exit()
}

if (args.length === 0 || args[0] === 'help') {
    showHelp()
}

switch (args[0]) {
    case 'list':
        listAllTodos()
        break
    case 'list:outstanding':
        listTodos('outstanding', args[1])
        break
    case 'list:completed':
        listTodos('completed', args[1])
        break
    case 'add':
        addTask(args.slice(1))
        break
    case 'delete':
        deleteTask(args[1])
        break
    case 'complete':
        completeTask(args[1])
        break
    case 'uncomplete':
        uncompleteTask(args[1])
        break
    case 'tag':
        tagTask(args[1], args.slice(2))
        break
    case 'filter':
        filterByTag(args[1])
        break
    default:
        showHelp()
        break
}
