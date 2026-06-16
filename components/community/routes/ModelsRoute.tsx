'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import '@/app/i18n'

const COUNTS: Record<string, number> = {
  all: 76,
  tabular: 15,
  regression: 15,
  nlp: 15,
  translation: 9,
  image: 6,
  gen: 5,
  vision: 6,
  controlnet: 5,
}

interface ModelRow {
  category: string
  name: string
  id: string
  descKey: string
  descFallback: string
  base: string
  tagClass: string
  tagKey: string
  tagFallback: string
}

const MODEL_ROWS: ModelRow[] = [
  // Tabular Classification (15)
  { category: 'tabular', name: 'AdaBoostClassifier',             id: '#models/adaboost-cls',       descKey: 'r.abc',        descFallback: 'Adapts to misclassified samples iteratively.',                  base: 'BaseModel | sklearn',         tagClass: 'tabular',     tagKey: 'tag.tabcls', tagFallback: 'TabularClassificationTask' },
  { category: 'tabular', name: 'BaggingClassifier',              id: '#models/bagging-cls',         descKey: 'r.bag',        descFallback: 'Aggregates predictions from bootstrap subsets.',                base: 'BaseModel | sklearn',         tagClass: 'tabular',     tagKey: 'tag.tabcls', tagFallback: 'TabularClassificationTask' },
  { category: 'tabular', name: 'DecisionTreeClassifier',         id: '#models/dtree-cls',           descKey: 'r.dtc',        descFallback: 'Axis-aligned decision rules learned from data.',                base: 'BaseModel | sklearn',         tagClass: 'tabular',     tagKey: 'tag.tabcls', tagFallback: 'TabularClassificationTask' },
  { category: 'tabular', name: 'DummyClassifier',                id: '#models/dummy-cls',           descKey: 'r.dum',        descFallback: 'Baseline: makes predictions ignoring input features.',          base: 'BaseModel | sklearn',         tagClass: 'tabular',     tagKey: 'tag.tabcls', tagFallback: 'TabularClassificationTask' },
  { category: 'tabular', name: 'ExtraTreesClassifier',           id: '#models/extratrees-cls',      descKey: 'r.etc',        descFallback: 'Fully randomised decision tree splits.',                        base: 'BaseModel | sklearn',         tagClass: 'tabular',     tagKey: 'tag.tabcls', tagFallback: 'TabularClassificationTask' },
  { category: 'tabular', name: 'GaussianNB',                     id: '#models/gaussian-nb',         descKey: 'r.gnb',        descFallback: "Naive Bayes classifier based on Bayes' theorem.",              base: 'BaseModel | sklearn',         tagClass: 'tabular',     tagKey: 'tag.tabcls', tagFallback: 'TabularClassificationTask' },
  { category: 'tabular', name: 'GradientBoostingClassifier',     id: '#models/gboosting-cls',       descKey: 'r.gbc',        descFallback: 'Ensemble of trees built sequentially.',                         base: 'BaseModel | sklearn',         tagClass: 'tabular',     tagKey: 'tag.tabcls', tagFallback: 'TabularClassificationTask' },
  { category: 'tabular', name: 'HistGradientBoostingClassifier', id: '#models/hist-gboosting-cls',  descKey: 'r.hgbc',       descFallback: 'Histogram-based gradient boosting for large datasets.',         base: 'BaseModel | sklearn',         tagClass: 'tabular',     tagKey: 'tag.tabcls', tagFallback: 'TabularClassificationTask' },
  { category: 'tabular', name: 'KNeighborsClassifier',           id: '#models/knn',                 descKey: 'r.knn',        descFallback: 'k-Nearest Neighbors. Non-parametric baseline.',                 base: 'BaseModel | sklearn',         tagClass: 'tabular',     tagKey: 'tag.tabcls', tagFallback: 'TabularClassificationTask' },
  { category: 'tabular', name: 'LinearSVCClassifier',            id: '#models/linear-svc',          descKey: 'r.lsvc',       descFallback: 'Linear SVC with Platt-scaling for probabilities.',              base: 'BaseModel | sklearn',         tagClass: 'tabular',     tagKey: 'tag.tabcls', tagFallback: 'TabularClassificationTask' },
  { category: 'tabular', name: 'LogisticRegression',             id: '#models/logreg',              descKey: 'r.lr',         descFallback: 'Regularized logistic regression. Interpretable.',               base: 'BaseModel | sklearn',         tagClass: 'tabular',     tagKey: 'tag.tabcls', tagFallback: 'TabularClassificationTask' },
  { category: 'tabular', name: 'MLPClassifier',                  id: '#models/mlp',                 descKey: 'r.mlp',        descFallback: 'Multilayer neural network. Entry point to tabular deep learning.', base: 'BaseModel | sklearn',      tagClass: 'tabular',     tagKey: 'tag.tabcls', tagFallback: 'TabularClassificationTask' },
  { category: 'tabular', name: 'RandomForestClassifier',         id: '#models/random-forest',       descKey: 'r.rf',         descFallback: 'Random forest over scikit-learn. Native HPO.',                  base: 'BaseModel | sklearn',         tagClass: 'tabular',     tagKey: 'tag.tabcls', tagFallback: 'TabularClassificationTask' },
  { category: 'tabular', name: 'SGDClassifier',                  id: '#models/sgd-cls',             descKey: 'r.sgdc',       descFallback: 'SGD classifier with probability calibration.',                  base: 'BaseModel | sklearn',         tagClass: 'tabular',     tagKey: 'tag.tabcls', tagFallback: 'TabularClassificationTask' },
  { category: 'tabular', name: 'SVC',                            id: '#models/svc',                 descKey: 'r.svc',        descFallback: 'SVM that maximises the margin between classes.',                base: 'BaseModel | sklearn',         tagClass: 'tabular',     tagKey: 'tag.tabcls', tagFallback: 'TabularClassificationTask' },
  // Regression (15)
  { category: 'regression', name: 'AdaBoostRegression',             id: '#models/adaboost-reg',        descKey: 'r.abr',        descFallback: 'Focuses on samples with high prediction errors.',               base: 'BaseModel | sklearn',         tagClass: 'regression',  tagKey: 'tag.reg', tagFallback: 'RegressionTask' },
  { category: 'regression', name: 'BayesianRidgeRegression',        id: '#models/bayesian-ridge',      descKey: 'r.brr',        descFallback: 'Bayesian Ridge with automatic regularisation.',                 base: 'BaseModel | sklearn',         tagClass: 'regression',  tagKey: 'tag.reg', tagFallback: 'RegressionTask' },
  { category: 'regression', name: 'DecisionTreeRegression',         id: '#models/dtree-reg',           descKey: 'r.dtr',        descFallback: 'Recursively partitions the feature space.',                     base: 'BaseModel | sklearn',         tagClass: 'regression',  tagKey: 'tag.reg', tagFallback: 'RegressionTask' },
  { category: 'regression', name: 'ElasticNetRegression',           id: '#models/elasticnet',          descKey: 'r.elr',        descFallback: 'Combines L1 and L2 penalties.',                                 base: 'BaseModel | sklearn',         tagClass: 'regression',  tagKey: 'tag.reg', tagFallback: 'RegressionTask' },
  { category: 'regression', name: 'ExtraTreesRegression',           id: '#models/extratrees-reg',      descKey: 'r.etr',        descFallback: 'Fully randomised decision tree splits for regression.',         base: 'BaseModel | sklearn',         tagClass: 'regression',  tagKey: 'tag.reg', tagFallback: 'RegressionTask' },
  { category: 'regression', name: 'GradientBoostingRegression',     id: '#models/gboosting-reg',       descKey: 'r.gbr',        descFallback: 'Sequential ensemble of decision trees.',                        base: 'BaseModel | sklearn',         tagClass: 'regression',  tagKey: 'tag.reg', tagFallback: 'RegressionTask' },
  { category: 'regression', name: 'HistGradientBoostingRegression', id: '#models/hist-gboosting-reg',  descKey: 'r.hgbr',       descFallback: 'Histogram-based gradient boosting for regression.',             base: 'BaseModel | sklearn',         tagClass: 'regression',  tagKey: 'tag.reg', tagFallback: 'RegressionTask' },
  { category: 'regression', name: 'KNeighborsRegression',           id: '#models/knn-reg',             descKey: 'r.knr',        descFallback: 'Averages targets of nearest samples.',                          base: 'BaseModel | sklearn',         tagClass: 'regression',  tagKey: 'tag.reg', tagFallback: 'RegressionTask' },
  { category: 'regression', name: 'LassoRegression',                id: '#models/lasso',               descKey: 'r.las',        descFallback: 'L1 regularisation for sparse solutions.',                       base: 'BaseModel | sklearn',         tagClass: 'regression',  tagKey: 'tag.reg', tagFallback: 'RegressionTask' },
  { category: 'regression', name: 'LinearRegression',               id: '#models/linear-reg',          descKey: 'r.linr',       descFallback: 'Ordinary least-squares linear regression.',                     base: 'BaseModel | sklearn',         tagClass: 'regression',  tagKey: 'tag.reg', tagFallback: 'RegressionTask' },
  { category: 'regression', name: 'LinearSVR',                      id: '#models/linear-svr',          descKey: 'r.lsvr',       descFallback: 'Linear kernel SVM for regression on large datasets.',           base: 'BaseModel | sklearn',         tagClass: 'regression',  tagKey: 'tag.reg', tagFallback: 'RegressionTask' },
  { category: 'regression', name: 'MLPRegression',                  id: '#models/mlp-reg',             descKey: 'r.mlpr',       descFallback: 'Single hidden-layer MLP regressor in PyTorch.',                base: 'BaseModel | PyTorch',         tagClass: 'regression',  tagKey: 'tag.reg', tagFallback: 'RegressionTask' },
  { category: 'regression', name: 'RandomForestRegression',         id: '#models/rf-reg',              descKey: 'r.rfr',        descFallback: 'Averages predictions from multiple decision trees.',            base: 'BaseModel | sklearn',         tagClass: 'regression',  tagKey: 'tag.reg', tagFallback: 'RegressionTask' },
  { category: 'regression', name: 'RidgeRegression',                id: '#models/ridge',               descKey: 'r.rg',         descFallback: 'L2 linear regression. Stable under high collinearity.',        base: 'BaseModel | sklearn',         tagClass: 'regression',  tagKey: 'tag.reg', tagFallback: 'RegressionTask' },
  { category: 'regression', name: 'SVR',                            id: '#models/svr',                 descKey: 'r.svr',        descFallback: 'Kernel-based function estimation.',                             base: 'BaseModel | sklearn',         tagClass: 'regression',  tagKey: 'tag.reg', tagFallback: 'RegressionTask' },
  // NLP — Text Classification (15)
  { category: 'nlp', name: 'AlbertTransformer',                  id: '#models/albert',              descKey: 'r.alb',        descFallback: 'Pre-trained ALBERT for efficient English text classification.',  base: 'BaseModel | HF transformers', tagClass: 'nlp',         tagKey: 'tag.nlp', tagFallback: 'TextClassificationTask' },
  { category: 'nlp', name: 'BagOfWordsTextClassificationModel',  id: '#models/bow',                 descKey: 'r.bow',        descFallback: 'Bag-of-words vectorizer with a DashAI tabular classifier.',     base: 'BaseModel | sklearn',         tagClass: 'nlp',         tagKey: 'tag.nlp', tagFallback: 'TextClassificationTask' },
  { category: 'nlp', name: 'BertTransformer',                    id: '#models/bert',                descKey: 'r.bert',       descFallback: 'Pre-trained BERT for English text classification.',              base: 'BaseModel | HF transformers', tagClass: 'nlp',         tagKey: 'tag.nlp', tagFallback: 'TextClassificationTask' },
  { category: 'nlp', name: 'BertinTransformer',                  id: '#models/bertin',              descKey: 'r.bertin',     descFallback: 'BERTIN (Spanish RoBERTa) for Spanish text classification.',     base: 'BaseModel | HF transformers', tagClass: 'nlp',         tagKey: 'tag.nlp', tagFallback: 'TextClassificationTask' },
  { category: 'nlp', name: 'BetoTransformer',                    id: '#models/beto',                descKey: 'r.beto',       descFallback: 'Pre-trained BETO for Spanish text classification.',             base: 'BaseModel | HF transformers', tagClass: 'nlp',         tagKey: 'tag.nlp', tagFallback: 'TextClassificationTask' },
  { category: 'nlp', name: 'DebertaV3Transformer',               id: '#models/deberta-v3',          descKey: 'r.de',         descFallback: 'Encoder with disentangled attention. State of the art on GLUE.', base: 'BaseModel | HF transformers', tagClass: 'nlp',        tagKey: 'tag.nlp', tagFallback: 'TextClassificationTask' },
  { category: 'nlp', name: 'DistilBertTransformer',              id: '#models/distilbert',          descKey: 'r.db',         descFallback: 'Distilled BERT, faster. Text classification.',                  base: 'BaseModel | HF transformers', tagClass: 'nlp',         tagKey: 'tag.nlp', tagFallback: 'TextClassificationTask' },
  { category: 'nlp', name: 'ElectraTransformer',                 id: '#models/electra',             descKey: 'r.elec',       descFallback: 'Pre-trained ELECTRA for efficient English text classification.', base: 'BaseModel | HF transformers', tagClass: 'nlp',        tagKey: 'tag.nlp', tagFallback: 'TextClassificationTask' },
  { category: 'nlp', name: 'MiniLMTransformer',                  id: '#models/minilm',              descKey: 'r.mini',       descFallback: 'Lightweight MiniLM for English text classification.',            base: 'BaseModel | HF transformers', tagClass: 'nlp',         tagKey: 'tag.nlp', tagFallback: 'TextClassificationTask' },
  { category: 'nlp', name: 'ModernBertTransformer',              id: '#models/modernbert',          descKey: 'r.mb',         descFallback: 'Modern encoder with 8k token context length.',                  base: 'BaseModel | HF transformers', tagClass: 'nlp',         tagKey: 'tag.nlp', tagFallback: 'TextClassificationTask' },
  { category: 'nlp', name: 'MultilingualBertTransformer',        id: '#models/multilingual-bert',   descKey: 'r.mbert',      descFallback: 'Multilingual BERT for cross-lingual text classification.',      base: 'BaseModel | HF transformers', tagClass: 'nlp',         tagKey: 'tag.nlp', tagFallback: 'TextClassificationTask' },
  { category: 'nlp', name: 'RobertaTransformer',                 id: '#models/roberta',             descKey: 'r.rob',        descFallback: 'Pre-trained RoBERTa for English text classification.',          base: 'BaseModel | HF transformers', tagClass: 'nlp',         tagKey: 'tag.nlp', tagFallback: 'TextClassificationTask' },
  { category: 'nlp', name: 'TfIdfLogRegTextClassificationModel', id: '#models/tfidf-logreg',        descKey: 'r.tfidf',      descFallback: 'TF-IDF vectorizer with Logistic Regression.',                   base: 'BaseModel | sklearn',         tagClass: 'nlp',         tagKey: 'tag.nlp', tagFallback: 'TextClassificationTask' },
  { category: 'nlp', name: 'XlmRobertaTransformer',             id: '#models/xlm-roberta',          descKey: 'r.xlmr',       descFallback: 'XLM-RoBERTa for multilingual text classification.',            base: 'BaseModel | HF transformers', tagClass: 'nlp',         tagKey: 'tag.nlp', tagFallback: 'TextClassificationTask' },
  { category: 'nlp', name: 'XlnetTransformer',                   id: '#models/xlnet',               descKey: 'r.xlnet',      descFallback: 'Pre-trained XLNet for English text classification.',            base: 'BaseModel | HF transformers', tagClass: 'nlp',         tagKey: 'tag.nlp', tagFallback: 'TextClassificationTask' },
  // Translation (9)
  { category: 'translation', name: 'M2M100Transformer',          id: '#models/m2m100',              descKey: 'r.m2m',        descFallback: 'Multilingual seq2seq for configurable language pairs.',         base: 'BaseModel | HF transformers', tagClass: 'translation', tagKey: 'tag.tr',  tagFallback: 'TranslationTask' },
  { category: 'translation', name: 'NllbTransformer',            id: '#models/nllb',                descKey: 'r.nl',         descFallback: 'No Language Left Behind, 200+ languages. Seq2seq.',             base: 'BaseModel | HF transformers', tagClass: 'translation', tagKey: 'tag.tr',  tagFallback: 'TranslationTask' },
  { category: 'translation', name: 'OpusMtEnDeTransformer',      id: '#models/opus-en-de',          descKey: 'r.opus.en.de', descFallback: 'Helsinki-NLP: English to German.',                              base: 'BaseModel | HF transformers', tagClass: 'translation', tagKey: 'tag.tr',  tagFallback: 'TranslationTask' },
  { category: 'translation', name: 'OpusMtEnESTransformer',      id: '#models/opus-en-es',          descKey: 'r.opus.en.es', descFallback: 'Helsinki-NLP: English to Spanish.',                             base: 'BaseModel | HF transformers', tagClass: 'translation', tagKey: 'tag.tr',  tagFallback: 'TranslationTask' },
  { category: 'translation', name: 'OpusMtEnFrTransformer',      id: '#models/opus-en-fr',          descKey: 'r.opus.en.fr', descFallback: 'Helsinki-NLP: English to French.',                              base: 'BaseModel | HF transformers', tagClass: 'translation', tagKey: 'tag.tr',  tagFallback: 'TranslationTask' },
  { category: 'translation', name: 'OpusMtEnPtTransformer',      id: '#models/opus-en-pt',          descKey: 'r.opus.en.pt', descFallback: 'Helsinki-NLP: English to Portuguese.',                          base: 'BaseModel | HF transformers', tagClass: 'translation', tagKey: 'tag.tr',  tagFallback: 'TranslationTask' },
  { category: 'translation', name: 'OpusMtEsEnTransformer',      id: '#models/opus-es-en',          descKey: 'r.opus.es.en', descFallback: 'Helsinki-NLP: Spanish to English.',                             base: 'BaseModel | HF transformers', tagClass: 'translation', tagKey: 'tag.tr',  tagFallback: 'TranslationTask' },
  { category: 'translation', name: 'OpusMtFrEnTransformer',      id: '#models/opus-fr-en',          descKey: 'r.opus.fr.en', descFallback: 'Helsinki-NLP: French to English.',                              base: 'BaseModel | HF transformers', tagClass: 'translation', tagKey: 'tag.tr',  tagFallback: 'TranslationTask' },
  { category: 'translation', name: 'T5SmallTransformer',         id: '#models/t5-small',            descKey: 'r.t5',         descFallback: 'T5-small for English to German/French/Romanian.',               base: 'BaseModel | HF transformers', tagClass: 'translation', tagKey: 'tag.tr',  tagFallback: 'TranslationTask' },
  // Image Classification (6)
  { category: 'image', name: 'CNNImageClassifier',               id: '#models/cnn',                 descKey: 'r.cnn',        descFallback: 'Convolutional neural network image classifier.',                base: 'BaseModel | PyTorch',         tagClass: 'image',       tagKey: 'tag.img', tagFallback: 'ImageClassificationTask' },
  { category: 'image', name: 'EfficientNetB0ImageClassifier',    id: '#models/efficientnet-b0',     descKey: 'r.effnet',     descFallback: 'EfficientNet-B0 (Tan & Le, 2019).',                             base: 'BaseModel | PyTorch',         tagClass: 'image',       tagKey: 'tag.img', tagFallback: 'ImageClassificationTask' },
  { category: 'image', name: 'LeNet5ImageClassifier',            id: '#models/lenet5',              descKey: 'r.lenet',      descFallback: 'Classic LeNet-5 (LeCun et al.).',                               base: 'BaseModel | PyTorch',         tagClass: 'image',       tagKey: 'tag.img', tagFallback: 'ImageClassificationTask' },
  { category: 'image', name: 'MLPImageClassifier',               id: '#models/mlp-image',           descKey: 'r.mlpi',       descFallback: 'Multi-layer perceptron image classifier.',                      base: 'BaseModel | PyTorch',         tagClass: 'image',       tagKey: 'tag.img', tagFallback: 'ImageClassificationTask' },
  { category: 'image', name: 'ResNet18ImageClassifier',          id: '#models/resnet18',            descKey: 'r.res18',      descFallback: 'ResNet-18 (He et al.).',                                        base: 'BaseModel | PyTorch',         tagClass: 'image',       tagKey: 'tag.img', tagFallback: 'ImageClassificationTask' },
  { category: 'image', name: 'ResNet50ImageClassifier',          id: '#models/resnet50',            descKey: 'r.res50',      descFallback: 'ResNet-50 (He et al.).',                                        base: 'BaseModel | PyTorch',         tagClass: 'image',       tagKey: 'tag.img', tagFallback: 'ImageClassificationTask' },
  // Text Generation / LLMs (5)
  { category: 'gen', name: 'Llama',                              id: '#models/llama',               descKey: 'r.lla',        descFallback: "Meta's open-weights LLM. Local inference.",                     base: 'BaseGenerativeModel',         tagClass: 'gen',         tagKey: 'tag.gen', tagFallback: 'TextToTextGenerationTask' },
  { category: 'gen', name: 'Mistral',                            id: '#models/mistral',             descKey: 'r.mi',         descFallback: 'Efficient 7B open-weights. Sliding window attention.',          base: 'BaseGenerativeModel',         tagClass: 'gen',         tagKey: 'tag.gen', tagFallback: 'TextToTextGenerationTask' },
  { category: 'gen', name: 'Mixtral',                            id: '#models/mixtral',             descKey: 'r.mx',         descFallback: 'Mixture of Experts. GPT-3.5 quality at lower cost.',            base: 'BaseGenerativeModel',         tagClass: 'gen',         tagKey: 'tag.gen', tagFallback: 'TextToTextGenerationTask' },
  { category: 'gen', name: 'Qwen',                               id: '#models/qwen',                descKey: 'r.qw',         descFallback: 'Alibaba LLM with solid multilingual support.',                  base: 'BaseGenerativeModel',         tagClass: 'gen',         tagKey: 'tag.gen', tagFallback: 'TextToTextGenerationTask' },
  { category: 'gen', name: 'SmolLM',                             id: '#models/smollm',              descKey: 'r.sm',         descFallback: 'Compact LLM for modest hardware. 135M-1.7B.',                   base: 'BaseGenerativeModel',         tagClass: 'gen',         tagKey: 'tag.gen', tagFallback: 'TextToTextGenerationTask' },
  // Vision / Generative (11)
  { category: 'vision', name: 'PixArt-Sigma',                   id: '#models/pixart-sigma',        descKey: 'r.px',         descFallback: 'Efficient diffusion transformer for 4K.',                       base: 'BaseGenerativeModel',         tagClass: 'vision',      tagKey: 'tag.vis', tagFallback: 'TextToImageGenerationTask' },
  { category: 'vision', name: 'SDXL',                           id: '#models/sdxl',                descKey: 'r.sdxl',       descFallback: 'Stable Diffusion XL. Photorealistic quality.',                  base: 'BaseGenerativeModel',         tagClass: 'vision',      tagKey: 'tag.vis', tagFallback: 'TextToImageGenerationTask' },
  { category: 'vision', name: 'SDXL Turbo',                     id: '#models/sdxl-turbo',          descKey: 'r.sdxlt',      descFallback: 'Distilled SDXL for real-time generation.',                      base: 'BaseGenerativeModel',         tagClass: 'vision',      tagKey: 'tag.vis', tagFallback: 'TextToImageGenerationTask' },
  { category: 'vision', name: 'Stable Diffusion v3',            id: '#models/sd-v3',               descKey: 'r.sd3',        descFallback: 'V3 with MMDiT - better prompt adherence.',                      base: 'BaseGenerativeModel',         tagClass: 'vision',      tagKey: 'tag.vis', tagFallback: 'TextToImageGenerationTask' },
  { category: 'vision', name: 'Stable Diffusion v2',            id: '#models/sd-v2',               descKey: 'r.sd2',        descFallback: 'SD v2 with OpenCLIP. 512x512 / 768x768 generation.',            base: 'BaseGenerativeModel',         tagClass: 'vision',      tagKey: 'tag.vis', tagFallback: 'TextToImageGenerationTask' },
  { category: 'vision', name: 'TongyiZ Image',                  id: '#models/tongyi',              descKey: 'r.tyz',        descFallback: 'Tongyi Wanxiang text-to-image model.',                          base: 'BaseGenerativeModel',         tagClass: 'vision',      tagKey: 'tag.vis', tagFallback: 'TextToImageGenerationTask' },
  { category: 'controlnet', name: 'SD1.5 Depth ControlNet',         id: '#models/cn-sd15-depth',       descKey: 'r.cn.depth',   descFallback: 'ControlNet with depth conditioning on SD1.5.',                  base: 'BaseGenerativeModel',         tagClass: 'vision',      tagKey: 'tag.ctrlnet', tagFallback: 'ControlNetTask' },
  { category: 'controlnet', name: 'SD1.5 HED ControlNet',           id: '#models/cn-sd15-hed',         descKey: 'r.cn.hed',     descFallback: 'ControlNet with HED edge conditioning on SD1.5.',               base: 'BaseGenerativeModel',         tagClass: 'vision',      tagKey: 'tag.ctrlnet', tagFallback: 'ControlNetTask' },
  { category: 'controlnet', name: 'SD1.5 OpenPose ControlNet',      id: '#models/cn-sd15-openpose',    descKey: 'r.cn.pose',    descFallback: 'ControlNet with OpenPose conditioning on SD1.5.',              base: 'BaseGenerativeModel',         tagClass: 'vision',      tagKey: 'tag.ctrlnet', tagFallback: 'ControlNetTask' },
  { category: 'controlnet', name: 'SDXL Canny ControlNet',          id: '#models/cn-sdxl-canny',       descKey: 'r.cn.canny',   descFallback: 'ControlNet with Canny edge conditioning on SDXL.',             base: 'BaseGenerativeModel',         tagClass: 'vision',      tagKey: 'tag.ctrlnet', tagFallback: 'ControlNetTask' },
  { category: 'controlnet', name: 'SDXL v1 ControlNet',             id: '#models/cn-sdxl-v1',          descKey: 'r.cn.sdxl',    descFallback: 'ControlNet v1 conditioning on SDXL.',                           base: 'BaseGenerativeModel',         tagClass: 'vision',      tagKey: 'tag.ctrlnet', tagFallback: 'ControlNetTask' },
]

