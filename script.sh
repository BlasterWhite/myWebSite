git checkout main;

git pull;

docker container stop my-web-site;

docker container rm my-web-site;

docker image rm my-web-site;

docker build -t my-web-site .;

docker run -d --name my-web-site -p 8080:8080 my-web-site;

echo "Done";