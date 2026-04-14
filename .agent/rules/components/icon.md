# Icon

> 아이콘을 표시하기 위한 영역 컴포넌트입니다. 아이콘 영역의 크기와 기본 스타일만 제공하며, 실제 아이콘 이미지나 SVG는 사용자가 직접 커스텀합니다.

```html
<!-- 기본 구조 예시 -->
<div class="icon-wrap">
  <!-- 사용자가 직접 아이콘 추가 (SVG, 이미지, 폰트 아이콘 등) -->
  <i class="ico-custom" aria-hidden="true"></i>
</div>
```

## TL;DR

- **언제 사용하나요?** 아이콘을 표시해야 하는 모든 UI 요소에서 사용합니다.
- **핵심 역할**: 아이콘 영역의 크기와 배경 스타일을 제공하며, 실제 아이콘은 사용자가 커스텀합니다.
- **주요 클래스/속성**: `.icon-wrap`, `.icon-{size}`, `.icon-{shape}`

## 기본 마크업

### 필수 구조

- `.icon-wrap`: 아이콘 영역 래퍼 (크기와 배경 스타일 제공)
- 내부 요소: 사용자가 직접 추가 (`<i>`, `<svg>`, `<img>` 등)

### 필수 속성

- `aria-hidden="true"`: 장식용 아이콘일 경우 스크린리더에서 숨김
- `role="img"` + `aria-label`: 의미 있는 아이콘일 경우 스크린리더에 설명 제공

> **중요**: 이 컴포넌트는 **아이콘 영역의 크기와 배경만 제공**합니다. 실제 아이콘 이미지, SVG, 폰트 아이콘은 **사용자가 직접 추가**해야 합니다.

## 접근성 (Accessibility)

- **장식용 아이콘**: `aria-hidden="true"` 속성을 추가하여 스크린리더에서 무시되도록 합니다.
- **의미 있는 아이콘**: `role="img"`와 `aria-label`을 함께 사용하여 스크린리더에 의미를 전달합니다.
- **버튼 내 아이콘**: 버튼 텍스트가 없는 경우 `aria-label`을 버튼에 추가합니다.

## 구현 가이드

### 공통 규칙

- **아이콘 영역만 제공**: `.icon-wrap` 클래스는 아이콘 영역의 크기, 배경색, 모양만 정의합니다.
- **아이콘은 사용자 커스텀**: 실제 아이콘 이미지, SVG, 폰트 아이콘은 사용자가 직접 추가합니다.
- **크기 클래스 사용**: `.icon-small`, `.icon-normal`, `.icon-large` 등 크기 클래스를 조합하여 사용합니다.
- **모양 클래스 사용**: `.icon-circle`, `.icon-square`, `.icon-triangle` 등 모양 클래스를 조합하여 사용합니다.

### 클래스 & 상태 정의

| 클래스/속성      | 용도                  | 비고                       |
| ---------------- | --------------------- | -------------------------- |
| `.icon-wrap`     | 아이콘 영역 래퍼      | 필수 클래스                |
| `.icon-small`    | 작은 아이콘 (24x24px) | 선택                       |
| `.icon-normal`   | 보통 아이콘 (40x40px) | 기본값                     |
| `.icon-large`    | 큰 아이콘 (56x56px)   | 선택                       |
| `.icon-circle`   | 원형 아이콘           | `border-radius: 50%`       |
| `.icon-square`   | 사각형 아이콘         | `border-radius: 8px`       |
| `.icon-triangle` | 삼각형 아이콘         | `clip-path: polygon(...)`  |
| `aria-hidden`    | 장식용 아이콘 숨김    | 스크린리더에서 무시        |
| `role="img"`     | 의미 있는 아이콘      | `aria-label`과 함께 사용   |
| `aria-label`     | 아이콘 설명           | 스크린리더에 전달할 텍스트 |

### SCSS 스타일 구조

