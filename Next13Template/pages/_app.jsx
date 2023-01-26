import { store } from '../src/store/configureStore';
import Layout from '../src/Container/Layout/Layout';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.min.css';
import '/public/assets/styles/globals.scss';
import '/public/assets/styles/utils.scss';
import '/public/assets/styles/font.scss';

function App({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default App;
