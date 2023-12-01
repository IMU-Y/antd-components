/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { createContext, useEffect, useState } from 'react';
import classnames from "classnames";
export type TabType = 'line' | 'card';
type SelectCallback = (selectedIndex: number) => void;

export interface ITabsProps {
  /**当前激活 tab 面板的 index，默认为0 */
  defaultIndex: number;
  /**可以扩展的 className */
  className?: string;
  /**点击 Tab 触发的回调函数 */
  onSelect?: (selectedIndex: number) => void;
  /**Tabs的样式，两种可选，默认为 line */
  // type?: TabType;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
interface ITabsContext {
  currentActive: number;
  onSelect?: SelectCallback;
  type?: TabType;
}
export const TabsContext = createContext<ITabsContext>({ currentActive: 0 });

const Tabs: React.FC<ITabsProps> = (props) => {
  const { defaultIndex, className, onSelect, style, children } = props;
  const [currentActive, setCurrentActive] = useState<number>(defaultIndex);
  const classNames = classnames('antd-tabs-nav', className);
  const handleClick = (index: number) => {
    setCurrentActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  useEffect(() => {
    if (defaultIndex >= 0) {
      setCurrentActive(defaultIndex);
    }
  }, [defaultIndex]);

  const passedContext: ITabsContext = {
    currentActive: currentActive ? currentActive : 0,
    onSelect: handleClick,
  }

  const renderChildren = () => {
    // 判断子元素只能是MenuItem或者SubMenu
    return React.Children.map(children, (child, index) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const childElement = child as any;
      const { name } = childElement.type;
      if (name === 'TabItem') {
        return React.cloneElement(childElement, {
          index: index,
        })
      } else {
        console.error("Warning: Tabs has a child which is not a TabItem component")
      }
    })
  }

  return (
    <div className='antd-tabs' style={style}>
      <ul className={classNames}>
        <TabsContext.Provider value={passedContext}>
          {renderChildren()}
        </TabsContext.Provider>
      </ul>
      <div className='antd-tab-panel'>
        {/* @ts-ignore */}
        {children?.find((v: React.ReactNode, index: number) => {
          return index === currentActive
        })?.props?.children}
      </div>
    </div>
  )
}

export default Tabs;
