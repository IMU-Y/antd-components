import Button, { ButtonType, ButtonSize } from './components/Button';
function App() {
  return (
    <>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>hello world</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Small}>hello</Button>
      <Button btnType={ButtonType.Danger} disabled>禁用</Button>
      <Button btnType={ButtonType.Link} href={'https://www.baidu.com/'}>百度</Button>
    </>
  )
}

export default App
