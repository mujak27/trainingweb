import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClientProvider } from './context/ApolloClientProvider';
import { ContextProvider } from './context/ContextProvider';
import { Home } from './pages/Home';

function App() {
  return (
    <Router>
      <ApolloClientProvider>
        <ContextProvider>
          {/* <Routes>
            <Route path='/:url' element={(<Home />)} />
          </Routes> */}
          <Home />
        </ContextProvider>
      </ApolloClientProvider>
    </Router>
  )
}

export default App;
