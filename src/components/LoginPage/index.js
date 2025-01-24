    import './loginIndex.css'
    import {Component} from 'react'
    import {Link,Navigate} from 'react-router-dom'
    import Cookies from 'js-cookie'

    class LoginPage extends Component{
        state={username:'',password:'',goToHome:false,res:''}

        getLoginDetails= async (event)=>{
            event.preventDefault()
            const {username,password}=this.state
            if(username==='' || password===''){
                this.setState({res:"Invalid username or password",username:'',password:''})
            }
            else{
                const url="https://cothon-task1-backend.onrender.com/login"
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
                
                if(response.status===404){
                    this.setState({res:"try again",username:'',password:''})
                }
                else{
                    if(response.ok===true){
                        const data=await response.json()
                        const {jwtToken}=data 
                        Cookies.set("jwt_token",jwtToken,{
                            expires:1
                        })
                        this.setState({goToHome:true})
                        console.log(data)
                    }
                    else{
                        this.setState({res:"username or password is incorrect",username:'',password:''})
                    }
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
            const {username,password,goToHome,res}=this.state
            if(goToHome===true || Cookies.get("jwt_token")!==undefined){
                return <Navigate to="/" replace/>
            }
            return(
                <div className="login-bg-container">
                    <div className='login-left-con'>
                        <span className="login-para">manage all tasks here</span>
                        <h1 className="login-head"><span className='collab-head'>Collabrative</span> <br/>Task Manager</h1>
                        <div className="login-round"></div>
                    </div>
                    <form className="login-card" onSubmit={this.getLoginDetails}>
                        <h1 className='login-form-head'>Welcome back!</h1>
                        <div className='input-con'>
                            <label className="label-ele" htmlFor='email'>Email Address</label>
                            <input placeholder="ENTER USERNAME" id="email" className="input-ele" value={username} onChange={this.changeUsername}/>
                        </div>
                        <div className='input-con'>
                            <label className="label-ele" htmlFor="password">Password</label>
                            <input id="password" placeholder="ENTER PASSWORD" type="password" className="input-ele" value={password} onChange={this.changePassword}/>
                        </div>
                        <div className='log-reg'>
                            <button className='login-button'>Login</button>
                            <Link className='link-item' to="/register">Register</Link>
                        </div>
                        <p className="res-para">{res}</p>
                    </form> 
                </div>
            )
        }
    }

    export default LoginPage