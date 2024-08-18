import { ToastContainer } from "react-toastify";
import { Routes } from "../src/components/routes/Routes";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { ToastProvider } from "components/ui/react-toast/ReactToast";
import { Provider } from "react-redux";
import { store } from "store";

function App() {
  return (
    <ToastProvider>
      <Provider store={store}>
        <div className="App">
          <ToastContainer />
          <Routes />
        </div>
      </Provider>
    </ToastProvider>
  );
}

export default App;
