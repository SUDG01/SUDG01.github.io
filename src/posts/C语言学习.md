---
title: C语言学习
date: 2024-10-07 22:06:10
tags: weekly
categories: 周报
cover: 
---

# 学习C语言

## 一.PE格式

### 1.PE文件

在win下：.exe .dll .sys

在linux下： elf

此类文件都属于PE结构的文件类型。



### 2.PE文件的构成

由DOS部首，PE文件头，块表（section table）,块（section）以及调试信息组成

#### DOS部首

最开始的部分是DOS部首，由DOS的MZ文件标志和DOS stub组成

（MZ）开头: e_magic ，为固定的值 “0x5a4d”

DOS Stub即为一句话"This program Cannot be run in DOS mode"



#### PE文件头

最开始的部分是以'PE\0\0':"0x50 0x45 00 00"开始的，由DOS部首中，结构成员e_lfanew(0x3c)指向

![](https://github.com/SUDG01/tuchuang/blob/main/Cs1.png?raw=true)

在PE文件头中，IMAGE_OPTIONAL_HEADER32和IMAGE_FILE_HEADER都定义了很多PE的数据

特别在IMAGE_OPTIONAL_HEADER32中，包含了数据结构表

数据结构表有导出表和导入表

导入表为引用的函数，导出表则为程序本身定义的函数



#### 块表

块表指向块



#### 块

![](https://github.com/SUDG01/tuchuang/blob/main/Cs2.png?raw=true)



![](https://github.com/SUDG01/tuchuang/blob/main/Cs3.png?raw=true)

RVA(相对虚拟地址)= VA(虚拟地址) - ImageBase(起始地址)

VOFFSET = 每个节的虚拟地址 - 起始地址

ROFFSET = 每个节的虚拟地址 - 每个文件的首地址



## 二.进制转换

### 1.表现形式

在C语言中：16进制为0x开头，如（0x71ef）,x可以为大小写

在汇编语言中：

16进制为H结尾，如：（1aH）

八进制为O结尾，如：（17O）

十进制为D结尾，如：（12D）

二进制为B结尾，如：（110B）

### 2.转换

![](https://github.com/SUDG01/tuchuang/blob/main/jinzhi1.png?raw=true)

![](https://github.com/SUDG01/tuchuang/blob/main/jinzhi2.png?raw=true)

计算方法。。。。。。



### 3.整数编码

表格法：1024 512 256 128 64 32 16 8 4 2 1 可以计算整数的原码

计算机使用补码

补码中负数等于绝对值的原码取反加一



### 4.整数的存储方式

![](https://github.com/SUDG01/tuchuang/blob/main/Cs4.png?raw=true)

但是，x86（32位）系统则为低位优先，按图，则是78 56 34 12





### 5.浮点数的定义和储存

```c
float x = 1.732f;
double y = 3.1415926;
```

浮点数需要在常数后面加f声明为浮点数，双精度则不需要

单精度在二进制存储当中阶码部分占用8位，小数部分中占用23位

双精度在二进制存储当中阶码部分占用11位，小数部分中占用52位，两种精度都各保留一位符号位

0为正数，1为负数



## 三.C语言中数据的类型

### 1.数据类型

字符类型： char (ASCLL字符) / wchar_t (UNICODE字符)  UNICODE字符需要在值前加L来声明

整型： short/int/long/long long/_int64

实数：单精度float  ，双精度double

有符号和无符号：signed/unsigned, (signed)int/(unsigned) int

布尔类型：bool , 0/1(true/false),C99<stdbool.h> 



### 2.Ascll编码

![](https://github.com/SUDG01/tuchuang/blob/main/Ascall.png?raw=true)

其中英文大写和小写之间的差值为32，可以用代码表示为

```c
char c = 'M';
c + 'a'-'A';
//大写转小写
char d = 'm';
d + 'A'-'a'
//小写转大写
```



### 3.整型

int 和long int(long)占4个字节，long在linux里占8个字节

longlong（gc） 和 _int64（vc）占8个字节

bool的长度为1个字节，BOOL为4个字节

```c
long a = 100L;
unsigned long b = 100UL;
long long c = 100ll;        //linux
_int64 d = 100i64;          //windows
```



### 4.自定义新的类型

```c
typedef int INT
typedef unsigned int UINT             //重新定义类型，好处简洁，同一编码风格，容易在其他平台改动
```



### 5.范围

char [0,255]，8位， short [0,65535] 16位

int [0,4294967295] 32位 

以上均为无符号，有符号范围则是 [ -2 ^(n-1),2^(n-1)-1 ]

*在linux中，超级用户的GID为0（数据溢出，即如果超过可表示的范围则从负数开始计算）



### 6.类型转换

强制转换，人为使变量的类型发生转变，用例：

```c
char c = 'a';					//原类型
short i = (short)c;             //转换
```

浮点数到整数，如：

```c
int i = (int)3.14;
int b = (int)3.74;                       //两个结果均为3，只取整，并不会四舍五入
```

如果从大到小转换

```c
int x = 0x12345678;
short y = (short)x;
```

数据会从高位开始截断，如上，int为4个字节的数据，而short为两个字节，所以，y的值则会是**0x5678**

自动转换，遵循一个规则，所有运算中，必须全部转换成同一种类型的数据再进行运算

且自动转换是以运算中最长的一种类型统一转换

![](https://github.com/SUDG01/tuchuang/blob/main/Cs5.png?raw=true)

单精度转双精度则是通过截尾来实现，会丢失一定量的数据（要进行四舍五入操作）

若signed整型赋给长度相同的unsigned型变量，内部存储形式不变，但外部表示时总是无符号的

```c
short s = -1;
unsigned short us =(unsigned short)s;
us = 65535
```



## 四.变量

### 1.变量命名和定义

命名原则:只能由字母，下划线和数字组成，但第一个字符必须为字母，下划线也被看做为字母，且不能用关键字来当做变量，大写字符一般用于定义常量

![](https://github.com/SUDG01/tuchuang/blob/main/Cs6.png?raw=true)

命名规则（例：匈牙利命名）

![](https://github.com/SUDG01/tuchuang/blob/main/Cs8.png?raw=true)

一般有4种命名方法：匈牙利，下划线（linux），驼峰，帕斯卡

```c
int iMyData;     //匈牙利
int my_data;     //下划线
int myData;      //驼峰
int MyData;      //帕斯卡
```



### 2.变量类型

共有：全局变量，全局静态变量，局部变量，局部静态变量，寄存器变量5种

![](https://github.com/SUDG01/tuchuang/blob/main/Cs7.png?raw=true)



## 五.开始使用

### 1.输入与输出

使用scanf函数接收输入

用法(例)

```c
int C;
scanf("%c",&c);              //warning:4996,可能会出现安全问题，可使用scanf_s()
printf("%c",c);
```

在连续两个接收数据时，因为用户按下了回车，而回车也会当做一个字符，所以会导致后面的接收被顶掉，所以应该在每次scanf后输入：

```c
fflush(stdin);                  //清空数据缓存区域
//或者
scanf(" %c",%c);                //在%c前加一个空格
```

还有其他接收字符的函数,例：

```c
char a = getch();              //检测输入后自动下一步
char a1 = getchar();           //等待回车
```

也可以用_getch()代替

%号后面的值：(tips: hd =短整型，ld = 长整型，I64d = _int64的整数)

![](https://github.com/SUDG01/tuchuang/blob/main/Cs9.png?raw=true)

浮点数tip: %.[数字]可以控制浮点数后面有几位小数

字符串：

```c
gets();                          //可以用gets_s()代替
puts();                          //可以避免scanf以空格结束的问题
```



文件流: stdin(输入)，stdout(输出)，stderr(错误)



### 2.运算符

()优先级最高，优先算括号内数

逻辑非! : !0=1，!非零 = 0    

自增，自减: i++,++i,i--,--i



i++和++i的区别

```c
int i = 0;
int a = i++;                  //先i=a,在i+1
int b = ++i;                  //先i+1,再i=b
```



&&(逻辑与，且)，||(逻辑或)，&&的优先级大于||

?：取两个数的最大值

```c
a<b?a:b                   //如果前式为真，则取a，为否，则取b
```

,运算符是优先级最低的



贪心算法：

编译器从左到右开始对运算符号依次读取，直到无法再组成一个新的运算式，例

```c
a+++++b;                  //解析结果为((a++)++)+b
```



### 3.随机数

rand函数，但是需要随机生成一个种子，用例（一百以内的随机数）：

```c
srand((unsigned int)time(0));               //取当前时间为随机数的种子
for(int i=0;i<10;i++);{
    printf("%d",rand()%100);                 //除以100的余数，即余数小于100，得到100以内的随机数
}                  
```



### 4.switch语句

与if语句使用方法类似，下面为例：

```c
switch()
{
case 'A';
    do something;
	break;                      //如果没有加break的话，语句会继续往下执行而不会跳出switch函数
case 'B';
    do something;
    break;
...
}
```



### 5.循环

for()语句由三个部分组成( 初始化变量 ;  判断条件; 更新循环变量表达式 )

do while 循环

```c
do                //int i = 0 
{
    printf("balabala");
    i++;
}while (i<10);                             //与while循环不同的是，是先执行，再进行判断
```



### 6.转向语句

#### 1.goto语句(常用于出错处理，跳出多重循环，慎用)

```c
goto L1;
...
L1;
语句
语句
```

tip: 如果申请内存使用后不再需要，要记得free()释放内存，防止内存泄漏



#### 2.break和continue

break函数用于退出循环，return用于退出整个函数,并提供返回值

continue用于进入下一次循环，当执行到continue语句时，当前循环语句将不会继续进行



## 六.数组

### 1.一维数组

#### 1.随机访问,数组中每个数代表4个字节，那么就可以做到：

```c
int a[10];               //假如要访问数组中第6个值
a[0]+20;                 //加20得到的即为第六个值的地址
```

#### 2.初始化

```c
int a[10] = {1,2,3,4,5,6,7,8,9}
int a[10] = {0,1,2,3,4}                         //没有初始化的值均为0
int a[10] = {(0,1),(2,3),4}                     //逗号表达式，结果等价于{1,3,4}
int a[10] = {0}                                 //全部初始化为0
int a[]={1,2,3,4,5}   
```



#### 3.字符数组

```c
char str1[] = {'h','e','l','l','0'};
char str2[] = "hello"；                    //看起来相同，但是str2比str1多1个\0作为结束符
```

tip:数组名是常量指针，一旦定义，就不能修改，如：

```c
char a[100];
a = "hello world"                          //error
```



### 2.二维数组

定义方式：(因为量大，不好直接写，直接放图)

![](https://github.com/SUDG01/tuchuang/blob/main/Cs10.png?raw=true)

初始化：

```c
int a[5][3] = {{23,34,21},{72,2,31},{123,23,5},...};
```



### 3.注意事项

在数组中，如果有整数型数组a1[5]={0};     a2\[3][4]={0}；假设a1的起始地址为:10000000,a2的起始地址为200000000

对数组进行+1操作可以得到：

```c
a1 + 1 = 100000004;           &a1 + 1 = 200000020;
a2 + 1 = 100000016;           &a2 + 1 = 200000048;
```

在数组中，一行算一个元素，一个元素4个字节，a1+1的值则加一个元素，而&a1为数组的地址，则加一整个地址，有5个元素，则加4*5=20

a2有4行，算4个元素，则a2+1的地址加16，&a2则有总共12个元素，则地址加3\*4\*4=48



//P26 30:30



#### 数组的溢出

C编译器对数组溢出不做检测
程序在运行时候，数组溢出导致程序行为未定义



### 4.数组的应用

#### 1.计算斐波那契数组

![](https://github.com/SUDG01/tuchuang/blob/main/flpq_math.png?raw=true)

#### 2.字符串大小写转换

![](https://github.com/SUDG01/tuchuang/blob/main/transtr.png?raw=true)

#### 3.计算平均值

定义一个数组，通过for循环遍历整个数组，令数组不断自增，最后再除以数组中数据的数量



#### 4.取最大值

![](https://github.com/SUDG01/tuchuang/blob/main/img/get_max_num.png?raw=true)



## 七.字符串

C语言中字符串可以定义为:"c1,c2.c3.....cn \0"其中\0是结束符，算作一个字符

### 1.转义字符

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs11.png?raw=true)

字符串("a")和字符常量('a')的区别

字符串是存储在静态区的，"a"对应的是字符串的首地址,所以可以赋值给字符指针

而字符常量'a'只是赋值给变量，不存储在静态区域，没有内存，不可赋值给字符指针



### 2.宽字符串

wchat_t类型

```c
wchar_t a = L"Hello,世界"；
```

宽字符串相比普通字符串，其中所有的字符都占两个字节，但是响应速度更快



### 3.使用malloc函数动态分配内存调用字符串

用例:

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs12.png?raw=true)

把字符串存放在堆上来调用字符串

这样，可以通过指针移动来遍历整个字符串，知道遇到字符'\0'



### 4.字符串做函数参数

```c
void print_str(char *str){
    while(*str != '\0'){
        printf("%c",*str);        //定义一个函数，不断遍历指针*str的字符，直到遇到'\0'
        str++;
    }
}
int main(void){
    char *str = "hello world";       //向指针中传递参数，用定义的函数print_str输出
    print_str(str);
    return 0;
}
```



### 5.字符串api

有3套库函数，strxxx/wcsxxx/_tcsxxx，建议使用tchar的写法(兼容多字节字符集工程和UNICODE字符集工程):

```c
#include <tchar.h>
TCHAR *tstr = _T("Hello world");
```



* strcpy 将字符串拷贝到另一个变量或数组

```c
strcpy(要拷贝到的变量或数组,原位置);
strcpy(buf1,s1);
_tcscpy(buf2,s2);
```

* strcmp比较两个字符串

```c
strcmp(s1,s2);
strncmp(s1,s2,5);        //用于比较字符串中前几个字符是否相等
stricmp(s1,s2);          //忽略大小写
strnicmp(s1,s2,3);       //与strncmp相同，忽略大小写
```

* strcat拼接两个字符串

```c
char path[260] = "c:\\doc\\test\\";
char *filename = "meow.txt";
strcat(path,filename);
printf("path:%s\n",path);
```

* strchr(strrchr)查找

```c
char *p = strchr(path,'x');             
```

用于从左到右查找字符串中的一个字符是否存在，若存在，则输出以后的所有内容(如果是strrchr则是从右往左)

同样的strstr可以查找字符串，用法类似

* strtok分割（两个参数，strtok(要分割的字符串,分割符)）

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs13.png?raw=true)

* atoi(字符串转整型)/atof(字符串转浮点)/atol(字符串转长整型)/atoll(字符串转long long)/_ttol(针对TCHAR)



## 八.函数

在C中，把为了实现某一特定的功能的所有语句归纳在一起，就形成了一个函数。一般来说，函数只实现单一功能

引用自己的函数:

1.创建一个.cpp源文件，将函数写进.cpp文件中，函数在写的时候需要一个返回值，ruturn函数计算的结果

![](https://github.com/SUDG01/tuchuang/blob/main/img/func1.png?raw=true)

2.创建一个.h头文件,在头文件中写入引用的函数(#pragma once是用于同一个头文件被包含多次)

![](https://github.com/SUDG01/tuchuang/blob/main/img/func2.png?raw=true)

同时，ifndef也可以保证头文件只被一次包含

```c
#ifndef _Exemple_
#define _Exemple_
....(包含的函数)
#endif
```

3.使用(#include "要包含的自己创建的头文件")

![使用](https://github.com/SUDG01/tuchuang/blob/main/img/func3.png?raw=true)

### 1.命令行参数

```c
int _tmain(int argc,_TCHAR* argv[]){
    ...
}
```

其中,argc为命令行参数的个数,argv[]存放命令行参数

### 2.函数的注意事项(模块化,方便调试,维护)

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs14.png?raw=true)

* 变量初始化，在函数局部变量要保证初始化
* 严进宽出: 在一开始排除非法数据，后面轻松
* assert：对参数进行断言
* 时间与空间复杂度: 内存少，使用快，尽量优化，不要分配内存(malloc)
* 边界考虑: 对条件充分考虑，避免特殊情况发生
* 功能测试: 在不同用例中测试函数的功能是否运行正常



### 3.库函数

库函数都有官方的说明文档，可以通过官方文档来进行传参，调试



### 4.errno_t函数

errno_t函数可以用来查看错误码(存放在头文件**Windows.h**中)，用例:

```c
#include <Windows.h>
#include <stdio.h>
...
errno_t err = GetLastError();
printf("err: %d",err);
```

例:传回来的错误码可以在工具Error Lookup(错误查找)中查看(visual stdudio):

![](https://github.com/SUDG01/tuchuang/blob/main/img/Error_Lookup.png?raw=true)

### 5.面向过程和面向对象

C语言是面向过程的一门编程语言

两者的区别是:

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs15.png?raw=true)

面向对象,所有的动作都对应一个对象

面向过程,每个动作都是从一个动词开始的，每个动作对应一个函数



### 6.函数的传参

3种方式

1.传值: 形参是对实参值的一个拷贝，形参和实参是不相关。无法通过改变形参来改变实参

2.传指针: 形参是对实参地址的一个拷贝，通过地址可以实现对实参的修改

3.传引用: 形参是对实参的一个引用（别名），形参就是实参本身，改变形参就是改变实参本身

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs16.png?raw=true)

函数用参数作为返回值

* 变量既是输入，也是输出参数

```c
void add(int *x,int y);          //*x = *x + y;
```

数组做函数参数，防溢出：

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs17.png?raw=true)

### 7.*函数的调用约定

![](https://github.com/SUDG01/tuchuang/blob/main/img/callingcvt1.png?raw=true)

默认调用约定:

```c
int func (int x, int y);
```

cdecl调用约定:(参数入栈顺序：从右到左。调用者修改栈，所以可以支持变参函数，因为能恢复栈平衡)

```c
int__cdecl func(int x, int y);               //先是y入栈，再是x
```

stdcall调用约定:（从右往左压入栈。被调用函数自身修改栈）

```c
int__stdcall func(int x,int y);
```

fastcall调用约定:(函数的第一个和第二个通过ecx和edx传递，剩余参数从右到左入栈。被调用者修改栈)

```c
int__fastcall func(int x,int y,int z);
```

 **栈**的增长方向和内存增长方向相反

先是参数入栈，然后是返回地址入栈（**eip**）(调用完当前函数后下一条要执行的指令)，接着是ebp寄存器入栈(debug版本)，最后是esp寄存器（占领寄存器），然后得到局部变量区的空间。
函数调用完之后，开始出栈，esp到达参数区域时，要使内存完全释放，需要+（对应参数的值）*4+4

<u>每个参数在入栈时都会被提升至4个字节</u>

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs18.png?raw=true)

**x64平台统一使用fastcall约定**

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs19.png?raw=true)

区别:

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs20.png?raw=true)



### 8.inline（内联函数）

优点:没有栈操作，运行效率高
缺点:代码会变大

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs21.png?raw=true)



### 9.static关键字

static(静态)，限制函数只在当前文件下使用，防止命名冲突



###  10.函数设计的常见问题

#### 1.printf打印结果代替返回值

输出结果返回给调用者，printf没有任何意义，调用者是看不到的

#### 2.逻辑全部或者部分放在了main函数

算法必须单独写成普通函数，然后在main函数里测试。main里不能有算法逻辑或者功能部分，main只负责数据测试

#### 3.调用了库函数

#### 4.代码缺少封装

#### 5.函数内部内存分配

#### 6.硬编码

#### 7.指针移动

一块N个字节的内存，它的首地址（头指针）为pstart，那么末地址为：

```c
pStart+N-1;
```



## 九.指针

指针就是一个变量(x86 占4个字节,x64占8个自己字节)，它与其他变量的不同就在于它的值是一个内存地址，指向内存的某一个地方，明确了该内存的宽度（通过指针类型确定）。指针含义分为3个方面：（变量&&地址&&内存宽度）

### *解引用（dereference）运算符

通过指针（存放的内存地址），找到对应的内存和里面存放的数据类似于邮递员根据信封地址，找到地点

&和*互为逆运算

\*&与&\*(&:取变量的地址,\*:取地址对应的内存)，如果为void类型，那么长度不确定,GCC中默认为1字节

```c
int a = 10;

*&a == a;
&*a;   //error

int *p = &a;
*p == a;
*&p == p;
&*p == p;
```

### 二级指针

一级指针中存放的是普通变量的内存地址，二级指针中存放的是一级指针的地址

作用:传参是改变一级指针的值

传参：

```c
int func1(int x);          //传实参值，不能改变实参
int func2(int *x);         //穿实参指针，修改实参
int func3(int &x);         //传实参引用，修改实参
int func4(int **x);        //实参是指针，传指针的指针，修改指针
int func5(int *&x);        //实参是指针，传指针的引用，修改指针
```

## 十.内存

系统虚拟内存空间布局：

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs22.png?raw=true)

内存分类:

* 堆heap
* 栈stack
* 静态区
* 代码区

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs23.png?raw=true)

图为内存由上往下增长

### 1.堆和栈的区别

内存分配

* 栈：由系统自动分配与回收,int b = 0;增长由高到低
* 堆: malloc/free,地址由低到高

大小限制

* 栈：应用层1M到10M，内核层: 12k到24k不等
* 堆：受限于计算机系统中有效的虚拟内存

效率比较

* 栈：由系统自动分配，速度较快。但是程序员无法控制
* 堆：速度比较慢，而且容易产生内存碎片

存放内容：

* 栈：栈是用来记录程序执行时函数调用过程中的活动记录（栈帧），参数，返回地址，ebp，局部变量等
* 堆：一般是在堆的头部用一个自己存放堆的大小，剩余部分存储的内容由程序员根据程序计算的需要决定

### 2.内存地址分类和寻址模式

1.逻辑地址，线性地址，物理地址

* 逻辑地址是编译器生成的，使用C语言指针时，指针的值就是逻辑地址。逻辑地址由段地址+段内偏移组成

* 线性地址是有分段机制将逻辑地址转化而来的。

* 物理地址是CPU在存取数据时最终在地址总线上发出的电平信号，靠改地址来访问对应数据

2.内存的寻址模式

* 扁平模型
* 分段模型
* 实模式
* 保护模式

### 3.内存分配

malloc/calloc/relloc

```c
void *malloc(unsigned int num_bytes)
```

* num_bytes:分配的内存字节数
* 失败返回NULL，成功返回内存地址，内存中为垃圾值，需要清零，用free释放

```c
void *calloc(size_t nelem,size_t elsize);
```

* nelem:元素个数
* elsize:元素长度
* 分配的内存会被初始化为0，free释放

```c
void *realloc(void *mem_address,unsigned int newsize);
```

先判断当前指针是否有足够的连续空间，如果有，扩大mem_address指向的地址，并且将mem_address返回，如果空间不够。先按照newsize指定的大小分配空间，将原有数据从头到尾拷贝到新分配的内存区域，而后释放原来mem——address所致内存区域，同时返回新分配的内存区域的首地址，记得free释放

### 4.内存泄漏

动态分配的内存在程序结束后而已值未释放，就出现了内存泄漏。一般场合说的内存泄漏是指堆内存的泄漏。堆内存是指程序从堆中分配的，大小任意的，使用完必须释放的内存。应用程序一般使用malloc,new等函数从堆中分配到一块内存，使用完后，程序必须负责响应的调用free或菏泽delete释放该内存块，否则，这块内存就不能被再次使用，就说这块内存泄漏了（频繁的内存泄漏，将最终耗尽珍格格内存资源，让系统性能大幅下降）

#### 几种内存泄漏的情况：

1.分配了内存没有释放

2.调用了不正确的系统api

3.打开了句柄但是未关闭

#### 预防内存泄漏

1.malloc/free 和 new/delete要配对出现

2.分支退出别忘记释放已分配的内存,（goto）,例：

```c
char *p1=(char *)malloc(64);
if(p1 == NULL){
    goto err;
}
char *p2 = (char *)malloc(128);
if(p2==NULL){
    goto err;
}
err:
	if(p1){
        free(p1);
    }							//用goto函数集中释放内存
	if(p2){
        free(p2);
    }
```

3.一般函数内部如果一定要分配内存，那么最好是在函数内释放内存，不要返回堆上的内存

4.复杂引用使用引用计数

5.C++中使用智能指针



## 十一.结构体

定义:struct（结构体），是由若干个“成员”组成的（每个成员可能是**不同类型**的数据），每一个成员可以是一个基本数据类型或者又是一个构造类型，结构体在底层编程中大量存在

基本的定义方法(例)：

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs24.png?raw=true)

访问结构体中的内容（使用指针需要使用箭头来访问结构体中的内容）：

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs25.png?raw=true)

### *与->和.运算符

因为->与.运算符比*的优先级高，所以如果没有括号，先算->和.

```c
//ps2是一个指针
printf("id:%s",*ps2.id);     //报错，认为id前面没有类型
printf("id:%s",(*ps2).id);   //成功，因为*ps2=s2,等价于s2.id
printf("id:%s",ps2->id);     //一般用法
```

tip:如果结构体内有指针，需要让指针指向一个有效的内存

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs26.png?raw=true)

### 2.浅拷贝和深拷贝

浅拷贝只拷贝结构体的**字段值**，包括指针类型成员的**地址**。也就是说，浅拷贝只复制指针的值（即它所指向的内存地址），但不复制指针所指向的实际数据。

深拷贝不仅拷贝结构体的字段值，还**拷贝指针所指向的数据**。也就是说，深拷贝为指针指向的实际数据分配新的内存，并将数据拷贝到新内存中。

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs27.png?raw=true)

如果分配了内存，浅拷贝会导致被拷贝的变量释放内存后，接收拷贝的变量指向的值无效

浅拷贝:

```c
Person p2 = p1;  // 浅拷贝，将person中p1的值复制给p2
```

深拷贝:

```c
s1.a = 10;                            //tip: s1和s2都为一个同一个结构体的变量
s1.p = 10;
s1.p = (cahr*)malloc(100);
s2.a = s1.a;
s2.p = (char*)malloc(100);            //分配内存
memcpy(s2.p, s1.p, 100);              //复制s1.p的内存到s2.p的内存中  
free(s1.p)                            //内存释放后s2.p的值不会受到影响
```

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs28.png?raw=true)

### 3.结构体的应用

结构体的遍历

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs29.png?raw=true)

输出结果:

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs30.png?raw=true)



基本类型大小:

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs31.png?raw=true)

自然对齐：

(1)数据成员对齐规则：

各成员变量存放的起始地址相对于结构的起始地址的偏移量:sizeof（基本类型）或其倍数

(2)整体的对齐规则:

结构的总大小也有个约束条件：最大sizeof（基本类型）的整数倍

好处：CPU在一个始终周期内存存取数据，效率高

```c
//定义对齐
#pragma pack(n)            //定义对齐的个数
...                        //定义结构体
#pragma pack(pop)          //恢复对齐状态
```

栈空间的对齐：

栈形参对齐（x86中所有形参会提升到4个字节，x64会提升到8个字节）

### 4.联合体

定义: 把几种不同类型的变量存放到同一段内存单元中。也就是使用**覆盖技术**，几个变量相互覆盖重叠，共同占用一段内存的结构体，被称为联合体

定义方式（与结构体类似）：

```c
typedef union _foo{
    char s[10];
    int i;
}foo,*pfoo;
foo a;                  //定义a为foo类型
```

例：

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs32.png?raw=true)

其中，因为联合体共同使用一段内存，所以a.i和a.s的地址相同。而最后sizeof的值是因为，联合体的大小为联合体成员中最大成员的字节大小，所以sizeof(a)的大小为20。a.i的值发生变化是因为hello world对应的是"dlrow olleh"的十六进制，转换成10进制的值

#### 结构体和联合体互相包含

基本定义和访问方法（联合体包含结构体）：

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs33.png?raw=true)

