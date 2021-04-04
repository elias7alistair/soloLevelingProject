import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const FilterTask = () => {
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Active", value: "1" },
    { name: "High Priority", value: "2" },
    { name: "Completed", value: "3" },
    { name: "Abandoned", value: "4" },
  ];

  return (
    <div className='filterList'>
      <ButtonGroup toggle>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type='radio'
            variant='secondary'
            name='radio'
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default FilterTask;
