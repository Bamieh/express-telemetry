export function convertToMs(diff) {
  return diff[0] * 1e3 + diff[1] * 1e-6;
}

export default function hrtimeMs(startAt) {
  const diff = process.hrtime(startAt);
  return convertToMs(diff)
}
