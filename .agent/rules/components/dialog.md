---
trigger: always_on
---

# Dialog

> 사용자에게 중요한 정보를 전달하거나 확인을 요청하는 모달 대화상자 컴포넌트입니다. Alert, Confirm, Image Preview 등 다양한 형태를 지원합니다.

```html
<!-- 기본 구조 예시 -->
<button class="btn btn-dialog">Dialog 열기</button>

<!-- 이곳에 dialog가 동적으로 생성됩니다 -->
<div class="layer-wrap"></div>

<script>
  document.querySelector(".btn-dialog").addEventListener("click", function () {
    etUI.dialog.alert("메시지 내용");
  });
</script>
```

## TL;DR

- **언제 사용하나요?** 사용자의 주의가 필요한 알림, 확인 요청, 이미지 미리보기 등에 사용합니다.
- **핵심 역할**: 중요 정보 전달, 사용자 확인/취소 선택, 이미지 갤러리 미리보기
- **주요 클래스/속성**: `.component-dialog`, `.layer-wrap`, `etUI.dialog` API

## 기본 마크업

### 필수 구조

- `.layer-wrap`: Dialog가 동적으로 생성되는 컨테이너
- `.component-dialog`: 동적으로 생성되는 Dialog 래퍼 (Alert/Confirm 시 자동 생성)
- 트리거 버튼: Dialog를 열기 위한 버튼 요소

### 필수 속성

- `etUI.dialog.alert()`: Alert 타입 Dialog 호출
- `etUI.dialog.confirm()`: Confirm 타입 Dialog 호출
- `etUI.dialog.previewImage()`: Image Preview Dialog 호출

> **TIP**: Alert와 Confirm은 `layer-wrap` 내부에 동적으로 생성되므로, 모달과 달리 별도의 `component-dialog` 클래스를 HTML에 추가할 필요가 없습니다.

## 접근성 (Accessibility)

- ESC 키를 통한 Dialog 닫기 기능을 기본 제공합니다.
- 딤(Dim) 영역 클릭 시 Dialog 닫기 기능을 지원합니다.
- Dialog 열림 시 body 스크롤 잠금 기능을 제공합니다.
- 키보드 포커스가 Dialog 내부로 이동하여 접근성을 보장합니다.

## 구현 가이드

### 공통 규칙

- 설계 단계의 특별한 UX 요청이나 개발 환경에 따른 제약이 없다면 테스트 완료된 코드를 복사하여 사용합니다.
- Alert와 Confirm은 `layer-wrap` 내부에 동적으로 생성됩니다.
- JavaScript API(`etUI.dialog`)를 통해 Dialog를 제어합니다.

### 클래스 & 상태 정의

| 클래스/속성         | 용도                 | 비고                |
| ------------------- | -------------------- | ------------------- |
| `.layer-wrap`       | Dialog 생성 컨테이너 | 필수 요소           |
| `.component-dialog` | Dialog 래퍼          | 동적 생성됨         |
| `state`             | 열림/닫힘 상태       | `open` 또는 `close` |

### 자바스크립트 연동

Dialog는 `etUI.dialog` API를 통해 제어됩니다:

- **Alert**: `etUI.dialog.alert(message)` 또는 `etUI.dialog.alert(options)`
- **Confirm**: `etUI.dialog.confirm(message, callback)` 또는 `etUI.dialog.confirm(options)`
- **Image Preview**: `etUI.dialog.previewImage(options)`

## 패턴 & 변형 (Variants)

### Variant 1: Alert (기본)

- **사용 시나리오**: 단순 정보 전달 시 사용
- **특징**: 확인 버튼 하나만 제공
- **파라미터**: 문자열 또는 옵션 객체

