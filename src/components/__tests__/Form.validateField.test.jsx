import React from 'react';
import Form from '../Form.jsx';

import F from './TestHelper';

const model = {
  validations: F.getValidations(),
};

describe('validateField method', () => {
  test('validateField method should return valid for a valid field', () => {
    const form = F.render(<Form initialValues={{ a: 'b' }} model={model} />);
    expect(form.validateField('a')).toBe(true);
  });

  test('validateField method should return invalid for an invalid field', () => {
    const form = F.render(<Form initialValues={{ a: '' }} model={model} />);
    expect(form.validateField('a')).toBe(false);
  });

  test('validateField method should not store errors for other fields', () => {
    const model = {
      validations: F.getValidations([ 'a', 'b' ]),
    };

    const form = F.render(<Form initialValues={{ a: '', b: '' }} model={model} />);
    form.validateField('a');

    expect(form._getFieldErrors('b')).toHaveLength(0);
  });

  test('validateField method should store errors for display by default', () => {
    const form = F.render(<Form initialValues={{ a: '' }} model={model} />);
    form.validateField('a');

    expect(form._getFieldErrors('a')).toEqual(expect.arrayContaining(
      [ expect.objectContaining({ name: 'a' }) ]
    ));
  });

  test('validateField method should not store errors for display if flag set', () => {
    const form = F.render(<Form initialValues={{ a: '' }} model={model} />);
    form.validateField('a', null, false);

    expect(form._getFieldErrors('a')).toEqual(expect.not.arrayContaining(
      [ expect.objectContaining({ name: 'a' }) ]
    ));
  });
});
