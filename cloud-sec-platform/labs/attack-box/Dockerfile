# Base image: Lightweight Debian
FROM debian:bullseye-slim

# 1. Install Tools
RUN apt-get update && apt-get install -y \
    curl wget git nmap nikto sqlmap iputils-ping \
    && rm -rf /var/lib/apt/lists/*

# 2. Install ttyd (Web Terminal)
RUN curl -L https://github.com/tsl0922/ttyd/releases/download/1.7.3/ttyd.x86_64 -o /usr/bin/ttyd \
    && chmod +x /usr/bin/ttyd

# 3. Create user
RUN useradd -m -s /bin/bash hacker
USER hacker
WORKDIR /home/hacker

# 4. Start ttyd on port 7681
EXPOSE 7681
CMD ["ttyd", "-W", "-p", "7681", "bash"]