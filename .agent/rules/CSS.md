---
trigger: model_decision
---

# CSS & SCSS 가이드

> CSS와 SCSS를 작성할 때 효율성과 일관성을 유지하기 위한 주요 규칙들을 정리했습니다.
> 이트라이브 UX그룹은 현재(2024년) CSS 전처리기인 **SCSS**를 사용합니다. (`.scss` 확장자)

---

## 📑 목차

### Part 1: CSS 기본 규칙

- [기본 규칙](#기본-규칙)
- [중첩 (Nesting)](#중첩)
- [타입 선택자](#타입-선택자)

### Part 2: SCSS 확장 기능

- [변수 (Variables)](#변수-규칙)
- [z-index 변수](#z-index-변수-규칙)
- [color 변수](#color-변수-규칙)
- [믹스인 (Mixins)](#scss-믹스인mixin)
  - [font 믹스인](#font-믹스인-사용-방법)
  - [flex-grid 믹스인](#flex-grid-믹스인-사용-방법)
  - [Icon 믹스인](#icon-믹스인-사용-방법)

### Part 3: 공통 규칙

- [미디어 쿼리 및 반응형](#미디어-쿼리-및-반응형-디자인-규칙)
- [벤더 프리픽스](#벤더-프리픽스-사용)

---

# Part 1: CSS 기본 규칙

> 모든 CSS/SCSS 코드에 공통적으로 적용되는 기본 규칙입니다.

## 기본 규칙

### 규칙 선언

- 규칙 선언부에서 선택자를 한 줄에 한개씩 적어주세요.

```scss
/* 규칙 선언 - 비추천 */
.example {
  border-radius: 50%;
  border: 2px solid white;
}

/* 규칙 선언 - 추천 */
.example {
  border-radius: 50%;
  border: 2px solid white;
}
```

### 색상 값

- 색상 값은 소문자로 표기하며 HEX 색상 코드를 사용하며 6자리 숫자와 알파벳(a-f)의 조합으로 구성합니다.

```scss
/* HEX 색상 코드 - 비추천 */
.example {
  color: #ff0000;
}

/* HEX 색상 코드 - 추천 */
.example {
  color: #ff0000;
}
```

### 가상 요소 및 가상 클래스

- 가상요소(pseudo-element)는 `::` 더블 콜론을 사용합니다.
- 가상클래스(pseudo-class)는 `:` 콜론을 사용합니다.

```css
/* 가상요소 - 추천 */
.example::before {
  content: "";
  display: block;
}

/* 가상클래스 - 추천 */
.example:active {
  color: red;
}
```

### !important 사용 금지

- `!important` 선언을 사용하지 않습니다.

```css
/* important - 비추천 */
.example3 {
  font-weight: bold !important;
}

/* important - 추천 */
.example3 {
  font-weight: bold;
}
```

### 값이 0일 때

- 값이 `0`일때는 단위를 표시하지 않습니다.

```css
/* 값이 0일때 - 비추천 */
.example4 {
  width: 0px;
  margin: 0rem 2rem 3rem 0rem;
}

/* 값이 0일때 - 추천 */
.example4 {
  width: 0;
  margin: 0 2rem 3rem 0;
}
```

## 중첩

> CSS 셀렉터를 과도하게 중첩하는 것은 여러 가지 문제를 야기할 수 있습니다. 성능 저하, 유지보수의 어려움, 그리고 코드의 가독성 저하가 주된 이유입니다.

### 과도한 중첩의 문제점

```css
/* ❌ 잘못된 예 - 과도한 중첩 */
body .home-page .main-content .content-section .section-header .title {
  color: blue;
}
```

**문제점:**

1. **성능 저하**: 브라우저는 DOM 트리를 탐색할 때 더 많은 작업을 해야 합니다.
2. **유지보수 어려움**: 클래스를 다른 곳에서 재사용하기 어렵습니다.
3. **가독성 저하**: 긴 셀렉터 체인은 코드를 읽고 이해하는 데 시간이 더 걸립니다.

```css
/* ✅ 개선된 예 */
.title {
  color: blue;
}

/* 또는 적당한 컨텍스트 제공 */
.content-section .title {
  color: blue;
}
```

### 적당한 중첩의 정도

- **2~3단계 중첩**은 대부분의 경우에 적당합니다.
- SCSS 중첩 사용 시에도 3단계를 넘지 않도록 합니다.
- SCSS로 작성 시 CSS로 변환했을 때 **5중첩 이상 되지 않도록** `/dist/assets/styles/style.css`에서 확인합니다.

### 깊은 중첩을 피하는 방법

1. **클래스 기반 선택자 사용**: 태그나 ID 선택자 대신 클래스 선택자를 사용합니다.
2. **SCSS 중첩 기능 적절히 활용**: 깊은 중첩이 발생하지 않도록 주의합니다.
3. **컨텐츠유형, 컴포넌트유형 클래스 활용**: 클래스의 중첩을 피하기 위해 적절한 클래스를 사용합니다.

### 중첩 코드 최소화 예제

#### 예제 1: 테이블 중첩

```scss
/* ❌ 잘못된 예 */
.component-table-col01 {
  thead {
    tr {
      th {
      }
      td {
        .name {
        }
      }
    }
  }
}

/* ✅ 올바른 예 */
.component-table-col01 {
  th {
  }
  td {
    .name {
    }
  }
  thead {
  }
  tbody tr:nth-child(even) {
  }
}
```

#### 예제 2: 아코디언 중첩

```scss
/* ✅ 올바른 예 */
.component-accordion {
  .accordion-item {
    .accordion-button {
      &:after {
      }
      &.active:after {
      }
    }
    .accordion-content {
    }
  }
}
```

## 타입 선택자

- 꼭 필요한 경우가 아니라면 요소(태그)와 함께 ID, Class를 지정하여 스타일링하지 않습니다.

```css
/* ❌ 비추천 */
ul#example {
  ...;
}
div.error {
  ...;
}

/* ✅ 추천 */
#example {
  ...;
}
.error {
  ...;
}
```

---

# Part 2: SCSS 확장 기능

> SCSS 전용 기능으로 코드 재사용성과 유지보수성을 향상시킵니다.

## 변수 규칙

### 네이밍 규칙

- **kebab-case (케밥 케이스 표기법)** 사용
- 단어 사이를 하이픈(`-`)으로 연결합니다.
- 변수명은 되도록 직관적으로 네이밍합니다.

```scss
$global-background-color: #ffffff;
$global-font-color: #000000;
$global-font-size: 10;
```

## z-index 변수 규칙

- 기본 z-index 속성 값을 기준으로 +, - 하여 관리합니다.
- 기본값은 0부터 시작하지만 프로젝트에 따라 변경 가능합니다.
- 공통 UI의 z-index 순으로 정리합니다.
- 공통 UI 외에 컨텐츠의 z-index는 1~10 단위를 사용하며 변수를 사용하지 않고 CSS에서 직접 관리합니다.

```scss
/* 공통 UI 관리 */
$zindex-base: 0; // 기본 z-index
$zindex-loading: $zindex-base + 3200; // progress indicator, loading spinner
$zindex-notification: $zindex-base + 3100; // toast, snackbar
$zindex-modal: $zindex-base + 3000; // dialog, modal, lightbox
$zindex-floating: $zindex-base + 2500; // FAB(Floating Action Button), floating banner
$zindex-header: $zindex-base + 2000; // GNB, header
$zindex-side-area: $zindex-base + 1000; // drawer, panel, side navigation
$zindex-sticky: $zindex-base + 500; // anchor, tab, (sticky) banner
$zindex-picker: $zindex-base + 200; // menu, select, date/time picker
$zindex-guide: $zindex-base + 100; // tooltip, popover, coach mark

/* 개별 컨텐츠일 경우 */
.sample {
  position: relative;
  z-index: 1;
}
```

## color 변수 규칙

- 폰트컬러(color), 배경컬러(background-color), 라인컬러(border)로 구분합니다.
- HEX 코드가 같아도 폰트, 배경, 라인 별로 일괄 변환하기 수월합니다.
- figma 연동 시 figma 변수 규칙을 따르도록 합니다.

```scss
/* 폰트 컬러 */
$color-000000: #000000;
$color-ffffff: #ffffff;
$color-ffe53f: #ffe53f;
$color-e1002a: #e1002a;

/* 배경 컬러 */
$bg-000000: #000000;
$bg-ffffff: #ffffff;
$bg-ffe53f: #ffe53f;
$bg-e1002a: #e1002a;

/* 라인 컬러 */
$line-000000: #000000;
$line-ffffff: #ffffff;
$line-ffe53f: #ffe53f;
$line-e1002a: #e1002a;
```

## SCSS 믹스인(mixin)

> SCSS 믹스인은 스타일 선언을 그룹화하여 재사용할 수 있게 해주는 강력한 기능입니다.

- 믹스인은 특정 스타일 블록을 다양한 곳에서 호출하여 사용할 수 있습니다.
- 매개변수를 받아 커스터마이징할 수 있는 옵션을 제공합니다.
- **`src/assets/styles/abstracts/_mixins.scss`** 파일에서 사용 가능한 믹스인과 사용 방법을 확인하세요.

### font 믹스인 사용 방법

```scss
// 기본 사용
.text-small {
  @include f12(); // font-size: 1.2rem; line-height: 1.4;
}

.text-normal {
  @include f14(); // font-size: 1.4rem; line-height: 1.6;
}

.text-large {
  @include f16(); // font-size: 1.6rem; line-height: 1.4;
}

// font-weight 변경
.text-bold {
  @include f14(bold); // font-weight: bold 추가
}

// font-weight + line-height 변경
.text-custom {
  @include f14(600, 1.8); // font-weight: 600, line-height: 1.8
}

// line-height만 변경
.text-spacing {
  @include f16($lineHeight: 2); // line-height만 2.0으로 변경
}
```

### flex-grid 믹스인 사용 방법

```scss
// 균등 분할 (1:1 비율)
.form-row.col-2 {
  @include flex-grid((1, 1), 10); // 2개 컬럼, 갭 1rem
}

// 비율 분할 (2:1 비율)
.form-row.ratio-2-1 {
  @include flex-grid((2, 1), 16); // 2:1 비율, 갭 1.6rem
}

// 3개 컬럼 균등 분할
.form-row.col-3 {
  @include flex-grid((1, 1, 1), 20); // 3개 컬럼, 갭 2rem
}

// 고정 너비 + 비율 분할
.form-row.fixed-ratio {
  @include flex-grid((40rem, 2, 1), 16); // 40rem 고정, 나머지 2:1
}

// 4개 컬럼 비율 분할
.form-row.ratio-4-3-2-1 {
  @include flex-grid((4, 3, 2, 1), 10); // 4:3:2:1 비율
}
```

### Icon 믹스인 사용 방법

```scss
// 아이콘 크기 정의
.ico-normal {
  @include icon-size; // 기본 크기 (24x24)
}

.ico-large {
  @include icon-size(48, 48); // 48x48 크기
}

// 아이콘 타입 정의
.ico-close {
  @include ico-x; // 기본 색상
}

.ico-close-white {
  @include ico-x($bg-ffffff); // 흰색 아이콘
}
```

```html
<!-- HTML에서 클래스 사용 -->
<i class="ico-close ico-normal" aria-hidden="true"></i>
```

### rem 변환 및 폰트 믹스인 (필수 준수 사항)

> **[중요]** 프로젝트의 모든 CSS 속성에서 `px` 단위 사용을 금지합니다. 반드시 제공된 mixin을 사용하여 `rem` 단위로 변환해야 합니다.

#### 1. 일반 속성 (width, height, margin, padding 등)

모든 크기/간격 관련 속성은 `rem` mixin을 사용합니다.

- **문법**: `@include rem(속성명, 값);`
- 값 입력 시 `px` 단위는 생략하고 숫자만 입력합니다.

```scss
// ❌ 잘못된 예 (px 직접 사용)
.example {
  width: 100px;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 8px;
}

// ✅ 올바른 예 (rem 믹스인 사용)
.example {
  @include rem(width, 100);
  @include rem(margin-top, 20);
  @include rem(padding, 10 20);
  @include rem(border-radius, 8);
}
```

#### 2. 타이포그래피 (font-size, font-weight)

폰트 스타일링은 `f{size}` 믹스인을 우선 사용합니다.

- `src/assets/styles/abstracts/_mixins.scss`에 정의된 믹스인(`f12`, `f14`, `f16`, `f18` 등)을 확인하여 사용합니다.
- 정의되지 않은 사이즈는 `@include rem(font-size, {size})`를 사용합니다.

```scss
// ❌ 잘못된 예
.text {
  font-size: 14px;
  font-weight: bold;
}

// ✅ 올바른 예 (믹스인 사용)
.text-14 {
  @include f14(bold); // font-size: 14px, font-weight: bold
}

.text-20 {
  // f20 믹스인이 없을 경우
  @include rem(font-size, 20);
  font-weight: 700;
}
```

#### 3. 아이콘 사이즈

아이콘 크기 지정 시 `icon-size` 믹스인 사용을 권장합니다.

```scss
.ico-search {
  @include rem(width, 24); // 또는 @include icon-size(24);
  @include rem(height, 24);
}
```

---

# Part 3: 공통 규칙

> CSS와 SCSS 모두에 적용되는 공통 규칙입니다.

## 미디어 쿼리 및 반응형 디자인 규칙

- **미디어 쿼리 위치**: 미디어 쿼리는 관련된 선택자 근처에 배치하거나, 문서의 맨 하단에 모아두어 관리를 용이하게 합니다.
- **단위 사용**: 반응형 디자인에서는 상대적 단위(`rem`)를 사용하여 더 유연하고 접근성 높은 디자인을 구현합니다.

### REM 기본 사용 예시

```scss
// 믹스인 사용
.abc {
  @include rem(width, 30);
  @include rem(border-radius, 4);
  @include rem(padding, 20);
  border: 1px solid red;
  flex: 1 1 5rem;
  width: calc(100% - 5rem);
}

// CSS 출력
.abc {
  width: 3rem;
  border-radius: 0.4rem;
  padding: 2rem;
  border: 1px solid red;
  flex: 1 1 5rem;
  width: calc(100% - 5rem);
}
```

## 벤더 프리픽스 사용

- **자동화 도구 사용**: Gulp에서 Autoprefixer와 같은 도구를 사용하여 벤더 프리픽스를 자동으로 관리합니다.
- **필요한 경우에만 사용**: 최신 브라우저 지원 상황을 고려하여 필요한 경우에만 벤더 프리픽스를 추가합니다.
- **Browserslist 활용**: [Browserslist](https://browsersl.ist/)를 이용하여 Browserslist 쿼리를 시각화합니다.

---

> 이 규칙들은 CSS/SCSS 코드를 작성할 때 일관성을 유지하고, 효율적으로 관리할 수 있도록 도와줍니다. 또한, 반응형 웹 디자인과 최신 웹 표준을 따르는 데 중요한 역할을 합니다.
