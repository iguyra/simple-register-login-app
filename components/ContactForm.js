const Form = ({
  handleSubmit,
  handleChange,
  inputField,
  isSubmitted,
  isSending,
  errMsg,
  isLogging,
  isError,
}) => {
  return (
    <form onSubmit={handleSubmit} className="form" action="">
      <div className="form__group">
        <label htmlFor="firstName" className="form__label">
          Name <i className="fas fa-user regIcon"></i>
        </label>
        <input
          defaultValue={inputField.name}
          onChange={handleChange}
          name="name"
          type="text"
          className="form__input"
        />
      </div>
      <div className="form__group">
        <label htmlFor="firstName" className="form__label">
          email <i className="far fa-envelope regIcon"></i>
        </label>
        <input
          defaultValue={inputField.email}
          onChange={handleChange}
          name="email"
          type="text"
          className="form__input"
        />
      </div>
      <div className="form__group">
        <label htmlFor="firstName" className="form__label">
          Phone Number
          <i className="fas fa-mobile-alt regIcon"></i>
        </label>
        <input
          defaultValue={inputField.phoneNumber}
          onChange={handleChange}
          name="phoneNumber"
          type="text"
          className="form__input"
        />
      </div>
      <div className="form__group">
        <label htmlFor="firstName" className="form__label">
          your message <i class="fas fa-lock regIcon"></i>
        </label>
        <textarea
          onChange={handleChange}
          defaultValue={inputField.message}
          name="message"
          className="form__input"
          id=""
          cols="0"
          rows="5"
        ></textarea>

        <div className="form__button">
          <button className="form__button--link">
            {isSending ? "sending..." : "send"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
