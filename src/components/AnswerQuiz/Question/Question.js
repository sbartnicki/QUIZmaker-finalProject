import "./styles.scss";

export default function Question({ question, index, onChange }) {
  const Option = ({ option }) => {
    const handleOnChange = (e) => {
      const newAnswer = e.target.value;
      const isChecked = e.target.checked;

      let oldAnswers = question.answers || [];

      // if radio, we just replace the oldAnswer with the new one
      if (isRadio) {
        oldAnswers = [newAnswer];
      }

      // if is not radio we add the new answer avoiding repetiton
      let newAnswers = [...new Set([...oldAnswers, newAnswer])];

      // if checked = false and the type of the question is not radio, remove the answer from the array
      if (!isChecked && !isRadio) {
        newAnswers = newAnswers.filter((it) => it !== newAnswer);
      }

      // update the question with the answer selected and send to the parent element
      const newQuestion = { ...question, answers: newAnswers };
      onChange(newQuestion);
    };

    // define question type
    const inputType = question.type === "tf" ? "radio" : "checkbox";
    const isRadio = inputType === "radio";
    // answers will be the answers that already exist in the question, if not an empty array is created
    const answers = question.answers || [];
    // isChecked returns true if the option is inside answers, if not it returns false
    const isChecked = answers.includes(option.text);

    return (
      <>
        <label key={option.text}>
          <input
            type={inputType}
            value={option.text}
            checked={isChecked}
            onChange={handleOnChange}
          />
          {option.text}
        </label>
      </>
    );
  };

  const Options = question.options.map((option) => (
    <Option key={option.text} option={option} />
  ));

  return (
    <div className="quiz-question-wrapper">
      {/* question title */}
      <h3>Question #{index} - {question.question}</h3>
      <>{Options}</>
    </div>
  );
}
