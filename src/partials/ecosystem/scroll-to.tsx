import React, { useEffect, useRef } from 'react';
import { useInstantSearch } from 'react-instantsearch-hooks-web';

export default function ScrollTo({ children }: { children: React.ReactNode }) {
  const { use } = useInstantSearch();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const middleware = () => {
      return {
        onStateChange() {
          const isFiltering = document.body.classList.contains('filtering');
          const isTyping =
            document.activeElement?.tagName === 'INPUT' && document.activeElement?.getAttribute('type') === 'search';

          if (isFiltering || isTyping) {
            return;
          }

          containerRef.current!.scrollIntoView();
        },
      };
    };

    return use(middleware);
  }, [use]);

  return (
    <div ref={containerRef} className="ais-ScrollTo">
      {children}
    </div>
  );
}