```html
<!--S: alert 트리거 버튼 -->
<button class="btn btn-dialog01">Alert</button>
<!--E: alert 트리거 버튼 -->

<!--S: 이곳에 alert가 동적으로 생성됩니다. -->
<div class="layer-wrap"></div>
<!--E: 이곳에 alert가 동적으로 생성됩니다. -->

<!--S: alert 스크립트 -->
<script>
  document.querySelector(".btn-dialog01").addEventListener("click", function () {
    const msg = `
      애국가(愛國歌)는 '나라를 사랑하는 노래'라는 뜻이에요. 우리나라는 애국가에 특별한 이름을 붙이지 않고 국가(國歌)로 사용하고 있어요.
      오늘날 불리고 있는 애국가 노랫말은 우리나라가 외세의 침략으로 위기에 처해있던 시기(1907년 전후)에 나라 사랑하는 마음과 우리 민족의
      자주의식을 북돋우기 위해 만들어진 것으로 보여져요.
      그 후 여러 선각자의 손을 거쳐 현재와 같은 내용을 담게 되었는데 이 노랫말에 붙여진 곡조는 스코틀랜드 민요 '올드 랭 사인 (Auld Lang Syne)' 이었답니다.
      당시 해외에서 활동 중이던 작곡가 안익태(安益泰) 선생은 애국가에 남의 나라 곡을 붙여 부르는 것을 안타깝게 여겨 1935년에 오늘날의 애국가를 작곡하였다고 해요.
      1948년 대한민국 정부가 수립된 이후 현재의 애국가가 정부의 공식행사에서 불려지고, 교과서에도 실리면서 전국적으로 불려지기 시작했답니다.
      한 세기 가까운 세월 동안 슬플 때나 기쁠 때나 우리 겨레와 운명을 같이 해 온 애국가를 부를 때마다 우리 모두 선조들의 나라 사랑 정신을 새롭게 되새겨보아요.
    `;
    etUI.dialog.alert(msg);
  });
</script>
<!--E: alert 스크립트 -->
```

### Variant 2: Alert (with title)

- **사용 시나리오**: 제목과 메시지를 함께 표시해야 할 때
- **특징**: 제목과 메시지 영역 분리, 콜백 함수 지원
- **추가 옵션**: `title`, `message`, `callback`

```html
<!--S: alert 트리거 버튼 -->
<button class="btn btn-dialog02">Alert(with title)</button>
<!--E: alert 트리거 버튼 -->

<!--S: 이곳에 alert가 동적으로 생성됩니다. -->
<div class="layer-wrap"></div>
<!--E: 이곳에 alert가 동적으로 생성됩니다. -->

<!--S: alert 스크립트 -->
<script>
  document.querySelector(".btn-dialog02").addEventListener("click", function () {
    etUI.dialog.alert({
      title: "alert title",
      message: "alert message",
      callback: function () {
        console.log("alert callback");
      },
    });
  });
</script>
<!--E: alert 스크립트 -->
```

### Variant 3: Alert (with icon)

- **사용 시나리오**: 아이콘과 함께 시각적 강조가 필요할 때
- **특징**: 아이콘 표시 지원
- **추가 옵션**: `icon` (선택)

```html
<!--S: alert 트리거 버튼 -->
<button class="btn btn-dialog03">Alert(with icon)</button>
<!--E: alert 트리거 버튼 -->

<!--S: 이곳에 alert가 동적으로 생성됩니다. -->
<div class="layer-wrap"></div>
<!--E: 이곳에 alert가 동적으로 생성됩니다. -->

<!--S: alert 스크립트 -->
<script>
  document.querySelector(".btn-dialog03").addEventListener("click", function () {
    etUI.dialog.alert({
      title: "alert title",
      message: "alert message",
      callback: function () {
        console.log("alert callback");
      },
    });
  });
</script>
<!--E: alert 스크립트 -->
```

### Variant 4: Confirm (기본)

- **사용 시나리오**: 사용자의 확인/취소 선택이 필요할 때
- **특징**: 확인/취소 버튼 두 개 제공
- **파라미터**: 메시지와 긍정 콜백

```html
<!--S: confirm 트리거 버튼 -->
<button class="btn btn-dialog04">confirm</button>
<!--E: confirm 트리거 버튼 -->

<!--S: 이곳에 confirm이 동적으로 생성됩니다. -->
<div class="layer-wrap"></div>
<!--E: 이곳에 confirm이 동적으로 생성됩니다. -->

<!--S: confirm 스크립트 -->
<script>
  document.querySelector(".btn-dialog04").addEventListener("click", function () {
    etUI.dialog.confirm("컨펌 메세지", () => {
      console.log("긍정 콜백");
    });
  });
</script>
<!--E: confirm 스크립트 -->
```

### Variant 5: Confirm (with title)

- **사용 시나리오**: 제목과 메시지를 함께 표시하며 확인/취소 선택이 필요할 때
- **특징**: 제목, 메시지, 긍정/부정 콜백 모두 지원
- **추가 옵션**: `title`, `message`, `positiveCallback`, `negativeCallback`