结构体包含联合体（相似访问方法）

![](https://github.com/SUDG01/tuchuang/blob/main/img/Cs34.png?raw=true)

利用联合体来检测系统是高位优先还是低位优先：

![](https://github.com/SUDG01/tuchuang/blob/main/img1/Cs35.png?raw=true)

原理是，联合体中所有成员共享同一块内存区域，而x被设定为1,16进制则是：0x000000001。在高位优先系统中，c的整数字节的最高有效字节为0，故返回false，而低位优先系统中返回的则是1，即true



## 十二.运算符

### 1.枚举类型

定义：当一个变量的值被限于列出来的值的范围内，那么这个变量就可以被定义为一个枚举类型的变量

枚举实际上是整数类型的一个集合。C语言给每个枚举的名称自动分配一个整数值，从0开始。如果不显式指定其他值，它们会依次递增。

基本定义方法：

```c
typedef enum _枚举名{
    值1,                 //从0开始
    值2,					//1
    ...
    值n,					 //n-1
}枚举名,*P枚举名;
枚举名 变量名;              //用法与结构体联合体类似
```

枚举类型里面的值为常量，无法被修改

![](https://github.com/SUDG01/tuchuang/blob/main/img1/Cs36.png?raw=true)

分别sizeof枚举名，枚举成员，枚举变量得到的结果都为4

因为枚举的底层是int类型，int类型在x86和x64上均占用4个字节



### 2.位运算

byte:比特      bit:位

定义：程序中的数据再内存中，都是以二进制的形式存在的，所以，内存中的数据一般都是0和1组成的序列。所谓位运算就是直接对整数在内存中的二进制位进行位运算操作（按位操作）

位运算分为：与(and，&),或(or,|),取反(not,~),异或(xor,^),左移(shl,<<),右移(shr/sar,>>)等几种运算

运算符:&，|，~，^，<<，>>



#### 1.与运算（&）

两个数进行位运算，只有当两个数对应的为都为1，该位运算结果为1，否则运算结果为0

例：1&1 = 1 ， 1&0 = 0，0&0 = 0

![](https://github.com/SUDG01/tuchuang/blob/main/img1/Cs37.png?raw=true)

如果想要取后三位：x & 0x7即可，因为0x7 = 00000111



#### 2.或运算（|）

和与运算相反，只有当两个数对应的都为0，该位运算结果才为0，否则都为1

例：1|1 = 1 , 1|0=1,  0|0 = 0



#### 3.异或（^）

定义：2个数进行异或运算时，就是将这2个数的二进制进行异或操作，只要两个数对应的位相同，该位运算结果为0，否则运算结果为1

![](https://github.com/SUDG01/tuchuang/blob/main/img1/Cs38.png?raw=true)

性质：任何一个数和0异或就是它本身，与自己异或等于0

* a^0=a
* a^a=0

```c
a=a^b;
b=a^b;          //两数交换
a=a^b;
```



#### 4.取反（~）

顾名思义，就是将二进制的每一位取反

![](https://github.com/SUDG01/tuchuang/blob/main/img1/Cs39.png?raw=true)

#### 5.移位（<<,>>）

##### 左移

* 将一个数左移N位，那么左边会去掉N位，右边会空出N位，空出的填0
* 将一个数左移N位相当于将这个数乘以2^N

##### 右移

* 将一个数右移N位，右边会去掉N位，左边会空出N位 在逻辑右移中，左边空N位用0填充，在算数右移中，左边空位用符号位来填充

为什么用移位运算符？效率高



#### 6.移位运算符的运用

##### (1)将第N位置置0或者置1

```c
#define SETFALG(a,n) ((a)|=(1<<(n)))      //将1左移n位和a的值进行或运算，将第n位置1
#define CLEARFLAG(a,n) ((a)&= ~(1<<(n)))  //将第n位置0
#define FLAGON(a,n) ((a) & (1<<(n)))      //判断第n位是否为1，如果要判断是否为0，取反即可
```

##### (2)对称加密(xor)

异或性质 a^0 == a , a^a == 0

A为明文，B为密文

加密：B=A^key

解密：A = B^key

```c
void xor1(char *data,int datalen,char *key,int keylen) {
	int i;
	for (i = 0; i < datalen; i++) {
		data[i] = (char)(data[i] ^ key[i % keylen]);
	}
}                                  //异或加密
```



## 十三.宏

### 1.宏定义

宏定义是只用一个标志符代表一个字符串，该标志符就称为宏名

![](https://github.com/SUDG01/tuchuang/blob/main/img1/Cs40.png?raw=true)

宏定义的优缺点：

* 有意义
* 减少修改
* 无类型检查
* 无法调试

两种基本用法

![](https://github.com/SUDG01/tuchuang/blob/main/img1/Cs41.png?raw=true)

**优缺点比较：**

1.宏的效率要高（inline），没有了函数调用过程中的进栈传参拷贝和出栈栈平衡

2.宏无法调试

3.宏无法做到类型检查

4.传参计算不同，红石简单的替换；函数先计算，再传参

**宏的多行定义**



```c
#define SWAP(a,b) \
	int temp;\
	temp = a;\              //使用两个反斜线将多行连起来
	a=b;\
	b=temp;
```

![](https://github.com/SUDG01/tuchuang/blob/main/img1/Cs42.png?raw=true)

可以使用大括号将所有语句连接起来

![](https://github.com/SUDG01/tuchuang/blob/main/img1/Cs43.png?raw=true)

### 2.条件编译

判断宏是否被定义

```c
#ifndef WINVER				//判断WINVER是否定义，if no defined
	...;
#else
    ...;
#endif                     //结束
```

加常量表达式

```c
#if 0
	...;               //1即执行，0则不执行，可以用0来注释掉一段代码
#endif
```

elif语句(例)

```c
#if defined(X64)            //if deined 顾名思义
	printf("x64 platform specific\n");
#elif defined(x86)
	printf("x86 platform specific\n");
#else
	printf("common code\n");
#endif                                        //结束
```



## 十四.递归

概念：递归是指某个函数直接或者间接的调用自身

递归首先需要有一个或多个**递归出口**，即递归终止的条件，也就是**最小子问题**的求解，可以允许多个出口。

递归还需要有一个**递归式**，这个递归式规定如何将**原问题划分成子问题**

以斐波那契数列为例

```c
int feibo(unsigned int n) {
	if (n == 1|n == 2) {
		return 1;                               //出口
	}
	else {
		return feibo(n - 1) + feibo(n - 2);		//不断引用本身从第一位开始加
	}
}
```

优缺点：

* 简单实现
* 效率低
* 容易栈溢出
* 内核不能使用递归



### 应用

#### 1.反向输出

```c
static void reverse_printf(const char* s) {
	if (s == NULL || *s == '\0') {
		return;
	}
	reverse_printf(s + 1);
	printf("%c", *s);
}
```



## 十五.文件

**文件分类：**

![](https://github.com/SUDG01/tuchuang/blob/main/img1/Cs44.png?raw=true)

**常见的文件系统：**

Windows： FAT , NTFS

Linux：Ext2-4

Solaris：ZFS



VFS:

![](https://github.com/SUDG01/tuchuang/blob/main/img1/VFS.png?raw=true)

ZFS：

![](https://github.com/SUDG01/tuchuang/blob/main/img1/ZFS.png?raw=true)

### 1.文本文件与二进制文件

纯文本文件： .c文件，.txt文件，.html文件等

二进制文件： .exe文件，.dll文件，.jpg文件，.rmvb文件，.doc文件，.ppt文件等

### 2.文件操作

1.文件创建（打开）

```c
fopen("C:\\newFile\\1.txt","w,ccs=UTF-8");   //默认编码模式为ANSI
```

参数如图：

![](https://github.com/SUDG01/tuchuang/blob/main/img1/Cs45.png?raw=true)

创建文件夹

![](https://github.com/SUDG01/tuchuang/blob/main/img1/Cs46.png?raw=true)

```c
int create_dir(){                              //定义一个函数
    char *dirpath = "d:\\test\\meow\\"        //记录文件夹地址与名称
    int res = _mkdir(dirpath);
    return res;
}
```

```c
int main(){
    res = create_dir();
    if(res == 0){
        printf("dir created!\n");          //文件夹创建成功
    }
    else{
        printf("dir create filed\n");       //创建失败
    }
}
```

tip：不能连续创建，只能一层一层创建

### 3.读写

fwrite写

```c
fwrite(buffer,size,ntime,fp);    //size+1是加上\0字符，ntime是重复次数，fp为fopen指针
//用法,以下为示例
fwrite("hello",strlen("hello")+1,1,fp);
fclose(fp);
```

fread读

```c
fread(buffer,suze,ntime,fp);      //返回值表示读取份数
//用法，以下为示例
char buff[100] = {0};
fread(buff,strlen("hello")+1,1,fp);
```

读写流程

```c
int main() {  
    // 定义文件指针  
    FILE *file;  

    // 写入文件  
    file = fopen("example.txt", "w"); // 以写入方式打开文件  
    if (file == NULL) {  
        perror("无法打开文件");  
        return EXIT_FAILURE;  
    }  
    fprintf(file, "hello"); // 写入字符串 "hello"  
    fclose(file); // 关闭文件  

    // 读取文件  
    file = fopen("example.txt", "r"); // 以读取方式打开文件  
    if (file == NULL) {  
        perror("无法打开文件");  
        return EXIT_FAILURE;  
    }  
    char buffer[100]; // 定义一个缓冲区来存储读取内容  
    fscanf(file, "%s", buffer); // 从文件中读取内容  
    printf("读取内容: %s\n", buffer); // 打印读取的内容  
    fclose(file); // 关闭文件  

    return EXIT_SUCCESS;  
}
```

![](https://github.com/SUDG01/tuchuang/blob/main/img1/Cs47.png?raw=true)

![](https://github.com/SUDG01/tuchuang/blob/main/img1/Cs48.png?raw=true)
