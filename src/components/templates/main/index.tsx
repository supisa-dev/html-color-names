import { useRouter } from 'next/router';
import useStore from '@/store/useStore';
import Title from '@/components/atoms/title';
import SubTitle from '@/components/atoms/subtitle';
import Search from '@/components/blocks/search';
import Example from '@/components/blocks/example';
import { getNegativeHex } from '@/utils/getNegativeHex';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Card from '@/components/atoms/card';

export interface MainProps {
  type: string;
  hex: string;
  name: string;
}

export default function Main({ type, hex, name }: MainProps) {
  const router = useRouter();

  const searchResult = useStore((state) => state.searchResult);
  const setSearchResult = useStore((state) => state.setSearchResult);
  const setFocusItem = useStore((state) => state.setFocusItem);
  const setSearchListView = useStore((state) => state.setSearchListView);

  if (type === 'color') {
    return (
      <main className="w-full h-[calc(100vh-8rem)] relative">
        <a
          className="absolute top-4 left-4 inline-block w-auto h-auto cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowBack style={{ color: hex }} fontSize="large" />
        </a>
        <Example hex={hex} negativeHex={getNegativeHex(hex)} name={name} />
      </main>
    );
  }

  if (type === 'list') {
    return (
      <main className="w-full h-auto min-h-[calc(100vh-8rem)] relative inline-block">
        <div className="top-4 left-4" />
        <a
          className="sticky top-4 left-4 inline-block w-auto h-auto cursor-pointer"
          onClick={() => {
            setSearchResult([]);
            router.back();
          }}
        >
          <ArrowBack fontSize="large" />
        </a>
        <div className="pb-8 flex flex-wrap justify-around items-start content-center gap-y-5 absolute top-6 left-1/2 -translate-x-1/2 w-[70%] h-auto">
          {searchResult.length !== 0 ? (
            searchResult.map((_element, _idx) => {
              return (
                <Card
                  key={_idx}
                  name={_element.name}
                  hex={_element.hex}
                  negativeHex={getNegativeHex(_element.hex)}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
      </main>
    );
  }
  if (type === 'home') {
    return (
      <main className="w-full h-[calc(100vh-8rem)] relative">
        <div
          className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-auto max-w-screen-full"
          onClick={() => {
            setFocusItem(null);
            setSearchListView(false);
          }}
        >
          <Title />
          <SubTitle />
          <Search />
        </div>
      </main>
    );
  }

  return <></>;
}
