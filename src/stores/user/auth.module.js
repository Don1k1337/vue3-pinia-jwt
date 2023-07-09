import { defineStore } from 'pinia'
import { firebaseConfig } from '@/config/firebaseConfig'
import axiosInstance from '@/axios/axiosInstance'

export const useAuthStore = defineStore('auth', () => {
  const signUp = async (payload) => {
    try {
      const url = `:signUp?key=${firebaseConfig.apiKey}`
      let response = await axiosInstance.post(url, {
        ...payload,
        returnSecureToken: true
      })
      console.log(response)
    } catch (e) {
      console.error('Error caused during user sign up action: ', e.response)
    }
  }

  return { signUp }
})
