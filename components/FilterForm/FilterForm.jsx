import { useState } from 'react'
import classNames from 'classnames'

import styles from './FilterForm.module.scss';

export default function FilterForm( { data } ) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [checkboxStates, setCheckboxStates] = useState(
    data.map((tab) => new Array(tab.items.length).fill(false))
  );
  const [activeItems, setActiveItems] = useState([]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTabClick = (tabIndex) => {
    setActiveTabIndex(tabIndex);
  };

  const handleCheckboxChange = (tabIndex, itemIndex) => {
    const updatedStates = [...checkboxStates];
    updatedStates[tabIndex][itemIndex] = !updatedStates[tabIndex][itemIndex];
    setCheckboxStates(updatedStates);

    if (updatedStates[tabIndex][itemIndex]) {
      setActiveItems((prevItems) => [...prevItems, data[tabIndex].items[itemIndex]]);
    } else {
      setActiveItems((prevItems) => prevItems.filter((item) => item !== data[tabIndex].items[itemIndex]));
    }
  };

  const handleRemoveItem = (item) => {
    setActiveItems((prevItems) => prevItems.filter((activeItem) => activeItem !== item));

    const updatedStates = [...checkboxStates];
    data.forEach((tab, tabIndex) => {
      const itemIndex = tab.items.indexOf(item);
      if (itemIndex !== -1) {
        updatedStates[tabIndex][itemIndex] = false;
      }
    });
    setCheckboxStates(updatedStates);
  };

  const countTotalActiveCheckboxes = () => {
    let totalActive = 0;
    checkboxStates.forEach((tabCheckboxes) => {
      totalActive += tabCheckboxes.filter((isChecked) => isChecked).length;
    });
    return totalActive;
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.container}>
          <div>Локация</div>
          <button className={styles.button} onClick={toggleDropdown}>
            <div className={styles.button_title}>
              <svg className={styles.button_icon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 13C10.5376 13 13 10.5376 13 7.5C13 4.46243 10.5376 2 7.5 2C4.46243 2 2 4.46243 2 7.5C2 10.5376 4.46243 13 7.5 13Z" stroke="#080908" strokeWidth="2" strokeLinecap="square"/>
                <path d="M12 12L14 14" stroke="#080908" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className={styles.button_text}>ЖК, Округ, район, метро</div>
            </div>
            {countTotalActiveCheckboxes() > 0 && (
              <span className={styles.button_badge}>{countTotalActiveCheckboxes()}</span>
            )}
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdown}>
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
              {activeItems.length > 0 && (
                <div className={styles.active_items}>
                  {activeItems.map((item, index) => (
                    <div key={index} className={styles.active_item}>
                      {item}
                      <button className={styles.remove_button} onClick={() => handleRemoveItem(item)}>
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.91235 1L9.91276 9.0004M10.0843 1L2.08392 9.0004" stroke="#07000F" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <ul className={styles.list}>
                {data[activeTabIndex].items.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.item}>
                    <label className={styles.item_label} htmlFor={`checkbox-${activeTabIndex}-${itemIndex}`}>
                      <span className={styles.item_text}>{item}</span>
                      <input type="checkbox"
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
              <div className={styles.vignette}></div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}