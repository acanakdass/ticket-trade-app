const { default: axios } = require("axios")
const { useState } = require("react")

export default ({ url, method, body }) => {
    const [errorsDiv, setErrorsDiv] = useState(null)
    const doRequest = async () => {
        try {
            const response = await axios[method](url, body);
            return response.data;
        } catch (error) {
            console.log(error.response.data)
            setErrorsDiv(
                <div className="alert alert-danger">
                    <h4>Oooops..</h4>
                    <ul className="my-0">
                        {error.response.data.errors.map(err => (
                            <li key={err.message}>{err.message}</li>
                        ))}
                    </ul>

                </div>
            )
        }
    }
    return { doRequest, errorsDiv }
}