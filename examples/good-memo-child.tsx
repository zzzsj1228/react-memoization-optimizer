import React, { useCallback, useMemo, useState } from 'react';

const List = React.memo(function List({
  items,
  onSelect,
}: {
  items: { id: string; name: string }[];
  onSelect: (id: string) => void;
}) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <button onClick={() => onSelect(item.id)}>{item.name}</button>
        </li>
      ))}
    </ul>
  );
});

export function GoodMemoChild({
  items,
}: {
  items: { id: string; name: string }[];
}) {
  const [query, setQuery] = useState('');

  // 过滤有成本，结果传给 memo 子组件，用 useMemo 合理
  const filtered = useMemo(
    () => items.filter(item => item.name.includes(query)),
    [items, query]
  );

  // 函数传给 memo 子组件，用 useCallback 合理
  const onSelect = useCallback((id: string) => {
    console.log(id);
  }, []);

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <List items={filtered} onSelect={onSelect} />
    </>
  );
}
