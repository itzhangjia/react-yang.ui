interface treedata {
    text: string;
    value: string;
    children?: treedata[];
}

type TreeProps = {
    treeData: treedata[],
} & ({
    multiple: true,
    selected: string[],
    onChange: (values: string[]) => void
} | {
    multiple?: false,
    selected: string,
    onChange: (values: string) => void
})