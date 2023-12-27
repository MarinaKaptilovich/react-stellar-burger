import React, { useState, ChangeEvent } from 'react';
import { UseFormProps } from '../../../types/hooks';

interface UseFormReturn {
    values: UseFormProps;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    setValues: React.Dispatch<React.SetStateAction<UseFormProps>>;
}

export const useForm = (initialValues: UseFormProps): UseFormReturn => {
    const [values, setValues] = useState<UseFormProps>(initialValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value, name } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    return { values, handleChange, setValues };
};