'use client'

import styles from '@/styles/page.module.scss'

import type { City, Doctor, Speciality, FormProps } from '@/types/Types'
import { useFormik, FormikProps } from 'formik'
import { useMemo } from 'react'

interface FormValues {
    name: string,
    email: string,
    date: string,
    sex: string,
    cityId: string,
    specialityId: string,
    doctorId: string,
}

const FormikForm = ({ cities, doctors, specialties }: FormProps) => {

    const { values, handleChange, handleSubmit }: FormikProps<FormValues> = useFormik<FormValues>({
        initialValues: {
            name: '',
            email: '',
            date: '',
            sex: '',
            cityId: '',
            specialityId: '',
            doctorId: '',
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values))
        }
    })

    const filterDoctors = () => {
        let response = doctors
        if(values.date){
            let birthday = new Date(values.date)
            let age = new Date(Date.now() - birthday.getTime()).getUTCFullYear() - 1970
            response = response.filter(doctor => age < 18 === doctor.isPediatrician)
        }
        if(values.cityId){
            response = response.filter(doctor => doctor.cityId === values.cityId)
        }
        if(values.specialityId){
            response = response.filter(doctor => doctor.specialityId === values.specialityId)
        }
        return response
    }

    const filterSpecialties = () => {
        let response = specialties
        if(values.sex){
            response = response.filter(speciality => speciality.params?.gender === values.sex || !speciality.params?.gender)
        }
        return response
    }

    const filteredDoctors = useMemo(() => {
        return filterDoctors()
    }, [values.date, values.cityId, values.specialityId])


    const filteredSpecialties = useMemo(() => {
        return filterSpecialties()
    }, [values.sex])

    return (
        <form className={styles.form} onSubmit={handleSubmit}>

            <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                    type="text"
                    id='name'
                    name='name'
                    className={styles.input}
                    value={values.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                    type="email"
                    id='email'
                    name='email'
                    className={styles.input}
                    value={values.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="date" className={styles.label}>Birthday Date</label>
                <input
                    type="date"
                    id='date'
                    name='date'
                    className={styles.input}
                    value={values.date}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="sex" className={styles.label}>Sex</label>
                <select
                    id='sex'
                    name='sex'
                    className={styles.input}
                    value={values.sex}
                    onChange={handleChange}
                    required
                >
                    <option value="" hidden>Choose sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="cityId" className={styles.label}>City</label>
                <select
                    id='cityId'
                    name='cityId'
                    className={styles.input}
                    value={values.cityId}
                    onChange={handleChange}
                    required
                >
                    <option value="" hidden>Choose city</option>
                    {cities.map((city: City) => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                    ))}

                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="specialityId" className={styles.label}>Doctor Speciality</label>
                <select
                    id='specialityId'
                    name='specialityId'
                    className={styles.input}
                    value={values.specialityId}
                    onChange={handleChange}
                >
                    <option value="" hidden>Choose speciality</option>
                    {filteredSpecialties.map((speciality: Speciality) => (
                        <option key={speciality.id} value={speciality.id}>{speciality.name}</option>
                    ))}
                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="doctorId" className={styles.label}>Doctor</label>
                <select
                    id='doctorId'
                    name='doctorId'
                    className={styles.input}
                    value={values.doctorId}
                    onChange={handleChange}
                    required
                >
                    <option value="" hidden>Choose doctor</option>
                    {filteredDoctors.map((doctor: Doctor) => (
                        <option key={doctor.id} value={doctor.id}>{doctor.name} {doctor.surname}</option>
                    ))}

                </select>
            </div>

            <button className={styles.button} type='submit'>Submit</button>
        </form>
    )
}

export default FormikForm