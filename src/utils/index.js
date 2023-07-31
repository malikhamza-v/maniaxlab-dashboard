export const getDaysFromStart = (created_at) => {
  const currentTime = new Date().getTime();
  const createTime = new Date(created_at).getTime();
  const days = parseInt((currentTime - createTime) / 86400000);
  return days === 0 ? 1 : days;
};

export const getRemainingDays = (created_at, max_days) => {
  const days_from_start = getDaysFromStart(created_at);
  return ((days_from_start * 100) / max_days).toFixed(1);
};
