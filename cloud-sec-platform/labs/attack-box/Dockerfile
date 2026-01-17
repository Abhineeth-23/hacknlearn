FROM debian:latest

RUN apt-get update && apt-get install -y \
    curl \
    wget \
    nmap \
    nikto \
    && rm -rf /var/lib/apt/lists/*

# Install ttyd
RUN wget https://github.com/tsl0922/ttyd/releases/download/1.7.3/ttyd.x86_64 -O /usr/local/bin/ttyd && \
    chmod +x /usr/local/bin/ttyd

EXPOSE 7681

CMD ["ttyd", "-p", "7681", "bash"]