import cv2
import numpy as np
from skimage import feature
from tensorflow.keras.models import load_model
from tensorflow.python.keras.backend import set_session
# from keras import backend as K
import tensorflow as tf
from joblib import load
import sys




config = tf.ConfigProto(gpu_options = tf.GPUOptions(per_process_gpu_memory_fraction=0.75), device_count = {'GPU': 1})
config.gpu_options.allow_growth = True
sess = tf.Session(config=config)


set_session(sess)

model = load_model('./analyze/88-epochs.model')



global graph
graph = tf.get_default_graph() 

# def get_model():
# 	global model
#     # model = load_model("model_new.h5")
# 	model._make_predict_function()
# 	print("Model Loaded")


# get_model()
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
	global sess
	img = np.reshape(np.uint8(data), (w, h))
	# print(np.array2string(img))

	# img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
	img = cv2.resize(img, (200, 200))
	cv2.imwrite("img1.png", img)


	

	# img2 = cv2.imread("hello.png")
	
	# img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
	# img2 = cv2.resize(img2, (200, 200))
	# img = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]


	thresh, img = cv2.threshold(img,10,255,cv2.THRESH_BINARY)

	# import pdb; pdb.set_trace()
	# np.set_printoptions(threshold=sys.maxsize)
	# print(img)
	# import pdb; pdb.set_trace()

	# quantify the image and make predictions based on the extracted
	# features using the last trained Random Forest
	# features = quantify_image(img)
	# preds = model.predict([features])
	# show(img)
	img = np.reshape(img, (1, 200,200,1))
	# print(img[0].shape)

	# print(img.shape)
	with graph.as_default():
		set_session(sess)
		res = model.predict(img.astype("float64")/255)

	return (1 - np.argmax(res[0]))
