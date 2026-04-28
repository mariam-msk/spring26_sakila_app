# ============================================================
# Dockerfile — Optimized Sakila Flask Application
# Maintainer: Mariam
# Version: 1.0.0
# ============================================================

FROM python:3.9-slim

# Labels for metadata
LABEL maintainer="mariamsaghir666@gmail.com" \
      version="1.0.0" \
      description="Sakila Flask Application"

# Set working directory
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*


COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy application code AFTER dependencies (cache-friendly order)
COPY . .

# Create non-root user for security
RUN useradd -m -r appuser && chown -R appuser:appuser /app
USER appuser

# Only expose the port this app actually uses
EXPOSE 5000

# Health check so Docker knows when the app is truly ready
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/ || exit 1

# Run the application
CMD ["python", "app.py"]