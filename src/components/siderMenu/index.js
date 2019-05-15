import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './siderMenu';
import { getFlatMenuKeys } from './siderMenuUtils';

const SiderMenuWrapper = React.memo(props => {
    const { isMobile, collapsed, onCollapsed, menuData } = props;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    return isMobile ? (
        <Drawer
          placement='left'
          closable={false}
          onClose={() => onCollapsed(true)}
          visible={!collapsed}
          style={{
                padding: 0,
                height: '100vh'
          }}
        >
            <SiderMenu {...props} flatMenuKeys={flatMenuKeys} collapsed={ isMobile ? false : collapsed } />
        </Drawer>
    ) : (
        <SiderMenu {...props} flatMenuKeys={flatMenuKeys} />
    )
})

export default SiderMenuWrapper;
