<!-- panels:start -->
<!-- div:title-panel -->
# 1. Git 实践应用
<!-- div:floating-img -->
![git-logo][git-logo]
<!-- panels:end -->

## 1.1. 提交相关操作
### 1.1.1. 修改最近一次提交记录的提交信息或内容
&emsp;&emsp;`amend`命令可以为我们提供一次对最近一次的提交记录的进行修改的机会。

- **修改提交信息**
    ``` bash
    #修改最后一次提交信息
    git commit --amend
    #执行上述命令会打开最后一次提交信息的编辑框,重新编写内容提交即可
    ```

- **修改提交记录的文件内容**<br>
&emsp;&emsp;如果有时候我们提交完成后发现文件中的内容不是我们要改的，多了或少了一些内容，这时候又不想重新修改后在生成一条提交信息怎么办呢？<br>
&emsp;&emsp;只需要将相应的文件重新修改成需要的内容后添加到暂存区再执行上述的`修改提交信息`的命令`git commit --amend`即可。

> [!TIP]
> 如果只想修改最后一次提交中的文件的内容，又不需要修改提交信息，可以直接追加`--no-edit`选项即可，`git commit --amend --no-edit`
    
### 1.1.2. 修改历史提交记录的提交信息
&emsp;&emsp;Git本身没有提供修改历史提交记录的提交信息的工具，我们可以基于`rebase -i`进行交互式地变基操作。

<details>
<summary><b>命令行操作</b></summary>

- **命令行操作**
    1. 查看下历史提交日志
        ``` bash
        #查看下历史提交日志
        $ git log --abbrev-commit --oneline
            43a9e16 (HEAD -> master) update message
            ac5fde9 add bbb.txt
            df036e9 asddsa
        ```
    2. 进行交互式变基
        ``` bash
        #找到需要进行修改的`ac5fde9`提交记录的上一级`df036e9`进行交互式变基
        git rebase -i df036e9
        ```
        - 弹出如下交互编辑页面，用于指定交互策略，这里显示的顺序是和提交日志显示顺序倒过来的。
        ``` text
        pick ac5fde9 add bbb.txt
        pick 43a9e16 update message

        # Rebase df036e9..43a9e16 onto df036e9 (2 commands)
        #
        # Commands:
        # p, pick <commit> = use commit //可以调整提交顺序进行重新排序提交
        # r, reword <commit> = use commit, but edit the commit message
        # e, edit <commit> = use commit, but stop for amending //可以重写提交信息
        # s, squash <commit> = use commit, but meld into previous commit // 压缩提交可以将多次提交合并重写提交
        # f, fixup <commit> = like "squash", but discard this commit's log message
        # x, exec <command> = run command (the rest of the line) using shell
        # d, drop <commit> = remove commit
        # l, label <label> = label current HEAD with a name
        # t, reset <label> = reset HEAD to a label
        # m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
        # .       create a merge commit using the original merge commit's
        # .       message (or the oneline, if no original merge commit was
        # .       specified). Use -c <commit> to reword the commit message.
        #
        # These lines can be re-ordered; they are executed from top to bottom.
        #
        # If you remove a line here THAT COMMIT WILL BE LOST.
        #
        #       However, if you remove everything, the rebase will be aborted.
        #
        #
        # Note that empty commits are commented out
        ```
    3. 我们这里需要保留原有的提交并进行提交记录的修改，上述的交互策略`r, reword`符合我们的选择。
        ``` text
        pick ac5fde9 add bbb.txt modify history commit message.
        #将我们需要修改的提交记录ac5fde9标记为`r`然后保存
        r 43a9e16 update message
        ```
    4. 上述交互策略编辑保存后会弹出修改提交信息的界面。
        ``` text
        add bbb.txt
        #修改为需要的提交日志.`#`表示注释行不显示在提交日志信息中
        modify history commit message.

        # Please enter the commit message for your changes. Lines starting
        # with '#' will be ignored, and an empty message aborts the commit.
        #
        # Date:      Mon Jul 20 20:23:48 2020 +0800
        #
        # interactive rebase in progress; onto df036e9
        # Last command done (1 command done):
        #    reword ac5fde9 add bbb.txt modify history commit message.
        # Next command to do (1 remaining command):
        #    pick 43a9e16 update message
        # You are currently editing a commit while rebasing branch 'master' on 'df036e9'.
        #
        # Changes to be committed:
        #       deleted:    aaa.txt
        ```
    5. 修改完成，保存即可自动完成历史提交信息的修改操作，修改结束再看下是否是我们需要的结果。
        ``` bash
        $ git log --abbrev-commit --oneline
            780a212 (HEAD -> master) update message
            # 可以看到历史提交信息已经修改
            9245a47 add bbb.txt modify history commit message.
            df036e9 asddsa
        ```

&emsp;&emsp;在上述的第三步，我们也可以选择`e, edit`交互策略，保存后通过我们可以自行选择后续的编辑操作。
``` text
Stopped at 9245a47...  add bbb.txt modify history commit message.
You can amend the commit now, with

