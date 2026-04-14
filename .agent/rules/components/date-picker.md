---
trigger: always_on
---

# Datepicker

> 날짜 선택 인터페이스를 제공하는 컴포넌트로, 사용자가 달력 UI를 통해 날짜를 선택할 수 있습니다. 단일 날짜 선택(Datepicker)과 기간 선택(RangePicker) 두 가지 모드를 지원합니다.

```html
<!-- 기본 구조 예시 -->
<div class="component-datepicker">
  <div class="component-input">
    <div class="input-field">
      <input
        type="text"
        class="datepicker-btn-trigger"
        id="datepicker_example"
        aria-label="날짜 선택"
        placeholder="날짜를 입력해주세요"
      />
      <span class="input-field-btn datepicker-state">
        <span class="hide-txt">달력</span>
        <i class="ico-calendar ico-normal" aria-hidden="true"></i>
      </span>
    </div>
  </div>
</div>
```

## TL;DR

- **언제 사용하나요?** 사용자가 날짜를 입력해야 하는 폼, 검색 필터, 예약 시스템 등에서 사용합니다.
- **핵심 역할**: 달력 UI를 통한 직관적인 날짜 선택, 날짜 형식 자동 포맷팅, 기간 선택 지원
- **주요 클래스/속성**: `.component-datepicker`, `.datepicker-btn-trigger`, `data-props-type`, `.datepicker-state`

## 기본 마크업

### 필수 구조

- `.component-datepicker`: 최상위 래퍼 (Datepicker 컴포넌트 컨테이너)
- `.component-input`: Input 컴포넌트 래퍼
- `.input-field`: 입력 필드 컨테이너
- `.datepicker-btn-trigger`: 날짜 선택을 트리거하는 입력 필드
- `.input-field-btn`: 달력 아이콘 버튼 영역
- `.datepicker-state`: 달력 상태 표시 (열림/닫힘)

### 필수 속성

- `aria-label`: 입력 필드의 목적을 설명 (예: "시작일", "종료일", "날짜 선택")
- `placeholder`: 사용자에게 입력 형식 안내
- `data-props-type`: 컴포넌트 타입 지정 (예: `range` - 기간 선택 모드)
- `name`: RangePicker에서 시작일/종료일 구분 (예: `range-start`, `range-end`)
- `readonly`: 직접 입력 방지, 달력 UI를 통한 선택만 허용

> **TIP**: 초기값 설정 시 `value="today"` 또는 `value="2025.02.06"` 형식으로 지정할 수 있습니다.

## 접근성 (Accessibility)

- 키보드 탐색: Tab 키로 입력 필드 포커스, Enter/Space로 달력 열기
- `aria-label`을 통해 스크린리더가 입력 필드의 목적을 이해할 수 있도록 합니다
- 달력 아이콘은 장식 요소이므로 `aria-hidden="true"` 속성 필수
- `.hide-txt` 클래스로 시각적으로 숨겨진 텍스트를 스크린리더에 제공
- 포커스 스타일이 명확하게 표시되어야 합니다

## 구현 가이드

### 공통 규칙

- 입력 필드는 `readonly` 속성을 사용하여 직접 입력을 방지합니다
- 달력 아이콘은 `.input-field-btn` 내부에 배치합니다
- 날짜 형식은 프로젝트 표준에 따라 통일합니다 (예: YYYY.MM.DD)
- RangePicker 사용 시 시작일과 종료일 입력 필드를 `.component-rangepicker`로 감쌉니다

### 클래스 & 상태 정의

| 클래스/속성               | 용도                         | 비고                                       |
| ------------------------- | ---------------------------- | ------------------------------------------ |
| `.component-datepicker`   | Datepicker 컴포넌트 컨테이너 | 필수 클래스                                |
| `.datepicker-btn-trigger` | 달력 트리거 입력 필드        | 클릭 시 달력 UI 표시                       |
| `.datepicker-state`       | 달력 상태 표시               | 열림/닫힘 상태 시각적 피드백               |
| `data-props-type="range"` | 기간 선택 모드 활성화        | RangePicker에서 사용                       |
| `.component-rangepicker`  | RangePicker 래퍼             | 시작일/종료일 Datepicker를 감싸는 컨테이너 |
| `.reality`                | 현재 날짜 표시 모드          | 오늘 날짜를 기본값으로 설정                |

