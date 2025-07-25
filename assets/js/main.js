/**
* Template Name: Arsha
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Updated: Feb 22 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

AOS.init();

    // log.json에서 값 받아와서 동적으로 갱신
    async function updateStats() {
      try {
        const response = await fetch('https://autofic-core-kmw6.onrender.com/log.json');
        const data = await response.json();

        // 합계 계산
        const totalVulns = data.repos.reduce((sum, repo) => sum + (repo.vulnerabilities || 0), 0);
        const totalPRs = data.prs.length;
        const totalRepos = data.repos.length;
        const approvedPRs = data.prs.filter(pr => pr.approved === true).length;
        const avgVulnsPerRepo = totalVulns / totalRepos;
        const avgFormatted = avgVulnsPerRepo.toFixed(1);

        // 상세 설명 텍스트용 숫자 갱신
        document.getElementById('mean-vuln').textContent = avgFormatted.toLocaleString() + "개";
        document.getElementById('vuln-total').textContent = totalVulns.toLocaleString() + "개";
        document.getElementById('pr-total').textContent = totalPRs.toLocaleString() + "건";
        document.getElementById('repo-total').textContent = totalRepos.toLocaleString() + "개";
        document.getElementById('approve-pr').textContent = approvedPRs.toLocaleString() + "개";

        // 하단 카운터용 data-target도 갱신
        const counters = document.querySelectorAll('.counter');
        if (counters[0]) counters[0].setAttribute('data-target', totalVulns);
        if (counters[1]) counters[1].setAttribute('data-target', totalPRs);
        if (counters[2]) counters[2].setAttribute('data-target', approvedPRs);
      } catch (err) {
        console.error('통계 정보 불러오기 실패:', err);
      }
    }
    updateStats();

    // 카운터 애니메이션 로직
    document.addEventListener('aos:in', ({ detail }) => {
      if (detail.classList.contains('counter')) {
        startCount(detail);
      }
      // summary 섹션이 들어올 때만 실행
      if(event.detail.id === 'summary') {
        const logo = document.getElementById('shieldLogo');
        // 0에서 900deg까지 5회전 애니메이션
        logo.style.transition = "transform 2.2s cubic-bezier(0.23, 1, 0.32, 1)";
        logo.style.transform = "rotateY(1440deg)";
      }
    });

    function startCount(el) {
      const target = +el.getAttribute('data-target');
      const duration = +el.getAttribute('data-aos-duration') || 1000;
      const start = 0;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 2);
        const current = Math.floor(ease * (target - start) + start);
        el.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toLocaleString();
        }
      }
      requestAnimationFrame(update);
    }
    
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

if (isTouchDevice()) {
  // 모바일(터치)에서만 click 팝업!
  document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('click', function (e) {
      // 다른 카드의 popup 모두 닫기
      document.querySelectorAll('.popup-info').forEach(p => { if(p !== card.querySelector('.popup-info')) p.style.display = 'none'; });
      let popup = card.querySelector('.popup-info');
      popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
      e.stopPropagation();
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.popup-info').forEach(p => p.style.display = 'none');
  });
}
// PC에서는 CSS hover로만 제어(기존대로)

// a 태그 클릭시 포커스 해제(모바일, 데스크톱 모두)
document.querySelectorAll('.team-card a').forEach(function(link) {
  link.addEventListener('mouseup', function() {
    this.blur();
  });
});


function getDurationString(fromDate, toDate) {
  const msDay = 1000 * 60 * 60 * 24;
  const days = Math.floor((toDate - fromDate) / msDay);

  // 항상 일수로만 출력
  return `${days}일의 역사를 가지고 있습니다.`;
}

document.addEventListener("DOMContentLoaded", function() {
  const baseDate = new Date(2025, 4, 1); // 5월 = 4
  const today = new Date();
  const msDay = 1000 * 60 * 60 * 24;
  const days = Math.floor((today - baseDate) / msDay);

  // days(숫자)만 색상 강조
  document.getElementById("autofic-duration").innerHTML =
    `2025년 5월 1일부터, <br>AutoFiC과 함께한 <span style="color:#4782fa; font-weight:700;">${days}</span>일의 여정`;
});



document.addEventListener("DOMContentLoaded", function () {
  // 주요 이벤트 데이터
  const events = [
    { label: "Lint", year: "1978", icon: "assets/img/sast_logo/lint.png", pos: 0, desc: "최초의 정적 코드 분석기<br>오픈소스 시대의 시작" },
    { label: "Fortify", year: "2003", icon: "assets/img/sast_logo/fortify.png", pos: 15, desc: "기업 환경 보안 코드 스캐너<br>대규모 프로젝트에 특화" },
    { label: "SonarQube", year: "2008", icon: "assets/img/sast_logo/sonarqube.png", pos: 29, desc: "지속적 통합과 품질 관리 자동화<br>코드 스멜·버그·취약점 종합 진단" },
    { label: "Snyk", year: "2015", icon: "assets/img/sast_logo/snyk.png", pos: 45, desc: "OSS 보안 취약점 탐지, 개발자 친화<br>DevSecOps 환경을 위한 통합 도구" },
    { label: "Semgrep", year: "2020", icon: "assets/img/sast_logo/semgrep.png", pos: 56, desc: "빠르고 유연한 패턴 기반 정적 분석<br>사용자 정의 룰로 보안 탐지" },
    { label: "GPT-3.5", year: "2023", icon: "assets/img/sast_logo/gpt.png", pos: 68, desc: "AI 기반 코드 리뷰 및 생성<br>자연어로 보안 코드 설명 가능" },
    { label: "AutoFiC", year: "2025", icon: "assets/img/sast_logo/logo.png", pos: 79, desc: "AI가 자동으로 PR까지 제출<br>탐지/수정/PR 통합 자동화" },
  ];

  const totalBars = 80; // 0~79
  const timeline = document.getElementById("timelineTrack");

  // 1. 막대 배치
  for (let i = 0; i < totalBars; i++) {
    const mainIdx = events.findIndex(ev => ev.pos === i);
    const bar = document.createElement('div');
    bar.className = "timeline-bar" + (mainIdx !== -1 ? "" : " gray");
    bar.style.left = `${(i/(totalBars-1))*100}%`;
    if (mainIdx !== -1) {
      bar.setAttribute("data-idx", mainIdx); // 메인 이벤트 인덱스 저장
    }
    timeline.appendChild(bar);
  }

  // 2. 이벤트 노드 배치 (위/아래 번갈아)
  events.forEach((ev, idx) => {
    const eventEl = document.createElement('div');
    eventEl.className = "timeline-event " + (idx%2===0 ? "top" : "bottom");
    eventEl.style.left = `${(ev.pos/(totalBars-1))*100}%`;
    eventEl.setAttribute("data-idx", idx);
    eventEl.innerHTML = `
      <div class="icon">
        <img src="${ev.icon}" alt="${ev.label}" style="width:36px;height:36px;object-fit:contain;">
      </div>
      <div class="main${ev.label === "AutoFiC" ? " autofic-main" : ""}">${ev.label}</div>
      <div class="date">${ev.year}</div>
      <div class="custom-tooltip">${ev.desc || ""}</div>
    `;
    timeline.appendChild(eventEl);
  });

  // 3. 막대 proximity 확대
  const bars = Array.from(timeline.querySelectorAll('.timeline-bar'));
  timeline.addEventListener('mousemove', function(e) {
    const rect = timeline.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    bars.forEach(bar => {
      const barRect = bar.getBoundingClientRect();
      const barX = (barRect.left + barRect.right) / 2 - rect.left;
      const dist = Math.abs(mouseX - barX);
      if (dist < 40) {
        bar.classList.add('animated');
      } else {
        bar.classList.remove('animated');
      }
    });
  });
  timeline.addEventListener('mouseleave', function() {
    bars.forEach(bar => bar.classList.remove('animated'));
  });

  // 4. 툴팁 - 막대/이벤트 둘 다!
  // 툴팁 보여주기/숨기기 함수
function showTooltip(idx) {
  document.querySelectorAll('.custom-tooltip').forEach(tip => tip.classList.remove('active', 'left-edge', 'right-edge'));
  const eventNode = document.querySelector(`.timeline-event[data-idx="${idx}"]`);
  const tooltip = eventNode ? eventNode.querySelector('.custom-tooltip') : null;
  if (tooltip) {
    tooltip.classList.add('active');
    adjustTooltipPosition(tooltip, eventNode);
  }
}
  function hideTooltip() {
    document.querySelectorAll('.custom-tooltip').forEach(tip => tip.classList.remove('active'));
  }

  // (1) 이모지+이름에 마우스 올리면
  timeline.addEventListener('mouseover', function(e) {
    const eventNode = e.target.closest('.timeline-event');
    if (eventNode) {
      showTooltip(eventNode.getAttribute("data-idx"));
    }
    // (2) 메인 막대에 마우스 올리면
    if (e.target.classList.contains('timeline-bar') && e.target.hasAttribute('data-idx')) {
      showTooltip(e.target.getAttribute("data-idx"));
    }
  });
  timeline.addEventListener('mouseout', function(e) {
    // 툴팁 바깥으로 나갈 때만 숨김
    if (!timeline.contains(e.relatedTarget)) hideTooltip();
  });
});


// 툴팁이 화면을 벗어나지 않도록 위치 조정
function adjustTooltipPosition(tooltip, parent) {
  tooltip.classList.remove('left-edge', 'right-edge');
  tooltip.style.left = '';
  tooltip.style.right = '';
  tooltip.style.display = 'block';
  tooltip.style.opacity = '0';
  setTimeout(() => {
    const rect = tooltip.getBoundingClientRect();
    if (rect.left < 8) {
      tooltip.classList.add('left-edge');
    } else if (rect.right > window.innerWidth - 8) {
      tooltip.classList.add('right-edge');
    }
    tooltip.style.display = '';
    tooltip.style.opacity = '';
  }, 2);
}

const logo = document.getElementById('shieldLogo');
let isDragging = false;
let startX = 0;
let dragRotation = 0;

// 이미지 드래그 방지
document.querySelector('.logo-front img').addEventListener('dragstart', e => e.preventDefault());

logo.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX;
    logo.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    const dragDistance = e.clientX - startX;
    dragRotation = dragDistance / 200 * 180; // 자연스러운 회전
    logo.style.transform = `rotateY(${dragRotation}deg)`;
});

document.addEventListener('mouseup', function(e) {
    if (isDragging) {
        // 드래그가 끝나면 앞면(0도)으로 자동 복귀!
        logo.style.transform = `rotateY(0deg)`;
        isDragging = false;
        dragRotation = 0;
        logo.style.cursor = 'grab';
    }
});

// 자동 타이핑
document.addEventListener("DOMContentLoaded", function() {
    var typed = new Typed('#typed', {
      strings: ['Hi, This is <strong>AutoFiC</strong>'],
      typeSpeed: 60,
      backSpeed: 60,
      showCursor: true,  // 커서(타이핑 커서) 표시 원하면 true
      contentType: 'html', // strong 태그 등 HTML을 적용하려면 'html'
      loop: true           // 무한 반복
    });
});