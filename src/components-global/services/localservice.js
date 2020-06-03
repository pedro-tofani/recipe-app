export const convertArrayObjToString = (arrObj) => {
  const arr = arrObj.map((obj) => JSON.stringify(obj));
  return `[${arr.toString()}]`;
};

const func2 = (i, arr, newArr) => {
  if (i < arr.length - 1) {
    newArr.push(JSON.parse(`${arr[i]}}`));
  } else {
    newArr.push(JSON.parse(arr[i]));
  }
};

const func1 = (string) => {
  let str = string;
  str = str.replace(/\[/g, '');
  str = str.replace(/\]/g, '');
  if (!str) {
    return [];
  }
  let arr = [];
  if (str.length > 1) {
    arr = str.split('},');
  }
  const newArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    func2(i, arr, newArr);
  }
  return newArr;
};

export const convertStringToArrayObj = (string) => {
  if (string) {
    return func1(string);
  }
  return null;
};

export const stringToArray = (string) => {
  let str = string;
  if (str) {
    str = str.replace(/\[/g, '');
    str = str.replace(/\]/g, '');
    const arr = str.split(',');
    return arr;
  }
  return [];
};

export const arrayToString = (arr) => (`[${arr.toString()}]`);

export const stringToObj = (str) => {
  const newObj = {};
  if (str) {
    return JSON.parse(str);
  }
  return newObj;
};

export const objToString = (obj) => JSON.stringify(obj);
