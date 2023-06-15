import React, { useState } from "react";
import axios from 'axios';
import * as yup from "yup";

const formSchema = yup.object().shape({
  customer: yup
    .string()
    .required("Name is required")
    .min(2, 'Name must be at least 2 characters'),
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
  customer: "",
  size: "",
  sauce: "",
  topping: [],
  instructions: "",
  glutenFree: false,
};

const Pizza = () => {
  const [form, setForm] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialFormValues);

  const inputChange = (e) => {
    e.persist();
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: fieldValue,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const formSubmit = (event) => {
    event.preventDefault();

    formSchema.validate(form, { abortEarly: false })
      .then(() => {
        axios.post('https://reqres.in/api/orders', form)
          .then(({ data }) => {
            console.log(data);
            setForm(initialFormValues);
          })
          .catch(err => console.error(err));
      })
      .catch((validationErrors) => {
        const errorsMap = {};
        validationErrors.inner.forEach((error) => {
          errorsMap[error.path] = error.message;
        });
        setErrors(errorsMap);
      });
  };

  return (
    <div className="pizza">
      <h2>Build Your Own Pizza</h2>

      <form id="pizza-form" onSubmit={formSubmit}>
        <h3 className="name">Your Name</h3>
        <input
          type="text"
          id="name-input"
          name="customer"
          placeholder="Name"
          value={form.customer}
          onChange={inputChange}
        />
        {errors.customer && <p className="error">{errors.customer}</p>}

        <p>
          <label htmlFor="sauce">Choice of Sauce</label>
        </p>
        <input
          type="radio"
          value="original red"
          name="sauce"
          checked={form.sauce === "original red"}
          onChange={inputChange}
        /> Original Red
        <input
          type="radio"
          value="garlic ranch"
          name="sauce"
          checked={form.sauce === "garlic ranch"}
          onChange={inputChange}
        /> Garlic Ranch
        <input
          type="radio"
          value="BBQ sauce"
          name="sauce"
          checked={form.sauce === "BBQ sauce"}
          onChange={inputChange}
        /> BBQ Sauce
        <input
          type="radio"
          value="spinach alfredo"
          name="sauce"
          checked={form.sauce === "spinach alfredo"}
          onChange={inputChange}
        /> Spinach Alfredo

        {errors.sauce && <p className="error">{errors.sauce}</p>}

        <p>
          <label htmlFor="size-dropdown">Choose the size</label>
          <select id="size-dropdown" name="size" value={form.size} onChange={inputChange}>
            <option value="">Select a Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </p>
        {errors.size && <p className="error">{errors.size}</p>}

        <label htmlFor="toppings">Add toppings</label>
        <p>
          <input
            id="pepperoni"
            type="checkbox"
            checked={form.topping.includes("pepperoni")}
            onChange={inputChange}
            name="topping"
            value="pepperoni"
          />
          Pepperoni
        </p>

        <p>
          <input
            id="sausage"
            type="checkbox"
            checked={form.topping.includes("sausage")}
            onChange={inputChange}
            name="topping"
            value="sausage"
          />
          Sausage
        </p>

        <p>
          <input
            id="onions"
            type="checkbox"
            checked={form.topping.includes("onions")}
            onChange={inputChange}
            name="topping"
            value="onions"
          />
          Onions
        </p>

        <p>
          <input
            id="greenPepper"
            type="checkbox"
            checked={form.topping.includes("greenPepper")}
            onChange={inputChange}
            name="topping"
            value="greenPepper"
          />
          Green Pepper
        </p>

        {errors.topping && <p className="error">{errors.topping}</p>}

        <p>
          <label htmlFor="instructions">Special Instructions</label>
        </p>
        <textarea
          name="instructions"
          id="special-text"
          placeholder="Anything else you'd like to add?"
          value={form.instructions}
          onChange={inputChange}
        />

        {errors.instructions && <p className="error">{errors.instructions}</p>}

        <p>
          <label htmlFor="gluten-free">Gluten Free Crust ($1.00)</label>
          <input
            id="gluten-free"
            type="checkbox"
            checked={form.glutenFree}
            onChange={inputChange}
            name="glutenFree"
          />
        </p>

        {errors.glutenFree && <p className="error">{errors.glutenFree}</p>}

        <button className="submit" type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default Pizza;