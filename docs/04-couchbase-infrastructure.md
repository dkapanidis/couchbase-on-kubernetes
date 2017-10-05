# Provision The Couchbase Infrastructure

The couchbase will be configured for remote access through a set of external load balancers. 

## Create the Kubernetes Services

The Couchbase is composed of services that need to be exposed outside the `couchbase` Kubernetes cluster:

* `couchbase01` - A [service](https://kubernetes.io/docs/concepts/services-networking/service/) that exposes the couchbase01 instance behind an [external load balancer](https://kubernetes.io/docs/concepts/services-networking/service/#type-loadbalancer).
* `couchbase02` - A service that exposes the couchbase02 instance behind an external load balancer.
* `couchbase03` - A service that exposes the couchbase03 instance behind an external load balancer.

Create the Couchbase services:

```
kubectl apply -f services
```

```
service "couchbase01" created
service "couchbase02" created
service "couchbase03" created
```

It can take several minutes for the internal and external load balancers to provision. Use the `kubectl` command to monitor progress:

```
kubectl get services
```

```
NAME                            CLUSTER-IP      EXTERNAL-IP    PORT(S)                                                                         
couchbase01                     XX.XX.XXX.XXX   <pending>      8091:31415/TCP,8093:32453/TCP,11210:30468/TCP,4369:31378/TCP
couchbase02                     XX.XX.XXX.XXX   <pending>      8091:31415/TCP,8093:32453/TCP,11210:30468/TCP,4369:31378/TCP
couchbase03                     XX.XX.XXX.XXX   <pending>      8091:31415/TCP,8093:32453/TCP,11210:30468/TCP,4369:31378/TCP
kubernetes                      XX.XX.XXX.X     <none>         443/TCP
```

> Estimated time to completion: 3 minutes.

```
kubectl get services
```

```
NAME                            CLUSTER-IP      EXTERNAL-IP    PORT(S)                                                                         
couchbase01                     XX.XX.XXX.XXX   XX.XXX.XXX.XXX 8091:31415/TCP,8093:32453/TCP,11210:30468/TCP,4369:31378/TCP
couchbase02                     XX.XX.XXX.XXX   XX.XXX.XXX.XXX 8091:31415/TCP,8093:32453/TCP,11210:30468/TCP,4369:31378/TCP
couchbase03                     XX.XX.XXX.XXX   XX.XXX.XXX.XXX 8091:31415/TCP,8093:32453/TCP,11210:30468/TCP,4369:31378/TCP
kubernetes                      XX.XX.XXX.X     <none>         443/TCP
```

Do not continue until the above Couchbase services have obtained an external IP address.


Next: [Provision The Consul Cluster](05-consul.md)
