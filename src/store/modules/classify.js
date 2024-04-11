import { getClassifyList, saveClassify, updateClassify, removeClassify, getById } from '@/api/classify'

const state = {
}

const mutations = {

}

const actions = {
  getClassifyList({ commit }, params) {
    return new Promise((resolve, reject) => {
      getClassifyList(params).then(res => {
        resolve(res)
      }).catch(resaon => {
        reject(resaon)
      })
    })
  },
  saveClassify({ commit }, classify) {
    return new Promise((resolve, reject) => {
      saveClassify(classify).then(res => {
        resolve(res)
      }).catch(resaon => {
        reject(resaon)
      })
    })
  },
  updateClassify({ commit }, classify) {
    return new Promise((resolve, reject) => {
      updateClassify(classify).then(res => {
        resolve(res)
      }).catch(resaon => {
        reject(resaon)
      })
    })
  },
  getById({ commit }, id) {
    return new Promise((resolve, reject) => {
      getById(id).then(res => {
        resolve(res)
      }).catch(resaon => {
        reject(resaon)
      })
    })
  },
  removeClassify({ commit }, id) {
    return new Promise((resolve, reject) => {
      removeClassify(id).then(res => {
        resolve(res)
      }).catch(resaon => {
        reject(resaon)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
