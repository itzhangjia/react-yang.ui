// 高阶函数 返回 classname 名称

function scopedClassMaker(perfix:string){
    return function x(name?:string){
        return [perfix,name].filter(Boolean).join("-")
    }
}
export default scopedClassMaker