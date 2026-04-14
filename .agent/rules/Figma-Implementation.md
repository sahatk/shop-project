# Figma Implementation Guidelines

> **목적**: 피그마 디자인을 100% 정확하게 코드로 구현하기 위한 지침입니다. AI 및 개발자는 이 가이드를 준수하여 디자인과 코드의 불일치를 "0"으로 만들어야 합니다.

## 1. 사전 준비 (Analysis)

### 1.1 Figma 데이터 확보

- 단순 눈대중(Guessing) 금지. 반드시 Figma Dev Mode 또는 `get_figma_data` 도구를 통해 정확한 속성 값을 확인합니다.
- **필수 확인 속성**:
  - `Width`, `Height` (Auto/Fixed 여부 확인)
  - `Padding`, `Gap` (Auto Layout 속성)
  - `Typograhpy`: `Font Size`, `Font Weight`, `Line Height`(px/em/unitless), `Letter Spacing`
  - `Fills` (Hex Code, Opacity)
  - `Strokes` (Border width, color, style)
  - `Effects` (Shadow, Blur - 정확한 x, y, blur, spread 값)

### 1.2 에셋 준비

- 아이콘, 로고 등 그래픽 요소는 반드시 SVG 형식으로 다운로드하여 사용합니다.
- 스크린샷 캡처 사용 금지.

## 2. 구현 원칙 (Implementation)

### 2.1 레이아웃 (Layout)

- **Auto Layout** = `display: flex` (또는 `grid`)
- Figma의 `Gap` -> CSS `gap`
- Figma의 `Padding` -> CSS `padding`
- Figma의 `Fill container` -> CSS `flex: 1` 또는 `width: 100%`
- Figma의 `Hug contents` -> CSS `width: fit-content` 또는 `display: inline-block` (상황에 따라)

### 2.2 타이포그래피 (Typography)

- **Line-height**: 피그마의 px 값을 rem으로 변환하거나 unitless 값으로 정확히 변환합니다. `normal` 등 막연한 값 사용 금지.
- **Letter-spacing**: 피그마의 `%` 값을 `em`으로 변환하거나 px 값을 정확히 적용합니다.
- **Font-family**: 프로젝트 정의 폰트를 사용하되, 피그마와 다를 경우 반드시 확인합니다.

### 2.3 단위 변환 (Units)

- 디자인의 `px` 값은 프로젝트 규칙(`_mixins.scss`의 `rem()` 등)을 사용하여 `rem`으로 변환합니다.
- 예: `width: 380px` -> `@include rem(width, 380)`
- **반올림 주의**: 소수점 단위가 중요한 경우(Border 0.5px 등)를 제외하고 정수 단위로 깔끔하게 처리하되, 눈에 띄는 오차가 없어야 합니다.

### 2.4 경로 및 리소스 확인

- **CSS/JS 경로**: `pathStyles`와 같은 변수가 빌드 과정에서 치환되지 않을 경우, 상대 경로(`../../assets/styles/style.css`) 등으로 수정하여 스타일 적용 여부를 즉시 확인합니다.
- **이미지 경로**: 이미지가 `dist` 또는 `src` 기준에서 올바르게 로드되는지 브라우저를 통해 검증합니다.

## 3. 검증 (Verification)

### 3.1 브라우저 vs 피그마 비교

- 구현 후 반드시 브라우저 화면과 피그마 화면을 나란히(Side-by-side) 놓고 비교합니다.
- **체크리스트**:
  - [ ] 텍스트 줄바꿈 위치가 동일한가?
  - [ ] 여백(Padding, Margin, Gap)이 육안으로 동일한가?
  - [ ] 버튼, 인풋 등의 높이가 정확한가?
  - [ ] 그림자, 테두리 색상이 정확한가?

### 3.2 수정 루프

- 1px이라도 다르면 원인을 찾아 수정합니다.
- "비슷하니까 괜찮겠지"라는 생각은 버립니다.
