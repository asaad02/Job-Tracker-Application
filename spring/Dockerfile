# Start with a Java 17 base image for building the application
FROM eclipse-temurin:17-jdk-alpine as build

WORKDIR /workspace/app

# Copy necessary files for building the Java project
COPY gradlew .
COPY gradle/wrapper/gradle-wrapper.properties ./gradle/wrapper/gradle-wrapper.properties
COPY gradle/wrapper/gradle-wrapper.jar ./gradle/wrapper/gradle-wrapper.jar

COPY build.gradle .
COPY src src

# Ensure the Gradle Wrapper script is executable
RUN chmod +x ./gradlew

# Install MySQL client (optional)
RUN apk update && apk add mysql-client

# Install mysql-client in the container
USER root

# Use Gradle to build the application
RUN ./gradlew build --stacktrace

# Start a new stage for the actual application container
#FROM eclipse-temurin:17-jre-alpine
#WORKDIR /app
#COPY --from=build /workspace/app/build/libs/*.jar /app/

# Command to run the application
#ENTRYPOINT ["java","-jar","/app/job-application-tracker-app-1.0.jar"]

## need to add a command to run the app here
ENTRYPOINT ["java","-jar","build/libs/job-application-tracker-app-1.0.jar"]

