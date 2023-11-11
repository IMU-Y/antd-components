import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { IMenuItemProps } from './MenuItem';
type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void
export interface IMenuProps {
  defaultIndex?: string;//默认高亮菜单项
  mode?: MenuMode;//菜单布局
  onSelect?: SelectCallback;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
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
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>;
      const { name } = childElement.type;
      if (name === 'MenuItem' || name === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString(),
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
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
