import { useCallback, useMemo, useState } from 'react';

export function BadOveruse() {
  const [count, setCount] = useState(0);
  const [a] = useState(1);
  const [b] = useState(2);

  // 廉价计算，没有传给 memo 子组件，不需要 useMemo
  const value = useMemo(() => a + b, [a, b]);

  // 只在本组件内使用，没传给 memo 子组件，也没作为依赖，不需要 
useCallback
  const onClick = useCallback(() => setCount(c => c + 1), []);

  return (
    <button onClick={onClick}>
      {value} / {count}
    </button>
  );
}
