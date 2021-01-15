VERSION := $(shell cat VERSION)
TARGET_ARCHS=linux/arm64,linux/amd64

build: build-frontend

publish:
	docker push antoinejaussoin/game-of-life:${VERSION}
	docker push antoinejaussoin/game-of-life:latest

build-frontend:
	docker build -f ./Dockerfile \
	-t antoinejaussoin/game-of-life:${VERSION} \
	-t antoinejaussoin/game-of-life:latest \
	.

buildx-frontend:
	docker buildx build --pull --platform ${TARGET_ARCHS} \
	-f ./Dockerfile \
	-t antoinejaussoin/game-of-life:${VERSION} \
	-t antoinejaussoin/game-of-life:latest \
	--push .

install:
	docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
	docker buildx create --name xbuilder --use
	docker buildx inspect --bootstrap