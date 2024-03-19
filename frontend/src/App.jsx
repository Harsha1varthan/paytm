import {BrowserRouter, Routes, Route} from "react-router-dom"
import {RecoilRoot} from "recoil"
import Signup from "./Signup"
import Signin from "./Signin"
import Dashboard from "./Dashboard"
import SendMoney from "./SendMoney"
import Error from "./Error"
function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path = "/signup" element = {<Signup />}/>
          <Route path = "/signin" element = {<Signin />}/>
          <Route path = "/dashboard" element = {<Dashboard />}/>
          <Route path = "/send" element = {<SendMoney/>}/>
          <Route path = "/error" element = {<Error />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  
  )
}

export default App
