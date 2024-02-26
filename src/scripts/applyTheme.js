export default function () {
  const toggleInput = document.querySelector(".toggle-wrapper input");
  const darkPreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const themePreset = localStorage.getItem("theme");

  if (themePreset) {
    document.documentElement.setAttribute("data-theme", themePreset);
    toggleInput.checked = themePreset === "dark";
  } else if (darkPreference) {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleInput.checked = true;
    localStorage.setItem("theme", "dark");
  }

  toggleInput.addEventListener("change", (event) => {
    document.documentElement.setAttribute(
      "data-theme",
      event.currentTarget.checked ? "dark" : "light"
    );
    localStorage.setItem(
      "theme",
      event.currentTarget.checked ? "dark" : "light"
    );
  });
}
