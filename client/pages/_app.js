import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/buildClient'
import Navbar from '../components/navbar'

const App = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Navbar currentUser={currentUser} />
            <Component {...pageProps} />
        </div>
    )
}
App.getInitialProps = async (appContext) => {
    let pageProps = {};
    try {
        const axiosClient = buildClient({ req: appContext.ctx.req })
        const currUserRes = await axiosClient.get('/api/users/current-user')
        pageProps.userInfo = currUserRes.data
        return { pageProps, currentUser: currUserRes.data };
    } catch (error) {
        console.log(JSON.stringify(error))
        if (error.response)
            pageProps.errors = error.response?.data?.errors;
        return { pageProps }
    }
}
export default App;
