// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './styles/index.scss';
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

// 打包组件发布
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
export { default as Alert } from './components/Alert'
export { default as Button } from './components/Button'
export { default as Tabs } from './components/Tabs'
export { default as Menu } from './components/Menu'
export { default as MenuItem } from './components/Menu/MenuItem'
export { default as SubMenu } from './components/Menu/SubMenu'
export { default as InputSelect } from './components/InputSelect'
export { default as Icon } from './components/Icon'
export { default as Input } from './components/Input'
export { default as Progress } from './components/Progress'
export { default as Transition } from './components/Transition'
