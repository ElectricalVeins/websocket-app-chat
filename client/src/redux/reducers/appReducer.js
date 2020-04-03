import ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  isMenuOpen: false,
};

function appReducer( state, action ) {
  switch ( action.type ) {
    case ACTION_TYPES.TOGGLE_MENU_ACTION:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };

    case ACTION_TYPES.CLOSE_MENU_ACTION:
      return {
        ...state,
        isMenuOpen: false,
      };

    default:
      return { ...state }
  }
}

export default appReducer