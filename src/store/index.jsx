import { createStore, applyMiddleware, compose } from "redux";
import * as thunk from "redux-thunk";

// import thunk from "redux-thunk"; // Tidak perlu destructuring {}
import reducer from "./reducer/index";

const store = createStore(reducer, compose(applyMiddleware(thunk)));

export default store; // Ekspor store sebagai instance
