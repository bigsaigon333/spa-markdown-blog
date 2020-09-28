# Single Page Application - Markdown Blog Project

## Created At : 2020-09-27 Sun 23:21 


1. Github 는 html파일이 존재하지 않는 url에 접근하면 404error를 내뱉는다. 404error를 내뱉는 404.html은 custom 404.html으로 대체할 수 있다.
    - 해결방안1: custom 404.html 을 index.html과 동일하게 구성한다
       * 문제점: response의 status code는 404인 채로 남는다.
    - 해결방안2: custom 404.html 에 접근 즉시 적합한 url으로 redirect 한다(location.pathname = 적합한 url)
       * 문제점: 