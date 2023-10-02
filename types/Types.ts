
export type City = {
    id: string,
    name: string
}

export type Doctor = {
    id: string,
    name: string,
    surname: string,
    specialityId: string,
    isPediatrician: boolean,
    cityId: string
}

export type Speciality = {
    id: string,
    name: string,
    params?: {
        gender: string,
        minAge: number,
        maxAge: number
    }
}

export type FormProps = {
    cities: City[],
    specialties: Speciality[],
    doctors: Doctor[],
}
