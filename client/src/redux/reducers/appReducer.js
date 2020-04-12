import ACTION_TYPES from "../actions/actionTypes";

const initialState = {
  isMenuOpen: false,
  isUserMenuOpen: false,
};

function appReducer( state = initialState, action ) {
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

    case ACTION_TYPES.TOGGLE_USER_MENU_ACTION:
      return {
        ...state,
        isUserMenuOpen: !state.isUserMenuOpen,
      };

    case ACTION_TYPES.CLOSE_USER_MENU_ACTION:
      return {
        ...state,
        isUserMenuOpen: false,
      };

    default:
      return { ...state }
  }
}

export default appReducer