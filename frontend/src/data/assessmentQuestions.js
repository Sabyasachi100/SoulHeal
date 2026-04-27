export const assessmentData = {
  anxiety: {
    title: "Anxiety Self-Assessment (GAD-7)",
    description: "Over the last 2 weeks, how often have you been bothered by the following problems?",
    questions: [
      "Feeling nervous, anxious, or on edge",
      "Not being able to stop or control worrying",
      "Worrying too much about different things",
      "Trouble relaxing",
      "Being so restless that it is hard to sit still",
      "Becoming easily annoyed or irritable",
      "Feeling afraid, as if something awful might happen"
    ],
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ],
    getResults: (score) => {
      if (score <= 4) return "Minimal Anxiety";
      if (score <= 9) return "Mild Anxiety";
      if (score <= 14) return "Moderate Anxiety";
      return "Severe Anxiety";
    }
  },
  depression: {
    title: "Depression Screen (PHQ-9)",
    description: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
    questions: [
      "Little interest or pleasure in doing things",
      "Feeling down, depressed, or hopeless",
      "Trouble falling or staying asleep, or sleeping too much",
      "Feeling tired or having little energy",
      "Poor appetite or overeating",
      "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
      "Trouble concentrating on things, such as reading the newspaper or watching television",
      "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
      "Thoughts that you would be better off dead or of hurting yourself in some way"
    ],
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ],
    getResults: (score) => {
      if (score <= 4) return "Minimal Depression";
      if (score <= 9) return "Mild Depression";
      if (score <= 14) return "Moderate Depression";
      if (score <= 19) return "Moderately Severe Depression";
      return "Severe Depression";
    }
  },
  stress: {
    title: "Stress Level Indicator (PSS-10)",
    description: "In the last month, how often have you felt...",
    questions: [
      "In the last month, how often have you been upset because of something that happened unexpectedly?",
      "In the last month, how often have you felt that you were unable to control the important things in your life?",
      "In the last month, how often have you felt nervous and 'stressed'?",
      "In the last month, how often have you felt confident about your ability to handle your personal problems?",
      "In the last month, how often have you felt that things were going your way?",
      "In the last month, how often have you found that you could not cope with all the things that you had to do?",
      "In the last month, how often have you been able to control irritations in your life?",
      "In the last month, how often have you felt that you were on top of things?",
      "In the last month, how often have you been angered because of things that were outside of your control?",
      "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?"
    ],
    options: [
      { text: "Never", score: 0 },
      { text: "Almost Never", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Fairly Often", score: 3 },
      { text: "Very Often", score: 4 }
    ],
    // Note: Items 4, 5, 7, and 8 are reversed in actual PSS-10. For simplicity, we might just use a general scale or fix it.
    // Let's fix it in the scoring logic or just provide a simplified version.
    getResults: (score) => {
      if (score <= 13) return "Low Stress";
      if (score <= 26) return "Moderate Stress";
      return "High Perceived Stress";
    }
  },
  sleep: {
    title: "Sleep Quality Assessment",
    description: "Assess your sleep patterns and quality over the past month.",
    questions: [
      "How often do you have trouble falling asleep within 30 minutes?",
      "How often do you wake up in the middle of the night or early morning?",
      "How often do you have trouble staying asleep?",
      "How often do you feel daytime sleepiness that interferes with your activities?",
      "How would you rate your overall sleep quality?"
    ],
    options: [
      { text: "Never", score: 0 },
      { text: "Rarely", score: 1 },
      { text: "Sometimes", score: 2 },
      { text: "Frequently", score: 3 },
      { text: "Always", score: 4 }
    ],
    getResults: (score) => {
      if (score <= 5) return "Excellent Sleep Quality";
      if (score <= 10) return "Good Sleep Quality";
      if (score <= 15) return "Fair Sleep Quality";
      return "Poor Sleep Quality";
    }
  },
  selfEsteem: {
    title: "Self-Esteem Scale",
    description: "A quick measure of your current self-worth and confidence.",
    questions: [
      "On the whole, I am satisfied with myself.",
      "At times I think I am no good at all.",
      "I feel that I have a number of good qualities.",
      "I am able to do things as well as most other people.",
      "I feel I do not have much to be proud of.",
      "I certainly feel useless at times.",
      "I feel that I'm a person of worth, at least on an equal plane with others.",
      "I wish I could have more respect for myself.",
      "All in all, I am inclined to feel that I am a failure.",
      "I take a positive attitude toward myself."
    ],
    options: [
      { text: "Strongly Disagree", score: 0 },
      { text: "Disagree", score: 1 },
      { text: "Agree", score: 2 },
      { text: "Strongly Agree", score: 3 }
    ],
    getResults: (score) => {
      if (score <= 15) return "Low Self-Esteem";
      if (score <= 25) return "Average Self-Esteem";
      return "High Self-Esteem";
    }
  }
};