const ABSTRACTIONS = [
  { idKey: 'a1.i',  idFallback: '01 / paradigma',        name: 'BaseTask',             descKey: 'a1.d',  descFallback: 'Clasificacion, regresion, NLP, traduccion, generacion.' },
  { idKey: 'a2.i',  idFallback: '02 / modelo predictivo', name: 'BaseModel',           descKey: 'a2.d',  descFallback: 'Random Forest hasta transformers. Subclass + schema, listo para HPO.' },
  { idKey: 'a3.i',  idFallback: '03 / modelo generativo', name: 'BaseGenerativeModel', descKey: 'a3.d',  descFallback: 'LLMs e imagen como ciudadania de primera.' },
  { idKey: 'a4.i',  idFallback: '04 / metrica',           name: 'BaseMetric',          descKey: 'a4.d',  descFallback: 'Clasificacion, regresion, traduccion. Auto-aparece en UI.' },
  { idKey: 'a5.i',  idFallback: '05 / HPO',               name: 'BaseOptimizer',       descKey: 'a5.d',  descFallback: 'Optuna + HyperOpt. Estrategias bayesianas, evolutivas, QMC.' },
  { idKey: 'a6.i',  idFallback: '06 / loader',            name: 'BaseDataLoader',      descKey: 'a6.d',  descFallback: 'CSV, JSON, imagenes, audio. Cada loader declara su formato.' },
  { idKey: 'a7.i',  idFallback: '07 / EDA',               name: 'BaseExplorer',        descKey: 'a7.d',  descFallback: 'Visualizaciones, profiling, distribuciones tipadas.' },
  { idKey: 'a8.i',  idFallback: '08 / conversion',        name: 'BaseConverter',       descKey: 'a8.d',  descFallback: 'Transformaciones tipadas entre formatos y representaciones.' },
  { idKey: 'a9.i',  idFallback: '09 / XAI global',        name: 'BaseGlobalExplainer', descKey: 'a9.d',  descFallback: 'Permutation importance, surrogate, partial dependence.' },
  { idKey: 'a10.i', idFallback: '10 / XAI local',         name: 'BaseLocalExplainer',  descKey: 'a10.d', descFallback: 'SHAP, LIME, contrafactuales con abstraccion dedicada.' },
  { idKey: 'a11.i', idFallback: '11 / orquestacion',      name: 'BaseJob',             descKey: 'a11.d', descFallback: 'Train, predict, explain, explore, convert, generate, evaluate, optimize.' },
  { idKey: 'a12.i', idFallback: '12 / tarea generativa',  name: 'BaseGenerativeTask',  descKey: 'a12.d', descFallback: 'Generacion condicional, text-to-image, seq-to-seq.' },
]

