import { useState } from "react"
import useRequest from "../../hooks/useRequest"

const signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const { doRequest, errorsDiv } = useRequest({
        url: 'http://localhost/api/users/signup',
        method: 'post',
        body: { email, password, username }
    })
    const onSubmit = (event) => {
        event.preventDefault();
        doRequest()
        console.log(email, password, username)
    }

    return (
        <form onSubmit={onSubmit} >
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
            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-outline-primary">Sign Up</button>
            </div>
            {errorsDiv}
        </form>
    )
}
export default signup