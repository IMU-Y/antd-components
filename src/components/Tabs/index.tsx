import React from 'react';
import Tabs, { ITabsProps } from './Tabs';
import TabsItem, { ITabItemProps } from './TabItem';

export type ITabsComponent = React.FC<ITabsProps> & {
  TabItem: React.FC<ITabItemProps>,
}

const TransTabs = Tabs as ITabsComponent;
TransTabs.TabItem = TabsItem;

export default TransTabs;
