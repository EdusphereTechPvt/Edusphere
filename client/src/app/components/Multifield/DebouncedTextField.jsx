import React, { useState, useEffect, useRef } from 'react';
import { TextField } from '@mui/material';

const DebouncedTextField = ({ value: initialValue, onChange, debounceDelay = 300, ...props }) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const timeoutRef = useRef(null);

    useEffect(() => {
        setInputValue(initialValue);
    }, [initialValue]);

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            onChange(value);
        }, debounceDelay);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <TextField
            {...props}
            value={inputValue}
            onChange={handleChange}
        />
    );
};

export default DebouncedTextField;