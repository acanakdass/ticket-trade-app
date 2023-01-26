import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/buildClient'
// import '../styles.css'

const App = ({ Component, pageProps }) => {
    return (
        <div>
            <h3>Header</h3>
            <Component {...pageProps} />
        </div>
    )
}
App.getInitialProps = async (appContext) => {
    try {
        const axiosClient = buildClient({ req: appContext.ctx.req })
        const { data } = await axiosClient.get('/api/users/current-user')
        console.log(data)
        return {};
    } catch (error) {
        console.log("error.message")
        console.log(error.message)
        return {};

    }
}
export default App;
