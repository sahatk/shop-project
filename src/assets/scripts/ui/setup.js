const etUI = {};
// config
etUI.config = {
  media: {
    names: ['isMobile', 'isDesktop'],
    points: [1023],
  },
  animation: {
    duration: 0.4,
    stagger: 0.1,
    easing: 'Power2.easeOut',
  },
  layer: {
    dimmOpacity: 0.6,
  },
  initDefault() {
    gsap.defaults({
      ease: this.animation.easing,
      duration: this.animation.duration,
    });
  },
  lenis: {
    enable: false,
    options: {},
    speed: 2000,
    lagSmoothing: 0,
  },
  locale: {
    default: 'ko',
  },
  lottie: {
    basePath: location.pathname.startsWith('/p/') ? '/p/assets/images/lottie' : '/assets/images/lottie',
  },
};
etUI.config.initDefault();

// pages
etUI.pages = {};

etUI.locales = {};
etUI.locales.ko = {
  input: {
    password_hide: '비밀번호 숨기기',
    password_show: '비밀번호 표시',
    clear: '내용 지우기',
  },
  swiper: {
    navigation: {
      prev: '이전 슬라이드',
      next: '다음 슬라이드',
    },
    pagination: {
      page: '페이지',
    },
    autoplay: {
      play: '재생',
      pause: '정지',
    },
  },
  dialog: {
    positive: '확인',
    negative: '취소',
  },
};

etUI.$t = function (key, defaultText = '') {
  const locale = etUI.locales[etUI.config.locale.default];
  return etUI.utils.getValueFromNestedObject(locale, key) || defaultText;
};

window.etUI = etUI;
