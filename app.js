const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000; // ✅ changed this line

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [];
let currentId = 1;

app.get('/', (req, res) => {
  res.render('index', { todos });
});

app.post('/add', (req, res) => {
  const { task, priority } = req.body;
  if (task.trim() === "") {
    return res.redirect('/?error=empty');
  }
  todos.push({ id: currentId++, task, priority });
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.redirect('/');
});

app.post('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { task, priority } = req.body;
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, task, priority } : todo
  );
  res.redirect('/');
});

app.post('/filter', (req, res) => {
  const { priority } = req.body;
  const filteredTodos = priority === "All" ? todos : todos.filter(todo => todo.priority === priority);
  res.render('index', { todos: filteredTodos });
});

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});
