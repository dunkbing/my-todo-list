import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function SidebarItem({ label, items, depthStep = 10, depth = 0, ...rest }: {label: string, items: string[], depthStep: number, depth: number}) {
  return (
    <>
      <ListItem button dense {...rest}>
        <ListItemText style={{ paddingLeft: depth * depthStep }}>
          <span>{label}</span>
        </ListItemText>
      </ListItem>
      {Array.isArray(items) ? (
        <List disablePadding dense>
          {items.map((subItem: any) => (
            <SidebarItem
              key={subItem.name}
              depth={depth + 1}
              depthStep={depthStep}
              {...subItem}
            />
          ))}
        </List>
      ) : null}
    </>
  )
}

function SideBar({ items, depthStep, depth }: any) {
  return (
    <div className="sidebar">
      <List disablePadding dense>
        {items.map((sidebarItem: any, index: number) => (
          <SidebarItem
            key={`${sidebarItem.name}${index}`}
            depthStep={depthStep}
            depth={depth}
            {...sidebarItem}
          />
        ))}
      </List>
    </div>
  )
}

export default SideBar;