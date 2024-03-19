import { username, balance, others, toUser, friend, ToEmail} from "./atom"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { useMemo, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

export default function Dashboard(){
    console.log("dashboard")

    const user = useRecoilValue(username)

    const [other, setother] = useRecoilState(others)

    const [To, setTo] = useRecoilState(toUser)

    const [amount, setamount] = useRecoilState(balance)

    const token = localStorage.getItem('token')

    const axiosObject = axios.create({
        baseURL: 'http://localhost:4000/api/v1/account/balance',
        headers: {
            'authorization': `Bearer ${token}`
        }
    })

    
   
     const firstletter = useMemo(function(){
        let first = user ? user.charAt(0) : "U"
        
        return first
    
    },[user])

    useEffect(()=>{
        
        axiosObject.get("http://localhost:4000/api/v1/account/balance").then((res)=>{
            setamount(res.data.balance.toFixed(2))
        }).catch((err)=>{
            console.log(err)
        })
    }, [user])

    function handleSubmit(e){
        setother(e.target.value)
        axiosObject.get(`http://localhost:4000/api/v1/user/bulk?filter=${other}`).then((res)=>{
            setTo(res.data.user)
        }).catch((err)=>{
            console.log(err);
        })
    }

    

    return(
        <div className="w-full bg-slate-50 min-h-screen">
            <header className="sm:w-full sm:flex sm:p-6 sm:justify-between sm:items-center sm:p-6 sm:h-14 sm:border-2 sm:border-b-gray-200">
                <div className="sm:w-1/4">
                    <p>Payments App</p>
                </div>
                <div className = "sm:flex">
                    <div className="sm:flex sm:flex-col sm:justify-center  sm:mr-4 ">
                        Hello
                    </div>
                    <div className="sm:rounded-full sm:h-12 sm:w-12 bg-slate-300 sm:flex sm:justify-center sm:mb-1 sm:mr-2">
                        <div className="sm:flex sm:h-full sm:flex-col sm:justify-center sm:font-bold text-3xl">
                            {firstletter}
                        </div>
                        
                    </div>
                </div>
            </header>
            <div className="flex p-4">
                <div className="font-bold">
                    Your Balance
                </div>
                <div className="font-bold ml-4">
                    {amount}
                </div>
            </div>
            <div className="p-4">
                <div className="font-bold ">
                    Users
                </div>
                <div>
                    <input placeholder="Search Users..." type="text" id = "user" name = "user" className="border-2 border-gray-400 p-2 w-4/5 rounded-2xl" onChange={(e)=> {handleSubmit(e)}}></input>

                </div>
                <div className="flex flex-col">
                    {To && 
                        To.map((user, index)=>(
                            <User user = {user.firstName} first = {user.firstName.charAt(0) } friendEmail = {user.userName} key = {index}/>
                        ))
                    }
                       
                </div>
            </div>
            
        </div>
    )
}

function User({user, first, friendEmail}) {

    const setFriend = useSetRecoilState(friend)

    const setEmail = useSetRecoilState(ToEmail)

    const navigate = useNavigate()

    function handleTransfer(){
        setFriend(user)
        setEmail(friendEmail)
        navigate("/send")
    }

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {first}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div className="font-semibold text-lg">
                    {user}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
           <button className="p-2 font-semibold text-sm rounded-lg bg-cyan-950 text-slate-50" onClick={handleTransfer}>Send Money</button>
        </div>
    </div>
}