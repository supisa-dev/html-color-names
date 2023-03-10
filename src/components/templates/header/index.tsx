import { useState } from 'react';
import Logo from '@/components/atoms/logo';
import Ball from '@/components/atoms/ball';
import { getRandomColor } from '@/utils/getRandomColor';

export default function Header() {
  const [logoColor, setLogoColor] = useState('#eeeeee');
  const [colorBalls, setColorBalls] = useState<string[]>([]);

  const onChangeColor = (idx: number | void, color: string | void) => {
    if (color && color !== logoColor) {
      setLogoColor(color);
      setColorBalls((prev: string[]): string[] => {
        return prev.filter((_element, _idx) => _idx !== idx);
      });
    }

    if (!color) {
      const randomColor = getRandomColor();

      setLogoColor(randomColor);
      setColorBalls((prev: string[]): string[] => {
        if (prev.length === 8) {
          const tempColorBalls = prev.slice(1, 8);
          return [...tempColorBalls, logoColor];
        }

        return [...prev, logoColor];
      });
    }
  };

  return (
    <header className="bg-[#10172a] z-10">
      <div className="w-full h-auto max-w-5xl mx-auto my-0 flex items-center justify-between">
        <Logo logoColor={logoColor} onChangeColor={onChangeColor} />
        <div className="w-auto h-auto flex items-center gap-2">
          {colorBalls.length !== 0 ? (
            colorBalls.map((_element, _idx) => {
              return (
                <Ball
                  key={_idx}
                  idx={_idx}
                  color={_element}
                  onChangeColor={onChangeColor}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
}
