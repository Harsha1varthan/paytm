import { useRecoilValue, useSetRecoilState } from "recoil"
import { friend, amount,ToEmail } from "./atom"
import axios from "axios"
import { useEffect } from "react"

export default function SendMoney(){
    const Tofriend = useRecoilValue(friend)

    const toEmail = useRecoilValue(ToEmail)

    const token = localStorage.getItem("token")

    const setAmount = useSetRecoilState(amount)

    const Amount = useRecoilValue(amount)

    console.log(typeof Amount)
    console.log(typeof toEmail)

    const axiosInstance = axios.create({
        baseURL: "http://localhost:4000/api/v1/account/transfer",
        headers: {
            'authorization': `Bearer ${token}`
        }
    })

   
    function handlePayment(){
            axiosInstance.post("http://localhost:4000/api/v1/account/transfer", {
            amount: parseFloat(Amount),
            to    : toEmail
        }).then((res) => {
            if(res.data.message === "Transfer successfull"){
                
            }
        }).catch((err) =>{
            console.log(err)
        })
    }
   

    function handleChange(e){
        console.log(e.target.value);

        setAmount(e.target.value)
    }
    return(
        <div className=" w-full bg-slate-100 min-h-screen flex flex-col justify-center items-center">
            <div className="w-3/5 p-6 bg-white shadow-xl ">
                <div className="flex justify-center items-center mb-8">
                    <div className=" flex justify-center">
                        <p className="font-bold text-3xl">Send Money</p>
                    </div>
                </div>
                <div className="flex-col mb-8">
                    <div className="flex mb-4">
                        <div className="rounded-full h-12 w-12 bg-green-300 flex justify-center mt-1 mr-4">
                            <div className="flex flex-col justify-center h-full text-xl font-bold">
                                {Tofriend.charAt(0)}
                            </div>
                        </div>
                        <div className="flex items-center font-bold text-2xl">
                            {Tofriend}
                        </div>
                    </div>

                    <div className="flex-col">
                        <label className="block text-lg font-semibold">Amount in rs</label>
                        <input type = "number" className="w-3/4 p-1 bg-slate-50 border-solid border-2 border-slate-700 rounded-lg focus:outline-none font-semibold text-lg" placeholder="Amount" onChange = {(e) => handleChange(e)}></input>
                    </div>
                </div>
                <div className="flex">
                    <button className="w-3/4 bg-green-300 p-2 font-bold text-xl rounded-lg border-solid border-2 border-slate-700" onClick={handlePayment}>Send Money</button>

                </div>
            </div>
           
            
        </div>
    )
}