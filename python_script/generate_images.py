# USAGE
# python generate_images.py --image dog.jpg --output generated_dataset/dogs
# python generate_images.py --image cat.jpg --output generated_dataset/cats

# import the necessary packages
from keras.preprocessing.image import ImageDataGenerator
from keras.preprocessing.image import img_to_array
from keras.preprocessing.image import load_img
import numpy as np
import argparse
from os import listdir
from os.path import isfile, join

# construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--images", required=True,
	help="path to the input image")
ap.add_argument("-o", "--output", required=True,
	help="path to output directory to store augmentation examples")
ap.add_argument("-s", "--label", required=True,
	help="PE if parkinson or HE if healthy")
ap.add_argument("-t", "--total", type=int, default=10,
	help="# of training samples to generate")
args = vars(ap.parse_args())


onlyfiles = [f for f in listdir(args["images"]) if isfile(join(args["images"], f))]

print(onlyfiles)

for f in onlyfiles:
	path = "{}{}".format(args["images"], f)
	# load the input image, convert it to a NumPy array, and then
	# reshape it to have an extra dimension
	print("[INFO] loading example image...")
	image = load_img(path)
	image = img_to_array(image)
	image = np.expand_dims(image, axis=0)

	# construct the image generator for data augmentation then
	# initialize the total number of images generated thus far
	aug = ImageDataGenerator(
		rotation_range=30,
		zoom_range=0.15,
		width_shift_range=0.2,
		height_shift_range=0.2,
		shear_range=0.15,
		horizontal_flip=True,
		fill_mode="nearest")
	total = 0

	# construct the actual Python generator
	print("[INFO] generating images... for {}".format(f))
	imageGen = aug.flow(image, batch_size=1, save_to_dir=args["output"],
		save_prefix=args["label"], save_format="jpg")

	# loop over examples from our image data augmentation generator
	for image in imageGen:
		# increment our counter
		total += 1

		# if we have reached the specified number of examples, break
		# from the loop
		if total == args["total"]:
			break
