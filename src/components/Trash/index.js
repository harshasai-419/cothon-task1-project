import {Component} from 'react'
import './trashIndex.css'
import DashboardLeftcon from '../DashboardLeftCon'
import DashboardHeader from '../DashboardHeader' 
import { MdOutlineLowPriority } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { PiSubtitlesFill } from "react-icons/pi";
import { IoPeopleCircleSharp } from "react-icons/io5";
import Popup from 'reactjs-popup'  
import { HiOutlineDotsHorizontal } from "react-icons/hi";   
import { MdOutlineDelete } from "react-icons/md";
import { MdRestore } from "react-icons/md";
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BounceLoader } from 'react-spinners';

class Trash extends Component{
    state={trashList:[{id:0,priority:'High',title:'dev',date:'29-01-2024',teamName:'bhaskar',status:'InProgress'}],isLoading:true}
    componentDidMount(){
        this.getTrash()
    }
    getTrash=async ()=>{
        const url="https://cothon-task1-backend.onrender.com/getTrash"
        const options={
            headers: {
                "Content-Type": "application/json"
            },
            method:"GET"
        }
        const response = await fetch(url,options)
        const data=await response.json()
        // console.log(data)
        this.setState({trashList:data,isLoading:false})
    }
    restoreTask=async (trashId)=>{
        const url="https://cothon-task1-backend.onrender.com/restoreTask"
        const restoreDetails={
            trashId:trashId
        }
        const options={
            headers: {
                "Content-Type": "application/json"
            },
            method:"POST",
            body:JSON.stringify(restoreDetails)
        }
        const response = await fetch(url,options)
        const data=await response.json()
        // console.log(data)
        this.setState({trashList:data})
    }
    trashTask=async (trashId)=>{
        const url="https://cothon-task1-backend.onrender.com/trashTask"
            const deleteDetails={
                    trashId:trashId
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
            this.setState({trashList:data})
    }
    
    render(){
        if(Cookies.get("jwt_token")===undefined){
            return <Navigate to="/login" replace/>
        }
        const {select}=this.props
        const {trashList,isLoading}=this.state 
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
                    <div className='total-trash-right-con'>
                        {trashList.map(each=>{
                                return(
                                    <div className='trash-card'>
                                        <div className='trash-status'>
                                            <h1 className='trash-card-head'>Deleted Task</h1>
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
                                                                    <MdRestore />
                                                                </button>
                                                                <button
                                                                    className='task-dot-button'
                                                                    onClick={() => {
                                                                        this.restoreTask(each.id);  
                                                                        close(); 
                                                                    }}
                                                                >
                                                                    Restore
                                                                </button>
                                                            </div>
                                                            <div className='dup-con'>
                                                                <button className='task-delete-icon'>
                                                                    <MdOutlineDelete className='delete-icon-self'/>
                                                                </button>
                                                                <button
                                                                    className='task-dot-button'
                                                                    onClick={() => {
                                                                        this.trashTask(each.id);  
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
                                    </div>
                                )
                            })}
                    </div>}
                </div>
            </div>
        )
    }
}

export default Trash 