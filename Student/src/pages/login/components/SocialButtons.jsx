
import React from "react";
import "../../../styles/SocialButtons.css";
import google_icon from "../../../assets/images/google.png";
import apple_icon from "../../../assets/images/apple.png";
import github_icon from "../../../assets/images/github.png";

function SocialButtons() {
  return (
    <div className="social-buttons">
      <button className="social-btn">
        <img src={google_icon} alt="Google" />
        <span>Sign in with Google</span>
      </button>

      <button className="social-btn">
        <img src={apple_icon} alt="Apple" />
        <span>Sign in with Apple</span>
      </button>

      <button className="social-btn">
        <img src={github_icon} alt="github" />
        <span>Sign in with Github</span>
      </button>
    </div>
  );
}

export default SocialButtons;
