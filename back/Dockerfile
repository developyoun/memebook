# image 설정
FROM openjdk:17-jdk-slim

# gradle 빌드 명령어
RUN ./gradlew clean build -x test

# 컨테이너 디렉토리 볼륨 지정
VOLUME /tmp

# 환경 변수 지정
ENV USE_PROFILE local

# 변수 지정
ARG JAR_FILE=build/libs/*.jar

# 변수로 지정된 파일을 컨테이너로 복사
COPY ${JAR_FILE} app.jar

# 컨테이너가 사용할 포트 설정
EXPOSE 8080

# 컨테이너 실행 명령어
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=${USE_PROFILE}", "/app.jar"]

