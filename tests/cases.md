# 测试案例

## 案例 1：函数没传给 memo 子组件
输入：组件内使用 useCallback，但函数只在本组件内调用。
期望：建议删除 useCallback。

## 案例 2：大数组 filter 传给 memo 子组件
输入：items 很大，filtered 传给 React.memo 的 List。
期望：建议保留 useMemo，并检查 onSelect 是否需要 useCallback。

## 案例 3：空依赖但用了 props
输入：useCallback(() => console.log(props.id), [])。
期望：指出依赖缺失，建议改为 [props.id]。

## 案例 4：Context value 是对象
输入：Provider value={{ user, setUser }}。
期望：建议 useMemo 稳定 value，避免消费者无意义重渲染。

## 案例 5：简单计算
输入：useMemo(() => a + b, [a, b])。
期望：建议删除，除非有 Profiler 证据。

## 案例 6：函数作为其他 Hook 依赖
输入：useEffect(() => { fetchData(id) }, [fetchData])，fetchData 
是组件内定义的函数。
期望：建议 useCallback 稳定 fetchData，或把 fetchData 移到组件外。
