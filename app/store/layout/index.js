export const state = () => ({
  feedbackModalState: false,
  thanksModalState: false,
  storiesModalState: false,
  scheduleViewModalState: false
})

export const mutations = {
  SET_FEEDBACK_MODAL_STATE (state, data) {
    state.feedbackModalState = data
  },
  SET_THANKS_MODAL_STATE (state, data) {
    state.thanksModalState = data
  },
  SET_STORIES_MODAL_STATE (state, data) {
    state.storiesModalState = data
  },
  SET_SCHEDULE_MODAL_STATE (state, data) {
    state.scheduleViewModalState = data
  }
}
