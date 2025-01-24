import {Component} from 'react'
import './teamIndex.css'
import DashboardLeftcon from '../DashboardLeftCon'
import DashboardHeader from '../DashboardHeader' 
import Popup from 'reactjs-popup'  
import { PiSubtitlesFill } from "react-icons/pi";
import { IoPersonCircle } from "react-icons/io5";
import { IoPeopleCircleSharp } from "react-icons/io5";
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

class Team extends Component{
    state={teamList:[{teamName:'sample',teamLead:'sai'},],teamName:'',teamLead:''}

    componentDidMount(){
        this.getTeams()
    }
    addTeam=async ()=>{
        const {teamName,teamLead}=this.state
        const url="https://cothon-task1-backend.onrender.com/addTeam"
                const taskDetails={
                        teamName:teamName,
                        teamLead:teamLead
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
                this.setState({teamList:data})
                // console.log(data)
    }
    changeTeamName=(event)=>{
        this.setState({teamName:event.target.value})
    }
    changeTeamLead=(event)=>{
        this.setState({teamLead:event.target.value})
    }
    getTeams=async ()=>{
        const url="https://cothon-task1-backend.onrender.com/getTeam"
        const options={
            headers: {
                "Content-Type": "application/json"
            },
            method:"GET",
        }
        const response = await fetch(url,options)
        const data=await response.json()
        this.setState({teamList:data})
    }
    render(){
        if(Cookies.get("jwt_token")===undefined){
            return <Navigate to="/login" replace/>
        }
        const {select}=this.props
        const {teamList,teamName,teamLead}=this.state
        return(
            <div className='task-total-con'> 
                <DashboardHeader/> 
                <div className='task-containers'>
                    <DashboardLeftcon select={select}/>
                    <div className='total-team-right-con'>
                         <div className='task-top-right-con'>
                            <h1 className='task-head'>Teams</h1>
                            {/* popup container */}
                            <div>
                                <Popup
                                    modal
                                    trigger={
                                        <button className='task-button'>+ Create Team</button>
                                    }
                                >
                                    {close => (
                                    <>
                                    <div className='team-popup-container'>
                                        <h1 className='tigger-head'>Add Team</h1>
                                        <label className='trigger-label-ele' htmlFor="teamName">Team Name</label><br/>
                                        <input type="text" placeholder="Task" id="teamName" className='trigger-input-ele' value={teamName} onChange={this.changeTeamName}/><br/>
                                        <label className='trigger-label-ele' htmlFor='teamLead'>Team Lead</label><br/>
                                        <input type="text" id="teamLead" value={teamLead} placeholder="Team Name" className='trigger-input-ele' onChange={this.changeTeamLead}/><br/>
                                        <div className='trigger-button-con'>
                                            <button
                                            type="button"
                                            className="task-trigger-button"
                                            onClick={() => close()}
                                            >
                                            Cancel
                                            </button>
                                            <button type="button" className='submit-trigger-button' onClick={()=>{this.addTeam(); close();}}>Submit</button>
                                        </div>
                                    </div>
                                    </>
                                    )}
                                </Popup>
                            </div>
                        </div>
                        <div className='total-team-cards'>
                            {teamList.map(each=>{
                                return(
                                    <div className='team-card'>
                                        <h1 className='team-head'><IoPeopleCircleSharp  className='team-card-icon2'/></h1>
                                        <div className='team-card-item'>
                                            <h1 className='team-head'><PiSubtitlesFill className='team-card-icon'/></h1>
                                            <h1 className='team-head'>{each.teamName}</h1>
                                        </div>
                                        <div className='team-card-item'>
                                            <h1  className='team-head'><IoPersonCircle className='team-card-icon'/></h1>
                                            <h1 className='team-head'>{each.teamLead}</h1>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Team