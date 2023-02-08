import {useState, ChangeEvent, FormEvent} from 'react'
import { ErrorsType, WasFieldTouchedType } from '../components/FormGenerator/types';

export type UseFormProps<T> = {
    initialValues: T,
    onSumbit?: (values: T) => void
}

const useForm = <T>({initialValues, onSumbit}: UseFormProps<T>) => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState<ErrorsType>({});
    const [wasFieldTouched, setWasFieldTouched] = useState<WasFieldTouchedType>({});  

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setValues(prev => ({...prev, [name]: value}))
    }

    const handleSumbit = (e: FormEvent) => {
        e.preventDefault();
        //validacja
        //ustawienie disabled

        if (onSumbit) {
            onSumbit(values)
        }

    }

    return {handleChange, handleSumbit, values, errors}
};



export default useForm;