
export function getTimeString(d: Date): string {
  var hr =
    d.getHours() > 9 ? d.getHours().toString() : '0' + d.getHours().toString();
  var min =
    d.getMinutes() > 9
      ? d.getMinutes().toString()
      : '0' + d.getMinutes().toString();
  var sec =
    d.getSeconds() > 9
      ? d.getSeconds().toString()
      : '0' + d.getSeconds().toString();
  return hr + ':' + min + ':' + sec;
}
export function isNumber(value: any): value is number {
  return !isNaN(toInteger(value));
}
export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}
export function UXErrors(res: any): string {
  var mess = '';

  if (res && res.error && res.error.message) {
    mess = mess + res.error.message + '\n';
    if (res.error.ModelState && Object.keys(res.error.ModelState).length > 0) {
      for (let key of Object.keys(res.error.ModelState)) {
        for (let err of res.error.ModelState[key]) {
          mess = mess + err + '\n';
        }
      }
    }
    //  return  message string
    return mess;
  }

  if (res && res.exception && res.exception.Message) {
    mess = mess + res.Exception.Message + '\n';
    return mess;
  }
  return JSON.stringify(res);
}


