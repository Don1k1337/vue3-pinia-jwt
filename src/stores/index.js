import {createPinia} from 'pinia'
import {useAuthStore} from '@/stores/user/auth.module'

const pinia = createPinia()

export const installAuthStore = () => {
    return useAuthStore(pinia)
}

export const authStore = installAuthStore()
