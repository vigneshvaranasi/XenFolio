import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { UserContextProvider } from './store/UserStore/UserContext.tsx'
import { CraftBenchProvider } from './store/CraftBenchStore/CraftBenchContext.tsx'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')!).render(
  <UserContextProvider>
    <CraftBenchProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position='top-center'
          toastOptions={{
            duration: 3000,
            style: {
              background: '#0D1117',
              color: '#E6EDF3',
              fontFamily: 'Inter, sans-serif'
            },
          }}
        />
      </BrowserRouter>
    </CraftBenchProvider>
  </UserContextProvider>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals