import React from 'react';
import PropTypes from 'prop-types';

import Typography from '~/components/atoms/Typography';
import FormValidator from '~/utils/FormValidator';

const { errorMessagesSeparator } = FormValidator;

export default function InputErrorMessage({ error }) {
  const errorMessages = [];
  // エラーメッセージは同じメッセージがあれば重複削除する
  error.split(errorMessagesSeparator).filter((x, i, self) => self.indexOf(x) === i).forEach((e) => {
    const message = e.trim();
    if (message) {
      errorMessages.push(message);
    }
  });
  if (!errorMessages.length) {
    return null;
  }
  return (
    <>
      {
        errorMessages.map(m => (
          <span className="a_input-error-message" key={m}>
            <Typography variant="caption1" color="error">{m}</Typography>
          </span>
        ))
      }
    </>
  );
}

InputErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
};
