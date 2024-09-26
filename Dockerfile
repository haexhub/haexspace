FROM rust:bookworm AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"


RUN apt-get update && apt-get install -y \
  build-essential \
  curl \
  file \
  golang-gir-gio-2.0-dev \
  golang-gir-gobject-2.0-dev \
  libayatana-appindicator3-dev \
  libglib2.0-cil-dev \
  librsvg2-dev \
  libsoup-3.0-dev \
  libssl-dev \
  libwebkit2gtk-4.1-dev  \
  libxdo-dev

RUN curl -sL deb.nodesource.com/setup_20.x | bash -

RUN apt-get install nodejs  
RUN cargo install tauri-cli@=2.0.0-rc.16
#RUN cargo install tauri-cli
# add the target for the specific architecture
RUN rustup target add x86_64-unknown-linux-gnu 

COPY . /app

WORKDIR /app
RUN corepack enable pnpm
RUN pnpm i
RUN pwd
CMD ["pnpm", "tauri", "build"]







