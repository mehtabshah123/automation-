// src/contexts/LanguageContext.jsx
import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
export const LanguageContext = createContext();

// Default translations object - ALL YOUR TEXT GOES HERE
const translations = {
  en: {
    home: "Home",
    chatbot: "Chatbot",
    forum: "Forum",
    booking: "Booking",
    resources: "Resources",
    features: "Features", // NEW: For Navbar
    login: "Login",
    admin: "Admin",
    my_wellbeing: "MainKrunga",
    hero_title: "Your Journey to Wellbeing Starts Here",
    hero_description: "A safe and supportive space for college students to navigate mental health challenges and thrive.",
    talk_to_chatbot: "Talk to our Chatbot",
    join_community: "Join the Community",
    quick_navigation: "Quick Navigation",
    need_to_talk: "Need to Talk?",
    chatbot_prompt: "Our AI chatbot is here to listen and offer initial support 24/7.",
    chat_now: "Chat Now",
    connect_share: "Connect & Share",
    forum_prompt: "Discuss your thoughts and experiences with peers in a supportive forum.",
    visit_forum: "Visit Forum",
    learn_grow: "Learn & Grow",
    resources_prompt: "Access curated resources including videos, articles, and guides.",
    explore_resources: "Explore Resources",

    // Resources Page specific translations
    wellbeing_resources: "Wellbeing Resources",
    resources_page_description: "Explore a curated collection of videos, audios, and guides to support your mental health journey.",
    mindfulness_video_title: "Mindfulness for Stress Relief",
    mindfulness_video_description: "A guided video to help you practice mindfulness and reduce stress.",
    sleep_meditation_title: "Guided Meditation for Sleep",
    sleep_meditation_description: "Relaxing audio session to help you unwind and fall asleep peacefully.",
    effective_study_title: "Effective Study Habits",
    effective_study_description: "A comprehensive guide on developing better study habits and managing time.",
    coping_anxiety_title: "Coping with Anxiety",
    coping_anxiety_description: "Expert tips and strategies for managing anxiety in college.",
    energy_boost_title: "Quick Energy Boost",
    energy_boost_description: "A short audio track to re-energize and refocus during busy days.",
    building_resilience_title: "Building Resilience",
    building_resilience_description: "Learn how to bounce back from setbacks and cultivate mental toughness.",
    access_video: "Access Video",
    access_audio: "Access Audio",
    access_guide: "Access Guide",
    access: "Access", // General 'Access' for resource type

    // Booking Page specific translations (assuming you have a Booking.jsx)
    book_session: "Book a Session",
    booking_description: "Find and book appointments with our wellbeing professionals.",
    booking_soon: "Booking features coming soon!",
    booking_integration_tip: "This is where you would integrate a calendar or booking system.",

    // Chatbot Page specific translations
    wellbeing_chatbot: "Wellbeing Chatbot",
    chatbot_initial_msg: "Hi there! I'm your wellbeing chatbot. How can I help you today?",
    chatbot_user_exam_stress: "I'm feeling a bit stressed about my exams.",
    chatbot_bot_response_1: "That's completely understandable. Many students feel that way. Would you like to try some quick relaxation exercises?",
    chatbot_bot_learning_msg: "I'm still learning, but I hear you. Please consider reaching out to a professional if you're feeling overwhelmed.",
    chatbot_input_placeholder: "Type your message...",
    chatbot_send_button: "Send",


    // Language Selector
    language_selector: "Language"
  },
  es: {
    home: "Inicio",
    chatbot: "Chatbot",
    forum: "Foro",
    booking: "Reservar",
    resources: "Recursos",
    features: "Características", // NEW
    login: "Iniciar Sesión",
    admin: "Admin",
    my_wellbeing: "MiBienestar",
    hero_title: "Tu Viaje hacia el Bienestar Comienza Aquí",
    hero_description: "Un espacio seguro y de apoyo para estudiantes universitarios para manejar los desafíos de salud mental y prosperar.",
    talk_to_chatbot: "Habla con nuestro Chatbot",
    join_community: "Únete a la Comunidad",
    quick_navigation: "Navegación Rápida",
    need_to_talk: "¿Necesitas Hablar?",
    chatbot_prompt: "Nuestro chatbot de IA está aquí para escuchar y ofrecer soporte inicial 24/7.",
    chat_now: "Chatea Ahora",
    connect_share: "Conecta y Comparte",
    forum_prompt: "Discute tus pensamientos y experiencias con compañeros en un foro de apoyo.",
    visit_forum: "Visita el Foro",
    learn_grow: "Aprende y Crece",
    resources_prompt: "Accede a recursos curados que incluyen videos, artículos y guías.",
    explore_resources: "Explorar Recursos",

    // Resources Page specific translations
    wellbeing_resources: "Recursos de Bienestar",
    resources_page_description: "Explora una colección curada de videos, audios y guías para apoyar tu viaje de salud mental.",
    mindfulness_video_title: "Mindfulness para Aliviar el Estrés",
    mindfulness_video_description: "Un video guiado para ayudarte a practicar mindfulness y reducir el estrés.",
    sleep_meditation_title: "Meditación Guiada para Dormir",
    sleep_meditation_description: "Sesión de audio relajante para ayudarte a desconectar y conciliar el sueño en paz.",
    effective_study_title: "Hábitos de Estudio Efectivos",
    effective_study_description: "Una guía completa para desarrollar mejores hábitos de estudio y gestionar el tiempo.",
    coping_anxiety_title: "Cómo Afrontar la Ansiedad",
    coping_anxiety_description: "Consejos y estrategias de expertos para manejar la ansiedad en la universidad.",
    energy_boost_title: "Aumento Rápido de Energía",
    energy_boost_description: "Una pista de audio corta para recargarte y reenfocarte en días ajetreados.",
    building_resilience_title: "Desarrollo de Resiliencia",
    building_resilience_description: "Aprende a recuperarte de los contratiempos y a cultivar la fortaleza mental.",
    access_video: "Acceder al Video",
    access_audio: "Acceder al Audio",
    access_guide: "Acceder a la Guía",
    access: "Acceder",

    // Booking Page specific translations
    book_session: "Reservar una Sesión",
    booking_description: "Encuentra y reserva citas con nuestros profesionales del bienestar.",
    booking_soon: "¡Funciones de reserva próximamente!",
    booking_integration_tip: "Aquí es donde integrarías un calendario o sistema de reservas.",

    // Chatbot Page specific translations
    wellbeing_chatbot: "Chatbot de Bienestar",
    chatbot_initial_msg: "¡Hola! Soy tu chatbot de bienestar. ¿Cómo puedo ayudarte hoy?",
    chatbot_user_exam_stress: "Me siento un poco estresado por mis exámenes.",
    chatbot_bot_response_1: "Eso es completamente comprensible. Muchos estudiantes se sienten así. ¿Te gustaría probar algunos ejercicios rápidos de relajación?",
    chatbot_bot_learning_msg: "Todavía estoy aprendiendo, pero te escucho. Por favor, considera contactar a un profesional si te sientes abrumado.",
    chatbot_input_placeholder: "Escribe tu mensaje...",
    chatbot_send_button: "Enviar",

    // Language Selector
    language_selector: "Idioma"
  },
  fr: {
    home: "Accueil",
    chatbot: "Chatbot",
    forum: "Forum",
    booking: "Réservation",
    resources: "Ressources",
    features: "Fonctionnalités", // NEW
    login: "Connexion",
    admin: "Admin",
    my_wellbeing: "MonBien-être",
    hero_title: "Votre Voyage vers le Bien-être Commence Ici",
    hero_description: "Un espace sûr et solidaire pour les étudiants universitaires afin de gérer les défis de santé mentale et de s'épanouir.",
    talk_to_chatbot: "Parlez à notre Chatbot",
    join_community: "Rejoignez la Communauté",
    quick_navigation: "Navigation Rapide",
    need_to_talk: "Besoin de Parler ?",
    chatbot_prompt: "Notre chatbot IA est là pour écouter et offrir un soutien initial 24h/24 et 7j/7.",
    chat_now: "Discuter Maintenant",
    connect_share: "Connecter et Partager",
    forum_prompt: "Discutez de vos pensées et expériences avec vos pairs sur un forum de soutien.",
    visit_forum: "Visiter le Forum",
    learn_grow: "Apprendre et Grandir",
    resources_prompt: "Accédez à une collection de ressources sélectionnées, y compris des vidéos, des articles et des guides.",
    explore_resources: "Explorer les Ressources",

    // Resources Page specific translations
    wellbeing_resources: "Ressources de Bien-être",
    resources_page_description: "Découvrez une collection de vidéos, audios et guides pour soutenir votre parcours de santé mentale.",
    mindfulness_video_title: "Pleine conscience pour le soulagement du stress",
    mindfulness_video_description: "Une vidéo guidée pour vous aider à pratiquer la pleine conscience et à réduire le stress.",
    sleep_meditation_title: "Méditation guidée pour le sommeil",
    sleep_meditation_description: "Séance audio relaxante pour vous aider à vous détendre et à vous endormir paisiblement.",
    effective_study_title: "Habitudes d'étude efficaces",
    effective_study_description: "Un guide complet pour développer de meilleures habitudes d'étude et gérer votre temps.",
    coping_anxiety_title: "Faire face à l'anxiété",
    coping_anxiety_description: "Conseils et stratégies d'experts pour gérer l'anxiété à l'université.",
    energy_boost_title: "Boost d'énergie rapide",
    energy_boost_description: "Une courte piste audio pour vous redynamiser et vous reconcentrer pendant les journées chargées.",
    building_resilience_title: "Développer la résilience",
    building_resilience_description: "Apprenez à rebondir après les revers et à cultiver la force mentale.",
    access_video: "Accéder à la Vidéo",
    access_audio: "Accéder à l'Audio",
    access_guide: "Accéder au Guide",
    access: "Accéder",

    // Booking Page specific translations
    book_session: "Réserver une Séance",
    booking_description: "Trouvez et réservez des rendez-vous avec nos professionnels du bien-être.",
    booking_soon: "Fonctionnalités de réservation bientôt disponibles !",
    booking_integration_tip: "C'est ici que vous intégreriez un calendrier ou un système de réservation.",

    // Chatbot Page specific translations
    wellbeing_chatbot: "Chatbot Bien-être",
    chatbot_initial_msg: "Salut ! Je suis votre chatbot bien-être. Comment puis-je vous aider aujourd'hui ?",
    chatbot_user_exam_stress: "Je me sens un peu stressé à cause de mes examens.",
    chatbot_bot_response_1: "C'est tout à fait compréhensible. Beaucoup d'étudiants se sentent ainsi. Souhaitez-vous essayer quelques exercices de relaxation rapide ?",
    chatbot_bot_learning_msg: "J'apprends encore, mais je vous entends. Veuillez envisager de contacter un professionnel si vous vous sentez dépassé.",
    chatbot_input_placeholder: "Tapez votre message...",
    chatbot_send_button: "Envoyer",

    // Language Selector
    language_selector: "Langue"
  }
};

// 2. Create the Provider Component
export const LanguageProvider = ({ children }) => {
  // Use localStorage to remember the last chosen language
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('language') || 'en' // Default to English
  );

  const setLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang); // Save to localStorage
  };

  // The translation function 't'
  const t = (key) => {
    // Return the translated string, or the key itself if no translation found
    return translations[currentLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 3. Create a custom hook for convenience
export const useLanguage = () => useContext(LanguageContext);