본 프로젝트는 Node.js 기반의 웹 프로파일러 프로그램으로, 사용자가 업로드한 성능 데이터 파일(inputFile.txt)을 분석하여 각 Core와 Task의 실행 시간에 대한 통계 정보를 제공하고, 이를 시각적으로 그래프로 표현하는 시스템이다.
웹 환경에서 사용자는 텍스트 파일을 업로드함으로써 별도의 설치 없이 간편하게 데이터 분석을 수행할 수 있으며, 분석 결과는 Core 및 Task 단위로 평균값(AVG), 최솟값(MIN), 최댓값(MAX)을 구하여 시각화된다.
시각화는 Chart.js를 활용한 막대그래프로 제공되며, 사용자는 각 지표를 직관적으로 확인할 수 있다. 이를 통해 다중 Core/Task 시스템의 성능 비교, 병목 분석 등에 활용할 수 있는 웹 기반 프로파일링 도구로 설계되었다.
해당 프로그램은 Express.js 웹 프레임워크, EJS 템플릿 엔진, multer 파일 업로드 처리기를 기반으로 구성되었으며, GitHub를 통해 코드가 관리된다.
