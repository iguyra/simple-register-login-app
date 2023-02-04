const Form = ({
  handleSubmit,
  handleChange,
  inputField,
  isLogging,
  isError,
  errMsg,
}) => {
  return (
    <form className="form" onSubmit={handleSubmit} action="">
      <div className="form__group">
        <label htmlFor="fullName" className="form__label">
          full Name <i className="fas fa-user regIcon"></i>
        </label>
        <input
          onChange={handleChange}
          defaultValue={inputField.fullName}
          name="fullName"
          className="form__input"
          type="text"
          id="fullName"
        />
      </div>
      <div className="form__group">
        <label htmlFor="email" className="form__label">
          email <i className="far fa-envelope regIcon"></i>
        </label>
        <input
          onChange={handleChange}
          defaultValue={inputField.email}
          type="text"
          className="form__input"
          id="email"
          name="email"
        />
      </div>

      <div className="form__group">
        <label htmlFor="firstName" className="form__label">
          password <i className="fas fa-lock regIcon"></i>
        </label>
        <input
          onChange={handleChange}
          defaultValue={inputField.password}
          type="password"
          className="form__input"
          name="password"
        />
      </div>
      <div className="form__group">
        <label htmlFor="firstName" className="form__label">
          Confirm Password <i className="fas fa-lock regIcon"></i>
        </label>
        <input
          onChange={handleChange}
          defaultValue={inputField.passwordConfirm}
          type="password"
          className="form__input"
          name="passwordConfirm"
        />
      </div>
      <div className="form__button">
        <button className="form__button--link">
          {isLogging ? "joining..." : "join"}
        </button>
      </div>
    </form>
  );
};

export default Form;
