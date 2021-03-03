export const initialState = {
  user: null,
  active: false,
  color: "blue",
  usersList: []
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_ACTIVE: "SET_ACTIVE",
  SET_COLOR: "SET_COLOR",
  SET_USERS_LIST: "SET_USERS_LIST"
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload
      };
    case "SET_ACTIVE":
      return {
        ...state,
        active: action.payload
      };
    case "SET_COLOR":
      return {
        ...state,
        color: action.payload
      };
    case "SET_USERS_LIST":
        return {
          ...state,
          usersList: action.payload
        };

    default:
      return state;
  }
};

export default reducer;