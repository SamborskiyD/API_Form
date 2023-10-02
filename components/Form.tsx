'use client'

import styles from '@/styles/page.module.scss'

import type { City, Doctor, Speciality, FormProps } from '@/types/Types'
import { subscribe } from 'diagnostics_channel'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

interface FormValues {
    name: string,
    email: string,
    date: string,
    sex: string,
    cityId: string,
    specialityId: string,
    doctorId: string,
}


const Form = ({ cities, doctors, specialties }: FormProps) => {

    const { register, handleSubmit, watch, getValues, setValue, formState } = useForm<FormValues>()
    const { errors } = formState

    const calculateAge = (date: string) => {
        let birthday = new Date(date)
        return  new Date(Date.now() - birthday.getTime()).getUTCFullYear() - 1970
    }

    const filterDoctors = () => {
        let response = doctors
        const values = getValues()
        if (values.date) {
            let age = calculateAge(values.date)
            response = response.filter(doctor => age < 18 === doctor.isPediatrician)
        }
        if (values.cityId) {
            response = response.filter(doctor => doctor.cityId === values.cityId)
        }
        if (values.specialityId) {
            response = response.filter(doctor => doctor.specialityId === values.specialityId)
        }
        return response
    }

    const filterSpecialties = () => {
        let response = specialties
        const values = getValues()
        if (values.date) {
            let age = calculateAge(values.date)
            response = response.filter(speciality =>
                (!speciality.params?.minAge && !speciality.params?.maxAge) ||
                speciality.params?.minAge < age ||
                speciality.params?.maxAge > age)
            setValue('specialityId', '')
        }
        if (values.sex) {
            response = response.filter(speciality => speciality.params?.gender === values.sex || !speciality.params?.gender)
            setValue('specialityId', '')
        }
        return response
    }

    // const setDoctorInfo = () => {
    //     const doctorId = parseInt(getValues('doctorId'))
    //     setValue('cityId', doctors[doctorId]?.cityId)
    //     setValue('specialityId', doctors[doctorId]?.specialityId)
    // }

    const filteredDoctors = useMemo(() => {
        return filterDoctors()
    }, [watch(['date', 'cityId', 'specialityId'])])


    const filteredSpecialties = useMemo(() => {
        return filterSpecialties()
    }, [watch(['date', 'sex'])])

    // useMemo(() => {
    //     return setDoctorInfo()
    // }, [watch('doctorId')])

    const onSubmit = (data: FormValues) => {
        alert(JSON.stringify(data))
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>

            <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                    type="text"
                    id='name'
                    className={styles.input}
                    {...register('name', {
                        required: 'Name is required',
                        pattern: {
                            value: /^[a-zA-Z]+$/i,
                            message: "Name should containe only latin letters"
                        }
                    })}
                />
                <p className={styles.error}>{errors.name?.message}</p>
            </div>

            <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                    type="email"
                    id='email'
                    className={styles.input}
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
                            message: "Invalid email"
                        }
                    })}
                />
                <p className={styles.error}>{errors.email?.message}</p>
            </div>

            <div className={styles.field}>
                <label htmlFor="date" className={styles.label}>Birthday Date</label>
                <input
                    type="date"
                    id='date'

                    className={styles.input}
                    {...register('date', {
                        required: 'Date is required',
                        min: {
                            value: '01/01/1920',
                            message: 'Date is out of range'
                        },
                    })}
                />
                <p className={styles.error}>{errors.date?.message}</p>
            </div>

            <div className={styles.field}>
                <label htmlFor="sex" className={styles.label}>Sex</label>
                <select
                    id='sex'
                    className={styles.input}
                    {...register('sex', {
                        required: 'Sex is required',
                    })}
                >
                    <option value="" hidden>Choose sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <p className={styles.error}>{errors.sex?.message}</p>
            </div>

            <div className={styles.field}>
                <label htmlFor="cityId" className={styles.label}>City</label>
                <select
                    id='cityId'
                    className={styles.input}
                    {...register('cityId', {
                        required: 'City is required',
                    })}
                >
                    <option value="" hidden>Choose city</option>
                    {cities.map((city: City) => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                    ))}

                </select>
                <p className={styles.error}>{errors.cityId?.message}</p>
            </div>

            <div className={styles.field}>
                <label htmlFor="specialityId" className={styles.label}>Doctor Speciality</label>
                <select
                    id='specialityId'
                    className={styles.input}
                    {...register('specialityId', {
                        validate: {
                            spesialityMinAge: (value) => {
                                let date = getValues('date')
                                return ''
                            },
                        }
                    })}

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
                    className={styles.input}
                    {...register('doctorId', {
                        required: 'Doctor is required',
                    })}
                >
                    <option value="" hidden>Choose doctor</option>
                    {filteredDoctors.map((doctor: Doctor) => (
                        <option key={doctor.id} value={doctor.id}>{doctor.name} {doctor.surname}</option>
                    ))}

                </select>
                <p className={styles.error}>{errors.doctorId?.message}</p>
            </div>

            <button className={styles.button} type='submit'>Submit</button>
        </form>
    )
}

export default Form