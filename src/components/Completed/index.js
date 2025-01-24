import {Component} from 'react'
import './completedIndex.css'
import DashboardLeftcon from '../DashboardLeftCon'
import DashboardHeader from '../DashboardHeader' 
import { MdOutlineLowPriority } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { PiSubtitlesFill } from "react-icons/pi";
import { IoPeopleCircleSharp } from "react-icons/io5";

class Completed extends Component{
    state={completedList:[{id:0,priority:'High',title:'dev',date:'29-01-2024',teamName:'bhaskar',status:'InProgress'}]}
    componentDidMount(){
        this.getCompletedTasks()
    }
    getCompletedTasks=async ()=>{
        const url = "https://cothon-task1-backend.onrender.com/getCompleted"
        const options={
            headers: {
                "Content-Type": "application/json"
            },
            method:"GET"
        }
        const response = await fetch(url,options)
        const data=await response.json()
        // console.log(data)
        this.setState({completedList:data})
    }
    render(){
        const {select}=this.props
        const {completedList}=this.state
        return(
            <div className='task-total-con'> 
                <DashboardHeader/> 
                <div className='task-containers'>
                    <DashboardLeftcon select={select}/>
                    <div className='total-complete-right-con'>
                        {completedList.map(each=>{
                            return(
                                <div className='completed-card'>
                                    <div className='completed-status'>
                                        <h1 className='complete-card-head'><div className='complete-status-color'></div></h1>
                                        <h1 className='complete-card-head'>Completed Task</h1>
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
                    </div>
                </div> 
            </div>
        )
    }
}
export default Completed