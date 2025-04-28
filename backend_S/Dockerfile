# Use a Maven image with OpenJDK 17 that already has Maven installed
FROM maven:3.8-openjdk-17-slim

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