Win10 系统问题修复
=====

## win10 2004蓝屏问题
&emsp;&emsp;打开cmd执行如下命令。
```bash
Dism /Online /Cleanup-Image /ScanHealth
Dism /Online /Cleanup-Image /CheckHealth
DISM /Online /Cleanup-image /RestoreHealth
sfc /scannow
```
