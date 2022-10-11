import Api from '@/services/Api'

//เมธอด register login
export default{ 
    register (credentials) {
        return Api().post('register', credentials)
    },
    login (credentials) {
        return Api().post('login',credentials)
    }
}