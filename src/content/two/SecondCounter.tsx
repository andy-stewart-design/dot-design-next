"use client";

import { useState } from "react";
import s from "./counter.module.css";

export default function TextComponent() {
  const [count, setCount] = useState(0);

  return (
    <button className={s.btn} onClick={() => setCount(count + 1)}>
      the count is {count}
    </button>
  );
}
