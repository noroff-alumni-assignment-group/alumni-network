FROM maven:3.9.0-eclipse-temurin-19 as build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:19 AS run
WORKDIR /app
ARG JAR_FILE=/app/target/*.jar
COPY --from=build ${JAR_FILE} /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]