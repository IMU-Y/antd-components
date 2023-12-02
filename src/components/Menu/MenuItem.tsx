import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';
export interface IMenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode
}
const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.currentActive === index,
  });
  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index);
    }
  }
  return (
    <li style={style} className={classes} onClick={handleClick}>
      {children}
    </li>
  )
}

export default MenuItem;