### 자바스크립트 연동

- `data-datepicker="separateRange"`: RangePicker에서 시작일/종료일을 별도로 관리
- 달력 라이브러리: Vanilla JS Datepicker 사용
- 이벤트 콜백: `beforeOpen`, `afterOpen`, `beforeClose`, `afterClose`, `onInit`, `onResize`
- 상태 관리: `state` 속성으로 열림/닫힘 상태 제어
- 모달 동작: `dimm`, `dimmClick`, `esc`, `scrollLock` 속성으로 제어

## 패턴 & 변형 (Variants)

### Variant 1: 단일 날짜 선택 (Datepicker)

- **사용 시나리오**: 하나의 날짜만 선택해야 하는 경우
- **기본 구조**: `.component-datepicker` 단독 사용
- **특징**: 간단한 날짜 입력, 생년월일, 예약일 등

```html
<div class="component-datepicker">
  <div class="component-input">
    <div class="input-field">
      <input
        type="text"
        class="datepicker-btn-trigger"
        id="datepicker_single"
        aria-label="날짜 선택"
        placeholder="날짜를 입력해주세요"
        readonly
      />
      <span class="input-field-btn datepicker-state">
        <span class="hide-txt">달력</span>
        <i class="ico-calendar ico-normal" aria-hidden="true"></i>
      </span>
    </div>
  </div>
</div>
```

### Variant 2: 기간 선택 (RangePicker)

- **사용 시나리오**: 시작일과 종료일을 선택해야 하는 경우
- **추가 클래스**: `.component-rangepicker` (래퍼), `data-props-type="range"`
- **필수 속성**: `name="range-start"`, `name="range-end"`
- **특징**: 두 개의 Datepicker를 연결하여 기간 선택

```html
<div class="component-rangepicker">
  <div class="component-datepicker" data-props-type="range">
    <div class="component-input">
      <div class="input-field">
        <input
          type="text"
          class="datepicker-btn-trigger"
          id="datepicker_range_start"
          aria-label="기간 시작일 선택"
          placeholder="시작일을 입력해주세요"
          name="range-start"
          data-datepicker="separateRange"
          readonly
        />
        <span class="input-field-btn datepicker-state">
          <span class="hide-txt">달력</span>
          <i class="ico-calendar ico-normal" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  </div>
  <div class="component-datepicker" data-props-type="range">
    <div class="component-input">
      <div class="input-field">
        <input
          type="text"
          class="datepicker-btn-trigger"
          id="datepicker_range_end"
          aria-label="기간 종료일 선택"
          placeholder="종료일을 입력해주세요"
          name="range-end"
          data-datepicker="separateRange"
          readonly
        />
        <span class="input-field-btn datepicker-state">
          <span class="hide-txt">달력</span>
          <i class="ico-calendar ico-normal" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  </div>
</div>
```

### Variant 3: 현재 날짜 표시 (Reality Mode)

- **사용 시나리오**: 오늘 날짜를 기본값으로 표시해야 하는 경우
- **추가 클래스**: `.reality`
- **초기값 설정**: `value="today"` 또는 특정 날짜 (예: `value="2025.02.06"`)

```html
<div class="component-datepicker reality">
  <div class="component-input">
    <div class="input-field">
      <input
        type="text"
        class="datepicker-btn-trigger"
        id="datepicker_reality"
        aria-label="날짜 선택"
        placeholder="날짜를 입력해주세요"
        value="today"
        readonly
      />
      <span class="input-field-btn datepicker-state">
        <span class="hide-txt">달력</span>
        <i class="ico-calendar ico-normal" aria-hidden="true"></i>
      </span>
    </div>
  </div>
</div>
```

## 상세 예시 (Patterns)

### Pattern 1: 검색 필터에서 기간 선택

실제 검색 필터 영역에서 RangePicker와 라디오 버튼을 조합한 패턴

