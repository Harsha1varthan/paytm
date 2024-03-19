import { Link, useNavigate } from "react-router-dom"
import {signupError, signinError, username} from "./atom"
import axios from "axios"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRecoilValue, useSetRecoilState , useRecoilState} from "recoil"
export default function Signin(){
    const Errorsignup = useRecoilValue(signupError)

    const [user, setuser] = useRecoilState(username)

    const navigate = useNavigate()

    const [Errorsignin, setErrorsignin]  = useRecoilState(signinError)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Inavlid email').required('Required'),
            password: Yup.string().min(6, 'Must be six characters long').required('Required')
        }),
        onSubmit: values => {
            setuser(values.email)
            console.log(user)
            axios.post('http://localhost:4000/api/v1/user/signin', {
                
                    userName: values.email,
                    password: values.password
                
             }).then((res) => {
                localStorage.setItem('token', res.data.token)
                 navigate("/dashboard")
            }).catch((err) => {
                console.log(err)
                setErrorsignin(err.response.data.msg)
            })
        }
    })

    return(
        <div className="w-full bg-slate-300 min-h-screen grid justify-center items-center">
            {Errorsignup !=='' ? (<div className="flex justify-self-center text-red-700 font-bold">{Errorsignup}</div>) : (<div></div>)}
            <div className="w-4/5 bg-white text-center p-8 md:w-420">
                <h1 className="text-2xl font-black">Sign In</h1>
                <p>Enter your credentials to access your account</p>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid text-left">
                        <label className="font-semibold">Email</label>
                        <input type="text" className="p-2 border-2 border-gray-400 font-semibold rounded-e-2xl rounded-s-2xl" name = "email" id = "email" onChange = {formik.handleChange}></input>
                        {formik.touched.email && formik.errors.email ? (<div className="text-red-700 text-xl font-bold"> {formik.errors.email}</div>) : null}
                    </div>
                    <div className="grid text-left">
                        <label className="font-semibold">Password</label>
                        <input type="text" className="p-2 border-2 border-gray-400 font-semibold  rounded-e-2xl rounded-s-2xl" name = "password" id = "password" onChange={formik.handleChange} ></input>
                        {formik.touched.password && formik.errors.password ? (<div className="text-red-700 text-xl font-bold"> {formik.errors.password}</div>) : null}
                    </div>
                    <button type = "submit" className = "mt-2 p-4 bg-gray-800 border-4 border-gray-50 text-white text-lg rounded-full font-semibold">Sign In</button>
                    <div>
                        <Link to = "/signup">Don't have an account? <span className = "font-semibold underline decoration-1 underline-offset-4">Signup</span></Link>
                    </div>
                </form>
                
            </div>
            <div className="flex text-red-800 text-xl font-semibold p-3 place-self-center bg-red-200">
                    {Errorsignin} 
            </div>
            
        </div>
    )
}