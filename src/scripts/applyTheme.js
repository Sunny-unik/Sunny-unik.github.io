export default function () {
  const toggleInput = document.querySelector(".toggle-wrapper input");
  const darkPreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (darkPreference) {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleInput.checked = true;
  }

  toggleInput.addEventListener("change", (event) => {
    document.documentElement.setAttribute(
      "data-theme",
      event.currentTarget.checked ? "dark" : "light"
    );
  });
}
