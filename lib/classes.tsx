// 高阶函数 返回 classname 名称

interface options {
    extra?: string;
}
function scopedClassMaker(perfix:string){
    return function x(name?:string,options?:options){
        let result=[perfix,name].filter(Boolean).join(" ")
        if(options&&options.extra){
            return [result,options.extra].filter(Boolean).join("-")
        }else{
            return result
        }
        
    }
}
export default scopedClassMaker