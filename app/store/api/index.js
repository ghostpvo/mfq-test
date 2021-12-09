export const state = () => ({})

export const actions = {
  async sendForm (context, data) {
    try {
      await this.$http.post('/api/site/v1/application/create', data)
      context.commit('layout/SET_THANKS_MODAL_STATE', true, { root: true })
    } catch (e) {
      // console.error(e)
    }
  }
}

export const mutations = {}

export const getters = {}
