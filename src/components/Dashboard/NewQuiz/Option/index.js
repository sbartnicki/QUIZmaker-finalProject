const Option = ({
  question,
  option,
  handleAnswerChange,
  handleCorrectAnswerUpdate,
  handleDeleteOption,
}) => {
  return (
    <li className="new-question__item">
      <input
        className="new-question__input answer"
        type="text"
        value={option.text} // Only change here, added value for option, SLY
        onChange={(event) => handleAnswerChange(event, option._id)}
      />
      {question.type === 'tf' && (
        <input
          className="new-question__input"
          type="radio"
          onChange={(event) => handleCorrectAnswerUpdate(event, option._id)}
        />
      )}
      {question.type === 'mc' && (
        <input
          className="new-question__input"
          type="checkbox"
          onChange={(event) => handleCorrectAnswerUpdate(event, option._id)}
        />
      )}
        {
            question.options.length > 2 &&
            <button
                className="new-question__button _red _ml-auto"
                type="button"
                onClick={(event) => handleDeleteOption(event, option._id)}
            >
                Delete
            </button>
        }
    </li>
  );
};

export default Option;
