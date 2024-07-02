## VADER是什么

> VADER（Valence Aware Dictionary and sEntiment Reasoner）是一种基于词典和规则的情感分析工具，*专门针对社交媒体中表达的情感进行调整*。它是在 [[MIT 许可证\]](http://choosealicense.com/) 下完全开源的（我们真诚地感谢所有归属并欣然接受大多数贡献，但请不要让我们承担责任）。

   基于规则和词库的（对比基于学习模型），基于现有的流式计算框架，采用类似的基于规则和词库的方法来实现英文情感识别是更合适的。

   vader是一种基于词库和语法规则来进行文本情感识别的方法，发表于2014年的AAAI会议。github地址：https://github.com/cjhutto/vaderSentiment。
   论文中也提到了与基于学习模型方法的对比，后者主要存在需要大规模的训练集；训练和预测耗时和复杂度高；在一类文本中训练得到的模型无法很好的泛化处理其他类型文本的数据。此外，线上项目要求较高的precison，但学习模型有时会出现一些无法预测的低级错误分类，非常影响用户对于我们情感识别算法的准确性感官。以上这些原因也是我们此前中文情感识别采用基于规则模型所考虑的情况。

## vader词库的构建：

​    1 采用人工标注（10人）的方法为7000+的常用情感词（包括有形容词，名词，副词等）进行了情感极性及强度判定。从-4到+4表示从极度负面和极度正面情感。
​    2 区别与其他已提出的情感词典，vader的词典还考虑了常用颜文字（如: )），以应对twitter等网络环境下非标准句子的情感判别；考虑常用缩写词的情感，如WTF, LOL等；常用俚语，如nah，giggly等。

## vader的语法规则对情感判别的影响：

​    1 **标点**：如！会加强句子的情感强度
​    2 **大小写**：若句子同时含有大小写，那么全大写的单词情感强度会加强
​    3 **程度副词**：比如extremely good就比good正面情感要强很多
​    4 **连词**：例如句子存在转折连词but，使but前后情感极性反转，但一般意图在于强调but后的语意情感。
​    5 **否定词**：比如isn't会导致随后的情感次极性反转。

## 安装

#### 安装VADER

```python
pip3 install vaderSentiment
```



有几种方法可以安装和使用VADER情绪：

