import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./scripts/scrollRevealConfig";
import applyTheme from "./scripts/applyTheme";
import addDynamicContent from "./scripts/addDynamicContent";
import addFormEvents from "./scripts/addFormEvents";

applyTheme();
addDynamicContent();
addFormEvents();
initScrollReveal(targetElements, defaultProps);
initTiltEffect();
