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
.__sf-calendar > * {
  box-sizing: border-box;
}

.__sf-calendar {
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  user-select: none;
  font-size: 1em;
}
.__sf-calendar .navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
}
.__sf-calendar .prev,
.__sf-calendar .next {
  padding: 1em;
  cursor: pointer;
}
.__sf-calendar .period {
  width: 100%;
  font-size: 1.2em;
  font-weight: 400;
  text-align: center;
}
.__sf-calendar .week {
  display: flex;
  font-size: 0.9em;
}
.__sf-calendar .week.rtl {
  flex-direction: row-reverse;
}
.__sf-calendar .month {
  display: flex;
  flex-wrap: wrap;
  padding: 0.4em 0;
  cursor: pointer;
}
.__sf-calendar .month.rtl {
  flex-direction: row-reverse;
}
.__sf-calendar .day {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 7);
  padding: 1em;
  cursor: pointer;
  border: 1px solid transparent;
}
.__sf-calendar .day.is-disabled {
  cursor: not-allowed;
  opacity: 0.3;
}

.__sf-calendar .week {
  color: ${primary}!important;
  font-size: 1.2em;
}

.__sf-calendar .day.is-weekend {
  color: ${selected};
}

.__sf-calendar .day.is-highlight {
  background-color: ${secondary};
  color: #000;
}

.__sf-calendar .day.is-today {
  color: #000;
  background-color: #fff;
  border-color: ${selected};
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
