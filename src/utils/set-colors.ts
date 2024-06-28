type ColorMap = {
  [key: string]: string;
};

export const setColor = (scope: string, event: string, filtered?: string) => {

  
  
  const defaultColorMap: ColorMap = {

    //Colors for the events in the scopes "L", "R" and "N"
    'R-views': '#F1686A',
    'R-downloads': '#F57B90',
    'R-outlinks': '#F88DB6',
    'R-conversions': '#fff0aa',

    'N-views': '#059FCC',
    'N-downloads': '#05AFE0',
    'N-outlinks': '#05C0F6',
    'N-conversions': '#fff0aa',

    'L-views': '#7C3E7B',
    'L-downloads': '#8F70A0',
    'L-outlinks': '#ADB3D7',
    'L-conversions': '#fff0aa',

    //Colors for all the sum of all the events in the scopes "L", "R" and "N"
    'L-ALL': '#8B92B3',
    'R-ALL': '#D9BAB9',
    'N-ALL': '#13D7FC',

  };

  const filteredColorMap: ColorMap = {
    //Colors for the events in the scopes "L", "R" and "N" with opacity filter
    'R-views': '#F8B4B5',
    'R-downloads': '#FBC6CF',
    'R-outlinks': '#FDD9E6',
    'R-conversions': '#fff0aa',

    'N-views': '#059FCC',
    'N-downloads': '#05AFE0',
    'N-outlinks': '#05C0F6',
    'N-conversions': '#fff0aa',

    'L-views': '#9E4F9D',
    'L-downloads': '#A78FB4',
    'L-outlinks': '#C4C8E2',
    'L-conversions': '#fff0aa',

    //Colors for the events in the "ALL" scope
    'ALL-views': '#CCCCCC',
    'ALL-downloads': '#D6D6D6',
    'ALL-outlinks': '#E0E0E0',
    'ALL-conversions': '#fff0aa',

    //Colors for the scope labels
    'L-L': '#8B92B3',
    'R-R': '#D9BAB9', 
    'N-N': '#06B9ED'
  };

  const colorMap = filtered ? filteredColorMap : defaultColorMap;
  const key = `${scope}-${event}`;
  return colorMap[key] || '#B8B8B8';
};
