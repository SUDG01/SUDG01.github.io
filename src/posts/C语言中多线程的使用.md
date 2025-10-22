---
title: 多线程的使用
date: 2024-11-07 20:52:20
tags: weekly
categories: 周报
cover: /135728692_p0_master1200.jpg
---

# 多线程

## 一.线程(Thread)

定义：一个线程就是一个"执行流"，每个线程之间都可以按照顺序执行字节的代码，可以"同时"执行着多份代码，其中，main()一般被称为主线程(Main Thread)

多进程同样可以实现同时执行任务，但是

**线程比进程更加轻量**

而且，人们为了更进一步，又诞生出了，"线程池"和"协程"

<br/>

### 进程和线程的区别？

* 进程是包含线程的，每个进程至少有一个线程存在，即主线程
* 进程和进程之间不共享内存空间，同一个进程之间共享同一个内存空间
* 进程是系统分配资源的最小单位，线程是系统调度的最小单位
* 一个进程挂了一般不会影响到其他进程，但是可能会把进程内的线程一起带走

## 二.C语言中的线程操作

**创建线程**，利用posix库，可以创建线程

```c
#include <pthread.h>
pthread_create(thread,attr,start_routine,arg);
```

参数解释：

* thread 指向线程表示符指针
* attr 一个不透明的属性对象，可以被用来设置线程属性。可以指定对象，默认值为NULL
* start_routine 线程运行函数的起始地址，一旦线程被创建就会执行
* 运行函数的参数。他必须通过把引用作为指针强制转换为void类型进行传递。如果没有，则用NULL

线程创建成功后，函数返回0，若返回值不为0则说明创建线程失败

<br/>

**终止线程**

```c
#include <pthread.h>
pthread_exit(status);
```

but **pthread_thread**是用于显式地退出一个线程，一般这个线程是在函数是在线程完成工作后无需存在时调用

<br/>

**连接和分离线程**

```c
pthread_join(threadid,status);
pthread_detach(threadid);
```

pthread_join() 子程序阻碍调用程序，直到指定的 threadid 线程终止为止。当创建一个线程时，它的某个属性会定义它是否是可连接的（joinable）或可分离的（detached）。只有创建时定义为可连接的线程才可以被连接。如果线程创建时被定义为可分离的，则它永远也不能被连。pthread_join() 函数来等待线程的完成

<br/>

<br/>

## 尝试使用

### 1.无参数传递的并发编程

其中使用的时候遇到了很多问题，翻找文章可以发现解决方案

