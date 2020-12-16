import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// import Hello from "./components/demo/Hello";
// import HelloClass from "./components/demo/HelloClass";
// import HelloHoc from "./components/demo/HelloHoc";
// import HelloHooks from "./components/demo/HelloHooks";
// import App from "./components/App";
import Root from "./routers";
import store from "./redux/store";

ReactDOM.render(
  //   <HelloHoc name="TypeScript" loading={false} />,
  //   <HelloHooks name="TypeScript" />,
  <Provider store={store}>
    <Root />
  </Provider>,
  document.querySelectorAll(".app")[0]
);
