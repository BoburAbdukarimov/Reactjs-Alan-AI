import Cart from "./components/Cart"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Rasm from "./components/Rasm";
function App() {

  return (
    <div className="app">
          <ToastContainer />
          <Cart/>
          <Rasm />
          
    </div>
  );
}

export default App;
