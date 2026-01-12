import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './app/App'
import '../src/shared/styles/styles.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { store } from './entities/product/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} future={{
         v7_startTransition: true,
         v7_relativeSplatPath: true,
       }}>
      <App />
    </Provider>
  </StrictMode>,
)