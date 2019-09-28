import React from 'react';
import { Field } from 'redux-form';
import { action } from '@storybook/addon-actions';
import { createProviderDecorator, ReduxFormDecorator } from '~/components/storyutils';

import TextField from '.';
import MessageWithIcon from '~/components/molecules/MessageWithIcon';
import Typography from '~/components/atoms/Typography';

const onChange = action('onChange');

const options = (
  <>
    <option value={1}>大手町支店</option>
    <option value={2}>品川GW支店</option>
    <option value={3}>流山CP支店</option>
    <option value={4}>中央RK支店</option>
  </>
);

export default stories => stories
  .addDecorator(ReduxFormDecorator)
  .addDecorator(createProviderDecorator())
  .add('default', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
    />
  ))
  .add('fullWidth', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      fullWidth
    />
  ))
  .add('has value', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      defaultValue="ほげほげ"
    />
  ))
  .add('with label', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      label="備考"
    />
  ))
  .add('with placeholder', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      placeholder="今後のより良いサービス改善の為にご意見、ご感想をお願いします。"
    />
  ))
  .add('with error', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      defaultValue="ほげ"
      shouldDisplayError={() => true}
      meta={{ error: '入力に間違いがあります' }}
    />
  ))
  .add('with errors', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      defaultValue="100.12"
      shouldDisplayError={() => true}
      meta={{ error: '整数で入力してください|最低賃金以上の金額を入力してください' }}
    />
  ))
  .add('with description', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      label="ご希望の企業コード"
      description={(
        <MessageWithIcon
          iconProps={{
            name: 'info_outline',
            size: 's',
          }}
        >
          <Typography variant="small2">
            半角英数小文字、ハイフンのご希望の文字列で設定できます。一度設定すると変更できませんのでご注意ください
          </Typography>
        </MessageWithIcon>
      )}
    />
  ))
  .add('with tooltipDescription', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      label="ご希望の企業コード"
      tooltipDescription={(
        <>
          このコードはログイン時に使用します。
          <br />
          忘れないようメモをしておいてください
        </>
      )}
    />
  ))
  .add('required', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      label="ご希望の企業コード"
      required
    />
  ))
  .add('disabled', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      placeholder="今後のより良いサービス改善の為にご意見、ご感想をお願いします。"
      disabled
    />
  ))
  .add('multiline', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      label="複数行入力"
      multiline
    />
  ))
  .add('multiline with error', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      shouldDisplayError={() => true}
      meta={{ error: '1000文字以内で入力してください' }}
      label="複数行入力"
      multiline
    />
  ))
  .add('select', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      defaultValue="1"
      label="店舗"
      select
    >
      {options}
    </Field>
  ))
  .add('select with error', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      shouldDisplayError={() => true}
      meta={{ error: 'エラーがあります' }}
      label="店舗"
      select
    >
      {options}
    </Field>
  ))
  .add('select with placeholder', () => (
    <Field
      name="sample"
      component={TextField}
      onChange={onChange}
      label="店舗"
      placeholder="選択してください"
      select
    >
      {options}
    </Field>
  ))
  .add('select with defaultValue', () => (
    <Field
      name="sample"
      component={TextField}
      onChange={onChange}
      label="店舗"
      placeholder="選択してください"
      defaultValue={2}
      select
    >
      {options}
    </Field>
  ))
  .add('inline TextFieldを並べた例', () => (
    <>
      <Field
        component={TextField}
        name="name1"
        onChange={onChange}
        label="姓"
        inline
      />
      <Field
        component={TextField}
        name="name2"
        onChange={onChange}
        label="名"
        inline
      />
    </>
  ))
  .add('inline textとTextFieldを並べた例', () => (
    <>
      研修期間
      <TextField
        onChange={onChange}
        inline
      />
      日
    </>
  ))
  .add('inputAlign=left', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      defaultValue="hoge"
      label="左寄せ(指定なしと同じ)"
      inputAlign="left"
    />
  ))
  .add('inputAlign=right', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      defaultValue="hoge"
      label="右寄せ"
      inputAlign="right"
    />
  ))
  .add('inputAlign=center', () => (
    <Field
      component={TextField}
      name="name"
      onChange={onChange}
      defaultValue="hoge"
      label="中央"
      inputAlign="center"
    />
  ))
  .add('size=xs', () => (
    <>
      <Field
        component={TextField}
        name="name"
        onChange={onChange}
        defaultValue="hoge"
        inline
        select
        label="text(右寄せ)"
        inputAlign="right"
        size="xs"
      >
        <option value="hoge">hoge</option>
      </Field>
      <Field
        component={TextField}
        name="name"
        onChange={onChange}
        defaultValue="1"
        inline
        select
        label="select"
        size="xs"
      >
        <option value="1">1</option>
      </Field>
    </>
  ))
  .add('size=s', () => (
    <>
      <Field
        component={TextField}
        name="name"
        onChange={onChange}
        defaultValue="hoge"
        inline
        select
        label="text(右寄せ)"
        inputAlign="right"
        size="s"
      >
        <option value="hoge">hoge</option>
      </Field>
      <Field
        component={TextField}
        name="name"
        onChange={onChange}
        defaultValue="1"
        inline
        select
        label="select"
        size="s"
      >
        <option value="1">1</option>
      </Field>
    </>
  ))
  .add('type="date"', () => (
    <Field
      name="sample"
      component={TextField}
      type="date"
      placeholder="日付を入力"
      label="日付指定"
    />
  ))
  .add('type="date"かつiOSデバイスの例', () => (
    <Field
      name="sample"
      component={TextField}
      type="date"
      placeholder="日付を入力"
      label="日付指定"
      clearBtnForDate
    />
  ))
  .add('type="date" かつfullWidth かつiOSデバイスの例', () => (
    <Field
      name="sample"
      component={TextField}
      type="date"
      placeholder="日付を入力"
      label="日付指定"
      fullWidth
      clearBtnForDate
    />
  ))
  .add('type="date"かつiOSデバイスでdisabled(ボタン表示なし)', () => (
    <Field
      name="sample"
      component={TextField}
      type="date"
      placeholder="日付を入力"
      label="日付指定"
      disabled
      clearBtnForDate
    />
  ))
  .add('variant="standart"', () => (
    <Field
      name="sample"
      component={TextField}
      variant="standard"
      label="名前"
    />
  ))
  .add('without Field', () => (
    <TextField
      name="sample"
      multiline
      rowsMax={Infinity}
      defaultValue="hoge\nfuga"
      input={{
        onChange: e => action('onChange')(typeof e === 'string' ? e : e.currentTarget && e.currentTarget.value),
      }}
    />
  ));
