import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MUITextField from '@material-ui/core/TextField';

import './style';

import IconButton from '~/components/atoms/IconButton';
import DropDownIcon from '~/components/atoms/DropDownIcon';
import InputErrorMessage from '~/components/atoms/InputErrorMessage';
import FieldLabel, { propTypes as labelPropTypes } from '~/components/molecules/FieldLabel';

const isIOS = /iP(hone|([oa])d)/.test(navigator.userAgent);

const InputPropsClasses = {
  root: 'formControl',
  input: 'input',
  error: 'error',
  focused: 'focused',
};

export default class TextField extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    input: PropTypes.shape({
      className: PropTypes.string,
      onChange: PropTypes.func,
      value: PropTypes.string,
    }),
    shouldDisplayError: PropTypes.func,
    meta: PropTypes.shape({
      error: PropTypes.string,
      touched: PropTypes.bool,
    }),
    required: PropTypes.bool,
    description: PropTypes.node,
    select: PropTypes.bool,
    label: PropTypes.string,
    tooltipDescription: PropTypes.node,
    labelProps: PropTypes.shape(labelPropTypes),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.arrayOf(),
    ]),
    type: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    inline: PropTypes.bool,
    size: PropTypes.oneOf(['xs', 's', 'm']),
    inputAlign: PropTypes.oneOf(['left', 'right', 'center']),
    children: PropTypes.node,
    variant: PropTypes.oneOf(['outlined', 'standard']),
    fullWidth: PropTypes.bool,
    clearBtnForDate: PropTypes.bool,
  };

  static defaultProps = {
    id: '',
    className: '',
    input: {},
    shouldDisplayError: ({ touched }) => touched,
    meta: {},
    required: false,
    description: null,
    select: false,
    label: '',
    tooltipDescription: null,
    labelProps: {},
    defaultValue: null,
    type: 'text',
    placeholder: '',
    disabled: false,
    multiline: false,
    rows: 9,
    rowsMax: 20,
    inline: false,
    size: 'm',
    inputAlign: 'left',
    children: null,
    variant: 'outlined',
    fullWidth: false,
    clearBtnForDate: false,
  };

  constructor() {
    super();
    this.handleClear = ::this.handleClear;
  }

  componentDidMount() {
    // defaultValueに値が入って入れば、デフォルト値の設定
    const { defaultValue, input } = this.props;
    if (defaultValue != null && input.onChange) {
      input.onChange(defaultValue);
    }
  }

  handleClear() {
    const { input: { onChange } } = this.props;
    if (onChange) {
      onChange('');
    }
  }

  render() {
    const {
      id,
      className,
      placeholder,
      label,
      tooltipDescription,
      labelProps,
      type,
      disabled,
      shouldDisplayError,
      required,
      description,
      select,
      multiline,
      rows,
      rowsMax,
      inline,
      children,
      size,
      inputAlign,
      input = {},
      meta = {},
      defaultValue,
      variant,
      clearBtnForDate,
      ...remainProps
    } = this.props;
    const { fullWidth } = this.props;
    // コンポーネントを使う箇所によって、エラーを出す・出さないが違う
    // なので、propで関数を受け取って、親コンポーネントから設定できるようにしている
    // デフォルトは、touchedかつエラーがある場合は表示
    const { error, touched } = meta;
    const hasError = error != null && (shouldDisplayError ? shouldDisplayError(meta) : touched);
    const errorMessage = hasError
      ? <InputErrorMessage error={error} />
      : null;
    const inputClassName = classNames(
      input.className,
      `align-${inputAlign}`,
      {
        'is-value-empty': placeholder && !input.value,
      },
    );

    const SelectProps = select
      ? {
        native: true,
        value: input.value,
        IconComponent: () => <DropDownIcon className="drop-down-icon" />,
      }
      : null;

    const fieldProps = {
      id: id || null,
      type,
      disabled,
      error: hasError,
      placeholder,
      inputProps: {
        ...input,
        className: inputClassName,
      },
      FormHelperTextProps: { className: 'helper-text', component: 'span' },
      helperText: errorMessage,
      variant,
      select,
      SelectProps,
      multiline,
      rows,
      rowsMax,
      size,
      InputProps: {
        classes: InputPropsClasses,
      },
      ...remainProps,
    };

    return (
      <div
        className={classNames(
          'a_text-field',
          className,
          type,
          variant,
          {
            'inline-block': inline,
            [`size-${size}`]: size,
            'has-error': hasError,
          },
        )}
      >
        {label && (
          <FieldLabel
            className="label"
            required={required}
            tooltipDescription={tooltipDescription}
            {...labelProps}
          >
            {label}
          </FieldLabel>
        )}
        {description && <div className="description">{description}</div>}
        <MUITextField {...fieldProps}>
          {(select && placeholder)
          && (
            <option value="" disabled style={{ display: 'none' }}>{placeholder}</option>
          )}
          {children}
        </MUITextField>
        {(isIOS || clearBtnForDate)
        && type === 'date'
        && !disabled
        && (
          <IconButton
            className={`${fullWidth && 'btn-full-width'} clear-date`}
            icon="close"
            color="gray"
            size="s"
            onClick={this.handleClear}
          />
        )}
      </div>
    );
  }
}
