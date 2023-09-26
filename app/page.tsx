
import styles from '@/styles/page.module.scss'
import Form from '@/components/Form'

async function getData(category: string) {
  let res
  switch (category) {

    case 'cities':
      res = await fetch('https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4')
      break;

    case 'doctors':
      res = await fetch('https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21')
      break

    case 'specialties':
      res = await fetch('https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca')
      break
  }
  return res?.json()
}

export default async function Home() {

  const cities = await getData('cities')
  const doctors = await getData('doctors')
  const specialties = await getData('specialties')

  return (
    <main className={styles.main}>
      <Form cities={cities} doctors={doctors} specialties={specialties} />
    </main>
  )
}
