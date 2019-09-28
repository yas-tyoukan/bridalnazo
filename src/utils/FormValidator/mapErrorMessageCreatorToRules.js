/**
 * バリデーションルールと、バリデーションエラー時のメッセージマップ
 */
export default {
  /**
   * オブジェクト
   */
  shape: 'not object',

  /**
   * 配列
   */
  arrayOf: 'not array',

  /**
   * 必須項目
   * 必須チェックはメッセージなし(空文字だとredux-formにエラーなしと認識されるため、空白文字にしている
   */
  isRequired: ' ',

  /**
   * 整数値範囲
   */
  intRange: '整数で入力してください',

  /**
   * 文字数最大長制限
   *
   * @param {number[]} params [max]
   * @returns {String}
   */
  maxLength: params => `${params[1] ? '全角（半角）' : ''}${params[0]}文字以内で入力してください`,

  /**
   * 文字数最小長制限
   *
   * @param {number[]} params [max]
   * @returns {String}
   */
  minLength: params => `${params[1] ? '全角（半角）' : ''}${params[0]}文字以上で入力してください`,

  /**
   * 電話番号
   */
  tel: '正しい電話番号を入力してください',

  /**
   * メールアドレス
   * @param label
   * @returns {String}
   */
  mailAddress: '正しいメールアドレスを入力してください',

  /**
   * 日付
   * @param label
   * @returns {String}
   */
  date: '正しい日付を選択してください',

  /**
   * 時刻
   * @param label
   * @returns {String}
   */
  time: '24時間表記で入力してください',

  /**
   * パスワード
   */
  password: '半角英数混在8文字以上で設定してください',

  /**
   * パスワード確認用
   */
  passwordCheck: 'パスワードが一致していません',

  /**
   * カナ
   */
  kana: 'カナで入力してください',

  /**
   * 郵便番号
   */
  postalCode: '7ケタの数字で入力してください',

  /**
   * URL
   */
  url: 'URLを入力してください',

  _error: '入力エラーがあります',
};
