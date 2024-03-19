
import { useFormik } from "formik"
import axios from "axios"
import { useRecoilState } from "recoil"
import { username } from "./atom"
import {signupError} from "./atom"
import { Link, useNavigate } from "react-router-dom"
import * as Yup  from "yup"

export default function Signup(){

    const navigate = useNavigate()

    const [user, setuser] = useRecoilState(username)

    const [error, setError] = useRecoilState(signupError)

    const formik = useFormik({
        initialValues: {
        email: '',
        firstname: '',
        lastname: '',
        password: ''
    },
    validationSchema: Yup.object({
        email: Yup.string().email('Invalid Email Address').required(),
        firstname: Yup.string().min(4, 'Must be 4 characters long').required('Required'),
        password: Yup.string().min(6, 'Must be atleast 6 characters long').required('Required')
    }),
    onSubmit: values => {
        setuser(values.email) 
        axios.post("http://localhost:4000/api/v1/user/signup", {
            userName: values.email,
            firstName: values.firstname,
            lastName: values.lastname,
            password: values.password
        }).then((res)=>{
            navigate('/dashboard')
            
        }).catch((err)=>{
            setError(err.response.data.msg)
            navigate('/signin') 
            
        })
    }

    })
    return(
        <div className="w-full bg-slate-300 min-h-screen flex justify-center items-center">
            <div className = "w-4/5 bg-white grid text-center p-8 md:w-500">
                <h1 className="text-2xl font-extrabold">Sign Up</h1>
                <p>Enter your Information to create your account</p>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid text-left mb-3">
                        <label className="font-semibold">Email</label>
                        <input type="text" className="p-2 border-2 border-gray-400 font-semibold  rounded-e-2xl rounded-s-2xl" placeholder = "eg..amy@gmail.com" id = "email" name="email" onChange={formik.handleChange} />
                        {formik.touched.email && formik.errors.email ? (<div className="text-red-700 text-xl font-bold"> {formik.errors.email}</div>) : null}
                    </div>
                    <div className = "grid text-left mb-3">
                        <label className="font-semibold">First Name</label>
                        <input type = "text" className="p-2 border-2 border-gray-400  font-semibold   rounded-e-2xl rounded-s-2xl" placeholder="John" id = "firstname" name = "firstname" onChange={formik.handleChange}/>
                        {formik.touched.firstname && formik.errors.firstname ? (<div className="text-red-700 text-xl font-bold"> {formik.errors.firstname}</div>) : null}
                    </div>
                    <div className = "grid text-left mb-3">
                        <label className="font-semibold">Last Name</label>
                        <input type = "text" className="p-2 border-2 border-gray-400  font-semibold rounded-e-2xl rounded-s-2xl" placeholder="cena" id = "lastname" name = "lastname" onChange={formik.handleChange} />
                    </div>
                    <div className = "grid text-left mb-3">
                        <label className="font-semibold">Password</label>
                        <input type = "text" className="p-2 border-2 border-gray-400 font-semibold  rounded-e-2xl rounded-s-2xl" placeholder="....." name = "password" onChange = {formik.handleChange}/>
                        {formik.touched.password && formik.errors.password ? (<div className="text-red-700 text-xl font-bold"> {formik.errors.password} </div>) : null}
                    </div>
                    <button type= "submit" className = "mt-2 p-4 bg-gray-800 border-4 border-gray-50 text-white text-lg rounded-full font-semibold">
                        Sign Up
                    </button>
                    <div>
                        <Link to ="/signin">Already if you have account <span className = "font-semibold underline decoration-1 underline-offset-4"> Login </span></Link>
                    
                    </div>
                    
                </form>
            </div>
        </div>
    )
}