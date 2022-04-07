# 数据结构

## 概述

?> 数据结构是计算机中对数据的一种存储和组织方式，同时也泛指相互之间存在一种或多种特定关系的数据的集合。
一个数据结构是由数据元素依据某种逻辑联系组织起来的，对数据元素间逻辑关系的描述称为数据的逻辑结构。

- 数据结构的组成

  - 数据（Data）

  ?> 数据是信息的载体，其能够被计算机识别、存储和加工处理，是计算机程序加工的“原材料”

  - 数据元素（Data Element）

  - 数据结构（Data Structure）

  ?> 数据结构指的是数据之间的相互关系，即数据的组织形式

## 树

![](/assets/images/data-struct-basic/20220320154644.png ':class=center :size=40%')

?> 树（Tree）结构是一种描述非线性层次关系的数据结构。
树是 n 个数据节点的集合，在该集合中包含一个根节点，根节点之下分布着一些互不交叉的子集合，这些子集合是根节点的子树。

- 概念术语

  - 节点：表示树中的元素，包括数据项及若干指向其子树的分支。
  - **节点的度**：一个节点所包含子树的数量
  - 树的度：是指该树所有节点中最大的度
  - 分支节点：度不为 0 的节点称为分支节点，或者称为非终端节点。一棵树的节点除叶子节点外，其余的都是分支节点。
  - 叶子节点：度为 0 的节点称为叶子节点，或者称为终端节点。
  - 父节点和子节点：每个节点子树的根称为该节点的子节点，相应的，该节点称为其子节点的父节点
  - 兄弟节点：具有同一父节点的节点称为兄弟节点
  - 节点的层数：节点的层数从树根开始计算，根节点为第 1 层、依次向下为第 2
  - **树的深度**：树中节点的最大层数称为树的深度
  - 有序树：若树中各节点的子树（兄弟节点）是按一定次序从左向右排列的，称为有序树
  - 无序树：若树中各节点的子树（兄弟节点）未按一定次序排列，称为无序树
  - 森林（forest）：n（n>0）棵互不相交的树的集合

- 基本特性

?> 在一个树结构中，有且仅有一个节点没有直接前驱，这个节点就是树的根节点，除根节点外，其余每个节点有且仅有一个直接前驱，每个节点可以有任意多个直接后继。

### 二叉树

![](/assets/images/data-struct-basic/20220320155253.png ':class=center :size=40%')

?> 二叉树是所有树结构的基础，每个节点最多有两个子树的树结构。
二叉树的子树仍然是二叉树。二叉树的一个节点上对应的两个子树分别称为左子树和右子树。由于子树有左右之分，因此二叉树是有序树。

- 基本特性

  1. 第 n 层上节点数最多为 2<sup>(n-1)</sup>;
  2. 深度为 k 的二叉树节点总数最多为 2<sup>k</sup>-1;
  3. 节点总数为 n 的二叉树的深度至少为 log<sub>2</sub>(n+1)；
  4. 叶子节点(终端节点)个数 n<sub>0</sub>，度数为 2 的节点个数 n<sub>2</sub>之间的关系满足 n<sub>0</sub>=n<sub>2</sub>+1；

  ?> 一个二叉树中根据节点的度可以分为 0 度节点(终端节点)总数为 n<sub>0</sub>，1 度节点总数为 n<sub>1</sub>，2 度节点总数为 n<sub>2</sub>，总节点个数为 n=n<sub>0</sub>+n<sub>1</sub>+n<sub>2</sub>；
  其中 0 度节点没有孩子节点，1 度节点有 1 个孩子节点，2 度节点有 2 个孩子节点，根节点不是任何节点的孩子节点，故总节点数：n=n<sub>1</sub>+2n<sub>2</sub>+1；
  综合上述：n=n<sub>1</sub>+2n<sub>2</sub>+1=n<sub>0</sub>+n<sub>1</sub>+n<sub>2</sub>；可以得出：n<sub>2</sub>=n<sub>0</sub>+1；

### 二叉查找树 BST

![](/assets/images/data-struct-basic/20220320162527.png ':class=center :size=40%')

?> 二叉查找树(Binary Search Tree)，又被称为二叉搜索树。

- 定义
  - 若左子树不空，则左子树上所有节点的值均小于它的根节点的值；
  - 若右子树不空，则右子树上所有节点的值均大于它的根节点的值；
  - 左、右子树也分别为二叉排序树；
  - 没有键值相等的节点。

### 自平衡二叉查找树 AVL

