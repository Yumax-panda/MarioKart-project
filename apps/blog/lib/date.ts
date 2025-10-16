const formatter = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "long",
});

export const formatDate = (date: Date): string => formatter.format(date);
