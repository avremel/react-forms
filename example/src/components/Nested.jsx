import React from 'react';

import { Fields, Form, FormCollection, validator } from '@curiouser/react-forms';
import '@curiouser/react-forms/dist/index.css';

const formProps = {
  formName: 'my-form',
  initialValues: {
    details: {
      age: 8,
      favorite_color: 'blue',
      favorite_dinner_combos: [],
    },
    password: 'xxxxxx',
    username: 'coolguy95',
  },
  model: instance => ({
    getValidations () {
      return [{
        names: [ 'username', 'password' ],
        tests: [[ validator.tests.required, validator.messages.required ]],
      }, {
        names: [ 'password' ],
        tests: [[ validator.tests.minLength(6), validator.messages.minLength(6) ]],
      }];
    },
  }),
}

const dinnerComboDefaults = {
  beverage: '',
  entree: '',
  meta: {},
};

export default function MyForm () {
  const collection = React.useRef();
  const form = React.useRef();

  const handleClickAdd = React.useCallback(() => {
    collection.current.handleClickAdd();
  }, []);

  const handleSubmit = React.useCallback(() => {
    if (!form.current.validate() || form.current.state.isLoading) return;

    const formData = form.current.getData();

    // do something with formData...
  }, []);

  return (
    <Form ref={form} {...formProps}>
      <form onSubmit={handleSubmit}>
        <div className="form__fields">
          <Fields.TextField label="Name" name="username" />
          <Fields.PasswordField label="Password" name="password" />
        </div>
        <h4>User Details</h4>
        <Form formName="user-details" name="details">
          <div className="form__fields">
            <Fields.TextField label="Age" name="age" />
            <Fields.TextField label="Favorite Color" name="favorite_color" />
          </div>

          <h5>Favorite dinner combos</h5>
          <FormCollection
            component={DinnerCombo}
            defaultValues={dinnerComboDefaults}
            formName="user-combos"
            name="favorite_dinner_combos"
            ref={collection}>
            <button onClick={handleClickAdd} type="button">Add dinner combo</button>
          </FormCollection>
        </Form>
        <button type="submit">Sign in</button>
      </form>
    </Form>
  );
}

/**
 * @param       {function} handleClickRemove
 * @param       {number} index
 * @return      {jsx}
 */
function DinnerCombo ({ handleClickRemove, index }) {
  return (
    <div>
      <div className="form__fields">
        <Fields.TextField index={index} label="Beverage" name="beverage" />
        <Fields.TextField index={index} label="Entrée" name="entree" />
      </div>
      <Form formName="meta" index={index} name="meta">
        <Fields.TextField label="Meta - date added" name="date_added" />
      </Form>
      <button onClick={handleClickRemove} type="button">remove</button>
    </div>
  );
}