# ---- Build stage ----
FROM maven:3.8-openjdk-17-slim AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# ---- Run stage ----
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the jar from the previous stage (use wildcard to avoid name mismatch)
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
