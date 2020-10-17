# Single Page Application - Markdown Blog Project

[![Netlify Status](https://api.netlify.com/api/v1/badges/b36ac5cb-7c67-4a65-a0d4-5459ad5b57f2/deploy-status)](https://app.netlify.com/sites/elated-mclean-6cb1bd/deploys)

### Created At : 2020-09-27 Sun 23:21

<br>
<br>

## Issues

1. Github 는 html파일이 존재하지 않는 url에 접근하면 404error를 내뱉는다. 
404error를 내뱉는 404.html은 custom 404.html으로 대체할 수 있다.

   - 해결방안1: custom 404.html 을 index.html과 동일하게 구성한다
     - 문제점: response의 status code는 404인 채로 남는다.
   - 해결방안2: custom 404.html 에 접근 즉시 적합한 url으로 redirect 한다
     - 구현:
       1. location.pathname 에서 REDIRECT_URL을 regex로 추출
       2. / + ?redirect_url=${유저가 입력한 url} 으로 redirect
       3. index.js 에서 params parsing 한 후, redirect_url 이 있으면 history.replaceState(null, null, params["redirect_url"] ) => router()
    
     - 문제점: <u>**It's ok until now.**</u>

   

1. Mobile 대응 미흡
   - Mobile에서는 BASE_URL을 이용한 github에서의 routing이 적용되지 않는다. 원인 파악 필요함
   - Mobile에서 Home 화면의 Layout이 꺠지고 있다. 원인 파악 필요

1. Front-End와 Back-End의 분리
   - Back-End는 RESTful API Server로 분리
   - API 형식을 일관성있게 정리

2. Home 화면과 New 화면의 미묘한 layout 차이
   - 스크롤 여부에 따른 것으로 어떻게 처리할지 고민
   - Home화면에 description은 빼야하나? 어디까지 보여줘야 할지

3. [x] Edit화면 및 Delete 기능 만들기 

4. [x] md to html 기능 추가 -> showdown cdn으로 front-end에서 보여질때만 변환(db에는 markdown 그대로 저장)

5. Home 화면에 1 2 3 4 5 다음 목차 버튼 넣기

6. new화면의 submitHandler와 edit화면의 submitHandler 2개가 모두 document에 eventListener로 add 되어 있다. 이를 어떻게 핸들링 할 것인지? 
   - index.js 에서 path, view 외에 handler도 불러들일까? 
   - handler는 하나로 하되, event delegation 을 통해서 form을 찾아 적절한 액션을 취하고 있음. -> 적절한 action을 불러들일까?

   -> Edit의 form className 이 new-form 으로 되어 있어서 발생함. edit-form으로 바꾸고, css 정리 필요

7. New 화면에 Draft 기능 추가

8. New 화면에서 markdown live preview 기능 추가

9. footer 추가

10. About 화면 추가

11. Anchor Tag # 기능 대응

12. New 화면에서 textarea의 value 값이 커지면 textarea의 rows도 자연스럽게 길어지게끔 수정
   - textarea.scrollHeight 만큼 css 의 height 값이 변화하도록 수정

13. Readme 를 화면 별로 Issue 나타내게끔 수정
14. 