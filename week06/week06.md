- Debounce & Throttling 🍠

  - Debounce는 무엇일까요?
    시간이 많이 걸리는 작업이 너무 자주 실행되어 웹 페이지의 성능이 저하되지 않도록 하는 데 사용되는 프로그래밍 방식. 즉, **함수가 호출되는 속도를 제한**
    연속적으로 발생한 이벤트를 하나로 처리하는 방식
    주로 **처음**이나 **마지막**으로 실행된 함수만을 실행
    JavaScript의 디바운싱은 브라우저 성능을 향상시키는 데 사용되는 방식
  - Debounce는 주로 어디에 사용하나요?
    키워드 검색 혹은 자동완성 기능에서 api 함수 호출 횟수를 최대한 줄이고 싶을때
    사용자가 창크기 조정을 멈출때까지 기다렸다가 resizing Event 를 반영하고 싶을때
  - Throttling은 무엇일까요?
    오버클럭(Overclock)이 디바이스에 무리를 주는 것을 방지하기 위해 고의로 성능을 낮추는 조절 방식
    발생되는 이벤트 중간에 Delay 를 포함시킴. 즉, **Delay 이내로 연속적으로 발생된 이벤트에 대해서는 무시**
  - Throttling은 주로 어디에 사용하나요?
    디바운스와 동일하게 검색, 스크롤 등에서 사용함
  - Debounce와 Throttling의 차이점은 무엇일까요?
    쓰로틀링이 **필터링(Filtering)**의 방법을 사용한다면, 디바운싱은 **그루핑(Grouping)**의 방법을 사용
    텍스트 입력을 예시로 든다면, `keyboard` 가 한자씩 입력될 때마다, api 로 데이터를 가져오게 되면, **사용자의 의도와 무관한 요청** 이 자주 발생하기 때문에 방지할 필요가 있음
    _Throttle 는 입력 주기를 방해하지 않고, 일정 시간 동안의 입력을 모와서, 한번씩 출력을 제한_
    _Debounce 는 입력 주기가 끝나면, 출력_
  - 어떤 기능을 구현할 때 Debounce를 적용하고, Throttling을 적용하는 것이 좋을까요?
    **Debounce**는 사용자 입력에 즉각 반응하는 상황에 적합하고, **Throttling**은 빈번한 이벤트에 대해 적절히 제어할 때 유용
    **Debounce**
    - **검색창 자동완성**: 사용자가 키보드로 입력할 때마다 API 호출이 되면 부담이 크기 때문에, 사용자가 입력을 멈춘 후 일정 시간이 지나야 API 요청이 발생하도록 함.
    - **윈도우 크기 조정**: 사용자가 윈도우 크기를 변경할 때마다 이벤트가 여러 번 발생하므로, 크기 변경이 끝난 후에 한 번만 실행되도록 설정.
    **Throttling**
    - **무한 스크롤**: 스크롤 이벤트가 너무 많이 발생하는 것을 방지하고, 일정 시간마다 필요한 데이터를 불러오는 데 사용.
    - **버튼 클릭 방지**: 사용자 인터페이스의 특정 버튼을 너무 빨리 여러 번 클릭하는 것을 방지하기 위해 사용. 일정 시간마다 한 번만 클릭이 가능하게 설정할 수 있음.

- 쿠키 🍠

  - 쿠키란 무엇이고, 어떤 특징을 가지고 있을까요?
    웹 사이트가 사용자 정보를 ‘저장’하기 위해서, 사용자의 PC나 스마트폰, 태블릿과 같은 디바이스에 저장하는 파일을 의미
    **퍼스트파티(First-Party) 쿠키와 서드파티(Third-Party) 쿠키**, 두 가지로 구분
    - **퍼스트파티(First-Party) 쿠키**
      현재 방문하는 도메인에 설정된 쿠키
    - **서드파티(Third-Party) 쿠키**
      방문한 도메인 외, 외부 업체가 삼는 쿠키. 사용자 행동을 추적할 수 있음
  - 쿠키를 어떻게 사용할 수 있을까요?
    로그인 기능을 구현하기 위해 받는 토큰을 잠시 저장해두고, 일정 시간이 지나면 다시 백엔드로 요청하는 식으로 활용 가능
    `react-cookie` 패키지 사용

