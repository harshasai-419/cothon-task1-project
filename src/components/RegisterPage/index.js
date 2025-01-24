import Cookies from "js-cookie"
import {Component} from 'react'
import {Link,Navigate} from 'react-router-dom'
import './registerIndex.css'

class RegisterPage extends Component{
    state={username:'',password:'',res:''}
    getRegister= async (event)=>{
        event.preventDefault()
        const {username,password}=this.state
        if(username==='' || password===''){
            this.setState({res:"Invalid username or password",username:'',password:''})
        }
        else{
            const url="https://cothon-task1-backend.onrender.com/register"
            const userDetails={
                    username:username,
                    password:password
            }
            const options={
                headers: {
                    "Content-Type": "application/json"
                },
                method:"POST",
                body:JSON.stringify(userDetails)
            }
            const response = await fetch(url,options)
            if(response.ok===false){
                this.setState({res:"try again",username:'',password:''})
            }
            else{
                const data= await response.text()
                this.setState({res:data,username:'',password:''})
                console.log(response)
            }
            
            }
        
    }
    changeUsername=(event)=>{
        this.setState({username:event.target.value})
    }
    changePassword=(event)=>{
        this.setState({password:event.target.value})
    }
    render(){
        if(Cookies.get("jwt_token")!==undefined){
                return <Navigate to="/" />
        }
        const {username,password,res}=this.state
        const resClass=(res==="registered successfully"?"res-para1":"res-para2")
        return(
            <div className="total-con">      
                <h1 className="register-head">Register Here</h1>
                <form className="login-card" onSubmit={this.getRegister}>
                        <h1 className='login-form-head'><span className="span-ele">Hello user</span>, Welcome!</h1>
                        <div className='input-con'>
                            <label className="label-ele" htmlFor='email'>Email Address</label>
                            <input placeholder="ENTER USERNAME" id="email" className="input-ele" value={username} onChange={this.changeUsername}/>
                        </div>
                        <div className='input-con'>
                            <label className="label-ele" htmlFor="password">Password</label>
                            <input id="password" placeholder="ENTER PASSWORD" type="password" className="input-ele" value={password} onChange={this.changePassword}/>
                        </div>
                        <div className="reg-log">
                            <button className='login-button'>Register</button>
                            <Link className='link-item' to="/login">Login</Link>
                        </div>
                        <p className={resClass}>{res}</p>
                </form> 
            </div>
        )
    }
}

export default RegisterPage