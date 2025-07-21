import { useRef, useState } from "react";
import "./OnboardingPage.css";

const OnboardingPage = () => {
  const [previewSrc, setPreviewSrc] = useState(
    "/src/assets/images/avatar-placeholder.svg"
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setPreviewSrc(URL.createObjectURL(file)); //Update preview source image
  };

  return (
    <>
      <header className="logo-wrapper">
        <img src="/src/assets/images/logo.svg" alt="Mood tracker logo" />
      </header>
      <main className="form-wrapper">
        <form className="form">
          <header>
            <h1 className="form-heading text-preset-3 text-neutral-900">
              Personalize your experience
            </h1>
            <p className="text-preset-6-regular text-neutral-600">
              Add your name and a profile picture to make Mood yours.
            </p>
          </header>
          <section>
            <div className="input-wrapper">
              <label
                htmlFor="email"
                className="text-preset-6-regular text-neutral-900"
              >
                Name
              </label>
              <input
                id="name"
                className="form-input text-preset-6-regular text-neutral-600"
                placeholder="Jane Appleseed"
              ></input>
            </div>
            <div className="upload-wrapper">
              <img className="upload-image" src={previewSrc}></img>
              <div className="upload-content">
                <div className="upload-heading">
                  <p className="upload-header text-preset-6-regular text-neutral-900">
                    Upload Image
                  </p>
                  <p className="text-preset-7 text-neutral-600">
                    Max 250KB, PNG or JPEG
                  </p>
                </div>
                <button
                  className="upload-button"
                  type="button"
                  onClick={handleClick}
                >
                  Upload
                </button>
                <input
                  type="file"
                  ref={inputRef}
                  onChange={handleChange}
                  className="sr-only"
                />
              </div>
            </div>
          </section>
          <footer>
            <button
              type="submit"
              className="form-button text-preset-5 text-neutral-0 bg-blue-600"
            >
              Start Tracking
            </button>
          </footer>
        </form>
      </main>
    </>
  );
};

export default OnboardingPage;
