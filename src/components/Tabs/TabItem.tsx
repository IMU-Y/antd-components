import React, { useContext } from 'react';
import classNames from 'classnames';
import { TabsContext } from './Tabs';
export interface ITabItemProps {
  index?: number;
  disabled?: boolean;
  style?: React.CSSProperties;
  label: string;
  children?: React.ReactNode;
}
const TabItem: React.FC<ITabItemProps> = (props) => {
  const { index, disabled, style, label } = props;
  const context = useContext(TabsContext);
  const classes = classNames('tabs-item', {
    'is-disabled': disabled,
    'is-active': context.currentActive === index,
  });
  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'number')) {
      context.onSelect(index)
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>{label}</li>
  )
}

export default TabItem;