```html
<div class="filter-item col-2 align-baseline">
  <label for="filter_date_range" class="filter-label">수신일자</label>
  <div class="filter-content">
    <!-- RangePicker -->
    <div class="component-rangepicker">
      <div class="component-datepicker" data-props-type="range">
        <div class="component-input">
          <div class="input-field">
            <input
              type="text"
              class="datepicker-btn-trigger"
              id="filter_date_start"
              aria-label="기간 시작일 선택"
              placeholder="시작일을 입력해주세요"
              name="range-start"
              data-datepicker="separateRange"
              readonly
            />
            <span class="input-field-btn datepicker-state">
              <span class="hide-txt">달력</span>
              <i class="ico-calendar ico-normal" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="component-datepicker" data-props-type="range">
        <div class="component-input">
          <div class="input-field">
            <input
              type="text"
              class="datepicker-btn-trigger"
              id="filter_date_end"
              aria-label="기간 종료일 선택"
              placeholder="종료일을 입력해주세요"
              name="range-end"
              data-datepicker="separateRange"
              readonly
            />
            <span class="input-field-btn datepicker-state">
              <span class="hide-txt">달력</span>
              <i class="ico-calendar ico-normal" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 빠른 선택 라디오 버튼 -->
    <div class="radio-group">
      <div class="component-input">
        <label class="radio-inner">
          <input type="radio" name="date_range_quick" checked />
          <span class="radio-item"><span class="radio-txt">당일</span></span>
        </label>
      </div>
      <div class="component-input">
        <label class="radio-inner">
          <input type="radio" name="date_range_quick" />
          <span class="radio-item"><span class="radio-txt">7일</span></span>
        </label>
      </div>
      <div class="component-input">
        <label class="radio-inner">
          <input type="radio" name="date_range_quick" />
          <span class="radio-item"><span class="radio-txt">15일</span></span>
        </label>
      </div>
      <div class="component-input">
        <label class="radio-inner">
          <input type="radio" name="date_range_quick" />
          <span class="radio-item"><span class="radio-txt">30일</span></span>
        </label>
      </div>
    </div>
  </div>
</div>
```

## API / Props Reference

### State

| Props / 속성 | Type   | Default | Description         |
| ------------ | ------ | ------- | ------------------- |
| `state`      | string | close   | 달력 열림/닫힘 상태 |

### Props

| Props / 속성             | Type              | Default       | Description                                  |
| ------------------------ | ----------------- | ------------- | -------------------------------------------- |
| `direction`              | string            | center/bottom | PC/Mobile 달력 열기 방향                     |
| `dimm`                   | boolean           | true          | 배경 딤 처리 여부                            |
| `dimmClick`              | boolean           | true          | 딤 영역 클릭 시 닫힘 여부                    |
| `esc`                    | boolean           | true          | ESC 키 입력 시 닫힘 여부                     |
| `scrollLock`             | boolean           | true          | 달력 열림 시 body 스크롤 잠금 여부           |
| `footerSticky`           | boolean, function | false         | 푸터 고정 기능                               |
| `beforeOpen`             | function          | null          | 달력 열기 전 실행되는 콜백                   |
| `afterOpen`              | function          | null          | 달력 열린 후 실행되는 콜백                   |
| `beforeClose`            | function          | null          | 달력 닫기 전 실행되는 콜백                   |
| `afterClose`             | function          | null          | 달력 닫힌 후 실행되는 콜백                   |
| `onInit`                 | function          | null          | 컴포넌트 초기화 후 실행되는 콜백             |
| `onResize`               | function          | null          | window resize 이벤트 발생 후 실행 (debounce) |
| `footerSticky.enter`     | function          | null          | 푸터 진입 시 실행되는 콜백                   |
| `footerSticky.leaveback` | function          | null          | 푸터 벗어날 때 실행되는 콜백                 |

### Methods

| Method   | Description       | Parameters | Return |
| -------- | ----------------- | ---------- | ------ |
| `open`   | 달력 열기         | null       | null   |
| `close`  | 달력 닫기         | null       | null   |
| `update` | 컴포넌트 업데이트 | null       | null   |

## 참고 자료

- 공식 사이트: [Vanilla JS Datepicker](https://mymth.github.io/vanillajs-datepicker/)
- 데모 사이트: [Vanilla JS Datepicker Demo](https://mymth.github.io/vanillajs-datepicker/#/demo)
