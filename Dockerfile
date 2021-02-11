FROM python:3.9-slim-buster

# install nginx and redis
RUN apt-get update -y && \
    apt-get install --no-install-recommends -y nginx && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

# install needed python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# replace default nginx conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /app
COPY . /app

VOLUME ["/config"]
EXPOSE 8080
HEALTHCHECK CMD curl --fail http://localhost:8080 || exit 1

CMD service nginx restart && gunicorn --workers 3 -b unix:/tmp/gunicorn.sock 'app:create_app()'