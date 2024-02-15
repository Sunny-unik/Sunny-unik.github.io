import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";
import applyTheme from "./scripts/applyTheme";

applyTheme();
initScrollReveal(targetElements, defaultProps);
initTiltEffect();
