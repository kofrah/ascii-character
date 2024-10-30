"use client";

import Image from "next/image";
import headerForLightMode from "../../../../public/headerForLightMode.png";
import headerForDarkMode from "../../../../public/headerForDarkMode.png";
import { useEffect, useState } from "react";

const LightModeComponent = () => (
  <Image
    src={headerForLightMode}
    alt="デカ文字ジェネレータ"
    width={500}
    height={300}
  />
);

const DarkModeComponent = () => (
  <Image
    src={headerForDarkMode}
    alt="デカ文字ジェネレータ"
    width={500}
    height={300}
  />
);

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // ダークモードかどうかを確認
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    console.log("mediaQuery", mediaQuery);
    setIsDarkMode(mediaQuery.matches);

    // ダークモードの切り替えをリッスン
    const handleChange: (event: MediaQueryListEvent) => void = (event) => {
      setIsDarkMode(event.matches);
    };
    mediaQuery.addEventListener("change", handleChange);

    // クリーンアップ
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDarkMode ? <DarkModeComponent /> : <LightModeComponent />;
}
