### 키워드 정리 🍠

- `useEffect` 🍠
  React component가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 하는 리액트 Hook.
  이러한 기능으로 인해 함수형 컴포넌트에서도 클래스형 컴포넌트에서 사용했던 생명주기 메서드를 사용할 수 있게 됨.
  ```jsx
  useEffect(function, deps)
  ```
  [ useEffect 사용 방식 ]
  - componentDidMount
    ```jsx
    useEffect(() => {
      console.log("마운트 될 때만 실행됨");
    }, []);
    ```
    컴포넌트가 화면에 가장 처음 렌더링 될 때 한 번만 실행하고 싶다면, deps 자리에 빈 배열 넣기
    ```jsx
    useEffect(() => {
      console.log("마운트 될 때만 실행됨");
    });
    ```
    배열을 생략한다면 리렌더링 될 때 마다 실행됨
  - componentDidUpdate
    ```jsx
    useEffect(() => {
      console.log(name);
      console, log("업데이트 될 때 실행");
    }, [name]);
    ```
    특정 값이 업데이트 될 때 실행하고 싶다면, deps 위치의 배열 안에 검사하고 싶은 값을 넣어줌. 위 방법은 업데이트 될 때만 실행하는 것이 아니라 마운트 될 때도 실행됨.
    ```jsx
    const mounted = useRef(false);
    useEffect(() => {
      if (!mounted.current) {
        mounted.current = true;
      } else {
        console.log(name);
        console, log("업데이트 될 때 실행");
      }
    }, [name]);
    ```
    만약 업데이트 될 때만 실행시키고 싶다면 위의 방법 사용
  - componentDidUnmount
    component가 사라질 때 (unmount) 혹은 update 되기 직전에 실행
    ```jsx
    useEffect(() => {
    	console.log('effect');
    	console.log(name);
    	return () => {
    		console.log('cleanup');
    		console.log(name);
    	};
    }, []};
    ```
    cleanup 함수 반환 (return 뒤에 나오는 함수)
    언마운트 될 때만 cleanup 함수를 실행하고 싶다면 두 번째 파라미터에 빈 배열을 넣음
    특정 값이 업데이트 되기 전에 함수를 실행하고 싶다면 배열 안에 검사하고 싶은 값을 넣음
- `try, catch, finally` 구문 🍠
  예외 처리 기법
  `try` : 처리할 예외가 발생할지도 모를 코드 블록을 정의하는 역할
  `catch` : `try` 블록 내부에서 예외가 발생할 경우 호출되는 문장 블록
  `finally` : `catch` 블록 다음에 이어지며, 항상 실행이 보장되는 코드를 포함. 생략이 가능함
- `axios` 🍠
  - 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리
  - 백엔드랑 프론트엔드랑 통신을 쉽게하기 위해 Ajax와 더불어 사용
  [특징]
  - 운영 환경에 따라 브라우저의 XMLHttpRequest 객체 또는 Node.js의 http api 사용
  - Promise(ES6) API 사용
  - 요청과 응답 데이터의 변형
  - HTTP 요청 취소
  - HTTP 요청과 응답을 JSON 형태로 자동 변경
- `fetch` 🍠
  - JavaScript에서 서버로 네트워크 요청을 보내고 응답을 받을 수 있도록 해주는 매서드
  - XMLHttpRequest와 비슷하지만 fetch는 Promise를 기반으로 구성되어 있어서 더 간편하게 사용할 수 있다는 차이점이 있음
- `axios` vs `fetch` (차이점) 🍠
  |                               | Axios                       | Fetch                            |
  | ----------------------------- | --------------------------- | -------------------------------- |
  | 설치                          | 패키지 설치 필요            | ES6부터 내장 라이브러리로 지원중 |
  | 호환성                        | 모던 브라우저에서 모두 지원 | 대부분 지원                      |
  | 사이트 간 요청 위조 보호 기능 | 지원                        | 미지원                           |
  | JSON 데이터 자동 변환         | 지원                        | 추가 로직 필요                   |
  | 요청 취소, 타임아웃 등 기능   | 지원                        | 없음                             |
  | 요청 인터셉트                 | 가능                        | 없음                             |
  fetch에 비해 브라우저 호환성이 좋고, 추가적인 로직 구현 없이도 없이도 사용할 수 있는 기능들이 많아 axios를 사용하는 경우가 많음
- `.env` 파일에는 어떤 내용들을 관리할까요? 🍠
  포트, DB관련 정보, API_KEY등.. 개발자 혼자서 또는 팀만 알아야 하는 값 즉, git, 오픈소스에 올리면 안되는 값들을 저장함
- **`custom hook ?`**
  개발자가 스스로 커스텀한 훅을 의미. 이를 이용해 반복되는 로직을 함수로 뽑아내어 재사용할 수 있음
  여러 url을 `fetch`할 때, 여러 `input`에 의한 상태 변경 등 반복되는 로직을 동일한 함수에서 작동하게 하고 싶을 때 커스텀 훅을 주로 사용
  [규칙]
  - **Custom Hook**을 정의할 때는 함수 이름 앞에 `use`를 붙이는 것이 규칙이다.
  - 대개의 경우 프로젝트 내의 `hooks` 디렉토리에 **Custom Hook**을 위치시킨다.
  - **Custom Hook**으로 만들 때 함수는 조건부 함수가 아니어야 한다. 즉 `return` 하는 값은 조건부여서는 안된다. 그렇기 때문에 위의 이 `useFriendStatus` Hook은 온라인 상태의 여부를 boolean 타입으로 반환하고 있다.
