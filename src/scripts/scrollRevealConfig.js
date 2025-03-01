export const defaultProps = {
  easing: "cubic-bezier(0.5, 0, 0, 1)",
  distance: "30px",
  duration: 1000,
  desktop: true,
  mobile: true,
};

export const targetElements = [
  {
    element: ".section-title",
    animation: {
      delay: 300,
      distance: "0px",
      origin: "bottom",
    },
  },
  {
    element: ".hero-title",
    animation: {
      delay: 450,
      origin: window.innerWidth > 768 ? "left" : "bottom",
    },
  },
  {
    element: ".hero-cta",
    animation: {
      delay: 900,
      origin: window.innerWidth > 768 ? "left" : "bottom",
    },
  },
  {
    element: ".about-wrapper__image",
    animation: {
      delay: 600,
      origin: "bottom",
    },
  },
  {
    element: ".about-wrapper__info",
    animation: {
      delay: 800,
      origin: window.innerWidth > 768 ? "left" : "bottom",
    },
  },
  {
    element: ".contact-form__text",
    animation: {
      delay: 600,
      origin: "top",
    },
  },
  {
    element: ".contact-form [placeholder]:nth-child(even)",
    animation: {
      delay: 600,
      origin: "left",
    },
  },
  {
    element: ".contact-form [placeholder]:nth-child(odd)",
    animation: {
      delay: 600,
      origin: "right",
    },
  },
  {
    element: ".contact-form button",
    animation: {
      delay: 600,
      origin: "bottom",
    },
  },
  {
    element: ".exp-label",
    animation: {
      delay: 450,
      origin: window.innerWidth > 900 ? "right" : "bottom",
    },
  },
  {
    element: ".exp-icon",
    animation: {
      delay: 450,
      origin: window.innerWidth > 900 ? "bottom" : "top",
    },
  },
];
