const { default: axios } = require("axios")
const { useState } = require("react")

export default ({ url, method, body, onSuccess }) => {
    const [errorsDiv, setErrorsDiv] = useState(null)
    const doRequest = async () => {
        setErrorsDiv(null)
        try {
            const response = await axios[method](
                url,
                body,
                { withCredentials: true }
            );
            if (onSuccess) {
                onSuccess()
            }
            return response.data;
        } catch (error) {
            // console.log(JSON.stringify(error?.response?.data))
            setErrorsDiv(
                <div className="alert alert-danger">
                    <h4>Oooops..</h4>
                    <ul className="my-0">
                        {error?.response?.data?.errors.map(err => (
                            <li key={err.message}>{err.message}</li>
                        ))}
                    </ul>

                </div>
            )
        }
    }
    return { doRequest, errorsDiv }
} 