import axios from "axios"
import buildClient from "../api/buildClient"

const HomePage = ({ userInfo, errorsDiv, errors }) => {
    return (<>
        <p>{JSON.stringify(userInfo)}</p>
        {JSON.stringify(errors)}
        {errors ? (

            <div className="alert alert-danger">
                <h4>Oooops..</h4>
                <ul className="my-0">
                    {errors?.map(err => (
                        <li key={err.message}>{err.message}</li>
                    ))}
                </ul>
            </div>
        ) : null}
    </>
    )
}
export default HomePage