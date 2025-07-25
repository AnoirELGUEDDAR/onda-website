# Stage 1: Build the JAR
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Install netcat for wait script
RUN apt-get update && apt-get install -y netcat-openbsd && apt-get clean

COPY --from=build /app/target/*.jar app.jar
COPY waitforit.sh .
RUN chmod +x waitforit.sh

EXPOSE 8080

# Run the built JAR after waiting for DB
ENTRYPOINT ["./waitforit.sh", "db", "--", "java", "-jar", "app.jar"]

