import { ActionImpl, KBarResults, useMatches } from 'kbar';

import ResultItem from './ResultItem';

const RenderResults = () => {
  const { results } = useMatches();

  const renderResult = ({
    item,
    active,
  }: {
    item: string | ActionImpl;
    active: boolean;
  }) => {
    if (typeof item === 'string') {
      return (
        <div className="px-2 py-4 text-xs uppercase opacity-50">{item}</div>
      );
    }

    return <ResultItem action={item} active={active} />;
  };

  return <KBarResults items={results} onRender={renderResult} />;
};

export default RenderResults;
