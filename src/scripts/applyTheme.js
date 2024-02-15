export default function () {
  const darkPreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  darkPreference && document.documentElement.setAttribute("data-theme", "dark");
}