[关于VS2022安装pthread.h多线程库的问题_pthread.h库怎么安装?-CSDN博客](https://blog.csdn.net/Dreaming_love_/article/details/140276187)

![image-20241112210639986](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241112210639986.png)

运行结果如下

![image-20241112210733773](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241112210733773.png)

5个线程同时运行HelloWD函数

<br/>

### 2.传递参数的并发编程

根据上部分学习的知识，写了以下程序

![image-20241112213316581](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241112213316581.png)

发现运行出来结果并不是我想要的

![image-20241112213358559](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241112213358559.png)

虽然没有输出上面那段函数的内容，但是并没有报线程创建失败

研究了线程创建函数的传参，得知传递的参数必需为无类型指针，将

```c
rc = pthread_create(&exec1,NULL,HelloWD,NULL); //最后的NULL修改为传递的参数
//
rc = pthread_create(&exec1,NULL,HelloWD,(void*)&numthread[i]); //强制转化
```

![](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241112214023780.png)

可以看到，线程正确创建并依次执行了

<br/>

### 3.结构体参数传递

相比上一个，多出结构体参与参数的传递

结构体定义中，threadid用于记录线程的序号，msg用于记录线程的名称，用数组index[5]来记录threadid和msg的值

![image-20241113212105974](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241113212105974.png)

![image-20241113212129211](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241113212129211.png)

最后成功运行结果为

![image-20241113212204062](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241113212204062.png)

<br/>

### 4.线程之间的连接

按照示例，模仿着敲了一下

![image-20241114212652934](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241114212652934.png)

运行结果是这样的

![image-20241114212724916](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241114212724916.png)

本实例实现了调用线程后，使用pthread_join函数等待threadid线程运行结束后再运行

其中：

1.pthread_attr_init是用于初始化线程对象（本例是attr）

<br/>

2.pthread_attr_setdetachstate 用于设置线程的分离状态并设置为PTHREAD_CREATE_JOINABLE即可以被其他线程通过pthread_join来等待结束的

<br/>

3.pthread_attr_destroy是用于销毁属性对象，释放资源

<br/><br/>

### 5.多线程作用的实现

```c
#pragma comment(lib, "pthreadVC2.lib")          //用于解决无法解析的外部符号 _imp_pthread_create问题
#include <pthread.h>
#include <stdio.h>
#include <malloc.h>
#include <time.h>

typedef struct {
	float a;
	float b;
}Arg;


float *func1(float a, float b) {
	int i;
	float* result;
	result = (float*)malloc((sizeof(float)) * 2);     //分配内存
	for (i = 0; i < 1000000000; i++) {
		result[0] = a + b;
		result[1] = a - b;
	}
	return result;
}

float* func2(float a, float b) {
	int i;
	float* result;
	result = (float*)malloc((sizeof(float)) * 2);
	for (i = 0; i < 1000000000; i++) {
		result[0] = a * b;
		result[1] = a / b;
	}
	return result;
}

void *thread_func1(void* args) {
	Arg* data = (Arg*)args;
	return func1(data->a, data->b);
}

void* thread_func2(void* args) {
	Arg* data = (Arg*)args;
	return func2(data->a, data->b);
}


int main() {
	pthread_t thread1;
	pthread_t thread2;

	clock_t start;
	clock_t end;
	
	float a = 3.1;
	float b = 2.4;

	Arg ab;
	ab.a = a;
	ab.b = b;

	void* r1, * r2;
	start = clock();
	pthread_create(&thread1, NULL, thread_func1, (void*)&ab);
	pthread_create(&thread2, NULL, thread_func2, (void*)&ab);   

	pthread_join(thread1, &r1);
	pthread_join(thread2, &r2);

	end = clock();
	float lasttime = (float(end - start)) / CLOCKS_PER_SEC;
	printf("timeused:%f\n", lasttime);
	return 0;
}
```

写了这样一个程序，使用time.h库中的clock来计算程序运行花费的时间

![image-20241120154837717](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241120154837717.png)

按照上面的写法，计算总共花费0.714s

![image-20241120155703694](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241120155703694.png)

但是，如果我取消多线程用法，改用单线程直接计算

![image-20241120155752094](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241120155752094.png)

执行两个运算函数花费的时间相当于原来时间的两倍



### 6.互斥锁和条件

![image-20241127211322210](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241127211322210.png)

我们可以利用互斥锁，来避免两个线程同时调用同一块内存导致的结果错误

设置一个情景，猫一次要吃二十条鱼，但是框内只能装10条鱼，如果不加以限制，那么猫和渔夫就同时使用框里的鱼，那么渔夫就会一直捕捉鱼。现在限制只能在框装满鱼后猫才能去吃

![image-20241127220658787](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241127220658787.png)![image-20241127220747723](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241127220747723.png)

其中，pthread_cond_wait(等待的信号，释放的锁)函数，是用于等待某个信号的发出，如果等到了某个信号，那么将释放互斥锁，发出信号可以使用pthread_cond_signal(发出的信号)

利用两者之间的关系，可以实现多线程之间相互兼容

此代码运行后结果：

![image-20241127221203418](https://raw.githubusercontent.com/SUDG01/tuchuang/main/image-20241127221203418.png)

<br/>

## 多线程总结

### 线程创建与管理

pthread_create：创建一个新的线程并执行指定的起始函数
pthread_join：等待指定线程结束并获取其返回值
pthread_detach：分离线程，使其在终止时自动回收资源，无需pthread_join
pthread_exit：线程主动退出，可指定返回值

<br/>

### 线程同步

pthread_mutex_init，pthread_mutex_destroy：初始化和销毁互斥锁
pthread_mutex_lock，pthread_mutex_unlock：锁定和解锁互斥锁
pthread_cond_init，pthread_cond_destroy：初始化和销毁条件变量
pthread_cond_wait，pthread_cond_signal，pthread_cond_broadcast：线程在条件变量上等待、发送信号或广播信号

<br/>

### 线程属性与调度

pthread_attr_init，pthread_attr_destroy：初始化和销毁线程属性对象
pthread_attr_setdetachstate，pthread_attr_getdetachstate：设置和获取线程的分离状态（joinable或detached）
pthread_attr_setschedparam，pthread_attr_getschedparam：设置和获取线程的调度参数（优先级等）
pthread_setschedprio：直接设置线程的优先级

<br/>

### 线程取消与清理

pthread_cancel：向指定线程发送取消请求
pthread_setcancelstate，pthread_getcancelstate：设置和获取线程的取消状态（enable或disable）
pthread_setcanceltype，pthread_getcanceltype：设置和获取线程的取消类型（asynchronous或deferred）
pthread_cleanup_push，pthread_cleanup_pop：注册和撤销清理函数，用于线程取消或正常退出时释放资源

<br/>

### 线程特定数据

pthread_key_create，pthread_key_delete：创建和删除线程特定数据键
pthread_setspecific，pthread_getspecific：为当前线程设置和获取与特定键关联的数据

<br/>

### 其他

pthread_self：获取当前线程的ID
pthread_equal：比较两个线程ID是否相等
