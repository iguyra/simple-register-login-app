const Form = ({
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
        <div className="error">
          {isError ? <p className="errMsg">{errMsg}</p> : ""}
        </div>
        <label htmlFor="firstName" className="form__label">
          email
        </label>
        <input
          onChange={handleChange}
          name="email"
          defaultValue={inputField.email}
          type="email"
          className="form__input"
        />
      </div>
      <div className="form__group">
        <label htmlFor="firstName" className="form__label">
          password
        </label>
        <input
          onChange={handleChange}
          value={inputField.password}
          name="password"
          type="password"
          className="form__input"
        />
      </div>
      <div className="form__button">
        <button className="form__button--link">
          {isLogging ? "logging..." : "login"}
        </button>
      </div>
    </form>
  );
};

export default Form;
