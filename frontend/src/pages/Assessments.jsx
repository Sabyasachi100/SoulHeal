import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Star, ArrowRight, CheckCircle2, AlertCircle, Clock, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { PageTransition, StaggerContainer, StaggerItem, HoverCard, FloatingOrb } from "../components/Animations";
import { assessmentData } from "../data/assessmentQuestions";
import { saveAssessment } from "../services/api";

const QuizRunner = ({ quizType, onComplete, onCancel }) => {
  const data = assessmentData[quizType];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(new Array(data.questions.length).fill(null));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (score) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);
    
    if (currentQuestion < data.questions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
    }
  };

  const handleSubmit = async () => {
    const totalScore = answers.reduce((acc, curr) => acc + curr, 0);
    const resultText = data.getResults(totalScore);
    
    setIsSubmitting(true);
    try {
      await saveAssessment({
        assessmentType: data.title,
        score: totalScore,
        result: resultText
      });
      
      onComplete(resultText, totalScore);
    } catch (error) {
      console.error("Failed to save assessment:", error);
      alert("Failed to save results. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentQuestion + 1) / data.questions.length) * 100;
  const isFinished = answers.every(a => a !== null);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="premium-card max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{data.title}</h2>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-teal-400 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] uppercase tracking-widest text-muted font-bold">
            <span>Question {currentQuestion + 1} of {data.questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        <div className="space-y-8">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-[100px]"
          >
            <h3 className="text-xl text-white font-medium leading-relaxed">
              {data.questions[currentQuestion]}
            </h3>
          </motion.div>

          <div className="grid gap-3">
            {data.options.map((option, idx) => (
              <motion.button
                key={idx}
                onClick={() => handleSelect(option.score)}
                className={`p-4 rounded-xl text-left transition-all border ${
                  answers[currentQuestion] === option.score 
                    ? "bg-teal-500/20 border-teal-500 text-teal-400" 
                    : "bg-white/5 border-white/10 text-muted hover:bg-white/10 hover:border-white/20"
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between">
                  <span>{option.text}</span>
                  {answers[currentQuestion] === option.score && <CheckCircle2 className="w-5 h-5" />}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
          <button
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            className="flex items-center gap-2 text-sm font-semibold text-muted disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          
          {currentQuestion === data.questions.length - 1 ? (
            <motion.button
              disabled={!isFinished || isSubmitting}
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold shadow-lg shadow-teal-500/20 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? "Saving..." : "Finish & See Results"}
            </motion.button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              className="flex items-center gap-2 text-sm font-semibold text-white"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Assessments = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  const quizzes = [
    { id: 'anxiety', title: "Anxiety Self-Assessment", description: "A quick test to understand your anxiety levels over the past 2 weeks.", questions: 7, time: "5 mins", category: "Mental Health", color: "#60a5fa" },
    { id: 'stress', title: "Stress Level Indicator", description: "Measure how your current lifestyle is impacting your stress levels.", questions: 10, time: "8 mins", category: "Wellness", color: "#5ecfbf" },
    { id: 'depression', title: "Depression Screen", description: "Standard screening tool for symptoms of clinical depression.", questions: 9, time: "7 mins", category: "Clinical", color: "#f9a8d4" },
    { id: 'sleep', title: "Sleep Quality", description: "Assess your sleep patterns and identify potential issues.", questions: 5, time: "3 mins", category: "Wellness", color: "#818cf8" },
    { id: 'selfEsteem', title: "Self-Esteem Scale", description: "Measure your current levels of self-worth and confidence.", questions: 10, time: "6 mins", category: "Mental Health", color: "#fbbf24" },
  ];

  const handleQuizComplete = (result, score) => {
    setQuizResult({ result, score, title: assessmentData[selectedQuiz.id].title });
  };

  return (
    <PageTransition>
      <div className="space-y-12 relative">
        <FloatingOrb style={{ top: "-60px", right: "5%" }} color="#5ecfbf" size={300} delay={1} />

        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4 text-gradient serif">Self-Assessments</h1>
          <p className="text-muted font-light">Take a moment to check in with yourself. These assessments help us recommend the best resources for you.</p>
        </motion.div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" delay={0.1}>
          {quizzes.map((quiz) => (
            <StaggerItem key={quiz.id}>
              <HoverCard className="premium-card h-full flex flex-col">
                <motion.div
                  className="p-4 rounded-2xl mb-6 inline-flex"
                  style={{ background: `${quiz.color}15` }}
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Brain className="w-8 h-8" style={{ color: quiz.color }} />
                </motion.div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md" style={{ background: "var(--mid)", color: "var(--muted)" }}>
                    {quiz.category}
                  </span>
                  <span className="text-[10px] font-bold text-yellow-400 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400" /> Recommended
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">{quiz.title}</h3>
                <p className="text-sm text-muted mb-6 flex-1">{quiz.description}</p>

                <div className="flex items-center gap-4 mb-6 text-muted text-xs font-semibold">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> {quiz.questions} Questions</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {quiz.time}</span>
                </div>

                <motion.button
                  onClick={() => setSelectedQuiz(quiz)}
                  className="w-full py-3.5 rounded-xl border text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all"
                  style={{ background: "rgba(17,54,64,0.5)", borderColor: "var(--border)" }}
                  whileHover={{ backgroundColor: `${quiz.color}20`, borderColor: quiz.color, color: quiz.color }}
                  whileTap={{ scale: 0.97 }}
                >
                  Start Assessment <ArrowRight className="w-4 h-4" />
                </motion.button>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <motion.div
          className="premium-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ background: "linear-gradient(to right, rgba(94,207,191,0.07), rgba(212,184,150,0.07))" }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div
              className="p-5 rounded-3xl"
              style={{ background: "var(--mid)" }}
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <AlertCircle className="w-10 h-10" style={{ color: "var(--accent)" }} />
            </motion.div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Privacy is our priority</h3>
              <p className="text-muted text-sm leading-relaxed max-w-2xl">
                Your results are completely confidential and are only used to provide tailored wellness recommendations.
              </p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedQuiz && !quizResult && (
            <QuizRunner 
              quizType={selectedQuiz.id} 
              onCancel={() => setSelectedQuiz(null)}
              onComplete={handleQuizComplete}
            />
          )}

          {quizResult && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="premium-card max-w-md w-full text-center relative p-12"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <div className="mb-6 inline-flex p-6 rounded-full bg-teal-500/10 text-teal-400">
                  <CheckCircle2 className="w-16 h-16" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Assessment Complete</h2>
                <p className="text-muted mb-8">You have completed the {quizResult.title}.</p>
                
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
                  <div className="text-sm uppercase tracking-widest text-muted font-bold mb-1">Your Result</div>
                  <div className="text-2xl font-bold text-teal-400 mb-1">{quizResult.result}</div>
                  <div className="text-xs text-muted">Total Score: {quizResult.score}</div>
                </div>

                <button
                  onClick={() => {
                    setSelectedQuiz(null);
                    setQuizResult(null);
                  }}
                  className="w-full py-4 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all"
                >
                  Close Results
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Assessments;
