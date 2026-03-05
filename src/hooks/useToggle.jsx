import { useState } from "react";

export function useToggle(init = false) {
  const [value, setValue] = useState(init);
  function toggle() {
    setValue((value) => !value);
  }
  return { value, toggle };
}
