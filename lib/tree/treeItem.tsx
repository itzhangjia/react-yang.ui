import React, { ChangeEventHandler, useState } from "react"
import scopedClassMaker from '../classes'

interface Props {
    item: treedata;
    level: number;
    treeProps: TreeProps;
}
const scopedClass = scopedClassMaker('yang-tree')
const RenderTree: React.FC<Props> = (props) => {
    const { item, level, treeProps } = props;
    const [expand, setexpand] = useState(false)
    const classes = {
        ['level-' + level]: true,
        item: true,
    }
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
        if (treeProps.multiple) {
            if (e.target.value) {
                treeProps.onChange([...treeProps.selected, item.value])
            } else {
                treeProps.onChange(
                    treeProps.selected.filter((i) => {
                        return i !== item.value
                    })
                )
            }
        } else {
            if (e.target.checked) {
                treeProps.onChange(item.value);
            } else {
                treeProps.onChange('');
            }
        }
    }
    return (
        <div className={scopedClass(classes)} key={item.value}>
            <label className={scopedClass('text')}>
                <input
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
            <div className={scopedClass({ children: true, gone: !expand })}>
                {item.children &&
                    item.children.map((item) => <RenderTree key={item.value} item={item} level={level + 1} treeProps={treeProps} ></RenderTree>)}
            </div>
        </div>
    )
}
export default RenderTree