# Stage 1: Build the JAR
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Cache Maven dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Build with cache
COPY src ./src
RUN mvn clean package -DskipTests -T 4

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Install netcat for wait script
RUN apk add --no-cache netcat-openbsd

# Copy built JAR and wait script
COPY --from=build /app/target/*.jar app.jar
COPY waitforit.sh .
RUN chmod +x waitforit.sh

EXPOSE 8080

# Use exec form for better signal handling
ENTRYPOINT ["./waitforit.sh", "db", "--", "java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
