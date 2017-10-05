# Provision the Kubernetes Infrastructure

Kubernetes will be used to host the Couchbase including the following components:

* [Couchbase](https://hub.docker.com/_/couchbase/) 4.5.1 Community Edition

## Provision a Kubernetes Cluster

A Kubernetes 1.7.5+ cluster is required to host the Couchbase components. Use the `gcloud` command to provision a three node Kubernetes cluster:

```
gcloud container clusters create couchbase \
  --machine-type n1-standard-2 \
  --num-nodes 3
```

It can take several minutes to provision the `couchbase` Kubernetes cluster. Either wait for the above command to complete or use the `gcloud` command to monitor progress in a separate terminal:

```
gcloud container clusters list
```
```
NAME   ZONE        MASTER_VERSION  MASTER_IP  MACHINE_TYPE   NODE_VERSION  NUM_NODES  STATUS
couchbase  us-west1-c  1.7.5                      n1-standard-2  1.7.5         3          PROVISIONING
```

> Estimated time to completion: 5 minutes.

```
gcloud container clusters list
```
```
NAME   ZONE        MASTER_VERSION  MASTER_IP      MACHINE_TYPE   NODE_VERSION  NUM_NODES  STATUS
couchbase  us-west1-c  1.7.5           XX.XXX.XX.XXX  n1-standard-2  1.7.5         3          RUNNING
```

### Configure Firewall Rules

This tutorial permits remote access to the Couchbase from anywhere. In production environments steps should be taken to restrict remote access to a limited set of IP address ranges. Access to all components will be secured using TLS mutual authentication.

Enable access to the Couchbase cluster from anywhere:

```
gcloud compute firewall-rules create default-allow-couchbase \
  --allow tcp:8091,tcp:8093,tcp:11210,tcp:4369 \
  --description "Allow couchbase from anywhere"
```

> Couchbase will only be exposed inside the VPC network where Kubernetes and Nomad workers are deployed.

Enable access to the Nomad cluster from anywhere:

```
gcloud compute firewall-rules create default-allow-nomad \
  --allow tcp:4646-4647 \
  --description "Allow nomad from anywhere"
```

Enable access to the Vault cluster from anywhere:

```
gcloud compute firewall-rules create default-allow-vault \
  --allow tcp:8200-8201 \
  --description "Allow vault from anywhere"
```

Next: [Provision The Nomad Infrastructure](04-nomad-infrastructure.md)
