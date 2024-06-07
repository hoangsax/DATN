import { common } from "./common";
import { dark } from "./dark";
import { light } from "./light";

const DarkTheme = {...common,...dark};
const LightTheme = {...common,...light};

type ThemeTypes = typeof DarkTheme | typeof LightTheme

export {DarkTheme,LightTheme, ThemeTypes};