# react-memoization-optimizer

![version](https://img.shields.io/github/v/tag/zzzsj1228/react-memoization-optimizer)
![license](https://img.shields.io/github/license/zzzsj1228/react-memoization-optimizer)

一个开源 Agent Skill：帮助 React 开发者正确使用 `useMemo` / 
`useCallback`，先测量再优化，避免过度 memo。

## 用途
- 审查 React 组件中的 memo 使用是否合理。
- 指出可删除的 useMemo/useCallback。
- 修复依赖数组、引用不稳定、Context value 抖动等问题。
- 给出可验证的最小改动。

## 使用
把 `SKILL.md` 加载到你的 Agent / Skill 平台。

## 案例
- [反例：过度使用 useMemo/useCallback](./examples/bad-overuse.tsx)
- [正例：传给 memo 子组件 + 昂贵计算](./examples/good-memo-child.tsx)
- [测试案例](./tests/cases.md)

## 贡献
见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## License
MIT
