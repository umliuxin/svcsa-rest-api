<!-- svcsa-restful-api -->
### Rebuild the docker image
```
docker build --tag svcsa-restful-api .
```
### Retag the docker image name
```
docker tag svcsa-restful-api svcbavideoacr.azurecr.io/svcsa-restful-api:latest
```
### Push to Azure image server
```
docker push svcbavideoacr.azurecr.io/svcsa-restful-api:latest
```
### Remove the running container
```
az container delete -n svcsa-restful-api-container -g svcsa-deploy-aci
```

### Create new container
```
az container create  --resource-group svcsa-deploy-aci --name 
svcsa-restful-api-container \
    --image svcbavideoacr.azurecr.io/svcsa-restful-api:latest --dns-name-label svcsa-restful-api --ports 3030
```