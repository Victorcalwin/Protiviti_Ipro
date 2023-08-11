var localStorage = window.localStorage
class AuthDetails {
    getRoles() {
        var loginDetails = JSON.parse(localStorage.getItem('userData'))
        if (loginDetails) {
            return loginDetails.role_id
        } else {
            return null;
        }
    }
    getUserId () {
        var loginDetails = JSON.parse(localStorage.getItem('userData'))
        if (loginDetails) {
            return loginDetails.id
        } else {
            return null;
        }
    }
    getUserName () {
        var loginDetails = JSON.parse(localStorage.getItem('userData'))
        if (loginDetails) {
            return loginDetails.first_name+ " "+ loginDetails.last_name
        } else {
            return null;
        }
    }
    getUserPayload(){
        var loginDetails = JSON.parse(localStorage.getItem('userData'))
        if (loginDetails) {
            return loginDetails
        } else {
            return null;
        }
    }
}
export default new AuthDetails