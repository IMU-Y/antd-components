import React, { createContext, useState } from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void
export interface IMenuProps {
  /**
    * 默认 active 的菜单项的高亮索引值
  */
  defaultIndex?: string;
  /**
   * 菜单显示类型 横向或者纵向
   */
  mode?: MenuMode;
  /**
   * 点击菜单项触发的回调函数
   */
  onSelect?: SelectCallback;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /**
    * 设置子菜单的默认打开 只在纵向模式下生效
  */
  defaultOpenMenus?: string[];
}
interface IMenuContext {
  onSelect?: SelectCallback;
  currentActive: string;//当前高亮菜单项
  mode?: MenuMode;
  defaultOpenMenus?: string[];
}
export const MenuContext = createContext<IMenuContext>({ currentActive: '0' });

const Menu: React.FC<IMenuProps> = (props) => {
  const { defaultIndex, mode, children, style, className, onSelect, defaultOpenMenus } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('antd-menu', className, {
    [`menu-${mode}`]: mode,
  });
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    currentActive: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenMenus,
  }
  const renderChildren = () => {
    // 判断子元素只能是MenuItem或者SubMenu
    return React.Children.map(children, (child, index) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const childElement = child as any;
      const { name } = childElement.type;
      console.log(name, '1');
      // if (name === 'MenuItem' || name === 'SubMenu') {
      return React.cloneElement(childElement, {
        index: index.toString(),
      })
      // } else {
      //   console.error("Warning: Menu has a child which is not a MenuItem component")
      // }
    })
  }
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenMenus: [],
}
export default Menu;
