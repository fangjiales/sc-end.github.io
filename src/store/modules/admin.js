import { batchDelete, getById, getUserInfo, saveUser, updateUser } from '@/api/admin'

const state = {
  userInfo: {}
}

const actions = {
  getUserInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      getUserInfo(params).then(res => {
        const { data } = res
        commit('SET_USER_INFO', data)
        resolve(res)
      }).catch(reason => {
        reject(reason)
      })
    })
  },
  saveUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      saveUser(user).then(res => {
        resolve(res)
      }).catch(reason => {
        reject(reason)
      })
    })
  },
  getById({ commit }, id) {
    return new Promise((resolve, reject) => {
      getById(id).then(res => {
        resolve(res)
      }).catch(reason => {
        reject(reason)
      })
    })
  },
  updateUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      updateUser(user).then(res => {
        resolve(res)
      }).catch(reason => {
        reject(reason)
      })
    })
  },
  batchDelete({ commm }, ids) {
    return new Promise((resolve, reject) => {
      batchDelete(ids).then(res => {
        resolve(res)
      }).catch(reason => {
        reject(reason)
      })
    })
  }
}

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}