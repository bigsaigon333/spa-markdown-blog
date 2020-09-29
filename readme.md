# Single Page Application - Markdown Blog Project

### Created At : 2020-09-27 Sun 23:21

<br>
<br>

## Issues

1. Github 는 html파일이 존재하지 않는 url에 접근하면 404error를 내뱉는다. 404error를 내뱉는 404.html은 custom 404.html으로 대체할 수 있다.

   - 해결방안1: custom 404.html 을 index.html과 동일하게 구성한다
     - 문제점: response의 status code는 404인 채로 남는다.
   - 해결방안2: custom 404.html 에 접근 즉시 적합한 url으로 redirect 한다
     - 구현: location.replace(BASE_URL + "/")
     - 문제점: <u>**It's ok until now.**</u>
     - Next Step: home화면으로 redirct후 parsing한 적합한 url을 router()를 이용하여 render필요함

2. Mobile 대응 미흡
   - Mobile에서는 BASE_URL을 이용한 github에서의 routing이 적용되지 않는다. 원인 파악 필요함
   - Mobile에서 Home 화면의 Layout이 꺠지고 있다. 원인 파악 필요
