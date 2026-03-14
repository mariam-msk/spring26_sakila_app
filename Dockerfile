# Use an official Python runtime as a base image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt .

# Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application into the container
COPY . .

# Expose the port Flask will run on
EXPOSE 5000


# Run the Flask application
CMD ["python", "app.py"]
