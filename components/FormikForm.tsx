'use client'

import styles from '@/styles/page.module.scss'
import type { City, Doctor, Speciality, FormProps } from '@/types/Types'
import { useFormik, FormikProps } from 'formik'

interface FormValues {

}

const FormikForm = (props: FormProps) => {

    const formik: FormikProps<FormValues> = useFormik<FormValues>({
        initialValues: {},
        onSubmit: () => {

        }
    })

    return (
        <form className={styles.form}>

            <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input type="text" id='name' name='name' className={styles.input} />
            </div>

            <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input type="email" id='email' name='email' className={styles.input} />
            </div>

            <div className={styles.field}>
                <label htmlFor="date" className={styles.label}>Birthday Date</label>
                <input type="date" id='date' name='date' className={styles.input} />
            </div>

            <div className={styles.field}>
                <label htmlFor="sex" className={styles.label}>Sex</label>
                <select id='sex' name='sex' className={styles.input}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="city" className={styles.label}>City</label>
                <select id='city' name='city' className={styles.input}>

                    {props.cities.map((city: City) => (
                        <option value="">{city.name}</option>
                    ))}

                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="speciality" className={styles.label}>Doctor Speciality</label>
                <select id='speciality' name='speciality' className={styles.input}>

                    {props.specialties.map((speciality: Speciality) => (
                        <option value="">{speciality.name}</option>
                    ))}

                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="doctor" className={styles.label}>Doctor</label>
                <select id='doctor' name='doctor' className={styles.input}>

                    {props.doctors.map((doctor: Doctor) => (
                        <option value="">{doctor.name} {doctor.surname}</option>
                    ))}
                    
                </select>
            </div>

        </form>
    )
}

export default FormikForm