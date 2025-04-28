# Use an official OpenJDK 17 runtime as a base image
FROM openjdk:17-jdk-slim

# Install Maven
RUN apt-get update && apt-get install -y maven

# Set working directory inside container
WORKDIR /app

# Copy the pom.xml file
COPY pom.xml ./

# Copy the src directory
COPY src ./

# Build the project
RUN mvn clean package -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the JAR file
CMD ["java", "-jar", "target/backend_S-0.0.1-SNAPSHOT.jar"]