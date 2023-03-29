import React, { useRef, useState } from "react";
import style from '../styles/test.module.css';

const questionsData = [
    {
        Question: "CSS stands for",
        Options: ["Cascade style sheets", "Color and style sheets", "Cascading style sheets", "None of the above"],
        CorrectAnswer: "Cascading style sheets"
    },
    {
        Question: "The HTML attribute used to define the inline styles is -",
        Options: ["style", "styles", "class", "None of the above"],
        CorrectAnswer: "style"
    },
    {
        Question: " Which of the following CSS property is used to add shadows to the text?",
        Options: ["text-shadow", "text-stroke", "text-overflow", "text-decoration"],
        CorrectAnswer: "text-shadow"
    },
    {
        Question: "Which of the following is not a type of combinator?",
        Options: [">", "~", "+", "*"],
        CorrectAnswer: "*"
    },
    {
        Question: "HTML stands for _",
        Options: ["HyperText Markup Language", "HyperText Machine Language", "HyperText Marking Language", "HighText Marking Language"],
        CorrectAnswer: "HyperText Markup Language"
    },
    {
        Question: "Which of the following is used to read an HTML page and render it?",
        Options: ["Web server", "Web network", "Web browser", "Web matrix"],
        CorrectAnswer: "Web browser"
    },
    {
        Question: "In which part of the HTML metadata is contained?",
        Options: ["head tag", " title tag", "html tag", "body tag"],
        CorrectAnswer: "head tag"
    },
    {
        Question: "Which element is used to get highlighted text in HTML5?",
        Options: ["<u>", "<mark>", "<highlight>", "<b>"],
        CorrectAnswer: "<mark>"
    },
    {
        Question: "Which of the following is not a HTML5 tag?",
        Options: ["<track>", "<video>", "<slider>", "<source>"],
        CorrectAnswer: "<slider>"
    },
    {
        Question: "How do we write comments in HTML?",
        Options: ["</…….>", "<!……>", "</……/>", "<…….!>"],
        CorrectAnswer: "<!……>"
    },


];

function Exam() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(questionsData.length).fill(null));
    const [showResults, setShowResults] = useState(false);
    const resultRef = useRef(null); // new useRef instance

    const handleNextQuestion = () => {
        if (currentQuestion === questionsData.length - 1) {
            setShowResults(true);
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswers(Array(questionsData.length).fill(null));
        setShowResults(false);
    };

    const handleAnswerSelect = (event) => {
        const answerIndex = parseInt(event.target.value, 10);
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[currentQuestion] = answerIndex;
        setSelectedAnswers(newSelectedAnswers);
    };

    const calculateScore = () => {
        let score = 0;
        for (let i = 0; i < questionsData.length; i++) {
            if (selectedAnswers[i] === null) {
                continue;
            }
            if (questionsData[i].Options[selectedAnswers[i]] === questionsData[i].CorrectAnswer) {
                score += 2;
            }
        }
        return score;
    };

    const score = calculateScore();
    const passed = score >= 12;

    if (showResults) {
        // use the ref to set the focus on the result message
        return (
            <div className={style.mainContainer}>
                <div ref={resultRef} className={style.container}>
                    <h1>Results</h1>
                    <p>You scored {score} out of {questionsData.length * 2}.</p>
                    {passed ? (
                        <p>Congratulations, you passed the test!</p>
                    ) : (
                        <div>
                            <p>Sorry, you failed the test.</p>
                            <button onClick={handleRestart} className={style.button}>Restart Test</button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.container}>
                <h1>Question {currentQuestion + 1}</h1>
                <h2>{questionsData[currentQuestion].Question}</h2>
                <form>
                    {questionsData[currentQuestion].Options.map((option, index) => (
                        <div key={index} className={style.inputField}>
                            <label>
                                <input
                                    type="radio"
                                    name="answer"
                                    value={index}
                                    checked={selectedAnswers[currentQuestion] === index}
                                    onChange={handleAnswerSelect} className={style.input} size="80"
                                />
                                {option}
                            </label>
                        </div>
                    ))}
                </form>
                <div className={style.btn}>
                    <button onClick={handleNextQuestion} className={style.button}>{currentQuestion === questionsData.length - 1 ? "Submit" : "Next"}</button>
                </div>
            </div>
        </div>
    );
}

export default Exam;