- 토큰 🍠

  - 토큰이 왜 필요할까요?
    **HTTP의 특성**때문. HTTP는 **대표적인 비연결 지향 프로토콜**이라 한 번의 요청-응답 사이클이 완료되면 연결을 종료하기 때문에, 동일한 클라이언트가 요청을 아무리 많이 하더라도 프로토콜은 모두 **처음보는 것 마냥** 인지함. (이를 **stateless** 하다고 표현)
    **stateful**해지기 위해서, 즉, 상태를 유지하기 위해 **세션**이나 **쿠키**를 사용하기도 함. 이는 대표적인 **서버 기반 인증** 시스템으로, 인증에 필요한 특정 유저 정보를 **서버 혹은 데이터베이스에 저장**할 수밖에 없음. 따라서, 서버나 데이터베이스의 부담이 증가함. 또한, **CORS (Cross-Origin Resource Sharing)**의 문제도 존재. 웹 어플리케이션에서 세션을 관리 할 때 자주 사용되는 쿠키는 단일 도메인 및 서브 도메인에서만 작동하도록 설계되어있어 쿠키를 여러 도메인에서 관리하는것은 좀 번거로움.
    **토큰 기반 인증** 시스템은 **stateless** 함. 즉 상태유지를 하지 않음. 이 시스템에서는 더 이상 유저의 인증 정보를 서버나 세션에 담아두지 않기 때문에 서버의 부담이 감소할뿐만 아니라 보안성도 높고, 여러 플랫폼 및 도메인에서 적용가능하다는 장점이 있음.
  - CORS 에러가 무엇이고, 이 에러를 어떻게 해결할 수 있을까요?
    CORS는 **`Cross-Origin Resource Sharing`**의 줄임말로 **교차-출처 리소스 공유** 라고 함. 즉, 다른 출처라고도 말할 수 있고 다른 출처이기 때문에 발생하는 에러라고도 할 수 있음. 한 도메인이 도메인 간의 요청을 가진 다른 도메인의 리소스에 액세스할 수 있게 해주는 보안 메커니즘으로 최신 브라우저에서 구현된 **동일 출처 정책** 때문에 등장하게 됨.
    (동일 출처 정책 : **동일한 출처의 리소스에만 접근하도록 제한하는 정책**. 출처라는것은 프로토콜, 호스트명, 포트가 같다는 것을 의미)
    1. 다른 사람이 만든 프록시 서버 이용하기

       요청해야 하는 URL 앞에 **프록시 서버 URL** 을 붙여 요청하게 되면 해결

    2. 클라이언트 : http-proxy-middleware 사용하기

       **`http-proxy-middleware`**를 설치한 후에 **setupProxy.js**라는 파일을 src 폴더 내에 만들고 다음의 코드를 작성

       ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/88eb41ff-81f0-4dad-914c-d7c78fcc60f7/image.png)
  - JWT 토큰 기반 인증 방법이란 무엇일까요?
    JWT(Json Web Token)의 약자로 Json 객체에 인증에 필요한 정보들을 담은 후 비밀키로 서명한 토큰으로, 인터넷 표준 인증 방식
    `Header`, `Payload`, `Signature` 3개로 구성.
  - JWT 기반 로그인 동작 과정에 대해 알아보세요.
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f1912130-0409-4e90-a90f-6091ae253e73/2899e850-c671-44cd-9e39-6ee46be07264/image.png)
    1. 사용자가 아이디와 비밀번호 혹은 소셜 로그인을 이용하여 서버에 `로그인 요청`을 보낸다.
    2. 서버는 `비밀키`를 사용해 json 객체를 암호화한 `JWT 토큰을 발급`한다.
    3. JWT를 `헤더`에 담아 클라이언트에 보낸다.
    여기까지가 JWT를 발급받기까지의 (로그인 전)과정이다. 로그인 이후에는 다음과 같은 과정이 이루어진다.
    1. 클라이언트는 JWT를 `로컬에 저장`해놓는다.
    2. `API 호출`을 할 때마다 `header에 JWT를 실어 보낸다`.
    3. 서버는 `헤더를 매번 확인`하여 `사용자가 신뢰할만한지 체크`하고, 인증이 되면 API에 대한 응답을 보낸다.
  - AccessToken / RefreshToken의 차이에 대해 설명해주세요.
    토큰의 탈취 방지를 위하여 토큰에 유효시간을 부여함. 유효시간이 너무 짧으면 사용자 경험에 좋지 않고 유효시간이 너무 길면 보안상 탈취 위험이 있음. 따라서 AccessToken / RefreshToken 을 둠.
    `Access Token`의 **유효기간은** **짧음**. (ex. 60일([마이크로소프트](https://learn.microsoft.com/en-us/linkedin/shared/authentication/programmatic-refresh-tokens)), 1시간([아마존](https://developer.amazon.com/docs/login-with-amazon/access-token.html)))
    `Refresh Token`의 **유효기간은** 긺. (ex. 1년 ([마이크로소프트](https://learn.microsoft.com/en-us/linkedin/shared/authentication/programmatic-refresh-tokens)))
    평소에 API 통신할 때는 Access Token을 사용하고, Refresh Token은 Access Token이 만료되어 갱신될 때만 사용함
    <구체적인 과정>
    1. 로그인 인증에 성공한 클라이언트는 `Refresh Token`과 `Access Token` 두 개를 **서버로부터 받는다**.
    2. 클라이언트는 `Refresh Token`과 `Access Token`을 **로컬**에 저장해놓는다.
    3. 클라이언트는 **헤더**에 Access Token을 넣고 API 통신을 한다. **(Authorization)**
    4. 일정 기간이 지나 `Access Token`의 **유효기간이 만료**되었다.4.1. Access Token은 이제 유효하지 않으므로 **권한이 없는 사용자**가 된다.4.2. 클라이언트로부터 유효기간이 지난 Access Token을 받은 서버는 [401 (Unauthorized)](https://www.rfc-editor.org/rfc/rfc6750#section-6.2.2) 에러 코드로 응답한다.4.3. `401`를 통해 클라이언트는 `invalid_token` (유효기간이 만료되었음)을 알 수 있다.
    5. **헤더**에 Access Token 대신 `Refresh Token`을 넣어 **API를 재요청**한다.
    6. Refresh Token으로 사용자의 권한을 확인한 서버는 **응답쿼리 헤더**에 **새로운 Access Token**을 넣어 응답한다.
    7. 만약 `Refresh Token`도 **만료**되었다면 서버는 동일하게 **401 error code**를 보내고, 클라이언트는 **재로그인**해야한다.

- 웹 스토리지 🍠

  - 웹 스토리지의 메소드와 프로퍼티는 어떤게 있을까요?
    웹 스토리지 : 쿠키와 비슷하게 해당 도메인에 관련된 특정 데이터를 클라이언트에 저장하는 것. localStorage와 sessionStorage 로 구성됨
    <메소드, 프로퍼티>
    | **메소드**              | **설명**                             |
    | ----------------------- | ------------------------------------ |
    | **setItem(key, value)** | 키-값 쌍을 보관                      |
    | **getItem(key)**        | 키에 해당하는 값을 받아옴            |
    | **removeItem(key)**     | 키와 해당 값을 삭제                  |
    | **clear()**             | 모든 것을 삭제                       |
    | **key(index)**          | 인덱스(index)에 해당하는 키를 받아옴 |
    | **length**              | 저장된 항목의 개수를 가져옴          |
  - 세션 스토리지에 대해 정리해 주세요!
    `window.sessionStorage` 객체로 **탭/윈도우를 닫기 전까지 유지**되는 데이터를 의미.
    - 세션 쿠키와 달리, 탭/윈도우 단위로 세션 스토리지가 생성
    - window 객체와 동일한 유효 범위 및 생존 기간을 가짐
    - 탭/윈도우를 닫을 시 데이터가 삭제됨
    - 같은 도메인이더라도 세션이 다르면 데이터에 접근할 수 없음
    - 독립적으로 작동 (다른 세션 스토리지와 서로 영향을 주지 않음)
    - 잠시 동안 필요한 정보를 저장(ex. 입력 폼 저장, 일회성 로그인)
  - 로컬 스토리지에 대해 정리해 주세요!
    window.loacalStorage객체로 **브라우저를 종료해도 유지**되는 데이터를 의미.
    - 명시적으로 지우지 않는 한 영구적으로 저장됨
    - 도메인별로 생성되어, 서로 다른 브라우저 탭이라도 동일한 도메인이라면 동일한 로컬 스토리지를 사용
    - 지속적으로 필요한 정보를 저장할때 사용 (ex. 자동 로그인)
  - 로컬 스토리지에서 JWT 토큰을 저장하고, 사용하고, 삭제하는 메소드에 대해 찾아보세요!
    - 저장
      ```jsx
      localStorage.setItem("jwtToken", response.token);
      ```
    - 사용
      ```jsx
      const token = localStorage.getItem("jwtToken");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      ```
    - 삭제
      ```jsx
      localStorage.removeItem("jwtToken");
      ```
  - 스토리지가 변경되었을 때 처리하는 방법을 조사해 주세요.
    변경되었을 때 storge 라는 이벤트가 발생하는데, 이 이벤트에 대한 핸들러를 설정한다
  - Bearer Token이 무엇인지 찾아보고, 이를 통해 백엔드 서버와 어떠한 방식으로 통신하는지 조사해 보세요!
    Bearer 인증 방식이란 [OAuth 2.0](https://oauth.net/2/) 프레임워크에서 사용하는 토큰 인증 방식.
    1. **사용자 인증**:

       사용자가 로그인을 시도하고, 자격 증명(아이디/비밀번호)을 서버에 전달.

       서버는 자격 증명을 검증한 후, 사용자에게 JWT를 생성하여 응답으로 반환.

    2. **토큰 저장**:

       클라이언트는 서버에서 받은 토큰을 **로컬 스토리지**나 **세션 스토리지**에 저장.

    3. **API 요청 시 토큰 포함**:

       클라이언트는 서버에 인증이 필요한 요청을 보낼 때, **Authorization 헤더**에 Bearer Token을 포함하여 요청

       서버는 요청을 수신한 후, Authorization 헤더에서 Bearer Token을 추출

    4. **서버에서 토큰 검증**:

       서버는 토큰의 유효성을 확인하기 위해, 주로 **서명(signature)**을 검증.

       토큰이 유효하고 만료되지 않았다면, 요청을 승인하고 리소스 접근을 허용.

       토큰이 유효하지 않거나 만료된 경우, 401 Unauthorized 응답을 반환하고, 클라이언트가 다시 인증을 시도하도록 함.

- Context-API 🍠
  - 전역 상태 관리는 왜 해야할까요?
    전역상태란 프로젝트 전체에 영향을 미치는 상태. props drilling 방식을 활용해서 부모에서 자식으로 데이터를 전달함.
    서로 다른 두 컴포넌트에 같은 데이터가 필요한 경우 각 컴포넌트가 부모 자식 관계로 되어 있지 않은 이상, 각 컴포넌트 간의 직접적인 데이터 전달이 어려움. 데이터를 부모 컴포넌트로 보내고 다시 그 데이터가 필요한 컴포넌트로 전달해야 하는데, 이러한 props drilling이 많아지면 props를 추적하기 어려워짐. 따라서 각 어플리케이션에 알맞은 상태관리 툴을 선택해 상태를 잘 관리하는 것이 중요.
  - Context API란 무엇일까요?
    Context API는 React 컴포넌트 트리 안에서 전역 상태를 공유할 수 있도록 만들어진 방법임. Context API는 종속성을 주입하기 위한 도구이기 때문에 전역 상태관리 툴이라기엔 다소 애매한 면이 있음. Context API는 이미 존재하는 상태를 다른 컴포넌트들과 쉽게 공유할 수 있게 해주는 역할을 함.
    <구성>
    - Context
      전역 상태를 저장하는 곳.
      Context 내부에 Provider와 Consumer가 정의되어 있고, Consumer는 Context를 통해 상태에 접근이 가능.
    - Provider
      전역 상태를 제공하는 역할.
      Context에 상태를 제공해서 다른 컴포넌트가 상태에 접근할 수 있도록 도와줌.
      제공된 상태에 접근하기 위해서는 Provider 하위에 컴포넌트가 포함되어 있어야 함.
      따라서 모든 컴포넌트에 접근 가능하도록 Root component (index.js / app.js) 에서 Provider를 정의.
    - Consumer
      제공받은 전역 상태를 받아서 사용하는 역할.
      Context는 Consumer 사이에 있는 첫 객체를 Context에 인자로 전달하기 때문에 빈 객체 작성 후 JSX를 작성해야 함.
    <Context API 사용법>
    ```jsx
    import { createContext } from "react";

    const MyContext = createContext();
    ```
    `createContext` 함수를 불러와서 Context를 만든다.
    기본 값을 설정하고 싶은 경우 createContext 함수 안에 인자로 기본 값을 넣어주면 된다.
    ```jsx
    function App() {
      return (
        <MyContext.Provider value="Hello World">
          <GrandParend />
        </MyContext.Provider>
      );
    }
    ```
    Context 객체 안에 Provider라는 컴포넌트가 있다.
    컴포넌트 간에 공유하고자 하는 값을 value라는 props로 설정하면 자식 컴포넌트들에서 해당 값에 접근할 수 있다.
    ```jsx
    import { useContext } from "react";

    function Message() {
      const value = useContext(MyContext);
      return <div>Received: {value}</div>;
    }
    ```
    useContext를 사용하여 Context에 넣은 값에 바로 접근할 수 있다.
