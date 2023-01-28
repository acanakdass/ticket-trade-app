import axios from "axios"

export default ({ req }) => {
    let baseurl = ""
    // if (typeof window === 'undefined')
    //     baseurl = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local';
    // else
    baseurl = 'http://localhost';
    return axios.create({ baseURL: baseurl, headers: req?.headers, withCredentials: true })
}