export function ModelsRoute() {
  const { t } = useTranslation('models')
  const th = (key: string) => ({ __html: t(key) })

  const [filter, setFilter] = useState<string>('all')

  const count = COUNTS[filter] ?? COUNTS.all

  return (
    <>
      {/* HERO */}
      <section className="contrib-hero" style={{ position: 'relative', overflow: 'hidden', paddingBottom: 48 }}>
        <svg className="wm wm-tr" viewBox="0 0 218.96 237.04" aria-hidden="true">
          <use href="#dashai-mark" />
        </svg>
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="eyebrow">
            <span className="num">[ /models ]</span>
            {' '}&nbsp;{' '}
            <span>{t('cat.ey')}</span>
          </div>
          <h1 style={{ marginTop: 18 }} dangerouslySetInnerHTML={th('cat.h')} />
          <p className="lead" dangerouslySetInnerHTML={th('cat.lead')} />
        </div>
      </section>

      {/* CATALOG SECTION */}
      <section className="section section--tight" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="wrap">

          {/* Toolbar */}
          <div className="cat-toolbar">
            <div className="cat-filters">
              <button className={`f-btn${filter === 'all' ? ' is-on' : ''}`} data-filter="all" onClick={() => setFilter('all')}>
                <span>{t('cat.f.all')}</span> <span className="n">{COUNTS.all}</span>
              </button>
              <button className={`f-btn${filter === 'tabular' ? ' is-on' : ''}`} data-filter="tabular" onClick={() => setFilter('tabular')}>
                <span>{t('cat.f.tab')}</span> <span className="n">{COUNTS.tabular}</span>
              </button>
              <button className={`f-btn${filter === 'regression' ? ' is-on' : ''}`} data-filter="regression" onClick={() => setFilter('regression')}>
                <span>{t('cat.f.reg')}</span> <span className="n">{COUNTS.regression}</span>
              </button>
              <button className={`f-btn${filter === 'nlp' ? ' is-on' : ''}`} data-filter="nlp" onClick={() => setFilter('nlp')}>
                <span>{t('cat.f.nlp')}</span> <span className="n">{COUNTS.nlp}</span>
              </button>
              <button className={`f-btn${filter === 'translation' ? ' is-on' : ''}`} data-filter="translation" onClick={() => setFilter('translation')}>
                <span>{t('cat.f.tr')}</span> <span className="n">{COUNTS.translation}</span>
              </button>
              <button className={`f-btn${filter === 'image' ? ' is-on' : ''}`} data-filter="image" onClick={() => setFilter('image')}>
                <span>{t('cat.f.img')}</span> <span className="n">{COUNTS.image}</span>
              </button>
              <button className={`f-btn${filter === 'gen' ? ' is-on' : ''}`} data-filter="gen" onClick={() => setFilter('gen')}>
                <span>{t('cat.f.gen')}</span> <span className="n">{COUNTS.gen}</span>
              </button>
              <button className={`f-btn${filter === 'vision' ? ' is-on' : ''}`} data-filter="vision" onClick={() => setFilter('vision')}>
                <span>{t('cat.f.vis')}</span> <span className="n">{COUNTS.vision}</span>
              </button>
              <button className={`f-btn${filter === 'controlnet' ? ' is-on' : ''}`} data-filter="controlnet" onClick={() => setFilter('controlnet')}>
                ControlNet <span className="n">{COUNTS.controlnet}</span>
              </button>

            </div>
          </div>

          {/* Model table */}
          <div className="model-table" id="model-list">
            <div className="model-row head">
              <div>{t('cat.col.m')}</div>
              <div>{t('cat.col.d')}</div>
              <div>{t('cat.col.a')}</div>
              <div style={{ textAlign: 'right' }}>{t('cat.col.t')}</div>
            </div>

            {MODEL_ROWS.map((row, i) => {
              const visible = filter === 'all' || row.category === filter
              return (
                <div
                  key={i}
                  className="model-row"
                  data-cat={row.category}
                  style={{ display: visible ? '' : 'none' }}
                >
                  <div>
                    <div className="m-name">{row.name}</div>
                    <div className="m-id">{row.id}</div>
                  </div>
                  <div className="m-desc">{t(row.descKey) || row.descFallback}</div>
                  <div className="m-base">{row.base}</div>
                  <div className="m-task">
                    <span className={`tag ${row.tagClass}`}>
                      {t(row.tagKey) || row.tagFallback}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <p
            style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)', marginTop: 18 }}
            dangerouslySetInnerHTML={th('cat.note')}
          />
        </div>
      </section>

      {/* ABSTRACTIONS SECTION */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <div className="left">
              <div className="eyebrow">
                <span className="num">[ /models/abstractions ]</span>
              </div>
              <h2 dangerouslySetInnerHTML={th('abs.h')} />
              <p className="lead">{t('abs.lead')}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {ABSTRACTIONS.map((abs, i) => (
              <div className="feat-card" key={i}>
                <div className="id">{t(abs.idKey) || abs.idFallback}</div>
                <div className="name">{abs.name}</div>
                <div className="m-desc" style={{ fontSize: 13, color: 'var(--ink-2)' }}>
                  {t(abs.descKey) || abs.descFallback}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
