FROM docker:27.5.1-cli AS dockercli

FROM jenkins/jenkins:lts-jdk21

USER root

COPY --from=dockercli /usr/local/bin/docker /usr/local/bin/docker

COPY --from=dockercli \
  /usr/local/libexec/docker/cli-plugins/docker-compose \
  /usr/local/libexec/docker/cli-plugins/docker-compose

RUN chmod +x /usr/local/bin/docker \
    /usr/local/libexec/docker/cli-plugins/docker-compose

USER jenkins
