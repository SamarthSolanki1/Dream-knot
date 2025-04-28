# Use an official OpenJDK 17 runtime as a base image
FROM openjdk:17-jdk-slim

# Install Maven
RUN apt-get update && apt-get install -y maven

# Set working directory inside container
WORKDIR /app

# Copy entire project (pom.xml + src/ + any configs)
COPY . .

# Build the project
RUN mvn clean package -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the JAR
CMD ["java", "-jar", "target/backend_S-0.0.1-SNAPSHOT.jar"]
