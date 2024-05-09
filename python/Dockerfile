# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /usr/app

# Install MySQL connector
RUN pip install mysql-connector-python

# Copy the Python script into the container
COPY script.py /usr/app

#make directory for export
RUN mkdir /usr/app/export

#mkdir for import
RUN mkdir /usr/app/import

# make the container keep running
CMD tail -f /dev/null