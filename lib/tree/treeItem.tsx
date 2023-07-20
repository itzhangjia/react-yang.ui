import React, { ChangeEventHandler, useRef, useState } from "react"
import scopedClassMaker from '../classes'
import useUpdates from "../../lib/hooks/useUpdates";
interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> { }
interface Props {
    item: treedata;
    level: number;
    treeProps: TreeProps;
    onItemChange: (values: string[]) => void;
}
const scopedClass = scopedClassMaker('yang-tree')
const RenderTree: React.FC<Props> = (props) => {
    const { item, level, treeProps } = props;
    const [expand, setexpand] = useState(false)
    const classes = {
        ['level-' + level]: true,
        item: true,
    }
    const divRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    useUpdates(expand, () => {
        if (!divRef.current) { return; }
        if (expand) {
            // divRef.current.style.position = 'absolute';
            // divRef.current.style.opacity = '0';
            divRef.current.style.height = 'auto';
            const { height } = divRef.current.getBoundingClientRect();
            // divRef.current.style.position = '';
            // divRef.current.style.opacity = '';
            divRef.current.style.height = '0px';
            divRef.current.getBoundingClientRect();
            divRef.current.style.height = height + 'px';
            // const afterExpand = () => {
            //     if (!divRef.current) { return; }
            //     divRef.current.style.height = '';
            //     divRef.current.classList.add('yang-tree-children-present');
            //     divRef.current.removeEventListener('transitionend', afterExpand);
            // };
            // divRef.current.addEventListener('transitionend', afterExpand);
        } else {
            const { height } = divRef.current.getBoundingClientRect();
            divRef.current.style.height = height + 'px';
            divRef.current.getBoundingClientRect();
            divRef.current.style.height = '0px';
            // const afterCollapse = () => {
            //     if (!divRef.current) { return; }
            //     divRef.current.style.height = '';
            //     divRef.current.classList.add('yang-tree-gone');
            //     divRef.current.removeEventListener('transitionend', afterCollapse);
            // };
            // divRef.current.addEventListener('transitionend', afterCollapse);
        }
    })
    const checked = treeProps.multiple
        ? treeProps.selected.includes(item.value)
        : treeProps.selected === item.value
    const onExpand = () => {
        setexpand(true)
    }
    const onretract = () => {
        setexpand(false)
    }
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const childrenValues = collectChildrenValues(item);
        if (treeProps.multiple) {
            if (e.target.checked) {
                props.onItemChange([...treeProps.selected, item.value, ...childrenValues]);
            } else {
                props.onItemChange(treeProps.selected.filter(value =>
                    value !== item.value && childrenValues.indexOf(value) === -1)
                );
            }
        } else {
            if (e.target.checked) {
                treeProps.onChange(item.value);
            } else {
                treeProps.onChange('');
            }
        }
    };
    const onItemChange = (values: string[]) => {
        const childrenValues = collectChildrenValues(item);
        const common = intersect(values, childrenValues);
        if (common.length !== 0) {
            props.onItemChange(Array.from(new Set(values.concat(item.value))));
            inputRef.current!.indeterminate = common.length !== childrenValues.length;
        } else {
            props.onItemChange(values.filter(v => v !== item.value));
            inputRef.current!.indeterminate = false;
        }
    };
    return (
        <div className={scopedClass(classes)} key={item.value}>
            <label className={scopedClass('text')}>
                <input
                    ref={inputRef}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
                {item.text}
                {item.children && (
                    <>
                        {expand && <span onClick={onretract}>-</span>}
                        {!expand && <span onClick={onExpand}>+</span>}
                    </>
                )}
            </label>
            <div ref={divRef} className={scopedClass({ children: true, gone: !expand })}>
                {item.children &&
                    item.children.map((item) => <RenderTree key={item.value} item={item} level={level + 1} treeProps={treeProps} onItemChange={onItemChange} ></RenderTree>)}
            </div>
        </div>
    )
}
export default RenderTree
function collectChildrenValues(item: treedata): string[] {
    return flatten(item.children && item.children.map(i => [i.value, collectChildrenValues(i)]));
}

function flatten(array?: RecursiveArray<string>): string[] {
    if (!array) { return []; }
    return array.reduce<string[]>((result, current) =>
        result.concat(typeof current === 'string' ? current : flatten(current)), []);
    // const result = [];
    // for (let i = 0; i < array.length; i++) {
    //   if (array[i] instanceof Array) {
    //     result.push(...flatten(array[i] as RecursiveArray<string>));
    //   } else {
    //     result.push(array[i] as string);
    //   }
    // }
    // return result;
}

function intersect<T>(array1: T[], array2: T[]): T[] {
    const result: T[] = [];
    for (let i = 0; i < array1.length; i++) {
        if (array2.indexOf(array1[i]) >= 0) {
            result.push(array1[i]);
        }
    }
    return result;
}