git commit --amend

Once you are satisfied with your changes, run

git rebase --continue
```
&emsp;&emsp;可以使用`git commit --amend`修改提交日志的提交信息，修改保存后再执行`git rebase --continue`操作继续进行变基合并操作。

> [!NOTE]
> 1. 修改指定的提交记录的提交信息要基于其上一级的commit id进行变基操作。
> 2. 修改完成后，可以发现从变基点外的后的提交日志都重新生成新的`commit id`。

</details>
        
### 1.1.3. 合并连续的历史提交记录
&emsp;&emsp;将多条连续的历史提交信息合并为一条提交信息，`rebase -i`交互式变基除了可以修改历史提交信息外还可以合并多条提交信息为一条提交信息。

- **命令行操作**
    1. 查看历史提交日志
        ``` bash
        $ git log --pretty=oneline --abbrev-commit
            384cd0c (HEAD -> master) update -- 4
            4c9557f update -- 3
            eca99f1 update -- 2
            2e8b8ba update -- 1
            050108b add README.md
        ```
    2. 将`4c9557f`和`eca99f1`合并到`2e8b8ba`
        ``` bash
        #基于2e8b8ba的上一级提交050108b做交互式变基
        $ git rebase -i 050108b
        #修改变基策略为s, squash
            pick 2e8b8ba update -- 1
            # to combine
            s eca99f1 update -- 2
            # to combine
            s 4c9557f update -- 3
            pick 384cd0c update -- 4
            # Rebase 050108b..384cd0c onto 050108b (4 commands)
            #
            # Commands:
            # p, pick <commit> = use commit
            # r, reword <commit> = use commit, but edit the commit message
            # e, edit <commit> = use commit, but stop for amending
            # s, squash <commit> = use commit, but meld into previous commit
            # f, fixup <commit> = like "squash", but discard this commit's log message
            # x, exec <command> = run command (the rest of the line) using shell
            # d, drop <commit> = remove commit
            # l, label <label> = label current HEAD with a name
            # t, reset <label> = reset HEAD to a label
            # m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
            # .       create a merge commit using the original merge commit's
            # .       message (or the oneline, if no original merge commit was
            # .       specified). Use -c <commit> to reword the commit message.
            #
            # These lines can be re-ordered; they are executed from top to bottom.
            #
            # If you remove a line here THAT COMMIT WILL BE LOST.
            #
            # However, if you remove everything, the rebase will be aborted.
            #
            # Note that empty commits are commented out
            
        #保存变基策略修改提交信息
            # This is a combination of 3 commits.
            # This is the 1st commit message:
            合并提交`eca99f1`和`4c9557f`到`2e8b8ba`
            update -- 1

            # This is the commit message #2:

            update -- 2

            # This is the commit message #3:

            update -- 3

            # Please enter the commit message for your changes. Lines starting
            # with '#' will be ignored, and an empty message aborts the commit.
            #
            # Date:      Tue Jul 21 13:16:00 2020 +0800
            #
            # interactive rebase in progress; onto 050108b
            # Last commands done (3 commands done):
            #    squash eca99f1 update -- 2
            #    squash 4c9557f update -- 3
            # Next command to do (1 remaining command):
            #    pick 384cd0c update -- 4
            # You are currently rebasing branch 'master' on '050108b'.
            #
            # Changes to be committed:
            #       modified:   README.md
        # 保存完成合并操作并查看日志记录，可以看到历史提交记录已经重新生成
        $ git log --pretty=oneline --abbrev-commit
            091ce2e (HEAD -> master) update -- 4
            7895d75 合并提交`eca99f1`和`4c9557f`到`2e8b8ba` update -- 1
            050108b add README.md
        ```
        
    

### 1.1.4. 合并非连续的历史提交记录
&emsp;&emsp;将多条非连续的历史提交信息合并为一条提交信息。和[连续的历史提交记录](#1.1.3.%20合并连续的历史提交记录)，在变基策略中选择需要合并的提交记录置为`s, squash`即可。<br>
&emsp;&emsp;在交互式变基合并过程中可能涉及到冲突场景，只需要手动解决冲突继续执行合并操作即可。

## 1.2. 文件差异比较

### 1.2.1. 工作区和暂存区文件差异比较
&emsp;&emsp;暂存区的文件是准备进行提交的文件版本，比较当前工作区和暂存区（将要提交的文件快照）文件差异，可以使用`diff`。

- **比较暂存区和工作区文件差异**
    ``` bash
    #比较暂存去快照和工作区文件差异，如果需要比较指定文件或文件夹，直接在命令后追加文件路径即可
    git diff [file]
    ```
    

### 1.2.2. 暂存区和HEAD文件差异比较
&emsp;&emsp;暂存区是即将进行提交的文件快照，如果需要比较和当前版本库的具体差异可以使用`diff --cached`

``` bash
#比较暂存区和版本库的差异，如果需要比较指定文件或文件夹，直接在命令后追加文件路径即可
git diff --cached [file]
```
    

### 1.2.3. 基于指定的commit id进行文件差异比较
&emsp;&emsp;

## 1.3. 文件还原/版本回退

### 1.3.1. 清理工作区中未跟踪的文件/文件夹
&emsp;&emsp;有时候我们在工作区进行了某些文件/文件夹新增，如果需要批量删除可以通过`clean`命令进行操作。

- **常用操作选项**：`git clean +`
    | 选项 | 说明 |
    | :------------- | :------------- |
    | `-f`  | 清理当前工作区所有未跟踪(未受版本控制)的文件,不包含`.gitignore`等忽略的文件
    | `-fx` | 清理当前工作区所有未跟踪(未受版本控制)的文件,同时清理忽略的文件 |
    | `-fX` | 清理当前工作区`.gitignore`等忽略的文件，不清理其它未跟踪的文件 |
    | `-d`  | 清理当前工作区所有未跟踪(未受版本控制)的文件夹 |
    

### 1.3.2. 撤销暂存区中的文件记录
&emsp;&emsp;添加到暂存区的文件可以通过`reset HEAD -- [file]`命令进行撤销暂存，放回工作区中。

- 撤销暂存区快照
    ``` bash
    #撤销暂存区中的文件快照，如果需要撤销指定文件/文件夹，追加指定文件路径即可
    git reset HEAD -- [file]
    ```

> [!NOTE]
> 撤销暂存区快照，文件的变动内容仍然是存在的，仅仅将文件重新放回暂存区。

### 1.3.3. 还原工作区中的文件变动
&emsp;&emsp;有时候工作区的文件变动后，又想还原为暂存区状态或原来HEAD状态时的文件内容，这时候可以使用`checkout -- [file | .]`还原文件内容。

- **文件还原**
    ``` bash
    #撤销工作区的文件变动，还原到暂存区状态或HEAD状态
    git checkout -- [file | .]
    ```

### 1.3.4. 撤销文件提交记录并放回到工作区中
&emsp;&emsp;

### 1.3.5. 回退到指定的commit id提交记录

### 1.3.6. 查看指定区间日志/不同分支的日志
&emsp;&emsp;有时候需要查看分支两个提交记录之间的提交日志，或者查看不同分支之间的日志记录差异，可以使用`git log n1..n2`的命令操作。

- **查看不同版本或不同分支之间的提交日志差异**
    ``` bash
    #查看指定的倒数第四个和倒数第二个提交之间的提交记录
    git log HEAD~3..HEAD~1
    #查看develop分支存在，master分支不存在提交记录
    git log master..develop
    ```
    




## 1.4. 其它操作
### 1.4.1. 忽略指定文件不进行版本控制管理。
&emsp;&emsp;使用`git update-index`命令可以进行版本文件的管理。
``` bash
#忽略指定文件不进行版本控制管理。
git update-index --assume-unchanged <file>
#恢复文件的版本控制管理
git update-index --no-assume-unchanged <file>
```

### 1.4.2 彻底清理版本库中的文件
&emsp;&emsp;有时候一些敏感数据误提交或者一些不需要的大文件误提交到版本库，这时候我们可以通过`git rm ...`进行删除，但是历史版本库中的文件并没有被删除，这时候就需要额外的操作来彻底删除历史版本库中文件记录。

- **查看当前版本库中对象存储信息**
    ``` bash
    #查看对象占用看空间大小（这里是执行gc产生的相关pack-.git/objects/pack）
    git count-objects -v
        count: 437
        size: 180               // 松散对象占用存储大小
        in-pack: 25458
        packs: 1
        size-pack: 38725        // pack包占优势存储空间大小
        prune-packable: 0
        garbage: 0
        size-garbage: 0

    #清理压缩当前版本库中对象存储
    git gc
        Enumerating objects: 25458, done.                   // 累计存储对象总数（包括commit、tree、blog对象）
        Counting objects: 100% (25458/25458), done. 
        Delta compression using up to 4 threads
        Compressing objects: 100% (16127/16127), done.
        Writing objects: 100% (25458/25458), done.
        Total 25458 (delta 8228), reused 25458 (delta 8228)

    # 查看当前版本库中存储的对象
    git verify-pack -v .git/objects/pack/pack-d58c0d6489f7a388122a39303e64e10bbb656a6e.idx |sort -k 3 -n
        f893ea10910849f6826e33b846db164d001c884c blob   1703936 693652 21776960
        0a78f1b41908f7570be02a298eea20d035e1328f blob   1762010 353389 17100794
        8f597d0b740c342784b2662605f6a877efbb7ddf blob   2294784 875597 22999860
        46d6449a43a1ee0133669feb34865c96a4fc67e3 blob   3698626 3699746 33974512
    ```

- **清理缓存中的指定文件索引信息**
    ``` bash
    #查看文件提交记录
    git log --branches  --oneline --abbrev-commit -- node_modules/*
        50aae511 
        7f0f9d2d 
        22ed629b 
        5707f6b8 
        48065162 
        1a1009c5 
        
    #清理缓存区中的对象信息，基于1a1009c5上一个分支
    git filter-branch --index-filter 'git rm -r --ignore-unmatch --cached node_modules' --prune-empty -f -- 1a1009c5^..
    #删除.git/logs和.git/ref/original中的引用信息
    rm -rf .git/logs .git/ref/original
    git gc
    ```

### 1.4.3 删除版本库中历史提交的大文件

``` bash
git gc
# 排序查看版本库中现存的文件对象
git verify-pack -v .git/objects/pack/pack-307c76cf184b74cf924a6dfcec2c3a2b2892fdd5.idx |sort -k 3 -n|tail -10
    6f62bc0d9056525f391f1789757cac9d3eacb8d1 blob   1776262 1745633 126924497 1 37748e57e2fb0c29df1a95b62719f7dd65306784
    a66253aafedfdfd51b8c03aeb7e88692cb5f9108 blob   1789814 1750575 87561020 1 84ccb4e212f7d01e12f7e67fa4e051b884d8a553
    37748e57e2fb0c29df1a95b62719f7dd65306784 blob   38258322 37612902 89311595
    84ccb4e212f7d01e12f7e67fa4e051b884d8a553 blob   79634975 74100130 13460890

# 找到大文件 84ccb4e212f7d01e12f7e67fa4e051b884d8a553 79634975 单位字节 对应的文件路径
git rev-list --objects --all |grep 84ccb4e212f7d01e12f7e67fa4e051b884d8a553
    84ccb4e212f7d01e12f7e67fa4e051b884d8a553 target/app.jar
# 查看文件提交记录
git log --branches  --oneline --abbrev-commit -- target/*
    9ae3542 update
    ce97b73 update.
    afaedcf up
    e48dc52 add
# 后续操作同上一章节
git filter-branch --force --index-filter 'git rm -r --ignore-unmatch --cached target' --prune-empty
# 回收空间
rm -rf .git/logs .git/refs/original
git for-each-ref --format='delete %(refname)' refs/original |git update-ref --stdin
git reflog expire --expire=now --all
git prune --expire now
git gc --aggressive --prune=now
# 推送到远程
git push --force
# 重新拉取项目即可
```


    



<!-- 资源链接 -->
[git-logo]: /docs/assets/images/git-logo.png 'git logo'
    