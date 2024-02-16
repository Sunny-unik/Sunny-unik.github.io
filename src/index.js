import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";
import applyTheme from "./scripts/applyTheme";
import addDynamicContent from "./scripts/addDynamicContent";

applyTheme();
addDynamicContent();
initScrollReveal(targetElements, defaultProps);
initTiltEffect();
