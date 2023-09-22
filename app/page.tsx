
import styles from '@/styles/page.module.scss'
import FormikForm from '@/components/FormikForm'

async function getCities() {
  const response = await fetch('https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4')

  return response.json()
}

async function getDoctors() {
  const response = await fetch('https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21')

  return response.json()
}

async function getSpecialties() {
  const response = await fetch('https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca')

  return response.json()
}

interface FormValues {

}


export default async function Home() {

  const cities = await getCities()
  const doctors = await getDoctors()
  const specialties = await getSpecialties()

  return (
    <main className={styles.main}>
      <FormikForm  cities={cities} doctors={doctors} specialties={specialties}/>
    </main>
  )
}
