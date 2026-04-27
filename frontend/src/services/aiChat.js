/**
 * SoulHeal AI Response Engine
 * Simulates a mental health counselor AI with contextual responses.
 */

const responses = {
  greetings: [
    "Hello! 😊 I'm SoulHeal AI, your mental wellness companion. How are you feeling today?",
    "Hi there! I'm here to listen. What's been on your mind lately?",
    "Welcome! I'm glad you reached out. How can I support you today?",
  ],
  anxiety: [
    "It sounds like you're feeling quite anxious. That's completely valid. Let's try a quick grounding exercise — can you name 5 things you can see right now?",
    "Anxiety can feel overwhelming, but you're not alone. Deep breathing often helps — try inhaling for 4 seconds, holding for 4, and exhaling for 6.",
    "I hear you. When anxiety strikes, it helps to focus on what you *can* control. What's one small thing you could do right now to feel a little better?",
    "That sounds really tough. Anxiety is your mind's way of trying to protect you, but it can be exhausting. Would you like to talk about what's triggering it?",
  ],
  stress: [
    "Stress can build up so quickly. It's important to check in with yourself regularly. Have you had any time today just for yourself?",
    "You're doing a lot — it's okay to feel stretched thin. Breaking things into smaller tasks can make a big difference. What feels most overwhelming right now?",
    "It's okay to slow down. Taking even 5 minutes to breathe and reset can help more than you'd think. You're handling a lot, and that takes strength.",
    "High stress levels affect both your mind and body. Make sure you're drinking water, getting some movement, and not skipping meals. Small habits add up.",
  ],
  sad: [
    "I'm really sorry you're feeling this way. Sadness is a natural emotion, and it's okay to sit with it for a while. You don't have to push it away.",
    "Feeling sad can be draining. Is there something specific that happened, or does it feel more like a general heaviness?",
    "You're not alone in this. Sometimes just talking about how we feel makes the weight lighter. I'm here to listen without judgment.",
    "It's okay to not be okay. What you're feeling is real and valid. Have you talked to anyone close to you about this?",
  ],
  happy: [
    "That's wonderful to hear! 🌟 Holding onto these positive moments matters. What made today special?",
    "I love that! Celebrating the good moments — big or small — is so meaningful. Keep nurturing that energy!",
    "Happiness is worth savoring. What's been contributing most to how you're feeling today?",
  ],
  sleep: [
    "Sleep is so important for mental wellness. Are you getting enough rest? A consistent sleep schedule can work wonders for your mood.",
    "Poor sleep and mental health are tightly linked. If your mind is racing at night, try writing your thoughts in a journal before bed.",
    "You might want to try a sleep meditation or calming sounds from our Resources section. Winding down 30 mins before bed also helps a lot.",
  ],
  lonely: [
    "Loneliness can be one of the hardest feelings. Even when surrounded by people, we can feel unseen. You reaching out here is a brave step.",
    "You are seen, and you matter. Sometimes loneliness is a sign we need more meaningful connections — not just more people around us.",
    "I'm here with you right now. Would it help to talk about what kind of connection you're missing most?",
  ],
  anger: [
    "Feeling angry is completely human. It often signals that a boundary has been crossed or something important to you is at risk.",
    "Before reacting, try the 5-second pause — breathe in deeply and count to 5. It creates space between what you feel and what you do.",
    "Anger can be exhausting. What's the root of what you're feeling? Sometimes anger is sadness or fear wearing a different mask.",
  ],
  gratitude: [
    "That's a beautiful mindset! Gratitude has a real, scientifically proven impact on mental well-being. What are you grateful for right now?",
    "I love that you're focusing on the positives. Gratitude journaling can amplify that feeling — even writing 3 things daily makes a difference.",
  ],
  therapy: [
    "Therapy is a great step. It's a sign of strength, not weakness. Would you like to explore booking a session with one of our counselors?",
    "Reaching out for professional support is one of the bravest things you can do. Our Appointments page has certified counselors ready to help.",
  ],
  meditation: [
    "Meditation is one of the most powerful tools for mental calm. Even 5 minutes a day can reduce anxiety and improve focus over time.",
    "Have you tried guided meditation? Our Resources section has audio sessions you can start right now. Would you like a suggestion?",
  ],
  breathing: [
    "Box breathing is incredibly effective — inhale 4 counts, hold 4, exhale 4, hold 4. Repeat 4 times. Try it now and see how you feel. 🌬️",
    "Slow, deep breaths activate your parasympathetic nervous system — your body's calm response. Great choice for managing anxiety!",
  ],
  default: [
    "I hear you. Can you tell me a little more about how you're feeling?",
    "Thank you for sharing that with me. Your feelings are valid. What's weighing on you most right now?",
    "I'm here to listen. Would you like to talk more about what's going on?",
    "That sounds meaningful. I want to make sure I understand — can you tell me more?",
    "You're in a safe space here. Take your time and share what feels right.",
    "I appreciate you trusting me with this. What kind of support would feel most helpful right now?",
  ],
};

const getResponse = (message) => {
  const lower = message.toLowerCase();

  if (/\b(hi|hello|hey|good morning|good evening|howdy)\b/.test(lower)) return pick(responses.greetings);
  if (/\b(anxious|anxiety|panic|worried|worry|nervous|dread)\b/.test(lower)) return pick(responses.anxiety);
  if (/\b(stress|stressed|overwhelm|burnout|exhausted|pressure)\b/.test(lower)) return pick(responses.stress);
  if (/\b(sad|unhappy|depressed|depression|crying|hopeless|empty|down)\b/.test(lower)) return pick(responses.sad);
  if (/\b(happy|great|good|amazing|wonderful|excited|joy|pleased)\b/.test(lower)) return pick(responses.happy);
  if (/\b(sleep|insomnia|tired|fatigue|rest|nightmare)\b/.test(lower)) return pick(responses.sleep);
  if (/\b(lonely|alone|isolated|no one|no friends|abandoned)\b/.test(lower)) return pick(responses.lonely);
  if (/\b(angry|anger|mad|furious|frustrat|rage|annoyed)\b/.test(lower)) return pick(responses.anger);
  if (/\b(grateful|gratitude|thankful|appreciate|blessed)\b/.test(lower)) return pick(responses.gratitude);
  if (/\b(therapy|therapist|counselor|counsel|appointment|session|book)\b/.test(lower)) return pick(responses.therapy);
  if (/\b(meditat|mindful|calm|peace|zen)\b/.test(lower)) return pick(responses.meditation);
  if (/\b(breath|breathe|breathing|exhale)\b/.test(lower)) return pick(responses.breathing);

  return pick(responses.default);
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default getResponse;
