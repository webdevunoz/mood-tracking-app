import FormField from "../Form/FormField/FormField";
import FormHeader from "../Form/FormHeader/FormHeader";
import FormWrapper from "../Form/FormWrapper/FormWrapper";
import UploadImage from "../Form/UploadImage";
import "./SettingsModal.css";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <FormWrapper className="settings" onClose={onClose} hasClose={true}>
          <FormHeader
            heading="Update your profile"
            desc="Personalize your account with your name and photo."
          />
          <section>
            <FormField label="Name" value="Lisa Maria" />
            <UploadImage />
          </section>
          <footer>
            <PrimaryButton
              homeButton={true}
              logButton={false}
              onClick={onClose}
            >
              Save changes
            </PrimaryButton>
          </footer>
        </FormWrapper>
      </div>
    </div>
  );
};

export default SettingsModal;
