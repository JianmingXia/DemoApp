import React, { Component} from 'react';
import { FilterTypes } from '../constants.js';
import { Radio } from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class FilterTodo extends Component {
    haddleChange(e) {
        e.preventDefault();

        this.props.onToggle(e.target.value);
    }

    render() {
        return (
            <div style={{ marginBottom: 16 }}>
                <RadioGroup defaultValue={this.props.filter.value} size="large" onChange={this.haddleChange.bind(this)}>
                    <RadioButton value={FilterTypes.ALL}>{FilterTypes.ALL}</RadioButton>
                    <RadioButton value={FilterTypes.UNCOMPLETED}>{FilterTypes.UNCOMPLETED}</RadioButton>
                    <RadioButton value={FilterTypes.COMPLETED}>{FilterTypes.COMPLETED}</RadioButton>
                </RadioGroup>
            </div>
        );
    }
};

export default FilterTodo;