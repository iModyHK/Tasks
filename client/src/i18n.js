
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Dashboard": "Dashboard",
      "Tasks": "Tasks",
      "Calendar": "Calendar",
      "Chat": "Team Chat",
      "Notifications": "Notifications",
      "Gamification": "Gamification",
      "Dark Mode": "Dark Mode",
      "Light Mode": "Light Mode"
    }
  },
  ar: {
    translation: {
      "Dashboard": "لوحة القيادة",
      "Tasks": "المهام",
      "Calendar": "التقويم",
      "Chat": "دردشة الفريق",
      "Notifications": "الإشعارات",
      "Gamification": "التحديات",
      "Dark Mode": "الوضع الداكن",
      "Light Mode": "الوضع الفاتح"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
