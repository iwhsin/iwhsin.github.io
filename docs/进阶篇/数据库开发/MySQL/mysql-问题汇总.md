# 1. MySQL 问题汇总

## 1.1. 索引长度问题

- 问题现场<br>
&emsp;&emsp;`Specified key was too long; max key length is 3072 bytes`

- 解决
    ```
    在 5.6.3 之后的版本，字节限制提高到了 3072 bytes
    当字符集为 utf8mb4 时，一个字符对应 4 bytes;
    当字符集为 utf8 时，一个字符对应 3 bytes;
    索引长度为所有索引列的长度总和
    ```
