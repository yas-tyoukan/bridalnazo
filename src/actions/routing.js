export const LOCATION_CHANGE = Symbol('LOCATION_CHANGE');

// eslint-disable-next-line import/prefer-default-export
export function changeLocation(payload) {
  // FIXME
  //  ミドルウェアにconnected-react-routerのrouterMiddlewareを使っても
  //  history.pushで"@@router/LOCATION_CHANGE"が発火しなかった
  //  そのため、history.push時の画面遷移を検知する手段として、routings/PageのcomponentDidUpdateで
  //  このactionをdispatchすることで代替している
  return {
    type: LOCATION_CHANGE,
    payload,
  };
}
