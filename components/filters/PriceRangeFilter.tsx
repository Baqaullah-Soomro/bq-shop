'use client';

import { Slider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';

interface PriceRangeFilterProps {
  min: number;
  max: number;
  onChange: (values: { min: number; max: number }) => void;
}

const StyledSlider = styled(Slider)({
  color: '#000',
  height: 2,
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#000',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
  },
  '& .MuiSlider-track': {
    height: 2,
    backgroundColor: '#000',
  },
  '& .MuiSlider-rail': {
    height: 2,
    opacity: 0.2,
    backgroundColor: '#bfbfbf',
  },
});

export default function PriceRangeFilter({ min, max, onChange }: PriceRangeFilterProps) {
  const [value, setValue] = useState<number[]>([min, max]);

  useEffect(() => {
    setValue([min, max]);
  }, [min, max]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    const values = newValue as number[];
    setValue(values);
    onChange({ min: values[0], max: values[1] });
  };

  const formatValue = (value: number) => `$${value}`;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Price</h3>
      <div className="px-2">
        <StyledSlider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="off"
          min={50}
          max={200}
          disableSwap
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{formatValue(value[0])}</span>
          <span>{formatValue(value[1])}</span>
        </div>
      </div>
    </div>
  );
}
