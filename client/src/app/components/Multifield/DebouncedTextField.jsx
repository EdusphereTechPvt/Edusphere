import React, { useState, useEffect, useRef } from 'react';
import { TextField } from '@mui/material';

const DebouncedTextField = ({ 
    value: initialValue, 
    onChange, 
    debounceDelay = 300, 
    pattern,
    onInvalidPattern,
    ...props 
}) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const [error, setError] = useState('');
    const timeoutRef = useRef(null);

    useEffect(() => {
        setInputValue(initialValue);
    }, [initialValue]);

    const validatePattern = (value) => {
        if (!pattern) return true;
        
        const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
        return regex.test(value);
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        const isValid = validatePattern(value);
        
        if (!isValid && value !== '') {
            setError('Invalid input format');
            if (onInvalidPattern) {
                onInvalidPattern(value);
            }
        } else {
            setError('');
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (isValid || value === '') {
                onChange(value);
            }
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
            error={!!error || props.error}
            helperText={error || props.helperText}
        />
    );
};

export default DebouncedTextField;