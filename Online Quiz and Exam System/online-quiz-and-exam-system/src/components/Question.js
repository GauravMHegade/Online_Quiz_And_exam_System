function Question({ q, index, setAnswers, answers }) {
  return (
    <div>
      <p>{index + 1}. {q.questionText}</p>
      {["A","B","C","D"].map(opt => (
        <label key={opt}>
          <input
            type="radio"
            name={index}
            onChange={() => setAnswers({ ...answers, [index]: opt })}
          />
          {q["option" + opt]}
        </label>
      ))}
    </div>
  );
}

export default Question;
