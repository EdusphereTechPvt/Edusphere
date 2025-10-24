import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import React, { useEffect, useState, useRef } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};

function getStyles(value, selectedValue, theme) {
  return {
    fontWeight: selectedValue.includes(value)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
    backgroundColor: selectedValue.includes(value)
      ? theme.palette.primary.main
      : 'transparent',
    color: selectedValue.includes(value)
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
    '&:hover': {
      backgroundColor: selectedValue.includes(value)
        ? theme.palette.primary.dark
        : theme.palette.action.hover,
    },
  };
}

const MultiSelectDropdown = ({value, data, resetFlag, style = {}, onSelect ,onBlur }) => {
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const shouldLabelShrink = selectedValue.length > 0 || isOpen;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const newValues = typeof value === 'string' ? value.split(',') : value;
    setSelectedValue(newValues);
    onSelect?.(newValues);
  };

  const handleDelete = (valueToDelete) => {
    const newValues = selectedValue.filter((val) => val !== valueToDelete);
    setSelectedValue(newValues);
    onSelect?.(newValues);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && selectedValue.length > 0) {
      const input = event.target;
      if (!input.value || input.selectionStart === 0) {
        event.preventDefault();
        const newValues = selectedValue.slice(0, -1);
        setSelectedValue(newValues);
        onSelect?.(newValues);
      }
    }
  };

  const handleChipClick = (event) => {
    event.stopPropagation();
  };

  const handleClose = () => {
    setIsOpen(false);
    handleBlur()
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    onBlur?.(data);
  }

  useEffect(() => {
    setSelectedValue([]);
  }, [resetFlag]);

  return (
    <Box className={`${style.className}`} sx={{ ...style.inlineStyle }}>
      {data.label && (
        <Box className="text-sm font-medium mb-[0.33rem] text-gray-700">
          {data.label} {data.required && "*"}
        </Box>
      )}

      <FormControl
        fullWidth
        size="small"
        required={data.required}
        disabled={data.items.length === 0 || data.disabled}
      >
        <InputLabel 
          id="dropdown-label" 
          shrink={shouldLabelShrink}    
          // sx={{ padding: '0.5rem 0'}}
          color={!shouldLabelShrink && 'default'}
        >
          {data.placeholder}
        </InputLabel>

        <Select
          ref={selectRef}
          labelId="multiselect-label"
          id="multiselect-chip"
          multiple
          value={selectedValue || value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          input={
            <OutlinedInput 
              id="dropdown-label" 
              label={data.placeholder}
              onKeyDown={handleKeyDown}
              notched={shouldLabelShrink}
            />
          }
          sx={{minHeight: '2.5rem', ...style.selectStyle}}
          renderValue={(selected) => (
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 0.5, 
              minHeight: '32px', 
              alignItems: 'center',
              paddingTop: selectedValue.length > 0 ? '8px' : '0'
            }}>
              {selected.map((value) => {
                const selectedItem = data.items.find(item => item.id === value);
                return (
                <Chip
                  key={value}
                  label={selectedItem ? selectedItem.value : value}
                  onMouseDown={(e)=> e.stopPropagation()}
                  onDelete={() => handleDelete(value)}
                  onClick={handleChipClick}
                  sx={{
                    zIndex: 10,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '& .MuiChip-deleteIcon': {
                      color: theme.palette.primary.contrastText,
                      '&:hover': {
                        color: theme.palette.primary.light,
                      },
                    },
                  }}
                />
              )})}
            </Box>
          )}
          MenuProps={MenuProps}
          open={isOpen}
          onOpen={handleOpen}
          onClose={handleClose}
          displayEmpty={false}
        >
          {data?.items?.map((item, index) => (
            <MenuItem
              key={index}
              value={item.id}
              style={getStyles(item.id, selectedValue, theme)}
            >
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MultiSelectDropdown;