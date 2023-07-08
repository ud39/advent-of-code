# Base image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /code/backend

# Copy requirements.txt
COPY requirements.txt .

# Install build tools and PostgreSQL client library dependencies
RUN apt-get update \
    && apt-get install -y build-essential libpq-dev \
    && rm -rf /var/lib/apt/list

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the necessary port
EXPOSE 8000

# Start the backend server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
