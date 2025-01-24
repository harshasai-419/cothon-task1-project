import {Component} from 'react'
import './settingsIndex.css'
import DashboardLeftcon from '../DashboardLeftCon'
import DashboardHeader from '../DashboardHeader' 
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

class Settings extends Component{
    
    render(){
        if(Cookies.get("jwt_token")===undefined){
            return <Navigate to="/login" replace/>
        }
        const {select}=this.props
        return(
            <div className='task-total-con'> 
                <DashboardHeader/> 
                <div className='task-containers'>
                    <DashboardLeftcon select={select}/>
                    <div className='total-settings-right-con'>
                        <h1>Settings page is under progress</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings