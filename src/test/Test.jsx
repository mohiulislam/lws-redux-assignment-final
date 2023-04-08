import React from "react";

function Test() {
  return (
    <div>
      <form>
        <div>
          <label htmlFor={`option1_q1`}>
            <input type="checkbox" id={`option1_q1`} />
            {1}
          </label>
          <label htmlFor={`option2_q1`}>
            <input type="checkbox" id={`option1_q1`} />
            {2}
          </label>
          <label htmlFor={`option3_q1`}>
            <input type="checkbox" id={`option1_q1`} />
            {3}
          </label>
          <label htmlFor={`option4_q1`}>
            <input type="checkbox" id={`option1_q1`} />
            {4}
          </label>
        </div>
        <div>
          <label htmlFor={`option1_q2`}>
            <input type="checkbox" id={`option1_q2`} />
            {1}
          </label>
          <label htmlFor={`option2_q2`}>
            <input type="checkbox" id={`option2_q2`} />
            {2}
          </label>
          <label htmlFor={`option3_q2`}>
            <input type="checkbox" id={`option3_q2`} />
            {3}
          </label>
          <label htmlFor={`option4_q2`}>
            <input type="checkbox" id={`option4_q2`} />
            {4}
          </label>
        </div>
        {/* more quiz here... */}
        <button
          type="submit"
          className="bg-cyan-400 px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 text-black active:opacity-100 active:scale-95 "
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Test;
