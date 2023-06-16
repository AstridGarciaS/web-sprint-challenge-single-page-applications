import React, { useState } from 'react';
// styles
import axios from 'axios';
import * as yup from "yup";
import styled from 'styled-components';


const PizzaFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`;

const FormWrapper = styled.div`
  background-color: lightblue;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
`;


const formSchema = yup.object().shape({
  customer: yup
    .string()
    .required("Name is required")
    .min(2, 'name must be at least 2 characters'),
  size: yup
    .string()
    .oneOf(["small", "medium", "large"], 'Please select a size!'),
  sauce: yup
    .string()
    .required("Please select a sauce!")
    .oneOf(['original red', 'garlic ranch', 'BBQ sauce', 'spinach alfredo'], 'Please select a valid sauce!'),
  topping: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one topping')
    .max(5, 'Please select a maximum of 5 toppings'),
  instructions: yup
    .string()
    .max(200, 'Instructions must be less than 200 characters'),
  glutenFree: yup
    .boolean()
    .required("Please indicate your gluten preference"),
});


const initialFormValues = {
  customer: '',
  size: '',
  sauce: '',
  topping: [],
  instructions: '',
  glutenFree: false,
};

const PizzaForm = () => {
  
  const [form, setForm] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  
  const submit = event =>{
    event.preventDefault()
    const newOrder ={order: form.customer.trim(), size: form.size, sauce: form.sauce, topping: form.topping, instructions: form.instructions, glutenFree: form.glutenFree}
    axios.post('https://reqres.in/api/orders', newOrder)
      .then(res => {
        setForm(initialFormValues)
        console.log(res.data)

      })
      .catch(err => {
        console.log(err);
      })

  }

  const inputChange = (event) => {
    const { name, value, type, checked } = event.target;
   

    if (type === 'checkbox') {

      const updatedToppings = checked
        ? [...form.topping, value]
        : form.topping.filter((topping) => topping !== value);

      setForm((prevForm) => ({
        ...prevForm,
        topping: updatedToppings,
      }));
    } else if (type === 'radio') {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    } else if (type === 'text') {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }

    formSchema
    .validateAt(name, { [name]: value })
    .then(() => {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    })
    .catch((error) => {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    });

  };


  return (
    <PizzaFormContainer>
      <FormWrapper>
        <FormTitle>Build Your Own Pizza</FormTitle>
          <form
            id="pizza-form"
            onSubmit={submit}
            post='newOrder'
          >
            <p className="name">Your Name</p>
            <input
              type="text"
              id="name-input"
              name="customer"
              placeholder="Name"
              value={form.customer}
              onChange={inputChange}
            />
            <p className='error-m'>name must be at least 2 characters</p>
            <div>
              {errors.customer && <p className="error">{errors.customer}</p>}
            </div>

            <p>
              <label htmlFor="sauce">Choice of Sauce</label>
            </p>
            <input
              type="radio"
              value="original red"
              name="sauce"
              key="original-red"
              checked={form.sauce === 'original red'}
              onChange={inputChange}
            />
            Original Red
            <input
              type="radio"
              value="garlic ranch"
              name="sauce"
              key="garlic-ranch"
              checked={form.sauce === 'garlic ranch'}
              onChange={inputChange}
            />
            Garlic Ranch
            <input
              type="radio"
              value="BBQ sauce"
              name="sauce"
              key="bbq-sauce"
              checked={form.sauce === 'BBQ sauce'}
              onChange={inputChange}
            />
            BBQ Sauce
            <input
              type="radio"
              value="spinach alfredo"
              name="sauce"
              key="spinach-alfredo"
              checked={form.sauce === 'spinach alfredo'}
              onChange={inputChange}
            />
            Spinach Alfredo
            <div>
              {errors.sauce && <p className="error">{errors.sauce}</p>}
            </div>

            <p>
              <label htmlFor="size-dropdown">Choose the size</label>
              <select
                id="size-dropdown"
                name="size"
                value={form.size}
                onChange={inputChange}
              >
                <option value="">Select a Size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="extra-large">Extra Large</option>
              </select>
            </p>
            <div>
              {errors.size && <p className="error">{errors.size}</p>}
            </div>

            <p>
              <label htmlFor="toppings">Choose Toppings</label>
            </p>
            <input
              type="checkbox"
              value="pepperoni"
              name="topping"
              key="pepperoni"
              checked={form.topping.includes('pepperoni')}
              onChange={inputChange}
            />
            Pepperoni
            <input
              type="checkbox"
              value="sausage"
              name="topping"
              key="sausage"
              checked={form.topping.includes('sausage')}
              onChange={inputChange}
            />
            Sausage
            <input
              type="checkbox"
              value="bacon"
              name="topping"
              key="bacon"
              checked={form.topping.includes('bacon')}
              onChange={inputChange}
            />
            Bacon
            <input
              type="checkbox"
              value="ham"
              name="topping"
              key="ham"
              checked={form.topping.includes('ham')}
              onChange={inputChange}
            />
            Ham
            <p>
              <label htmlFor="instructions">Special Instructions</label>
            </p>
            <textarea
              id="special-text"
              name="instructions"
              type="text"
              rows="4"
              cols="50"
              placeholder="Anything else you'd like to add?"
              value={form.instructions}
              onChange={inputChange}
            ></textarea>

            <p>
              <label htmlFor="gluten-free">Gluten Free Crust ($1.00)</label>
              <input
                id="gluten-free"
                type="checkbox"
                checked={form.glutenFree}
                name="glutenFree"
                onChange={inputChange}
              />
            </p>
            <button type="submit">Submit</button>
          </form>
      </FormWrapper>
    </PizzaFormContainer>
  );
};

export default PizzaForm;