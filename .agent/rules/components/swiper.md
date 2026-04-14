---
trigger: always_on
---

# Swiper

> 슬라이드 형태로 콘텐츠를 표시하고 탐색할 수 있는 컴포넌트입니다. 이미지 갤러리, 카드 리스트, 배너 등 다양한 콘텐츠를 슬라이드 방식으로 제공합니다.

```html
<!-- 기본 구조 예시 -->
<div class="component-swiper">
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <button><img src="" alt="" />slide 1</button>
      </div>
      <div class="swiper-slide">
        <button><img src="" alt="" />slide 2</button>
      </div>
    </div>
  </div>
</div>
```

## TL;DR

- **언제 사용하나요?** 이미지 갤러리, 제품 목록, 배너, 카드 리스트 등 여러 콘텐츠를 슬라이드 형태로 보여줄 때 사용합니다.
- **핵심 역할**: 좌우 스와이프/드래그로 콘텐츠를 탐색하고, 네비게이션 버튼과 페이지네이션으로 현재 위치를 표시합니다.
- **주요 클래스/속성**: `.component-swiper`, `.swiper-container`, `.swiper-wrapper`, `.swiper-slide`, `data-props-*` 속성

## 기본 마크업

### 필수 구조

- `.component-swiper`: 최상위 래퍼 (Swiper 컴포넌트의 루트 요소)
- `.swiper-container`: Swiper 인스턴스가 초기화되는 컨테이너
- `.swiper-wrapper`: 슬라이드들을 감싸는 래퍼 (flex 컨테이너)
- `.swiper-slide`: 개별 슬라이드 요소 (반복되는 단위)

### 필수 속성

- `data-props-slides-per-view`: 한 번에 보여질 슬라이드 개수 (기본값: 1)
- `data-props-space-between`: 슬라이드 간 간격 (기본값: 0)
- `data-props-loop`: 슬라이드 반복 여부 (기본값: false)
- `data-desktop-only`: PC에서만 Swiper 활성화, 모바일에서는 해제
- `data-mobile-only`: 모바일에서만 Swiper 활성화, PC에서는 해제

> **TIP**: 설계 단계의 특별한 UX 요청이나 개발 환경에 따른 제약이 없다면 테스트 완료된 코드를 복사 붙여넣기를 기본으로 합니다.

## 접근성 (Accessibility)

- 키보드 탐색(좌우 화살표)으로 슬라이드를 이동할 수 있어야 합니다.
- 네비게이션 버튼에는 적절한 `aria-label`을 제공합니다 (예: "이전 슬라이드", "다음 슬라이드").
- 페이지네이션은 현재 슬라이드 위치를 스크린리더가 인식할 수 있도록 `aria-current` 속성을 사용합니다.
- 슬라이드 내 콘텐츠(이미지, 버튼 등)는 포커스 가능하고 의미 있는 레이블을 제공해야 합니다.

## 구현 가이드

### 공통 규칙

- Swiper 컴포넌트는 `.component-swiper` 클래스를 최상위에 반드시 포함해야 합니다.
- 슬라이드 콘텐츠는 `.swiper-slide` 내부에 배치합니다.
- 네비게이션과 페이지네이션은 `data-props-*` 속성으로 자동 생성됩니다.
- 반응형 설정은 `data-props-breakpoints` 속성을 통해 JSON 형태로 정의합니다.

### 클래스 & 상태 정의

| 클래스/속성                | 용도                             | 비고                                        |
| -------------------------- | -------------------------------- | ------------------------------------------- |
| `.component-swiper`        | Swiper 컴포넌트 루트             | 필수                                        |
| `.swiper-container`        | Swiper 인스턴스 컨테이너         | 필수                                        |
| `.swiper-wrapper`          | 슬라이드 래퍼                    | 필수                                        |
| `.swiper-slide`            | 개별 슬라이드                    | 필수                                        |
| `.swiper-controls`         | 네비게이션/페이지네이션 컨테이너 | 자동 생성                                   |
| `.swiper-navigation`       | 네비게이션 버튼 컨테이너         | `data-props-navigation="true"` 시 자동 생성 |
| `.swiper-pagination`       | 페이지네이션 컨테이너            | `data-props-pagination="true"` 시 자동 생성 |
| `data-desktop-only="true"` | PC에서만 Swiper 활성화           | 선택                                        |
| `data-mobile-only="true"`  | 모바일에서만 Swiper 활성화       | 선택                                        |

