import React from 'react';
import logo from './logo.svg';
import axios from 'axios'
import { HashRouter, Route, BrowserRouter, Switch, Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

// import Footer from './components/Footer.js'
// import Navbar from './components/Menu.js'
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import TODOList from './components/Todo.js'
import NotFound404 from './components/NotFound404.js'
import LoginForm from './components/Auth.js'
import ProjectForm from './components/ProjectForm'
import TodoForm from './components/TodoForm';



const DOMAIN = 'http://194.67.87.31:8000/api/'
const get_url = (url => `${DOMAIN}${url}`)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todos': [],
      'token': ''
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({ 'token': token }, () => this.load_data())
  }
  is_authenticated() {
    return this.state.token != ''
  }
  logout() {
    this.set_token('')
  }
  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({ 'token': token }, () => this.load_data())
  }

  load_data() {
    const headers = this.get_headers()
    axios.get(get_url('users/'), { headers }).then(response => {
      this.setState({ 'users': response.data.results })
    }).catch(error => console.log(error))

    axios.get(get_url('projects/'), { headers }).then(response => {
      this.setState({ 'projects': response.data.results })
    }).catch(error => console.log(error))

    axios.get(get_url('todo/'), { headers }).then(response => {
      this.setState({ 'todos': response.data.results })
    }).catch(error => console.log(error))
  }

  get_token(username, password) {
    axios.post('http://194.67.87.31:8000/api-token-auth/', {
      username: username,
      password: password
    })
      .then(response => {
        this.set_token(response.data['token'])
      }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

  componentDidMount() {
    this.get_token_from_storage()

  }

  deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://194.67.87.31:8000/api/projects/${id}`, { headers, headers })
      .then(response => {
        this.setState({
          projects: this.state.projects.filter((item) => item.id !==
            id)
        })
      }).catch(error => console.log(error))
  }

  deleteTodo(id) {
    const headers = this.get_headers()
    axios.delete(`http://194.67.87.31:8000/api/todo/${id}`, { headers, headers })
      .then(response => {
        this.setState({
          todos: this.state.todos.filter((item) => item.id !==
            id)
        })
      }).catch(error => console.log(error))
  }

  createProject(name, repository) {
    const headers = this.get_headers()
    const data = { name: name, repository: repository, authors: [] }
    axios.post(`http://194.67.87.31:8000/api/projects/`, data, { headers, headers })
      .then(response => {
        let new_project = response.data
        this.setState({ projects: [...this.state.projects, new_project] })
      }).catch(error => console.log(error))
  }

  createTodo(project, text, author) {
    const headers = this.get_headers()
    const data = { project: project, text: text, author: author }
    axios.post(`http://194.67.87.31:8000/api/todo/`, data, { headers, headers })
      .then(response => {
        let new_todo = response.data
        const author = this.state.users.filter((item) => item.id ===
          new_todo.author)[0]
        new_todo.author = author
        const project = this.state.projects.filter((item) => item.id ===
          new_todo.project)[0]
        new_todo.project = project
        this.setState({ todos: [...this.state.todos, new_todo] })
      }).catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>

          <nav>
            <ul>
              <li>
                <Link to='/'>Project</Link>
              </li>
              <li>
                <Link to='/users'>Users</Link>
              </li>
              <li>
                <Link to='/todos'>TODO</Link>
              </li>
              <li>
                {this.is_authenticated() ? <button
                  onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path='/' component={() => <ProjectList projects={this.state.projects}
              deleteProject={(id) => this.deleteProject(id)} />} />
            <Route exact path='/projects/create' component={() => <ProjectForm
              createProject={(name, repository, author) => this.createProject(name, repository, author)} />} />
            <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
            <Route exact path='/todos' component={() => <TODOList todos={this.state.todos}
              deleteTodo={(id) => this.deleteTodo(id)} />} />
            <Route exact path='/todos/create' component={() => <TodoForm projects={this.state.projects}
              authors={this.state.users} createTodo={(project, text, author) => this.createTodo(project, text, author)} />} />
            <Route exact path='/login' component={() => <LoginForm
              get_token={(username, password) => this.get_token(username, password)} />} />
            <Route component={NotFound404} />
          </Switch>
        </BrowserRouter>
      </div>

    )
  }
}


export default App;