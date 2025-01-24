import {BrowserRouter,Route,Routes} from 'react-router-dom'
import {Component} from 'react'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import Dashboard from './components/Dashboard'
import Logout from './components/Logout'
import Tasks from './components/Tasks'
import SelectContext from './context/SelectContext'
import Completed from './components/Completed'
import Todo from './components/Todo'
import Inprogress from './components/Inprogress'
import Trash from './components/Trash'
import Team from './components/Team'
import Settings from './components/Settings'
import About from './components/About'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component{
  state={selectedTask:''}
  toggleTask = (ele) => {
    this.setState(prevState => ({selectedTask:ele}))
  }
  render(){
    const {selectedTask}=this.state
    return (
      <SelectContext.Provider
        value={{selectedTask, toggleTask:this.toggleTask}}
      >
      <BrowserRouter>
        <Routes>      
          <Route exact path="/login" element={<LoginPage/>}/>
          <Route exact path="/register" element={<RegisterPage/>} />
          <Route exact path="/logout" element={<Logout/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/" element={<Dashboard select={'dashboard'}/>}/>
          <Route exact path="/tasks" element={<Tasks select={'tasks'}/>}/>
          <Route exact path="/completed" element={<Completed select={'completed'}/>}/>
          <Route exact path="/inprogress" element={<Inprogress select={'inProgress'}/>}/>
          <Route exact path="/todo" element={<Todo select={'toDo'}/>}/>
          <Route exact path="/trash" element={<Trash select={'trash'}/>}/>
          <Route exact path="/team" element={<Team select={'team'}/>}/>
          <Route exact path="/settings" element={<Settings select={'settings'}/>}/>
          <Route path="*" element={<NotFound />}/>
         
        </Routes>
        
      </BrowserRouter>
      </SelectContext.Provider>
    )
  }
}

export default App;
