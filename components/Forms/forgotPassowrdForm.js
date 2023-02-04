const forgotPassowrdForm = ({
  handleSubmit,
  handleChange,
  inputField,
  errMsg,
  isLogging,
  isError,
}) => {
  return (
    <form className="form" onSubmit={handleSubmit} action="">
      <div className="form__group">
        <label htmlFor="firstName" className="form__label">
          email
        </label>
        <input
          onChange={handleChange}
          value={inputField.confirmNewPassword}
          name="email"
          type="email"
          className="form__input"
        />
      </div>
      <div className="form__button">
        <button className="form__button--link">
          {!isLogging ? "reset" : "resetting..."}
        </button>
      </div>
    </form>
  );
};

export default forgotPassowrdForm;
