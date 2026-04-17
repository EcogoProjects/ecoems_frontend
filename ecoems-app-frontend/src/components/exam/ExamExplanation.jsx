export default function ExamExplanation({ correct_answer, answer_selected, explanation, blur = false }) {
  const isCorrect = answer_selected === correct_answer;

  return (
    <div className={`${isCorrect ? 'bg-green-background-soft text-green-box-text' : 'bg-red-background-soft text-red-box-text'} rounded-[18px] p-3 shadow-lg`}>
      <p className="opacity-55">Explicación</p>
      <div fle>
        <p>La respuesta correcta es {correct_answer}.</p>
        <p className={`opacity-90 ${blur ? 'blur-[3px]' : ''} select-none`}>  {explanation}</p>
      </div>
    </div>
  );
}