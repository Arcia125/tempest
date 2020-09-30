/**
 * @returns diplay string for a percentage
 * @example pct(100) // '100%'
 * pct(NaN) // '-%'
 * pct(66.66667) // '66.67%'
 * pct(0) // '0%'
 */
export const pct = (percentage: number) => {
  const niceNum = Math.round((percentage + Number.EPSILON) * 100) / 100;
  return `${Number.isNaN(niceNum) ? '-' : niceNum}%`
};
