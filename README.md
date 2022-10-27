# persistent-storage-nodejs-minikube-service
Persistent Storage with NodeJS. Minikube service.
## Propedeutic:
-   a git client
-   a locally running minikube
-   a configured kubectl
-   Clone this repo:\
`git clone https://github.com/mvergaz/persistent-storage-nodejs-minikube-service`\
`cd persistent-storage-nodejs-minikube-service`
## Repo contents:
-   Dockerfile
-   myservice-deployment.yaml
-   myservice-pv.yaml
-   storage-class.yaml
-   src/index.js
## Anamnesis
-   Retrieve cluster public ip:\
`minikube ip -n minikube`
> For instance: `192.168.49.2`
-   Create data file in target mount folder (`/mnt/myservice-data` for instance)\
`sshpass -p root ssh root@192.168.49.2`\
root@minikube: `mkdir /mnt/myservice-data`\
root@minikube: `echo "Hello world!" > /mnt/myservice-data/readme.txt`\
root@minikube: `exit`
-   Checking if the **Standard** storage class is already present:\
`kubectl get storageclass`
#### **If not**:
-   `kubectl apply -f storage-class.yaml`
##  Steps:
-   Install myservice PersistentVolume and Persistent Volume Claims:\
`kubectl apply -f myservice-pv.yaml`\
`kubectl get pv`\
`kubectl get pvc`
-   Install the image:\
`minikube image build . -t local/myservice-image:node16`\
`minikube image ls`
-   Deploy and check the service:\
`kubectl apply -f myservice-deployment.yaml`\
`kubectl get deployments`\
`kubectl get services`
-   Expose the service out of the cluster\
`minikube service myservice`
## Roll all back
-   Delete service\
`kubectl delete -n default service myservice`
-   Delete deployment\
`kubectl delete -n default deployment myservice-app`
-   Delete service storage and claims:\
`kubectl delete pvc myservice-pv-volume-claim`\
`kubectl delete pv myservice-pv-volume`