1. - 最简单的方法是使用命令行使用 pip 从 [[PyPI\]](https://pypi.python.org/pypi/vaderSentiment) 进行安装，例如，

     `> pip install vaderSentiment`

2. - 或者，您可能已经拥有VADER，只需要升级到最新版本，例如，

     `> pip install --upgrade vaderSentiment`

3. 您也可以克隆此 [[GitHub 存储库\]](https://github.com/cjhutto/vaderSentiment)

4. 您可以下载并解压缩 [[full master 分支 zip 文件\]](https://github.com/cjhutto/vaderSentiment/archive/master.zip)

除了VADER情感分析Python模块外，选项3或4还将下载所有其他资源和数据集（如下所述）。



## 关于评分

#### VADER情感信息会考虑：

1. 否定表达（如，"not good"）

2. 能表达情感信息和强度的标点符号 (如, "Good!!!")

3. 大小写等形式带来的强调，（如，"FUNNY."）

4. 情感强度(强度增强，如"very" ；强度减弱如， "kind of")

5. 表达情感信息的俚语 (如, 'sux')

6. 能修饰俚语情感强度的词语 （'uber'、'friggin'、'kinda'）

7. 表情符号 :) and :D

8. utf-8编码中的emoj情感表情 （ ? and ? and ?）

9. 首字母缩略语（如，'lol') ...

VADER目前只支持英文文本，如果有符合VADER形式的中文词典，也能使用VADER对中文进行分析。

#### 使用方法

VADER会对文本分析，得到的结果是一个字典信息，包含

1. pos，文本中正面信息得分

2. neg，文本中负面信息得分

3. neu，文本中中性信息得分

4. compound，文本综合情感得分

#### 文本情感分类

依据compound综合得分对文本进行分类的标准

1. 正面:compound score >= 0.05

2. 中性: -0.05 < compound score < 0.05

3. 负面: compound score <= -0.05

```python
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer	
analyzer = SentimentIntensityAnalyzer()	
test = "VADER is smart, handsome, and funny."	
analyzer.polarity_scores(test)
```

运行

```python
{'neg': 0.0, 'neu': 0.254, 'pos': 0.746, 'compound': 0.8316}
```

这里我们只使用 compound 得分，用更多的例子让大家看到感叹号、俚语、emoji、强调等不同方式对得分的影响。为了方便，我们想将结果以dataframe方式展示

```python
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer	
import pandas as pd	
analyzer = SentimentIntensityAnalyzer()	
sentences = ["VADER is smart, handsome, and funny.",  	
             "VADER is smart, handsome, and funny!",  #带感叹号	
             "VADER is very smart, handsome, and funny.", 	
             "VADER is VERY SMART, handsome, and FUNNY.",   #FUNNY.强调	
             "VADER is VERY SMART, handsome, and FUNNY!!!",	
             "VADER is VERY SMART, uber handsome, and FRIGGIN FUNNY!!!", 	
             "VADER is not smart, handsome, nor funny.",  	
             "The book was good.",  	
             "At least it isn't a horrible book.",  	
             "The book was only kind of good.", 	
             "The plot was good, but the characters are uncompelling and the dialog is not great.", 	
             "Today SUX!",  	
             "Today only kinda sux! But I'll get by, lol",  #lol缩略语	
             "Make sure you :) or :D today!",  	
             "Catch utf-8 emoji such as such as ? and ? and ?",  #emoji	
             "Not bad at all"  	
             ]	
def senti(text):	
    return analyzer.polarity_scores(text)['compound']	
df = pd.DataFrame(sentences)	
df.columns = ['text']	
#对text列使用senti函数进行批处理，得到的得分赋值给sentiment列	
df['sentiment'] = df.agg({'text':[senti]})	
df
```

![](https://img-blog.csdnimg.cn/img_convert/908b686ba9df832d609eb84ffb9e3bd0.png)

#### 更多

VADER目前只支持英文文本，如果想要对中文文本进行分析，需要做两大方面改动。

    对于初学者来说有难度，建议大家不着急的话可以系统学完python基础语法，大概学习使用python数周就能自己更改库的源代码。

首先要将库中的vaderSentiment.py中相应的英文词语改为中文词语

```python
# (empirically derived mean sentiment intensity rating increase for booster words)	
B_INCR = 0.293	
B_DECR = -0.293	
# (empirically derived mean sentiment intensity rating increase for using ALLCAPs to emphasize a word)	
C_INCR = 0.733	
N_SCALAR = -0.74	
#否定词	
NEGATE = \	
    ["aint", "arent", "cannot", "cant", "couldnt", "darent", "didnt", "doesnt",	
     "ain't", "aren't", "can't", "couldn't", "daren't", "didn't", "doesn't",	
     "dont", "hadnt", "hasnt", "havent", "isnt", "mightnt", "mustnt", "neither",	
     "don't", "hadn't", "hasn't", "haven't", "isn't", "mightn't", "mustn't",	
     "neednt", "needn't", "never", "none", "nope", "nor", "not", "nothing", "nowhere",	
     "oughtnt", "shant", "shouldnt", "uhuh", "wasnt", "werent",	
     "oughtn't", "shan't", "shouldn't", "uh-uh", "wasn't", "weren't",	
     "without", "wont", "wouldnt", "won't", "wouldn't", "rarely", "seldom", "despite"]	
# booster/dampener 'intensifiers' or 'degree adverbs'	
# http://en.wiktionary.org/wiki/Category:English_degree_adverbs	
# 情感强度 副词	
BOOSTER_DICT = \	
    {"absolutely": B_INCR, "amazingly": B_INCR, "awfully": B_INCR, 	
     "completely": B_INCR, "considerable": B_INCR, "considerably": B_INCR,	
     "decidedly": B_INCR, "deeply": B_INCR, "effing": B_INCR, "enormous": B_INCR, "enormously": B_INCR,	
     ......	
     "thoroughly": B_INCR, "total": B_INCR, "totally": B_INCR, "tremendous": B_INCR, "tremendously": B_INCR,	
     "uber": B_INCR, "unbelievably": B_INCR, "unusually": B_INCR, "utter": B_INCR, "utterly": B_INCR,	
     "very": B_INCR,	
     "almost": B_DECR, "barely": B_DECR, "hardly": B_DECR, "just enough": B_DECR,	
     "kind of": B_DECR, "kinda": B_DECR, "kindof": B_DECR, "kind-of": B_DECR,	
     "less": B_DECR, "little": B_DECR, "marginal": B_DECR, "marginally": B_DECR,	
     "occasional": B_DECR, "occasionally": B_DECR, "partly": B_DECR,	
     "scarce": B_DECR, "scarcely": B_DECR, "slight": B_DECR, "slightly": B_DECR, "somewhat": B_DECR,	
     "sort of": B_DECR, "sorta": B_DECR, "sortof": B_DECR, "sort-of": B_DECR}	
# 不再情感形容词词典中，但包含情感信息的俚语表达（目前英文方面也未完成）	
SENTIMENT_LADEN_IDIOMS = {"cut the mustard": 2, "hand to mouth": -2,	
                          "back handed": -2, "blow smoke": -2, "blowing smoke": -2,	
                          "upper hand": 1, "break a leg": 2,	
                          "cooking with gas": 2, "in the black": 2, "in the red": -2,	
                          "on the ball": 2, "under the weather": -2}	
# 包含词典单词的特殊情况俚语	
SPECIAL_CASE_IDIOMS = {"the shit": 3, "the bomb": 3, "bad ass": 1.5, "badass": 1.5,	
                       "yeah right": -2, "kiss of death": -1.5, "to die for": 3}
```

然后还要将英文词典 vaderlexicon.txt改为对应格式的中文词典。vaderlexicon.txt格式

```python
TOKEN, MEAN-SENTIMENT-RATING, STANDARD DEVIATION, and RAW-HUMAN-SENTIMENT-RATINGS
```

#### 引用信息

如果使用VADER词典、代码、或者分析方法发表学术文章，请注明出处，格式如下

```python
Hutto, C.J. &amp; Gilbert, E.E. (2014). VADER: A Parsimonious Rule-based Model for Sentiment Analysis of Social Media Text. Eighth International Conference on Weblogs and Social Media (ICWSM-14). Ann Arbor, MI, June 2014.	
Refactoring for Python 3 compatibility, improved modularity, and incorporation into [NLTK] ...many thanks to Ewan &amp; Pierpaolo.
```



## ICM/MCM2020-Problem-C

### 基于VADER的文本情感打分

2020ICM/MCM-Problem-C，需要分析亚马逊销售数据，其中涉及对商品的评论文本分析，一下子就想到了情感打分，尤其文本内容都是英文，刚好可以用上之VADER方法

VADER介绍：VADER是一种基于词库和语法规则来进行文本情感分析的方法，目前除了基本的情感词语分析外，已能对表情符号（utf-8）等分析进行支持。

分析对象：共32019条评论

![img](CE-VANDER.assets/v2-e00bb87f3486445b538147f1ca1b22fe_720w.jpg)

准备工作：安装VADER库

- 打开CMD→输入 pip install vaderSentime
- （升级版本输入：pip install --upgrade vaderSentiment）
- 或者下载文件[cjhutto/vaderSentiment：VADER情绪分析。 (github.com)](https://github.com/cjhutto/vaderSentiment#introduction)，在文件的目录下找到最外层的`_init_.py`输入以下代码

引用包：

```python3
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import csv # 还需要导入CSV文件
```

导入数据并确定输出文件：

```text
input_file = open('pinglun.txt',encoding='gbk')
output_file = open("pinglun_sentiment.csv", mode="w",encoding='gbk')
csv_writer = csv.writer(output_file)
```

按条读取数据：

```text
sentences = input_file.readlines()
```

调用情感打分函数：

```text
analyzer = SentimentIntensityAnalyzer()
```

打分：

```text
for sentence in sentences:
	vs = analyzer.polarity_scores(sentence)
	csv_writer.writerow([sentence,vs['compound']])
	output_file.write(str(sentence)+str(vs['compound'])+'\n')
```

最后关闭文件：

```text
input_file.close()
output_file.close()
```

缺点：

VADER情感词典对在社交媒体上下文中表达的情感强弱很敏感，也可用于其他领域的情感分析。但涉及到专业性比较强的文本时，可能需要使用者自己向词库添加内容，修改词库进行分析。此外，该词库主要针对英文，若需要分析中文文本情感，可调用谷歌翻译器（from googletrans import Translator）







## 参考

> 1. [Vader:Github](https://github.com/cjhutto/vaderSentiment)
> 2. [VADER：社交网络文本情感分析库](https://blog.csdn.net/weixin_38008864/article/details/99700753)
> 3. [基于vader的文本情感打分](https://zhuanlan.zhihu.com/p/144031459)