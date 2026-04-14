---
name: implement-design
description: Translates Figma designs into production-ready code with 1:1 visual fidelity. Use when implementing UI from Figma files, when user mentions "implement design", "generate code", "implement component", "build Figma design", provides Figma URLs, or asks to build components matching Figma specs. Requires Figma MCP server connection.
metadata:
  mcp-server: figma, figma-desktop
---

# 구현 설계

## 개요

이 기술은 Figma 디자인을 프로덕션 준비 코드로 변환하는 구조화된 워크플로우를 제공합니다. 이 기술은 Figma MCP 서버와 일관된 통합, 디자인 토큰의 적절한 사용, 디자인과 완벽한 시각적 일치를 보장합니다.

## 전제 조건

- Figma MCP 서버에 연결되어 있고 접근 가능해야 합니다.
- 사용자는 `https://figma.com/design/:fileKey/:fileName?node-id=1-2` 형식의 Figma URL을 제공해야 합니다.
- `:fileKey`는 파일 키입니다.
- `1-2`는 노드 ID(구현할 특정 컴포넌트 또는 프레임)입니다.
- **또는** `figma-desktop` MCP를 사용하는 경우: 사용자는 Figma 데스크톱 앱에서 노드를 직접 선택할 수 있습니다(URL 필요 없음).
- 프로젝트에는 이미 구축된 디자인 시스템 또는 컴포넌트 라이브러리가 있어야 합니다(권장).

## 필수 워크플로우

**순서대로 이 단계를 따르고 단계를 건너뛰지 마세요.**

### 단계 1: 노드 ID 가져오기

#### 옵션 A: Figma URL에서 파싱

사용자가 Figma URL을 제공하면 파일 키와 노드 ID를 추출하여 MCP 도구에 인수로 전달합니다.

**URL 형식:** `https://figma.com/design/:fileKey/:fileName?node-id=1-2`

**추출:**

- **File key:** `:fileKey` (URL의 `/design/` 이후의 세그먼트)
- **Node ID:** `1-2` (URL의 `node-id` 쿼리 매개변수의 값)

**참고:** `figma-desktop` MCP를 사용할 때 `fileKey`는 도구 호출에 매개변수로 전달되지 않습니다. 서버는 현재 열린 파일을 자동으로 사용하므로 `nodeId`만 필요합니다.

**예시:**

- URL: `https://figma.com/design/kL9xQn2VwM8pYrTb4ZcHjF/DesignSystem?node-id=42-15`
- File key: `kL9xQn2VwM8pYrTb4ZcHjF`
- Node ID: `42-15`

#### 옵션 B: Figma 데스크톱 앱에서 현재 선택 사용 (figma-desktop MCP만)

`figma-desktop` MCP를 사용하고 사용자가 URL을 제공하지 않을 때, 도구는 자동으로 데스크톱 앱에서 열린 Figma 파일의 현재 선택된 노드를 사용합니다.

**참고:** 선택 기반 프롬프트는 `figma-desktop` MCP 서버에서만 작동합니다. 원격 서버는 컨텍스트를 추출하기 위해 프레임 또는 레이어에 대한 링크가 필요합니다. 사용자는 노드가 선택된 상태로 Figma 데스크톱 앱을 열어 두어야 합니다.

### 단계 2: 디자인 컨텍스트 가져오기

`get_design_context`를 실행하여 추출된 파일 키와 노드 ID를 전달합니다.

```
get_design_context(fileKey=":fileKey", nodeId="1-2")
```

이것은 다음과 같은 구조화된 데이터를 제공합니다:

- 레이아웃 속성(자동 레이아웃, 제약 조건, 크기 조정)
- 타이포그래피 사양
- 색상 값 및 디자인 토큰
- 컴포넌트 구조 및 변형
- 간격 및 패딩 값

**응답이 너무 크거나 잘려있을 때:**

