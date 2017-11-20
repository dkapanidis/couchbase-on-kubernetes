# Provision the Kubernetes Infrastructure

Kubernetes will be used to host the Couchbase including the following components:

* [Couchbase](https://hub.docker.com/_/couchbase/) 4.5.1 Community Edition

## Provision a Kubernetes Cluster

A Kubernetes 1.7.5+ cluster is required to host the Couchbase components. Use the `gcloud` command to provision a three node Kubernetes cluster:

```shell
gcloud container clusters create couchbase \
  --machine-type n1-standard-2 \
  --num-nodes 3
```

It can take several minutes to provision the `couchbase` Kubernetes cluster. Either wait for the above command to complete or use the `gcloud` command to monitor progress in a separate terminal:

```shell
gcloud container clusters list
```

```shell
NAME   ZONE        MASTER_VERSION  MASTER_IP  MACHINE_TYPE   NODE_VERSION  NUM_NODES  STATUS
couchbase  us-west1-c  1.7.5                      n1-standard-2  1.7.5         3          PROVISIONING
```

> Estimated time to completion: 5 minutes.

```shell
gcloud container clusters list
```

```shell
NAME   ZONE        MASTER_VERSION  MASTER_IP      MACHINE_TYPE   NODE_VERSION  NUM_NODES  STATUS
couchbase  us-west1-c  1.7.5           XX.XXX.XX.XXX  n1-standard-2  1.7.5         3          RUNNING
```

### Configure Firewall Rules

This tutorial permits remote access to the Couchbase from anywhere. In production environments steps should be taken to restrict remote access to a limited set of IP address ranges. Access to all components will be secured using TLS mutual authentication.

Enable access to the Couchbase cluster from anywhere:

```shell
gcloud compute firewall-rules create default-allow-couchbase \
  --allow tcp:8091,tcp:8093,tcp:11210,tcp:4369 \
  --description "Allow couchbase from anywhere"
```

Next: [Provision The Couchbase Infrastructure](04-couchbase-infrastructure.md)
