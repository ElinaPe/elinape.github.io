import { e } from 'mathjs';
import React, { useState } from 'react';

const Form = ({ data }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Lisää logiikkaa datan käsittelyyn tai lähetyslogiikkaa tähän...
  };

  return (
    <form onSubmit={handleSubmit}>
      {data.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          {item.fields.map((field, fieldIndex) => (
            <div key={fieldIndex}>
              <label>
                {field.nimi}
                <input
                  type="number"
                  name={field.muuttuja}
                  onChange={(e) => handleInputChange(e, field.muuttuja)}
                />
              </label>
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Lähetä</button>
    </form>
  );
};

function handleInputChange(e: number, muuttuja: any) {
    throw new Error('Function not implemented.');
}

export default Form;;