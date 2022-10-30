COMPOSE_FILES = -f docker-compose.yml 

dev:
	docker-compose $(COMPOSE_FILES) --env-file .env up --remove-orphans --build --force-recreate -V -d;

up:
	docker-compose $(COMPOSE_FILES) --env-file .env up --remove-orphans --force-recreate -V -d;

down:
	docker-compose $(COMPOSE_FILES) --env-file .env down --remove-orphans ;

destroy:
	docker-compose $(COMPOSE_FILES) --env-file .env down --remove-orphans -v;
