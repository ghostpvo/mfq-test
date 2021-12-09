export const state = () => ({
  menuType: null
})

export const mutations = {
  SET_MENU_TYPE (state, value) {
    state.menuType = value
  }
}
