export function updateForm(state, payload) {
  for (let key in payload) {
    state[key] = payload[key];
  }
}
