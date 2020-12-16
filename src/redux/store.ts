import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReduce from "./rootReduce";

const store = createStore(rootReduce, compose(applyMiddleware(thunk)));

export default store;
