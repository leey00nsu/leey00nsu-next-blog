import { Kbd } from '@nextui-org/react';
import { ActionImpl } from 'kbar';
import React from 'react';

import tw from '@/src/libs/tw';

const ResultItem = React.forwardRef(
  (
    {
      action,
      active,
    }: {
      action: ActionImpl;
      active: boolean;
    },
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <div
        ref={ref}
        className={tw(
          'flex cursor-pointer items-center justify-between p-4',
          active && 'border-l-2 border-foreground bg-content2',
        )}
      >
        <div className="flex items-center gap-8 text-base">
          {action.icon && action.icon}
          <div className="flex flex-col">
            <div>
              <span>{action.name}</span>
            </div>
            {action.subtitle && (
              <span className="text-sm">{action.subtitle}</span>
            )}
          </div>
        </div>
        {action.shortcut?.length ? (
          <div className="grid grid-flow-col gap-4" aria-hidden>
            {action.shortcut.map((sc) => (
              <Kbd key={sc}>{sc}</Kbd>
            ))}
          </div>
        ) : null}
      </div>
    );
  },
);

export default ResultItem;
