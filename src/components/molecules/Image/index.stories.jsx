import React from 'react';
import Image from '.';

const notes = { notes: '縦横400pxのdivでラップしている。borderは分かりやすくするためにつけている。(コンポーネントにborderは含まれない)' };

export default stories => stories
  .addDecorator(storyFn => <div style={{ width: 400, height: 400, border: '1px solid' }}>{storyFn()}</div>)
  .add('default', () => <Image alt="sample" src="/img/samples/4hH8MJBQYYE.jpg" />, notes)
  .add('not exist', () => <Image alt="not found" src="/img/__not_exist__.png" />, notes)
  .add('横長 size=auto', () => (
    <Image alt="Unsplash" src="/img/samples/photo-1547553446-5fce7588838b.jpeg" />
  ), notes)
  .add('縦長 size=auto', () => (
    <Image alt="Unsplash" src="/img/samples/photo-1547555348-afbf433abfe6.jpeg" />
  ), notes)
  .add('横長 size=cover', () => (
    <Image alt="Unsplash" src="/img/samples/photo-1547553446-5fce7588838b.jpeg" size="cover" />
  ), notes)
  .add('縦長 size=cover', () => (
    <Image alt="Unsplash" src="/img/samples/photo-1547555348-afbf433abfe6.jpeg" size="cover" />
  ), notes)
  .add('IE11,Edge 横長 size=cover', () => (
    <Image hasObjectFit={false} alt="Unsplash" src="/img/samples/photo-1547553446-5fce7588838b.jpeg" size="cover" />
  ), notes)
  .add('IE11,Edge 縦長 size=cover', () => (
    <Image hasObjectFit={false} alt="Unsplash" src="/img/samples/photo-1547555348-afbf433abfe6.jpeg" size="cover" />
  ), notes);
