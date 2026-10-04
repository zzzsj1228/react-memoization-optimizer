---
name: react-memoization-optimizer
description: 审查 React 中 useMemo/useCallback 的使用，先测量再优化，避免过度 memo，修复依赖数组与引用不稳定问题。
---

# React useMemo / useCallback 优化

## 目标
帮助用户判断何时该用 useMemo/useCallback，何时不该用，并给出可验证的最小改动。

## 核心原则
- 先测量，后优化。没有 Profiler 证据不默认加 memo。
- useMemo 缓存计算结果；useCallback 缓存函数引用。它们不保证性能提升。
- useCallback 有价值的情况：函数传给 React.memo 子组件、作为其他 Hook 依赖、进入 Context value。
- useMemo 有价值的情况：计算确实昂贵、结果作为 memo 子组件 props、作为 Hook 依赖或 Context value。
- 依赖数组必须完整、诚实，用 eslint-plugin-react-hooks 检查。
- 优先更简单的重构：组件拆分、状态下移、children 提升、Context 拆分、虚拟列表。
- useMemo 不是语义保证，不要依赖它保证正确性。
- 不缓存 `a + b`、`props.name` 这类廉价表达式。
- 不用空依赖数组掩盖陈旧闭包。

## 决策流程
1. 有 Profiler 数据吗？没有先测量。
2. 函数是否传给 React.memo 子组件 / 作为 Hook 依赖 / 进入 Context value？否则通常删掉 useCallback。
3. 值是否昂贵 / 作为 memo props / 作为 Hook 依赖？否则通常删掉 useMemo。
4. 依赖数组完整吗？不完整就修。
5. 有更简单的重构方案吗？有就优先。
6. 验证：Profiler 前后对比、测试、lint。

## 输出格式
1. 结论：是否需要 useMemo/useCallback。
2. 依据：渲染热点、引用变化、计算成本。
3. 建议代码：最小 diff。
4. 验证：Profiler、测试、lint。
5. 替代方案：更简单的重构。

## 反例
```tsx
const value = useMemo(() => a + b, [a, b]);
const onClick = useCallback(() => setCount(c => c + 1), []);
```
如果没有传给 memo 子组件，也没作为依赖，这些通常没必要。
## 正例
```tsx
const List = React.memo(function List({ items, onSelect }) {
  return items.map(item => (
    <button key={item.id} onClick={() => onSelect(item.id)}>
      {item.name}
    </button>
  ));
});

function App({ items }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => items.filter(item => item.name.includes(query)),
    [items, query]
  );
  const onSelect = useCallback((id) => {
    console.log(id);
  }, []);

  return <List items={filtered} onSelect={onSelect} />;
}
```