?> 首先 AVL 是个二叉查找树，因此满足二叉查找树的定义和特性，其次在 AVL 中任何节点的两个子树的高度最大差别为1，所以它也被称为高度平衡树。
当插入或者删除节点之后，若AVL树的条件被破坏，则需要进行旋转操作来调整数据的结构以恢复AVL条件。
AVL树，本质上是带了平衡功能的二叉查找树（二叉排序树，二叉搜索树）。

- 旋转平衡处理
    - 单向右旋平衡处理LL：由于在a的左子树根节点的左子树上插入节点，a的平衡因子由1增至2，致使以*a为根的子树失去平衡，则需进行一次右旋转操作；
    - 单向左旋平衡处理RR：由于在a的右子树根节点的右子树上插入节点，a的平衡因子由-1变为-2，致使以*a为根的子树失去平衡，则需进行一次左旋转操作；
    - 双向旋转（先左后右）平衡处理LR：由于在a的左子树根节点的右子树上插入节点，a的平衡因子由1增至2，致使以*a为根的子树失去平衡，则需进行两次旋转（先左旋后右旋）操作。
    - 双向旋转（先右后左）平衡处理RL：由于在a的右子树根节点的左子树上插入节点，a的平衡因子由-1变为-2，致使以*a为根的子树失去平衡，则需进行两次旋转（先右旋后左旋）操作。


### 红黑树

?> 红黑树（Red Black Tree） 是一种自平衡二叉查找树，满足以下条件。

1. 节点是红色或黑色。
2. 根节点是黑色。
3. 每个叶子节点都是黑色的空节点（NIL节点）。
4. 每个红色节点的两个子节点都是黑色。(从每个叶子到根的所有路径上不能有两个连续的红色节点)
5. 从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。

!> 这些特性使得红黑树中从根节点到叶子节点的最长路径不会超过最短路径的两倍。
红黑树通过变色、左旋和右旋来保持平衡，任何不平衡都会在三次旋转之内解决

### B-树

![](/assets/images/data-struct-basic/20220320170545.png ':class=center :size=40%')

?> B-tree 又叫平衡多路查找树，通过重新组织节点， 降低了树的高度。

- 概念术语
    - B树的阶：节点的最多子节点个数。

一个m阶的B树具有如下几个特征：
1. 根节点至少有两个子节点。
2. 每个中间节点都包含k-1个元素和k个孩子，其中 m/2 <= k <= m
3. 每一个叶子节点都包含k-1个元素，其中 m/2 <= k <= m
4. 所有的叶子节点都位于同一层。
5. 每个节点中的元素从小到大排列，节点当中k-1个元素正好是k个孩子包含的元素的值域分划。

- 应用场景
    - 磁盘文件存储系统
    - 数据库系统

### B+树

![](/assets/images/data-struct-basic/20220320173801.png ':class=center :size=40%')

?> B+树是基于B-树的一种变体，有着比B-树更高的查询性能。

一个m阶的B+树具有如下几个特征：
1. 有k个子树的中间节点包含有k个元素（B树中是k-1个元素），每个元素不保存数据，只用来索引，所有数据
都保存在叶子节点。
2. 所有的叶子节点中包含了全部元素的信息，及指向含这些元素记录的指针，且叶子节点本身依关键字的大小
自小而大顺序链接。
3. 所有的中间节点元素都同时存在于子节点，在子节点元素中是最大（或最小）元素。

B+树的优势：
1. 单一节点存储更多的元素，使得查询的IO次数更少。
2. 所有查询都要查找到叶子节点，查询性能稳定。
3. 所有叶子节点形成有序链表，便于范围查询。

### 字典树

?> 又称单词查找树，Trie树，是一种树形结构，是一种哈希树的变形。典型应用是用于统计，排序和保存大量的字符串，所以经常被搜索引擎系统用于文本词频统计。它的优点是利用最大公共前缀来减少查询时间，最大限度地减少无谓的字符串比较，查询效率比哈希表高。

- 性质
    - 根节点不包含字符，除根节点以外的每一个节点都只包含一个字符；
    - 从根节点到某一节点，路径上经过的字符串连接起来，为该节点对应的字符串；
    - 每个节点的所有子节点包含的字符都不相同。

- 实现方法
    - 从根节点开始一次搜索；
    - 取得要查找关键词的第一个字母，并根据该字母选择对应的子树继续进行检索；
    - 在相应的子树上，取得要查找关键词的第二个字母，并进一步选择对应的子树进行检索
    - 迭代下去
    - 在某个结点处，关键词的所在字母已被取出，则读取附在该结点上的信息，即完成查找。

## 跳表