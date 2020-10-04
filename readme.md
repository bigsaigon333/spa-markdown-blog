# Single Page Application - Markdown Blog Project

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

1. Home 화면과 New 화면의 미묘한 layout 차이
   - 스크롤 여부에 따른 것으로 어떻게 처리할지 고민

1. Edit화면 및 Delete 기능 만들기

1. md to html 기능 추가

1. Home 화면에 1 2 3 4 5 다음 목차 버튼 넣기

1. 
