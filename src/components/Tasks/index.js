import './taskIndex.css'
import {Component} from 'react'
import DashboardLeftcon from '../DashboardLeftCon'
import DashboardHeader from '../DashboardHeader'  
import Popup from 'reactjs-popup'  
import { HiOutlineDotsHorizontal } from "react-icons/hi";   
import { IoDuplicateSharp } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineLowPriority } from "react-icons/md";
import { PiSubtitlesFill } from "react-icons/pi";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BounceLoader } from 'react-spinners';

class Tasks extends Component{
    state={taskList:[{id:0,priority:'High',title:'dev',date:'29-01-2024',teamName:'bhaskar',status:'ToDo',isLoading:true}],title:'',teamName:'',date:'',priority:'',status:'',isLoading:true}

    changeTitle=(event)=>{
        this.setState({title:event.target.value})
    }
    changeTeamName=(event)=>{
        this.setState({teamName:event.target.value})
    }
    changeDate=(event)=>{
        this.setState({date:event.target.value})
    }
    changePriority=(event)=>{
        this.setState({priority:event.target.value})
    }
    changeStatus=(event)=>{
        this.setState({status:event.target.value})
    }
    addItems=async ()=>{
        const {title,teamName,date,priority}=this.state
        const url="https://cothon-task1-backend.onrender.com/addTask"
                const taskDetails={
                        title:title,
                        teamName:teamName,
                        date:date,
                        priority:priority
                }
                const options={
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method:"POST",
                    body:JSON.stringify(taskDetails)
                }
                const response = await fetch(url,options)
                const data=await response.json()
                this.setState({taskList:data,isLoading:false})
                // console.log(data)
    }
    editItems=async (id)=>{
        const {title,teamName,date,priority,status}=this.state
        const url="https://cothon-task1-backend.onrender.com/editTask"
                const taskDetails={
                        title:title,
                        teamName:teamName,
                        date:date,
                        priority:priority,
                        status:status,
                        taskId:id
                }
                const options={
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method:"POST",
                    body:JSON.stringify(taskDetails)
                }
                const response = await fetch(url,options)
                const data=await response.json()
                this.setState({taskList:data})
                // console.log(data)
    }
    componentDidMount(){
        this.getTasks()
    }
    getTasks=async ()=>{
        // console.log("went")
        const url="https://cothon-task1-backend.onrender.com/getTasks"
        const options={
            headers: {
                "Content-Type": "application/json"
            },
            method:"GET"
        }
        const response = await fetch(url,options)
        const data=await response.json()
        console.log(data)
        this.setState({taskList:data,isLoading:false})
    }
   
    duplicateTask=async (taskId)=>{
        console.log(taskId)
        const url="https://cothon-task1-backend.onrender.com/duplicate"
            const dupDetails={
                    taskId:taskId
            }
            const options={
                headers: {
                    "Content-Type": "application/json"
                },
                method:"POST",
                body:JSON.stringify(dupDetails)
            }
            const response = await fetch(url,options)
            const data=await response.json()
            this.setState({taskList:data})
    }
    deleteTask=async (taskId)=>{
        const url="https://cothon-task1-backend.onrender.com/delete"
            const deleteDetails={
                    taskId:taskId
            }
            const options={
                headers: {
                    "Content-Type": "application/json"
                },
                method:"POST",
                body:JSON.stringify(deleteDetails)
            }
            const response = await fetch(url,options)
            const data=await response.json()
            this.setState({taskList:data})
    }

