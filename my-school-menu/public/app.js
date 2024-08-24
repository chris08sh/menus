document.addEventListener("DOMContentLoaded", () => {
    const dateElement = document.getElementById("current-date");
    const prevDayButton = document.getElementById("prev-day");
    const nextDayButton = document.getElementById("next-day");
    const menuList = document.getElementById("menu-list");
    const datePicker = document.getElementById("date-picker");

    // 날짜별 메뉴 데이터
    const menuData = {
        "2024-08-19": ["흰밥", "돈등뼈감자탕", "콘치즈반달돈가스", "삼색큐브묵무침","사과치커리땅콩샐러드","깍두기"],
        "2024-08-20": ["기장밥", "왕만두국", "청양숯불닭고기찜", "알감자버터구이","가지굴소스볶음","짜먹는요구르트","배추김치"],
        "2024-08-21": ["참치김치밥버거", "꼬치어묵국", "불고기피도그피자", "뽕따","깍두기"],
        "2024-08-22": ["혼합잡곡밥", "쇠고기배추국", "떡갈비그라탕", "참나물진미채무침","씨없는포도","배추김치"],
        "2024-08-23": ["흰밥", "미니가쓰오김치우동", "가치동", "양배추샐러드","마늘바게트","망고파인음료","깍두기"],
        "2024-08-26": ["흰밥", "순두부찌개", "수육*쌈장", "콩나물실파무침","잡채김말이강정","석류코코푸딩","보쌈김치"],
        "2024-08-27": ["흑미밥", "건새우아욱국", "매운돼지갈비찜", "로스티드콘해시브라운","호두멸치볶음", "아이스홍시", "배추김치"],
        "2024-08-28": ["한국식빠에야", "알리오올리오스파게티", "초코추러스", "허브소세지그린샐러드","포두주스","피클"],
        "2024-08-29": ["차조수수밥", "쇠고기미역국", "훈제오리겨자무침", "불고기퀘사디아","마늘쫑어묵볶음","요구르트","배추김치"],
        "2024-08-30": ["기장밥", "부대찌개", "한우버섯불고기", "납작군만두","새콤쫄면무침","워터젤리","깍두기"]
    };

    // 현재 날짜를 표시하는 함수
    function displayDate(date) {
        const options = { month: 'long', day: 'numeric', weekday: 'long' };
        dateElement.textContent = date.toLocaleDateString('ko-KR', options);
    }

    // 주말인지 확인하는 함수
    function isWeekend(date) {
        return date.getDay() === 0 || date.getDay() === 6; // 0은 일요일, 6은 토요일
    }

    // 다음 날짜 계산 함수
    function getNextDate(date) {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        if (isWeekend(nextDate)) {
            nextDate.setDate(nextDate.getDate() + (8 - nextDate.getDay())); // 다음 주 월요일로 이동
        }
        return nextDate;
    }

    function animateButton(button) {
        button.classList.add('btn-clicked');
        setTimeout(() => {
            button.classList.remove('btn-clicked');
        },200);
        
    }

    // 이전 날짜 버튼 클릭 이벤트
    prevDayButton.addEventListener("click", () => {
        animateButton(prevDayButton);
        currentDate.setDate(currentDate.getDate() - 1);
        if (isWeekend(currentDate)) {
            currentDate.setDate(currentDate.getDate() - 2); // 이전 주 금요일로 이동
        }
        updateMenu('animation-slide-left');
    });

    // 다음 날짜 버튼 클릭 이벤트
    nextDayButton.addEventListener("click", () => {
        animateButton(nextDayButton);
        currentDate = getNextDate(currentDate);
        updateMenu('animation-slide-right');
    });

    // 날짜 변경 애니메이션 처리
    function updateMenu(animationClass) {
        menuList.classList.add(animationClass);
        setTimeout(() => {
            menuList.classList.remove(animationClass);
            displayDate(currentDate);
            const formattedDate = currentDate.toISOString().split('T')[0];
            const menu = menuData[formattedDate] || ["메뉴 정보가 없습니다."];
            updateMenuUI(menu);
        }, 500); // 애니메이션 시간과 맞춰 설정
    }

    // 초기 페이지 로드 시 현재 날짜 설정
    let currentDate = new Date();
    if (isWeekend(currentDate)) {
        currentDate = getNextDate(currentDate);
    }
    displayDate(currentDate);
    updateMenuUI(menuData[currentDate.toISOString().split('T')[0]] || ["메뉴 정보가 없습니다."]);

    // 메뉴 데이터를 화면에 업데이트하는 함수
    function updateMenuUI(menuData) {
        menuList.innerHTML = '';
        menuData.forEach(menu => {
            const menuElement = document.createElement('p');
            menuElement.textContent = menu;
            menuElement.classList.add('text-main');
            menuList.appendChild(menuElement);
        });

    // 날짜 선택 시 이벤트 처리
    datePicker.addEventListener("change", (event) => {
        const selectedDate = new Date(event.target.value);
        currentDate = selectedDate;
        if (isWeekend(currentDate)) {
            currentDate = getNextDate(currentDate);
        }
        updateMenu('animation-slide-right');
    });

    }
});
