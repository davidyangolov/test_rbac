import httpClient from "./http.service"
import router from "@/router"

const authService = {
    currentUser: null,
    isValidAuthKey: true,
    isLoggedIn() {
        return !!localStorage.getItem('auth_key')
    },
    getToken() {
        return localStorage.getItem('auth_key')
    },
    routerPush(name) {
        return router.push({name})
    },
    async login(formData) {
        try {
            const {status, data} = await httpClient.post('site/login', formData)
            if (status === 200) {
                localStorage.setItem('auth_key', data.user.access_token)
                let role = Object.keys(data.roles)[0]
                localStorage.setItem('role', role)
                // this.setupUserData(data)

                return {success: true}
            }
        } catch (e) {
            return {
                success: false,
                errors: e?.response?.data?.errors || {}
            }
        }
        return {success: false, errors: {}}
    },
    async logout() {
        localStorage.clear()
        await router.push({name: 'login'})
    },
    // async getUserData() {
    //     const auth_key = localStorage.getItem('auth_key')
    //     if (!this.currentUser && auth_key) {
    //         try {
    //             const {status, data} = await httpClient.get(`user/get-user-by-auth-key?auth_key=${auth_key}`)
    //             if (status === 200) {
    //                 this.setupUserData(data)
    //                 return
    //             }
    //         } catch (e) {
    //             this.isValidAuthKey = false
    //             return e
    //         }
    //     }
    //     this.isValidAuthKey = false
    // },
    // setupUserData(data) {
    //     this.isValidAuthKey = true
    //
    //     this.currentUser = {
    //         username: data.user.username,
    //         firstname: data.user.firstname,
    //         lastname: data.user.lastname,
    //         email: data.user.email,
    //         roles: Object.keys(data.roles)
    //     }
    // }

}

export default authService