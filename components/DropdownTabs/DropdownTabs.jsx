import React from 'react';
import classNames from 'classnames';
import styles from '../FilterForm/FilterForm.module.scss';

function DropdownTabs({ data, activeTabIndex, handleTabClick }) {
  return (
    <div className={styles.tabs}>
      {data.map((tab, index) => (
        <div
          key={index}
          className={classNames(styles.tab, { [styles.active_tab]: activeTabIndex === index })}
          onClick={() => handleTabClick(index)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}

export default DropdownTabs;