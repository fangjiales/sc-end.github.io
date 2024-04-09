import { getLabelList, saveLabel, updateLabel, removeLabel, getById } from '@/api/label'

const state = {
}

const mutations = {

}

const actions = {
  getLabelList({ commit }, params) {
    return new Promise((resolve, reject) => {
      getLabelList(params).then(res => {
        resolve(res)
      }).catch(resaon => {
        reject(resaon)
      })
    })
  },
  saveLabel({ commit }, label) {
    return new Promise((resolve, reject) => {
      saveLabel(label).then(res => {
        resolve(res)
      }).catch(resaon => {
        reject(resaon)
      })
    })
  },
  updateLabel({ commit }, label) {
    return new Promise((resolve, reject) => {
      updateLabel(label).then(res => {
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
  removeLabel({ commit }, id) {
    return new Promise((resolve, reject) => {
      removeLabel(id).then(res => {
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
