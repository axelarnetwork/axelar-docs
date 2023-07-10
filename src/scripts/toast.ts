export function showToast(message, duration = 1500) {
  // Create the toast element
  const toastElement = document.createElement("div");
  toastElement.classList.add("toast");

  // Set the toast message
  const toastMessage = document.createElement("span");
  toastMessage.textContent = message;
  toastElement.appendChild(toastMessage);

  document.body.appendChild(toastElement);

  // Show the toast after appending to the DOM so we can transition in
  setTimeout(() => {
    toastElement.classList.add("show");
    console.log('added');
  }, 10);

  // Hide it, then later remove it
  setTimeout(() => {
    toastElement.classList.remove("show");
    console.log('removed');

    setTimeout(() => {
      document.body.removeChild(toastElement);
    }, 5000);
  }, duration);
}
