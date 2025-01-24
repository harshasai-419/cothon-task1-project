import './DashLeftIndex.css'
import {Component} from 'react'
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { RiCalendarTodoLine } from "react-icons/ri";
import { RiTeamFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { SiTicktick } from "react-icons/si";    
import {Link} from 'react-router-dom'
import SelectContext from '../../context/SelectContext';


class DashboardLeftcon extends Component{

    render(){
        let {select}=this.props
        return(
            <SelectContext.Consumer>
            {value=>{
                const {selectedTask,toggleTask}=value
                return(
                    <div className='dash-left-con'>
                        <div>
                        {select==='dashboard' || selectedTask==='dashboard'?
                            (<Link className='select-dash-left-icon' to="/">
                                <Link className='select-left-link-item' to="/"> <MdDashboard /></Link>
                                <Link className='select-left-link-item' to="/">Dashboard</Link><br/>
                            </Link>
                            ):(<Link className='dash-left-icon' to="/" onClick={()=>toggleTask('dashboard')}>
                                <Link className='left-link-item' to="/">
                                    <span><MdDashboard /></span>
                                    <span>Dashboard</span>
                                </Link>
                            </Link>)}

                            {select==='tasks' || selectedTask==='tasks'?
                            (<Link className='select-dash-left-icon' to='/tasks'>
                                <Link className='select-left-link-item' to='/tasks'> <FaTasks /> </Link>
                                <Link className='select-left-link-item' to='/tasks'>Tasks</Link><br/>
                            </Link>):
                            (<Link className='dash-left-icon' onClick={()=>toggleTask('tasks')} to="/tasks">
                                <Link className='left-link-item' to='/tasks'> <FaTasks /> </Link>
                                <Link className='left-link-item' to='/tasks'>Tasks</Link><br/>
                            </Link>)}

                            {select==='completed' || selectedTask==='completed'?(
                            <Link className='select-dash-left-icon' to="/completed">
                                <Link className='select-left-link-item' to="/completed"> <SiTicktick /></Link>
                                <Link className='select-left-link-item' to="/completed">Completed</Link><br/>
                            </Link>
                            ):(<Link className='dash-left-icon' to="/completed" onClick={()=>toggleTask('completed')}>
                                <Link className='left-link-item' to="/completed"> <SiTicktick /></Link>
                                <Link className='left-link-item' to="/completed">Completed</Link><br/>
                            </Link>)}

                            {selectedTask==='inProgress' || select==='inProgress'?(
                            <Link className='select-dash-left-icon' to="/inprogress">
                                <Link className='select-left-link-item' to="/inprogress" > <GrInProgress /></Link>
                                <Link className='select-left-link-item' to="/inprogress">In Progress</Link><br/>
                            </Link>
                            ):(<Link className='dash-left-icon' onClick={()=>toggleTask('inProgress')} to="/inprogress">
                                <Link className='left-link-item' to="/inprogress"> <GrInProgress /></Link>
                                <Link className='left-link-item' to="/inprogress">In Progress</Link><br/>
                            </Link>)}

                            {selectedTask==='toDo'|| select==='toDo'?(
                                <Link className='select-dash-left-icon' to="/todo">
                                    <Link className='select-left-link-item' to="/todo"> <RiCalendarTodoLine /></Link>
                                    <Link className='select-left-link-item' to="/todo">To Do</Link><br/>
                                </Link>
                            ):(<Link className='dash-left-icon' to="/todo" onClick={()=>toggleTask('toDo')}>
                                <Link className='left-link-item' to="/todo"> <RiCalendarTodoLine /></Link>
                                <Link className='left-link-item' to="/todo">To Do</Link><br/>
                            </Link>)}

                            {selectedTask==='team' || select==="team"?(
                                <Link className='select-dash-left-icon' to="/team">
                                    <Link className='select-left-link-item' to="/team"> <RiTeamFill /></Link>
                                    <Link className='select-left-link-item' to="/team">Team</Link><br/>
                                </Link>
                            ):(<Link className='dash-left-icon' to="/team" onClick={()=>toggleTask('team')}>
                                <Link className='left-link-item' to="/team"> <RiTeamFill /></Link>
                                <Link className='left-link-item' to="/team">Team</Link><br/>
                            </Link>)}

                            {selectedTask==='trash' || select==='trash'?(
                                <Link className='select-dash-left-icon' to="/trash">
                                    <Link className='select-left-link-item' to="/trash"><FaTrash /></Link>
                                    <Link className='select-left-link-item' to="/trash">Trash</Link><br/>
                                </Link>
                            ):(<Link className='dash-left-icon' to="/trash" onClick={()=>toggleTask('trash')}>
                                <Link className='left-link-item' to="/trash"><FaTrash /></Link>
                                <Link className='left-link-item' to="/trash">Trash</Link><br/>
                            </Link>) }
                        
                        </div>
                        {selectedTask==='settings' || select==='settings' ?(
                            <Link className='select-dash-left-icon' to="/settings">
                                <Link className='select-left-link-item' to="/settings"><IoMdSettings /></Link>
                                <Link className='select-left-link-item' to="/settings">Settings</Link>
                            </Link>
                        ):(<Link className='dash-left-icon' to="/settings" onClick={()=>toggleTask('settings')}>
                                <Link className='left-link-item' to="/settings"><IoMdSettings /></Link>
                            <Link className='left-link-item' to="/settings">Settings</Link>
                        </Link>)}
                        
                    </div>
                )
            }}
            </SelectContext.Consumer>
        )
    }
}

export default DashboardLeftcon