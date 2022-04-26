// 定义类型接口
interface objType {
    [key: string]:
    | string
    | number
    | boolean
    | undefined
    | null
    | symbol
    | obj[]
    | (() => void);
}
interface objType1 {
    [key: string]:
    | string
    | number
}
export { objType, objType1 }
