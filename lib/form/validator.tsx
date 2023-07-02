import { anyObject } from './form'
interface Formrule {
  key: string
  maxLength?: number
  minLength?: number
  required?: boolean
  pattern?: RegExp
  validator?: { name: string; validatorFn: (key: string) => Promise<void> }
}
interface error {
  message?: string
  promise?: Promise<any>
}
type Rules = Array<Formrule>

//辅助方法 flat
const flatArr = (arr: Array<any>) => {
  const newArr: any[] = []
  arr.forEach((item: any) => {
    if (item instanceof Array) {
      newArr.push(...item)
    } else {
      newArr.push(item)
    }
  })
  return newArr
}
const ObjecetMap = (errors: any) => {
  let obj: any = {}
  Object.keys(errors).forEach((item) => {
    obj[item] = errors[item].map((i: any) => i.message)
  })
  return obj
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
    if (item.validator) {
      const promiseResult = item.validator.validatorFn(value)
      addRules(item.key, { message: '用户名已经存在', promise: promiseResult })
    }
    if (item.required) {
      if (value === undefined || value === '' || value === null) {
        addRules(item.key, { message: '这是必填哦!' })
      }
    }
    if (item.maxLength) {
      if (value.length > item.maxLength) {
        addRules(item.key, { message: '太长~' })
      }
    }
    if (item.minLength) {
      if (value.length < item.minLength) {
        addRules(item.key, { message: '太短~' })
      }
    }
    if (item.pattern) {
      if (!item.pattern.test(value)) {
        addRules(item.key, { message: '格式不对~' })
      }
    }
  })

  const promiseList = flatArr(Object.values(errors))
    .filter((item: error) => item.promise)
    .map((v) => v.promise)
  Promise.all(promiseList).then(
    () => callBack(ObjecetMap(errors)),
    () => callBack(ObjecetMap(errors))
  )
  // return errors
}
export default validator
