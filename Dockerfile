FROM node

WORKDIR /home/app

USER node

ENV PORT 3000

EXPOSE $PORT

RUN apt-get install -y zsh
RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true

ENTRYPOINT [ "/bin/zsh" ]
