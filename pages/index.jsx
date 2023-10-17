import  FilterForm from '@/components/FilterForm/FilterForm';

import styles from './index.module.scss';


export default function Home() {

  return (
    <>
    <div className={styles.body}>
      <FilterForm />
    </div>
    </>
  )
}

