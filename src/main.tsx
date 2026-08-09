import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import App from './App.tsx'
import {MantineProvider} from '@mantine/core'
import theme from './theme.ts'
import { Provider } from 'react-redux'
import { store } from './store'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
     <MantineProvider theme={theme}>
     <App />
    </MantineProvider>
    </Provider>
  </StrictMode>,
)
