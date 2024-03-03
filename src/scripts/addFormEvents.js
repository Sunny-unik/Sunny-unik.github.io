export default function () {
  document
    .querySelector(".contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const submitBtn = event.currentTarget.querySelector(
        "button[type='submit']"
      );
      submitBtn.innerText = "loading...";
      const formData = Object.fromEntries(new FormData(this));
      const xhr = new XMLHttpRequest();
      const errorHandler = () => {
        alert(
          "Failed to send message. Please try again later or send mail at sunnygandhwani027@gmail.com"
        );
        submitBtn.innerText = "Submit";
      };

      xhr.open("POST", "https://sunny-unik-server.vercel.app/send-email");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        if (xhr.status !== 200) return errorHandler();
        alert("Message sent successfully!");
        submitBtn.innerText = "Submit";
      };
      xhr.onerror = errorHandler;
      xhr.send(JSON.stringify(formData));
    });
}
