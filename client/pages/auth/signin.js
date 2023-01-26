import { useState } from "react"
import useRequest from "../../hooks/useRequest"
import Router from 'next/router'
const signin = () => {

    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const { doRequest, errorsDiv } = useRequest({
        url: 'http://localhost/api/users/signin',
        method: 'post',
        body: { password, username },
        onSuccess: () => Router.push('/')
    })
    const onSubmit = async (event) => {
        event.preventDefault();
        var response = await doRequest();
        console.log(response)
    }
    return (
        <form className="container my-5" onSubmit={onSubmit} >
            <h1>Sign In</h1>

            <div className="form-group">
                <label>Username</label>
                <input onChange={e => setUsername(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
            </div>
            <div className="d-grid mt-3 gap-2">
                <button type="submit" className="btn btn-primary">Sign In</button>
            </div>
            {errorsDiv}
        </form>
    )
}
export default signin