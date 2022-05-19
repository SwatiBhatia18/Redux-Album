function reducer(state = { data: "" }, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
}
export default reducer;

// import { createStore, applyMiddleware} from "redux";
// import rootReducer from "./reducers/index";
// import thunk from "redux-thunk";

// const store = createStore(rootReducer ,  applyMiddleware(thunk));

// export default store ;