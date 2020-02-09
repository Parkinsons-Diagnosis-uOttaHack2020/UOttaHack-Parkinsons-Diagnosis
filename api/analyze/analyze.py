import cv2
import numpy as np
from skimage import feature

from joblib import load
import sys
model = load('./analyze/model.joblib')

def show(img):
	cv2.imshow("im", img)
	cv2.waitKey(0)
	cv2.destroyAllWindows()


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
	img = np.reshape(np.uint8(data), (w, h))
	print(np.array2string(img))

	# img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	img = cv2.resize(img, (200, 200))
	cv2.imwrite("img1.png", img)


	

	# img2 = cv2.imread("hello.png")
	
	# img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
	# img2 = cv2.resize(img2, (200, 200))
	# img = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]


	thresh, img = cv2.threshold(img,10,255,cv2.THRESH_BINARY)

	# import pdb; pdb.set_trace()
	np.set_printoptions(threshold=sys.maxsize)
	# print(img)
	# import pdb; pdb.set_trace()

	# quantify the image and make predictions based on the extracted
	# features using the last trained Random Forest
	features = quantify_image(img)
	preds = model.predict([features])

	# print(np.min(final))
	# print(np.max(final))
	# print(final.dtype)

	# features = quantify_image(final)
	# preds = model.predict([features])

	print(preds)


	return preds[0]