import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { IMenuItemProps } from './MenuItem';
type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: number) => void
export interface IMenuProps {
  defaultIndex?: number;//默认高亮菜单项
  mode?: MenuMode;//菜单布局
  onSelect?: SelectCallback;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
interface IMenuContext {
  onSelect?: SelectCallback;
  currentActive: number;
  mode?: MenuMode;
}
export const MenuContext = createContext<IMenuContext>({ currentActive: 0 });

const Menu: React.FC<IMenuProps> = (props) => {
  const { defaultIndex, mode, children, style, className, onSelect } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('antd-menu', className, {
    [`menu-${mode}`]: mode,
  });
  const handleClick = (index: number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    currentActive: currentActive ? currentActive : 0,
    onSelect: handleClick,
    mode: mode,
  }
  const renderChildren = () => {
    // 判断子元素只能是MenuItem或者SubMenu
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>;
      const { name } = childElement.type;
      if (name === 'MenuItem' || name === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index,
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
  defaultIndex: 0,
  mode: 'horizontal',
}
export default Menu;
