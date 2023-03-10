import { useState } from "react"
import useRequest from "../../hooks/useRequest"
import Router from 'next/router'
const signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const { doRequest, errorsDiv } = useRequest({
        url: 'http://localhost/api/users/signup',
        method: 'post',
        body: { email, password, username },
        onSuccess: ()=>Router.push('/')
    })
    const onSubmit = async (event) => {
        event.preventDefault();
        var response = await doRequest();
        console.log(response)        
    }
    return (
        <form className="container my-5" onSubmit={onSubmit} >
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input onChange={e => setEmail(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <label>Username</label>
                <input onChange={e => setUsername(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
            </div>
            <div className="d-grid mt-3 gap-2">
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
            {errorsDiv}
        </form>
    )
}
export default signup