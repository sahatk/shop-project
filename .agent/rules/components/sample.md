# Component Name

> 컴포넌트의 핵심 목적과 제공하는 사용자 가치 요약. 한두 문장으로 작성합니다.

```html
<!-- 기본 구조 예시 -->
<div class="component-name" data-props-example>
  <div class="component-item">
    <button type="button" class="component-action">Label</button>
    <div class="component-content">...</div>
  </div>
</div>
```

## TL;DR

- **언제 사용하나요?** 컴포넌트를 적용해야 하는 대표 상황을 나열합니다.
- **핵심 역할**: 주요 상호작용, 레이아웃, 데이터 표시 등 핵심 기능을 정리합니다.
- **주요 클래스/속성**: 필수 클래스, 데이터 속성, 상태 클래스를 간단히 소개합니다.

## 기본 마크업

### 필수 구조

- `.component-name`: 최상위 래퍼 (반드시 하나만 존재)
- `.component-item`: 반복되는 단위 요소 (컨텐츠를 감싸는 기본 블록)
- `.component-action`: 사용자 입력을 받는 요소 (버튼/링크 등)
- `.component-content`: 표시할 실제 콘텐츠 영역

### 필수 속성

- `data-props-*`: JavaScript 로직과 연결되는 데이터 속성 (예: `data-props-type`, `data-props-index`)
- `aria-*`: 접근성 속성 (예: `aria-expanded`, `aria-controls`, `aria-current`)

> **TIP**: 마크업 예시는 가장 간결한 형태로 작성하고, 복잡한 사용 예시는 아래 "패턴 & 변형" 섹션에서 다룹니다.

## 접근성 (Accessibility)

- 키보드 탐색을 안정적으로 지원하는지 확인합니다.
- 스크린리더가 현재 상태와 목적을 이해할 수 있도록 `aria-*` 속성을 연결합니다.
- 시각적 피드백과 포커스 스타일이 충분한 대비를 제공하는지 점검합니다.

## 구현 가이드

### 공통 규칙

- 필수로 지켜야 하는 마크업/스타일/스크립트 규칙을 나열합니다.
- 작성 순서는 "마크업 → 스타일 → 스크립트" 흐름을 추천합니다.

### 클래스 & 상태 정의

| 클래스/속성         | 용도                | 비고                       |
| ------------------- | ------------------- | -------------------------- |
| `.is-active`        | 현재 활성 상태 표시 | 예: 탭, 아코디언 등에 사용 |
| `.is-disabled`      | 비활성 상태 표시    | 접근성 속성과 함께 사용    |
| `data-state="open"` | 기본 오픈 상태 지정 | 필요 시 기본값 설명        |

### 자바스크립트 연동 (선택)

- 컴포넌트가 상호작용을 제공한다면 필수 이벤트 흐름과 상태 업데이트 방식을 설명합니다.
- 데이터 속성(`data-*`) 기준으로 초기화/제어하는 패턴을 명시합니다.

## 패턴 & 변형 (Variants)

> 각 변형은 "언제 사용해야 하는지"와 "기본 구조와 무엇이 다른지"를 함께 설명합니다.

### Variant 1 이름

- 사용 시나리오 요약
- 추가/변경되는 클래스 또는 속성
- 상호작용/레이아웃 차이

```html
<!-- Variant 1 -->
<div class="component-name variant-1">...</div>
```

### Variant 2 이름

- 필요한 경우에만 추가합니다. 변형이 많다면 표나 카드 형태로 정리할 수도 있습니다.

## 상세 예시 (Patterns)

- 실제 화면 구성이나 UI 패턴 흐름(예: 탭 안의 아코디언, 모달 내 버튼 그룹 등)을 묶어서 설명합니다.
- 복합 구성일수록 단계별로 주석을 달거나 순서를 명확히 합니다.

```html
<!-- 패턴 예시 -->
<section class="pattern-example">
  <!-- Step 1 -->
  <!-- Step 2 -->
</section>
```

## API / Props Reference

| Props / 속성       | Type   | Default  | Description                     |
| ------------------ | ------ | -------- | ------------------------------- |
| `data-props-type`  | string | multiple | 컴포넌트 동작 모드 (예: single) |
| `data-props-index` | number | 0        | 기본 활성 인덱스                |
