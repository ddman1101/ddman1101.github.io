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
Pros : Easy to calculate ! Even my grandmother can do it !
Cons : It lose a lot of information such as the position and the data importance between the sentence or artical.

### 2. One-Hot encoding
Pros : Simple methods.
Cons : Lose the relationship between the text meaning.

### 3. TF-IDF
Pros : Consider the data importance between the artical or sentence if you know how to calculate the IDF.
Cons : Lose the position information.

3. 

