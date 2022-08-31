# Multithreading Example

This is an implementation of Digital Ocean's tutorial on [Multithreading using Webworkers in Node](https://www.digitalocean.com/community/tutorials/how-to-use-multithreading-in-node-js).

I followed the tutorial, but made some changes, including using obtaining the number of threads from the machine's info, rather than assuming 4.

The multi-core server runs on port 3001 to prevent confusion, but I wouldn't recommending running both servers at the same time, as it will tamper with the results if you make requests to both.

To get the time for a blocking request, run:
```shell
# single core
time curl --get http://localhost:3000/blocking

# multi-core
time curl --get http://localhost:3001/blocking
```

The difference in results on a 2019 MBP (8 core i9 with HyperThreading) were pretty impressive: 

```shell
# Single Core
$ time curl --get http://localhost:3000/blocking
result is 20000000000
________________________________________________________
Executed in   20.57 secs      fish           external
   usr time    4.83 millis  130.00 micros    4.70 millis
   sys time    7.94 millis  900.00 micros    7.04 millis
   
# Multi-Core
$ time curl --get http://localhost:3001/blocking
result is 20000000000
________________________________________________________
Executed in  799.82 millis    fish           external
   usr time    4.15 millis  107.00 micros    4.05 millis
   sys time    7.00 millis  895.00 micros    6.11 millis
```
