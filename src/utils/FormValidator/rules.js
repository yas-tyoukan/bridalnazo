import { errorMessagesSeparator } from './constants';
// 数値の最大値
const MAX_NUMBER = 2147483647;

/* eslint-disable react/no-this-in-sfc */
// rulesはthisがFormValicatorのインスタンスである前提で作っている
export default {
  /**
   * 必須チェック
   * null, undefinedでないこと
   * 文字列の場合、空文字でないこと。trimしてcoも空文字にならないこと。
   * 配列の場合、長さが０でないこと
   *
   * @param props
   * @param propName
   * @returns {*}
   */
  isRequired(props, propName) {
    const { [propName]: v } = props;
    if (v == null
      || (typeof v === 'string' && !v.trim())
      || (Array.isArray(v) && !v.length)) {
      return this.messageCreator({ ruleName: 'isRequired' });
    }
    return null;
  },

  /**
   * 整数値チェック
   * @param min
   * @param max
   * @returns {function(*, *)}
   */
  intRange(min, max) {
    return function check(props, propName) {
      const { [propName]: value } = props;
      // nullまたはundefinedはOK
      if (value == null || value === '') {
        return null;
      }
      // 以下、いずれかの場合はエラー
      // ・数値のみじゃない
      // ・minが指定されていてminより小さい
      // ・max(未指定の場合は最大値)より大きい
      const num = parseInt(value, 10);
      if (!/^[0-9]+$/.test(value)
        || (min != null && num < min)
        || (max != null ? max : MAX_NUMBER) < num) {
        // maxは引数で指定なし、且つ、エラーの時のみ、デフォルト最大値を渡す
        return this.messageCreator({
          ruleName: 'intRange',
          params: [min, (max == null && MAX_NUMBER < num ? MAX_NUMBER : max)],
        });
      }
      return null;
    };
  },

  /**
   * 文字列最大長チェック
   * @param max
   * @param allCharacterAvailable
   * @returns {check}
   */
  maxLength(max, allCharacterAvailable = true) {
    return function check(props, propName) {
      const { [propName]: value } = props;
      if (value && value.length != null && max < value.length) {
        return this.messageCreator({ ruleName: 'maxLength', params: [max, allCharacterAvailable] });
      }
      return null;
    };
  },

  /**
   * 文字列最小数チェック
   * @param min
   * @param allCharacterAvailable
   * @returns {function(*, *)}
   */
  minLength(min, allCharacterAvailable = true) {
    return function check(props, propName) {
      const { [propName]: value } = props;
      if (value && value.length != null && value.length < min) {
        return this.messageCreator({ ruleName: 'minLength', params: [min, allCharacterAvailable] });
      }
      return null;
    };
  },

  /**
   * 電話番号チェック
   * @param props
   * @param propName
   * @returns {*}
   */
  tel(props, propName) {
    const { [propName]: value } = props;
    // 電話番号の正規表現
    // 数値またはハイフンで10文字以上15文字以下かどうかのチェック（緩いチェック）
    if (value != null && value !== '' && !/^[\d-]{10,15}$/.test(value)) {
      return this.messageCreator({ ruleName: 'tel' });
    }
    return null;
  },

  /**
   * メールアドレスチェック
   * @param props
   * @param propName
   * @returns {*}
   */
  mailAddress(props, propName) {
    // メールアドレスの正規表現
    // W3Cが定義しているinput[type=email]で使用される正規表現を使っている
    const mailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const { [propName]: value } = props;
    const messages = [];
    if (!value) {
      return null;
    }
    if (!mailRegExp.test(value)) {
      messages.push(this.messageCreator({ ruleName: 'mailAddress' }));
    }
    const maxLength = 255;
    if (value && value.length > maxLength) {
      // 長すぎるメールアドレスもエラー
      messages.push(this.messageCreator({ ruleName: 'maxLength', params: [maxLength] }));
    }
    return messages.join(errorMessagesSeparator);
  },

  date(props, propName) {
    // 日付正規表現
    // input[type=date]前提なので、"yyyy-mm-dd"のフォーマット
    const { [propName]: v } = props;
    if (v && !/^\d{4}([-/])\d{2}([-/])\d{2}$/.test(v)) {
      return this.messageCreator({ ruleName: 'date' });
    }
    return null;
  },

  time(props, propName) {
    // 時刻正規表現
    // input[type=time]前提なので、"hh:mm"のフォーマット
    // TODO input[type=time]はIE11やSafari(PC)では対応していないので、
    // 厳密にチェックするのが望ましい。あるいは未対応ブラウザのために特別にUIを用意するなど。
    const { [propName]: v } = props;
    // hhが00〜24、mmが00〜59の範囲であることをチェック
    if (v && !/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/.test(v)) {
      return this.messageCreator({ ruleName: 'time' });
    }
    return null;
  },

  /**
   * パスワードルール
   * @param props
   * @param propName
   * @returns {*}
   */
  password(props, propName) {
    const { [propName]: v } = props;
    if (!v) {
      return null;
    }
    const messages = [];
    // 英数混在である、かつ、半角英数記号で8文字以上である、ことをチェック
    if (!/^(?=.*?[a-zA-Z])(?=.*?\d)[!-~]{8,}$/.test(v)) {
      messages.push(this.messageCreator({ ruleName: 'password' }));
    }
    const maxLength = 64;
    if (v.length > maxLength) {
      // 64文字を超える場合もエラー
      messages.push(this.messageCreator({ ruleName: 'maxLength', params: [maxLength] }));
    }
    return messages.join(errorMessagesSeparator);
  },

  /**
   * 確認用パスワードルール
   * @param passwordProp
   * @returns {*}
   */
  passwordCheck(passwordProp) {
    return function check(props, propName) {
      const { [propName]: v, [passwordProp]: password } = props;
      // 確認用パスワード入力がパスワードと一致しているか
      if (v !== password) {
        return this.messageCreator({ ruleName: 'passwordCheck' });
      }
      return null;
    };
  },

  /**
   * カナ（カタカナ、ひらがな)
   * @param props
   * @param propName
   * @returns {*}
   */
  kana(props, propName) {
    const { [propName]: v } = props;
    if (!v) {
      return null;
    }
    // eslint-disable-next-line  no-irregular-whitespace
    if (!/^([ァ-ヴー　 ]*|[ぁ-んー　 ]*)$/.test(v)) {
      // 全てカタカナまたは全てひらがなのみ許容
      return this.messageCreator({ ruleName: 'kana' });
    }
    return null;
  },

  /**
   * 郵便番号
   * @param props
   * @param propName
   * @returns {*}
   */
  postalCode(props, propName) {
    const { [propName]: v } = props;
    if (!v) {
      return null;
    }
    if (!/^\d{7}$/.test(v)) {
      return this.messageCreator({ ruleName: 'postalCode' });
    }
    return null;
  },

  /**
   * URL
   */
  url(props, propName) {
    const { [propName]: v } = props;
    if (!v || /^https?:\/\/.+$/.test(v)) {
      return null;
    }
    return this.messageCreator({ ruleName: 'url' });
  },

  // ルールは適宜追加する
  // ルールの作成にパラメータが必要なものは、ルール関数を返す関数にする
  // ルール関数はオブジェクトと、プロパティ名を受け取り、オブジェクトが持つプロパティ名がルールを満たしているかを判定する関数を作る
  // 満たしている場合はnullを返し、満たしていない場合は、エラーメッセージ生成関数を返す
};
/* eslint-enable react/no-this-in-sfc */