### 자바스크립트 연동

- Swiper는 `data-props-*` 속성을 기반으로 자동 초기화됩니다.
- 네비게이션과 페이지네이션은 `data-props-navigation`, `data-props-pagination` 속성으로 활성화됩니다.
- 슬라이드 변경 시 콜백은 `data-props-slide-change` 속성으로 정의할 수 있습니다.
- 반응형 옵션은 `data-props-breakpoints` 속성에 JSON 형태로 전달합니다.

## 패턴 & 변형 (Variants)

> 각 변형은 "언제 사용해야 하는지"와 "기본 구조와 무엇이 다른지"를 함께 설명합니다.

### Swiper Navigation

네비게이션 버튼(이전/다음)을 제공하여 사용자가 슬라이드를 탐색할 수 있도록 합니다.

- **사용 시나리오**: 사용자가 명시적인 버튼으로 슬라이드를 제어해야 할 때
- **추가 속성**: `data-props-navigation="true"`, `data-props-navigation-class="custom-navigation"` (선택)
- **자동 생성**: `.swiper-controls` 내부에 네비게이션 요소가 자동으로 생성됩니다.

```html
<div
  class="component-swiper"
  data-props-navigation="true"
  data-props-navigation-class="custom-navigation"
>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        style="height: 150px; background-color: lightblue;"
      >
        <button><img src="" alt="" />slide 1</button>
      </div>
      <div
        class="swiper-slide"
        style="height: 150px; background-color: lightcoral;"
      >
        <button><img src="" alt="" />slide 2</button>
      </div>
      <div
        class="swiper-slide"
        style="height: 150px; background-color: lightgoldenrodyellow;"
      >
        <button><img src="" alt="" />slide 3</button>
      </div>
      <div
        class="swiper-slide"
        style="height: 150px; background-color: lightgreen;"
      >
        <button><img src="" alt="" />slide 4</button>
      </div>
      <div
        class="swiper-slide"
        style="height: 150px; background-color: lightgrey;"
      >
        <button><img src="" alt="" />slide 5</button>
      </div>
    </div>
  </div>
</div>
```

### Swiper Pagination

페이지네이션을 통해 현재 슬라이드 위치와 전체 슬라이드 개수를 표시합니다.

- **사용 시나리오**: 사용자에게 현재 위치와 전체 슬라이드 개수를 시각적으로 알려줘야 할 때
- **추가 속성**: `data-props-pagination="true"`, `data-props-pagination-class="custom-pagination"` (선택), `data-props-pagination-type="fraction"` (선택)
- **자동 생성**: `.swiper-controls` 내부에 페이지네이션 요소가 자동으로 생성됩니다.
- **타입**: `bullets` (기본값), `fraction`, `progressbar`

```html
<div
  class="component-swiper"
  data-props-pagination="true"
  data-props-pagination-class="custom-pagination"
  data-props-pagination-type="fraction"
>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        style="height: 150px; background-color: lightblue;"
      >
        <button><img src="" alt="" />slide 1</button>
      </div>
      <div
        class="swiper-slide"
        style="height: 150px; background-color: lightcoral;"
      >
        <button><img src="" alt="" />slide 2</button>
      </div>
      <div
        class="swiper-slide"
        style="height: 150px; background-color: lightgoldenrodyellow;"
      >
        <button><img src="" alt="" />slide 3</button>
      </div>
      <div
        class="swiper-slide"
        style="height: 150px; background-color: lightgreen;"
      >
        <button><img src="" alt="" />slide 4</button>
      </div>
      <div
        class="swiper-slide"
        style="height: 150px; background-color: lightgrey;"
      >
        <button><img src="" alt="" />slide 5</button>
      </div>
    </div>
  </div>
</div>
```

