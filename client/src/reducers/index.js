export const initialState = {
  loginModalStatus: false,
  registerModalStatus: false,
  artistBookings: [],
  loading: false,
  currentError: ''

}


const reducer = function(state = initialState, action) {
  switch (action.type) {
    case 'OPENLOGINMODAL' :
      return Object.assign({},  state, {loginModalStatus:true});
    case 'CLOSELOGINMODAL' :
      return Object.assign({},  state, {loginModalStatus:false});
    case 'OPENREGISTERMODAL' :
      return Object.assign({},  state, {registerModalStatus:true});
    case 'CLOSEREGISTERMODAL' :
      return Object.assign({},  state, {registerModalStatus:false});
    case 'TOGGLE_LOADING' :
    return Object.assign({}, state, {loading: !state.loading});
    case 'SET_ARTIST_BOOKINGS' :
    return Object.assign({}, state, {artistBookings: action.payload});
    case 'ERROR' :
    return Object.assign({}, state, {currentError: action.payload});
    default :
      return state
  }
}

export default reducer;