```scss
.icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  // 크기 변형
  &.icon-small {
    @include rem(width, 24);
    @include rem(height, 24);
  }

  &.icon-normal {
    @include rem(width, 40);
    @include rem(height, 40);
  }

  &.icon-large {
    @include rem(width, 56);
    @include rem(height, 56);
  }

  // 모양 변형
  &.icon-circle {
    border-radius: 50%;
  }

  &.icon-square {
    @include rem(border-radius, 8);
  }

  &.icon-triangle {
    @include rem(border-radius, 8);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }

  // 배경색 (프로젝트에 맞게 수정)
  background: #009178; // Primary Green

  // 내부 아이콘 스타일 (사용자가 추가한 요소)
  i,
  svg,
  img {
    color: #ffffff; // 아이콘 색상
    fill: #ffffff; // SVG 색상
  }
}
```

## 패턴 & 변형 (Variants)

### Variant 1: 기본 아이콘 (보통 크기, 원형)

- **사용 시나리오**: 가장 일반적인 아이콘 표시
- **기본 클래스**: `.icon-wrap .icon-normal .icon-circle`

```html
<div class="icon-wrap icon-normal icon-circle">
  <!-- 사용자가 직접 아이콘 추가 -->
  <i class="ico-money" aria-hidden="true"></i>
</div>
```

### Variant 2: 작은 아이콘 (사각형)

- **사용 시나리오**: 버튼 내부, 작은 UI 요소
- **추가 클래스**: `.icon-small .icon-square`

```html
<div class="icon-wrap icon-small icon-square">
  <!-- 사용자가 직접 아이콘 추가 -->
  <svg width="16" height="16" aria-hidden="true">
    <path d="..." />
  </svg>
</div>
```

### Variant 3: 큰 아이콘 (삼각형)

- **사용 시나리오**: 강조가 필요한 UI 요소
- **추가 클래스**: `.icon-large .icon-triangle`

```html
<div class="icon-wrap icon-large icon-triangle">
  <!-- 사용자가 직접 아이콘 추가 -->
  <img src="/path/to/icon.png" alt="" aria-hidden="true" />
</div>
```

### Variant 4: 의미 있는 아이콘 (접근성)

- **사용 시나리오**: 아이콘이 정보를 전달하는 경우
- **추가 속성**: `role="img"`, `aria-label`

```html
<div class="icon-wrap icon-normal icon-circle" role="img" aria-label="입금">
  <!-- 사용자가 직접 아이콘 추가 -->
  <i class="ico-deposit"></i>
</div>
```

## 상세 예시 (Patterns)

### Pattern 1: 대시보드 카드 아이콘

실제 대시보드 카드에서 사용되는 아이콘 패턴

```html
<!-- 총입금 - 원형 아이콘 -->
<div class="icon-wrap icon-normal icon-circle">
  <i class="ico-money" aria-hidden="true"></i>
</div>

<!-- 총출금 - 사각형 아이콘 -->
<div class="icon-wrap icon-normal icon-square">
  <i class="ico-withdraw" aria-hidden="true"></i>
</div>

<!-- 현금흐름 - 사각형 아이콘 -->
<div class="icon-wrap icon-normal icon-square">
  <i class="ico-cash-flow" aria-hidden="true"></i>
</div>

<!-- 환율 - 삼각형 아이콘 -->
<div class="icon-wrap icon-normal icon-triangle">
  <i class="ico-exchange" aria-hidden="true"></i>
</div>
```

### Pattern 2: 버튼 내 아이콘

버튼 내부에 아이콘을 포함하는 패턴

```html
<button type="button" class="btn" aria-label="검색">
  <div class="icon-wrap icon-small icon-circle">
    <i class="ico-search" aria-hidden="true"></i>
  </div>
</button>
```

### Pattern 3: SVG 아이콘

SVG를 직접 삽입하는 패턴

```html
<div class="icon-wrap icon-normal icon-square">
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" />
  </svg>
</div>
```

## 사용자 커스텀 가이드

### 1. 아이콘 폰트 사용

프로젝트에 아이콘 폰트가 있는 경우:

```html
<div class="icon-wrap icon-normal icon-circle">
  <i class="ico-custom-icon" aria-hidden="true"></i>
</div>
```

### 2. SVG 파일 사용

