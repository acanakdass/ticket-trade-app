import { useEffect } from "react"
import useRequest from "../../hooks/useRequest"
import Router from 'next/router'

export default () => {
    const { doRequest, errorsDiv } = useRequest({
        url: 'http://localhost/api/users/signout',
        method: 'post',
        onSuccess: () => {
            Router.push('/')
        }
    })
    useEffect( () => {
        doRequest()
    }, [])

}