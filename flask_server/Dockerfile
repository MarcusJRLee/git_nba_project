# Use Python image.
FROM python:3.11-slim-buster

# Set the working directory.
WORKDIR /app

# Expose the port your Flask app uses.
EXPOSE 4000

# Copy the rest of the application files.
COPY . .

# Install the requirements.
RUN pip install -r requirements.txt

# Run the Flask app
CMD ["python", "app.py"]