SVG 파일을 직접 삽입하는 경우:

```html
<div class="icon-wrap icon-normal icon-square">
  <svg width="24" height="24" aria-hidden="true">
    <!-- SVG 경로 -->
  </svg>
</div>
```

### 3. 이미지 파일 사용

PNG, JPG 등 이미지 파일을 사용하는 경우:

```html
<div class="icon-wrap icon-normal icon-circle">
  <img src="/images/icon.png" alt="" aria-hidden="true" />
</div>
```

### 4. 배경 이미지 사용

CSS 배경 이미지로 아이콘을 표시하는 경우:

```html
<div class="icon-wrap icon-normal icon-circle custom-bg-icon"></div>
```

```scss
.custom-bg-icon {
  background-image: url("/images/icon.png");
  background-size: 24px 24px;
  background-position: center;
  background-repeat: no-repeat;
}
```

## API / Props Reference

### Size

| 클래스         | 크기    | 용도                 |
| -------------- | ------- | -------------------- |
| `.icon-small`  | 24x24px | 작은 아이콘          |
| `.icon-normal` | 40x40px | 기본 아이콘 (기본값) |
| `.icon-large`  | 56x56px | 큰 아이콘            |

### Shape

| 클래스           | 모양   | CSS 속성                                         |
| ---------------- | ------ | ------------------------------------------------ |
| `.icon-circle`   | 원형   | `border-radius: 50%`                             |
| `.icon-square`   | 사각형 | `border-radius: 8px`                             |
| `.icon-triangle` | 삼각형 | `clip-path: polygon(50% 0%, 0% 100%, 100% 100%)` |

### Accessibility

| 속성          | 값       | 용도                       |
| ------------- | -------- | -------------------------- |
| `aria-hidden` | `true`   | 장식용 아이콘 숨김         |
| `role`        | `img`    | 의미 있는 아이콘           |
| `aria-label`  | `string` | 스크린리더에 전달할 텍스트 |

## 코딩 시 주의사항

### ✅ 해야 할 것

1. **아이콘 영역만 코딩**: `.icon-wrap` 클래스로 아이콘 영역의 크기와 배경만 정의합니다.
2. **사용자 커스텀 안내**: 실제 아이콘은 사용자가 직접 추가하도록 주석으로 안내합니다.
3. **접근성 준수**: `aria-hidden` 또는 `role="img"` + `aria-label`을 적절히 사용합니다.
4. **크기/모양 클래스 조합**: `.icon-normal .icon-circle` 형태로 클래스를 조합합니다.

### ❌ 하지 말아야 할 것

1. **아이콘 이미지 직접 삽입 금지**: AI가 임의로 아이콘 이미지를 추가하지 않습니다.
2. **폰트 아이콘 클래스 추측 금지**: 프로젝트에 없는 아이콘 클래스를 임의로 사용하지 않습니다.
3. **SVG 경로 생성 금지**: AI가 임의로 SVG 경로를 생성하지 않습니다.
4. **배경 이미지 경로 추측 금지**: 존재하지 않는 이미지 경로를 사용하지 않습니다.

## 예시 코드 (AI 구현 시)

AI가 아이콘 컴포넌트를 구현할 때는 다음과 같이 작성합니다:

```html
<!-- ✅ 올바른 구현 -->
<div class="icon-wrap icon-normal icon-circle">
  <!-- 사용자가 직접 아이콘 추가 (SVG, 이미지, 폰트 아이콘 등) -->
  <i class="ico-custom" aria-hidden="true"></i>
</div>

<!-- ❌ 잘못된 구현 (AI가 임의로 아이콘 추가) -->
<div class="icon-wrap icon-normal icon-circle">
  <svg width="24" height="24">
    <path d="M12 2C6.48..." />
    <!-- AI가 임의로 생성한 SVG 경로 -->
  </svg>
</div>
```

## 참고 자료

- [WAI-ARIA 가이드](../WAI-ARIA.md)
- [접근성 기본 가이드](../Accessibility-Basic.md)
- [코딩 스타일 가이드](../Coding-Style.md)
