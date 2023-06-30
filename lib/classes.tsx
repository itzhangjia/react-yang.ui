// 高阶函数 返回 classname 名称

interface options {
  extra?: string
}
interface ClassToggles {
  [K: string]: boolean
}
function classes(...names:(string|undefined)[]){
  return names.filter(Boolean).join(" ")
}
export {classes} 
function scopedClassMaker(perfix: string) {
  return function x(name: string | ClassToggles, options?: options) {
    // let copyName;
    // let result;
    // if (typeof name === 'string' || name === undefined) {
    //   copyName = name
    //   result = [perfix, copyName].filter(Boolean).join('-')
    // } else {
    //   copyName = Object.entries(name)
    //     .filter((item) => item[1])
    //     .map((item) => item[0])
    //   result = copyName
    //     .map((item) => {
    //       return [perfix, item].filter(Boolean).join('-')
    //     })
    //     .join(' ')
    // }
    // if (options && options.extra) {
    //   return [result, options.extra].filter(Boolean).join(' ')
    // } else {
    //   return result
    // }
    //重构以后的
   return Object
    .entries(name instanceof Object ? name : {[name]: name})
    .filter(kv => kv[1] !== false)
    .map(kv => kv[0])
    .map(name => [perfix, name]
      .filter(Boolean)
      .join('-'))
    .concat(options && options.extra || [])
    .join(' ');
  }
}
export default scopedClassMaker