```html
<!--S: confirm 트리거 버튼 -->
<button class="btn btn-dialog05">confirm(with title)</button>
<!--E: confirm 트리거 버튼 -->

<!--S: 이곳에 confirm이 동적으로 생성됩니다. -->
<div class="layer-wrap"></div>
<!--E: 이곳에 confirm이 동적으로 생성됩니다. -->

<!--S: confirm 스크립트 -->
<script>
  document.querySelector(".btn-dialog05").addEventListener("click", function () {
    etUI.dialog.confirm({
      title: "confirm title",
      message: "confirm message",
      negativeCallback: function () {
        console.log("negativeCallback");
      },
      positiveCallback: function () {
        console.log("positiveCallback");
      },
    });
  });
</script>
<!--E: confirm 스크립트 -->
```

### Variant 6: Confirm (with custom button name)

- **사용 시나리오**: 버튼 텍스트를 커스터마이징해야 할 때
- **특징**: 확인/취소 버튼 텍스트 변경 가능
- **추가 옵션**: `positiveText`, `negativeText`

```html
<!--S: confirm 트리거 버튼 -->
<button class="btn btn-dialog06">confirm(with custom button name)</button>
<!--E: confirm 트리거 버튼 -->

<!--S: 이곳에 confirm이 동적으로 생성됩니다. -->
<div class="layer-wrap"></div>
<!--E: 이곳에 confirm이 동적으로 생성됩니다. -->

<!--S: confirm 스크립트 -->
<script>
  document.querySelector(".btn-dialog06").addEventListener("click", function () {
    etUI.dialog.confirm({
      title: "confirm title",
      message: "confirm message",
      negativeText: "부정닫힘(커스텀텍스트)",
      positiveText: "긍정닫힘(커스텀텍스트)",
      negativeCallback: function () {
        console.log("negativeCallback");
      },
      positiveCallback: function () {
        console.log("positiveCallback");
      },
    });
  });
</script>
<!--E: confirm 스크립트 -->
```

### Variant 7: Preview Images

- **사용 시나리오**: 여러 이미지를 미리보기로 표시할 때
- **특징**: 이미지 갤러리 형태의 미리보기 제공
- **추가 옵션**: `title`, `images` (배열)

```html
<!--S: preview images 트리거 버튼 -->
<button class="btn btn-dialog07">preview images</button>
<!--E: preview images 트리거 버튼 -->

<!--S: 이곳에 preview dialog가 동적으로 생성됩니다. -->
<div class="layer-wrap"></div>
<!--E: 이곳에 preview dialog가 동적으로 생성됩니다. -->

<!--S: preview images 스크립트 -->
<script>
  document.querySelector(".btn-dialog07").addEventListener("click", function () {
    etUI.dialog.previewImage({
      title: "preview image",
      images: [
        {
          src: "https://i.ibb.co/6Hn3QGG/image.jpg",
          alt: "image01",
        },
        {
          src: "https://i.ibb.co/4FpJSG7/image.jpg",
          alt: "image02",
        },
        {
          src: "https://i.ibb.co/zVgTPq6/image.jpg",
          alt: "image03",
        },
      ],
    });
  });
</script>
<!--E: preview images 스크립트 -->
```

## API / Props Reference

### State

| Props / 속성 | Type   | Default | Description    |
| ------------ | ------ | ------- | -------------- |
| `state`      | string | close   | 열림/닫힘 상태 |

### Props

| Props / 속성       | Type     | Default | Description                     |
| ------------------ | -------- | ------- | ------------------------------- |
| `message`          | string   | null    | 메시지 내용                     |
| `title`            | string   | null    | 타이틀                          |
| `positiveText`     | string   | 확인    | 확인 버튼 텍스트                |
| `negativeText`     | string   | 취소    | 취소 버튼 텍스트                |
| `type`             | string   | alert   | Dialog 타입 (alert/confirm)     |
| `esc`              | boolean  | true    | ESC 키로 닫기 기능              |
| `dimmClick`        | boolean  | true    | 딤 클릭 시 닫기 기능            |
| `scrollLock`       | boolean  | false   | Dialog 열림 시 body 스크롤 잠금 |
| `callback`         | function | null    | Alert 닫힘 후 콜백              |
| `positiveCallback` | function | null    | Confirm 확인 버튼 콜백          |
| `negativeCallback` | function | null    | Confirm 취소 버튼 콜백          |
| `afterOpen`        | function | null    | Dialog 열린 후 콜백             |
| `images`           | array    | []      | Preview Image용 이미지 배열     |

### Methods

| Method  | Description | Parameters | Return |
| ------- | ----------- | ---------- | ------ |
| `open`  | Dialog 열기 | null       | null   |
| `close` | Dialog 닫기 | null       | null   |
