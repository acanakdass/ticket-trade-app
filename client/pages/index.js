import axios from "axios"
import buildClient from "../api/buildClient"

const HomePage = ({ userInfo, errorsDiv }) => {
    return (<>
        <h3>Hello World Next JS</h3>
        <p>{JSON.stringify(userInfo)}</p>
        {userInfo ? <h1>You are logged in</h1> : <h2>You are not logged in!</h2>}
        {errorsDiv}
    </>
    )
}
HomePage.getInitialProps = async (context) => {
    try {
        const axiosClient = buildClient(context);
        const { data } = await axiosClient.get('/api/users/current-user')
        return { userInfo: data };
    } catch (error) {
        const errorsDivv = (
            <div className="alert alert-danger">
                <h4>Oooops..</h4>
                <ul className="my-0">
                    {error.response?.data?.errors?.map(err => (
                        <li key={err.message}>{err.message}</li>
                    ))}
                </ul>

            </div>
        )
        return { errorsDivv }
    }
}
export default HomePage