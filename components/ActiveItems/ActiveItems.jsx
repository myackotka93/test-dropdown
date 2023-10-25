import React from 'react';
import styles from '../FilterForm/FilterForm.module.scss';

function ActiveItems({ activeItems, handleRemoveItem }) {
  return (
    <div className={styles.active_items}>
      {activeItems.map((item, index) => (
        <div key={index} className={styles.active_item}>
          {item}
          <button className={styles.remove_button} onClick={() => handleRemoveItem(item)}>
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.91235 1L9.91276 9.0004M10.0843 1L2.08392 9.0004"
                stroke="#07000F"
                strokeOpacity="0.4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

export default ActiveItems;