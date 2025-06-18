# predict.py
import sys
import numpy as np
import tensorflow as tf
from sklearn.preprocessing import StandardScaler
import joblib

# Load model and scaler
model = tf.keras.models.load_model("parkinsons_model.h5")
scaler = joblib.load("scaler.pkl")  # Save scaler after training

# Read input from command line (JSON string)
input_features = list(map(float, sys.argv[1].split(",")))
X = np.array(input_features).reshape(1, -1)
X_scaled = scaler.transform(X)

# Predict
pred = model.predict(X_scaled)[0][0]
print(pred)
