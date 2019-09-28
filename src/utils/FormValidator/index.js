import mapErrorMessageCreatorToRules from './mapErrorMessageCreatorToRules';
import { errorMessagesSeparator } from './constants';
import rules from './rules';

class FormValidator {
  static errorMessagesSeparator = errorMessagesSeparator;

  constructor(schema, messageCreator = FormValidator.messageCreator) {
    this.schema = schema;
    this.messageCreator = ({ ruleName, params }) => messageCreator({
      ruleName,
      params,
    }, FormValidator.messageCreator);
  }

  /**
   * @private
   * @param value
   * @param props
   * @returns {null|Object} エラーがない場合はnull, ある場合はエラーメッセージオブジェクト
   */
  validate(value, props) {
    // eslint-disable-next-line no-underscore-dangle
    const error = this._validate(this.schema, value, value, props);
    // エラーが１つでもある場合は"_error"のメッセージを追加
    // エラーが１つもない場合はnullを返す
    if (error) {
      // eslint-disable-next-line no-underscore-dangle
      error._error = this.messageCreator({ ruleName: '_error' });
    }
    return error;
  }

  /**
   * @private
   * @param schema
   * @param value
   * @param rootValue
   * @param props
   * @returns {null|Object} エラーがない場合はnull, ある場合はエラーオブジェクト
   */
  // eslint-disable-next-line no-underscore-dangle
  _validate(schema, value, rootValue, props) {
    // errorがない場合はnullを返す
    let error = null;
    const that = this;
    Object.keys(schema).forEach((propName) => {
      const rule = schema[propName];
      const checks = Array.isArray(rule) ? rule : [rule];
      const innerErrors = [];
      checks.some((check) => {
        if (!check || typeof check !== 'function') {
          throw new Error(`Validation rule of "${propName}" must be function or array of functions.`);
        }
        const innerError = check.call(that, value, propName, rootValue, props);

        if (innerError) {
          if (typeof innerError === 'object') {
            // エラー文字列ではなくエラーオブジェクトが返ってきた場合は、別のルールでのチェックはしない
            innerErrors[0] = innerError;
            innerErrors.splice(1);
            return true;
          }
          if (typeof innerError === 'string') {
            innerErrors.push(innerError);
            return false;
          }
          throw new Error('Rule is invalid. Rule check function should return object or string.');
        }
        return false;
      });
      if (innerErrors.length) {
        if (error === null || error === undefined) {
          error = {};
        }
        if (innerErrors.length === 1) {
          [error[propName]] = innerErrors;
        } else {
          error[propName] = innerErrors.join(this.constructor.errorMessagesSeparator);
        }
      }
    });
    return error;
  }

  /**
   * タイプ指定オブジェクト
   * オブジェクトの入れ子や配列の値をチェックするバリデーションルールの定義を行うときに使用します
   * 指定されたプロパティに該当する値が、shape指定なのにオブジェクトではない場合、また、arrayOf指定なのに配列でない場合は、
   * バリデーションのエラーではなく、フォームの構成に問題があるので、エラーを投げます。
   * @type {{shape: ((schema?)), arrayOf: ((rule?))}}
   */
  static Types = {
    shape(schema) {
      return function check(props, propName, rootValue) {
        // shapeルールを指定されたプロパティは、値が空の場合は空オブジェクトで判定する
        const value = props[propName] || {};
        if (typeof value !== 'object') {
          throw new Error(`Value of "${propName}" must be object`);
        }
        // eslint-disable-next-line no-underscore-dangle
        return this._validate.call(this, schema, value, rootValue);
      };
    },

    arrayOf(rule) {
      return function check(props, propName, rootValue) {
        // arrayOfルールを指定されたプロパティは、値が空の場合は空配列で判定する
        const value = props[propName] || [];
        if (!value) {
          return null;
        }
        if (!Array.isArray(value)) {
          throw new Error(`Value of "${propName}" must be array`);
        }
        const innerErrors = [];
        // eslint-disable-next-line no-underscore-dangle
        const schema = { i: rule };
        value.forEach((v, i) => {
          // eslint-disable-next-line no-underscore-dangle
          const error = this._validate.call(this, schema, { i: value[i] }, rootValue);
          if (error) {
            innerErrors[i] = error.i;
          }
        });
        if (!innerErrors.length) {
          return null;
        }
        return innerErrors;
      };
    },
  };

  // ルールは外から追加できるようにする
  // メッセージも外から設定できるようにする
  static Rules = rules;

  /**
   * @param obj.ruleName {String} ルール名
   * @param obj.params パラメータ
   * @returns {String} エラーメッセージ
   */
  static messageCreator({ ruleName, params }) {
    const fn = mapErrorMessageCreatorToRules[ruleName];
    if (fn == null) {
      throw new Error(`Message of error for validation rule ${ruleName} is not defined.`);
    }
    if (typeof fn === 'function') {
      return fn(params);
    }
    return fn;
  }
}

export default FormValidator;