    render(){
        if(Cookies.get("jwt_token")===undefined){
            return <Navigate to="/login" replace/>
        }
        const {select}=this.props;
        const {taskList,title,teamName,date,priority,status,isLoading}=this.state
        console.log(title)
        console.log(status)
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
                    <div className='total-task-right-con'>
                            <div className='task-top-right-con'>
                                <h1 className='task-head'>Tasks</h1>
                                {/* popup container */}
                                <div>
                                    <Popup
                                        modal
                                        trigger={
                                            <button className='task-button'>+ Create Task</button>
                                        }
                                    >
                                        {close => (
                                        <>
                                        <div className='popup-container'>
                                            <h1 className='tigger-head'>Add Task</h1>
                                            <label className='trigger-label-ele' htmlFor="taskTitle">Task Title</label><br/>
                                            <input type="text" placeholder="Task" id="taskTitle" className='trigger-input-ele' value={title} onChange={this.changeTitle}/><br/>
                                            <label className='trigger-label-ele' htmlFor='teamName'>Assign Task To:</label><br/>
                                            <input type="text" id="teamName" value={teamName} placeholder="Team Name" className='trigger-input-ele' onChange={this.changeTeamName}/><br/>        
                                            <div className='tigger-input-con'>
                                                <div className='trigger-input-con-ele'>
                                                    <label htmlFor='priority' className='trigger-label-ele'>Priority Level</label><br/>
                                                    <select id="priority" value={priority} name="priority" className='trigger-input-ele' onChange={this.changePriority}>
                                                        <option></option>
                                                        <option value="normal">Normal</option>
                                                        <option value="medium">Medium</option>
                                                        <option value="high">High</option>
                                                    </select><br/>
                                                </div>
                                                <div className='trigger-input-con-ele'>
                                                    <label className='trigger-label-ele' htmlFor='date'>Task Date</label><br/>
                                                    <input type="date" id="date" className='trigger-input-ele' value={date} onChange={this.changeDate}/><br/>
                                                </div>
                                            </div>
                                            <div className='trigger-button-con'>
                                                <button
                                                type="button"
                                                className="task-trigger-button"
                                                onClick={() => close()}
                                                >
                                                Cancel
                                                </button>
                                                <button type="button" className='submit-trigger-button' onClick={()=>{this.addItems(); close();}}>Submit</button>
                                            </div>
                                        </div>
                                        </>
                                        )}
                                    </Popup>
                                </div>
                            </div>

                        {/* task items */}
                        <div>
                            <div className='task-status-con'>
                                <div className='task-status-card'>
                                    <div className='task-status-left'>
                                        <h1><div className='todo-status-color'></div></h1>
                                        <h1 className='task-head'>To Do</h1>
                                    </div>
                                    <h1 className='task-head'>+</h1>
                                </div>
                                <div className='task-status-card'>
                                    <div className='task-status-left'>
                                        <h1><div className='inProgress-status-color'></div></h1>
                                        <h1 className='task-head'>In Progress</h1>
                                    </div>
                                    <h1 className='task-head'>+</h1>
                                </div>
                                <div className='task-status-card'>
                                    <div className='task-status-left'>
                                        <h1><div className='completed-status-color'></div></h1>
                                        <h1 className='task-head'>Completed</h1>
                                    </div>
                                    <h1 className='task-head'>+</h1>
                                </div>
                            </div>
                            <div className='task-items-con'>
                                {taskList.map(each=>{
                                    return(
                                        <div className='task-items-card'>
                                            <div className='task-card-dots'>
                                                <div className='task-card-status-con'>
                                                    {each.status==='InProgress'?<h1><div className='inProgress-status-color'></div></h1>:(each.status==='ToDo'?<h1><div className='todo-status-color'></div></h1>:<h1><div className='completed-status-color'></div></h1>)}
                                                    <h1 className='task-status-head'>Task</h1>
                                                </div>
                                                <div>
                                                    <Popup
                                                        trigger={
                                                            <button className='task-head dots-button'>
                                                                <HiOutlineDotsHorizontal className='dots-icon'/>
                                                            </button>
                                                        }
                                                        position="bottom left"
                                                    >
                                                        {close => (
                                                            <div className="task-dots-card">
                                                                <div className='dup-con'>
                                                                    <button className='task-dup-icon'>
                                                                        <IoDuplicateSharp />
                                                                    </button>
                                                                    <button
                                                                        className='task-dot-button'
                                                                        onClick={() => {
                                                                            this.duplicateTask(each.id);  
                                                                            close(); 
                                                                        }}
                                                                    >
                                                                        Duplicate
                                                                    </button>
                                                                </div>
                                                                <div className='dup-con'>
                                                                    <button className='task-delete-icon'>
                                                                        <MdOutlineDelete className='delete-icon-self'/>
                                                                    </button>
                                                                    <button
                                                                        className='task-dot-button'
                                                                        onClick={() => {
                                                                            this.deleteTask(each.id);  
                                                                            close();  
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Popup>

                                                </div>
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
                                            <div className='pop-edit-button'>
                                                <Popup
                                                    modal
                                                    trigger={
                                                        <button className='task-button'>Edit Details</button>
                                                    }
                                                >
                                                    {close => (
                                                    <>
                                                    <div className='popup-container'>
                                                        <h1 className='tigger-head'>Edit Task Details</h1>
                                                        <label className='trigger-label-ele' htmlFor="taskTitle">Task Title</label><br/>
                                                        <input type="text" placeholder="Task" id="taskTitle" className='trigger-input-ele' value={title} onChange={this.changeTitle}/><br/>
                                                        <label className='trigger-label-ele' htmlFor='teamName'>Assign Task To:</label><br/>
                                                        <input type="text" id="teamName" value={teamName} placeholder="Team Name" className='trigger-input-ele' onChange={this.changeTeamName}/><br/>        
                                                        <div className='tigger-input-con'>
                                                            <div className='trigger-input-con-ele'>
                                                                <label htmlFor='priority' className='trigger-label-ele'>Priority Level</label><br/>
                                                                <select id="priority" value={priority} name="priority" className='trigger-input-ele' onChange={this.changePriority}>
                                                                    <option></option>
                                                                    <option value="normal">Normal</option>
                                                                    <option value="medium">Medium</option>
                                                                    <option value="high">High</option>
                                                                </select><br/>
                                                            </div>
                                                            <div className='trigger-input-con-ele'>
                                                                <label className='trigger-label-ele' htmlFor='date'>Task Date</label><br/>
                                                                <input type="date" id="date" className='trigger-input-ele' value={date} onChange={this.changeDate}/><br/>
                                                            </div>                                                           
                                                        </div>
                                                        <div className='edit-card-con'>
                                                            <div className='trigger-input-con-ele'>
                                                                    <label htmlFor='status' className='trigger-label-ele'>Status Level</label><br/>
                                                                    <select id="status" value={status} name="status" className='trigger-input-ele' onChange={this.changeStatus}>
                                                                        <option></option>
                                                                        <option value="ToDo">Todo</option>
                                                                        <option value="InProgress">inprogress</option>
                                                                        <option value="Completed">Completed</option>
                                                                    </select><br/>
                                                            </div>
                                                            <div className='trigger-button-con'>
                                                                <button
                                                                type="button"
                                                                className="task-trigger-button"
                                                                onClick={() => close()}
                                                                >
                                                                Cancel
                                                                </button>
                                                                <button type="button" className='submit-trigger-button' onClick={()=>{this.editItems(each.id); close();}}>Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </>
                                                    )}
                                                </Popup>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>   }   
                    
                </div>
            </div>
        )
    }
}

export default Tasks