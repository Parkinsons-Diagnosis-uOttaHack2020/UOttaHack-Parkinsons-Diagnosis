
import cv2
import numpy as np
from skimage import feature

from joblib import load

model = load('./analyze/model.joblib')



def quantify_image(image):
	# compute the histogram of oriented gradients feature vector for
	# the input image
	features = feature.hog(image, orientations=9,
		pixels_per_cell=(10, 10), cells_per_block=(2, 2),
		transform_sqrt=True, block_norm="L1")

	# return the feature vector
	return features


def analyze(data, w, h):
	global model
	img = np.reshape(data, (w, h)).astype("float32")

	# img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	img = cv2.resize(img, (200, 200))

	cv2.imwrite("hello.png", img)

	features = quantify_image(img)
	preds = model.predict([features])

	print(preds)


	return preds[0]