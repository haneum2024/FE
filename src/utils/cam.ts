// utils/tflite.js
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import {bundleResourceIO} from '@tensorflow/tfjs-react-native';

let model: tf.GraphModel;

export const loadModel = async () => {
  const modelJson = require('../assets/yolov5su_saved_model/saved_model.pb');
  const modelWeight = require('../assets/yolov5su_saved_model/variables/variables.data-00000-of-00001');
  model = await tf.loadGraphModel(bundleResourceIO(modelJson, modelWeight));
};

export const detectObjects = async (imageTensor: any) => {
  if (!model) {
    throw new Error('Model not loaded');
  }
  const predictions = await model.executeAsync(imageTensor);
  return predictions;
};
