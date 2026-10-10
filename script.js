const langModal = document.getElementById('langModal');
const welcomeScreen = document.getElementById('welcomeScreen');
const welcomeText = document.getElementById('welcomeText');
const mainContent = document.getElementById('mainContent');
const defaultLang = localStorage.getItem('pupsik-lang') || 'ru';

const strings = {
  ru: {
    welcome: 'ДОБРО ПОЖАЛОВАТЬ',
    hobbies: 'Чем занимаюсь',
    setupTitle: 'мой сетап.',
    setupSub: 'железо, на котором всё это пишется.',
    cpu: 'Процессор',
    gpu: 'Видеокарта',
    ram: 'Память',
    ssd: 'Накопитель',
  },
  en: {
    welcome: 'WELCOME TO BIO',
    hobbies: 'WHAT I DO',
    setupTitle: 'my setup.',
    setupSub: 'hardware used to vibe and code.',
    cpu: 'Processor',
    gpu: 'Graphics Card',
    ram: 'Memory',
    ssd: 'Storage',
  },
};

function applyLanguage(lang) {
  const current = strings[lang] || strings.ru;
  document.documentElement.lang = lang;

  document.getElementById('hobbiesLabel').textContent = current.hobbies;
  document.getElementById('setupTitle').textContent = current.setupTitle;
  document.getElementById('setupSub').textContent = current.setupSub;
  document.getElementById('labelCpu').textContent = current.cpu;
  document.getElementById('labelGpu').textContent = current.gpu;
  document.getElementById('labelRam').textContent = current.ram;
  document.getElementById('labelSsd').textContent = current.ssd;

  localStorage.setItem('pupsik-lang', lang);
  return current.welcome;
}

function showWelcome(lang) {
  const text = applyLanguage(lang);
  welcomeScreen.classList.add('active');
  welcomeText.textContent = '';

  let index = 0;
  const timer = setInterval(() => {
    if (index < text.length) {
      welcomeText.textContent += text[index];
      index += 1;
      return;
    }

    clearInterval(timer);
    setTimeout(() => {
      welcomeScreen.classList.remove('active');
      mainContent.classList.add('visible');
    }, 900);
  }, 90);
}

function handleLangSelection(lang) {
  langModal.classList.add('hidden');
  showWelcome(lang);
}

function copyDiscordUsername(value) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(value).catch(() => {
      fallbackCopy(value);
    });
    return;
  }

  fallbackCopy(value);
}

function fallbackCopy(value) {
  const temp = document.createElement('textarea');
  temp.value = value;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand('copy');
  document.body.removeChild(temp);
}

document.querySelectorAll('.lang-btn').forEach((button) => {
  button.addEventListener('click', () => handleLangSelection(button.dataset.lang));
});

document.querySelectorAll('.copy-button').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.copy;
    copyDiscordUsername(value);
    const original = button.innerHTML;
    button.innerHTML = '<span>Discord</span><span class="copy-value">copied!</span>';
    setTimeout(() => {
      button.innerHTML = original;
    }, 1200);
  });
});

const titleSequence = ['★ pupsik33678 ★', 'мой сетап...', '9mice vibe'];
let titleIndex = 0;
setInterval(() => {
  document.title = titleSequence[titleIndex];
  titleIndex = (titleIndex + 1) % titleSequence.length;
}, 2200);

if (defaultLang === 'en') {
  langModal.classList.add('hidden');
  showWelcome('en');
} else {
  langModal.classList.remove('hidden');
  const savedLang = localStorage.getItem('pupsik-lang');
  if (savedLang && (savedLang === 'ru' || savedLang === 'en')) {
    handleLangSelection(savedLang);
  }
}

const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let w = 0;
let h = 0;
let stars = [];

function resizeCanvas() {
  w = canvas.width = window.innerWidth * window.devicePixelRatio;
  h = canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  createStars();
}

function createStars() {
  const count = Math.min(200, Math.max(90, Math.floor((window.innerWidth * window.innerHeight) / 12)));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 2.2 + 0.4,
    speed: Math.random() * 0.8 + 0.2,
    alpha: Math.random() * 0.8 + 0.2,
  }));
}

function drawBackground() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const star of stars) {
    star.y += star.speed;
    if (star.y > window.innerHeight + 10) {
      star.y = -10;
      star.x = Math.random() * window.innerWidth;
    }

    ctx.beginPath();
    ctx.fillStyle = `rgba(165, 180, 252, ${star.alpha})`;
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.beginPath();
  const grd = ctx.createRadialGradient(
    window.innerWidth * 0.5,
    window.innerHeight * 0.45,
    0,
    window.innerWidth * 0.5,
    window.innerHeight * 0.45,
    window.innerWidth * 0.7
  );
  grd.addColorStop(0, 'rgba(129, 140, 248, 0.08)');
  grd.addColorStop(1, 'rgba(129, 140, 248, 0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  requestAnimationFrame(drawBackground);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawBackground();

window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('pupsik-lang')) {
    langModal.classList.remove('hidden');
  }
});

if (defaultLang === 'en') {
  showWelcome('en');
}
