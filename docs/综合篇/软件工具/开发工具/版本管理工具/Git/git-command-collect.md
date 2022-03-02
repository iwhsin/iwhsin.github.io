# Git 命令行使用

## 工作区状态查看
&emsp;&emsp;`git status`是我们常用的命令用来查看当前工作区状态，包括`暂存区状态`、`工作现场`、`文件变动`以及`未跟踪的文件`等。

- **命令选项**
    ``` text
    usage: git status [<options>] [--] <pathspec>...
        -v, --verbose         be verbose
        -s, --short           show status concisely
        -b, --branch          show branch information
        --show-stash          show stash information
        --ahead-behind        compute full ahead/behind values
        --porcelain[=<version>]
                            machine-readable output
        --long                show status in long format (default)
        -z, --null            terminate entries with NUL
        -u, --untracked-files[=<mode>]
                            show untracked files, optional modes: all, normal, no. (Default: all)
        --ignored[=<mode>]    show ignored files, optional modes: traditional, matching, no. (Default: traditional)
        --ignore-submodules[=<when>]
                            ignore changes to submodules, optional when: all, dirty, untracked. (Default: all)
        --column[=<style>]    list untracked files in columns
        --no-renames          do not detect renames
        -M, --find-renames[=<n>]
                            detect renames, optionally set similarity index
        --show-ignored-directory
                            (DEPRECATED: use --ignore=matching instead) Only show directories that match an ignore pattern name.
        --no-lock-index       (DEPRECATED: use `git --no-optional-locks status` instead) Do not lock the index
    ```

- **常用参数选项说明**：`git status +`
| 选项 | 说明 |
| :------------- | :------------- |
| `-s | --short`                    | 显示简明的状态信息<br>新增未跟踪的文件标记为`??`<br>新增添加到暂存区的文件标记为`A`<br>已修改的文件标记为`M` |
| `--show-stash`                    | 显示工作现场状态提示信息 |
| `-u, --untracked-files[=<mode>]`  | 显示工作区未受版本控制的文件，默认为显示，可以指定为`--u=no`不显示未跟踪的文件    | 
| `--show-ignored-directory `       | 显示工作区忽略的文件  |


## 分支合并操作
&emsp;&emsp;在进行版本管理过程中，经常需要将不同版本的提交记录合并到指定的分支，常用的命令`git merge`。

- **命令选项**
    ``` bash
    usage: git merge [<options>] [<commit>...]
    or: git merge --abort
    or: git merge --continue

        -n                    do not show a diffstat at the end of the merge
        --stat                show a diffstat at the end of the merge
        --summary             (synonym to --stat)
        --log[=<n>]           add (at most <n>) entries from shortlog to merge commit message
        --squash              create a single commit instead of doing a merge   // 合并指定分支上的提交记录到当前分支并暂存，不影响当前分支的提交记录，可以通过自行提交生成一条新的提交
        --commit              perform a commit if the merge succeeds (default)
        -e, --edit            edit message before committing
        --ff                  allow fast-forward (default)
        --ff-only             abort if fast-forward is not possible
        --rerere-autoupdate   update the index with reused conflict resolution if possible
        --verify-signatures   verify that the named commit has a valid GPG signature
        -s, --strategy <strategy>
                            merge strategy to use
        -X, --strategy-option <option=value>
                            option for selected merge strategy
        -m, --message <message>
                            merge commit message (for a non-fast-forward merge)
        -v, --verbose         be more verbose
        -q, --quiet           be more quiet
        --abort               abort the current in-progress merge
        --continue            continue the current in-progress merge
        --allow-unrelated-histories
                            allow merging unrelated histories
        --progress            force progress reporting
        -S, --gpg-sign[=<key-id>]
                            GPG sign commit
        --overwrite-ignore    update ignored files (default)
        --signoff             add Signed-off-by:
        --verify              verify commit-msg hook
    ```

- **常用参数选项说明**：`git merge +`
| 选项 | 说明 |
| :------------- | :------------- |
|[origin/branchName | branchName] [-m 'commit message'] | 合并指定的远程仓库分支或本地分支到当前分支.带上-m表示生成一条新的提交记录 |
| --ff          |  快速合并，这个是默认的参数，合并若有冲突则提交解决冲突  |
| --ff-only     | 快速合并，合并若有冲突则终止合并操作`--abort`     |
| --no-ff       | 不使用快速合并,会生成一次新的提交记录,建议使用,这样会清晰显示分支提交记录,查看分支合并状态 |
| --squash      | 合并指定分支上的提交记录到当前分支并暂存，不影响当前分支的提交记录，可以通过自行提交生成一条新的提交 |

## Git工作流
&emsp;&emsp;`git flow`规范了Git的使用规范。

- **常用命令操作**
```
usage: git flow <subcommand>
Available subcommands are:
   init      Initialize a new git repo with support for the branching model.        //  初始化当前版本库支持Flow分支模型
   feature   Manage your feature branches.                                          //  feature分支管理
   bugfix    Manage your bugfix branches.                                           //  bugfix分支管理
   release   Manage your release branches.                                          //  release分支管理
   hotfix    Manage your hotfix branches.                                           //  hotfix分支管理
   support   Manage your support branches.                                          //  support分支管理
   version   Shows version information.                                             //  version
   config    Manage your git-flow configuration.                                    //  flow 配置
   log       Show log deviating from base branch.                                   // 查看当前分支和基础分支(master)之间提交记录差异(当前分支存在的计较记录,master不存在)
Try 'git flow <subcommand> help' for details.
```

- **分支管理操作**
&emsp;&emsp;这里以`feature`分支作为示例。<br>
```
usage: git flow feature [list]      //  列出当前feature分支
   or: git flow feature start       //  在当前开发分支(develop)的基础上(HEAD)创建一个新的feature分支
   or: git flow feature finish      //  将当前分支合并到develop分支并删除当前分支
   or: git flow feature publish     //  将当前feature分支推送到远程Git仓库
   or: git flow feature track       //  跟踪远程仓库指定的feature分支(检出当前远程)
   or: git flow feature diff        //  查看feature分支和develop之间的差异详情
   or: git flow feature rebase
   or: git flow feature checkout
   or: git flow feature pull
   or: git flow feature delete
```

## 打包备份
```
master ^origin/master
origin/master..master
本地有 远程没有
git bundle create commits.bundle master ^9a466c5
git fetch ../commits.bundle master:other-master
```


## 其它命令

- ls-tree
- cat-file