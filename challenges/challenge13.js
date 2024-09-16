import fs from 'fs';

const args = process.argv.slice(2);
const TODO_FILE = 'todos.json';

// Baca todo dari file
const readTodos = () => {
    if (!fs.existsSync(TODO_FILE)) return [];
    const data = fs.readFileSync(TODO_FILE, 'utf-8');
    return JSON.parse(data);
};

// Tulis todo ke file
const writeTodos = (todos) => {
    fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
};

// Fungsi untuk sorting asc dan desc berdasarkan huruf depan `content`
const listTodos = (filter, order) => {
    const todos = readTodos();
    let filteredTodos = todos;

    if (filter === 'outstanding') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    if (order === 'asc') {
        filteredTodos.sort((a, b) => a.content.localeCompare(b.content)); // Sorting asc berdasarkan content
    } else if (order === 'desc') {
        filteredTodos.sort((a, b) => b.content.localeCompare(a.content)); // Sorting desc berdasarkan content
    }

    console.log('Daftar Pekerjaan');
    filteredTodos.forEach(todo => {
        console.log(`${todo.id}. [${todo.completed ? 'x' : ' '}] ${todo.content}`);
    });
};

// Fungsi untuk menampilkan semua task
const listAllTodos = () => {
    const todos = readTodos();
    console.log('Daftar Pekerjaan');
    todos.forEach(todo => {
        console.log(`${todo.id}. [${todo.completed ? 'x' : ' '}] ${todo.content}`);
    });
};

// Fungsi untuk menampilkan informasi task
const taskList = (id) => {
    const todos = readTodos();
    const task = todos.find(todo => todo.id === parseInt(id));

    if (task) {
        console.log(`Berikut adalah informasi dari task ${task.id}:`);
        console.log(`id: ${task.id}`);
        console.log(`completed: [${task.completed ? 'x' : ' '}]`);
        console.log(`content: ${task.content}`);
        console.log(`tags: ${task.tags.length > 0 ? task.tags.join(', ') : '-'}`);
    } else {
        console.log('Task tidak ditemukan.');
    }
};

// Fungsi untuk menambah task
const addTask = (content) => {
    const todos = readTodos();
    const newTask = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        completed: false,
        content: content.join(' '),
        tags: []
    };
    todos.push(newTask);
    writeTodos(todos);
    console.log(`"${newTask.content}" berhasil ditambahkan.`);
};

// Fungsi untuk menghapus task
const deleteTask = (id) => {
    let todos = readTodos();
    const task = todos.find(todo => todo.id === parseInt(id));
    if (task) {
        const [deletedTask] = todos.splice(todos.indexOf(task), 1);
        todos = todos.map((todo, index) => ({ ...todo, id: index + 1 }));
        writeTodos(todos);
        console.log(`"${deletedTask.content}" telah dihapus dari daftar.`);
    } else {
        console.log('Task tidak ditemukan.');
    }
};

// Fungsi untuk menandai task sebagai selesai
const completeTask = (id) => {
    const todos = readTodos();
    const task = todos.find(todo => todo.id === parseInt(id));
    if (task) {
        task.completed = true;
        writeTodos(todos);
        console.log(`"${task.content}" telah selesai.`);
    } else {
        console.log('Task tidak ditemukan.');
    }
};

// Fungsi untuk membatalkan status selesai task
const uncompleteTask = (id) => {
    const todos = readTodos();
    const task = todos.find(todo => todo.id === parseInt(id));
    if (task) {
        task.completed = false;
        writeTodos(todos);
        console.log(`"${task.content}" status selesai dibatalkan.`);
    } else {
        console.log('Task tidak ditemukan.');
    }
};

// Fungsi untuk menambah tag ke task
const tagTask = (id, tags) => {
    const todos = readTodos();
    const task = todos.find(todo => todo.id === parseInt(id));
    if (task) {
        const existingTags = new Set(task.tags);
        const newTags = tags.filter(tag => !existingTags.has(tag));
        task.tags.push(...newTags);
        writeTodos(todos);
        
        if (newTags.length > 0) {
            console.log(`Tag "${newTags.join(', ')}" telah ditambahkan ke task ${task.id}: "${task.content}"`);
        } else {
            console.log('Tidak ada tag baru yang ditambahkan.');
        }
    } else {
        console.log('Task tidak ditemukan.');
    }
};


// Fungsi untuk filter berdasarkantag
const filterByTags = (tags) => {
    const todos = readTodos();
    const tagArray = tags.split(',');
    const filteredTodos = todos.filter(todo => tagArray.every(tag => todo.tags.includes(tag)));
    if (filteredTodos) {
        console.log('Daftar Pekerjaan');
        filteredTodos.forEach(todo => {
            console.log(`${todo.id}. [${todo.completed ? 'x' : ' '}] ${todo.content}`);
        });
    } else{
        console.log(`Tidak menemukan Task yang terdapat Tag '${tagArray.join(', ')}'`);
    };
};

// Fungsi bantuan
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
node todo.js filter:<tag_name>
`);
    process.exit();
};

// Todo App
const todoApp = () => {
    if (args.length === 0) {
        showHelp();
        return;
    }
    switch (true) {
        case args[0] == 'list':
            listAllTodos();
            break;
        case args[0] == 'task':
            taskList(args[1]);
            break;
        case args[0] == 'list:outstanding':
            listTodos('outstanding', args[1]);
            break;
        case args[0] == 'list:completed':
            listTodos('completed', args[1]);
            break;
        case args[0] == 'add':
            addTask(args.slice(1));
            break;
        case args[0] == 'delete':
            deleteTask(args[1]);
            break;
        case args[0] == 'complete':
            completeTask(args[1]);
            break;
        case args[0] == 'uncomplete':
            uncompleteTask(args[1]);
            break;
        case args[0] == 'tag':
            tagTask(args[1], args.slice(2));
            break;
        case args[0].startsWith('filter:'):
            filterByTags(args[0].slice(7));
            break;
        default:
            showHelp();
            break;
    }
};

todoApp();