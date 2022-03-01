# 1. 统一编码方案-Unicode
&emsp;&emsp;`Unicode`是一种全球文字统一的编码方案，是为了解决传统的字符编码方案的局限而产生的，它把世界上的各种文字的每一个字符指定了统一并且唯一的二进制编码表示，以满足跨语种、跨平台进行文本交换、处理的需求。

- 编码实现：`Unicode`是一种统一的编码方案，主要的编码实现有`UTF-8`、`UTF-16`、`UTF-32`三种实现方式。
    - `UTF-8`：占用1到4个字节；
    - `UTF-16`：占用2到4个字节；
    - `UTF-32`：占用4个字节；

## 1.1. 编码分布
&emsp;&emsp;Unicode共分为了十七个平面`\u000000`~`\u10FFFFF`，每个平面范围内都有`65535`个字符，常用的字符都分布在第0平面也就是`BMP`基本多文种平面。

### 1.1.1. BMP编码分布
&emsp;&emsp;Unicode字符中常用的字符都分布在第0平面也就是`BMP`基本多文种平面。

| 编码范围 | 字符描述 | 备注 |
| ---- | ---- | ---- |
| 0000-007F | C0控制符及基本拉丁文 (C0 Control and Basic Latin)                     | 0~127     |
| 0080-00FF | C1控制符及拉丁文补充-1 (C1 Control and Latin 1 Supplement)            | 128~255   |
| 0100-017F | 拉丁文扩展-A (Latin Extended-A) |
| 0180-024F | 拉丁文扩展-B (Latin Extended-B) |
| 0250-02AF | 国际音标扩展 (IPA Extensions) |
| 02B0-02FF | 空白修饰字母 (Spacing Modifiers) |
| 0300-036F | 结合用读音符号 (Combining Diacritics Marks) |
| 0370-03FF | 希腊文及科普特文 (Greek and Coptic) |
| 0400-04FF | 西里尔字母(Cyrillic) |
| 0500-052F | 西里尔字母补充 (Cyrillic Supplement) |
| 0530-058F | 亚美尼亚语 (Armenian) |
| 0590-05FF | 希伯来文 (Hebrew) |
| 0600-06FF | 阿拉伯文 (Arabic) |
| 0700-074F | 叙利亚文 (Syriac) |
| 0750-077F | 阿拉伯文补充 (Arabic Supplement) |
| 0780-07BF | 它拿字母 (Thaana) |
| 07C0-07FF | 西非书面语言 (N'Ko) |
| 0800-085F | 阿维斯塔语及巴列维语(Avestan and Pahlavi) |
| 0860-087F | 曼达文字 (Mandaic) |
| 0880-08AF | 撒马利亚语 (Samaritan) |
| 0900-097F | 天城文 (Devanagari) |
| 0980-09FF | 孟加拉语 (Bengali) |
| 0A00-0A7F | 锡克教文 (Gurmukhi) |
| 0A80-0AFF | 古吉拉特文 (Gujarati) |
| 0B00-0B7F | 奥里亚文 (Oriya) |
| 0B80-0BFF | 泰米尔文 (Tamil) |
| 0C00-0C7F | 泰卢固文 (Telugu) |
| 0C80-0CFF | 卡纳达文 (Kannada) |
| 0D00-0D7F | 德拉维族语 (Malayalam) |
| 0D80-0DFF | 僧伽罗语 (Sinhala) |
| 0E00-0E7F | 泰文 (Thai) |
| 0E80-0EFF | 老挝文 (Lao) |
| 0F00-0FFF | 藏文 (Tibetan) |
| 1000-109F | 缅甸语 (Myanmar) |
| 10A0-10FF | 格鲁吉亚语(Georgian) |
| 1100-11FF | 朝鲜文 (Hangul Jamo) |
| 1200-137F | 埃塞俄比亚语 (Ethiopic) |
| 1380-139F | 埃塞俄比亚语补充 (Ethiopic Supplement) |
| 13A0-13FF | 切罗基语 (Cherokee) |
| 1400-167F | 统一加拿大土著语音节 (Unified Canadian Aboriginal Syllabics) |
| 1680-169F | 欧甘字母 (Ogham) |
| 16A0-16FF | 如尼文 (Runic) |
| 1700-171F | 塔加拉语 (Tagalog) |
| 1720-173F | 哈努诺文 (Hanunóo) |
| 1740-175F | 布希德文 (Buhid) |
| 1760-177F | 塔格班瓦文 (Tagbanwa) |
| 1780-17FF | 高棉语 (Khmer) |
| 1800-18AF | 蒙古文 (Mongolian) |
| 18B0-18FF | 加拿大原住民音节文字扩展 (Unified Canadian Aboriginal Syllabics Extended) |
| 1900-194F | 林布文 (Limbu) |
| 1950-197F | 德宏泰语 (Tai Le) |
| 1980-19DF | 新傣仂语 (New Tai Lue) |
| 19E0-19FF | 高棉语记号 (Kmer Symbols) |
| 1A00-1A1F | 布吉文 (Buginese) |
| 1A20-1AAF | 老傣文 (Tai Tham) |
| 1AB0-1AFF | 组合变音标记扩展 (Combining Diacritical Marks Extended) |
| 1B00-1B7F | 巴厘语 (Balinese) |
| 1B80-1BB0 | 巽他语 (Sundanese) |
| 1BC0-1BFF | 巴塔克文 (Batak) |
| 1C00-1C4F | 雷布查语(Lepcha) |
| 1C50-1C7F | 桑塔利文(Ol Chiki) |
| 1C80-1CDF | 曼尼普尔语(Meithei/Manipuri) |
| 1D00-1D7F | 音标扩展 (Phonetic Extensions) |
| 1D80-1DBF | 音标扩展补充 (Phonetic Extensions Supplement) |
| 1DC0-1DFF | 结合附加符号补充 (Combining Diacritics Marks Supplement) |
| 1E00-1EFF | 拉丁文扩充附加 (Latin Extended Additional) |
| 1F00-1FFF | 希腊语扩充 (Greek Extended) |
| 2000-206F | 常用标点(General Punctuation) |
| 2070-209F | 上标及下标 (Superscripts and Subscripts) |
| 20A0-20CF | 货币符号 (Currency Symbols) |
| 20D0-20FF | 组合用记号 (Combining Diacritics Marks for Symbols) |
| 2100-214F | 字母式符号 (Letterlike Symbols) |
| 2150-218F | 数字形式 (Number Form) |
| 2190-21FF | 箭头 (Arrows) |
| 2200-22FF | 数学运算符 (Mathematical Operator) |
| 2300-23FF | 杂项工业符号 (Miscellaneous Technical) |
| 2400-243F | 控制图片 (Control Pictures) |
| 2440-245F | 光学识别符 (Optical Character Recognition) |
| 2460-24FF | 封闭式字母数字 (Enclosed Alphanumerics) |
| 2500-257F | 制表符 (Box Drawing) |
| 2580-259F | 方块元素 (Block Element) |
| 25A0-25FF | 几何图形 (Geometric Shapes) |
| 2600-26FF | 杂项符号 (Miscellaneous Symbols) |
| 2700-27BF | 印刷符号 (Dingbats) |
| 27C0-27EF | 杂项数学符号-A (Miscellaneous Mathematical Symbols-A) |
| 27F0-27FF | 追加箭头-A (Supplemental Arrows-A) |
| 2800-28FF | 盲文点字模型 (Braille Patterns) |
| 2900-297F | 追加箭头-B (Supplemental Arrows-B) |
| 2980-29FF | 杂项数学符号-B (Miscellaneous Mathematical Symbols-B) |
| 2A00-2AFF | 追加数学运算符 (Supplemental Mathematical Operator) |
| 2B00-2BFF | 杂项符号和箭头 (Miscellaneous Symbols and Arrows) |
| 2C00-2C5F | 格拉哥里字母(Glagolitic) |
| 2C60-2C7F | 拉丁文扩展-C (Latin Extended-C) |
| 2C80-2CFF | 科普特语 (Coptic) |
| 2D00-2D2F | 格鲁吉亚语补充 (Georgian Supplement) |
| 2D30-2D7F | 提非纳文 (Tifinagh) |
| 2D80-2DDF | 埃塞俄比亚语扩展 (Ethiopic Extended) |
| 2E00-2E7F | 追加标点 (Supplemental Punctuation) |
| 2E80-2EFF | CJK 部首补充 (CJK Radicals Supplement) |
| 2F00-2FDF | 康熙字典部首 (Kangxi Radicals) |
| 2FF0-2FFF | 表意文字描述符 (Ideographic Description Characters) |
| 3000-303F | CJK 符号和标点 (CJK Symbols and Punctuation) |
| 3040-309F | 日文平假名 (Hiragana) |
| 30A0-30FF | 日文片假名 (Katakana) |
| 3100-312F | 注音字母 (Bopomofo) |
| 3130-318F | 朝鲜文兼容字母 (Hangul Compatibility Jamo) |
| 3190-319F | 象形字注释标志 (Kanbun) |
| 31A0-31BF | 注音字母扩展 (Bopomofo Extended) |
| 31C0-31EF | CJK 笔画 (CJK Strokes) |
| 31F0-31FF | 日文片假名语音扩展 (Katakana Phonetic Extensions) |
| 3200-32FF | 封闭式 CJK 文字和月份 (Enclosed CJK Letters and Months) |
| 3300-33FF | CJK 兼容 (CJK Compatibility) |
| 3400-4DBF | CJK 统一表意符号扩展 A (CJK Unified Ideographs Extension A) |
| 4DC0-4DFF | 易经六十四卦符号 (Yijing Hexagrams Symbols) |
| <b style='color:red'>4E00-9FBF</b> | <b style='color:red'>中文范围：</b>CJK 统一表意符号 (CJK Unified Ideographs) |
| A000-A48F | 彝文音节 (Yi Syllables) |
| A490-A4CF | 彝文字根 (Yi Radicals) |
| A4D0-A4FF | 老傈僳文 (Lisu) |
| A500-A63F | 瓦伊语 (Vai) |
| A660-A6FF | 统一加拿大土著语音节补充 (Unified Canadian Aboriginal Syllabics Supplement) |
| A700-A71F | 声调修饰字母 (Modifier Tone Letters) |
| A720-A7FF | 拉丁文扩展-D (Latin Extended-D) |
| A800-A82F | 锡尔赫特文 (Syloti Nagri) |
| A840-A87F | 八思巴字 (Phags-pa) |
| A880-A8DF | 索拉什特拉文 (Saurashtra) |
| A8E0-A8FF | 天城文扩展 (Devanagari Extended) |
| A900-A92F | 克耶里字母 (Kayah Li) |
| A930-A95F | 勒姜字母 (Rejang) |
| A960-A97F | 谚文扩展-A (Hangul Jamo Extended-A) |
| A980-A9DF | 爪哇语 (Javanese) |
| A9E0-A9FF | 缅甸文扩展-B (Myanmar Extended-B) |
| AA00-AA5F | 占语字母 (Cham) |
| AA60-AA7F | 缅甸文扩展-A (Myanmar Extended-A) |
| AA80-AADF | 越南傣文 (Tai Viet) |
| AAE0-AAFF | 曼尼普尔文扩展 (Meetei Mayek Extensions) |
| AB00-AB2F | 埃塞俄比亚语字母扩展-A (Ethiopic Extended-A) |
| AB30-AB6F | 拉丁文扩展-E (Latin Extended-E) |
| AB70-ABBF | 切罗基语补充 (Cherokee Supplement) |
| ABC0-ABFF | 曼尼普尔文 (Meetei Mayek) |
| AC00-D7AF | 朝鲜文音节 (Hangul Syllables) |
| D800-DB7F | 高位替代字符 (High Surrogates) |
| DB80-DBFF | 高位专用替代字符 (High Private Use Surrogates) |
| DC00-DFFF | 低位替代字符 (Low Surrogates) |
| E000-F8FF | 私用区 (Private Use Zone) |
| F900-FAFF | CJK 兼容象形文字 (CJK Compatibility Ideographs) |
| FB00-FB4F | 字母表达形式 (Alphabetic Presentation Form) |
| FB50-FDFF | 阿拉伯表达形式A (Arabic Presentation Form-A) |
| FE00-FE0F | 变量选择符 (Variation Selector) |
| FE10-FE1F | 竖排形式 (Vertical Forms) |
| FE20-FE2F | 组合用半符号 (Combining Half Marks) |
| FE30-FE4F | CJK 兼容形式 (CJK Compatibility Forms) |
| FE50-FE6F | 小型变体形式 (Small Form Variants) |
| FE70-FEFF | 阿拉伯表达形式B (Arabic Presentation Form-B) |
| FF00-FFEF | 半型及全型形式 (Halfwidth and Fullwidth Form) |
| FFF0-FFFF | 特殊 (Specials) |

### 1.1.2. ASCII 控制字符
&emsp;&emsp;ASCII 字符中第 0 ～ 32 号及第 127 号(共 34 个)是控制字符或通讯专用字符，如控制符：LF（换行）、CR（回车）、FF（换页）、DEL（删除）、BEL（振铃）等；通讯专用字符：SOH（文头）、EOT（文尾）、ACK（确认）等。
| 二进制 | 十进制 | 十六进制 | 缩写 | 可以显示的表示法 | 名称/意义 |
| -------- | ------ | -------- | ---- | ---------------- | ----------------------------------- |
| 00000000 | 0 | 00 | NUL | ␀ | 空字符（Null） |
| 00000001 | 1 | 01 | SOH | ␁ | 标题开始 |
| 00000010 | 2 | 02 | STX | ␂ | 本文开始 |
| 00000011 | 3 | 03 | ETX | ␃ | 本文结束 |
| 00000100 | 4 | 04 | EOT | ␄ | 传输结束 |
| 00000101 | 5 | 05 | ENQ | ␅ | 请求 |
| 00000110 | 6 | 06 | ACK | ␆ | 确认回应 |
| 00000111 | 7 | 07 | BEL | ␇ | 响铃 |
| 00001000 | 8 | 08 | BS | ␈ | 退格 |
| 00001001 | 9 | 09 | HT | ␉ | 水平定位符号 |
| 00001010 | 10 | 0A | LF | ␊ | 换行键 |
| 00001011 | 11 | 0B | VT | ␋ | 垂直定位符号 |
| 00001100 | 12 | 0C | FF | ␌ | 换页键 |
| 00001101 | 13 | 0D | CR | ␍ | 归位键 |
| 00001110 | 14 | 0E | SO | ␎ | 取消变换（Shift out） |
| 00001111 | 15 | 0F | SI | ␏ | 启用变换（Shift in） |
| 00010000 | 16 | 10 | DLE | ␐ | 跳出数据通讯 |
| 00010001 | 17 | 11 | DC1 | ␑ | 设备控制一（XON 启用软件速度控制） |
| 00010010 | 18 | 12 | DC2 | ␒ | 设备控制二 |
| 00010011 | 19 | 13 | DC3 | ␓ | 设备控制三（XOFF 停用软件速度控制） |
| 00010100 | 20 | 14 | DC4 | ␔ | 设备控制四 |
| 00010101 | 21 | 15 | NAK | ␕ | 确认失败回应 |
| 00010110 | 22 | 16 | SYN | ␖ | 同步用暂停 |
| 00010111 | 23 | 17 | ETB | ␗ | 区块传输结束 |
| 00011000 | 24 | 18 | CAN | ␘ | 取消 |
| 00011001 | 25 | 19 | EM | ␙ | 连接介质中断 |
| 00011010 | 26 | 1A | SUB | ␚ | 替换 |
| 00011011 | 27 | 1B | ESC | ␛ | 跳出 |
| 00011100 | 28 | 1C | FS | ␜ | 文件分割符 |
| 00011101 | 29 | 1D | GS | ␝ | 组群分隔符 |
| 00011110 | 30 | 1E | RS | ␞ | 记录分隔符 |
| 00011111 | 31 | 1F | US | ␟ | 单元分隔符 |
| 01111111 | 127 | 7F | DEL | ␡ | 删除 |

&emsp;&emsp;第 33 ～ 126 号(共 94 个)是字符，其中第 48 ～ 57 号为 0 ～ 9 十个阿拉伯数字；65 ～ 90 号为 26 个大写英文字母，97 ～ 122 号为 26 个小写英文字母，其余为一些标点符号、运算符号等。

- **特殊符号(标点符号、运算符等)**
  | 二进制 | 八进制 | 十进制 | 十六进制 | 缩写 | 名称/意义 |
  | --------- | ------ | ------ | -------- | ------- | ------------ |
  | 0010 0000 | 040 | 32 | 0x20 | (space) | 空格 |
  | 0010 0001 | 041 | 33 | 0x21 | ! | 叹号 |
  | 0010 0010 | 042 | 34 | 0x22 | " | 双引号 |
  | 0010 0011 | 043 | 35 | 0x23 | # | 井号 |
  | 0010 0100 | 044 | 36 | 0x24 | $ | 美元符 |
  | 0010 0101 | 045 | 37 | 0x25 | % | 百分号 |
  | 0010 0110 | 046 | 38 | 0x26 | \& | 和号 |
  | 0010 0111 | 047 | 39 | 0x27 | ' | 闭单引号 |
  | 0010 1000 | 050 | 40 | 0x28 | ( | 开括号 |
  | 0010 1001 | 051 | 41 | 0x29 | ) | 闭括号 |
  | 0010 1010 | 052 | 42 | 0x2A | \* | 星号 |
  | 0010 1011 | 053 | 43 | 0x2B | + | 加号 |
  | 0010 1100 | 054 | 44 | 0x2C | , | 逗号 |
  | 0010 1101 | 055 | 45 | 0x2D | - | 减号/破折号 |
  | 0010 1110 | 056 | 46 | 0x2E | . | 句号 |
  | 0010 1111 | 057 | 47 | 0x2F | / | 斜杠 |
  | 0011 1010 | 072 | 58 | 0x3A | : | 冒号 |
  | 0011 1011 | 073 | 59 | 0x3B | ; | 分号 |
  | 0011 1100 | 074 | 60 | 0x3C | \< | 小于 |
  | 0011 1101 | 075 | 61 | 0x3D | = | 等号 |
  | 0011 1110 | 076 | 62 | 0x3E | \> | 大于 |
  | 0011 1111 | 077 | 63 | 0x3F | ? | 问号 |
  | 0100 0000 | 0100 | 64 | 0x40 | @ | 电子邮件符号 |
  | 0101 1011 | 0133 | 91 | 0x5B | [ | 开方括号 |
  | 0101 1100 | 0134 | 92 | 0x5C | \\ | 反斜杠 |
  | 0101 1101 | 0135 | 93 | 0x5D | ] | 闭方括号 |
  | 0101 1110 | 0136 | 94 | 0x5E | ^ | 脱字符 |
  | 0101 1111 | 0137 | 95 | 0x5F | \_ | 下划线 |
  | 0110 0000 | 0140 | 96 | 0x60 | ` | 开单引号 |
  | 0111 1011 | 0173 | 123 | 0x7B | { | 开花括号 |
  | 0111 1100 | 0174 | 124 | 0x7C | \| | 垂线 |
  | 0111 1101 | 0175 | 125 | 0x7D | } | 闭花括号 |
  | 0111 1110 | 0176 | 126 | 0x7E | ~ | 波浪号 |

- **阿拉伯数字**
  | 二进制 | 八进制 | 十进制 | 十六进制 | 缩写 | 名称/意义 |
  | --------- | ------ | ------ | -------- | ------- | ------------ |
  | 0011 0000 | 060 | 48 | 0x30 | 0 | 字符 0 |
  | 0011 0001 | 061 | 49 | 0x31 | 1 | 字符 1 |
  | 0011 0010 | 062 | 50 | 0x32 | 2 | 字符 2 |
  | 0011 0011 | 063 | 51 | 0x33 | 3 | 字符 3 |
  | 0011 0100 | 064 | 52 | 0x34 | 4 | 字符 4 |
  | 0011 0101 | 065 | 53 | 0x35 | 5 | 字符 5 |
  | 0011 0110 | 066 | 54 | 0x36 | 6 | 字符 6 |
  | 0011 0111 | 067 | 55 | 0x37 | 7 | 字符 7 |
  | 0011 1000 | 070 | 56 | 0x38 | 8 | 字符 8 |
  | 0011 1001 | 071 | 57 | 0x39 | 9 | 字符 9 |

- | **大写字母（A-Z）**
  | 二进制 | 八进制 | 十进制 | 十六进制 | 缩写 | 名称/意义 |
  | --------- | ------ | ------ | -------- | ------- | ------------ |
  | 0100 0001 | 0101 | 65 | 0x41 | A | 大写字母 A |
  | 0100 0010 | 0102 | 66 | 0x42 | B | 大写字母 B |
  | 0100 0011 | 0103 | 67 | 0x43 | C | 大写字母 C |
  | 0100 0100 | 0104 | 68 | 0x44 | D | 大写字母 D |
  | 0100 0101 | 0105 | 69 | 0x45 | E | 大写字母 E |
  | 0100 0110 | 0106 | 70 | 0x46 | F | 大写字母 F |
  | 0100 0111 | 0107 | 71 | 0x47 | G | 大写字母 G |
  | 0100 1000 | 0110 | 72 | 0x48 | H | 大写字母 H |
  | 0100 1001 | 0111 | 73 | 0x49 | I | 大写字母 I |
  | 0100 1010 | 0112 | 74 | 0x4A | J | 大写字母 J |
  | 0100 1011 | 0113 | 75 | 0x4B | K | 大写字母 K |
  | 0100 1100 | 0114 | 76 | 0x4C | L | 大写字母 L |
  | 0100 1101 | 0115 | 77 | 0x4D | M | 大写字母 M |
  | 0100 1110 | 0116 | 78 | 0x4E | N | 大写字母 N |
  | 0100 1111 | 0117 | 79 | 0x4F | O | 大写字母 O |
  | 0101 0000 | 0120 | 80 | 0x50 | P | 大写字母 P |
  | 0101 0001 | 0121 | 81 | 0x51 | Q | 大写字母 Q |
  | 0101 0010 | 0122 | 82 | 0x52 | R | 大写字母 R |
  | 0101 0011 | 0123 | 83 | 0x53 | S | 大写字母 S |
  | 0101 0100 | 0124 | 84 | 0x54 | T | 大写字母 T |
  | 0101 0101 | 0125 | 85 | 0x55 | U | 大写字母 U |
  | 0101 0110 | 0126 | 86 | 0x56 | V | 大写字母 V |
  | 0101 0111 | 0127 | 87 | 0x57 | W | 大写字母 W |
  | 0101 1000 | 0130 | 88 | 0x58 | X | 大写字母 X |
  | 0101 1001 | 0131 | 89 | 0x59 | Y | 大写字母 Y |
  | 0101 1010 | 0132 | 90 | 0x5A | Z | 大写字母 Z |

- **小写字母(a-z)**
  | 二进制 | 八进制 | 十进制 | 十六进制 | 缩写 | 名称/意义 |
  | --------- | ------ | ------ | -------- | ------- | ------------ |
  | 0110 0001 | 0141 | 97 | 0x61 | a | 小写字母 a |
  | 0110 0010 | 0142 | 98 | 0x62 | b | 小写字母 b |
  | 0110 0011 | 0143 | 99 | 0x63 | c | 小写字母 c |
  | 0110 0100 | 0144 | 100 | 0x64 | d | 小写字母 d |
  | 0110 0101 | 0145 | 101 | 0x65 | e | 小写字母 e |
  | 0110 0110 | 0146 | 102 | 0x66 | f | 小写字母 f |
  | 0110 0111 | 0147 | 103 | 0x67 | g | 小写字母 g |
  | 0110 1000 | 0150 | 104 | 0x68 | h | 小写字母 h |
  | 0110 1001 | 0151 | 105 | 0x69 | i | 小写字母 i |
  | 0110 1010 | 0152 | 106 | 0x6A | j | 小写字母 j |
  | 0110 1011 | 0153 | 107 | 0x6B | k | 小写字母 k |
  | 0110 1100 | 0154 | 108 | 0x6C | l | 小写字母 l |
  | 0110 1101 | 0155 | 109 | 0x6D | m | 小写字母 m |
  | 0110 1110 | 0156 | 110 | 0x6E | n | 小写字母 n |
  | 0110 1111 | 0157 | 111 | 0x6F | o | 小写字母 o |
  | 0111 0000 | 0160 | 112 | 0x70 | p | 小写字母 p |
  | 0111 0001 | 0161 | 113 | 0x71 | q | 小写字母 q |
  | 0111 0010 | 0162 | 114 | 0x72 | r | 小写字母 r |
  | 0111 0011 | 0163 | 115 | 0x73 | s | 小写字母 s |
  | 0111 0100 | 0164 | 116 | 0x74 | t | 小写字母 t |
  | 0111 0101 | 0165 | 117 | 0x75 | u | 小写字母 u |
  | 0111 0110 | 0166 | 118 | 0x76 | v | 小写字母 v |
  | 0111 0111 | 0167 | 119 | 0x77 | w | 小写字母 w |
  | 0111 1000 | 0170 | 120 | 0x78 | x | 小写字母 x |
  | 0111 1001 | 0171 | 121 | 0x79 | y | 小写字母 y |
  | 0111 1010 | 0172 | 122 | 0x7A | z | 小写字母 z |

## 1.2. Unicode的编码实现
### 1.2.1. `UTF-8`
- `Unicode`和`UTF-8`编码映射关系
    |Unicode编码（十六进制）|UTF-8字节流（二进制）|十进制数值|
    |----|----|----|
    |000000-00007F|0xxxxxxx|0-127
    |000080-0007FF|110xxxxx 10xxxxxx|128-2047
    |000800-00FFFF|1110xxxx 10xxxxxx 10xxxxxx|2048-65535
    |010000-10FFFF|11110xxx 10xxxxxx 10xxxxxx 10xxxxxx|65536-1114111
    
&emsp;&emsp;使用`UTF-8`编码方式与`Unicde`的映射关系按照上述表中所述规则进行转换。

## 1.3. Unicode在各个平面中的编码范围
- 中文编码范围`4E00-9FA5`在`UTF-8`编码集中汉字占三个字节，在GBK中占两个字节。

## 1.4. Java中Unicode的处理
我们知道在Java中存储字符使用`char`，char占用两个字节范围为FFFF，那么在范围10000范围外的字符如何存储的呢
java中使用了UTF-16编码描述一个代码单元在65535中编码中去除2048个范围为`D800-DFFF`然后规定它们为代理字符进行组合
其中`D800-DBFF`为高代码单元代理，`DC00-DFFF`为低代码单元然后进行组合


在`000800-00FFFF`范围内的还是使用一个字符数组进行