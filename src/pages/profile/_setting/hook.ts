import React, { useState, ChangeEvent } from 'react';
import { useFormProps } from '../../../types/hooks';

interface UseFormReturn {
    values: useFormProps;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    setValues: React.Dispatch<React.SetStateAction<useFormProps>>;
}

export const useForm = (initialValues: useFormProps): UseFormReturn => {
    const [values, setValues] = useState<useFormProps>(initialValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value, name } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    return { values, handleChange, setValues };
};