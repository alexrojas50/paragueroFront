import { SessionStorage } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const currentPath = ref({
    value: '',
    buttonString: 'Registrarse',
    nextRoute: 'register',
    changePath(path) {
        switch (path) {
            case '':
            case 'login':
                this.buttonString = 'Registrarse'
                this.nextRoute = { name: 'Register' }
                break;
            case 'register':
            case 'client':
            default:
                this.buttonString = 'Cerrar Sesión'
                this.nextRoute = { name: 'Login' }
                break;
        }
    }

})

export const authUser = ref({
    isAuth: false,
    userLevel: 0,
    async verifyToken() {
        const token = SessionStorage.getItem("Authorization")
        if (token) api.defaults.headers.common["Authorization"] = token;
        const verify = await api.get('/users/verifyToken').then(e => {
            return e
        }).catch((e) => {
            return { data: false }
        })
        this.isAuth = verify.data.status
        this.userLevel = verify.data.user ? verify.data.user.level : 0
        return verify.data.status
    },
    async verifyAdminRoute(next) {
        if (this.userLevel == 1) next()
        return { name: 'Login' }
    }
})