1. `get_metadata(fileKey=":fileKey", nodeId="1-2")`를 실행하여 고급 노드 맵을 가져옵니다.
2. 메타데이터에서 필요한 특정 자식 노드를 식별합니다.
3. `get_design_context(fileKey=":fileKey", nodeId=":childNodeId")`를 실행하여 개별 자식 노드를 가져옵니다.

### 단계 3: 시각적 참조 캡처

`get_screenshot`를 실행하여 같은 파일 키와 노드 ID를 전달하여 시각적 참조를 캡처합니다.

```
get_screenshot(fileKey=":fileKey", nodeId="1-2")
```

이 캡처는 시각적 검증의 진실의 근거가 됩니다. 구현 중에 이 캡처를 쉽게 접근할 수 있도록 유지하세요.

### 단계 4: 필수 자산 다운로드

**중요:** 다음 자산 규칙을 ​​준수하십시오.

- Figma MCP 서버가 이미지 또는 SVG에 대해 `localhost` 소스를 반환하는 경우, 그 소스를 직접 사용합니다.
- 새로운 아이콘 패키지를 가져오거나 추가하지 마세요. 모든 자산은 Figma 페이로드에서 가져와야 합니다.
- `localhost` 소스가 제공된 경우 플레이스홀더를 사용하거나 생성하지 마세요.
- 자산은 Figma MCP 서버의 내장 자산 엔드포인트를 통해 제공됩니다.

### 단계 5: 프로젝트 규칙 확인 (필수)

SCSS 및 이미지 구현 단계로 넘어가기 전에, 반드시 `.agent/rules/CSS.md` 및 `.agent/rules/components/image-implementation.md` 파일을 읽고 숙지합니다.

- **필수 참조 파일**: `CSS.md`, `image-implementation.md`
- **확인 사항**:
  - `rem` 믹스인 사용 규칙 (px 단위 금지)
  - 중첩 (Nesting) 깊이 제한
  - 클래스 네이밍 컨벤션
  - 색상 변수 사용 규칙 (모든 변수는 `src/assets/styles/abstracts/_variables.scss`에 등록 필수)
  - z-index 관리 규칙
  - 이미지 및 아이콘 구현 가이드 (영역 확보, 경로 위임)

```
view_file(AbsolutePath="CSS.md")
view_file(AbsolutePath=".agent/rules/components/image-implementation.md")
```

### 단계 6: 프로젝트 규칙으로 변환

Figma MCP 출력을 이 프로젝트의 프레임워크, 스타일 및 규칙으로 변환합니다.

**핵심 원칙:**

