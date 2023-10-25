import React from 'react';
import styles from '../FilterForm/FilterForm.module.scss';

function DropdownList({ data, activeTabIndex, checkboxStates, handleCheckboxChange, handleScroll  }) {
  return (
    <ul className={styles.list} onScroll={handleScroll}>
      {data[activeTabIndex].items.map((item, itemIndex) => (
        <li key={itemIndex} className={styles.item}>
          <label className={styles.item_label} htmlFor={`checkbox-${activeTabIndex}-${itemIndex}`}>
            <span className={styles.item_text}>{item}</span>
            <input
              type="checkbox"
              id={`checkbox-${activeTabIndex}-${itemIndex}`}
              name="filterRadio"
              className={styles.item_checkbox}
              checked={checkboxStates[activeTabIndex][itemIndex]}
              onChange={() => handleCheckboxChange(activeTabIndex, itemIndex)}
            />
          </label>
        </li>
      ))}
    </ul>
  );
}

export default DropdownList;





