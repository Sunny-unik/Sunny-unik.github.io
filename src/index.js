import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./scripts/scrollRevealConfig";
import applyTheme from "./scripts/applyTheme";
import addDynamicContent from "./scripts/addDynamicContent";
import addFormEvents from "./scripts/addFormEvents";
import initChat from "./scripts/chat";
import "./styles/chat.scss";

applyTheme();
addDynamicContent();
addFormEvents();
initScrollReveal(targetElements, defaultProps);
initTiltEffect();
initChat();
