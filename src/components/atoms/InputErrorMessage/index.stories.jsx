import React from 'react';
import FormValidator from '~/utils/FormValidator';
import InputErrorMessage from '.';

const { errorMessagesSeparator } = FormValidator;

const error = '全角（半角）2000文字以内で入力してください';
const errors = ['整数で入力してください', '最低賃金以上の金額を入力してください'].join(errorMessagesSeparator);

export default stories => stories
  .add('default', () => <InputErrorMessage error={error} />)
  .add('複数', () => <InputErrorMessage error={errors} />);
