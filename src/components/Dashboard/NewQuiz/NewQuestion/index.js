import './styles.scss';
import Option from '../Option';
import { v4 as uuidv4 } from 'uuid';

const NewQuestion = ({ onQuestionEdit, question, index }) => {
  const handleTypeChange = (event) => {
    const updatedQuestion = {
      ...question,
      options:
        event.target.value === 'tf'
          ? question.options.slice(0, 2)
          : question.options,
      type: event.target.value,
    };

    updatedQuestion.options.forEach((option) => {
      option.isCorrect = false;
    });

    onQuestionEdit(updatedQuestion);
  };

  const handleQuestionChange = (event) => {
    const updatedQuestion = {
      ...question,
      question: event.target.value,
    };

    onQuestionEdit(updatedQuestion);
  };

  const handleAddOption = () => {
    const updatedQuestion = {
      ...question,
      options: [
        ...question.options,
        {
          _id: uuidv4(),
          text: '',
          isCorrect: false,
        },
      ],
    };

    onQuestionEdit(updatedQuestion);
  };

  const onHandleDeleteOption = (event, id) => {
    const options = [...question.options].filter((option) => option._id !== id);

    const updatedQuestion = {
      ...question,
      options,
    };

    onQuestionEdit(updatedQuestion);
  };

  const onHandleAnswerChange = (event, id) => {
    const updatedQuestion = question;

    updatedQuestion.options.find((option) => option._id === id).text =
      event.target.value;

    onQuestionEdit(updatedQuestion);
  };

  const onHandleCorrectAnswerUpdate = (event, id) => {
    let newOptions = question.options;

    if (question.type === 'tf') {
      newOptions.forEach((option) => {
        option.isCorrect = false;
      });

      newOptions.find((option) => option._id === id).isCorrect = true;
    } else {
      newOptions.find((option) => option._id === id).isCorrect =
        event.target.checked;
    }

    const updatedQuestion = {
      ...question,
      options: newOptions,
    };

    onQuestionEdit(updatedQuestion);
  };

  return (
    <div className="new-question">
      <div className="new-question__top">
        <h3 className="new-question__title">Question #{index}</h3>
        <label className="new-question__label">
          Question type:
          <select
            className="new-question__select"
            name="type"
            onChange={handleTypeChange}
          >
            <option className="new-question__option" value="tf">
              True/False
            </option>
            <option className="new-question__option" value="mc">
              Multiple Choice
            </option>
          </select>
        </label>
      </div>
      <label className="new-question__label">
        Question text:
        <input
          className="new-question__input"
          name="text"
          type="text"
          onChange={handleQuestionChange}
          value={question.question}
        />
      </label>
      <p>Answers: </p>
      <ol className="new-question__list">
        {question.options.map((option) => {
          return (
            <Option
              key={option._id}
              question={question}
              option={option}
              handleAnswerChange={onHandleAnswerChange}
              handleCorrectAnswerUpdate={onHandleCorrectAnswerUpdate}
              handleDeleteOption={onHandleDeleteOption}
            />
          );
        })}
      </ol>
      {question.type === 'mc' && (
        <button
          className="new-question__button _blue _small"
          type="button"
          onClick={handleAddOption}
        >
          Add new option
        </button>
      )}
    </div>
  );
};

export default NewQuestion;
