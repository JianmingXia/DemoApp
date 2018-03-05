import React from 'react';
import { FilterTypes } from '../constants.js';
import { Radio } from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const FilterTodo = ({ onToggle, filter }) => {
    const haddleChange = function(e) {
        e.preventDefault();

        onToggle(e.target.value);
    }

    return (
        <div style={{ marginBottom: 16 }}>
            <RadioGroup defaultValue={filter.value} size="large" onChange={haddleChange}>
                <RadioButton value={FilterTypes.ALL}>{FilterTypes.ALL}</RadioButton>
                <RadioButton value={FilterTypes.UNCOMPLETED}>{FilterTypes.UNCOMPLETED}</RadioButton>
                <RadioButton value={FilterTypes.COMPLETED}>{FilterTypes.COMPLETED}</RadioButton>
            </RadioGroup>
        </div>
    );
};

export default FilterTodo;