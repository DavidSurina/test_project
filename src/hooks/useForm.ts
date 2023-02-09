import {useState, ChangeEvent, FormEvent} from 'react'
import { ErrorsType, WasFieldTouchedType } from '../components/FormGenerator/types';
import { DataObjectType } from '../globals/mockObjects';

export type UseFormProps<T> = {
    dataObject: DataObjectType,
    onSumbit?: (values: T) => void
}

const useForm = <T>({dataObject, onSumbit}: UseFormProps<T>) => {
    const { formFields } = dataObject;
    const requiredFieldsCount = formFields.map((f) => f.validationRules.isRequired).length;
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState<ErrorsType>({});
    const [wasFieldTouched, setWasFieldTouched] = useState<WasFieldTouchedType>({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setValues(prev => ({...prev, [name]: value}))
    }

    const validateField = (name: string) => {
                
    }

    const handleSumbit = (e: FormEvent) => {
        e.preventDefault();
        //validacja
        //ustawienie disabled

        if (onSumbit) {
            onSumbit(values)
        }
    }   

    const handleBlur = (e: FormEvent) => {
        const { name, value } = e.currentTarget;
    }

    return {handleChange, handleSumbit, values, errors, wasFieldTouched}
};



export default useForm;