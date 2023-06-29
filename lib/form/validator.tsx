import { anyObject } from './form'
interface Formrule {
  name: string
  maxLength?: number
  minLength?: number
  required?: boolean
  pattern?: RegExp
}
type Rules = Array<Formrule>

const validator = (formData: anyObject, rules: Rules) => {
  let errors: any = {}
  const addRules = (key: string, reason: string) => {
    if (errors[key] === undefined) {
      errors[key] = []
    }
    errors[key].push(reason)
  }
  rules.forEach((item) => {
    const value = formData[item.name]
    if (item.required) {
      if (value === undefined || value === '' || value === null) {
        addRules(item.name, '这是必填哦!')
      }
    }
    if (item.maxLength) {
      if (value.length > item.maxLength) {
        addRules(item.name, '太长~')
      }
    }
    if (item.minLength) {
      if (value.length < item.minLength) {
        addRules(item.name, '太短~')
      }
    }
    if (item.pattern) {
      if (!item.pattern.test(value)) {
        addRules(item.name, '格式不对~')
      }
    }
  })
  return errors
}
export default validator
