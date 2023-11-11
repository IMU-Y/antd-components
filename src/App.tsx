import Button, { ButtonType, ButtonSize } from './components/Button';
import Menu from './components/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';
function App() {
  return (
    <>
      <Menu defaultIndex={0} onSelect={(index) => { alert(index) }}>
        <MenuItem>MenuItem0</MenuItem>
        <MenuItem>MenuItem1</MenuItem>
        <SubMenu title='dropdown'>
          <MenuItem>SubItem1</MenuItem>
          <MenuItem>SubItem2</MenuItem>
          <MenuItem>SubItem3</MenuItem>
        </SubMenu>
        <MenuItem>MenuItem3</MenuItem>
      </Menu>
      <Menu defaultIndex={0} onSelect={(index) => { alert(index) }} mode='vertical'>
        <MenuItem>MenuItem0</MenuItem>
        <MenuItem>MenuItem1</MenuItem>
        <MenuItem>MenuItem2</MenuItem>
        <MenuItem>MenuItem3</MenuItem>
        <SubMenu title='dropdown'>
          <MenuItem>SubItem1</MenuItem>
          <MenuItem>SubItem2</MenuItem>
          <MenuItem>SubItem3</MenuItem>
        </SubMenu>
      </Menu>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>hello world</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Small}>hello</Button>
      <Button btnType={ButtonType.Danger} disabled>禁用</Button>
      <Button btnType={ButtonType.Link} href={'https://www.baidu.com/'}>百度</Button>
    </>
  )
}

export default App
