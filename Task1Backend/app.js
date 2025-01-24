let express=require("express")
const app = express()
const cors =require("cors")
app.use(cors())
const sqlite3=require("sqlite3")
const path=require("path")
const dbPath=path.join(__dirname,"users.db")
const {open}=require("sqlite")
const bcrypt=require("bcrypt")
let db=null
app.use(express.json())
const jwt = require("jsonwebtoken")
app.use(express.static(path.join(__dirname, '../public')));

let intializeDbAndServer=async ()=>{
    try{
        db=await open({
            filename:dbPath,
            driver:sqlite3.Database,
        })
        app.listen(3000,()=>{
            console.log("server is running")
        })
    }
    catch(e){
        console.log(e)
    }
}
intializeDbAndServer()

app.post("/login",async (request,response)=>{
    const {username,password}=request.body
    const getQuery=`select * from user where username='${username}'`
    const getItem=await db.get(getQuery)
    
    // console.log(getItem)
    if(getItem===undefined){
        response.status(401)
        response.send("Invalid username")
    }
    else{
        isPassMatch=await bcrypt.compare(password,getItem.password)
        if(isPassMatch===true){
            const payload={
                username:username,
            }
            const jwtToken=jwt.sign(payload,"secretkey")
            // console.log(jwtToken)
            response.send({jwtToken})
        }
        else{
            response.status(400)
            response.send("Invalid password")
        }
    }
})

app.post("/register", async (request,response)=>{
    const {username,password}=request.body 
    // console.log(password)
    const getQuery=`select * from user where username='${username}'`
    const getItem=await db.get(getQuery)
    
    if(getItem===undefined){
        const hashedPassword= await bcrypt.hash(password,10)
        insertQuery=`insert into user (username,password) values ('${username}','${hashedPassword}');`
        const getItem= await db.run(insertQuery)
        response.send("registered successfully")
    }
    else{
        response.send('username already exists')
    }

})

app.post('/addTask',async (request,response)=>{
    const {title,teamName,date,priority}=request.body 
    const insertQuery=`insert into tasks (teamName,date,priority,status,title) values ('${teamName}','${date}','${priority}','InProgress','${title}');`
    const getItem=await db.run(insertQuery)
    const getQuery=`select * from tasks`
    const res=await db.all(getQuery)
    // console.log(res)
    response.send(res)
})

app.post('/addTeam',async (request,response)=>{
    const {teamLead,teamName}=request.body 
    const insertQuery=`insert into teams (teamName,teamLead) values ('${teamName}','${teamLead}');`
    const getItem=await db.run(insertQuery)
    const getQuery=`select * from teams`
    const res=await db.all(getQuery)
    // console.log(res)
    response.send(res)
})

app.post('/editTask',async (request,response)=>{
    const {title,teamName,date,priority,status,taskId}=request.body 
    const updateQuery=`update tasks set teamName='${teamName}',date='${date}',priority='${priority}',status='${status}',title='${title}' where id=${taskId}`
    const updateItem=await db.run(updateQuery)
    const getQuery=`select * from tasks`
    const res=await db.all(getQuery)
    console.log(res)
    response.send(res)
})

app.post('/changeStatus',async (request,response)=>{
    const {taskId,status}=request.body
    const updateQuery=`update tasks set status='${status}' where id=${taskId}`
    const updateItem=await db.run(updateQuery)
    let getQuery=`select * from tasks`
    let getItem=await db.all(getQuery)
    // console.log(getItem)
    response.send(getItem)
})

app.get("/getTasks",async (request,response)=>{
    let getQuery=`select * from tasks`
    let getItem=await db.all(getQuery)
    // console.log(getItem)
    response.send(getItem)
})

app.get("/getTeam",async (request,response)=>{
    let getQuery=`select * from teams`
    let getItem=await db.all(getQuery)
    // console.log(getItem)
    response.send(getItem)
})

app.get("/getCount",async (request,response) => {
    let getQuery=`select priority,COUNT() AS number from tasks GROUP BY priority`
    let getItem=await db.all(getQuery)
    response.send(getItem)
})

app.get("/getCompleted",async(request,response)=>{
    let getQuery=`select * from tasks where status='Completed'`
    let getItem=await db.all(getQuery)
    console.log(getItem)
    response.send(getItem)
})

app.get("/gettodo",async(request,response)=>{
    let getQuery=`select * from tasks where status='ToDo'`
    let getItem=await db.all(getQuery)
    response.send(getItem)
})
app.get("/getinprogress",async(request,response)=>{
    let getQuery=`select * from tasks where status='InProgress'`
    let getItem=await db.all(getQuery)
    response.send(getItem)
})

app.post("/duplicate",async(request,response)=>{
    let {taskId}=request.body
    let getQuery=`select * from tasks where id=${taskId}`
    let getItem=await db.get(getQuery)
    let {teamName,date,priority,status,title}=getItem
    let insertQuery=`insert into tasks (teamName,date,priority,status,title) values ('${teamName}','${date}','${priority}','${status}','${title}');`
    let insertItem=await db.run(insertQuery)
    let getResQuery=`select * from tasks`
    let getRes=await db.all(getResQuery)
    // console.log(getRes)
    response.send(getRes)
})

app.post("/delete",async(request,response)=>{
    let {taskId}=request.body 
    let getQuery=`select * from tasks where id=${taskId}`
    let getItem=await db.get(getQuery)
    let {teamName,title,date,priority,status}=getItem 
    let insertQuery=`insert into trash (teamName,date,priority,status,title) values ('${teamName}','${date}','${priority}','${status}','${title}');`
    let insertItem=await db.run(insertQuery)
    let deleteQuery=`delete from tasks where id=${taskId}`
    let deleteItem=await db.run(deleteQuery)
    let getResQuery=`select * from tasks`
    let getRes=await db.all(getResQuery)
    // console.log(getRes)
    response.send(getRes)

})

app.get("/getStatus",async (request,response)=>{
    let getQuery=`select status,COUNT() AS count from tasks GROUP BY status`    
    let getQuery2=`select count() AS totalCount from tasks`
    let getItem=await db.all(getQuery)
    let getItem2=await db.get(getQuery2)
    // console.log(getItem)
    response.send({getItem,getItem2});
})

app.get("/getTrash",async (request ,response)=>{
    let getQuery=`select * from trash`
    let getItem=await db.all(getQuery)
    // console.log(getItem) 
    response.send(getItem)
    
})

app.post("/trashTask",async (request ,response)=>{
    let {trashId}=request.body 
    let deleteQuery=`delete from trash where id=${trashId}`
    let deleteItem=await db.run(deleteQuery)
    let getQuery=`select * from trash`
    let getItem=await db.all(getQuery)
    response.send(getItem)
})

app.post("/restoreTask",async (request ,response)=>{
    let {trashId}=request.body 
    console.log(trashId)
    let getQuery=`select * from trash where id=${trashId}`
    let getItem=await db.get(getQuery)
    let {teamName,title,date,priority,status}=getItem 
    let insertQuery=`insert into tasks (teamName,date,priority,status,title) values ('${teamName}','${date}','${priority}','${status}','${title}');`
    let insertItem=await db.run(insertQuery)
    let deleteQuery=`delete from trash where id=${trashId}`
    let deleteItem=await db.run(deleteQuery)
    let getQuery2=`select * from trash`
    let getItem2=await db.all(getQuery2)

    response.send(getItem2)
})

app.use(express.static(path.join(__dirname, '../build')));

// Catch-all route to serve React's index.html for frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});


module.exports=app 