# Use an official OpenJDK 17 runtime as a base image
FROM openjdk:17-jdk-slim

# Set working directory inside container
WORKDIR /app

# Copy the Maven project file and your source code
COPY pom.xml .
COPY src ./src

# Copy the Maven wrapper files if you have them
COPY mvnw .
COPY .mvn .mvn

# Build the project
RUN mvn clean package -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the JAR file
CMD ["java", "-jar", "target/backend_S-0.0.1-SNAPSHOT.jar"]