- Figma MCP 출력(일반적으로 React + Tailwind)을 디자인과 동작의 표현으로, 최종 코드 스타일이 아닌 것으로 처리합니다.
- Tailwind 유틸리티 클래스를 프로젝트의 선호하는 유틸리티 또는 디자인 시스템 토큰으로 대체합니다.
- 기존 컴포넌트(버튼, 입력, 타이포그래피)를 복제 기능 대신 재사용합니다.
- 프로젝트의 색상 시스템, 타이포그래피 스케일 및 간격 토큰을 일관되게 사용합니다.
- **필수**: 사용되는 모든 색상,폰트,z-index 변수는 `src/assets/styles/abstracts/_variables.scss`에 등록되어야 합니다. 파일 내 하드코딩된 색상 값(#000) 금지.
- 기존 라우팅, 상태 관리 및 데이터 가져오기 패턴을 존중합니다.

### 단계 7: 1:1 시각적 일치 달성

Figma 디자인과 완벽한 시각적 일치를 추구합니다.

**가이드라인:**

- Figma의 정확한 일치를 추구합니다.
- 하드코딩된 값은 피하고 Figma에서 사용 가능한 디자인 토큰을 사용합니다.
- 디자인 시스템 토큰과 Figma 사양 사이의 충돌이 발생할 때 디자인 시스템 토큰을 선호하지만, 최소한의 간격 조정으로 시각을 일치시킵니다.
- 접근성을 위한 WCAG 요구사항을 준수합니다.
- 필요한 경우 컴포넌트 문서를 추가합니다.

### 단계 8: Figma와 검증

구현이 완료된 후, 최종 UI가 Figma 캡처와 완벽하게 일치하는지 확인합니다.

**검증 체크리스트:**

- [ ] 레이아웃 일치(간격, 정렬, 크기)
- [ ] 타이포그래피 일치(글꼴, 크기, 굵기, 줄 간격)
- [ ] 색상이 정확히 일치
- [ ] 인터랙티브 상태(호버, 활성화, 비활성화)가 설계대로 작동
- [ ] 반응형 동작이 Figma 제약 조건을 준수함
- [ ] 에셋이 올바르게 렌더링됨
- [ ] 접근성 표준 충족

## 구현 규칙

### 컴포넌트 조직

- UI 컴포넌트를 프로젝트의 지정된 디자인 시스템 디렉토리에 배치합니다.
- 프로젝트의 컴포넌트 이름 규칙을 따릅니다.
- 동적 값이 필요하지 않은 경우 인라인 스타일을 피합니다.

### 디자인 시스템 통합

- 가능한 경우 프로젝트의 디자인 시스템 컴포넌트를 사용합니다.
- Figma 디자인 토큰을 프로젝트 디자인 토큰으로 매핑합니다.
- 일치하는 컴포넌트가 있는 경우, 새로운 컴포넌트를 생성하는 대신 확장합니다.
- 디자인 시스템에 추가된 새 컴포넌트를 문서화합니다.

### 코드 품질

- 하드코딩된 값은 피하고 상수 또는 디자인 토큰으로 추출합니다.
- 컴포넌트가 재사용 가능하고 조합 가능한지 유지합니다.
- 컴포넌트 props에 TypeScript 타입을 추가합니다.
- 내보낸 컴포넌트에 JSDoc 주석을 포함합니다.

## 예시

### 예시 1: 버튼 컴포넌트 구현

사용자가 말합니다: "이 Figma 버튼 컴포넌트를 구현해 주세요.": https://figma.com/design/kL9xQn2VwM8pYrTb4ZcHjF/DesignSystem?node-id=42-15"

**실행 방법**

1. URL을 파싱하여 fileKey=`kL9xQn2VwM8pYrTb4ZcHjF` 및 nodeId=`42-15`를 추출합니다.
2. `get_design_context(fileKey="kL9xQn2VwM8pYrTb4ZcHjF", nodeId="42-15")`를 실행합니다.
3. 시각적 참조를 위해 `get_screenshot(fileKey="kL9xQn2VwM8pYrTb4ZcHjF", nodeId="42-15")`를 실행합니다.
4. 프로젝트에 기존 버튼 컴포넌트가 있는지 확인합니다.
5. 있으면 새 변형을 추가하여 확장하고, 없으면 프로젝트 규칙에 따라 새 컴포넌트를 생성합니다.
6. Figma 색상을 프로젝트 디자인 토큰(예: `primary-500`, `primary-hover`)에 매핑합니다.
7. 스크린샷과 비교하여 패딩, 테두리 반경, 타이포그래피를 검증합니다.

**결과:** Figma 디자인과 일치하는 버튼 구성 요소가 프로젝트 디자인 시스템에 통합되었습니다.

### 예시 2: 대시보드 레이아웃 구축

사용자가 말합니다: "이 Figma 대시보드를 구축해 주세요.": https://figma.com/design/pR8mNv5KqXzGwY2JtCfL4D/Dashboard?node-id=10-5"

**실행 방법:**

1. URL을 파싱하여 fileKey=`pR8mNv5KqXzGwY2JtCfL4D` 및 nodeId=`10-5`를 추출합니다.
2. `get_metadata(fileKey="pR8mNv5KqXzGwY2JtCfL4D", nodeId="10-5")`를 실행하여 페이지 구조를 이해합니다.
3. 메타데이터에서 메인 섹션(헤더, 사이드바, 콘텐츠 영역, 카드)과 그 자식 노드 ID를 식별합니다.
4. `get_design_context(fileKey="pR8mNv5KqXzGwY2JtCfL4D", nodeId=":childNodeId")`를 실행하여 각 주요 섹션을 위한 디자인 컨텍스트를 가져옵니다.
5. `get_screenshot(fileKey="pR8mNv5KqXzGwY2JtCfL4D", nodeId="10-5")`를 실행하여 전체 페이지를 위한 스크린샷을 가져옵니다.
6. 프로젝트의 레이아웃 프리미티브를 사용하여 레이아웃을 구축합니다.
7. 가능하면 기존 컴포넌트를 사용하여 각 섹션을 구현합니다.
8. Figma 제약 조건을 준수하는 반응형 동작을 검증합니다.

**결과:** Figma 디자인과 일치하는 완전한 대시보드, 반응형 레이아웃.

## 모범 사례

### 항상 맥락부터 시작하세요

가정을 기반으로 구현하지 마세요. 항상 `get_design_context` 및 `get_screenshot`을 먼저 가져옵니다.

### 자주 검증

구현 중에 자주 검증하세요, 끝에만 검증하지 마세요. 이는 이른 시점에서 문제를 잡는 데 도움이 됩니다.

### 문서화

Figma 디자인과 일치하지 않아야 할 경우(예: 접근성 또는 기술적 제약 조건으로 인해), 코드 주석에 이유를 문서화합니다.

### 재사용

새 컴포넌트를 생성하기 전에 기존 컴포넌트를 확인합니다. 코드베이스의 일관성이 Figma 복제보다 중요합니다.

### 디자인 시스템 우선

불분명할 때 프로젝트의 디자인 시스템 패턴을 리터럴 Figma 번역보다 선호합니다.

## 일반적인 문제 및 해결 방법

### Figma 출력이 잘려 있습니다.

**원인:** 디자인이 너무 복잡하거나 너무 많은 중첩된 레이어가 단일 응답에 반환됩니다.
**해결:** `get_metadata`를 사용하여 노드 구조를 가져오고, `get_design_context`를 사용하여 개별 노드를 가져옵니다.

### Figma 디자인과 일치하지 않습니다.

**원인:** 구현된 코드와 원본 Figma 디자인 사이의 시각적 차이.
**해결:** 스크린샷과 비교하여 패딩, 색상, 타이포그래피 값을 확인합니다.

### 자산이 로드되지 않습니다.

**원인:** Figma MCP 서버의 자산 엔드포인트에 액세스할 수 없거나 URL이 수정됩니다.
**해결:** Figma MCP 서버의 자산 엔드포인트가 액세스 가능하도록 확인합니다. 서버는 `localhost` URL에서 자산을 제공합니다. 수정 없이 직접 사용합니다.

### 디자인 토큰 값이 Figma와 다릅니다.

**원인:** 프로젝트의 디자인 시스템 토큰이 Figma 디자인에 지정된 값과 다릅니다.
**해결:** 프로젝트 토큰이 Figma 값과 다를 때 일관성을 위해 프로젝트 토큰을 선호하지만, 시각적 일치를 유지하기 위해 공간/크기를 조정합니다.

## 디자인 구현 이해하기

Figma 구현 워크플로우는 디자인을 코드로 변환하는 데 신뢰할 수 있는 프로세스를 설정합니다:

**디자이너:** 구현이 픽셀 정확도로 디자인과 일치할 것임에 대한 신뢰감.
**개발자:** 추측 없이 구현하고 양방향 수정을 줄이는 구조화된 접근법.
**팀:** 일관성 있고 높은 품질의 구현으로 디자인 시스템의 일관성을 유지합니다.

이 워크플로우를 따르면 모든 Figma 디자인을 구현할 때 같은 수준의 신중함과 세부사항에 대한 신중함을 유지합니다.

## 추가 자원

- [Figma MCP Server Documentation](https://developers.figma.com/docs/figma-mcp-server/)
- [Figma MCP Server Tools and Prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)
- [Figma Variables and Design Tokens](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
