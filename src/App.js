import React from 'react'
import Myrouter from './router/index.js'
import './App.css'
import {store,persistor} from './redux/store.js'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
export default function App() {
  return (

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Myrouter></Myrouter>
        </PersistGate>
        
      </Provider>
  )
}
