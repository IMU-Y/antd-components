import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './index';
import Icon from '../Icon';
export interface ISubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}
const SubMenu: React.FC<ISubMenuProps> = ({ index, title, className, children }) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenMenus as Array<string>;
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
  const [menuOpen, setMenuOpen] = useState<boolean>(isOpened);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.currentActive === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode,
  });

  // 负责渲染子元素
  const renderChildren = () => {
    const className = classNames('antd-submenu', {
      'menu-opened': menuOpen,
    });
    // 遍历所有children元素
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<ISubMenuProps>;
      const { name } = childElement.type;
      // 判断SubMenu中只能有MenuItem
      if (name === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
      } else {
        console.error("Warning: SubMenu has a child which is not a MenuItem component")
      }
    });
    return <ul className={className}>{childrenComponent}</ul>
  };
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  }
  let timer: number;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}
  return (
    <li className={classes} key={index} {...hoverEvents}>
      <div className="submenu-title" onClick={handleClick} {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {/* 下拉菜单里面的内容 */}
      {renderChildren()}
    </li>
  );
};
export default SubMenu;
