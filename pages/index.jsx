import  FilterForm from '@/components/FilterForm/FilterForm';

import styles from './index.module.scss';


export default function Home({ attributes }) {

  return (
    <>
    <div className={styles.body}>
      <FilterForm data={attributes.tabs_data} />
    </div>
    </>
  )
}

export async function getStaticProps() {

  return {
    props: {
      attributes: {
        tabs_data: [
          { label: 'ЖК', items: ['Академический', 'Басманный', 'Замоскворечье', 'Измайлово', 'Парус', 'Алые паруса','Дом на набережной', 'Воробьевы горы'] },
          { label: 'Округ', items: ['Центральный', 'Зеленоградский', 'Восточный', 'Западный', 'Южный', 'Северный', 'Северо-Западный', 'Юго-Восточный'] },
          { label: 'Район', items: ['Арбат', 'Аэропорт', 'Бабушкинский', 'Внуково', 'Гагаринский', 'Коньково', 'Чертаново', 'Люберцы'] },
          { label: 'Метро', items: ['Третьяковская', 'Чертаново', 'Академическая', 'Шуваловская', 'Теплый стан', 'Ясенево', 'Измайлово'] },
        ]
      }
    }
  }
}


