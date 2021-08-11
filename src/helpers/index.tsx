export const getInitials = (name: string) => {
  let initials: string | Array<string> = name.split(' ');
  if (initials.length > 1) {
    initials =
      initials[0][0].toUpperCase() +
      initials[initials.length - 1][0].toUpperCase();
  } else if (initials.length === 1) {
    initials = initials[0][0].toUpperCase();
  }
  return initials;
};