### Swiper Breakpoints (반응형)

화면 크기에 따라 다른 Swiper 옵션을 적용합니다.

- **사용 시나리오**: PC와 모바일에서 다른 개수의 슬라이드를 보여주거나 간격을 조정해야 할 때
- **추가 속성**: `data-props-breakpoints` (JSON 형태)
- **설정 방법**: 특정 화면 크기(px) 이상에서 적용될 옵션을 JSON으로 정의

```html
<!--
  [사용 방법]
  - data-props-slides-per-view: 기본적으로 보여질 슬라이드 개수를 설정
  - data-props-space-between: 슬라이드 간 간격을 설정
  - data-props-breakpoints: 특정 화면 크기 이상에서 적용될 Swiper 옵션을 JSON 형태로 설정
    예) "1024": { "slidesPerView": "3", "spaceBetween": "20" }
-->
<div
  class="component-swiper"
  data-props-slides-per-view="1"
  data-props-space-between="12"
  data-props-breakpoints='{
    "1024":{
      "slidesPerView":"3",
      "spaceBetween":"20"
    }
  }'
>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        style="height: 150px; background-color: lightblue;"
      >
        <button><img src="" alt="" />slide 1</button>
      </div>
      <div
        class="swiper-slide"
        style="height: 150px; background-color: lightcoral;"
      >
        <button><img src="" alt="" />slide 2</button>
      </div>
      <div
        class="swiper-slide"
        style="height: 150px; background-color: lightgoldenrodyellow;"
      >
        <button><img src="" alt="" />slide 3</button>
      </div>
      <div
        class="swiper-slide"
        style="height: 150px; background-color: lightgreen;"
      >
        <button><img src="" alt="" />slide 4</button>
      </div>
      <div
        class="swiper-slide"
        style="height: 150px; background-color: lightgrey;"
      >
        <button><img src="" alt="" />slide 5</button>
      </div>
    </div>
  </div>
</div>
```

## API / Props Reference

| Props / 속성                  | Type     | Default | Description                                              |
| ----------------------------- | -------- | ------- | -------------------------------------------------------- |
| `data-props-slides-per-view`  | number   | 1       | 한 번에 보여질 슬라이드 개수                             |
| `data-props-space-between`    | number   | 0       | 슬라이드 간 간격 (px)                                    |
| `data-props-loop`             | boolean  | false   | 슬라이드 반복 여부                                       |
| `data-props-speed`            | number   | 1000    | 슬라이드 전환 시간 (ms)                                  |
| `data-props-initial-slide`    | number   | 0       | 초기 슬라이드 위치 (인덱스)                              |
| `data-props-navigation`       | boolean  | false   | 이전/다음 버튼 생성 여부                                 |
| `data-props-navigation-class` | string   | -       | 네비게이션 커스텀 클래스                                 |
| `data-props-pagination`       | boolean  | false   | 페이지네이션 생성 여부                                   |
| `data-props-pagination-class` | string   | -       | 페이지네이션 커스텀 클래스                               |
| `data-props-pagination-type`  | string   | bullets | 페이지네이션 타입 (`bullets`, `fraction`, `progressbar`) |
| `data-props-breakpoints`      | object   | null    | 반응형 옵션 설정 (JSON 형태)                             |
| `data-props-nested`           | boolean  | false   | 중첩된 Swiper일 때 자식 Swiper에 적용                    |
| `data-props-slide-change`     | function | null    | 슬라이드 변경 후 콜백 함수                               |
| `data-desktop-only`           | boolean  | false   | PC에서만 Swiper 활성화                                   |
| `data-mobile-only`            | boolean  | false   | 모바일에서만 Swiper 활성화                               |
