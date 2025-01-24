import {Component} from 'react'
import './todoIndex.css'
import DashboardLeftcon from '../DashboardLeftCon'
import DashboardHeader from '../DashboardHeader' 
import { MdOutlineLowPriority } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { PiSubtitlesFill } from "react-icons/pi";
import { IoPeopleCircleSharp } from "react-icons/io5";
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BounceLoader } from 'react-spinners';

class Todo extends Component{
    state={todoList:[{id:0,priority:'High',title:'dev',date:'29-01-2024',teamName:'bhaskar',status:'InProgress'}],isLoading:true}
    componentDidMount(){
        this.getTodoTasks()
    }
    getTodoTasks=async ()=>{
        const url="https://cothon-task1-backend.onrender.com/gettodo"
        const options={
            headers: {
                "Content-Type": "application/json"
            },
            method:"GET"
        }
        const response = await fetch(url,options)
        const data=await response.json()
        // console.log(data)
        this.setState({todoList:data,isLoading:false})
    }
    render(){
        if(Cookies.get("jwt_token")===undefined){
            return <Navigate to="/login" replace/>
        }
        const {select}=this.props
        const {todoList,isLoading}=this.state
        return(
            <div className='task-total-con'> 
                <DashboardHeader/> 
                <div className='task-containers'>
                    <DashboardLeftcon select={select}/>
                    {isLoading?(
                        <div className='loader-con'>
                            <BounceLoader color="#36d7b7" loading={true} size={40} />
                        </div>
                    ):
                    <div className='total-todo-right-con'>
                        {todoList.map(each=>{
                            return(
                                <div className='todo-card'>
                                    <div className='todo-status'>
                                        <h1 className='todo-card-head'><div className='todo-card-status-color'></div></h1>
                                        <h1 className='todo-card-head'>ToDo Task</h1>
                                    </div>
                                    <div className='task-card-icon-con'>
                                        <h1 className='task-card-head'><MdOutlineLowPriority className='task-card-icon'/></h1>
                                        <h1 className='task-card-head'>{each.priority}</h1>
                                    </div>
                                    <div className='task-card-icon-con'>
                                        <h1 className='task-card-head'><PiSubtitlesFill className='task-card-icon'/></h1>
                                        <h1 className='task-card-head'>{each.title}</h1>
                                    </div>
                                    <div className='task-card-icon-con'>
                                        <h1 className='task-card-head'><IoPeopleCircleSharp className='task-card-icon'/></h1>
                                        <h1 className='task-card-head'>{each.teamName}</h1>
                                    </div>
                                    <div className='task-card-icon-con'>
                                        <h1 className='task-card-head'><MdOutlineCalendarMonth /></h1>
                                        <h1 className='task-card-head'>{each.date}</h1> 
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
                </div> 
            </div>
        )
    }
}
export default Todo