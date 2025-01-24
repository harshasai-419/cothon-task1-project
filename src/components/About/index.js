import './index.css'
import DashboardHeader from '../DashboardHeader' 
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const About=()=>{
    if(Cookies.get("jwt_token")===undefined){
        return <Navigate to="/login" replace/>
    }
    return(
        <div>
            <DashboardHeader/> 
        <div className='about-container'>
            <h1 className='about-main-head'>Collabrative Project Management Tool</h1>
            <div className='about-bottom-con'>
                <img src="https://tse3.mm.bing.net/th?id=OIP.WRFTxJBuJ6ImlM2siWVL5wHaFQ&pid=Api&P=0&h=180" className='about-image' alt="about-image"/>
                <div className='about-head-para'>
                    <p>Collaborative management tasks typically involve a structured approach to organizing, tracking, and executing tasks in a team environment. Below are key elements and features that are commonly found in such systems:</p>
                    <h3 className="about-head">Tasks:</h3>
                    <p className="about-para">Individual work items or responsibilities assigned to team members.<br/>
                      Often broken into subtasks for better clarity and management.</p>
                    <h3 className="about-head">Completed:</h3>
                    <p className="about-para">A category or list that contains tasks marked as finished.<br/>
                    Useful for tracking accomplishments and reviewing progress.</p>
                    <h3 className="about-head">To-Do:</h3>
                    <p className="about-para">A list of tasks that need to be started or are in progress.<br/>
                    Helps team members understand their upcoming responsibilities.</p>
                    <h3 className="about-head">Status:</h3>
                    <p className="about-para">Indicates the current progress of a task (e.g., "Not Started," "In Progress," "Completed," "Blocked").<br/>
                    Provides transparency into how the project is progressing.</p>
                    <h3 className="about-head">Priority:</h3>
                    <p className="about-para">A ranking or label (e.g., "High," "Medium," "Low") assigned to tasks to indicate their importance or urgency.<br/>
                    Helps teams focus on critical tasks first.</p>
                    <h3 className="about-head">Trash:</h3>
                    <p className="about-para">A repository for deleted or archived tasks.
                    Allows for task recovery if needed and keeps the main workspace uncluttered.<br/>
                    </p>
                </div>
            </div>
        </div>
        </div>
    )
}
export default About