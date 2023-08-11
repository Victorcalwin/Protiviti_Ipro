import axios from 'axios';
import env from '../ENV';
class ApiCall {

  tokenSet = () => {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem("token"),
    }
  }
  login = async (input) => {
    const res = await axios({
      method: 'post',
      url: `${env.API_END_POINT}UsersLogin`,
      data: input,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return res.data
  }

  statusAudit = async (input) => {
    const res = await axios({
      method: 'post',
      url: `${env.API_END_POINT}AuditStatusReport/Status_Audit`,
      data: input,
      headers: this.tokenSet()
    })
    return res.data
  }

  getStatusAuditAll = async (input) => {
    const res = await axios({
      method: 'post',
      url: `${env.API_END_POINT}AuditStatusReport/Get_AllAudit`,
      data: input,
      headers: this.tokenSet()
    })
    return res.data
  }
  getRequiredActionData = async (input) => {
    const res = await axios({
      method: 'post',
      url: `${env.API_END_POINT}UsersLogin/get-required-actions`,
      data: input,
      headers: this.tokenSet()
    })
    return res.data
  }
  updateNotificationStatus = async (input) => {
    const res = await axios({
      method: 'post',
      url: `${env.API_END_POINT}UsersLogin/update-notification-status`,
      data: input,
      headers: this.tokenSet()
    })
    return res.data
  }

}

export default new ApiCall()