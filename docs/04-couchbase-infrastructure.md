# Provision The Couchbase Infrastructure

The couchbase will be configured for remote access through a set of external load balancers. 

## Create the Kubernetes Services

The Couchbase is composed of services that need to be exposed outside the `couchbase` Kubernetes cluster:

* `couchbase01-lb` - A [service](https://kubernetes.io/docs/concepts/services-networking/service/) that exposes the couchbase01 instance behind an [external load balancer](https://kubernetes.io/docs/concepts/services-networking/service/#type-loadbalancer).
* `couchbase02-lb` - A service that exposes the couchbase02 instance behind an external load balancer.
* `couchbase03-lb` - A service that exposes the couchbase03 instance behind an external load balancer.

Create the Couchbase services:

```shell
kubectl apply -f services
```

```shell
service "couchbase01" created
service "couchbase02" created
service "couchbase03" created
service "couchbaselb01" created
service "couchbaselb02" created
service "couchbaselb03" created
```

It can take several minutes for the internal and external load balancers to provision. Use the `kubectl` command to monitor progress:

```shell
kubectl get services
```

```shell
NAME            TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)
couchbase01     ClusterIP      XX.XX.XXX.XXX   <none>          8091/TCP
couchbase02     ClusterIP      XX.XX.XXX.XXX   <none>          8091/TCP
couchbase03     ClusterIP      XX.XX.XXX.XXX   <none>          8091/TCP
couchbaselb01   LoadBalancer   XX.XX.XXX.XXX   <pending>       8091:31677/TCP,8092:32215/TCP...
couchbaselb02   LoadBalancer   XX.XX.XXX.XXX   <pending>       8091:32256/TCP,8092:30279/TCP...
couchbaselb03   LoadBalancer   XX.XX.XXX.XXX   <pending>       8091:30585/TCP,8092:32131/TCP...
kubernetes      ClusterIP      XX.XX.XXX.X     <none>          443/TCP
```

> Estimated time to completion: 3 minutes.

```shell
kubectl get services
```

```shell
NAME                            CLUSTER-IP     EXTERNAL-IP     PORT(S)
couchbase01     ClusterIP      XX.XX.XXX.XXX   <none>          8091/TCP
couchbase02     ClusterIP      XX.XX.XXX.XXX   <none>          8091/TCP
couchbase03     ClusterIP      XX.XX.XXX.XXX   <none>          8091/TCP
couchbaselb01   LoadBalancer   XX.XX.XXX.XXX   XX.XXX.XXX.XXX  8091:31677/TCP,8092:32215/TCP...
couchbaselb02   LoadBalancer   XX.XX.XXX.XXX   XX.XXX.XXX.XXX  8091:32256/TCP,8092:30279/TCP...
couchbaselb03   LoadBalancer   XX.XX.XXX.XXX   XX.XXX.XXX.XXX  8091:30585/TCP,8092:32131/TCP...
kubernetes      ClusterIP      XX.XX.XXX.X     <none>          443/TCP
```

Do not continue until the above Couchbase services have obtained an external IP address.

## Create the Kubernetes Persistent Volume Claims

For each Couchbase instance we'll create a Persistent Volume and attach the disk to the corresponding instance.

* `couchbase01` - A [Persistent Volume Claim](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) creates a external storage that connects to couchbase01 instance.
* `couchbase02` - A Persistent Volume Claim creates a external storage that connects to couchbase02 instance.
* `couchbase03` - A Persistent Volume Claim creates a external storage that connects to couchbase03 instance.

Create the Couchbase persistent volume claims:

```shell
kubectl apply -f pvcs
```

```shell
persistentvolumeclaim "couchbase01" created
persistentvolumeclaim "couchbase02" created
persistentvolumeclaim "couchbase03" created
```

Use the `kubectl` command to see the PVCs:

```shell
kubectl get pvc
```

```shell
NAME          STATUS    VOLUME                                     CAPACITY   ACCESSMODES   STORAGECLASS   AGE
couchbase01   Bound     pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        RWO           standard       52s
couchbase02   Bound     pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        RWO           standard       51s
couchbase03   Bound     pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        RWO           standard       51s
```

Use the `kubectl` command to see the Persistent Volumes:

```shell
kubectl get pv
```

```shell
NAME                                       CAPACITY   ACCESSMODES   RECLAIMPOLICY   STATUS    CLAIM                 STORAGECLASS   REASON    AGE
pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        RWO           Delete          Bound     default/couchbase01   standard                 1m
pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        RWO           Delete          Bound     default/couchbase02   standard                 1m
pvc-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX   1Gi        RWO           Delete          Bound     default/couchbase03   standard                 1m
```

## Create the Kubernetes Deployments

Each instance of Couchbase is managed by a separate Deployment with 1 replica. Each deployment has **anti-affinity** rules so that the Pods are located in separate nodes inside the Cluster. An external Persistent Volume is attached at the Pod so that in case of node failure the disk is re-attached where the pod is rescheduled.

* `couchbase01` - Deployment that generates a Pod for couchbase01 instance.
* `couchbase02` - Deployment that generates a Pod for couchbase02 instance.
* `couchbase03` - Deployment that generates a Pod for couchbase03 instance.

Create the Couchbase deployments:

```shell
kubectl apply -f deployments
```

```shell
deployment "couchbase01" created
deployment "couchbase02" created
deployment "couchbase03" created
```

Next: TBD
