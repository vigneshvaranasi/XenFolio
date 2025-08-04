import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { UserContextProvider } from './store/UserStore/UserContext.tsx'
import { CraftBenchProvider } from './store/CraftBenchStore/CraftBenchContext.tsx'
createRoot(document.getElementById('root')!).render(
  <UserContextProvider>
    <CraftBenchProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CraftBenchProvider>
  </UserContextProvider>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals