const cursor =
  document.querySelector(".cursor") ??
  Object.assign(document.body.appendChild(document.createElement("div")), {
    className: "cursor",
  });
const cursorDot =
  document.querySelector(".cursor-dot") ??
  Object.assign(document.body.appendChild(document.createElement("div")), {
    className: "cursor-dot",
  });
window.addEventListener("mousemove", (e) => {
  const { clientX: x, clientY: y } = e;
  cursor.style.transform = `translate(${x}px, ${y}px)`;
  cursorDot.style.transform = `translate(${x}px, ${y}px)`;
});
const hoverables =
  "a, button, input, textarea, select, label, [data-cursor-hover]";
document.addEventListener(
  "mouseover",
  (e) => e.target.closest(hoverables) && toggleHover(true)
);
document.addEventListener(
  "mouseout",
  (e) => e.target.closest(hoverables) && toggleHover(false)
);
function toggleHover(on) {
  cursor.classList.toggle("hover", on);
  cursorDot.classList.toggle("hover", on);
}
if (!cursor || !cursorDot) document.documentElement.style.cursor = "auto";
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;
let requestId = null;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
function animateCursor() {
  const ease = 0.15;
  const dotEase = 0.6;
  const distX = mouseX - cursorX;
  const distY = mouseY - cursorY;
  cursorX += distX * ease;
  cursorY += distY * ease;
  dotX += (mouseX - dotX) * dotEase;
  dotY += (mouseY - dotY) * dotEase;
  cursor.style.transform = `translate3d(${cursorX - 10}px, ${
    cursorY - 10
  }px, 0)`;
  cursorDot.style.transform = `translate3d(${dotX - 2}px, ${dotY - 2}px, 0)`;
  requestId = requestAnimationFrame(animateCursor);
}
animateCursor();
const hoverElements = document.querySelectorAll(
  "button, a, input, .access-btn, .forgot-link"
);
hoverElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
    cursorDot.classList.add("hover");
  });
  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
    cursorDot.classList.remove("hover");
  });
});
window.addEventListener("beforeunload", () => {
  if (requestId) {
    cancelAnimationFrame(requestId);
  }
});
const adminForm = document.getElementById("adminLoginForm");
const emailInput = document.getElementById("adminEmail");
const passwordInput = document.getElementById("adminPassword");
const rememberCheckbox = document.getElementById("rememberMe");
const forgotPasswordLink = document.getElementById("forgotPassword");
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function validatePassword(password) {
  return password.length >= 6;
}
emailInput.addEventListener("input", (e) => {
  const email = e.target.value;
  const inputGroup = e.target.closest(".input-group");
  if (email && !validateEmail(email)) {
    inputGroup.style.borderColor = "#ff6b6b";
    inputGroup.style.boxShadow = "0 0 0 6px rgba(255, 107, 107, 0.15)";
  } else if (email && validateEmail(email)) {
    inputGroup.style.borderColor = "#34d399";
    inputGroup.style.boxShadow = "0 0 0 6px rgba(52, 211, 153, 0.15)";
  } else {
    inputGroup.style.borderColor = "";
    inputGroup.style.boxShadow = "";
  }
});
passwordInput.addEventListener("input", (e) => {
  const password = e.target.value;
  const inputGroup = e.target.closest(".input-group");
  if (password && !validatePassword(password)) {
    inputGroup.style.borderColor = "#ff6b6b";
    inputGroup.style.boxShadow = "0 0 0 6px rgba(255, 107, 107, 0.15)";
  } else if (password && validatePassword(password)) {
    inputGroup.style.borderColor = "#34d399";
    inputGroup.style.boxShadow = "0 0 0 6px rgba(52, 211, 153, 0.15)";
  } else {
    inputGroup.style.borderColor = "";
    inputGroup.style.boxShadow = "";
  }
});
adminForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const remember = rememberCheckbox.checked;
  if (!validateEmail(email)) {
    showNotification("Please enter a valid email address", "error");
    emailInput.focus();
    return;
  }
  if (!validatePassword(password)) {
    showNotification("Password must be at least 6 characters long", "error");
    passwordInput.focus();
    return;
  }
  const submitButton = adminForm.querySelector(".btn-primary");
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = "<span>Authenticating...</span>";
  submitButton.disabled = true;
  submitButton.style.opacity = "0.7";

  try {
    await simulateLogin(email, password, remember);
    showNotification("Login successful! Redirecting...", "success");
    setTimeout(() => {
      showNotification("Welcome to EduCommand Admin Panel!", "success");
      // Here you would typically redirect to the dashboard
      // window.location.href = '/dashboard';
    }, 2000);
  } catch (error) {
    showNotification(error.message, "error");
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
    submitButton.style.opacity = "1";
  }
});
async function simulateLogin(email, password, remember) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const validCredentials = {
        "admin@educommand.com": "admin123",
        "demo@educommand.com": "demo123",
        "codekeepers@educommand.com": "codekeepers123",
      };
      if (validCredentials[email] && validCredentials[email] === password) {
        if (remember) {
          localStorage.setItem("educommand_remember", "true");
          localStorage.setItem("educommand_email", email);
        }
        resolve({ success: true, user: { email } });
      } else {
        reject(
          new Error("Invalid credentials. Try admin@educommand.com / admin123")
        );
      }
    }, 2000);
  });
}
function showNotification(message, type = "info") {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-icon">${getNotificationIcon(
                      type
                    )}</span>
                    <span class="notification-message">${message}</span>
                </div>
            `;

  const notificationStyles = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 16px 24px;
                    border-radius: 12px;
                    backdrop-filter: blur(20px);
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    z-index: 10001;
                    animation: slideInRight 0.5s ease-out;
                    max-width: 350px;
                    font-family: 'Inter', sans-serif;
                }
                .notification-success {
                    background: linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(34, 197, 94, 0.1) 100%);
                    border-color: rgba(52, 211, 153, 0.3);
                }
                .notification-error {
                    background: linear-gradient(135deg, rgba(255, 107, 107, 0.15) 0%, rgba(239, 68, 68, 0.1) 100%);
                    border-color: rgba(255, 107, 107, 0.3);
                }
                .notification-info {
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%);
                    border-color: rgba(102, 126, 234, 0.3);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .notification-icon {
                    font-size: 18px;
                    color: #f7fafc;
                }
                .notification-message {
                    color: #f7fafc;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 1.4;
                }
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;

  if (!document.querySelector("#notification-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "notification-styles";
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
  }
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.animation = "slideInRight 0.5s ease-out reverse";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 500);
  }, 5000);
}
function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "✅";
    case "error":
      return "❌";
    case "info":
    default:
      return "ℹ️";
  }
}
forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  showPasswordResetModal();
});
function showPasswordResetModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Reset Password</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Enter your email address and we'll send you a link to reset your password.</p>
                        <div class="input-group">
                            <input type="email" id="resetEmail" placeholder=" " required>
                            <label for="resetEmail">Email Address</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-secondary modal-cancel">Cancel</button>
                        <button class="btn-primary modal-submit">Send Reset Link</button>
                    </div>
                </div>
            `;
  const modalStyles = `
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10002;
                    animation: fadeIn 0.3s ease-out;
                }
                .modal-content {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%);
                    backdrop-filter: blur(25px);
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 30px;
                    max-width: 400px;
                    width: 90%;
                    animation: slideInUp 0.4s ease-out;
                    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
                }
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .modal-header h3 {
                    color: #f7fafc;
                    font-size: 1.5rem;
                    font-weight: 700;
                }
                .modal-close {
                    background: none;
                    border: none;
                    color: #a0aec0;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                .modal-close:hover {
                    background: rgba(255, 107, 107, 0.2);
                    color: #ff6b6b;
                }
                .modal-body {
                    margin-bottom: 25px;
                }
                .modal-body p {
                    color: #a0aec0;
                    margin-bottom: 20px;
                    line-height: 1.6;
                }
                .modal-footer {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                }
                .btn-secondary {
                    padding: 12px 24px;
                    background: transparent;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                    color: #a0aec0;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.3);
                    color: #f7fafc;
                }
                .modal-submit {
                    cursor: pointer;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideInUp {
                    from {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `;

  if (!document.querySelector("#modal-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "modal-styles";
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
  }
  document.body.appendChild(modal);
  const closeButton = modal.querySelector(".modal-close");
  const cancelButton = modal.querySelector(".modal-cancel");
  const submitButton = modal.querySelector(".modal-submit");
  const resetEmailInput = modal.querySelector("#resetEmail");
  const closeModal = () => {
    modal.style.animation = "fadeIn 0.3s ease-out reverse";
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
    }, 300);
  };
  closeButton.addEventListener("click", closeModal);
  cancelButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  submitButton.addEventListener("click", () => {
    const email = resetEmailInput.value.trim();
    if (!validateEmail(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }
    showNotification("Password reset link sent to your email!", "success");
    closeModal();
  });
  setTimeout(() => {
    resetEmailInput.focus();
  }, 100);
}
const quickAccessButtons = document.querySelectorAll(".access-btn");
quickAccessButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const buttonText = button.textContent.trim();
    switch (buttonText) {
      case "System Status":
        showNotification(
          "System Status: All services operational ✅",
          "success"
        );
        break;
      case "Help Center":
        showNotification("Help Center: Opening documentation...", "info");
        break;
      case "Support":
        showNotification("Support: Contact support@educommand.com", "info");
        break;
      default:
        showNotification("Feature coming soon!", "info");
    }
  });
});
function createParticles() {
  const particlesContainer = document.querySelector(".particles");
  if (!particlesContainer) return;
  const particleCount = 20;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 3 + 3 + "s";
    particlesContainer.appendChild(particle);
  }
}
createParticles();
document.addEventListener("keydown", (e) => {
  // Alt + L to focus on login
  if (e.altKey && e.key === "l") {
    e.preventDefault();
    emailInput.focus();
  }
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal-overlay");
    if (modal) {
      modal.querySelector(".modal-close").click();
    }
  }
});
window.addEventListener("load", () => {
  const rememberedEmail = localStorage.getItem("educommand_email");
  const rememberMe = localStorage.getItem("educommand_remember");

  if (rememberMe === "true" && rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberCheckbox.checked = true;
    const event = new Event("input");
    emailInput.dispatchEvent(event);
  }
});
let ticking = false;
function updateScrollEffects() {
  ticking = false;
}
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
});
const inputs = adminForm.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("focus", (e) => {
    e.target.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
  });
  input.addEventListener("blur", (e) => {
    e.target.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
  });
});
console.log(
  "%c🎓 Welcome to EduCommand!",
  "color: #667eea; font-size: 24px; font-weight: bold;"
);
console.log(
  "%cStudent Management System v2.0",
  "color: #ff6b6b; font-size: 16px;"
);
console.log(
  "%cDemo Credentials:",
  "color: #34d399; font-size: 14px; font-weight: bold;"
);
console.log(
  "%c• admin@educommand.com / admin123",
  "color: #a0aec0; font-size: 12px;"
);
console.log(
  "%c• codekeepers@educommand.com / codekeepers123",
  "color: #a0aec0; font-size: 12px;"
);
