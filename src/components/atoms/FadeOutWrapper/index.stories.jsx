import React from 'react';

import Button from '~/components/atoms/Button';
import FadeOutWrapper from '.';

class Wrapper extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      key: '',
    };
  }

  render() {
    const { key } = this.state;
    return (
      <>
        <FadeOutWrapper key={key}>
          <span role="img" aria-label="">😁</span>
        </FadeOutWrapper>
        <p>FadeOutさせたい要素を表示するためのコンポーネント。childrenに任意の要素を設定できる。</p>
        <Button onClick={() => this.setState({ key: new Date().getTime() })}>
          keyを更新して再描画
        </Button>
      </>
    );
  }
}

export default stories => stories
  .add('default', () => <Wrapper />);
