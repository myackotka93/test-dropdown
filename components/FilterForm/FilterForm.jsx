import { useState, useEffect } from 'react'
import DropdownTabs from '../DropdownTabs/DropdownTabs';
import ActiveItems from '../ActiveItems/ActiveItems';
import DropdownList from '../DropdownList/DropdownList';
import classNames from 'classnames'

import styles from './FilterForm.module.scss';

export default function FilterForm( { data } ) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [checkboxStates, setCheckboxStates] = useState(
    data.map((tab) => new Array(tab.items.length).fill(false))
  );
  const [activeItems, setActiveItems] = useState([]);
  const [hideVignette, setHideVignette] = useState(false);

  const handleScroll = (e) => {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setHideVignette(true);
    } else {
      setHideVignette(false);
    }
  };

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

  useEffect(() => {
    const handleBodyClick = (e) => {
      const dropdown = document.querySelector(`.${styles.dropdown}`);
      const button = document.querySelector(`.${styles.button}`);
      if (isDropdownOpen && dropdown && button) {
        if (!dropdown.contains(e.target) && !button.contains(e.target)) {
          setIsDropdownOpen(false);
        }
      }
    };
  
    document.body.addEventListener('click', handleBodyClick);
  
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [isDropdownOpen]);

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
              <DropdownTabs data={data} activeTabIndex={activeTabIndex} handleTabClick={handleTabClick} />
              {activeItems.length > 0 && (
                <ActiveItems activeItems={activeItems} handleRemoveItem={handleRemoveItem} />
              )}

              <DropdownList
                data={data}
                activeTabIndex={activeTabIndex}
                checkboxStates={checkboxStates}
                handleCheckboxChange={handleCheckboxChange}
                handleScroll={handleScroll}
              />
              {!hideVignette && <div className={styles.vignette}></div>}
            </div>
          )}
        </div>
      </div>
    </>
  )
}