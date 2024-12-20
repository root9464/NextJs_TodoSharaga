export const calcColorPriority = (priority: 'low' | 'medium' | 'high') => {
  const colors = {
    low: '#FAD9FF',
    medium: '#D7F0FF',
    high: '#FACBBA',
  };

  return colors[priority];
};
