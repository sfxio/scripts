// reference:  https://stackoverflow.com/questions/6367010/average-2-hex-colors-together-in-javascript
// blend two hex colors together by an amount
export default function blendColors(colorA: string, colorB: string, amount: number = 0.5) {
  const [rA, gA, bA] = colorA.match(/\w\w/g)!.map((c) => parseInt(c, 16));
  const [rB, gB, bB] = colorB.match(/\w\w/g)!.map((c) => parseInt(c, 16));
  const r = Math.round(rA + (rB - rA) * amount)
    .toString(16)
    .padStart(2, '0');
  const g = Math.round(gA + (gB - gA) * amount)
    .toString(16)
    .padStart(2, '0');
  const b = Math.round(bA + (bB - bA) * amount)
    .toString(16)
    .padStart(2, '0');
  return `#${r}${g}${b}`;
}

export const createHelloWeekColor = (primary: string, secondary: string, selected: string) => {
  const css = `
.__sf-calendar .week {
  color: ${primary}!important;
  font-size: 1.2em;
}

.__sf-calendar .day.is-weekend {
  color: ${selected};
}

.__sf-calendar .day.is-highlight {
  background-color: ${secondary};
  color: #fff;
}

.__sf-calendar .day.is-today {
  background-color: ${primary};
  color: #fff;
}

.__sf-calendar .day.is-selected {
  background-color: ${selected} !important;
  color: #fff !important;
}

.__sf-calendar .day.is-begin-range,
.__sf-calendar .day.is-end-range {
  background-color: ${primary} !important;
  color: #fff !important;
}

.__sf-calendar .day.is-disabled {
  cursor: not-allowed;
  opacity: 0.33;
}`;

  return css;
};

