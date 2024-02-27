import React from 'react';
import { Tabs } from 'antd';
const Tab = ({ items, defaultKey }) => <Tabs defaultActiveKey={defaultKey} items={items} />;
export default Tab;