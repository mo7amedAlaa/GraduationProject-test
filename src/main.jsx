import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import './i18n';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
