import axios from "axios"
import { GET_ERRORS } from "./types"
import Qs from "query-string"

export const createProject = (project, history) => async dispatch => {
    try {
        const roleParameter = {
            roleId: "R70"
        };
        const res = await axios.post("http://localhost:8085/sangbango-microservices/payment/v1/registration?" +
                Qs.stringify(roleParameter), project)
            // history.push("/login-page")
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}