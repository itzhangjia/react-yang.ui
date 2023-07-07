import { anyObject } from './form'
interface Formrule {
  key: string
  maxLength?: number
  minLength?: number
  required?: boolean
  pattern?: RegExp
  validatorFn?: (username: string) => Promise<string>
}
type error = string | Promise<string>
type Rules = Array<Formrule>

//辅助方法 flat
const flatArr = <T,>(arr: Array<T|T[]>) => {
  const newArr: T[] = []
  arr.forEach((item) => {
    if (item instanceof Array) {
      newArr.push(...item)
    } else {
      newArr.push(item)
    }
  })
  return newArr
}

const hasError=(item: [string, undefined] | [string, string]): item is [string, string] =>{
  return typeof item[1] === 'string';
}
const zip=(kvList: Array<[string, string]>)=> {
  const result: { [key: string]: string[] } = {};
  kvList.map(([key, value]) => {
    result[key] = result[key] || [];
    result[key].push(value);
  });
  return result;
}
export function noError(errors: any) {
  return Object.keys(errors).length === 0
}

const validator = (
  formData: anyObject,
  rules: Rules,
  callBack: (val: any) => void
) => {
  let errors: any = {}
  const addRules = (key: string, reason: error) => {
    if (errors[key] === undefined) {
      errors[key] = []
    }
    errors[key].push(reason)
  }
  //还得加条件判断
  rules.forEach((item) => {
    const value = formData[item.key]
    if (item.validatorFn) {
      const promise = item.validatorFn(value)
      addRules(item.key, promise)
    }
    if (item.required) {
      if (value === undefined || value === '' || value === null) {
        addRules(item.key, 'required')
      }
    }
    if (item.maxLength) {
      if (value.length > item.maxLength) {
        addRules(item.key, 'maxLength')
      }
    }
    if (item.minLength) {
      if (value.length < item.minLength) {
        addRules(item.key, 'minLength')
      }
    }
    if (item.pattern) {
      if (!item.pattern.test(value)) {
        addRules(item.key, 'format')
      }
    }
  })
  //先拆分 再合到一起
  const promiseeArr = flatArr(
    Object.keys(errors).map((key) => errors[key].map((k: error) => [key, k]))
  )
  const newpromiseeArr = promiseeArr.map(([key, promiseOreString]) => {
    const promise =
      promiseOreString instanceof Promise
        ? promiseOreString
        : Promise.reject(promiseOreString)
    return promise.then(
      () => [key, undefined],
      (reject) => [key, reject]
    )
  })
  console.log(newpromiseeArr)

    Promise.all(newpromiseeArr).then(results => {
      callBack(zip(results.filter<[string, string]>(hasError)));
    });
}
export default validator
