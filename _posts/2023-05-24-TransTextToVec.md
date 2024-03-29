---
layout: single
title:  "Transfer the text data to vector"
date:   2023-05-23
categories: Insights
author: Jerry Hsu
author_profile : true
---

Recently, I am learning a little bit knowlegde about NLP-related field. Such as <span style="color:Gold">Word2Vec, TF-IDF, BERT, GRU</span> or <span style="color:Gold">LLM</span> etc. I think if I can record what I learn by the blog. I can learn better than that I just read the book. In this artical, it will be divided into several parts :

* About my thoughts in transfer the text to vector.
* TF-IDF
  * TF
  * IDF
* Word2Vec
  * Meaning in Word2Vec
  * Implementation detail 


## About My Thoughts in "Transfer the text to Vector"

In modern, there are lots of differents models to deal with the serveral problems (Before the ChatGPT). For example : 

* Summary Task
* Recommendation System (Content-based)
* Classfication task
* Translation Task
* Generative AI

Most of the above tasks is built by deep learning model. Once we need an input for the model or computation, we should let the text data transferred into vector. There's several differents methods to transfer it. Let me introduce the pros and cons between the following methods.

### 1. Word counts
* Pros : Easy to calculate.
* Cons : It lose a lot of information such as the position and the data importance between the sentence or artical.

### 2. One-Hot encoding
* Pros : It's a simple methods.
* Cons : Lose the relationship between the text meaning.

### 3. TF-IDF
* Pros : Consider the data importance between the artical or sentence if you know how to calculate the IDF.
* Cons : Lose the position information.

### 4. Word2Vec
* Pros : It can catch the meaning between the text to another text. For example : $$V_{King} - V_{man} + V_{woman} = V_{Queen}$$
* Cons : It need to be trained and based on a big dataset.

### 5. BERT embedding
* Pros : The vector consider the meaning or relationship between front context and back context.
* Cons : Need to be trained.

In this artical, I will introduce the <span style="color:Gold">TF-IDF</span> and <span style="color:Gold">Word2Vec</span>.

## TF-IDF

The algorithm consider not only the frequency in the sentence (artical) but also the text appear in every sentences (articals) in the whole dataset. The front part is TF, behind it is TF-IDF.

### TF-IDF Formula :
* TF-IDF : $$tfidf_{i,j} = \mathrm{tf_{i,j}} \times \mathrm{idf_{i}}$$
* TF  : $$tf_{i,j} = \frac{n_{i,j}}{\sum_k n_{k,j}}$$
* IDF : $$idf_{i} = \log\frac{\|D\|}{\|\{j: t_{i} \in d_{j}\}\|}$$

***Which $$i$$ is represent the the number of the text in the sentences or artical. $$j$$ represent the number of the sentences in the whole dataset. For all $$K \in \mathbb{N^+}$$, K represent the appear frequency in the sentences. $$\|D\|$$ represent the total sentences or artical number. $$\|\{j:t_{i} \in d_{j}\}\|$$ means the counts that text appear in the documents (Sentences or articals)***

For example, There are 2 samples in the whole dataset :
1. This is an apple and it is really delicious.
2. These apples are delicious.

We can calculate the TF-IDF from the dataset. First of all, we cut the sample into many token (word-level). And it could be like :

1. ["This", "is", "an", "apple", "and", "it", "is", "really", "delicious", "."]
2. ["These", "apples", "are", "delicious", "."]

Then we calculate each TF-IDF scores in both 2 documents. The word "delicious" TF-IDF score is :

* TF : $$tf = \frac{1}{10}$$
* IDF : $$\log\frac{2}{2} = 0$$
* TF-IDF = TF * IDF = 0

Then we can calculate the word "delicious" TF-IDF score is 0. It also means delicious do not bring any important information for us in the dataset.

Also, we can calculate the word "is" :

* TF : $$tf = \frac{2}{10}$$
* IDF : $$\log\frac{2}{1} = 0.301$$
* TF-IDF = TF * IDF = 0.2 * 0.301 = 0.0602

Then we can get the array from the python code :

```
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd

# Define a list of documents
documents = [
    'This is an apple and it is really delicious.',
    'These apples are delicious.'
]

# Initialize the TfidfVectorizer
vectorizer = TfidfVectorizer()

# Use fit_transform to fit the documents
X = vectorizer.fit_transform(documents)

# Present the tf-idf array by pandas package
pd.DataFrame(X.toarray(), columns = [vectorizer.get_feature_names_out()])
```

But, TF-IDF can't get the relationship between the text. Due to the reason, we will introduce the Word2Vec continuously.

## Word2Vec







