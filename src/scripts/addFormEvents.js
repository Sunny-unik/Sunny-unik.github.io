export default function () {
  document
    .querySelector(".contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = Object.fromEntries(new FormData(this));
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:4000/send-email");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
        alert(
          xhr.status === 200
            ? "Message sent successfully!"
            : "Failed to send message. Please try again later."
        );
      };
      xhr.send(JSON.stringify(formData));
    });
}
