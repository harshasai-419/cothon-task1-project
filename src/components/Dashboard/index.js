import './dashboardIndex.css'
import {Component} from 'react'
import DashboardLeftcon from '../DashboardLeftCon'
import DashboardHeader from '../DashboardHeader'
import { GrTasks } from "react-icons/gr";
import { GrCompliance } from "react-icons/gr";
import { GiProgression } from "react-icons/gi";
import { LuListTodo } from "react-icons/lu";
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BounceLoader } from 'react-spinners';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
  } from "recharts"

class Dashboard extends Component{
    state={data:[],totalTask:0,completed:0,inProgress:0,toDo:0,isLoading:true}

    componentDidMount(){
        this.getCount()
        this.getStatus()
    }
    getCount=async ()=>{
        const url="https://cothon-task1-backend.onrender.com/getCount"
        const options={
            headers: {
                "Content-Type": "application/json"
            },
            method:"GET"
        }
        const response = await fetch(url,options)
        const data1=await response.json()
        this.setState({data:data1,isLoading:false})
        
    }
    getStatus=async ()=>{
        const url="https://cothon-task1-backend.onrender.com/getStatus"
        const options={
            headers: {
                "Content-Type": "application/json"
            },
            method:"GET"
        }
        const response = await fetch(url,options)
        const data=await response.json()
        const {getItem,getItem2}=data
        const {totalCount}=getItem2 
        let com=0,inp=0,td=0;
        for(let item of getItem){
            if(item.status==='InProgress'){
                inp=item.count
            }
            if(item.status==='Completed'){
                com=item.count
            }
            if(item.status==='ToDo'){
                td=item.count
            }
        }
        this.setState({totalTask:totalCount,completed:com,inProgress:inp,toDo:td,isLoading:false})
    }
    render(){
        if(Cookies.get("jwt_token")===undefined){
            return <Navigate to="/login" replace/>
        }
        const {select}=this.props
        const {data,totalTask,completed,inProgress,toDo,isLoading}=this.state
        return(
            <div className='dash-total-con'> 
                <DashboardHeader/> 
                <div className='dash-containers'>
                    <DashboardLeftcon select={select}/> 
                    {isLoading?(
                        <div className='loader-con'>
                            <BounceLoader color="#36d7b7" loading={true} size={40} />
                        </div>
                    ):<div className='total-dash-right-con'>
                        <div className='dash-right-con'>
                            <div className='dash-card'>
                                <div>
                                    <h1 className='dash-card-head'>Total Tasks</h1>
                                    <p className='dash-card-para'>{totalTask}</p>
                                </div>
                                <div className='dash-card-icon-con1'>
                                    <GrTasks className='dash-card-icon'/>
                                </div>
                            </div>

                            <div className='dash-card'>
                                <div>
                                    <h1 className='dash-card-head'>Completed Tasks</h1>
                                    <p className='dash-card-para'>{completed}</p>
                                </div>
                                <div className='dash-card-icon-con2'>
                                    <GrCompliance className='dash-card-icon'/>
                                </div>
                            </div>

                            <div className='dash-card'>
                                <div>
                                    <h1 className='dash-card-head'>Task in Progress</h1>
                                    <p className='dash-card-para'>{inProgress}</p>
                                </div>
                                <div className='dash-card-icon-con3'>
                                    <GiProgression className='dash-card-icon'/>
                                    
                                </div>
                            </div>

                            <div className='dash-card'>
                                <div>
                                    <h1 className='dash-card-head'>Todos</h1>
                                    <p className='dash-card-para'>{toDo}</p>
                                </div>
                                <div className='dash-card-icon-con4'>
                                    <LuListTodo className='dash-card-icon'/>
                                </div>
                            </div>
                        </div>

                        <div className='dash-graph-con'>
                            <h1 className="chart-head">Chart by Priority</h1>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5
                                    }}
                                >
                                    <XAxis
                                        dataKey="priority"
                                        tick={{
                                            stroke: "gray",
                                            strokeWidth: 1,
                                        }}
                                    />
                                    <YAxis
                                        tick={{
                                            stroke: "gray",
                                            strokeWidth: 0,
                                        }}
                                    />
                                    <Legend
                                        wrapperStyle={{
                                            padding: 20,
                                        }}
                                    />
                                    <Bar 
                                        dataKey="number" 
                                        name="Number of Tasks" 
                                        fill="#1f77b4" 
                                        barSize="20%" 
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>}
                </div>

            </div>
        )
    }
}
export default Dashboard