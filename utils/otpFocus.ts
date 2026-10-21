type InputRef = { current: HTMLInputElement | null };

export const focusNextInput = (index: number, refs: InputRef[]) => {
  if (index < refs.length - 1 && refs[index + 1].current) {
    refs[index + 1].current?.focus();
  }
};

export const focusPreviousInput = (index: number, refs: InputRef[]) => {
  if (index > 0 && refs[index - 1].current) {
    refs[index - 1].current?.focus();
  }
};
