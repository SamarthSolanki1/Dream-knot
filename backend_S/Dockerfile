# === Stage 1: Build ===
FROM maven:3.8-openjdk-17-slim AS build

WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# === Stage 2: Run ===
FROM openjdk:17-jdk-slim

WORKDIR /app
COPY --from=build /app/target/backend_S-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]